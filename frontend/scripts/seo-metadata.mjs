// Phase 2 audit: every sitemap URL has complete, localized, non-duplicated
// metadata and a resolvable social image. Run against a production server.
const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const origin = 'https://extraordinaryethiopiatours.com'
const locales = ['en', 'es', 'fr']
// Intentional exceptions: none yet. Add `path: reason` entries here.
const duplicateExceptions = {}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]),
  )
function head(html) {
  const section = html.slice(0, html.indexOf('</head>'))
  const metas = [...section.matchAll(/<meta [^>]*>/g)].map((m) => attrs(m[0]))
  const links = [...section.matchAll(/<link [^>]*>/g)].map((m) => attrs(m[0]))
  const meta = (key) =>
    metas
      .filter((m) => m.name === key || m.property === key)
      .map((m) => m.content)
  return {
    title: decode(section.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
    meta,
    canonical: links.filter((l) => l.rel === 'canonical').map((l) => l.href),
    alternates: Object.fromEntries(
      links
        .filter((l) => l.rel === 'alternate' && l.hrefLang)
        .map((l) => [l.hrefLang, l.href]),
    ),
  }
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urls.length) throw new Error(`No sitemap URLs at ${base}/sitemap.xml`)

const problems = []
const seen = { title: new Map(), description: new Map() }
const images = new Set()
const fail = (path, message) => problems.push(`${path}: ${message}`)

async function audit(url) {
  const path = url.slice(origin.length)
  const locale = path.split('/')[1]
  const response = await fetch(`${base}${path}`)
  if (response.status !== 200) return fail(path, `HTTP ${response.status}`)
  const h = head(await response.text())
  const [description] = h.meta('description')
  const one = (key) => {
    const values = h.meta(key)
    if (values.length !== 1) fail(path, `${values.length} × ${key}`)
    return values[0]
  }

  if (!h.title) fail(path, 'missing <title>')
  if (!description) fail(path, 'missing description')
  if (h.title.split('Extraordinary Ethiopia Tours').length > 2)
    fail(path, `brand repeated in title "${h.title}"`)
  if (h.canonical.length !== 1 || h.canonical[0] !== url)
    fail(path, `canonical ${JSON.stringify(h.canonical)}`)
  for (const l of locales)
    if (h.alternates[l] !== `${origin}/${l}${path.slice(3)}`)
      fail(path, `hreflang ${l} → ${h.alternates[l]}`)
  if (h.alternates['x-default'] !== `${origin}/en${path.slice(3)}`)
    fail(path, `x-default → ${h.alternates['x-default']}`)

  if (!one('og:title')) fail(path, 'empty og:title')
  if (one('og:description') !== description)
    fail(path, 'og:description differs from description')
  if (one('og:url') !== url) fail(path, 'og:url differs from canonical')
  one('og:site_name')
  one('og:locale')
  if (one('twitter:card') !== 'summary_large_image')
    fail(path, 'twitter:card is not summary_large_image')
  const image = one('og:image')
  if (!image?.startsWith('https://'))
    fail(path, `og:image not absolute: ${image}`)
  else images.add(image)
  if (!one('og:image:alt')) fail(path, 'empty og:image:alt')
  if (one('twitter:image') !== image) fail(path, 'twitter:image differs')
  if (/\/blog\/./.test(path)) {
    if (one('og:type') !== 'article') fail(path, 'article og:type')
    if (!/^\d{4}-\d{2}-\d{2}/.test(one('article:published_time') ?? ''))
      fail(path, 'article:published_time is not an ISO date')
  }

  for (const [field, value] of [
    ['title', h.title],
    ['description', description],
  ]) {
    const key = `${locale}\n${value}`
    if (!seen[field].has(key)) seen[field].set(key, [])
    seen[field].get(key).push(path)
  }
}

for (let i = 0; i < urls.length; i += 8)
  await Promise.all(urls.slice(i, i + 8).map(audit))

for (const [field, groups] of Object.entries(seen))
  for (const paths of groups.values()) {
    const reported = paths.filter((p) => !duplicateExceptions[p])
    if (reported.length > 1)
      problems.push(`duplicate ${field}: ${reported.join(', ')}`)
  }

for (const image of images) {
  const local = image.startsWith(origin)
    ? `${base}${image.slice(origin.length)}`
    : image
  // One retry absorbs a transient network timeout to the image CDN.
  const head = () => fetch(local, { method: 'HEAD' })
  const response = await head()
    .catch(head)
    .catch((error) => error)
  const type = response.headers?.get('content-type') ?? ''
  if (response.status !== 200 || !type.startsWith('image/'))
    problems.push(
      `og:image ${image}: ${response.status ? `HTTP ${response.status} ${type}` : (response.cause?.code ?? response.message)}`,
    )
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(
    `FAIL: ${problems.length} metadata problems across ${urls.length} URLs.`,
  )
  process.exit(1)
}
console.log(
  `PASS: ${urls.length} URLs have unique localized metadata, canonicals, hreflang and ${images.size} resolvable social images.`,
)
