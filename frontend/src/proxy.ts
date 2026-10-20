import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing, isLocale } from './i18n/routing'
const localize = createMiddleware(routing)
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  // Invalid explicit language prefixes are handled by the root 404, never double-prefixed.
  if (/^[a-z]{2}(?:-[A-Z]{2})?$/.test(first) && !isLocale(first))
    return NextResponse.next()
  if (!isLocale(first)) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url, 308)
  }
  return localize(request)
}
export const config = {
  matcher: [
    '/((?!admin(?:/|$)|login(?:/|$)|api(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|.*\\..*).*)',
  ],
}
