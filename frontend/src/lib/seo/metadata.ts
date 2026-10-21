import type { Metadata } from 'next'
import { isPublished } from '@/i18n/publication'
import { routing, type AppLocale } from '@/i18n/routing'
import { localePath, siteOrigin } from './urls'
import { isProductionDeployment } from './environment.mjs'
export { localePath, siteOrigin } from './urls'
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
    robots:
      isProductionDeployment() && isPublished(locale)
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
