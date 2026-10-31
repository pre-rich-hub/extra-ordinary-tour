import { request } from '@/lib/api/client'

export type ApiDestination = {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  region: string | null
  tag: string | null
  teaser: string | null
  intro: string | null
  bestTime: string | null
  duration: string | null
  altitude: string | null
  highlights: string[]
  canonical: { slug: string | null }
}

export async function getDestinations(
  init?: RequestInit,
): Promise<ApiDestination[]> {
  return request<ApiDestination[]>('/api/v1/destinations', init)
}
