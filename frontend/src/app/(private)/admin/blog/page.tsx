import type { Metadata } from 'next'
import { AdminBlog } from '@/features/admin/blog/components/blog'

export const metadata: Metadata = {
  title: 'Travel Journey',
  robots: { index: false, follow: false },
}

export default function AdminBlogPage() {
  return <AdminBlog />
}
