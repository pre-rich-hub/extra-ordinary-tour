import type { Metadata } from 'next'
import { AdminDestinations } from './destinations-client'

export const metadata: Metadata = {
  title: 'Destinations',
  robots: { index: false, follow: false },
}

export default function AdminDestinationsPage() {
  return <AdminDestinations />
}