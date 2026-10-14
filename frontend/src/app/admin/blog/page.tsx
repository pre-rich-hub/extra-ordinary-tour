import type { Metadata } from 'next'
import { AdminBlog } from './blog-client'

export const metadata: Metadata = {
  title: 'Blog',
  robots: { index: false, follow: false },
}

export default function AdminBlogPage() {
  return <AdminBlog />
}