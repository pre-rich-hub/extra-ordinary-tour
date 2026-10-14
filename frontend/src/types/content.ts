// Shapes of the static content catalogue (src/content). These are the
// contract between content and UI — the API overlay in lib/catalog.ts may
// only fill fields that already exist here.

export type Destination = {
  slug: string
  name: string
  region: string
  tag: string
  image: string
  teaser: string
  intro: string
  bestTime: string
  duration: string
  altitude: string
  highlights: string[]
  paragraphs: string[]
}

export type Tour = {
  slug: string
  title: string
  image: string
  days: string
  nights: number
  style: string
  season: string
  from: string
  group: string
  teaser: string
  summary: string
  includes: string[]
  excludes: string[]
  itinerary: { day: string; title: string; text: string }[]
  places: string[]
  featured?: boolean
}

export type LayoverPackage = {
  slug: string
  hours: string
  title: string
  price: string
  image: string
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
  authorRole: string
  excerpt: string
  body: string[]
  featured?: boolean
}

export type ReviewPlatform = 'Tripadvisor' | 'SafariBookings'

export type Testimonial = {
  quote: string
  name: string
  detail: string
  image: string
  /** Where the review was published, when it came from a review platform. */
  platform?: ReviewPlatform
  /** Star rating out of 5. */
  rating?: number
  title?: string
  date?: string
}

export type ReviewSummary = {
  platform: ReviewPlatform
  url: string | null
  count: number | null
  /** Average rating out of 5. */
  rating: number | null
}

export type BrandPromise = {
  title: string
  text: string
}

export type GalleryCategory = 'Landscapes' | 'Heritage' | 'Culture' | 'Wildlife' | 'Festivals'

export type GalleryPhoto = {
  src: string
  alt: string
  title: string
  location: string
  category: GalleryCategory
  caption: string
  /** Frame used in the grid; the lightbox always shows the full image. */
  shape: 'portrait' | 'landscape' | 'square'
}
