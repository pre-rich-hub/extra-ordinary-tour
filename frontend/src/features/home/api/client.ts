import { request } from '@/lib/api/client'

export type ApiGalleryImage = {
  id: number
  imageUrl: string
  tourId: number | null
  location: string | null
  caption: string | null
}

export async function getGalleryImages(
  init?: RequestInit,
): Promise<ApiGalleryImage[]> {
  return request<ApiGalleryImage[]>('/api/v1/gallery', init)
}
