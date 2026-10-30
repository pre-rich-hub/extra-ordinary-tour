const FALLBACK = 'http://localhost:5000'

/**
 * Resolve the backend origin from the API_BASE_URL environment variable.
 *
 * Vercel copy-paste tends to drop the scheme or keep the surrounding quotes,
 * and Next.js rejects rewrites whose destination is not an absolute URL.
 * Normalize those forms here so the build and the server fetch share one
 * definition of the backend origin.
 *
 * @param {string | undefined} value
 * @returns {string}
 */
export function resolveApiBase(value) {
  const raw = (value ?? '').trim().replace(/^['"]|['"]$/g, '')
  if (!raw) return FALLBACK

  const local = /^(localhost|127\.0\.0\.1)(:|\/|$)/i.test(raw)
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `${local ? 'http' : 'https'}://${raw}`
  const normalized = withScheme.replace(/\/+$/, '')

  let url
  try {
    url = new URL(normalized)
  } catch {
    throw new Error(`API_BASE_URL is not a valid URL: ${JSON.stringify(raw)}`)
  }

  if (!/^https?:$/.test(url.protocol) || !url.hostname || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`API_BASE_URL must be an origin like https://api.example.com, got ${JSON.stringify(raw)}`)
  }

  return normalized
}
