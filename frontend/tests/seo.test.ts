import { afterEach, describe, expect, it, vi } from 'vitest'
import { absoluteUrl, canonicalPath, localePath } from '@/lib/seo/urls'
import { buildPageMetadata } from '@/lib/seo/metadata'
import {
  pageGraph,
  schemaIds,
  serializeJsonLd,
  siteGraph,
  tripSchema,
} from '@/lib/seo/schema'
import { isProductionDeployment } from '@/lib/seo/environment.mjs'
import {
  placeDestinations,
  relatedTours,
  toursVisiting,
} from '@/features/destinations/data/relations'
import { postDestinations, postsAbout } from '@/features/blog/data/relations'
import { getDestinations } from '@/features/destinations/data/localized'
import { getTours } from '@/features/tours/data/localized'
import { getPosts } from '@/features/blog/data/localized'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

afterEach(() => vi.unstubAllEnvs())

describe('canonical URL policy', () => {
  it('drops tracking, filter parameters and fragments without changing language', () => {
    expect(
      localePath('/tours/?utm_source=email&style=trek#results', 'fr'),
    ).toBe('/fr/tours')
    expect(absoluteUrl('/es/?ref=test')).toBe(
      'https://extraordinaryethiopiatours.com/es',
    )
    expect(canonicalPath('/')).toBe('/')
    expect(() => absoluteUrl('//other.example/path')).toThrow()
    expect(() => absoluteUrl('https://other.example/path')).toThrow()
  })
})

describe('deployment indexing', () => {
  it('distinguishes production from previews independently of translated publication', () => {
    expect(isProductionDeployment({ NODE_ENV: 'production' })).toBe(true)
    expect(isProductionDeployment({ VERCEL_ENV: 'preview' })).toBe(false)
    expect(
      isProductionDeployment({ SEO_ENV: 'staging', NODE_ENV: 'production' }),
    ).toBe(false)
    expect(
      isProductionDeployment({ SEO_ENV: 'production', VERCEL_ENV: 'preview' }),
    ).toBe(true)
  })

  it('keeps preview pages crawlable and noindex, with no sitemap discovery', () => {
    vi.stubEnv('SEO_ENV', 'preview')
    for (const locale of ['en', 'es', 'fr'] as const) {
      const metadata = buildPageMetadata({}, '/tours', locale)
      expect(metadata.robots).toEqual({ index: false, follow: true })
      expect(metadata.alternates?.canonical).toBe(`/${locale}/tours`)
    }
    expect(sitemap()).toEqual([])
    expect(robots().sitemap).toBeUndefined()
    const site = { allow: '/', disallow: ['/api/'] }
    expect(robots().rules).toEqual([
      { userAgent: '*', ...site },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Perplexity-User',
          'Claude-SearchBot',
          'Claude-User',
        ],
        ...site,
      },
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'CCBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        ...site,
      },
    ])
  })

  it('keeps all 401 canonical URLs indexable in production', () => {
    vi.stubEnv('SEO_ENV', 'production')
    // 133 pages in each of three languages, plus two English-only legal pages.
    expect(sitemap()).toHaveLength(401)
    expect(
      sitemap()
        .filter((entry) => !entry.alternates)
        .map((e) => e.url),
    ).toEqual([
      'https://extraordinaryethiopiatours.com/en/privacy-policy',
      'https://extraordinaryethiopiatours.com/en/terms-and-conditions',
    ])
    expect(robots().sitemap).toBe(
      'https://extraordinaryethiopiatours.com/sitemap.xml',
    )
    for (const locale of ['en', 'es', 'fr'] as const) {
      expect(buildPageMetadata({}, '/', locale).robots).toEqual({
        index: true,
        follow: true,
      })
    }
  })
})

describe('structured data', () => {
  it('serializes JSON-LD that cannot close its script element', () => {
    const json = serializeJsonLd({ name: '</script><b>&\u2028' })
    expect(json).not.toMatch(/[<>&\u2028]/)
    expect(JSON.parse(json).name).toBe('</script><b>&\u2028')
  })

  it('links page entities to one shared business and localized URLs', () => {
    const graph = pageGraph({
      path: '/tours/2-day-lalibela',
      locale: 'fr',
      name: 'Lalibela',
      crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Lalibela' }],
      about: tripSchema(
        { title: 'Lalibela', summary: 's', image: 'i', places: ['Lalibela'] },
        '/tours/2-day-lalibela',
        'fr',
      ),
    })['@graph']
    const url = 'https://extraordinaryethiopiatours.com/fr/tours/2-day-lalibela'
    expect(graph[0]).toMatchObject({
      '@id': `${url}#webpage`,
      inLanguage: 'fr',
    })
    expect(graph[1]).toMatchObject({
      itemListElement: [
        { position: 1, item: 'https://extraordinaryethiopiatours.com/fr' },
        { position: 2, item: url },
      ],
    })
    expect(graph[2]).toMatchObject({
      provider: { '@id': schemaIds.organization },
    })
    expect(graph[2]).not.toHaveProperty('offers')
    expect(siteGraph()['@graph'].map((e) => e['@id'])).toEqual([
      schemaIds.organization,
      schemaIds.website,
    ])
  })

  it('adds an offer only for a real price', () => {
    const trip = (priceAmount: number | null) =>
      tripSchema(
        { title: 't', summary: 's', image: 'i', places: [], priceAmount },
        '/tours/t',
        'en',
      )
    expect(trip(null)).not.toHaveProperty('offers')
    expect(trip(0)).not.toHaveProperty('offers')
    expect(trip(450).offers).toMatchObject({ price: 450, priceCurrency: 'USD' })
  })
})

describe('catalogue relationships', () => {
  const tours = getTours('en')
  const destinations = getDestinations('en')
  const find = (slug: string) => destinations.find((d) => d.slug === slug)!

  it('links destinations only to tours that visit them', () => {
    // First-word matching used to send "Omo National Park" to Omo Valley tours.
    expect(toursVisiting(find('omo-national-park'), tours)).toEqual([])
    const timkat = toursVisiting(find('timkat'), tours).map((t) => t.slug)
    expect(timkat.length).toBeGreaterThan(0)
    for (const slug of timkat)
      expect(
        tours.find((t) => t.slug === slug)!.canonicalPlaces!.join(' '),
      ).toMatch(/Timkat/)
  })

  it('ranks related tours by shared destinations, not catalogue order', () => {
    const simien = tours.find((t) => t.slug === '5-day-simien-mountains-trek')!
    const related = relatedTours(simien, tours, destinations)
    expect(related).toHaveLength(3)
    for (const t of related)
      expect(placeDestinations(t, destinations)).toContain('simien-mountains')
  })

  it('maps articles only to existing destinations', () => {
    const slugs = new Set(destinations.map((d) => d.slug))
    for (const list of Object.values(postDestinations))
      for (const slug of list) expect(slugs).toContain(slug)
    expect(postsAbout('lalibela', getPosts('en'))[0].slug).toMatch(/lalibela/)
  })
})
