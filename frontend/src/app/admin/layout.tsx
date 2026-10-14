import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/features/admin/components/sidebar'
import { getAdminApiBaseUrl } from '@/features/admin/lib/server'

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

async function hasValidAdminSession() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (!cookieHeader) return false

  try {
    // Server-side guard: Next's rewrites only apply to browser requests, so a
    // server component must fetch the backend directly. The incoming
    // admin_session cookie is forwarded via the Cookie header. Env var mirrors
    // the one next.config.mjs uses for the rewrite target.
    const response = await fetch(`${getAdminApiBaseUrl()}/api/v1/auth/me`, {
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    })

    if (!response.ok) return false

    const payload = (await response.json()) as { success?: boolean }
    return payload.success === true
  } catch {
    return false
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await hasValidAdminSession()

  if (!authenticated) {
    redirect('/login')
  }

  // Fixed overlay: the admin lives inside the marketing root layout, so we
  // paint over the public nav/footer instead of touching them.
  return (
    <div className="fixed inset-0 z-[60] flex bg-background">
      <AdminSidebar />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}