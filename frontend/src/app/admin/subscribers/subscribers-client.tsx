'use client'

import { useCallback, useEffect, useState } from 'react'
import { Download, Mail, Trash2, Users } from 'lucide-react'
import { AdminFeedback, AdminLoading, AdminPageHeader, adminSecondaryButtonClass } from '@/features/admin/components/admin-primitives'
import { adminRequest, formatAdminDate } from '@/features/admin/lib/api'

type Subscriber = { id: number; email: string; createdAt: string }

export function AdminSubscribers() {
  const [items, setItems] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await adminRequest<Subscriber[]>('/api/v1/admin/subscribers'))
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Subscribers could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function remove(subscriber: Subscriber) {
    if (!window.confirm(`Remove ${subscriber.email} from the subscriber list?`)) return
    try {
      await adminRequest<null>(`/api/v1/admin/subscribers/${subscriber.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== subscriber.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Subscriber could not be removed.')
    }
  }

  function exportCsv() {
    const csv = ['Email,Subscribed', ...items.map((item) => `"${item.email.replaceAll('"', '""')}","${item.createdAt}"`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'afar-horizon-subscribers.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8">
      <AdminPageHeader title="Subscribers" description="Manage newsletter signups collected from the public website." action={<button type="button" onClick={exportCsv} disabled={items.length === 0} className={adminSecondaryButtonClass}><Download className="size-4" /> Export CSV</button>} />
      <AdminFeedback message={feedback} />
      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><Users className="mx-auto mb-3 size-9 opacity-30" />No subscribers yet.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm"><thead className="border-b border-border bg-muted/30"><tr><th className="px-5 py-3 text-left font-medium text-muted-foreground">Email</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Subscribed</th><th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th></tr></thead>
            <tbody>{items.map((subscriber) => <tr key={subscriber.id} className="border-b border-border/50 last:border-0" data-testid={`subscriber-${subscriber.id}`}><td className="px-5 py-4"><a href={`mailto:${subscriber.email}`} className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent"><Mail className="size-4 text-accent" />{subscriber.email}</a></td><td className="px-5 py-4 text-muted-foreground">{formatAdminDate(subscriber.createdAt)}</td><td className="px-5 py-4 text-right"><button type="button" onClick={() => void remove(subscriber)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${subscriber.email}`}><Trash2 className="size-4" /></button></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}