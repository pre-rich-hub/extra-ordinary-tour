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
  // Optional because the two projects deploy separately: this frontend can
  // build against a backend that does not send the catalogue fields yet.
  highlights?: string[]
  canonical: { slug: string | null }
}

export async function getDestinations(
  init?: RequestInit,
): Promise<ApiDestination[]> {
  return request<ApiDestination[]>('/api/v1/destinations', init)
}
