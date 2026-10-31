import { request } from '@/lib/api/client'

export type ApiPost = {
  id: number
  slug: string | null
  title: string
  description: string | null
  imageUrl: string | null
  category: { name: string } | null
  createdAt: string | null
}

export async function getPosts(init?: RequestInit): Promise<ApiPost[]> {
  return request<ApiPost[]>('/api/v1/blog', init)
}
