import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTour, tours } from '@/features/tours/data/tours'
import { getTourData } from '@/features/tours/server/catalog'
import { hasPrice, priceShort } from '@/features/tours/lib/format'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { TourOverview } from '@/features/tours/components/tour-overview'
import { TourBooking } from '@/features/tours/components/tour-booking'
import { TourItinerary } from '@/features/tours/components/tour-itinerary'
import { TourInclusions } from '@/features/tours/components/tour-inclusions'
import { TourEnquiry } from '@/features/tours/components/tour-enquiry'
import { RelatedTours } from '@/features/tours/components/related-tours'

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = getTour(slug)
  if (!t) return { title: 'Journey not found' }
  return {
    title: t.title,
    description: t.summary,
    openGraph: { title: t.title, description: t.summary, images: [t.image] },
  }
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTourData(slug)
  if (!t) notFound()

  return (
    <>
      <PageHero
        eyebrow={t.style}
        title={t.title}
        lede={t.teaser}
        image={t.image}
        imageAlt={t.title}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tours', href: '/tours' },
          { label: t.title },
        ]}
        meta={[
          { label: 'Duration', value: t.days },
          { label: 'Season', value: t.season },
          { label: 'Group Size', value: t.group },
          { label: hasPrice(t.from) ? 'From' : 'Price', value: priceShort(t.from) },
        ]}
      />

      {/* Overview + itinerary, with the pricing card pinned alongside */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[1fr_380px] xl:gap-x-20 lg:py-28">
        <TourOverview tour={t} />

        <TourBooking tour={t} />

        {/* Itinerary */}
        <TourItinerary tour={t} />
      </section>

      {/* Includes / excludes */}
      <TourInclusions tour={t} />

      {/* Enquire */}
      <TourEnquiry tour={t} />

      {/* Other journeys */}
      <RelatedTours tour={t} />

      <CtaBand
        title="Questions before you enquire?"
        text="Altitude, road time, how hard the walking really is, whether the children will cope. Ask us anything. Our team will answer honestly."
        secondary={{ label: 'Layover Tours', href: '/layover' }}
        image={t.image}
      />
    </>
  )
}
