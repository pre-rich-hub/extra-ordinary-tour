import { request } from '@/lib/api/client'

export type ApiLayoverPackage = {
  id: number
  slug: string
  hours: string
  title: string
  price: string
  image: string | null
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export async function getLayoverPackages(
  init?: RequestInit,
): Promise<ApiLayoverPackage[]> {
  return request<ApiLayoverPackage[]>('/api/v1/layover-packages', init)
}
