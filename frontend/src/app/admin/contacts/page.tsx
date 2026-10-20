import type { Metadata } from 'next'
import { AdminContacts } from '@/features/admin/contacts/components/contacts'

export const metadata: Metadata = {
  title: 'Contacts',
  robots: { index: false, follow: false },
}

export default function AdminContactsPage() {
  return <AdminContacts />
}
