import type { Metadata } from 'next'
import { isPublished } from './publication'
import { routing, type AppLocale } from './routing'
export const siteOrigin = 'https://extraordinaryethiopiatours.com'
export function localePath(path: string, locale: AppLocale) {
  return `/${locale}${path === '/' ? '' : path}`
}
export function languageAlternates(path: string) {
  return Object.fromEntries([
    ...routing.locales
      .filter(isPublished)
      .map((locale) => [locale, localePath(path, locale)]),
    ['x-default', localePath(path, 'en')],
  ])
}
export function buildPageMetadata(
  metadata: Metadata,
  path: string,
  locale: AppLocale,
): Metadata {
  return {
    ...metadata,
    metadataBase: new URL(siteOrigin),
    alternates: {
      canonical: localePath(path, locale),
      ...(isPublished(locale) ? { languages: languageAlternates(path) } : {}),
    },
    robots: isPublished(locale)
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      ...metadata.openGraph,
      url: localePath(path, locale),
      locale: { en: 'en_US', es: 'es_ES', fr: 'fr_FR' }[locale],
      ...(isPublished(locale)
        ? {
            alternateLocale: routing.locales
              .filter((l) => l !== locale && isPublished(l))
              .map((l) => ({ en: 'en_US', es: 'es_ES', fr: 'fr_FR' })[l]),
          }
        : {}),
    },
  }
}
