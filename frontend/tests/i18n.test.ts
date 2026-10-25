import { describe, expect, it, vi } from 'vitest'
import { localizeRecord } from '@/i18n/content'
import { mergeMessages } from '@/i18n/messages'
import {
  buildPageMetadata,
  languageAlternates,
  localePath,
} from '@/i18n/metadata'
import { publication } from '@/i18n/publication'
import { getTours } from '@/features/tours/data/localized'
import { getDestinations } from '@/features/destinations/data/localized'
import { getPosts } from '@/features/blog/data/localized'
import { priceShort, nightsLabel } from '@/features/tours/lib/format'
import sitemap from '@/app/sitemap'
vi.mock('@/features/tours/api/client', () => ({
  getTours: vi.fn(),
  getTourBySlug: vi.fn(),
}))
import {
  getTours as apiTours,
  getTourBySlug,
} from '@/features/tours/api/client'
import { getTourData, getToursData } from '@/features/tours/server/catalog'

describe('translation fallback', () => {
  const source = {
    slug: 'stable-id',
    title: 'English',
    itinerary: ['One', 'Two'],
    image: '/images/original.jpg',
  }
  it('falls back as an entire entity if an itinerary is incomplete', () => {
    expect(
      localizeRecord(
        source,
        source.slug,
        'es',
        {
          es: { 'stable-id': { title: 'Español', itinerary: ['Uno'] } },
          fr: {},
        },
        ['title', 'itinerary'],
      ),
    ).toEqual(source)
  })
  it('only overlays approved display fields', () => {
    const record = localizeRecord(
      source,
      source.slug,
      'es',
      {
        es: {
          'stable-id': {
            title: 'Español',
            itinerary: ['Uno', 'Dos'],
            slug: 'changed',
            image: 'changed',
          },
        },
        fr: {},
      },
      ['title', 'itinerary'],
    )
    expect(record).toEqual({
      ...source,
      title: 'Español',
      itinerary: ['Uno', 'Dos'],
    })
  })
  it('merges message fallback recursively and replaces arrays', () => {
    expect(
      mergeMessages(
        { nested: { a: 'A', b: 'B' }, list: ['A', 'B'] },
        { nested: { a: 'Uno' }, list: ['Uno'] },
      ),
    ).toEqual({ nested: { a: 'Uno', b: 'B' }, list: ['Uno'] })
  })
})
describe('canonical catalogue identity', () => {
  for (const locale of ['es', 'fr'] as const)
    it(`preserves source identifiers and relationships in ${locale}`, () => {
      const source = getTours('en'),
        translated = getTours(locale)
      expect(translated).toHaveLength(50)
      expect(translated.map((t) => t.slug)).toEqual(source.map((t) => t.slug))
      expect(
        translated.map((t) => [
          t.image,
          t.nights,
          t.featured,
          t.styleKeys,
          t.canonicalPlaces,
        ]),
      ).toEqual(
        source.map((t) => [
          t.image,
          t.nights,
          t.featured,
          t.styleKeys,
          t.canonicalPlaces,
        ]),
      )
      expect(translated[0].summary).not.toBe(source[0].summary)
      expect(getDestinations(locale)).toHaveLength(62)
      expect(getPosts(locale)).toHaveLength(13)
      expect(getPosts(locale).map((p) => p.categoryKey)).toEqual(
        getPosts('en').map((p) => p.category),
      )
    })
})
describe('search publication', () => {
  it('indexes every locale with self canonicals and reciprocal language links', () => {
    const languages = {
      en: '/en/tours',
      es: '/es/tours',
      fr: '/fr/tours',
      'x-default': '/en/tours',
    }
    for (const locale of ['en', 'es', 'fr'] as const) {
      const metadata = buildPageMetadata({ title: 'Tours' }, '/tours', locale)
      expect(metadata.alternates).toEqual({
        canonical: `/${locale}/tours`,
        languages,
      })
      expect(metadata.robots).toEqual({ index: true, follow: true })
      expect(metadata.openGraph).toHaveProperty('alternateLocale')
    }
    expect(languageAlternates('/tours')).toEqual(languages)
  })
  it('lists 132 translated pages per language and excludes private URLs', () => {
    const entries = sitemap()
    expect(entries).toHaveLength(398)
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(398)
    // The two legal pages are English-only and carry no alternates.
    const translated = entries.filter((entry) => entry.alternates)
    for (const locale of ['en', 'es', 'fr']) {
      expect(
        translated.filter((entry) =>
          new URL(entry.url).pathname.match(new RegExp(`^/${locale}(?:/|$)`)),
        ),
      ).toHaveLength(132)
    }
    expect(
      entries.every(
        (entry) =>
          !/\/(?:admin|login)(?:\/|$)/.test(new URL(entry.url).pathname),
      ),
    ).toBe(true)
    expect(publication).toEqual({
      en: 'published',
      es: 'published',
      fr: 'published',
    })
    expect(localePath('/', 'fr')).toBe('/fr')
  })
  it('keeps noindex and discovery exclusions if a locale is returned to draft', () => {
    const previous = publication.fr
    try {
      publication.fr = 'draft'
      const metadata = buildPageMetadata({ title: 'Voyages' }, '/tours', 'fr')
      expect(metadata.alternates).toEqual({ canonical: '/fr/tours' })
      expect(metadata.robots).toEqual({ index: false, follow: true })
      expect(languageAlternates('/tours')).not.toHaveProperty('fr')
      expect(
        sitemap().some((entry) =>
          new URL(entry.url).pathname.startsWith('/fr'),
        ),
      ).toBe(false)
    } finally {
      publication.fr = previous
    }
  })
})
describe('live commercial values', () => {
  it('keeps the live numeric USD price and flag while rendering translated copy', async () => {
    const source = getTours('en')[0]
    const live = {
      canonical: { slug: source.slug },
      adultPrice: 1450.5,
      isFeatured: false,
    }
    vi.mocked(apiTours).mockResolvedValue({ items: [live] } as never)
    vi.mocked(getTourBySlug).mockResolvedValue(live as never)
    const tour = await getTourData(source.slug, 'fr')
    expect(tour?.priceAmount).toBe(1450.5)
    expect(tour?.featured).toBe(false)
    expect(tour?.summary).toBe(getTours('fr')[0].summary)
    expect(tour?.from).toContain('1\u202f450,5')
    expect(tour?.from).toContain('$US')
    expect((await getToursData('es'))[0].priceAmount).toBe(1450.5)
  })
  it('falls back to translated static content if the API is offline', async () => {
    vi.mocked(apiTours).mockRejectedValue(new Error('offline'))
    expect(await getToursData('fr')).toEqual(getTours('fr'))
  })
  it('does not truncate currencies at locale-specific spaces', () => {
    expect(priceShort('1\u202f450 $US par personne')).toBe('1\u202f450 $US')
    expect(priceShort('Sur demande')).toBe('Sur demande')
    expect(nightsLabel(1, 'es')).toBe('1 noche')
    expect(nightsLabel(2, 'fr')).toBe('2 nuits')
  })
})
