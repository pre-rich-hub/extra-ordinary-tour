import type { Metadata } from 'next'
import { AdminTourCategories } from '@/features/admin/categories/components/categories'

export const metadata: Metadata = {
  title: 'Tour Categories',
  robots: { index: false, follow: false },
}

export default function AdminCategoriesPage() {
  return <AdminTourCategories />
}
