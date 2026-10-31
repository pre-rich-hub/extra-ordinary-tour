import { afterEach, describe, expect, it, vi } from 'vitest'
import { getDestinationData, getDestinationsData } from '@/features/destinations/server/catalog'
import { getPostData, getPostsData } from '@/features/blog/server/catalog'
import { parseArticle } from '@/features/blog/lib/article-text'
import { getTourData, getToursData } from '@/features/tours/server/catalog'
import { getGalleryData } from '@/features/home/server/gallery'
import { getTestimonialsData } from '@/features/reviews/server/catalog'
import { getDestinations } from '@/features/destinations/data/localized'
import { getPosts } from '@/features/blog/data/localized'
import { getTours } from '@/features/tours/data/localized'
import { getTestimonials } from '@/features/reviews/data/localized'
import { gallerySlides } from '@/features/home/data/gallery'

const image = '/api/v1/media/2be8877e-abd0-4aaf-b3ac-efc1e22e38a5'

function mockApi(routes: Record<string, unknown>) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const data = routes[new URL(url).pathname]
      return new Response(
        JSON.stringify({ success: data !== undefined, data }),
        { status: data === undefined ? 404 : 200 },
      )
    }),
  )
}

const apiDestination = (slug: string, name = 'Edited Name') => ({
  id: 1,
  name,
  description: 'Paragraph one.\n\nParagraph two.',
  imageUrl: image,
  region: 'Eastern Ethiopia',
  tag: 'Edited tag',
  teaser: 'Edited teaser.',
  intro: 'Edited intro.',
  bestTime: 'All year',
  duration: '2 days',
  altitude: '1,000 m',
  highlights: ['One'],
  canonical: { slug },
})

const apiTour = (slug: string) => ({
  id: 1,
  name: 'Edited Tour',
  overview: 'First line. Second line.',
  adultPrice: 100,
  isFeatured: true,
  mainImage: image,
  destinations: [{ id: 1, name: 'Somewhere' }],
  categories: [],
  durationDays: 2,
  days: '2 Days',
  nights: 1,
  style: 'Historical · Cultural',
  season: 'All year',
  group: 'Private',
  teaser: 'Edited teaser.',
  highlights: [],
  places: ['Lalibela'],
  included: ['Guide'],
  excluded: [],
  itinerary: [
    { day: 1, dayLabel: 'Full Day', title: 'Arrive', activities: 'Walk' },
    { day: 2, title: 'Leave', activities: 'Fly' },
  ],
  canonical: { slug },
})

afterEach(() => vi.unstubAllGlobals())

describe('database catalogue', () => {
  it('uses the edited row for English and only deleted rows disappear', async () => {
    const [first, second] = getDestinations()
    mockApi({ '/api/v1/destinations': [apiDestination(first.slug)] })
    const merged = await getDestinationsData()
    expect(merged).toHaveLength(1)
    expect(merged[0]).toMatchObject({
      name: 'Edited Name',
      teaser: 'Edited teaser.',
      regionKey: 'Eastern Ethiopia',
      paragraphs: ['Paragraph one.', 'Paragraph two.'],
    })
    expect(await getDestinationData(second.slug)).toBeUndefined()
  })

  it('keeps the translated narrative and overlays the image elsewhere', async () => {
    const [first] = getDestinations('es')
    mockApi({ '/api/v1/destinations': [apiDestination(first.slug)] })
    const merged = await getDestinationData(first.slug, 'es')
    expect(merged?.name).toBe(first.name)
    expect(merged?.teaser).toBe(first.teaser)
    expect(merged?.image).toBe(image)
  })

  it('shows a brand-new destination in every language', async () => {
    mockApi({ '/api/v1/destinations': [apiDestination('new-place', 'New Place')] })
    const merged = await getDestinationData('new-place', 'fr')
    expect(merged).toMatchObject({ name: 'New Place', bestTime: 'All year' })
  })

  it('maps a tour row, keeping custom day labels and quote-only prices', async () => {
    const [first] = getTours()
    const quoted = { ...apiTour('quoted'), adultPrice: 0 }
    mockApi({
      '/api/v1/tours': { items: [apiTour(first.slug), quoted] },
      [`/api/v1/tours/slug/${first.slug}`]: apiTour(first.slug),
    })
    const tours = await getToursData()
    expect(tours.map((t) => t.slug)).toEqual([first.slug, 'quoted'])
    expect(tours[1].priceAmount).toBeNull()
    expect(await getTourData(first.slug)).toMatchObject({
      title: 'Edited Tour',
      image,
      teaser: 'Edited teaser.',
      styleKeys: ['Historical', 'Cultural'],
    })
    const detail = await getTourData(first.slug)
    expect(detail?.itinerary.map((step) => step.day)).toEqual(['Full Day', 'Day 2'])
  })

  it('treats a tour missing from a seeded database as deleted', async () => {
    const [first, second] = getTours()
    mockApi({ '/api/v1/tours': { items: [apiTour(first.slug)] } })
    expect(await getTourData(second.slug)).toBeUndefined()
  })

  it('reads posts from the database', async () => {
    mockApi({
      '/api/v1/blog': [
        {
          slug: 'new-post',
          title: 'New Post',
          description: 'The excerpt.',
          content: 'Intro.\n\n## Heading\n\n- One\n- Two',
          imageUrl: image,
          author: 'Zelalem',
          authorRole: 'Travel Writer',
          authorImage: null,
          readTime: '1 min read',
          isFeatured: true,
          category: { name: 'Planning' },
          createdAt: '2026-10-31T06:39:55.196Z',
          updatedOn: null,
        },
      ],
    })
    expect((await getPostsData()).map((p) => p.slug)).toEqual(['new-post'])
    expect(await getPostData('new-post')).toMatchObject({
      excerpt: 'The excerpt.',
      author: 'Zelalem',
      featured: true,
      datePublished: '2026-10-31',
      body: ['Intro.', { heading: 'Heading' }, { list: ['One', 'Two'] }],
    })
  })

  it('reads reviews and gallery captions from the database', async () => {
    mockApi({
      '/api/v1/testimonials': [
        {
          id: 7,
          message: 'Great.',
          reviewerName: 'Sam',
          profession: 'Traveller',
          slug: null,
          imageUrl: null,
          platform: 'Google',
          rating: 5,
          title: null,
          reviewDate: 'May 2026',
        },
      ],
      '/api/v1/gallery': [
        { id: 1, imageUrl: image, tourId: null, location: 'Axum', caption: 'Stelae' },
      ],
    })
    expect(await getTestimonialsData()).toMatchObject([
      { id: 'guest-7', name: 'Sam', quote: 'Great.', platform: 'Google' },
    ])
    expect(await getGalleryData()).toEqual([
      { src: image, location: 'Axum', description: 'Stelae' },
    ])
  })

  it('keeps the bundled catalogue when the API is down or unseeded', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    expect(await getDestinationsData()).toHaveLength(getDestinations().length)
    expect(await getPostsData()).toHaveLength(getPosts().length)
    expect(await getToursData()).toHaveLength(getTours().length)
    expect(await getTestimonialsData()).toHaveLength(getTestimonials().length)
    expect(await getGalleryData()).toEqual(gallerySlides)
    expect(await getTourData('no-such-tour')).toBeUndefined()

    mockApi({ '/api/v1/destinations': [] })
    expect(await getDestinationsData()).toHaveLength(getDestinations().length)
  })
})

describe('admin article text', () => {
  it('reads paragraphs, headings and lists', () => {
    expect(parseArticle('One\n\n## Two\n\n- a\n- b\n\n')).toEqual([
      'One',
      { heading: 'Two' },
      { list: ['a', 'b'] },
    ])
  })
})
