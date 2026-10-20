'use client'

import { useEffect, useState } from 'react'
import {
  Compass,
  MapPin,
  CalendarCheck,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  CalendarDays,
} from 'lucide-react'

type Stats = {
  totals: {
    tours: number
    destinations: number
    bookings: number
    galleryImages: number
    contacts: number
  }
  bookingTrends: { date: string; count: number }[]
  topTours: { id: number; name: string; bookingCount: number }[]
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/admin/dashboard/stats', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data)
      })
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Failed to load dashboard stats.</p>
      </div>
    )
  }

  const statCards = [
    { label: 'Tours', value: stats.totals.tours, icon: Compass },
    { label: 'Destinations', value: stats.totals.destinations, icon: MapPin },
    { label: 'Bookings', value: stats.totals.bookings, icon: CalendarCheck },
    { label: 'Gallery', value: stats.totals.galleryImages, icon: ImageIcon },
    { label: 'Contacts', value: stats.totals.contacts, icon: MessageSquare },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your Extraordinary Ethiopia Tours admin panel
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <card.icon size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-accent" />
            <h2 className="font-serif text-lg text-foreground">Booking Trends (30 days)</h2>
          </div>
          {stats.bookingTrends.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings in the last 30 days.</p>
          ) : (
            <div className="space-y-1.5">
              {stats.bookingTrends.map((row) => (
                <div key={row.date} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs text-muted-foreground">{row.date}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.max(4, (row.count / Math.max(...stats.bookingTrends.map((r) => r.count))) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-medium text-foreground">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="mb-5 flex items-center gap-2">
            <CalendarDays size={18} className="text-accent" />
            <h2 className="font-serif text-lg text-foreground">Top Tours by Bookings</h2>
          </div>
          {stats.topTours.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tours have been booked yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.topTours.map((tour, i) => (
                <div key={tour.id} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-muted-foreground">{i + 1}.</span>
                  <span className="flex-1 truncate text-sm text-foreground">{tour.name}</span>
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                    {tour.bookingCount} booking{tour.bookingCount !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
