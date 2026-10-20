import type { Metadata } from 'next'
import { AdminTourNew } from '@/features/admin/tours/components/tour-new'

export const metadata: Metadata = {
  title: 'New Tour',
  robots: { index: false, follow: false },
}

export default function AdminTourNewPage() {
  return <AdminTourNew />
}
