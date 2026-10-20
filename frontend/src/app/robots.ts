import type { MetadataRoute } from 'next'
import { siteOrigin } from '@/i18n/metadata'
export default function robots(): MetadataRoute.Robots {
  // Draft locales must remain crawlable so search engines can see their noindex.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/api/'],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  }
}
