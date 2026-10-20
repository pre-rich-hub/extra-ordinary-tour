import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { destinations, getDestination } from '@/features/destinations/data/destinations'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { DestinationOverview } from '@/features/destinations/components/destination-overview'
import { DestinationBooking } from '@/features/destinations/components/destination-booking'
import { DestinationHighlights } from '@/features/destinations/components/destination-highlights'
import { DestinationTours } from '@/features/destinations/components/destination-tours'
import { DestinationEnquiry } from '@/features/destinations/components/destination-enquiry'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }
  return {
    title: d.name,
    description: d.intro,
    openGraph: { title: d.name, description: d.intro, images: [d.image] },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) notFound()

  return (
    <>
      <PageHero
        eyebrow={`${d.tag} · ${d.region}`}
        title={d.name}
        lede={d.intro}
        image={d.image}
        imageAlt={`${d.name}, Ethiopia`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: d.name },
        ]}
        meta={[
          { label: 'Best Time', value: d.bestTime },
          { label: 'Suggested Stay', value: d.duration },
          { label: 'Altitude', value: d.altitude },
          { label: 'Region', value: d.region },
        ]}
      />

      {/* Essay + highlights, with the planning card pinned alongside */}
      <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 lg:py-28 xl:grid-cols-[1fr_380px] xl:gap-x-20">
        <DestinationOverview destination={d} />

        <DestinationBooking destination={d} />

        <DestinationHighlights destination={d} />

          {/* Related tours, in the left column so the card stays pinned */}
        <DestinationTours destination={d} />
      </section>

      {/* Enquiry */}
      <DestinationEnquiry destination={d} />

      <CtaBand
        title="Speak to someone who has been there this season"
        text="Our guides travel these routes all year. Ask about road conditions, festival dates or the best time to visit. You will get a straight answer."
        secondary={{ label: 'All Destinations', href: '/destinations' }}
        image={d.image}
      />
    </>
  )
}
