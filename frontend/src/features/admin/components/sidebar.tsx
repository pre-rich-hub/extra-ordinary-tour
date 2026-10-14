'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Plane,
  Tags,
  Image as ImageIcon,
  FileText,
  Star,
  CalendarCheck,
  MessageSquare,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tours', label: 'Tours', icon: Compass },
  { href: '/admin/layover-packages', label: 'Layover Packages', icon: Plane },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/categories', label: 'Tour Categories', icon: Tags },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // ignore — sign out locally regardless
    }
    router.push('/login')
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sand/10 bg-charcoal text-sand">
      <div className="flex h-16 items-center gap-3 border-b border-sand/10 px-6">
        <div>
          <p className="font-serif text-xl leading-none text-sand">Extraordinary</p>
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-accent">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-sand/70 hover:bg-sand/5 hover:text-sand'
              )}
            >
              <item.icon size={18} className={isActive ? 'text-accent' : ''} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-accent" />}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sand/10 px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sand/60 transition-all hover:bg-sand/5 hover:text-sand"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}