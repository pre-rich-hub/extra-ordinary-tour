import { describe, it, expect } from "vitest";
import { tuneUrl } from "../../src/config/database.js";

// On Vercel every warm function instance is its own process with its own pool.
// Prisma's defaults are 5 connections with a 10s pool timeout, so a handful of
// idle instances exhaust Neon and the failure arrives as
// "Timed out fetching a new connection from the connection pool" under exactly
// the load the deploy was meant to survive. These pin the correction.
describe("serverless database URL", () => {
  it("holds one connection per instance", () => {
    expect(tuneUrl("postgresql://u:p@host/db")).toContain("connection_limit=1");
  });

  it("allows longer than Prisma's 10s default, so a Neon scale-to-zero wake is a wait not a failure", () => {
    expect(tuneUrl("postgresql://u:p@host/db")).toContain("pool_timeout=30");
  });

  it("tells Prisma it is behind a pooler only when it actually is", () => {
    // pgbouncer=true is unsafe if a pooler is not actually in front of the
    // connection, so it must not be set speculatively on a direct host.
    expect(tuneUrl("postgresql://u:p@ep-x.us-east-2.aws.neon.tech/db")).not.toContain("pgbouncer");
    expect(tuneUrl("postgresql://u:p@ep-x-pooler.us-east-2.aws.neon.tech/db")).toContain("pgbouncer=true");
  });

  it("does not overwrite parameters the operator set deliberately", () => {
    const tuned = tuneUrl("postgresql://u:p@ep-x-pooler.aws.neon.tech/db?connection_limit=5");
    expect(tuned).toContain("connection_limit=5");
    expect(tuned).not.toContain("connection_limit=1");
  });

  it("preserves the parameters that make Neon work at all", () => {
    const tuned = tuneUrl("postgresql://u:p@host/db?sslmode=require&connect_timeout=30")!;
    expect(tuned).toContain("sslmode=require");
    expect(tuned).toContain("connect_timeout=30");
  });

  it("hands a malformed URL back untouched so Prisma can report it", () => {
    expect(tuneUrl("not-a-url")).toBe("not-a-url");
    expect(tuneUrl(undefined)).toBeUndefined();
  });
});
