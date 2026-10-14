'use client'

import { useCallback, useEffect, useState } from 'react'
import { CalendarCheck, Loader2, Trash2, Users } from 'lucide-react'
import { AdminFeedback, AdminLoading, AdminPageHeader, adminPanelClass } from '@/features/admin/components/admin-primitives'
import { adminRequest, formatAdminDate } from '@/features/admin/lib/api'

type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
type Booking = {
  id: number
  tour: { id: number; name: string } | null
  fullName: string
  email: string
  phone: string
  country: string
  chosenDate: string
  adults: number
  children: number
  status: BookingStatus
  createdAt: string | null
}

const statuses: BookingStatus[] = ['Pending', 'Confirmed', 'Cancelled', 'Completed']

export function AdminBookings() {
  const [items, setItems] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await adminRequest<Booking[]>('/api/v1/admin/bookings'))
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Bookings could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function setStatus(booking: Booking, status: BookingStatus) {
    setUpdatingId(booking.id)
    try {
      const updated = await adminRequest<Booking>(`/api/v1/admin/bookings/${booking.id}/status`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }),
      })
      setItems((current) => current.map((entry) => entry.id === booking.id ? updated : entry))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Booking status could not be updated.')
    } finally {
      setUpdatingId(null)
    }
  }

  async function remove(booking: Booking) {
    if (!window.confirm(`Delete booking #${booking.id}?`)) return
    try {
      await adminRequest<null>(`/api/v1/admin/bookings/${booking.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== booking.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Booking could not be deleted.')
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader title="Bookings" description="Review traveler requests and manage their progress." />
      <AdminFeedback message={feedback} />
      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className={`${adminPanelClass} border-dashed p-12 text-center text-muted-foreground`}><CalendarCheck className="mx-auto mb-3 size-9 opacity-30" />No booking requests yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="min-w-[1050px] w-full text-sm">
            <thead className="border-b border-border bg-muted/30"><tr><th className="px-5 py-3 text-left font-medium text-muted-foreground">Traveler</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Tour</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Travel date</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Guests</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th><th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th></tr></thead>
            <tbody>{items.map((booking) => (
              <tr key={booking.id} className="border-b border-border/50 last:border-0" data-testid={`booking-${booking.id}`}>
                <td className="px-5 py-4"><p className="font-medium text-foreground">{booking.fullName}</p><a href={`mailto:${booking.email}`} className="mt-1 block text-xs text-muted-foreground hover:text-accent">{booking.email}</a><a href={`tel:${booking.phone}`} className="mt-0.5 block text-xs text-muted-foreground hover:text-accent">{booking.phone}</a></td>
                <td className="max-w-xs px-5 py-4 text-foreground">{booking.tour?.name || 'Deleted tour'}<p className="mt-1 text-xs text-muted-foreground">{booking.country}</p></td>
                <td className="px-5 py-4 text-muted-foreground">{formatAdminDate(booking.chosenDate)}<p className="mt-1 text-xs">Requested {formatAdminDate(booking.createdAt)}</p></td>
                <td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Users className="size-4" />{booking.adults} adult{booking.adults === 1 ? '' : 's'}, {booking.children} child{booking.children === 1 ? '' : 'ren'}</span></td>
                <td className="px-5 py-4"><div className="flex items-center gap-2"><select value={booking.status} disabled={updatingId === booking.id} onChange={(event) => void setStatus(booking, event.target.value as BookingStatus)} className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium outline-none focus:border-primary" data-testid={`booking-status-${booking.id}`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>{updatingId === booking.id && <Loader2 className="size-4 animate-spin text-primary" />}</div></td>
                <td className="px-5 py-4 text-right"><button type="button" onClick={() => void remove(booking)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete booking ${booking.id}`}><Trash2 className="size-4" /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}