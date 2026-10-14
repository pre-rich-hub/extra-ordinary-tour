// Server-side base URL for the backend. Client components must NEVER use this
// — they call relative "/api/v1/..." paths which Next rewrites to the backend
// (next.config.mjs). Only server components (admin layout guard) fetch across
// process boundaries where rewrites do not apply, so this mirrors the same
// env var next.config.mjs reads for the rewrite target.

export function getAdminApiBaseUrl(): string {
  return process.env.API_BASE_URL ?? 'http://localhost:5000'
}