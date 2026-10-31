import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { isPublished } from '@/i18n/publication'
import { languageAlternates, localePath, siteOrigin } from '@/lib/seo/metadata'
import { isProductionDeployment } from '@/lib/seo/environment.mjs'
import { getToursData } from '@/features/tours/server/catalog'
import { getDestinationsData } from '@/features/destinations/server/catalog'
import { getPostsData } from '@/features/blog/server/catalog'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionDeployment()) return []
  const [tours, destinations, posts] = await Promise.all([
    getToursData(),
    getDestinationsData(),
    getPostsData(),
  ])
  const paths = [
    '/',
    '/about',
    '/about-ethiopia',
    '/travel-guide',
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
