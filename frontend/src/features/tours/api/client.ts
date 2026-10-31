import { request, queryString } from '@/lib/api/client'

export type ApiImage = {
  id: number
  imageUrl: string
  tourId: number | null
}

export type ApiTour = {
  id: number
  name: string
  description: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: number
  rating: number | null
  noOfRates: number
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: {
    id: number
    name: string
    slug?: string | null
    imageUrl?: string | null
  }[]
  categories: { id: number; name: string }[]
  gallery: ApiImage[]
  durationDays: number
  days: string | null
  nights: number | null
  style: string | null
  season: string | null
  group: string | null
  teaser: string | null
  highlights: string[]
  places: string[]
  included?: string[]
  excluded?: string[]
  itinerary?: {
    day: number | string
    dayLabel?: string
    title: string
    activities: string
  }[]
  journeyMap?: string | null
  createdAt: string | null
  updatedAt: string | null
  canonical: {
    type: string
    id: number
    suggestedPath: string
    slug: string | null
  }
}

export type ToursParams = {
  featured?: boolean
  page?: number
  limit?: number
  categorySlug?: string
  destinationSlug?: string
  q?: string
  priceMin?: number
  priceMax?: number
  ratingMin?: number
}

export type ToursPage = {
  items: ApiTour[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function getTours(
  params: ToursParams = {},
  init?: RequestInit,
): Promise<ToursPage> {
  return request<ToursPage>(`/api/v1/tours${queryString(params)}`, init)
}

export async function getTourBySlug(
  slug: string,
  init?: RequestInit,
): Promise<ApiTour> {
  return request<ApiTour>(
    `/api/v1/tours/slug/${encodeURIComponent(slug)}`,
    init,
  )
}
