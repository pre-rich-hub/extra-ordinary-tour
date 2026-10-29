import { PrismaClient } from "@prisma/client";
import { logger } from "./pino.js";

/**
 * Prisma's defaults are wrong for a serverless runtime, and wrong in a way that
 * only shows up once traffic arrives.
 *
 * A bare PrismaClient opens a pool of 5 connections with a 10 second timeout.
 * On Vercel every warm function instance is its own process with its own pool,
 * so a handful of idle instances exhaust Neon. The symptom is not a connection
 * error, it is `Timed out fetching a new connection from the connection pool`
 * under exactly the load the deploy was supposed to survive.
 *
 * Two corrections:
 *
 * One connection per instance. A function handles requests one at a time, so a
 * pool buys nothing, and a single connection is the smallest thing that can be
 * held open while the instance sits frozen between requests.
 *
 * A pool timeout longer than 10 seconds. Neon's scale-to-zero can take about 30
 * seconds to wake, and a short pool timeout turns that wake-up into a failure
 * instead of a wait.
 */
const isServerless =
  Boolean(process.env.VERCEL) || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

/**
 * Appends query parameters without clobbering ones already in the URL, and
 * without assuming a pooler is in front of us. `pgbouncer=true` is only safe
 * when a pooler is actually there.
 */
export function tuneUrl(raw: string | undefined): string | undefined {
  if (!raw) return raw;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    // Let Prisma report the malformed URL with its own message rather than
    // turning a configuration typo into an opaque crash at import time.
    return raw;
  }
  if (!url.searchParams.has("connection_limit")) {
    url.searchParams.set("connection_limit", "1");
  }
  if (!url.searchParams.has("pool_timeout")) {
    url.searchParams.set("pool_timeout", "30");
  }
  // Neon's pooled endpoint is a transaction-mode pooler. Prisma needs to be
  // told, otherwise it tries to use session-level features the pooler cannot
  // support.
  const isPooler = url.hostname.includes("-pooler.");
  if (isPooler && !url.searchParams.has("pgbouncer")) {
    url.searchParams.set("pgbouncer", "true");
  }
  return url.toString();
}

if (isServerless) {
  const host = (() => {
    try {
      return new URL(process.env.DATABASE_URL ?? "").hostname;
    } catch {
      return "(unparseable)";
    }
  })();

  // A direct Neon connection from many instances is the failure this whole file
  // exists to avoid, so say so at boot rather than at the first spike.
  if (!host.includes("-pooler.")) {
    logger.warn(
      { host },
      "running serverless against a direct database URL. Use the Neon pooled " +
        "endpoint for DATABASE_URL and keep the direct URL in DIRECT_URL for " +
        "migrations, or instances will exhaust the connection limit.",
    );
  }
}

export const prisma = new PrismaClient(
  isServerless
    ? { datasources: { db: { url: tuneUrl(process.env.DATABASE_URL) } } }
    : undefined,
);
