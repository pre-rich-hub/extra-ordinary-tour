import { GoogleGenAI } from "@google/genai";
import { OpenAI } from "openai";
import { env } from "../../config/env.js";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatStreamRequest = {
  system: string;
  messages: ChatTurn[];
  maxOutputTokens: number;
  signal: AbortSignal;
};

export interface ChatProvider {
  streamChat(req: ChatStreamRequest): AsyncIterable<{ text: string }>;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/**
 * A failure we can reason about, as opposed to a raw SDK error. `message` is
 * already safe to log but not safe to show a visitor, since provider bodies
 * leak model names, quota state and request ids.
 */
export class ProviderError extends Error {
  readonly status: number;
  readonly retryable: boolean;
  readonly detail: string;

  constructor(status: number, retryable: boolean, detail: string) {
    super(`Provider request failed (${status})`);
    this.name = "ProviderError";
    this.status = status;
    this.retryable = retryable;
    this.detail = detail;
  }
}

const TRANSIENT_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

// Providers word overload differently and the wording is not contractual, so
// match on the phrases they actually use rather than trusting a status alone.
const TRANSIENT_PHRASES = [
  "high demand",
  "overloaded",
  "unavailable",
  "resource_exhausted",
  "resource exhausted",
  "try again later",
  "temporarily",
  "timeout",
  "timed out",
  "econnreset",
  "socket hang up",
  "fetch failed",
  "429",
  "500",
  "502",
  "503",
  "504",
];

/** Pull a status code out of whatever shape the SDK threw. */
function extractStatus(error: unknown): number {
  const candidate = error as
    | { status?: unknown; code?: unknown; error?: { code?: unknown; status?: unknown } }
    | null;

  const raw =
    candidate?.status ??
    candidate?.code ??
    candidate?.error?.status ??
    candidate?.error?.code ??
    0;

  const parsed = typeof raw === "string" ? Number.parseInt(raw, 10) : raw;
  return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Free-tier quota exhaustion looks like a 429 but is not a transient spike, so
 * retrying it just burns the whole attempt budget to arrive at the same
 * inevitable failure. Distinguish it and stop early instead.
 */
function isQuotaExhausted(lowered: string): boolean {
  return (
    lowered.includes("quota exceeded") ||
    lowered.includes("exceeded your current quota") ||
    lowered.includes("check your plan and billing") ||
    lowered.includes("billing")
  );
}

export function classifyProviderError(error: unknown): ProviderError {
  if (error instanceof ProviderError) return error;

  if (error instanceof Error && error.name === "AbortError") {
    return new ProviderError(408, true, "provider request aborted");
  }

  const detail = error instanceof Error ? error.message : String(error);
  const lowered = detail.toLowerCase();
  const status = extractStatus(error);

  if (status === 429 && isQuotaExhausted(lowered)) {
    return new ProviderError(429, false, detail);
  }

  const retryable =
    TRANSIENT_STATUS.has(status) || TRANSIENT_PHRASES.some((p) => lowered.includes(p));

  return new ProviderError(status || 500, retryable, detail);
}

// ---------------------------------------------------------------------------
// Retry + model fallback
// ---------------------------------------------------------------------------

const sleep = (ms: number, signal: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("aborted"));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new Error("aborted"));
      },
      { once: true },
    );
  });

/**
 * Opens a provider stream, retrying while the failure looks transient.
 *
 * An async generator does no work until it is pulled, so an upstream 503 only
 * appears on the first `next()`. Priming the iterator here is what makes retry
 * possible at all, and the first chunk is buffered rather than dropped so the
 * caller still sees the complete reply. Once tokens are flowing the stream is
 * handed over untouched, so a reply is never repeated mid-answer.
 */
async function openStreamWithRetry(
  open: () => AsyncIterable<{ text: string }>,
  signal: AbortSignal,
  onRetry: (info: { attempt: number; waitMs: number; reason: string }) => void,
): Promise<AsyncIterable<{ text: string }>> {
  const max = env.ASSISTANT_MAX_ATTEMPTS;
  let lastError: ProviderError | null = null;

  for (let i = 1; i <= max; i++) {
    const iterator = open()[Symbol.asyncIterator]();

    try {
      const first = await iterator.next();

      // The buffered chunk has to be handed over exactly once. Returning it
      // again on every pull would spin the consumer forever, growing its
      // accumulated text until the heap dies.
      let buffered: IteratorResult<{ text: string }> | null = first;

      return {
        [Symbol.asyncIterator]: () => ({
          next: async (): Promise<IteratorResult<{ text: string }>> => {
            if (buffered !== null) {
              const value = buffered;
              buffered = null;
              return value;
            }
            return iterator.next();
          },
          [Symbol.asyncIterator]() {
            return this;
          },
        }),
      };
    } catch (error) {
      const providerError = classifyProviderError(error);
      lastError = providerError;

      if (!providerError.retryable || i === max) throw providerError;
      if (signal.aborted) throw providerError;

      // Exponential backoff with jitter, so a fleet of clients that all lost
      // the same overloaded model do not come back in lockstep.
      const waitMs = Math.round(
        env.ASSISTANT_RETRY_BASE_MS * 2 ** (i - 1) * (0.5 + Math.random()),
      );
      onRetry({ attempt: i, waitMs, reason: providerError.detail });
      await sleep(waitMs, signal);
    }
  }

  throw lastError ?? new ProviderError(503, true, "provider unavailable");
}

/**
 * Wraps a provider so that exhausting the attempts on one model still leaves a
 * working model to try. Gemini overloads a single model without taking the
 * account down, so this is the difference between a working assistant and a
 * dead one during a demand spike.
 */
function withFallback(
  primary: ChatProvider,
  fallback: ChatProvider | null,
  log: (info: { message: string; data: Record<string, unknown> }) => void,
): ChatProvider {
  return {
    async *streamChat(req: ChatStreamRequest) {
      const open = (p: ChatProvider) => () => p.streamChat(req);

      try {
        const stream = await openStreamWithRetry(open(primary), req.signal, (info) =>
          log({
            message: "assistant provider retry",
            data: { attempt: info.attempt, waitMs: info.waitMs, reason: info.reason },
          }),
        );
        yield* stream;
        return;
      } catch (error) {
        const providerError = classifyProviderError(error);
        // Quota is an account-wide limit, not a per-model one, so a second
        // model on the same key would fail identically. Skip straight out.
        if (!fallback || !providerError.retryable) throw providerError;
        log({
          message: "assistant falling back to secondary model",
          data: { reason: providerError.detail },
        });
      }

      const stream = await openStreamWithRetry(open(fallback), req.signal, (info) =>
        log({
          message: "assistant fallback retry",
          data: { attempt: info.attempt, waitMs: info.waitMs, reason: info.reason },
        }),
      );
      yield* stream;
    },
  };
}

// ---------------------------------------------------------------------------
// OpenAI-compatible providers
// ---------------------------------------------------------------------------

/**
 * Groq serves the OpenAI chat completions shape, so both providers share this.
 * The two differ in one way that matters: OpenAI's newer models require
 * `max_completion_tokens`, while Groq documents `max_tokens`. Sending the wrong
 * one is a 400, so the name is a per-provider setting rather than a constant.
 */
class OpenAICompatibleProvider implements ChatProvider {
  private client: OpenAI | undefined;

  constructor(
    private readonly model: string,
    private readonly apiKey: string,
    private readonly baseURL: string | undefined,
    private readonly tokenParam: "max_completion_tokens" | "max_tokens",
  ) {}

  private getClient(): OpenAI {
    if (!this.client) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
        ...(this.baseURL ? { baseURL: this.baseURL } : {}),
      });
    }
    return this.client;
  }

  async *streamChat(req: ChatStreamRequest): AsyncIterable<{ text: string }> {
    const stream = await this.getClient().chat.completions.create(
      {
        model: this.model,
        messages: [{ role: "system", content: req.system }, ...req.messages],
        [this.tokenParam]: req.maxOutputTokens,
        stream: true,
      } as OpenAI.Chat.ChatCompletionCreateParamsStreaming,
      { signal: req.signal },
    );
    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content;
      if (text) yield { text };
    }
  }
}

export class OpenAIProvider extends OpenAICompatibleProvider {
  constructor(model: string = env.ASSISTANT_MODEL) {
    super(model, env.OPENAI_API_KEY, undefined, "max_completion_tokens");
  }
}

export class GroqProvider extends OpenAICompatibleProvider {
  constructor(model: string = env.ASSISTANT_MODEL) {
    super(model, env.GROQ_API_KEY, env.GROQ_BASE_URL, "max_tokens");
  }
}

// ---------------------------------------------------------------------------
// Gemini
// ---------------------------------------------------------------------------

export class GeminiProvider implements ChatProvider {
  private client: GoogleGenAI | undefined;
  private readonly model: string;

  constructor(model: string = env.ASSISTANT_MODEL) {
    this.model = model;
  }

  private getClient(): GoogleGenAI {
    if (!this.client) this.client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    return this.client;
  }

  async *streamChat(req: ChatStreamRequest): AsyncIterable<{ text: string }> {
    const stream = await this.getClient().models.generateContentStream({
      model: this.model,
      contents: req.messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.content }],
      })),
      config: {
        systemInstruction: req.system,
        maxOutputTokens: req.maxOutputTokens,
        abortSignal: req.signal,
      },
    });
    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) yield { text };
    }
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createProvider(
  log: (info: { message: string; data: Record<string, unknown> }) => void = () => undefined,
): ChatProvider {
  const build = (model: string): ChatProvider => {
    switch (env.ASSISTANT_PROVIDER) {
      case "openai":
        return new OpenAIProvider(model);
      case "gemini":
        return new GeminiProvider(model);
      case "groq":
      default:
        return new GroqProvider(model);
    }
  };

  const fallbackModel = env.ASSISTANT_FALLBACK_MODEL.trim();
  const primary = build(env.ASSISTANT_MODEL);
  const fallback =
    fallbackModel && fallbackModel !== env.ASSISTANT_MODEL
      ? build(fallbackModel)
      : null;

  return withFallback(primary, fallback, log);
}
