export type ReviewPlatform = 'Tripadvisor' | 'SafariBookings' | 'Google'

export type Testimonial = {
  id: string
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
  /** Where guests can leave a new review, when the platform offers a link. */
  writeUrl?: string
}
