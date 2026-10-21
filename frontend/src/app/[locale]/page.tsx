import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const tours = await getToursData(locale)
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = await getCopy()
  return buildPageMetadata(
    {
      title: {
        absolute: copy(
          'Extraordinary Ethiopia Tours — Private Tours & Journeys Across Ethiopia',
        ),
      },
      description: copy(
        'Private and small-group tours of Ethiopia: the historic north, Omo Valley, Danakil Depression, Simien trekking, festivals and Addis Ababa layovers. Locally run from Lalibela since 2005.',
      ),
      openGraph: { type: 'website' },
    },
    '/',
    locale,
  )
}

export const revalidate = 3600
