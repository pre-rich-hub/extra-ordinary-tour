import type { Metadata } from 'next'
import { AdminBookings } from '@/features/admin/bookings/components/bookings'

export const metadata: Metadata = {
  title: 'Bookings',
  robots: { index: false, follow: false },
}

export default function AdminBookingsPage() {
  return <AdminBookings />
}
