import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

function envBoolean(value: unknown): boolean {
  if (value === true || value === 1) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "on";
  }
  return Boolean(value);
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().optional().default(""),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("admin_session"),
  COOKIE_SECURE: z.preprocess(envBoolean, z.boolean()).default(false),

  // Email
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_FROM: z.string().optional().default(""),
  EMAIL_PROVIDER: z.enum(["smtp", "resend"]).default("smtp"),
  RESEND_API_KEY: z.string().optional().default(""),
  ADMIN_EMAIL: z.string().optional().default(""),
  ADMIN_PASSWORD: z.string().optional().default(""),
  EMAIL_ENABLED: z.preprocess(envBoolean, z.boolean()).default(false),

  // File uploads
  UPLOAD_ROOT: z.string().default("."),
  PUBLIC_FILE_BASE_URL: z.string().optional().default(""),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(4),

  // Storage
  // When omitted, hosted storage is inferred from the deployment:
  //   - explicit STORAGE_DRIVER wins
  //   - `local` on Vercel is replaced with database storage (serverless disk is
  //     ephemeral), matching the reference behavior
  //   - on any non-Vercel host the default is local disk
  STORAGE_DRIVER: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.enum(["local", "database"]).optional(),
  ),

  // AI assistant
  ASSISTANT_ENABLED: z.preprocess(envBoolean, z.boolean()).default(false),
  ASSISTANT_PROVIDER: z.enum(["openai", "gemini", "groq"]).default("groq"),
  OPENAI_API_KEY: z.string().optional().default(""),
  GEMINI_API_KEY: z.string().optional().default(""),
  GROQ_API_KEY: z.string().optional().default(""),
  // Overridable so the provider can be pointed at a mock in tests.
  GROQ_BASE_URL: z.string().default("https://api.groq.com/openai/v1"),
  // Grounded in the catalog, so the work is instruction following rather than
  // knowledge. Confirm what your account can actually call with
  // `pnpm assistant:check`; provider docs list a global lineup, not your subset.
  ASSISTANT_MODEL: z.string().default("openai/gpt-oss-120b"),
  // Tried when the primary model keeps failing transiently.
  ASSISTANT_FALLBACK_MODEL: z.string().optional().default("openai/gpt-oss-20b"),
  ASSISTANT_MAX_ATTEMPTS: z.coerce.number().int().min(1).max(6).default(3),
  ASSISTANT_RETRY_BASE_MS: z.coerce.number().int().positive().default(500),
  ASSISTANT_MAX_MESSAGES: z.coerce.number().int().positive().default(30),
  ASSISTANT_MAX_SESSION_TOKENS: z.coerce.number().int().positive().default(50000),
  ASSISTANT_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(600),
  ASSISTANT_MAX_HISTORY_MESSAGES: z.coerce.number().int().positive().default(10),
  ASSISTANT_MAX_CONTEXT_CHARS: z.coerce.number().int().positive().default(40000),
  ASSISTANT_MAX_DAILY_TOKENS: z.coerce.number().int().positive().default(200000),
  ASSISTANT_STREAM: z.preprocess(envBoolean, z.boolean()).default(true),
  ASSISTANT_STREAM_TIMEOUT_MS: z.coerce.number().int().positive().default(120000),
  ASSISTANT_CONTEXT_TTL_MS: z.coerce.number().int().positive().default(300000),
  ASSISTANT_IP_HASH_SALT: z.string().optional().default(""),
});

const rawEnv = envSchema.parse(process.env);

const parsed = {
  ...rawEnv,
  STORAGE_DRIVER:
    process.env.VERCEL && (!rawEnv.STORAGE_DRIVER || rawEnv.STORAGE_DRIVER === "local")
      ? "database"
      : rawEnv.STORAGE_DRIVER ?? "local",
  ASSISTANT_IP_HASH_SALT: rawEnv.ASSISTANT_IP_HASH_SALT || rawEnv.JWT_SECRET,
};

// Boot gates (not fatal): a half-configured optional feature must not take down
// the whole API. Turning EMAIL_ENABLED or ASSISTANT_ENABLED on in a dashboard
// without the matching secret used to throw during module load, so every
// serverless invocation failed, /health included. Warn loudly and disable the
// feature instead; the rest of the API keeps serving.
if (parsed.EMAIL_ENABLED) {
  const missing =
    !parsed.SMTP_FROM ||
    !parsed.ADMIN_EMAIL ||
    (parsed.EMAIL_PROVIDER === "smtp" && (!parsed.SMTP_HOST || !parsed.SMTP_PASS));

  if (missing) {
    console.warn(
      "[env] EMAIL_ENABLED is true but SMTP_FROM, ADMIN_EMAIL or the SMTP " +
        "credentials are missing. Email dispatch is disabled until they are set.",
    );
    parsed.EMAIL_ENABLED = false;
  }
}

if (parsed.ASSISTANT_ENABLED) {
  const missingKey =
    (parsed.ASSISTANT_PROVIDER === "openai" && !parsed.OPENAI_API_KEY) ||
    (parsed.ASSISTANT_PROVIDER === "gemini" && !parsed.GEMINI_API_KEY) ||
    (parsed.ASSISTANT_PROVIDER === "groq" && !parsed.GROQ_API_KEY);

  if (missingKey) {
    console.warn(
      `[env] ASSISTANT_ENABLED is true but the ${parsed.ASSISTANT_PROVIDER.toUpperCase()}_API_KEY ` +
        "is missing. The assistant is disabled until a key is set.",
    );
    parsed.ASSISTANT_ENABLED = false;
  }
}

export const env = parsed;
export const isProduction = parsed.NODE_ENV === "production";
