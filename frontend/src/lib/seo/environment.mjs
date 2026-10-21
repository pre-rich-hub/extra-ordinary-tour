/**
 * Set SEO_ENV at BUILD time on non-Vercel preview/staging deployments.
 * Production remains indexable in every published locale.
 * @param {Record<string, string | undefined>} env
 */
export function isProductionDeployment(env = process.env) {
  const environment =
    env.SEO_ENV ??
    env.VERCEL_ENV ??
    (env.NODE_ENV === 'development' ? 'development' : 'production')
  return environment === 'production'
}
