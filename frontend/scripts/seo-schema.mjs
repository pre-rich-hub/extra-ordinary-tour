// Phase 3 audit: JSON-LD on every sitemap URL parses, resolves its @id
// references, matches visible content and avoids ineligible markup.
const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const origin = 'https://extraordinaryethiopiatours.com'
const organization = `${origin}/#organization`
const website = `${origin}/#website`
const forbidden = ['AggregateRating', 'Review', 'FAQPage']
// Main entity type expected for each route family.
const mainTypes = [
  [/^\/\w\w\/blog\/./, 'BlogPosting'],
  [/^\/\w\w\/tours\/./, 'TouristTrip'],
  [/^\/\w\w\/destinations\/./, 'TouristDestination'],
  [/^\/\w\w\/about$/, 'TravelAgency'],
]

const squash = (s) => s.replace(/\s+/g, ' ').trim()
const text = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
const flatten = (node, out = []) => {
  if (Array.isArray(node)) node.forEach((n) => flatten(n, out))
  else if (node && typeof node === 'object') {
    out.push(node)
    Object.values(node).forEach((n) => flatten(n, out))
  }
  return out
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urls.length) throw new Error(`No sitemap URLs at ${base}/sitemap.xml`)
const problems = []
const counts = {}

async function audit(url) {
  const path = url.slice(origin.length)
  const fail = (message) => problems.push(`${path}: ${message}`)
  const html = await (await fetch(`${base}${path}`)).text()
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
  let nodes
  try {
    nodes = flatten(blocks.map((b) => JSON.parse(b[1])))
  } catch (error) {
    return fail(`JSON-LD does not parse: ${error.message}`)
  }
  const byId = new Map()
  for (const n of nodes)
    if (n['@type'] && n['@id']) {
      if (byId.has(n['@id'])) fail(`duplicate entity ${n['@id']}`)
      byId.set(n['@id'], n)
    }
  for (const n of nodes) {
    if (forbidden.includes(n['@type'])) fail(`ineligible ${n['@type']}`)
    if (!n['@type'] && n['@id'] && !byId.has(n['@id']))
      fail(`unresolved reference ${n['@id']}`)
    if (n['@type'] === 'Offer' && !(n.price > 0)) fail('offer without price')
    if (n['@type']) counts[n['@type']] = (counts[n['@type']] ?? 0) + 1
  }
  if (!byId.has(organization) || !byId.has(website))
    fail('missing site organization or website')
  if (nodes.filter((n) => n['@type'] === 'TravelAgency').length !== 1)
    fail('business entity is not unique')

  const page = byId.get(`${url}#webpage`)
  if (!page) return fail('missing WebPage entity for canonical URL')
  if (page.inLanguage !== path.split('/')[1]) fail('WebPage language')

  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '')
  const crumbs = page.breadcrumb && byId.get(page.breadcrumb['@id'])
  const nav = html.match(/<nav aria-label="[^"]*"[^>]*>([\s\S]*?)<\/nav>/)
  if (crumbs) {
    const visible = nav ? text(nav[1]) : ''
    for (const [i, item] of crumbs.itemListElement.entries()) {
      // The final crumb names the current page, shown as its heading.
      const last = i === crumbs.itemListElement.length - 1
      const name = squash(item.name)
      if (!visible.includes(name) && !(last && name === h1))
        fail(`crumb "${item.name}" not visible`)
      if (!item.item.startsWith(`${origin}/${page.inLanguage}`))
        fail(`crumb URL ${item.item}`)
    }
    if (crumbs.itemListElement.at(-1).item !== url) fail('last crumb URL')
  }

  const expected = mainTypes.find(([pattern]) => pattern.test(path))?.[1]
  const main = page.mainEntity && byId.get(page.mainEntity['@id'])
  if (expected && main?.['@type'] !== expected)
    fail(`main entity ${main?.['@type']} instead of ${expected}`)
  const name = squash(main?.headline ?? main?.name ?? '')
  if (main && expected !== 'TravelAgency' && name !== h1)
    fail(`main entity name "${name}" differs from h1 "${h1}"`)
}

for (let i = 0; i < urls.length; i += 8)
  await Promise.all(urls.slice(i, i + 8).map(audit))

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(
    `FAIL: ${problems.length} structured-data problems across ${urls.length} URLs.`,
  )
  process.exit(1)
}
console.log(
  `PASS: ${urls.length} URLs have valid, resolvable JSON-LD. Entities: ${Object.entries(
    counts,
  )
    .map(([type, n]) => `${type} ${n}`)
    .join(', ')}.`,
)
