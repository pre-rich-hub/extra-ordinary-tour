import type { Metadata } from 'next'
import { isPublished } from '@/i18n/publication'
import { routing, type AppLocale } from '@/i18n/routing'
import { localePath, siteOrigin } from './urls'
import { site } from './entities'
import { isProductionDeployment } from './environment.mjs'
export { localePath, siteOrigin } from './urls'

const OG_DEFAULT_IMAGE = {
  url: '/images/og-default.jpg',
  width: 1200,
  height: 630,
  alt: site.name,
} as const

const LOCALE_OG_MAP: Record<AppLocale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
}

const cloudinaryUpload = 'https://res.cloudinary.com/oyw9kdvp/image/upload/'

/** A 1200×630 JPEG crop of a catalogue image, sized for link previews. */
export function socialImage(src: string, alt: string) {
  if (!src.startsWith(cloudinaryUpload)) return { url: src, alt }
  // Replace the default delivery transformation rather than stacking crops.
  const asset = src
    .slice(cloudinaryUpload.length)
    .replace(/^f_auto,q_auto,c_limit,w_\d+\//, '')
  return {
    url: `${cloudinaryUpload}f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/${asset}`,
    width: 1200,
    height: 630,
    alt,
  }
}

export function languageAlternates(path: string) {
  return Object.fromEntries([
    ...routing.locales
      .filter(isPublished)
      .map((locale) => [locale, localePath(path, locale)]),
    ['x-default', localePath(path, 'en')],
  ])
}

/** Resolve the page title as a plain string for OG/Twitter propagation. */
function resolveTitle(metadata: Metadata): string | undefined {
  if (!metadata.title) return undefined
  if (typeof metadata.title === 'string') return metadata.title
  if ('absolute' in metadata.title) return metadata.title.absolute
  if ('default' in metadata.title) return metadata.title.default
  return undefined
}

export function buildPageMetadata(
  metadata: Metadata,
  path: string,
  locale: AppLocale,
): Metadata {
  const resolvedTitle = resolveTitle(metadata)
  const resolvedDescription = metadata.description ?? undefined

  // OG images: use page-specific images if provided, otherwise fall back to default.
  const ogImages =
    metadata.openGraph && 'images' in metadata.openGraph && metadata.openGraph.images
      ? metadata.openGraph.images
      : [OG_DEFAULT_IMAGE]

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
      siteName: site.name,
      type: 'website',
      ...metadata.openGraph,
      // Title and description: use OG-specific if provided, else propagate from page metadata.
      title:
        metadata.openGraph?.title ?? resolvedTitle ?? undefined,
      description:
        metadata.openGraph?.description ?? resolvedDescription ?? undefined,
      url: localePath(path, locale),
      locale: LOCALE_OG_MAP[locale],
      images: ogImages,
      ...(isPublished(locale)
        ? {
            alternateLocale: routing.locales
              .filter((l) => l !== locale && isPublished(l))
              .map((l) => LOCALE_OG_MAP[l]),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      ...metadata.twitter,
      title: metadata.twitter?.title ?? resolvedTitle ?? undefined,
      description:
        metadata.twitter?.description ?? resolvedDescription ?? undefined,
      // Twitter images: mirror OG images unless twitter-specific ones are set.
      ...(!metadata.twitter?.images ? { images: ogImages } : {}),
    },
  }
}
