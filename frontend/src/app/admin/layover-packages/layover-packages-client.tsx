'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Edit3, Loader2, Plus, Plane, Trash2, X } from 'lucide-react'
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

// Mirrors the API mapper contract: the public `image` field, never imageUrl.
type LayoverPackageItem = {
  id: number
  slug: string
  hours: string
  title: string
  price: string
  image: string | null
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export function AdminLayoverPackages() {
  const [items, setItems] = useState<LayoverPackageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [reorderingId, setReorderingId] = useState<number | null>(null)
  const [editing, setEditing] = useState<LayoverPackageItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await adminRequest<LayoverPackageItem[]>('/api/v1/admin/layover-packages'))
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover packages could not be loaded.')
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

  function openEdit(item: LayoverPackageItem) {
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
      await adminRequest<LayoverPackageItem>(
        editing ? `/api/v1/admin/layover-packages/${editing.id}` : '/api/v1/admin/layover-packages',
        { method: editing ? 'PUT' : 'POST', body: formData },
      )
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover package could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  function rowPayload(item: LayoverPackageItem, sortOrder: number): FormData {
    const data = new FormData()
    data.set('hours', item.hours)
    data.set('title', item.title)
    data.set('price', item.price)
    data.set('teaser', item.teaser)
    data.set('itinerary', item.itinerary.join('\n'))
    data.set('includes', item.includes.join('\n'))
    data.set('bestFor', item.best)
    data.set('sortOrder', String(sortOrder))
    return data
  }

  // Swaps sortOrder between this row and its neighbour with two PUTs. The
  // payload carries every field so an order change never blanks the row.
  async function reorder(fromIndex: number, toIndex: number) {
    const a = items[fromIndex]
    const b = items[toIndex]
    if (!a || !b) return
    setReorderingId(a.id)
    setFeedback('')
    try {
      await adminRequest<LayoverPackageItem>(`/api/v1/admin/layover-packages/${a.id}`, {
        method: 'PUT',
        body: rowPayload(a, toIndex),
      })
      await adminRequest<LayoverPackageItem>(`/api/v1/admin/layover-packages/${b.id}`, {
        method: 'PUT',
        body: rowPayload(b, fromIndex),
      })
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Order could not be updated.')
    } finally {
      setReorderingId(null)
    }
  }

  async function remove(item: LayoverPackageItem) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return
    setDeletingId(item.id)
    setFeedback('')
    try {
      await adminRequest<null>(`/api/v1/admin/layover-packages/${item.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover package could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Layover Packages"
        description="Create and maintain the layover packages shown on the public page."
        action={(
          <button type="button" onClick={openCreate} className={adminPrimaryButtonClass} data-testid="add-layover-package">
            <Plus className="size-4" /> Add package
          </button>
        )}
      />

      <AdminFeedback message={feedback} />

      {formOpen && (
        <form ref={formRef} onSubmit={submit} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="layover-package-form">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-foreground">{editing ? 'Edit package' : 'New package'}</h2>
              <p className="mt-1 text-xs text-muted-foreground">Hours, price, copy, itinerary and included points.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={adminLabelClass}>Title</span>
              <input name="title" defaultValue={editing?.title ?? ''} className={adminInputClass} required />
            </label>
            <label>
              <span className={adminLabelClass}>Hours label</span>
              <input name="hours" defaultValue={editing?.hours ?? ''} className={adminInputClass} placeholder="6 Hours" required />
            </label>
            <label>
              <span className={adminLabelClass}>Price</span>
              <input name="price" defaultValue={editing?.price ?? ''} className={adminInputClass} placeholder="$95 per person" required />
            </label>
            <label>
              <span className={adminLabelClass}>Best for</span>
              <input name="bestFor" defaultValue={editing?.best ?? ''} className={adminInputClass} placeholder="Connections of 8 hours or more" required />
            </label>
            <label>
              <span className={adminLabelClass}>Sort order</span>
              <input name="sortOrder" type="number" min={0} defaultValue={editing ? items.findIndex((entry) => entry.id === editing.id) : items.length} className={adminInputClass} required />
            </label>
            <label>
              <span className={adminLabelClass}>Image {editing ? '(leave empty to keep current)' : '(optional)'}</span>
              <input name="layoverImage" type="file" accept="image/*" className={adminInputClass} />
            </label>
            {editing && (
              <label className="flex items-center gap-2 text-sm text-muted-foreground md:col-span-2">
                <input name="removeImage" type="checkbox" value="true" className="size-4 rounded border-border" />
                Remove the current image
              </label>
            )}
            <label className="md:col-span-2">
              <span className={adminLabelClass}>Teaser</span>
              <textarea name="teaser" defaultValue={editing?.teaser ?? ''} className={`${adminInputClass} min-h-20 resize-y`} required />
            </label>
            <label className="md:col-span-2">
              <span className={adminLabelClass}>Itinerary (one step per line)</span>
              <textarea name="itinerary" defaultValue={editing?.itinerary.join('\n') ?? ''} className={`${adminInputClass} min-h-32 resize-y`} placeholder={'Meet at arrivals with a name board and a cold towel\nDrive to Entoto ridge'} required />
            </label>
            <label className="md:col-span-2">
              <span className={adminLabelClass}>Includes (one item per line)</span>
              <textarea name="includes" defaultValue={editing?.includes.join('\n') ?? ''} className={`${adminInputClass} min-h-32 resize-y`} placeholder={'Private vehicle and driver-guide\nAll entrance fees'} required />
            </label>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" className={adminSecondaryButtonClass} onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className={adminPrimaryButtonClass} disabled={saving} data-testid="save-layover-package">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {editing ? 'Save changes' : 'Create package'}
            </button>
          </div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <Plane className="mx-auto mb-3 size-9 opacity-30" /> No layover packages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <article key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm" data-testid={`layover-package-${item.id}`}>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => void reorder(index, index - 1)}
                  disabled={index === 0 || reorderingId !== null}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move ${item.title} up`}
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => void reorder(index, index + 1)}
                  disabled={index === items.length - 1 || reorderingId !== null}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move ${item.title} down`}
                >
                  <ArrowDown className="size-4" />
                </button>
              </div>
              <div
                className="h-16 w-24 shrink-0 rounded-lg bg-muted bg-cover bg-center"
                style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
                role={item.image ? 'img' : undefined}
                aria-label={item.image ? item.title : undefined}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-serif text-lg text-foreground">{item.title}</h2>
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">{item.hours}</span>
                  {reorderingId === item.id && <Loader2 className="size-3.5 animate-spin text-accent" />}
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">{item.teaser}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.price} · {item.itinerary.length} steps · {item.includes.length} included
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => openEdit(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Edit ${item.title}`}><Edit3 className="size-4" /></button>
                <button type="button" onClick={() => void remove(item)} disabled={deletingId === item.id} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${item.title}`}>
                  {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}