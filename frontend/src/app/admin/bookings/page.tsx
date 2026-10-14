import type { Metadata } from 'next'
import { AdminBookings } from './bookings-client'

export const metadata: Metadata = {
  title: 'Bookings',
  robots: { index: false, follow: false },
}

export default function AdminBookingsPage() {
  return <AdminBookings />
}