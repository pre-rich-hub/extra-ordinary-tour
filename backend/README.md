# Extraordinary Ethiopia Tours — Backend

Express + TypeScript + Prisma API serving the Next.js admin panel in `frontend/`
and the public site. Includes JWT cookie auth, media uploads, and the AI
assistant module.

`backend/` is expected to run on port 5000 while `frontend/` runs on port 3000
(Next rewrites `/api/*` to the backend; see `frontend/next.config.mjs`).

## Stack

- Express 4
- TypeScript (tsx for dev)
- Prisma + PostgreSQL (Neon)
- Zod validation
- Pino logging
- AI providers: Groq (default), OpenAI, Gemini

## Quick Start

```bash
pnpm install
cp .env.example .env
# Set DATABASE_URL, DIRECT_URL and JWT_SECRET (at minimum).
pnpm prisma:migrate
pnpm seed:admin
pnpm seed:layover   # optional: four starter packages for the public layover page
pnpm seed:catalog   # copy the bundled tours, destinations, journal, reviews and gallery into the database
pnpm dev
```

The dev seed creates `admin@example.com` / `admin123456` unless `ADMIN_EMAIL`
and `ADMIN_PASSWORD` are set. Change the password before deploying.

### Local image uploads

Local storage writes to `backend/assets` and the backend serves it at
`/assets/...`. The Next dev server does not proxy `/assets`, so uploads 404 when
the frontend and backend run on different origins. For local development, set
`PUBLIC_FILE_BASE_URL=http://localhost:5000` (the browser then loads uploads
from the backend) or use `STORAGE_DRIVER=database` (uploads are served from
`/api/v1/media/:id`, which the Next `/api` rewrite already proxies). On Vercel
the database driver is selected automatically.

## What's Included

```
src/
  config/
    env.ts             # Zod-validated env vars with boot checks
    database.ts        # Prisma client
    pino.ts            # Logger with redaction
  middleware/
    auth.middleware.ts # JWT cookie auth for admin routes
    error.middleware.ts# Error → JSON response mapping
    rate-limit.middleware.ts
    logging.middleware.ts
    upload.middleware.ts # Multer + storage provider bridge
  modules/
    admin/             # Dashboard, tours, destinations, categories, gallery,
                       # blog, testimonials, bookings, contacts, subscribers,
                       # layover packages
    public/            # Public tours, contact, newsletter, layover packages
    assistant/         # The AI assistant (biggest value here)
      provider.client.ts   # Groq/OpenAI/Gemini helpers, createProvider()
      assistant.service.ts # runChat() orchestration
      context-builder.ts   # Pulls catalog data from DB into system prompt
      business-info.ts     # Operating facts the catalog does not hold
      session-store.ts     # Session + usage tracking in Prisma
      gating.ts            # Token estimation, session/daily caps
      assistant.routes.ts  # POST /api/v1/assistant (SSE streaming)
      assistant.validation.ts
    health/
  services/
    email.service.ts   # SMTP + Resend transport
    file.service.ts    # Normalizes stored paths before delete
    storage/           # Local disk or database-backed media
  utils/
    api-response.ts    # ok() / fail() consistent responses
  app.ts
  server.ts
  routes.ts
api/
  index.ts             # Vercel function entry (imports the app)
prisma/
  schema.prisma        # Tour/booking/admin/AI session models
scripts/
  assistant-check.ts   # Lists the models your key can call
  seed-admin.ts        # Creates or updates the admin account
  seed-layover.ts      # Creates the four starter layover packages
  seed-catalog.ts      # Copies the bundled catalogue into the database, keeping existing rows
```

## Customizing for a New Client

### 1. Prisma schema

The schema has travel-domain models (Tour, Destination, Booking) plus the generic
admin/contact/blog/assistant models. Update the catalog models to match the client's
business. Keep the `ChatSession`, `ChatMessage`, `ChatDailyUsage` models — the
assistant depends on them.

### 2. AI assistant context

Edit `src/modules/assistant/context-builder.ts`. This is the only file that knows
about your domain. Change the Prisma queries and field mappings to pull whatever
data grounds the assistant (tours, products, services, FAQs).

### 3. Operating information

Edit `src/modules/assistant/business-info.ts`. The catalog covers what is for
sale; this file covers how you work (booking, payment, cancellations, contact).
Fill it in from pages the site already publishes. Until you do, the assistant
declines those questions rather than inventing an answer.

### 4. System prompt

Edit `buildSystemPrompt()` in `src/modules/assistant/assistant.service.ts`:
brand name, tone, what the assistant should/shouldn't do.

### 5. Routes

Register new routers in `src/routes.ts`.

## AI Assistant API

### POST /api/v1/assistant

```json
{
  "sessionId": "optional-uuid-for-continuing-conversation",
  "message": "user question"
}
```

Response is SSE stream:

```
event: meta
event: delta   (one per token chunk)
event: done    (final, includes usage)
```

### Limits

- Per-session message cap: `ASSISTANT_MAX_MESSAGES` (default 30)
- Daily token cap: `ASSISTANT_MAX_DAILY_TOKENS` (default 200k)
- Context window: `ASSISTANT_MAX_CONTEXT_CHARS` (default 40k)

All configurable in `.env`.

## AI Providers

Set `ASSISTANT_PROVIDER` plus the matching key. Groq is the default.

| Provider | SDK | Notes |
|----------|-----|-------|
| Groq | `openai` (compatible endpoint) | Fast streaming, free tier |
| Gemini | `@google/genai` | 15 RPM, 1M tokens/month |
| OpenAI | `openai` | `max_completion_tokens` differs from Groq |

Provider docs list a global model lineup, but access is granted per account.
Run `pnpm assistant:check` after changing the model: it probes each model your
key can reach and exits non-zero if the configured one is not callable.

The assistant retries transient failures (a rate limit or a 5xx) with backoff
and falls back to `ASSISTANT_FALLBACK_MODEL`. An exhausted free-tier quota is
treated as a hard stop, not a transient one.

To add a provider, implement `ChatProvider` in `provider.client.ts` and add a
case in `createProvider()`. Providers that speak the OpenAI chat-completions
shape can extend `OpenAICompatibleProvider`.

## Scripts

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start with tsx watch |
| `pnpm build` | Type-check and emit to `dist/` |
| `pnpm typecheck` | Check `src/` and the Vercel entry |
| `pnpm test` | Run the unit suite |
| `pnpm prisma:migrate` | Run migrations |
| `pnpm seed:admin` | Seed an admin user |
| `pnpm assistant:check` | Probe the configured model |

## Deploying to Vercel

Set the project root to this directory. `vercel.json` routes every request to
`api/index.ts`, which exports the Express app; Vercel's build runs
`vercel-build` (`prisma generate && tsc`) first. Set the same env vars as
`.env`, plus `NODE_ENV=production` and `COOKIE_SECURE=true`.

## Conventions

- Files stay under 300 lines
- Type hints everywhere
- Boot checks warn and disable a half-configured feature instead of crashing
- No secrets in code, ever
- Commit in small, atomic pieces