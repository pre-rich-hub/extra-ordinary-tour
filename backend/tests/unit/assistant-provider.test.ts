import { describe, expect, it, vi } from "vitest";
import {
  GeminiProvider,
  GroqProvider,
  OpenAIProvider,
  ProviderError,
  classifyProviderError,
  createProvider,
} from "../../src/modules/assistant/provider.client.js";

// The retry layer is hard to exercise against a live provider, so the transport
// is stubbed. These cover the failure handling the retry loop's decisions rest
// on, and the fact that an upstream body never reaches the visitor.

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = {
      generateContentStream: async () => {
        throw new Error("stubbed");
      },
    };
  },
}));

vi.mock("openai", () => ({
  OpenAI: class {
    chat = { completions: { create: async () => { throw new Error("stubbed"); } } };
  },
}));

describe("ProviderError", () => {
  it("never puts the upstream body in the user-facing message", () => {
    const error = new ProviderError(503, true, "secret internal detail");
    // The route logs error.detail and shows error.message, so the detail must
    // not be reachable from the message a visitor receives.
    expect(error.message).not.toContain("secret internal detail");
    expect(error.detail).toBe("secret internal detail");
  });
});

describe("classifyProviderError", () => {
  it("marks a 503 high-demand body as retryable", () => {
    const highDemand = Object.assign(
      new Error(
        JSON.stringify({
          error: { code: 503, message: "This model is currently experiencing high demand." },
        }),
      ),
      { code: 503 },
    );

    const classified = classifyProviderError(highDemand);
    expect(classified.status).toBe(503);
    expect(classified.retryable).toBe(true);
  });

  it("marks an exhausted free tier as non-retryable", () => {
    // A free-tier 429 is a hard stop, not a spike. Retrying it spends the whole
    // attempt budget and still fails, which made an exhausted key look like a
    // slow assistant instead of an unavailable one.
    const quotaBody = JSON.stringify({
      error: {
        message:
          "You exceeded your current quota, please check your plan and billing details.",
      },
    });
    const classified = classifyProviderError(
      Object.assign(new Error(quotaBody), { status: 429 }),
    );
    expect(classified.status).toBe(429);
    expect(classified.retryable).toBe(false);
  });

  it("still retries a plain rate limit, which can clear on its own", () => {
    const rateLimited = Object.assign(new Error("Rate limit exceeded"), { status: 429 });
    expect(classifyProviderError(rateLimited).retryable).toBe(true);
  });

  it("does not retry a bad key", () => {
    const badKey = Object.assign(new Error("API key not valid"), { status: 400 });
    expect(classifyProviderError(badKey).retryable).toBe(false);
  });
});

describe("createProvider", () => {
  it("returns a provider that implements the ChatProvider contract", () => {
    const provider = createProvider();
    expect(typeof provider.streamChat).toBe("function");
  });

  it("constructs each provider without touching the network", () => {
    expect(new GroqProvider("openai/gpt-oss-120b")).toBeInstanceOf(GroqProvider);
    expect(new OpenAIProvider("gpt-4o-mini")).toBeInstanceOf(OpenAIProvider);
    expect(new GeminiProvider("gemini-flash-latest")).toBeInstanceOf(GeminiProvider);
  });
});
