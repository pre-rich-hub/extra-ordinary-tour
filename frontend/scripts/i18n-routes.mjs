import assert from 'node:assert/strict'
import { catalogueSpecs, readCatalogue } from './i18n-catalogue.mjs'
const base = process.env.I18N_BASE_URL ?? 'http://127.0.0.1:3104'
const paths = [
  '/',
  '/about',
  '/tours',
  '/destinations',
  '/layover',
  '/gallery',
  '/blog',
  '/contact',
]
for (const feature of ['tours', 'destinations', 'blog'])
  paths.push(
    ...readCatalogue(
      catalogueSpecs.find((spec) => spec.feature === feature),
    ).map((record) => `/${feature}/${record.slug}`),
  )
const jobs = ['en', 'es', 'fr'].flatMap((locale) =>
  paths.map((path) => ({ locale, path })),
)
let completed = 0
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (;;) {
      const job = jobs.pop()
      if (!job) break
      const { locale, path } = job
      const localized = `/${locale}${path === '/' ? '' : path}`
      const response = await fetch(`${base}${localized}`)
      assert.equal(response.status, 200, localized)
      const html = await response.text()
      assert.ok(
        html.includes(`<html lang="${locale}"`),
        `${localized}: document language`,
      )
      assert.ok(
        html.includes(
          `rel="canonical" href="https://extraordinaryethiopiatours.com${localized}"`,
        ),
        `${localized}: canonical`,
      )
      assert.ok(
        html.includes('content="index, follow"'),
        `${localized}: robots`,
      )
      for (const language of ['en', 'es', 'fr', 'x-default']) {
        const targetLocale = language === 'x-default' ? 'en' : language
        const target = `https://extraordinaryethiopiatours.com/${targetLocale}${path === '/' ? '' : path}`
        assert.ok(
          html.includes(`hrefLang="${language}" href="${target}"`),
          `${localized}: ${language} alternate`,
        )
      }
      assert.ok(
        !html.includes('NEXT_NOT_FOUND'),
        `${localized}: unexpected 404`,
      )
      completed++
    }
  }),
)
for (const path of ['/', '/about', '/tours/7-day-historic-route']) {
  const response = await fetch(`${base}${path}?ref=qa`, { redirect: 'manual' })
  assert.equal(response.status, 308, path)
  assert.equal(
    new URL(response.headers.get('location'), base).pathname,
    `/en${path === '/' ? '' : path}`,
  )
  assert.equal(
    new URL(response.headers.get('location'), base).search,
    '?ref=qa',
  )
}
for (const path of [
  '/de',
  '/de/tours',
  '/en/unknown',
  '/fr/tours/unknown',
  '/es/destinations/unknown',
  '/fr/blog/unknown',
  '/en/admin',
]) {
  const response = await fetch(`${base}${path}`)
  const html = await response.text()
  assert.ok(
    response.status === 404 && html.includes('noindex'),
    `${path}: 404/noindex`,
  )
}
const xml = await (await fetch(`${base}/sitemap.xml`)).text()
// Translated pages carry language alternates; the rest are English-only legal pages.
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
assert.equal(
  entries.filter((entry) => entry.includes('hreflang=')).length,
  paths.length * 3,
)
assert.deepEqual(
  entries
    .filter((entry) => !entry.includes('hreflang='))
    .map((entry) => new URL(entry.match(/<loc>([^<]+)/)[1]).pathname),
  ['/en/privacy-policy', '/en/terms-and-conditions'],
)
assert.ok(
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].every((match) =>
    /^\/(?:en|es|fr)(?:\/|$)/.test(new URL(match[1]).pathname),
  ),
  'Unexpected locale in sitemap',
)
assert.ok(
  (await (await fetch(`${base}/robots.txt`)).text()).includes(
    'Disallow: /api/',
  ),
)
assert.equal((await fetch(`${base}/login`)).status, 200)
console.log(
  `PASS: ${completed} localized pages, English redirects, invalid routes, sitemap, robots and login.`,
)
