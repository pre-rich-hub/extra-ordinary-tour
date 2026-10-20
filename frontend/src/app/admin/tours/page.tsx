import type { Metadata } from 'next'
import { AdminTours } from '@/features/admin/tours/components/tours'

export const metadata: Metadata = {
  title: 'Tours',
  robots: { index: false, follow: false },
}

export default function AdminToursPage() {
  return <AdminTours />
}
