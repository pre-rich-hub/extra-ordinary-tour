import type { Metadata } from 'next'
import { AdminTours } from './tours-client'

export const metadata: Metadata = {
  title: 'Tours',
  robots: { index: false, follow: false },
}

export default function AdminToursPage() {
  return <AdminTours />
}