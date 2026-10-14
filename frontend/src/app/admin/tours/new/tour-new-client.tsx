'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Plus, X, ArrowUp, ArrowDown } from 'lucide-react'
import { adminRequest } from '@/features/admin/lib/api'
import { adminPanelClass, adminInputClass, adminLabelClass } from '@/features/admin/components/admin-primitives'

type Destination = { id: number; name: string }
type Category = { id: number; name: string }

type ItineraryDay = {
  day: number
  title: string
  activities: string
  overnight: string
  meals: string
}

export function AdminTourNew() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [images, setImages] = useState<File[]>([])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: '', activities: '', overnight: '', meals: '' },
  ])

  useEffect(() => {
    let active = true

    Promise.all([
      adminRequest<Destination[]>('/api/v1/admin/destinations'),
      adminRequest<Category[]>('/api/v1/admin/categories'),
    ])
      .then(([destinationItems, categoryItems]) => {
        if (!active) return
        setDestinations(destinationItems)
        setCategories(categoryItems)
        setOptionsError('')
      })
      .catch((loadError: unknown) => {
        if (!active) return
        setOptionsError(loadError instanceof Error ? loadError.message : 'Tour options could not be loaded.')
      })
      .finally(() => {
        if (active) setOptionsLoading(false)
      })

    return () => { active = false }
  }, [])

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
      next[idx] = { ...next[idx], [field]: val }
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
    formData.set('tourReviews', '0')

    try {
      await adminRequest('/api/v1/admin/tours', {
        method: 'POST',
        body: formData,
      })
      router.push('/admin/tours')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to create tour. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = `${adminInputClass} bg-white`

  return (
    <div className="max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">New Tour</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a new tour package</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {optionsError ? (
        <div role="alert" className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {optionsError}
        </div>
      ) : null}

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
                className={fieldClass}
                placeholder="e.g. Omo Valley Explorer"
              />
            </div>
            <fieldset className="md:col-span-2">
              <legend className={adminLabelClass}>
                Destinations
              </legend>
              <p className="mb-3 text-xs text-muted-foreground">Choose one or more destinations for this tour.</p>
              {optionsLoading ? (
                <p className="text-sm text-muted-foreground">Loading destinations...</p>
              ) : (
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
              )}
              {!optionsLoading && destinations.length === 0 ? (
                <p className="mt-2 text-xs text-amber-700">
                  A tour needs a destination.{' '}
                  <Link href="/admin/destinations" className="font-semibold underline underline-offset-2">
                    Add a destination first
                  </Link>
                  .
                </p>
              ) : null}
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
                className={fieldClass}
                placeholder="e.g. 10"
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
                className={fieldClass}
                placeholder="e.g. 2500"
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
                className={fieldClass}
                placeholder="e.g. 1500"
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
                className={fieldClass}
                placeholder="e.g. 4.5"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="isFeatured"
                  value="true"
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
            className={`${fieldClass} resize-y`}
            placeholder="Describe the tour experience..."
          />
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
              <div
                key={i}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      Day {day.day}
                    </span>
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
                      placeholder={`Day ${day.day} title (e.g. Addis Ababa - Arba Minch)`}
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
                      value={day.meals}
                      onChange={(e) => updateItineraryDay(i, 'meals', e.target.value)}
                      className={fieldClass}
                      placeholder="Meals (e.g. Breakfast, lunch, dinner)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Images */}
        <section className={adminPanelClass}>
          <h2 className="mb-5 font-serif text-lg text-foreground">Tour Images</h2>
          <input
            type="file"
            name="tourImages"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.avif"
            required
            onChange={(e) => setImages(Array.from(e.target.files ?? []))}
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG, WebP, or AVIF. Each image must be 4 MB or smaller.
          </p>
          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {images.map((file, i) => (
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

        {/* Categories */}
        {categories.length > 0 && (
          <section className={adminPanelClass}>
            <h2 className="mb-5 font-serif text-lg text-foreground">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                    selectedCategories.includes(cat.id)
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="sr-only"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting || optionsLoading || destinations.length === 0}
            data-testid="save-tour"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Creating...' : 'Create Tour'}
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