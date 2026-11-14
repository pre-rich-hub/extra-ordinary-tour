// Admin API client. Same-origin relative paths only — Next rewrites route
// /api/:path* to the backend (see next.config.mjs), so cookies flow without
// hardcoding an origin. Mirrors the reference implementation contract.

export type AdminApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  errors?: Array<{ path?: string; message: string }>
}

const publicContent =
  /^\/api\/v1\/admin\/(tours|destinations|gallery|blog|categories|testimonials)(\/|$)/

const cacheTagFor: Record<string, string> = {
  tours: 'tours',
  destinations: 'destinations',
  gallery: 'gallery',
  blog: 'blog',
  categories: 'tours',
  testimonials: 'testimonials',
}

/** Purge the cached public pages for a tag. The write already succeeded, so never fail. */
export async function refreshPublicSite(tag: string) {
  await fetch('/admin/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags: [tag] }),
  }).catch(() => undefined)
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  })

  const payload = (await response.json().catch(() => null)) as AdminApiEnvelope<T> | null

  if (!response.ok || !payload?.success) {
    const detail = payload?.errors?.map((error) => error.message).join(', ')
    const statusMessage =
      response.status === 413
        ? 'The selected images are too large. Use files no larger than 4 MB each.'
        : response.status === 401
          ? 'Your admin session has expired. Sign in and try again.'
          : 'The request could not be completed.'
    throw new Error(detail || payload?.message || statusMessage)
  }

  const write = init.method && init.method !== 'GET'
  const resource = publicContent.exec(path)?.[1]
  if (write && resource) await refreshPublicSite(cacheTagFor[resource])

  return payload.data
}

export async function reorderGallery(tourId: number, imageIds: number[]): Promise<void> {
  await adminRequest('/api/v1/admin/gallery/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tourId, imageIds }),
  })
}

export function formatAdminDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}