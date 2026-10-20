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

// Provider streams can take tens of seconds, so chat uses its own
// AbortController with a 55-second budget instead of the JSON timeout.
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
