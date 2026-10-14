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
// Callers with a fallback (e.g. lib/catalog.ts static records) recover on the
// thrown AbortError; in production the API answers in ~100ms and the timeout
// never fires.
const REQUEST_TIMEOUT_MS = 5_000

type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
}

export type ApiImage = {
  id: number
  imageUrl: string
  tourId: number | null
}

export type ApiTour = {
  id: number
  name: string
  description: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: number
  rating: number | null
  noOfRates: number
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string; slug?: string | null; imageUrl?: string | null }[]
  categories: { id: number; name: string }[]
  gallery: ApiImage[]
  durationDays: number
  included?: string[]
  excluded?: string[]
  itinerary?: { day: number | string; title: string; activities: string }[]
  journeyMap?: string | null
  createdAt: string | null
  updatedAt: string | null
  canonical: { type: string; id: number; suggestedPath: string; slug: string | null }
}

export type ToursParams = {
  featured?: boolean
  page?: number
  limit?: number
  categorySlug?: string
  destinationSlug?: string
  q?: string
  priceMin?: number
  priceMax?: number
  ratingMin?: number
}

export type ToursPage = {
  items: ApiTour[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
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

function queryString(params: Record<string, unknown> = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export async function getTours(params: ToursParams = {}): Promise<ToursPage> {
  return request<ToursPage>(`/api/v1/tours${queryString(params)}`)
}

export async function getTourBySlug(slug: string): Promise<ApiTour> {
  return request<ApiTour>(`/api/v1/tours/slug/${encodeURIComponent(slug)}`)
}

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await request<null>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function subscribe(email: string): Promise<void> {
  await request<null>('/api/v1/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export type ApiLayoverPackage = {
  id: number
  slug: string
  hours: string
  title: string
  price: string
  image: string | null
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export async function getLayoverPackages(): Promise<ApiLayoverPackage[]> {
  return request<ApiLayoverPackage[]>('/api/v1/layover-packages')
}

export type AssistantEvent =
  | { type: 'meta'; sessionId: string; messageId: number; resumed: boolean }
  | { type: 'delta'; text: string }
  | {
      type: 'done'
      sessionId: string
      messageId: number
      handoff: { type: 'none' | 'limit' | 'error' }
      usage?: {
        sessionMessageCount: number | null
        sessionTokenCount: number | null
        dailyTokenCount: number | null
      }
    }
  | { type: 'error'; message: string }

export type AssistantDone = {
  sessionId: string
  messageId: number
  handoff: { type: 'none' | 'limit' | 'error' }
}

export type StreamAssistantHandlers = {
  onMeta: (sessionId: string, resumed: boolean) => void
  onDelta: (text: string) => void
  onDone: (done: AssistantDone) => void
  onError: (message: string) => void
}

// Streaming chat client for the AI assistant. Deliberately NOT the request()
// helper above: a real provider stream can take tens of seconds on the
// serverless lambda, so this uses its own AbortController with a 55s budget
// instead of the 5s JSON timeout.
const ASSISTANT_TIMEOUT_MS = 55_000

export async function streamAssistantChat(
  message: string,
  sessionId: string | null,
  handlers: StreamAssistantHandlers,
): Promise<void> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ASSISTANT_TIMEOUT_MS)

  try {
    const response = await fetch('/api/v1/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message, ...(sessionId ? { sessionId } : {}) }),
      signal: controller.signal,
    })

    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('text/event-stream')) {
      await consumeSse(response, handlers)
    } else {
      await consumeJson(response, handlers)
    }
  } catch (error) {
    handlers.onError(
      error instanceof Error ? error.message : 'The AI assistant is unreachable right now.',
    )
  } finally {
    clearTimeout(timeout)
  }
}

async function consumeJson(response: Response, handlers: StreamAssistantHandlers): Promise<void> {
  let envelope: {
    success?: boolean
    message?: string
    data?: { text?: string; sessionId?: string; messageId?: number }
  }
  try {
    envelope = (await response.json()) as typeof envelope
  } catch {
    handlers.onError('The AI assistant returned a malformed response.')
    return
  }

  if (!response.ok || envelope.success === false) {
    handlers.onError(envelope.message ?? `The AI assistant request failed (${response.status}).`)
    return
  }

  const data = envelope.data
  if (!data?.sessionId) {
    handlers.onError('The AI assistant returned an empty reply.')
    return
  }
  handlers.onMeta(data.sessionId, false)
  if (data.text) handlers.onDelta(data.text)
  handlers.onDone({
    sessionId: data.sessionId,
    messageId: data.messageId ?? 0,
    handoff: { type: 'none' },
  })
}

async function consumeSse(response: Response, handlers: StreamAssistantHandlers): Promise<void> {
  if (!response.body) {
    handlers.onError('The AI assistant returned an empty response.')
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let boundary = buffer.indexOf('\n\n')
    while (boundary !== -1) {
      dispatchSseBlock(buffer.slice(0, boundary), handlers)
      buffer = buffer.slice(boundary + 2)
      boundary = buffer.indexOf('\n\n')
    }
  }

  const tail = buffer.trim()
  if (tail) dispatchSseBlock(tail, handlers)
}

function dispatchSseBlock(block: string, handlers: StreamAssistantHandlers): void {
  const lines = block.trim().split('\n')
  let event: string | undefined
  let data: string | undefined
  for (const line of lines) {
    const trimmed = line.replace(/\r$/, '')
    if (trimmed.startsWith('event:')) event = trimmed.slice(6).trim()
    else if (trimmed.startsWith('data:')) data = trimmed.slice(5).trim()
  }

  // Non-empty data-json frames MUST carry "event:"; anything else is a
  // malformed stream (heartbeat ": ..." comment lines are ignored).
  if (event === undefined || data === undefined) {
    if (block.startsWith(':') || block === '') return
    handlers.onError('The AI assistant returned a malformed response.')
    return
  }

  let payload: unknown
  try {
    payload = JSON.parse(data)
  } catch {
    handlers.onError('The AI assistant returned a malformed response.')
    return
  }

  switch (event) {
    case 'meta': {
      const body = payload as { data?: { sessionId?: string; resumed?: boolean } }
      if (body.data?.sessionId) handlers.onMeta(body.data.sessionId, Boolean(body.data.resumed))
      break
    }
    case 'delta': {
      const body = payload as { text?: string }
      if (typeof body.text === 'string') handlers.onDelta(body.text)
      break
    }
    case 'done': {
      const body = payload as AssistantDone
      if (body.sessionId && body.handoff) {
        handlers.onDone({
          sessionId: body.sessionId,
          messageId: body.messageId,
          handoff: body.handoff,
        })
      }
      break
    }
    case 'error': {
      const body = payload as { message?: string }
      handlers.onError(body.message ?? 'The AI assistant failed to reply.')
      break
    }
  }
}