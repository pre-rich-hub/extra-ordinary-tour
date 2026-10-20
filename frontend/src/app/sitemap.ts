import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { isPublished } from '@/i18n/publication'
import { languageAlternates, localePath, siteOrigin } from '@/i18n/metadata'
import { tours } from '@/features/tours/data/tours'
import { destinations } from '@/features/destinations/data/destinations'
import { posts } from '@/features/blog/data/posts'
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/tours',
    '/destinations',
    '/layover',
    '/gallery',
    '/blog',
    '/contact',
    ...tours.map((t) => `/tours/${t.slug}`),
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]
  return routing.locales.filter(isPublished).flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteOrigin}${localePath(path, locale)}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([lang, url]) => [
            lang,
            `${siteOrigin}${url}`,
          ]),
        ),
      },
    })),
  )
}
