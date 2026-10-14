import type { Metadata } from 'next'
import { AdminSubscribers } from './subscribers-client'

export const metadata: Metadata = {
  title: 'Subscribers',
  robots: { index: false, follow: false },
}

export default function AdminSubscribersPage() {
  return <AdminSubscribers />
}