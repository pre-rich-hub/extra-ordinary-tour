'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Image as ImageIcon, Loader2, Plus, Trash2, Upload, X } from 'lucide-react'
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

type GalleryItem = { id: number; imageUrl: string; tourId: number | null; tour?: { id: number; name: string } | null }
type Tour = { id: number; name: string }

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [gallery, tourList] = await Promise.all([
        adminRequest<GalleryItem[]>('/api/v1/admin/gallery'),
        adminRequest<Tour[]>('/api/v1/admin/tours'),
      ])
      setItems(gallery)
      setTours(tourList)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Gallery could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSaving(true)
    setFeedback('')
    try {
      await adminRequest<GalleryItem>('/api/v1/admin/gallery', { method: 'POST', body: formData })
      form.reset()
      setFormOpen(false)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Image could not be uploaded.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: GalleryItem) {
    if (!window.confirm('Delete this gallery image?')) return
    try {
      await adminRequest<null>(`/api/v1/admin/gallery/${item.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Image could not be deleted.')
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader title="Gallery" description="Curate images and optionally connect them to a tour." action={<button type="button" onClick={() => setFormOpen(true)} className={adminPrimaryButtonClass} data-testid="add-gallery-image"><Plus className="size-4" /> Add image</button>} />
      <AdminFeedback message={feedback} />

      {formOpen && (
        <form onSubmit={submit} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="gallery-form">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-xl text-foreground">Upload gallery image</h2><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form"><X className="size-4" /></button></div>
          <div className="grid items-end gap-5 md:grid-cols-2">
            <label><span className={adminLabelClass}>Image</span><input name="galleryImage" type="file" accept="image/*" className={adminInputClass} required /></label>
            <label><span className={adminLabelClass}>Related tour (optional)</span><select name="tourId" className={adminInputClass}><option value="">General gallery</option>{tours.map((tour) => <option key={tour.id} value={tour.id}>{tour.name}</option>)}</select></label>
          </div>
          <div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Cancel</button><button type="submit" disabled={saving} className={adminPrimaryButtonClass} data-testid="save-gallery-image">{saving ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload image</button></div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><ImageIcon className="mx-auto mb-3 size-9 opacity-30" />No gallery images yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm" data-testid={`gallery-${item.id}`}>
              <div className="relative h-48 bg-muted bg-cover bg-center" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
                <button type="button" onClick={() => void remove(item)} className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition hover:bg-red-600 group-hover:opacity-100" aria-label="Delete image"><Trash2 className="size-4" /></button>
              </div>
              <div className="p-4"><p className="truncate text-sm font-medium text-foreground">{item.tour?.name || 'General gallery'}</p><p className="mt-1 text-xs text-muted-foreground">Image #{item.id}</p></div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}