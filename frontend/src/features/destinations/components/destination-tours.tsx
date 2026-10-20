import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from '@/features/tours/components/tour-card'
import { getTours } from '@/features/tours/data/localized'
import type { Destination } from '../types'

export function DestinationTours({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  const tours = getTours(useLocale() as AppLocale)

  const related = tours
    .filter((t) =>
      (t.canonicalPlaces ?? t.places).some((p) =>
        p.includes((d.canonicalName ?? d.name).split(' ')[0]),
      ),
    )
    .slice(0, 3)
  const fallback = related.length ? related : tours.slice(0, 3)
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
        {fallback.map((t, i) => (
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
