import type { MetadataRoute } from 'next'
import { siteOrigin } from '@/lib/seo/urls'
import { isProductionDeployment } from '@/lib/seo/environment.mjs'
export default function robots(): MetadataRoute.Robots {
  // Draft locales must remain crawlable so search engines can see their noindex.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    ...(isProductionDeployment()
      ? { sitemap: `${siteOrigin}/sitemap.xml` }
      : {}),
  }
}
