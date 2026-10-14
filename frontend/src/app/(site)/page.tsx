import { Hero } from '@/features/home/components/hero'
import { WhyTravel } from '@/features/home/components/why-travel'
import { SignatureDestinations } from '@/features/home/components/signature-destinations'
import { FeaturedTours } from '@/features/home/components/featured-tours'
import { StoryCarousel } from '@/features/home/components/story-carousel'
import { Experiences } from '@/features/home/components/experiences'
import { DestinationIndex } from '@/features/home/components/destination-index'
import { Reviews } from '@/features/home/components/reviews'
import { Gallery } from '@/features/home/components/gallery'
import { PlanJourney } from '@/features/home/components/plan-journey'
import { getToursData } from '@/lib/catalog'
import type { Tour } from '@/types'

// One journey from each tour category for the "Signature Journeys" carousel.
const storySlugs = [
  '7-day-historic-route',
  '13-day-historic-route-and-omo-valley',
  '12-day-ethiopian-safari',
  '5-day-simien-mountains-trek',
  '5-day-timkat-festival-lalibela',
  '6-day-ethiopia-coffee-kaffa',
  '3-day-danakil-depression-from-mekelle',
  '7-day-ethiopia-birding',
  'wenchi-crater-lake-day-trip',
]

export default async function Page() {
  const tours = await getToursData()
  const stories = storySlugs
    .map((slug) => tours.find((t) => t.slug === slug))
    .filter((t): t is Tour => Boolean(t))

  return (
    <>
      <Hero />
      <WhyTravel />
      <SignatureDestinations />
      <FeaturedTours tours={tours} />
      <StoryCarousel tours={stories} />
      <Experiences />
      <DestinationIndex />
      <Reviews />
      <Gallery />
      <PlanJourney />
    </>
  )
}

