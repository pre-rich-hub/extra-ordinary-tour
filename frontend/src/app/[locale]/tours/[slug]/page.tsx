import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata, socialImage } from '@/i18n/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph, tripSchema } from '@/lib/seo/schema'
import { getTourData, getToursData } from '@/features/tours/server/catalog'
import { getDestinationsData } from '@/features/destinations/server/catalog'
import { hasPrice, priceShort } from '@/features/tours/lib/format'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { TourOverview } from '@/features/tours/components/tour-overview'
import { TourBooking } from '@/features/tours/components/tour-booking'
import { TourItinerary } from '@/features/tours/components/tour-itinerary'
import { TourInclusions } from '@/features/tours/components/tour-inclusions'
import { TourEnquiry } from '@/features/tours/components/tour-enquiry'
import { TourFaq } from '@/features/tours/components/tour-faq'
import { ReviewHighlights } from '@/features/reviews/components/review-highlights'
import { RelatedTours } from '@/features/tours/components/related-tours'

// Tour pages overlay live prices and featured flags from the admin API.
// Pre-generating every slug would create one ISR function per path on Vercel
// (220 paths across four locales). Returning an empty param list keeps one
// on-demand ISR function for the whole route: the first request renders a
// slug, then the CDN serves it for an hour before revalidating.
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
  const t = await getTourData(slug, locale)
  if (!t) notFound()
  return buildPageMetadata(
    {
      title: t.title,
      description: t.summary,
      openGraph: { images: [socialImage(t.image, t.title)] },
    },
    `/tours/${slug}`,
    locale,
  )
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const [t, tours, destinations] = await Promise.all([
    getTourData(slug, locale),
    getToursData(locale),
    getDestinationsData(locale),
  ])
  if (!t) notFound()

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Tours'), href: '/tours' },
    { label: t.title },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: `/tours/${slug}`,
          locale,
          name: copy(t.title),
          crumbs,
          about: tripSchema(t, `/tours/${slug}`, locale),
        })}
      />
      <PageHero
        eyebrow={copy(t.style)}
        title={copy(t.title)}
        lede={copy(t.teaser)}
        image={t.image}
        imageAlt={copy(t.title)}
        crumbs={crumbs}
        meta={[
          { label: copy('Duration'), value: t.days },
          { label: copy('Season'), value: t.season },
          { label: copy('Group Size'), value: t.group },
          {
            label: hasPrice(t.from) ? copy('Starting from') : copy('Price'),
            value: hasPrice(t.from)
              ? priceShort(t.from)
              : copy('Designed Around You'),
          },
        ].filter((m) => m.value)}
      />

      {/* Overview + itinerary, with the pricing card pinned alongside */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[1fr_380px] xl:gap-x-20 lg:py-28">
        <TourOverview tour={t} destinations={destinations} />

        <TourBooking tour={t} />

        {/* Itinerary */}
        {t.itinerary.length > 0 && <TourItinerary tour={t} />}
      </section>

      {/* Includes / excludes */}
      <TourInclusions tour={t} />

      {/* Questions answered from this tour's data */}
      {t.itinerary.length > 0 && <TourFaq tour={t} />}

      {/* Reviews */}
      <ReviewHighlights />

      {/* Enquire */}
      <TourEnquiry tour={t} />

      {/* Other journeys */}
      <RelatedTours tour={t} tours={tours} destinations={destinations} />

      <CtaBand
        title={copy('Questions before you enquire?')}
        text={copy(
          'Altitude, road time, how hard the walking really is, whether the children will cope. Ask us anything. Our team will answer honestly.',
        )}
        secondary={{ label: copy('Layover Tours'), href: '/layover' }}
        image={t.image}
      />
    </>
  )
}
