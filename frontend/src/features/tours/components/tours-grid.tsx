'use client'

import { useCopy } from '@/i18n/copy'

import { useMemo, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from './tour-card'
import type { TourCardData } from '../types'

function styleTokens(tour: TourCardData) {
  return tour.styleKeys ?? tour.style.split('·').map((s) => s.trim())
}

export function ToursGrid({ tours }: { tours: TourCardData[] }) {
  const copy = useCopy()

  const labels = new Map<string, string>()
  tours.forEach((t) =>
    styleTokens(t).forEach((key, i) =>
      labels.set(key, t.style.split('·')[i]?.trim() ?? key),
    ),
  )
  const filters = useMemo(() => {
    const set = new Set<string>()
    tours.forEach((t) => styleTokens(t).forEach((s) => set.add(s)))
    return ['__all__', ...Array.from(set).sort()]
  }, [tours])

  const [active, setActive] = useState('__all__')

  const visible =
    active === '__all__'
      ? tours
      : tours.filter((t) => styleTokens(t).includes(active))

  return (
    <div>
      <div
        role="group"
        aria-label={copy('Filter journeys by style')}
        className="mb-12 flex flex-wrap gap-2 sm:mb-16"
      >
        {filters.map((f) => {
          const on = f === active
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:text-[11px] ${
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {f === '__all__'
                ? copy('All Journeys')
                : (labels.get(f) ?? copy(f))}
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
