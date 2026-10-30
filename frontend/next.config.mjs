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
    ].map(([from, to]) => ({
      source: `/:locale(en|es|fr|de)/${from}`,
      destination: `/:locale/${to}`,
      permanent: true,
    }))
  },
  async rewrites() {
    const apiBase = resolveApiBase(process.env.API_BASE_URL)
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default withNextIntl(nextConfig)
