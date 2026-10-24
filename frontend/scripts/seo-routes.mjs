// Phase 6 route crawl: every sitemap URL, its headers, headings and internal
// links, plus sitemap/page agreement on language alternates. The sitemap is
// the inventory; nothing here keeps a second list of public routes.
const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const origin = 'https://extraordinaryethiopiatours.com'
const problems = []
const fail = (path, message) => problems.push(`${path}: ${message}`)
const local = (url) => `${base}${url.slice(origin.length)}`

const decode = (s) => s.replace(/&amp;/g, '&')
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  url: m[1].match(/<loc>([^<]+)<\/loc>/)[1],
  alternates: Object.fromEntries(
    [
      ...m[1].matchAll(
        /<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g,
      ),
    ].map((a) => [a[1], decode(a[2])]),
  ),
}))
if (!entries.length) throw new Error(`No sitemap URLs at ${base}/sitemap.xml`)
const listed = new Set(entries.map((e) => e.url))

const links = new Map()
async function crawl({ url, alternates }) {
  const path = url.slice(origin.length)
  const response = await fetch(local(url), { redirect: 'manual' })
  if (response.status !== 200) return fail(path, `HTTP ${response.status}`)
  if (response.headers.get('x-robots-tag'))
    fail(path, `X-Robots-Tag ${response.headers.get('x-robots-tag')}`)
  const html = await response.text()
  const head = html.slice(0, html.indexOf('</head>'))
  if (!/<meta name="robots" content="index, follow"/.test(head))
    fail(path, 'robots meta is not index, follow')

  // Language alternates on the page must match the sitemap, and every
  // alternate must be listed in the sitemap and point back (reciprocity).
  const onPage = Object.fromEntries(
    [
      ...head.matchAll(
        /<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g,
      ),
    ].map((a) => [a[1], decode(a[2])]),
  )
  if (JSON.stringify(onPage) !== JSON.stringify(alternates))
    fail(path, 'page alternates differ from sitemap')
  for (const [lang, target] of Object.entries(alternates)) {
    if (!listed.has(target)) fail(path, `${lang} alternate not in sitemap`)
    const back = entries.find((e) => e.url === target)
    if (back && !Object.values(back.alternates).includes(url))
      fail(path, `${lang} alternate does not link back`)
  }

  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1])
  if (levels.filter((l) => l === 1).length !== 1)
    fail(path, `${levels.filter((l) => l === 1).length} H1 elements`)
  if (levels[0] !== 1) fail(path, 'first heading is not the H1')
  levels.forEach((l, i) => {
    if (i && l > levels[i - 1] + 1)
      fail(path, `heading skips h${levels[i - 1]} → h${l}`)
  })

  const body = html.slice(html.indexOf('<body'))
  if (/<a [^>]*href="#"/.test(body)) fail(path, 'placeholder # link')
  for (const [, href] of body.matchAll(/<a [^>]*href="(\/[^"#?]*)/g))
    if (!href.startsWith('/_next')) {
      if (!links.has(href)) links.set(href, new Set())
      links.get(href).add(path)
    }
}

for (let i = 0; i < entries.length; i += 8)
  await Promise.all(entries.slice(i, i + 8).map(crawl))

// Every distinct internal link target resolves directly (no redirect hops).
const targets = [...links.keys()]
for (let i = 0; i < targets.length; i += 8)
  await Promise.all(
    targets.slice(i, i + 8).map(async (href) => {
      const response = await fetch(`${base}${href}`, { redirect: 'manual' })
      if (response.status !== 200)
        problems.push(
          `link ${href} → HTTP ${response.status} (from ${[...links.get(href)].slice(0, 3).join(', ')})`,
        )
    }),
  )

// Edge cases beyond seo:technical: query variants and unknown slugs on detail
// templates, and translated legal pages.
const cases = [
  [
    '/en/tours/10-day-historic-route?utm_source=qa',
    200,
    `${origin}/en/tours/10-day-historic-route`,
  ],
  [
    '/fr/destinations/lalibela?ref=x#top',
    200,
    `${origin}/fr/destinations/lalibela`,
  ],
  [
    '/es/blog/best-time-to-visit-ethiopia?page=2',
    200,
    `${origin}/es/blog/best-time-to-visit-ethiopia`,
  ],
  ['/es/privacy-policy', 200, `${origin}/es/privacy-policy`],
  ['/fr/terms-and-conditions', 200, `${origin}/fr/terms-and-conditions`],
  ['/en/destinations/atlantis', 404],
  ['/fr/tours/10-day-historic-route-x', 404],
  ['/es/legal', 404],
]
for (const [path, status, canonical] of cases) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' })
  if (response.status !== status)
    fail(path, `HTTP ${response.status}, expected ${status}`)
  if (canonical) {
    const html = await response.text()
    if (!html.includes(`<link rel="canonical" href="${canonical}"/>`))
      fail(path, `canonical is not ${canonical}`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`FAIL: ${problems.length} route problems.`)
  process.exit(1)
}
console.log(
  `PASS: ${entries.length} sitemap URLs (headers, robots, reciprocal alternates, headings), ${targets.length} internal link targets and ${cases.length} edge cases.`,
)
