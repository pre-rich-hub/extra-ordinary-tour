import { request } from '@/lib/api/client'

export type ApiPost = {
  id: number
  slug: string | null
  title: string
  description: string | null
  content: string | null
  imageUrl: string | null
  author: string | null
  authorRole: string | null
  authorImage: string | null
  readTime: string | null
  isFeatured: boolean
  category: { name: string } | null
  createdAt: string | null
  updatedOn: string | null
}

export async function getPosts(init?: RequestInit): Promise<ApiPost[]> {
  return request<ApiPost[]>('/api/v1/blog', init)
}
