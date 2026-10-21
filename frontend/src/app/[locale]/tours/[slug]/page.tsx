import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata, socialImage } from '@/i18n/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { tours } from '@/features/tours/data/tours'
import { getTour } from '@/features/tours/data/localized'
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
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const t = getTour(slug, locale)
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
  const t = await getTourData(slug, locale)
  if (!t) notFound()

  return (
    <>
      <PageHero
        eyebrow={copy(t.style)}
        title={copy(t.title)}
        lede={copy(t.teaser)}
        image={t.image}
        imageAlt={copy(t.title)}
        crumbs={[
          { label: copy('Home'), href: '/' },
          { label: copy('Tours'), href: '/tours' },
          { label: t.title },
        ]}
        meta={[
          { label: copy('Duration'), value: t.days },
          { label: copy('Season'), value: t.season },
          { label: copy('Group Size'), value: t.group },
          {
            label: hasPrice(t.from) ? copy('From') : copy('Price'),
            value: priceShort(t.from),
          },
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

export const revalidate = 3600
