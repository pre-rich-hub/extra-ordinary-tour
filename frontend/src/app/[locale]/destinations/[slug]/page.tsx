import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata, socialImage } from '@/i18n/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { destinationSchema, pageGraph } from '@/lib/seo/schema'
import {
  getDestinationsData,
  getDestinationData,
} from '@/features/destinations/server/catalog'
import { getToursData } from '@/features/tours/server/catalog'
import { getPostsData } from '@/features/blog/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { DestinationOverview } from '@/features/destinations/components/destination-overview'
import { DestinationBooking } from '@/features/destinations/components/destination-booking'
import { DestinationHighlights } from '@/features/destinations/components/destination-highlights'
import { DestinationTours } from '@/features/destinations/components/destination-tours'
import { DestinationArticles } from '@/features/destinations/components/destination-articles'
import { DestinationRegion } from '@/features/destinations/components/destination-region'
import { DestinationEnquiry } from '@/features/destinations/components/destination-enquiry'

// Destinations can be added from the admin, so slugs render on demand and stay
// cached for an hour, the same way tour pages do.
export function generateStaticParams() {
  return []
}
export const dynamicParams = true
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const d = await getDestinationData(slug, locale)
  if (!d) notFound()
  const copy = await getCopy()
  return buildPageMetadata(
    {
      title: copy('{name}, Ethiopia: Travel Guide', { name: d.name }),
      description: d.intro,
      openGraph: { images: [socialImage(d.image, d.name)] },
    },
    `/destinations/${slug}`,
    locale,
  )
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const [destinations, tours, posts] = await Promise.all([
    getDestinationsData(locale),
    getToursData(locale),
    getPostsData(locale),
  ])
  const d = destinations.find((o) => o.slug === slug)
  if (!d) notFound()

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Destinations'), href: '/destinations' },
    { label: d.name },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: `/destinations/${slug}`,
          locale,
          name: copy(d.name),
          crumbs,
          about: destinationSchema(d, `/destinations/${slug}`, locale),
        })}
      />
      <PageHero
        eyebrow={copy('{v0} · {v1}', { v0: d.tag, v1: d.region })}
        title={copy(d.name)}
        lede={copy(d.intro)}
        image={d.image}
        imageAlt={copy('{v0}, Ethiopia', { v0: d.name })}
        crumbs={crumbs}
        meta={[
          { label: copy('Best Time'), value: d.bestTime },
          { label: copy('Suggested Stay'), value: d.duration },
          { label: copy('Altitude'), value: d.altitude },
          { label: copy('Region'), value: d.region },
        ].filter((m) => m.value)}
      />

      {/* Essay + highlights, with the planning card pinned alongside */}
      <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 lg:py-28 xl:grid-cols-[1fr_380px] xl:gap-x-20">
        <DestinationOverview destination={d} />

        <DestinationBooking destination={d} />

        {d.highlights.length > 0 && <DestinationHighlights destination={d} />}

        {/* Related tours, in the left column so the card stays pinned */}
        <DestinationTours destination={d} tours={tours} />
      </section>

      <DestinationRegion destination={d} destinations={destinations} />

      {/* Enquiry */}
      <DestinationArticles destination={d} posts={posts} />

      <DestinationEnquiry destination={d} destinations={destinations} />

      <CtaBand
        title={copy('Speak to someone who has been there this season')}
        text={copy(
          'Our guides travel these routes all year. Ask about road conditions, festival dates or the best time to visit. You will get a straight answer.',
        )}
        secondary={{ label: copy('All Destinations'), href: '/destinations' }}
        image={d.image}
      />
    </>
  )
}
