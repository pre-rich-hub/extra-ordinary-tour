import { useCopy } from '@/i18n/copy'
import { MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function TourOverview({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  return (
    <Reveal className="lg:col-start-1 lg:row-start-1">
      <p className="eyebrow mb-5 text-accent">{copy('The Journey')}</p>
      <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
        {t.nights
          ? copy('{v0} nights, designed around the hours that matter', {
              v0: t.nights,
            })
          : copy('One full day, designed around the hours that matter')}
      </h2>
      <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {copy(t.summary)}
      </p>

      <div className="mt-10">
        <p className="eyebrow mb-5 text-primary">{copy('Places')}</p>
        <ul className="flex flex-wrap gap-2">
          {t.places.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
            >
              <MapPin className="h-3 w-3 text-accent" />
              {copy(p)}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
