import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { TourIndex, type TourIndexItem } from './tour-index'
import { getTours } from '@/features/tours/data/localized'
import type { Tour } from '@/features/tours/types'

export function FeaturedTours({ tours: providedTours }: { tours?: Tour[] }) {
  const copy = useCopy()

  const staticTours = getTours(useLocale() as AppLocale)
  const tours = providedTours ?? staticTours

  const featured = tours
    .filter((t) => t.featured)
    .map((t): TourIndexItem => ({
      slug: t.slug,
      image: t.image,
      title: t.title,
      style: t.style,
      nights: t.nights,
      days: t.days,
      group: t.group,
      teaser: t.teaser,
      season: t.season,
      from: t.from,
    }))

  return (
    <section
      id="tours"
      aria-labelledby="tours-title"
      className="bg-linen/60 py-20 sm:py-24 lg:py-32"
    >
      <TourIndex tours={featured} />
    </section>
  )
}
