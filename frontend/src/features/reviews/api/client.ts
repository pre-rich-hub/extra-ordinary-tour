import { request } from '@/lib/api/client'

export type ApiTestimonial = {
  id: number
  message: string
  reviewerName: string
  profession: string | null
  slug: string | null
  imageUrl: string | null
  platform: string | null
  rating: number | null
  title: string | null
  reviewDate: string | null
}

export async function getTestimonials(
  init?: RequestInit,
): Promise<ApiTestimonial[]> {
  return request<ApiTestimonial[]>('/api/v1/testimonials', init)
}
