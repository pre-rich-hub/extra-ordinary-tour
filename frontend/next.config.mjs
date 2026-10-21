import createNextIntlPlugin from 'next-intl/plugin'
import { isProductionDeployment } from './src/lib/seo/environment.mjs'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { globalNotFound: true },
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
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? 'http://localhost:5000'
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default withNextIntl(nextConfig)
