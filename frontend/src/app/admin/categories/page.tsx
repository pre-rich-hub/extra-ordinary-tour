import type { Metadata } from 'next'
import { AdminTourCategories } from './categories-client'

export const metadata: Metadata = {
  title: 'Tour Categories',
  robots: { index: false, follow: false },
}

export default function AdminCategoriesPage() {
  return <AdminTourCategories />
}