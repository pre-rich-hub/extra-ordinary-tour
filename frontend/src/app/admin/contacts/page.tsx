import type { Metadata } from 'next'
import { AdminContacts } from './contacts-client'

export const metadata: Metadata = {
  title: 'Contacts',
  robots: { index: false, follow: false },
}

export default function AdminContactsPage() {
  return <AdminContacts />
}