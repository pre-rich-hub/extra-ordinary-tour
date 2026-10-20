import type { Metadata } from 'next'
import { AdminDestinations } from '@/features/admin/destinations/components/destinations'

export const metadata: Metadata = {
  title: 'Destinations',
  robots: { index: false, follow: false },
}

export default function AdminDestinationsPage() {
  return <AdminDestinations />
}
