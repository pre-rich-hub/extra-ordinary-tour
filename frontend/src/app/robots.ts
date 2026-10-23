import type { MetadataRoute } from 'next'
import { siteOrigin } from '@/lib/seo/urls'
import { isProductionDeployment } from '@/lib/seo/environment.mjs'
import { aiCrawlers, allowTraining } from '@/lib/seo/crawlers.mjs'

const tokens = (purpose: string) =>
  aiCrawlers.filter((c) => c.purpose === purpose).map((c) => c.token)

export default function robots(): MetadataRoute.Robots {
  // Draft locales must remain crawlable so search engines can see their noindex.
  // A named group replaces `*` for that crawler, so each repeats the API rule.
  const site = { allow: '/', disallow: ['/api/'] }
  return {
    rules: [
      { userAgent: '*', ...site },
      { userAgent: tokens('retrieval'), ...site },
      {
        userAgent: tokens('training'),
        ...(allowTraining ? site : { disallow: '/' }),
      },
    ],
    ...(isProductionDeployment()
      ? { sitemap: `${siteOrigin}/sitemap.xml` }
      : {}),
  }
}
