'use client'

import { useCopy } from '@/i18n/copy'

import { useEffect, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from './tour-card'
import { tourCategories } from '../data/categories'
import type { TourCardData } from '../types'

const ALL = '__all__'

export function ToursGrid({ tours }: { tours: TourCardData[] }) {
  const copy = useCopy()

  const filters = tourCategories
    .map((c) => ({
      ...c,
      count: tours.filter((t) => (t.categories ?? []).includes(c.id)).length,
    }))
    .filter((c) => c.count > 0)

  const [active, setActive] = useState(ALL)

  // The page is statically rendered, so ?category= (from the Tours menu) is
  // read after hydration and kept in the address bar for sharing.
  useEffect(() => {
    const read = () => {
      const id = new URLSearchParams(window.location.search).get('category')
      setActive(tourCategories.some((c) => c.id === id) ? id! : ALL)
    }
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [])

  const choose = (id: string) => {
    setActive(id)
    const url = new URL(window.location.href)
    if (id === ALL) url.searchParams.delete('category')
    else url.searchParams.set('category', id)
    window.history.replaceState(null, '', url)
  }

  const visible =
    active === ALL
      ? tours
      : tours.filter((t) => (t.categories ?? []).includes(active))

  return (
    <div>
      <div
        role="group"
        aria-label={copy('Filter journeys by category')}
        className="mb-12 flex flex-wrap gap-2 sm:mb-16"
      >
        {[
          { id: ALL, label: 'All Journeys', count: tours.length },
          ...filters,
        ].map((f) => {
          const on = f.id === active
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => choose(f.id)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:text-[11px] ${
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {copy(f.label)}
              <span className="ml-1.5 opacity-60">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visible.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 90} className="h-full">
            <TourCard tour={t} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          {copy('No journeys in this style yet, but we will design one.')}
        </p>
      )}
    </div>
  )
}
