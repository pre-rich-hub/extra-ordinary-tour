import { createHmac } from "node:crypto";
import { Router } from "express";
import type { Router as RouterType } from "express";
import type { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { env } from "../../config/env.js";
import { logger } from "../../config/pino.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { fail, ok } from "../../utils/api-response.js";
import { assistantSchema } from "./assistant.validation.js";
import { ProviderError } from "./provider.client.js";
import { loadUsage, runChat } from "./assistant.service.js";

export const assistantRouter: RouterType = Router();

// ---------------------------------------------------------------------------
// Rate limiter — 20 requests per 10 minutes per IP
// ---------------------------------------------------------------------------

const assistantLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return fail(res, "Too many assistant requests. Please try again later.", [], 429);
  },
});

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------

type SseEvent = "meta" | "delta" | "done" | "error" | "data";

function sseWrite(res: Response, event: SseEvent, data: unknown): void {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

// ---------------------------------------------------------------------------
// IP hashing
// ---------------------------------------------------------------------------

function hashIp(ip: string): string {
  return createHmac("sha256", env.ASSISTANT_IP_HASH_SALT)
    .update(ip)
    .digest("hex");
}

/**
 * Provider errors carry the upstream body, which leaks model names, quota state
 * and request ids. Visitors get a sentence they can act on; the detail stays in
 * the log where it can be matched against the requestId the client already has.
 */
export function publicErrorMessage(error: unknown): string {
  if (error instanceof ProviderError) {
    logger.error(
      { status: error.status, retryable: error.retryable, detail: error.detail },
      "assistant provider failure",
    );

    if (error.status === 429) {
      return "The assistant has reached its usage limit for now. Please try again later.";
    }
    if (error.status === 408) {
      return "The assistant took too long to answer. Please try again.";
    }
    // A wrong model name or a rejected key are operator errors that retrying
    // can never fix, and they are the most likely cause of an assistant that is
    // up but never answers. Naming them beats "try again shortly", which sends
    // debugging after a network fault that was never there.
    if (error.status === 404) {
      return `The assistant is misconfigured: the model ${env.ASSISTANT_MODEL} is not available on this account. Set ASSISTANT_MODEL to a model the provider serves.`;
    }
    if (error.status === 401 || error.status === 403) {
      return "The assistant is misconfigured: the provider rejected the API key. Check the key in .env.";
    }
    return "The assistant is temporarily unavailable. Please try again shortly.";
  }

  if (error instanceof HttpError) return error.message;

  logger.error(
    { detail: error instanceof Error ? error.message : String(error) },
    "assistant failure",
  );
  return "The assistant is temporarily unavailable. Please try again shortly.";
}

// ---------------------------------------------------------------------------
// Chat handler
// ---------------------------------------------------------------------------

async function handleChatRequest(req: Request, res: Response): Promise<void> {
  try {
    if (!env.ASSISTANT_ENABLED) {
      fail(res, "Assistant is disabled", [], 503);
      return;
    }

    const parsed = assistantSchema.safeParse(req.body);
    if (!parsed.success) {
      fail(
        res,
        "Validation failed",
        parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
        422,
      );
      return;
    }

    const { sessionId, message } = parsed.data;
    const result = await runChat({
      sessionId,
      message,
      ipHash: hashIp(req.ip ?? ""),
    });

    // Handoff (limit reached) — send polite text immediately
    if (result.handoff !== "none") {
      const usage = await loadUsage(result.sessionId);

      if (!env.ASSISTANT_STREAM) {
        ok(res, "Assistant replied", {
          text: result.politeText ?? "",
          sessionId: result.sessionId,
          messageId: result.messageId,
        });
        return;
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.flushHeaders();
      sseWrite(res, "meta", {
        success: true,
        message: "Assistant reply",
        data: {
          sessionId: result.sessionId,
          messageId: result.messageId,
          resumed: result.resumed,
        },
      });
      sseWrite(res, "delta", { text: result.politeText ?? "" });
      sseWrite(res, "done", {
        sessionId: result.sessionId,
        messageId: result.messageId,
        handoff: { type: result.handoff },
        usage,
      });
      res.end();
      return;
    }

    // Normal streaming response
    const stream = result.stream;
    if (!stream) {
      throw new Error("Assistant stream was not created");
    }

    if (!env.ASSISTANT_STREAM) {
      let text = "";
      for await (const delta of stream) {
        text += delta.text;
      }
      ok(res, "Assistant replied", {
        text,
        sessionId: result.sessionId,
        messageId: result.messageId,
      });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.flushHeaders();
    sseWrite(res, "meta", {
      success: true,
      message: "Assistant reply",
      data: {
        sessionId: result.sessionId,
        messageId: result.messageId,
        resumed: result.resumed,
      },
    });

    try {
      for await (const delta of stream) {
        sseWrite(res, "delta", { text: delta.text });
      }
    } catch (error) {
      sseWrite(res, "error", {
        success: false,
        message: publicErrorMessage(error),
        errors: [],
      });
      res.end();
      return;
    }

    const usage = await loadUsage(result.sessionId);
    sseWrite(res, "done", {
      sessionId: result.sessionId,
      messageId: result.messageId,
      handoff: { type: "none" },
      usage,
    });
    res.end();
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = publicErrorMessage(error);

    if (res.headersSent) {
      sseWrite(res, "error", { success: false, message, errors: [] });
      res.end();
    } else {
      fail(res, message, [], status);
    }
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

assistantRouter.post("/", assistantLimiter, handleChatRequest);
