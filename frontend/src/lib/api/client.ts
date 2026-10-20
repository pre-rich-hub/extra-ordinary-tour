// Same-origin JSON transport; /api rewrites are configured in next.config.mjs.
// Keep the five-second timeout and backend envelope/error behavior.

// Typed client for the Extraordinary Ethiopia Tours Express API.
//
// All requests are same-origin relative paths ("/api/v1/...") so Next's
// dev/prod rewrites route them to the backend (see next.config.mjs). The API
// wraps every response in an envelope: { success, message, data }.
//
// Non-2xx responses are thrown with the backend's message so callers can
// render it directly as form feedback.

// Abort any request that does not complete in time. This is a dev/build
// safety net: from a local machine every DB round trip over the Neon pooler
// costs ~1.7s, so slug lookups can stall static generation for minutes.
// Callers with a fallback (e.g. feature catalogue records) recover on the
// thrown AbortError; in production the API answers in ~100ms and the timeout
// never fires.
const REQUEST_TIMEOUT_MS = 5_000

type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })

  let envelope: ApiEnvelope<T> | undefined
  try {
    envelope = (await response.json()) as ApiEnvelope<T>
  } catch {
    // Non-JSON error body (proxy down, HTML error page, …)
  }

  if (!response.ok || !envelope?.success) {
    throw new Error(envelope?.message ?? `Request failed (${response.status})`)
  }

  return envelope.data as T
}

export function queryString(params: Record<string, unknown> = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}
