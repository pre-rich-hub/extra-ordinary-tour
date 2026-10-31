import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import createNextIntlPlugin from 'next-intl/plugin'
import { resolveApiBase } from './src/lib/api/base-url.mjs'
import { isProductionDeployment } from './src/lib/seo/environment.mjs'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project. Without it Next walks up to the
  // user's home directory because a stray lockfile lives there, which widens
  // output tracing and produces misleading build warnings.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  experimental: {
    globalNotFound: true,
    // lucide-react is optimized by default in Next 16; @base-ui/react is listed
    // explicitly so its subpath imports resolve to single modules.
    optimizePackageImports: ['lucide-react', '@base-ui/react'],
  },
  // Keep documentation and verification tooling out of every serverless
  // trace. Public assets are excluded from upload by .vercelignore and served
  // by the CDN, not read by a function at runtime.
  outputFileTracingExcludes: {
    '/*': [
      './docs/**/*',
      './scripts/**/*',
      './tests/**/*',
      './*.md',
      './tsconfig.tsbuildinfo',
    ],
  },
  // Resolve metadata/notFound before committing a streamed HTTP 200.
  htmlLimitedBots: /.*/,
  trailingSlash: false,
  // Normalize trailing slashes and missing locale together in the proxy.
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/media/cloudinary-loader.ts',
    // Finer steps than the default (640 → 750 → … → 3840): cards near 450px
    // get 480px files, and full-bleed heroes stop at 2560px.
    deviceSizes: [480, 640, 750, 828, 960, 1080, 1200, 1440, 1920, 2560],
  },
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    return isProductionDeployment()
      ? ['/admin/:path*', '/login/:path*', '/api/:path*'].map((source) => ({
          source,
          headers: noindex,
        }))
      : [{ source: '/:path*', headers: noindex }]
  },
  // Journal articles superseded by the About Ethiopia and Travel Guide pages,
  // and destination guides replaced by more specific ones.
  async redirects() {
    return [
      ['blog/about-ethiopia', 'about-ethiopia'],
      ['blog/what-to-know-before-visiting-ethiopia', 'travel-guide'],
      ['destinations/yirgacheffe-and-sidama', 'destinations/yirgacheffe'],
    ]
      .map(([from, to]) => ({
        source: `/:locale(en|es|fr|de)/${from}`,
        destination: `/:locale/${to}`,
        permanent: true,
      }))
      .concat(
        // Pages of the client's previous, English-only site that Google still
        // requests. Its spam pages (/shop/…, /cate-…) are left to 404.
        [
          ['3-days-smnp-trekking', 'tours/3-day-simien-mountains-trek'],
          ['4-days-addis-lalibela-tours', 'tours/4-day-addis-and-lalibela'],
          [
            '5-days-simien-mountains-national-park-tours',
            'tours/5-day-simien-mountains-trek',
          ],
          ['5-days-smnp-tours', 'tours/5-day-simien-mountains-trek'],
          [
            '5-days-tigray-churches-tours',
            'tours/5-day-tigray-rock-hewn-churches',
          ],
          [
            '5-days-timket-festival-tours',
            'tours/5-day-timkat-festival-lalibela',
          ],
          [
            '6-days-bale-mountain-national-park-trekking',
            'tours/6-day-bale-mountains-trek',
          ],
          [
            '6-days-omo-valley-cultural-tours',
            'tours/6-day-omo-valley-tribal-and-cultural',
          ],
          [
            '8-days-north-with-christmas-festival-tours',
            'tours/8-day-north-with-genna-christmas',
          ],
          ['abijatta-shalla-lake', 'destinations/abijatta-shalla'],
          ['semien-mountain-national-park', 'destinations/simien-mountains'],
          ['negashi', 'destinations/negash'],
          ['hammer', 'destinations/hamar-people'],
          ['festival-events', 'destinations#festivals-and-events'],
          ['nature-wildlife', 'destinations#nature-and-wildlife'],
          ['important-information-holidays', 'travel-guide#holidays'],
          [
            '2026/06/12/lalibela-churches-guide-discover-ethiopias-remarkable-rock-hewn-wonders',
            'blog/lalibela-churches-guide',
          ],
          [
            '2026/06/17/simien-mountains-trekking-guide-2026-ethiopias-roof-of-africa-adventure',
            'blog/simien-mountains-trekking-guide',
          ],
        ].map(([from, to]) => ({
          source: `/${from}`,
          destination: `/en/${to}`,
          permanent: true,
        })),
      )
  },
  async rewrites() {
    const apiBase = resolveApiBase(process.env.API_BASE_URL)
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default withNextIntl(nextConfig)
