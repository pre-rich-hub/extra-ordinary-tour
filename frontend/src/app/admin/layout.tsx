import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { hasValidAdminSession } from '@/features/auth/server/session'
import { AdminShell } from '@/features/admin/components/admin-shell'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await hasValidAdminSession())) redirect('/login')
  return <AdminShell>{children}</AdminShell>
}
