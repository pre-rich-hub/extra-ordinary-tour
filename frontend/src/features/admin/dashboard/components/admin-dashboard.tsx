'use client'

import { useEffect, useState } from 'react'
import {
  Compass,
  MapPin,
  MessageSquare,
} from 'lucide-react'

type Stats = {
  totals: {
    tours: number
    destinations: number
    contacts: number
  }
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
    </div>
  )
}
