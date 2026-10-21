import type { AppLocale } from '@/i18n/routing'
import { site } from './entities'

export const siteOrigin = site.origin

/** Canonicals exclude query strings/fragments and use no trailing slash. */
export function canonicalPath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error('Canonical paths must be site-relative')
  }
  return path.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'
}

/** Accepts the unprefixed content path, shared by all language versions. */
export function localePath(path: string, locale: AppLocale) {
  const normalized = canonicalPath(path)
  return `/${locale}${normalized === '/' ? '' : normalized}`
}

export function absoluteUrl(path: string) {
  return `${siteOrigin}${canonicalPath(path)}`
}
