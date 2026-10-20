import 'server-only'
import { cookies } from 'next/headers'
import { getAdminApiBaseUrl } from './api-base'

export async function hasValidAdminSession() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (!cookieHeader) return false

  try {
    // Server-side guard: Next's rewrites only apply to browser requests, so a
    // server component must fetch the backend directly. The incoming
    // admin_session cookie is forwarded via the Cookie header. Env var mirrors
    // the one next.config.mjs uses for the rewrite target.
    const response = await fetch(`${getAdminApiBaseUrl()}/api/v1/auth/me`, {
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    })

    if (!response.ok) return false

    const payload = (await response.json()) as { success?: boolean }
    return payload.success === true
  } catch {
    return false
  }
}
