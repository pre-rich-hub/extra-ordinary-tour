import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from './tour-card'
import { getTours } from '../data/localized'
import { getDestinations } from '@/features/destinations/data/localized'
import { relatedTours } from '@/features/destinations/data/relations'
import type { Tour } from '../types'

export function RelatedTours({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  const locale = useLocale() as AppLocale
  const tours = getTours(locale)
  const current = tours.find((o) => o.slug === t.slug) ?? t

  const others = relatedTours(current, tours, getDestinations(locale))
  if (!others.length) return null
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
      <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-accent sm:mb-5">
            {copy('Other Journeys')}
          </p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {copy('You may also be weighing up')}
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {others.map((o, i) => (
          <Reveal key={o.slug} delay={i * 90} className="h-full">
            <TourCard tour={o} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
