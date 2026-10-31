import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from '@/features/tours/components/tour-card'
import type { Tour } from '@/features/tours/types'
import { toursVisiting } from '../data/relations'
import type { Destination } from '../types'

export function DestinationTours({
  destination: d,
  tours,
}: {
  destination: Destination
  tours: Tour[]
}) {
  const copy = useCopy()

  // Only itineraries that genuinely visit this destination; none, no section.
  const related = toursVisiting(d, tours).slice(0, 4)
  if (!related.length) return null
  return (
    <div className="border-t border-border pt-12 lg:col-start-1 lg:row-start-3 lg:mt-14">
      <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-accent sm:mb-5">
            {copy('Journeys Including ')}
            {copy(d.name)}
          </p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {copy('Routes that pass through here')}
          </h2>
        </div>
        <Link
          href="/tours"
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
        >
          {copy('All tours')}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {related.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 2) * 90} className="h-full">
            <TourCard
              tour={t}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
