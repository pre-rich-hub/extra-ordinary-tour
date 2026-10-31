import { afterEach, describe, expect, it, vi } from 'vitest'
import { getDestinationData, getDestinationsData } from '@/features/destinations/server/catalog'
import { getPostData, getPostsData } from '@/features/blog/server/catalog'
import { getTourData, getToursData } from '@/features/tours/server/catalog'
import { getGalleryData } from '@/features/home/server/gallery'
import { getDestinations } from '@/features/destinations/data/localized'
import { getPosts } from '@/features/blog/data/localized'
import { getTours } from '@/features/tours/data/localized'

const image = '/api/v1/media/2be8877e-abd0-4aaf-b3ac-efc1e22e38a5'

function mockApi(routes: Record<string, unknown>) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const path = new URL(url).pathname
      const data = routes[path]
      return new Response(
        JSON.stringify({ success: data !== undefined, data }),
        { status: data === undefined ? 404 : 200 },
      )
    }),
  )
}

const apiTour = (slug: string) => ({
  id: 1,
  name: 'Admin Tour',
  overview: 'First line. Second line.',
  adultPrice: 100,
  isFeatured: true,
  mainImage: image,
  destinations: [{ id: 1, name: 'Somewhere' }],
  categories: [],
  durationDays: 2,
  itinerary: [{ day: 1, title: 'Arrive', activities: 'Walk' }],
  canonical: { slug },
})

afterEach(() => vi.unstubAllGlobals())

describe('admin content on the public catalogue', () => {
  it('shows an uploaded image on a catalogue destination and keeps its copy', async () => {
    const [first] = getDestinations()
    mockApi({
      '/api/v1/destinations': [
        { name: 'x', imageUrl: image, canonical: { slug: first.slug } },
      ],
    })
    const merged = await getDestinationData(first.slug)
    expect(merged?.image).toBe(image)
    expect(merged?.teaser).toBe(first.teaser)
  })

  it('adds a destination created in the admin', async () => {
    mockApi({
      '/api/v1/destinations': [
        {
          name: 'New Place',
          description: 'One.\n\nTwo.',
          imageUrl: image,
          canonical: { slug: 'new-place' },
        },
      ],
    })
    const merged = await getDestinationsData()
    expect(merged).toHaveLength(getDestinations().length + 1)
    expect(merged.at(-1)).toMatchObject({
      image,
      teaser: 'One.',
      paragraphs: ['One.', 'Two.'],
      regionKey: 'Other Destinations & Experiences',
    })
  })

  it('shows an uploaded image on a catalogue tour', async () => {
    const [first] = getTours()
    mockApi({
      '/api/v1/tours': { items: [apiTour(first.slug)] },
      [`/api/v1/tours/slug/${first.slug}`]: apiTour(first.slug),
    })
    expect((await getToursData())[0].image).toBe(image)
    expect((await getTourData(first.slug))?.image).toBe(image)
  })

  it('adds a tour created in the admin', async () => {
    mockApi({
      '/api/v1/tours': { items: [apiTour('admin-tour')] },
      '/api/v1/tours/slug/admin-tour': apiTour('admin-tour'),
    })
    expect((await getToursData()).at(-1)?.slug).toBe('admin-tour')
    expect(await getTourData('admin-tour')).toMatchObject({
      title: 'Admin Tour',
      image,
      nights: 1,
      teaser: 'First line.',
    })
  })

  it('leads the journal with a post written in the admin', async () => {
    mockApi({
      '/api/v1/blog': [
        {
          slug: 'new-post',
          title: 'New Post',
          description: 'One.\n\nTwo.',
          imageUrl: image,
          category: null,
          createdAt: '2026-10-31T06:39:55.196Z',
        },
      ],
    })
    expect((await getPostsData())[0].slug).toBe('new-post')
    expect(await getPostData('new-post')).toMatchObject({
      image,
      body: ['One.', 'Two.'],
      datePublished: '2026-10-31',
    })
  })

  it('keeps the static catalogue when the API is down', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    expect(await getDestinationsData()).toHaveLength(getDestinations().length)
    expect(await getPostsData()).toHaveLength(getPosts().length)
    expect(await getToursData()).toHaveLength(getTours().length)
    expect(await getGalleryData()).toEqual([])
    expect(await getTourData('no-such-tour')).toBeUndefined()
  })
})
