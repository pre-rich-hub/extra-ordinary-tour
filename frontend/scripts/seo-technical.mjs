import assert from 'node:assert/strict'

const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const preview = process.env.SEO_CHECK_PREVIEW === '1'
const agents = {
  browser: 'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36',
  google: 'Googlebot',
  social: 'Twitterbot',
}
let checked = 0
async function get(path, agent = agents.browser) {
  const response = await fetch(`${base}${path}`, {
    redirect: 'manual',
    headers: { 'User-Agent': agent },
  })
  const html = await response.text()
  checked++
  if (preview)
    assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/, path)
  return { response, html }
}

for (const agent of Object.values(agents)) {
  for (const path of [
    '/en/tours/unknown-seo',
    '/es/destinations/unknown-seo',
    '/fr/blog/unknown-seo',
    '/en/unknown-seo',
    '/de',
    '/en/admin',
  ]) {
    const { response, html } = await get(path, agent)
    assert.equal(response.status, 404, `${agent}: ${path}`)
    assert.match(html, /<meta name="robots" content="[^"]*noindex/, path)
  }
}

for (const [path, target] of [
  ['/', '/en'],
  ['/tours/?style=trek&style=cultural', '/en/tours?style=trek&style=cultural'],
  ['/fr/tours/', '/fr/tours'],
  ['/destinations/lalibela/', '/en/destinations/lalibela'],
  ['/login/', '/login'],
]) {
  const { response } = await get(path)
  assert.equal(response.status, 308, path)
  const location = new URL(response.headers.get('location'), base)
  assert.equal(location.pathname + location.search, target, path)
  assert.equal((await get(target)).response.status, 200, target)
}

for (const locale of ['en', 'es', 'fr', 'de']) {
  const { response, html } = await get(
    `/${locale}/tours?utm_source=qa&style=trek`,
  )
  assert.equal(response.status, 200)
  assert.ok(
    html.includes(
      `rel="canonical" href="https://extraordinaryethiopiatours.com/${locale}/tours"`,
    ),
  )
  assert.match(
    html,
    preview ? /content="noindex, follow"/ : /content="index, follow"/,
  )
  assert.ok(html.includes('<h1'), 'server-rendered primary heading')
  if (!preview) assert.equal(response.headers.get('x-robots-tag'), null)
}

for (const path of ['/login', '/admin', '/admin/tours']) {
  const { response } = await get(path)
  assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/)
  assert.equal(response.status, path === '/login' ? 200 : 307)
  if (path !== '/login')
    assert.equal(
      new URL(response.headers.get('location'), base).pathname,
      '/login',
    )
}
const { html: rules } = await get('/robots.txt')
assert.match(rules, /Allow: \//)
assert.doesNotMatch(rules, /Disallow: \/(?:admin|login)/)
assert.equal(rules.includes('Sitemap:'), !preview)
const { html: xml } = await get('/sitemap.xml')
assert.equal((xml.match(/<loc>/g) ?? []).length, preview ? 0 : 401)
console.log(
  `PASS: ${checked} ${preview ? 'preview' : 'production'} technical SEO responses (browser, Googlebot and Twitterbot).`,
)
