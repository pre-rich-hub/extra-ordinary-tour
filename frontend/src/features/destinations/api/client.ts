import { request } from '@/lib/api/client'

export type ApiDestination = {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  canonical: { slug: string | null }
}

export async function getDestinations(
  init?: RequestInit,
): Promise<ApiDestination[]> {
  return request<ApiDestination[]>('/api/v1/destinations', init)
}
