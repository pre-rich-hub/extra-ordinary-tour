'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Edit3, Loader2, MapPin, Plus, Trash2, X } from 'lucide-react'
import {
  AdminFeedback,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from '@/features/admin/components/admin-primitives'
import { adminRequest } from '@/features/admin/lib/api'

type Destination = {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  tourCount?: number
}

export function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editing, setEditing] = useState<Destination | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await adminRequest<Destination[]>('/api/v1/admin/destinations'))
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destinations could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
    setFeedback('')
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function openEdit(item: Destination) {
    setEditing(item)
    setFormOpen(true)
    setFeedback('')
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFeedback('')
    const formData = new FormData(event.currentTarget)

    try {
      await adminRequest<Destination>(
        editing ? `/api/v1/admin/destinations/${editing.id}` : '/api/v1/admin/destinations',
        { method: editing ? 'PUT' : 'POST', body: formData },
      )
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destination could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: Destination) {
    if (!window.confirm(`Delete “${item.name}”?`)) return
    setDeletingId(item.id)
    setFeedback('')
    try {
      await adminRequest<null>(`/api/v1/admin/destinations/${item.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destination could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Destinations"
        description="Create and maintain the places featured across the website."
        action={(
          <button type="button" onClick={openCreate} className={adminPrimaryButtonClass} data-testid="add-destination">
            <Plus className="size-4" /> Add destination
          </button>
        )}
      />

      <AdminFeedback message={feedback} />

      {formOpen && (
        <form ref={formRef} onSubmit={submit} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="destination-form">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-foreground">{editing ? 'Edit destination' : 'New destination'}</h2>
              <p className="mt-1 text-xs text-muted-foreground">Name, description, and a strong landscape image.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={adminLabelClass}>Destination name</span>
              <input name="destinationName" defaultValue={editing?.name ?? ''} className={adminInputClass} required />
            </label>
            <label>
              <span className={adminLabelClass}>Image {editing ? '(leave empty to keep current)' : ''}</span>
              <input name="destinationImage" type="file" accept="image/*" className={adminInputClass} required={!editing} />
            </label>
            <label className="md:col-span-2">
              <span className={adminLabelClass}>Description</span>
              <textarea name="destinationDescription" defaultValue={editing?.description ?? ''} className={`${adminInputClass} min-h-32 resize-y`} required />
            </label>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" className={adminSecondaryButtonClass} onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className={adminPrimaryButtonClass} disabled={saving} data-testid="save-destination">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {editing ? 'Save changes' : 'Create destination'}
            </button>
          </div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <MapPin className="mx-auto mb-3 size-9 opacity-30" /> No destinations yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" data-testid={`destination-${item.id}`}>
              <div
                className="h-40 bg-muted bg-cover bg-center"
                style={item.imageUrl ? { backgroundImage: `url("${item.imageUrl}")` } : undefined}
                role={item.imageUrl ? 'img' : undefined}
                aria-label={item.imageUrl ? item.name : undefined}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-xl text-foreground">{item.name}</h2>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">{item.tourCount ?? 0} tours</p>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => openEdit(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Edit ${item.name}`}><Edit3 className="size-4" /></button>
                    <button type="button" onClick={() => void remove(item)} disabled={deletingId === item.id} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${item.name}`}>
                      {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.description || 'No description.'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}