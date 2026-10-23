// Check that every JSON-LD @type on every sitemap URL is a Schema.org class and
// every property is declared on that class or an ancestor. Downloads the
// official vocabulary once (or reads SCHEMA_VOCAB) and caches it in tmpdir.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const base = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3104'
const origin = 'https://extraordinaryethiopiatours.com'
const source =
  'https://schema.org/version/latest/schemaorg-current-https.jsonld'
const cache =
  process.env.SCHEMA_VOCAB ?? path.join(os.tmpdir(), 'schemaorg-current.jsonld')
if (!fs.existsSync(cache)) {
  const response = await fetch(source).catch((error) => {
    console.error(
      `FAIL: could not download ${source} (${error.cause?.code ?? error.message}). Download it and set SCHEMA_VOCAB=<path>.`,
    )
    process.exit(1)
  })
  fs.writeFileSync(cache, await response.text())
}

const list = (v) => (v ? (Array.isArray(v) ? v : [v]) : [])
const name = (id) => id.replace(/^schema:/, '')
const parents = new Map()
const domains = new Map()
for (const n of JSON.parse(fs.readFileSync(cache, 'utf8'))['@graph']) {
  const types = list(n['@type'])
  if (types.includes('rdfs:Class'))
    parents.set(
      name(n['@id']),
      list(n['rdfs:subClassOf']).map((p) => name(p['@id'])),
    )
  if (types.includes('rdf:Property'))
    domains.set(
      name(n['@id']),
      list(n['schema:domainIncludes']).map((d) => name(d['@id'])),
    )
}
const lineage = (type, seen = new Set()) => {
  if (!seen.has(type)) {
    seen.add(type)
    for (const p of parents.get(type) ?? []) lineage(p, seen)
  }
  return seen
}

const problems = new Map()
function walk(node, page) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, page))
  if (!node || typeof node !== 'object') return
  const type = node['@type']
  if (type) {
    const report = (message) =>
      problems.set(message, (problems.get(message) ?? new Set()).add(page))
    if (!parents.has(type)) report(`unknown type ${type}`)
    const ancestors = lineage(type)
    for (const key of Object.keys(node)) {
      if (key.startsWith('@')) continue
      const allowed = domains.get(key)
      if (!allowed) report(`unknown property ${key}`)
      else if (!allowed.some((d) => ancestors.has(d)))
        report(`${key} is not expected on ${type}`)
    }
  }
  Object.values(node).forEach((n) => walk(n, page))
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].slice(origin.length),
)
for (let i = 0; i < urls.length; i += 8)
  await Promise.all(
    urls.slice(i, i + 8).map(async (page) => {
      const html = await (await fetch(`${base}${page}`)).text()
      for (const m of html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ))
        walk(JSON.parse(m[1]), page)
    }),
  )

if (problems.size) {
  for (const [message, pages] of problems)
    console.error(`${message} (${pages.size} pages, e.g. ${[...pages][0]})`)
  console.error(`FAIL: ${problems.size} Schema.org vocabulary problems.`)
  process.exit(1)
}
console.log(
  `PASS: JSON-LD on ${urls.length} URLs uses only Schema.org types and properties valid for each type.`,
)
