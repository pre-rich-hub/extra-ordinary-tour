import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { isPublished } from '@/i18n/publication'
import { languageAlternates, localePath, siteOrigin } from '@/lib/seo/metadata'
import { isProductionDeployment } from '@/lib/seo/environment.mjs'
import { tours } from '@/features/tours/data/tours'
import { destinations } from '@/features/destinations/data/destinations'
import { posts } from '@/features/blog/data/posts'
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDeployment()) return []
  const paths = [
    '/',
    '/about',
    '/tours',
    '/destinations',
    '/layover',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
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
