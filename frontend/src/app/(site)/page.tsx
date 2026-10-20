import { storySlugs } from '@/features/home/data/signature-journeys'
import { getToursData } from '@/features/tours/server/catalog'
import { Hero } from '@/features/home/components/hero'
import { WhyTravel } from '@/features/home/components/why-travel'
import { SignatureDestinations } from '@/features/home/components/signature-destinations'
import { FeaturedTours } from '@/features/home/components/featured-tours'
import { StoryCarousel } from '@/features/home/components/story-carousel'
import { Experiences } from '@/features/home/components/experiences'
import { Reviews } from '@/features/reviews/components/reviews'
import { Gallery } from '@/features/home/components/gallery'
import { PlanJourney } from '@/features/home/components/plan-journey'
import type { Tour } from '@/features/tours/types'

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
      <Reviews />
      <Gallery />
      <PlanJourney />
    </>
  )
}
