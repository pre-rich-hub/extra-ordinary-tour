import { TourIndex } from './tour-index'
import { tours as staticTours } from '@/features/tours/data/tours'
import type { Tour } from '@/features/tours/types'

export function FeaturedTours({ tours = staticTours }: { tours?: Tour[] }) {
  const featured = tours.filter((t) => t.featured)

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
