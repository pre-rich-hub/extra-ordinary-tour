'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Plus, X, ArrowUp, ArrowDown, Trash2, CalendarOff, Star, Image as ImageIcon } from 'lucide-react'
import { adminRequest, reorderGallery } from '../../lib/api'
import { TourDetailsFields, type TourDetails } from './tour-details-fields'
import { adminPanelClass, adminInputClass, adminLabelClass } from '../../components/admin-primitives'

type Destination = { id: number; name: string }
type Category = { id: number; name: string }
type GalleryImage = { id: number; imageUrl: string; tourId: number | null }
type BlockedDate = { id: number; date: string; reason: string | null }

type ItineraryDay = {
  day: number
  dayLabel?: string
  title: string
  activities: string
  overnight: string
  meals?: string
}

type TourData = TourDetails & {
  id: number
  name: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: string | null
  rating: number | null
  noOfRates: number | null
  isFeatured: boolean
  mainImage: string | null
  ctaBandImageUrl: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string }[]
  categories: Category[]
  gallery: GalleryImage[]
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  journeyMap: string | null
}

export function AdminTourEdit() {
  const router = useRouter()
  const params = useParams()
  const tourId = Number(params.id)
  const invalidTourId = !Number.isInteger(tourId) || tourId <= 0
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tour, setTour] = useState<TourData | null>(null)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  const [galleryOrder, setGalleryOrder] = useState<GalleryImage[]>([])
  const [reordering, setReordering] = useState(false)
  const [ctaBandImageUrl, setCtaBandImageUrl] = useState('')
  const [ctaBandImageFile, setCtaBandImageFile] = useState<File | null>(null)
  const [included, setIncluded] = useState<string[]>([])
  const [excluded, setExcluded] = useState<string[]>([])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])

  // Blocked dates (unavailable booking days)
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [blockedReason, setBlockedReason] = useState('')
  const [blockedSaving, setBlockedSaving] = useState(false)
  const [blockedDeleting, setBlockedDeleting] = useState<number | null>(null)
  const [blockedError, setBlockedError] = useState('')

  useEffect(() => {
    let active = true

    if (invalidTourId) {
      return () => { active = false }
    }

    Promise.all([
      adminRequest<TourData>(`/api/v1/admin/tours/${tourId}`, { cache: 'no-store' }),
      adminRequest<Destination[]>('/api/v1/admin/destinations', { cache: 'no-store' }),
      adminRequest<Category[]>('/api/v1/admin/categories', { cache: 'no-store' }),
      adminRequest<BlockedDate[]>(`/api/v1/admin/tours/${tourId}/blocked-dates`, { cache: 'no-store' }),
    ])
      .then(([tourData, destinationItems, categoryItems, blockedItems]) => {
        if (!active) return
        setTour(tourData)
        setDestinations(destinationItems)
        setCategories(categoryItems)
        setSelectedDestinations(
          tourData.destinations?.length
            ? tourData.destinations.map((destination) => destination.id)
            : tourData.destination
              ? [tourData.destination.id]
              : [],
        )
        setIncluded(tourData.included ?? [])
        setExcluded(tourData.excluded ?? [])
        setItinerary(
          tourData.itinerary?.length
            ? tourData.itinerary.map((item) => ({
                day: item.day,
                ...(item.dayLabel ? { dayLabel: item.dayLabel } : {}),
                title: item.title ?? '',
                activities: item.activities ?? '',
                overnight: item.overnight ?? '',
                meals: item.meals ?? '',
              }))
            : [{ day: 1, title: '', activities: '', overnight: '', meals: '' }],
        )
        setSelectedCategories(tourData.categories.map((category) => category.id))
        setGalleryOrder(tourData.gallery ?? [])
        setCtaBandImageUrl(tourData.ctaBandImageUrl ?? '')
        setBlockedDates(blockedItems)
        setError('')
      })
      .catch((loadError: unknown) => {
        if (!active) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Tour details could not be loaded.',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [invalidTourId, tourId])

  function toggleCategory(id: number) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function toggleDestination(id: number) {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((destinationId) => destinationId !== id) : [...prev, id]
    )
  }

  function addArrayItem(list: string[], setter: (v: string[]) => void) {
    setter([...list, ''])
  }
  function removeArrayItem(list: string[], idx: number, setter: (v: string[]) => void) {
    setter(list.filter((_, i) => i !== idx))
  }
  function updateArrayItem(list: string[], idx: number, val: string, setter: (v: string[]) => void) {
    const next = [...list]
    next[idx] = val
    setter(next)
  }

  function addItineraryDay() {
    setItinerary((prev) => [
      ...prev,
      { day: prev.length + 1, title: '', activities: '', overnight: '', meals: '' },
    ])
  }
  function removeItineraryDay(idx: number) {
    setItinerary((prev) => {
      const next = prev.filter((_, i) => i !== idx)
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }
  function updateItineraryDay(idx: number, field: keyof ItineraryDay, val: string) {
    setItinerary((prev) => {
      const next = [...prev]
      ;(next[idx] as Record<string, unknown>)[field] = val
      return next
    })
  }
  function moveItineraryDay(idx: number, dir: 'up' | 'down') {
    setItinerary((prev) => {
      const target = dir === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }

  function toggleDeleteImage(imgId: number) {
    setDeleteImageIds((prev) =>
      prev.includes(imgId) ? prev.filter((id) => id !== imgId) : [...prev, imgId]
    )
  }

  async function moveGalleryImage(idx: number, dir: 'up' | 'down') {
    const target = dir === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= galleryOrder.length) return
    const next = [...galleryOrder]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setGalleryOrder(next)
    setReordering(true)
    try {
      await reorderGallery(tourId, next.map((img) => img.id))
    } catch {
      // Revert on failure
      setGalleryOrder(galleryOrder)
    } finally {
      setReordering(false)
    }
  }

  async function setCoverPhoto(idx: number) {
    if (idx === 0) return
    const next = [...galleryOrder]
    const [picked] = next.splice(idx, 1)
    next.unshift(picked)
    setGalleryOrder(next)
    setReordering(true)
    try {
      await reorderGallery(tourId, next.map((img) => img.id))
    } catch {
      setGalleryOrder(galleryOrder)
    } finally {
      setReordering(false)
    }
  }

  async function handleBlockedDateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newBlockedDate) return
    setBlockedSaving(true)
    setBlockedError('')
    try {
      await adminRequest(`/api/v1/admin/tours/${tourId}/blocked-dates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dates: [newBlockedDate],
          reason: blockedReason.trim() || undefined,
        }),
      })
      const updated = await adminRequest<BlockedDate[]>(`/api/v1/admin/tours/${tourId}/blocked-dates`)
      setBlockedDates(updated)
      setNewBlockedDate('')
      setBlockedReason('')
    } catch (submitError) {
      setBlockedError(
        submitError instanceof Error ? submitError.message : 'Blocked date could not be added.',
      )
    } finally {
      setBlockedSaving(false)
    }
  }

  async function handleBlockedDateDelete(blockedDate: BlockedDate) {
    setBlockedDeleting(blockedDate.id)
    setBlockedError('')
    try {
      await adminRequest<null>(`/api/v1/admin/tours/${tourId}/blocked-dates/${blockedDate.id}`, {
        method: 'DELETE',
      })
      setBlockedDates((current) => current.filter((item) => item.id !== blockedDate.id))
    } catch (submitError) {
      setBlockedError(
        submitError instanceof Error ? submitError.message : 'Blocked date could not be removed.',
      )
    } finally {
      setBlockedDeleting(null)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedDestinations.length === 0) {
      setError('Choose at least one destination.')
      return
    }
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set('tourDestination', String(selectedDestinations[0]))
    formData.set('tourDestinations', JSON.stringify(selectedDestinations))
    formData.set('tourCategories', JSON.stringify(selectedCategories))
    formData.set('tourIncluded', JSON.stringify(included.filter(Boolean)))
    formData.set('tourExcluded', JSON.stringify(excluded.filter(Boolean)))
    formData.set('tourItinerary', JSON.stringify(itinerary))
    formData.set('tourReviews', String(tour?.noOfRates ?? 0))
    formData.set('deleteImages', JSON.stringify(deleteImageIds))
    if (ctaBandImageUrl.trim()) formData.set('ctaBandImageUrl', ctaBandImageUrl.trim())
    if (ctaBandImageFile) formData.set('ctaBandImage', ctaBandImageFile)

    try {
      await adminRequest(`/api/v1/admin/tours/${tourId}`, {
        method: 'PUT',
        body: formData,
      })
      router.replace('/admin/tours')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to update tour. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (invalidTourId) {
    return (
      <div className="p-8">
        <div role="alert" className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
          Invalid tour ID.
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="p-8">
        <div role="alert" className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
          {error || 'Tour not found.'}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          Try Again
        </button>
      </div>
    )
  }

  const fieldClass = `${adminInputClass} bg-white`

  return (
    <div className="max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Tour</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tour.name}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className={adminPanelClass}>
          <h2 className="mb-5 font-serif text-lg text-foreground">Basic Information</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="tourTitle" className={adminLabelClass}>
                Tour Name
              </label>
              <input
                id="tourTitle"
                name="tourTitle"
                required
                defaultValue={tour.name}
                className={fieldClass}
              />
            </div>
            <fieldset className="md:col-span-2">
              <legend className={adminLabelClass}>
                Destinations
              </legend>
              <p className="mb-3 text-xs text-muted-foreground">Choose one or more destinations for this tour.</p>
              <div className="flex flex-wrap gap-3">
                {destinations.map((destination) => (
                  <label
                    key={destination.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                      selectedDestinations.includes(destination.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDestinations.includes(destination.id)}
                      onChange={() => toggleDestination(destination.id)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                    />
                    {destination.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="tourDiscount" className={adminLabelClass}>
                Discount (%)
              </label>
              <input
                id="tourDiscount"
                name="tourDiscount"
                type="number"
                min="0"
                max="100"
                defaultValue={tour.discount ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="adultPrice" className={adminLabelClass}>
                Adult Price ($)
              </label>
              <input
                id="adultPrice"
                name="adultPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.adultPrice ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="childPrice" className={adminLabelClass}>
                Child Price ($)
              </label>
              <input
                id="childPrice"
                name="childPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.childPrice ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tourRating" className={adminLabelClass}>
                Rating (0-5)
              </label>
              <input
                id="tourRating"
                name="tourRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={tour.rating ?? ''}
                className={fieldClass}
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="isFeatured"
                  value="true"
                  defaultChecked={tour.isFeatured}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm font-medium text-foreground">Featured Tour</span>
              </label>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className={adminPanelClass}>
          <label htmlFor="tourOverview" className="mb-5 block font-serif text-lg text-foreground">
            Overview
          </label>
          <textarea
            id="tourOverview"
            name="tourOverview"
            rows={6}
            defaultValue={tour.overview ?? ''}
            className={`${fieldClass} resize-y`}
          />
        </section>

        <TourDetailsFields tour={tour} />

        {/* Journey Map */}
        <section className={adminPanelClass}>
          <label htmlFor="tourMap" className="mb-5 block font-serif text-lg text-foreground">
            Journey map
          </label>
          <textarea
            id="tourMap"
            name="tourMap"
            rows={4}
            defaultValue={tour.journeyMap ?? ''}
            className={`${fieldClass} resize-y`}
            placeholder="URL or map markup for the tour journey"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Leave empty to clear the journey map.
          </p>
        </section>

        {/* Included */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Included</h2>
            <button
              type="button"
              onClick={() => addArrayItem(included, setIncluded)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {included.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(included, i, e.target.value, setIncluded)}
                  className={fieldClass}
                  placeholder="e.g. Airport transfers"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(included, i, setIncluded)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Excluded */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Excluded</h2>
            <button
              type="button"
              onClick={() => addArrayItem(excluded, setExcluded)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {excluded.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(excluded, i, e.target.value, setExcluded)}
                  className={fieldClass}
                  placeholder="e.g. International flights"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(excluded, i, setExcluded)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerary Builder */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Day
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((day, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Day {day.day}</span>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'up')}
                      disabled={i === 0}
                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'down')}
                      disabled={i === itinerary.length - 1}
                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <input
                      value={day.title}
                      onChange={(e) => updateItineraryDay(i, 'title', e.target.value)}
                      className={fieldClass}
                      placeholder={`Day ${day.day} title`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      value={day.activities}
                      onChange={(e) => updateItineraryDay(i, 'activities', e.target.value)}
                      rows={3}
                      className={`${fieldClass} resize-y`}
                      placeholder="Activities description..."
                    />
                  </div>
                  <div>
                    <input
                      value={day.overnight}
                      onChange={(e) => updateItineraryDay(i, 'overnight', e.target.value)}
                      className={fieldClass}
                      placeholder="Overnight location"
                    />
                  </div>
                  <div>
                    <input
                      value={day.meals ?? ''}
                      onChange={(e) => updateItineraryDay(i, 'meals', e.target.value)}
                      className={fieldClass}
                      placeholder="Meals"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Existing Images — reorderable, first image is the cover/header */}
        {galleryOrder.length > 0 && (
          <section className={adminPanelClass}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-serif text-lg text-foreground">Tour Photos</h2>
              {reordering && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
            </div>
            <p className="mb-5 text-xs text-muted-foreground">
              The <span className="font-medium text-foreground">first photo</span> (marked with a star) is used as the <span className="font-medium text-foreground">header / cover image</span> shown at the top of the tour page. Use the arrows to reorder, or click &quot;Set as Cover&quot; to promote any photo to position 1. Click the trash icon to delete a photo.
            </p>
            <div className="space-y-2">
              {galleryOrder.map((img, idx) => {
                const marked = deleteImageIds.includes(img.id)
                const isCover = idx === 0
                return (
                  <div
                    key={img.id}
                    className={`flex items-center gap-3 rounded-lg border p-2 transition-all ${
                      marked ? 'border-red-300 bg-red-50 opacity-60' : isCover ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.imageUrl} alt="" className="h-full w-full object-cover" />
                      {isCover && !marked && (
                        <div className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-primary/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                          <Star size={8} className="fill-current" /> Cover
                        </div>
                      )}
                    </div>

                    {/* Position label */}
                    <span className="w-8 shrink-0 text-center text-xs font-medium text-muted-foreground">
                      #{idx + 1}
                    </span>

                    {/* Actions */}
                    <div className="ml-auto flex items-center gap-1">
                      {!isCover && !marked && (
                        <button
                          type="button"
                          onClick={() => setCoverPhoto(idx)}
                          className="rounded px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                          title="Make this the cover / header photo"
                        >
                          Set as Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => moveGalleryImage(idx, 'up')}
                        disabled={idx === 0 || reordering}
                        className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveGalleryImage(idx, 'down')}
                        disabled={idx === galleryOrder.length - 1 || reordering}
                        className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleDeleteImage(img.id)}
                        className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                          marked
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'text-muted-foreground hover:bg-red-50 hover:text-red-600'
                        }`}
                        title={marked ? 'Undo deletion' : 'Delete this photo'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            {deleteImageIds.length > 0 && (
              <p className="mt-3 text-xs text-red-600">
                {deleteImageIds.length} photo{deleteImageIds.length > 1 ? 's' : ''} marked for deletion — will be removed when you save.
              </p>
            )}
          </section>
        )}

        {/* Add New Images */}
        <section className={adminPanelClass}>
          <h2 className="mb-5 font-serif text-lg text-foreground">Add New Images</h2>
          <input
            type="file"
            name="tourImages"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.avif"
            onChange={(e) => setNewImages(Array.from(e.target.files ?? []))}
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG, WebP, or AVIF. Each image must be 4 MB or smaller.
          </p>
          {newImages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {newImages.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-foreground"
                >
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Footer / CTA section image */}
        <section className={adminPanelClass}>
          <div className="mb-2 flex items-center gap-2">
            <ImageIcon size={16} className="text-accent" />
            <h2 className="font-serif text-lg text-foreground">Footer / CTA Section Image</h2>
          </div>
          <p className="mb-5 text-xs text-muted-foreground">
            The image shown in the full-width call-to-action band at the bottom of the tour page. Leave empty to use the same image as the tour header.
          </p>
          {/* Preview current CTA image */}
          {(ctaBandImageUrl || tour.ctaBandImageUrl) && !ctaBandImageFile && (
            <div className="mb-4 flex items-start gap-3">
              <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ctaBandImageUrl || tour.ctaBandImageUrl || ''}
                  alt="Current footer image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Current footer image</p>
                <button
                  type="button"
                  onClick={() => setCtaBandImageUrl('')}
                  className="mt-1 text-xs text-red-600 hover:underline"
                >
                  Clear (use header image instead)
                </button>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className={`${adminLabelClass} mb-1.5 block`}>Upload a new footer image</label>
              <input
                type="file"
                name="ctaBandImage"
                accept=".jpg,.jpeg,.png,.webp,.avif"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  setCtaBandImageFile(file)
                  if (file) setCtaBandImageUrl('')
                }}
                className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
              />
            </div>
            <div>
              <label className={`${adminLabelClass} mb-1.5 block`}>Or paste an image URL</label>
              <input
                type="url"
                value={ctaBandImageUrl}
                onChange={(e) => { setCtaBandImageUrl(e.target.value); setCtaBandImageFile(null) }}
                placeholder="https://…"
                className={`${fieldClass} bg-white`}
              />
            </div>
          </div>
        </section>

        {/* Blocked Dates */}
        <section className={adminPanelClass}>
          <div className="mb-1 flex items-center gap-2">
            <CalendarOff size={16} className="text-accent" />
            <h2 className="font-serif text-lg text-foreground">Blocked Dates</h2>
          </div>
          <p className="mb-5 text-xs text-muted-foreground">
            Dates when this tour cannot be booked. Shown to travelers on the booking form.
          </p>

          {blockedError && (
            <div role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {blockedError}
            </div>
          )}

          <form onSubmit={handleBlockedDateSubmit} className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr_auto]">
            <input
              type="date"
              required
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              className={`${fieldClass} sm:w-44`}
              aria-label="Blocked date"
            />
            <input
              type="text"
              value={blockedReason}
              onChange={(e) => setBlockedReason(e.target.value)}
              className={fieldClass}
              placeholder="Reason (optional), e.g. Fully booked"
              aria-label="Reason"
            />
            <button
              type="submit"
              disabled={blockedSaving || !newBlockedDate}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {blockedSaving && <Loader2 size={16} className="animate-spin" />}
              <Plus size={16} />
              Add
            </button>
          </form>

          {blockedDates.length === 0 ? (
            <p className="text-sm text-muted-foreground">No blocked dates. The tour is bookable on any date.</p>
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {blockedDates.map((blockedDate) => (
                <li key={blockedDate.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${blockedDate.date}T00:00:00`))}
                    </p>
                    {blockedDate.reason && (
                      <p className="text-xs text-muted-foreground">{blockedDate.reason}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBlockedDateDelete(blockedDate)}
                    disabled={blockedDeleting === blockedDate.id}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-50"
                    aria-label={`Remove blocked date ${blockedDate.date}`}
                  >
                    {blockedDeleting === blockedDate.id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className={adminPanelClass}>
            <h2 className="mb-5 font-serif text-lg text-foreground">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const selected = selectedCategories.includes(cat.id)
                return (
                  <label
                    key={cat.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                      selected
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCategory(cat.id)}
                      className="sr-only"
                    />
                    {cat.name}
                  </label>
                )
              })}
            </div>
          </section>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            data-testid="save-tour"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tours')}
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
