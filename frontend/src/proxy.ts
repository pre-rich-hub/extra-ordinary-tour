import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing, isLocale } from './i18n/routing'
const localize = createMiddleware(routing)
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const privatePath = first === 'admin' || first === 'login'
  if (privatePath) {
    if (pathname !== normalized) {
      const url = new URL(request.url)
      url.pathname = normalized
      return NextResponse.redirect(url, 308)
    }
    return NextResponse.next()
  }
  // Invalid explicit language prefixes are handled by the root 404, never double-prefixed.
  if (/^[a-z]{2}(?:-[A-Z]{2})?$/.test(first) && !isLocale(first))
    return NextResponse.next()
  if (!isLocale(first) || pathname !== normalized) {
    const url = new URL(request.url)
    url.pathname = isLocale(first)
      ? normalized
      : `/en${normalized === '/' ? '' : normalized}`
    return NextResponse.redirect(url, 308)
  }
  return localize(request)
}
export const config = {
  matcher: ['/((?!api(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|.*\\..*).*)'],
}
