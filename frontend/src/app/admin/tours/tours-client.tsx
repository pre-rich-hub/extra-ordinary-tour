'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Loader2, Compass } from 'lucide-react'

type TourListItem = {
  id: number
  name: string
  adultPrice: number | null
  childPrice: number | null
  discount: string | null
  rating: number | null
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string }[]
  createdAt: string | null
}

export function AdminTours() {
  const [tours, setTours] = useState<TourListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState('')

  const fetchTours = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/tours', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Tours could not be loaded.')
      setTours(data.data)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Tours could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void fetchTours(), 0)
    return () => window.clearTimeout(id)
  }, [fetchTours])

  async function handleDelete(tour: TourListItem) {
    if (!confirm(`Delete “${tour.name}” from the website? This cannot be undone.`)) return
    setDeleting(tour.id)
    setFeedback('')
    setSuccess('')
    try {
      const res = await fetch(`/api/v1/admin/tours/${tour.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Tour could not be deleted.')
      setTours((current) => current.filter((item) => item.id !== tour.id))
      setSuccess(`“${tour.name}” was removed from the website.`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Tour could not be deleted.')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = tours.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Tours</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, or remove the tour packages displayed on the website
          </p>
        </div>
        <Link
          href="/admin/tours/new"
          data-testid="add-tour"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus size={16} />
          Add Tour
        </Link>
      </div>

      {feedback ? <div role="alert" className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{feedback}</div> : null}
      {success ? <div role="status" className="mb-6 rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-4 text-sm text-emerald-700">{success}</div> : null}

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {!loading ? (
        <p className="mb-4 text-sm text-muted-foreground" data-testid="tour-count">
          Showing {filtered.length === tours.length ? 'all ' : ''}{filtered.length} of {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
        </p>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center shadow-xs">
          <Compass size={40} className="mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-muted-foreground">No tours found</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            {search ? 'Try a different search term' : 'Click "Add Tour" to create your first tour'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Tour</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Destinations</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Adult Price</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Rating</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Featured</th>
                <th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tour) => (
                <tr
                  key={tour.id}
                  className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/20"
                  data-testid={`tour-${tour.id}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {tour.mainImage ? (
                        // Admin thumbnails may come from uploaded files or the media API.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={tour.mainImage}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Compass size={16} className="text-muted-foreground/40" />
                        </div>
                      )}
                      <span className="max-w-xs truncate font-medium text-foreground">
                        {tour.name}
                      </span>
                      <span className="hidden rounded-full bg-primary/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-primary xl:inline-flex">
                        Live
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {tour.destinations?.length
                      ? tour.destinations.map((destination) => destination.name).join(', ')
                      : tour.destination?.name ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-foreground">
                    {tour.adultPrice != null && Number(tour.adultPrice) > 0
                      ? `$${Number(tour.adultPrice).toLocaleString()}`
                      : 'Quote required'}
                    {tour.discount ? (
                      <span className="ml-2 text-xs font-medium text-accent">
                        -{tour.discount}%
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-3.5">
                    {tour.rating != null ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                        {Number(tour.rating).toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {tour.isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/tours/${tour.id}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent/10"
                        aria-label={`Edit ${tour.name}`}
                        data-testid={`edit-tour-${tour.id}`}
                      >
                        <Edit size={14} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(tour)}
                        disabled={deleting === tour.id}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-50"
                        aria-label={`Delete ${tour.name}`}
                        data-testid={`delete-tour-${tour.id}`}
                      >
                        {deleting === tour.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}