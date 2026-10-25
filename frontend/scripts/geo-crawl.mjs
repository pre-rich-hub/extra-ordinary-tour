// Check that robots.txt names every AI crawler with the intended policy, that
// each crawler's user agent receives the full server-rendered page (not a
// challenge, block or empty shell) on every page family in all languages, and
// that every llms.txt link resolves.
import assert from 'node:assert/strict'
import { aiCrawlers, allowTraining } from '../src/lib/seo/crawlers.mjs'
import { catalogueSpecs, readCatalogue } from './i18n-catalogue.mjs'

const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const preview = process.env.SEO_CHECK_PREVIEW === '1'
const failures = []
const check = (ok, message) => {
  if (!ok) failures.push(message)
  return ok
}

// robots.txt: group the rules under each User-agent line.
const groups = new Map()
let current = []
let inRules = false
for (const line of (await (await fetch(`${base}/robots.txt`)).text()).split(
  '\n',
)) {
  const [key, ...rest] = line.split(':')
  const value = rest.join(':').trim()
  if (/^user-agent$/i.test(key)) {
    if (inRules) current = []
    inRules = false
    current.push(value)
    groups.set(value, [])
  } else if (/^(allow|disallow)$/i.test(key)) {
    inRules = true
    for (const agent of current) groups.get(agent).push(`${key}: ${value}`)
  }
}
const open = ['Allow: /', 'Disallow: /api/']
for (const { token, purpose } of [{ token: '*' }, ...aiCrawlers]) {
  const expected =
    purpose === 'training' && !allowTraining ? ['Disallow: /'] : open
  check(
    JSON.stringify(groups.get(token)) === JSON.stringify(expected),
    `robots.txt ${token}: expected ${expected.join(', ')}, got ${groups.get(token)?.join(', ') ?? 'no group'}`,
  )
}

// Pages: one per family and language, fetched as each crawler.
const first = (feature) =>
  readCatalogue(catalogueSpecs.find((spec) => spec.feature === feature))[0].slug
const paths = ['en', 'es', 'fr'].flatMap((locale) =>
  [
    '',
    '/about',
    '/about-ethiopia',
    '/travel-guide',
    '/tours',
    `/tours/${first('tours')}`,
    `/destinations/${first('destinations')}`,
    `/blog/${first('blog')}`,
    '/layover',
    '/contact',
  ].map((path) => `/${locale}${path}`),
)
paths.push('/en/privacy-policy')
const words = (html) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
let fetched = 0
for (const { token, userAgent } of aiCrawlers.filter((c) => c.userAgent))
  await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(`${base}${path}`, {
        redirect: 'manual',
        headers: { 'User-Agent': userAgent },
      })
      const html = await response.text()
      fetched++
      const where = `${token} ${path}`
      if (!check(response.status === 200, `${where}: HTTP ${response.status}`))
        return
      check(/<h1[\s>]/.test(html), `${where}: no server-rendered H1`)
      check(words(html) >= 250, `${where}: only ${words(html)} words`)
      const header = response.headers.get('x-robots-tag') ?? ''
      check(
        preview
          ? /noindex/.test(header)
          : !header && html.includes('content="index, follow"'),
        `${where}: robots ${header || 'meta'} does not match ${preview ? 'preview' : 'production'}`,
      )
    }),
  )

// llms.txt: generated from the catalogues; every link must resolve directly.
const llms = await fetch(`${base}/llms.txt`)
const index = await llms.text()
check(llms.status === 200, `llms.txt: HTTP ${llms.status}`)
check(
  /^text\/markdown/.test(llms.headers.get('content-type') ?? ''),
  'llms.txt: not served as Markdown',
)
const origin = 'https://extraordinaryethiopiatours.com'
const links = [...index.matchAll(/\]\((https:[^)]+)\)/g)].map((m) => m[1])
const expected =
  6 +
  ['tours', 'destinations', 'blog']
    .map(
      (feature) =>
        readCatalogue(catalogueSpecs.find((spec) => spec.feature === feature))
          .length,
    )
    .reduce((a, b) => a + b)
check(
  links.length === expected && new Set(links).size === links.length,
  `llms.txt: ${links.length} links, expected ${expected} distinct`,
)
for (let i = 0; i < links.length; i += 8)
  await Promise.all(
    links.slice(i, i + 8).map(async (url) => {
      check(url.startsWith(`${origin}/en`), `llms.txt: ${url} not canonical`)
      const response = await fetch(base + url.slice(origin.length), {
        redirect: 'manual',
      })
      check(response.status === 200, `llms.txt: ${url} HTTP ${response.status}`)
    }),
  )

if (failures.length) {
  failures.slice(0, 20).forEach((f) => console.error(f))
  console.error(`FAIL: ${failures.length} AI crawler problems.`)
  process.exit(1)
}
assert.ok(fetched > 0)
console.log(
  `PASS: robots.txt names ${aiCrawlers.length} AI crawlers (training ${allowTraining ? 'allowed' : 'blocked'}); ${fetched} ${preview ? 'preview' : 'production'} page fetches as ${fetched / paths.length} crawlers returned full HTML; llms.txt lists ${links.length} resolving pages.`,
)
