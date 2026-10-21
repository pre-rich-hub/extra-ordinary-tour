import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getToursData } from '@/features/tours/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { ToursGrid } from '@/features/tours/components/tours-grid'
import { CtaBand } from '@/components/layout/cta-band'
import { FeaturedJourney } from '@/features/tours/components/featured-journey'
import { JourneyPromises } from '@/features/tours/components/journey-promises'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  return buildPageMetadata(
    {
      title: copy('Tours & Journeys'),
      description: copy(
        'Ethiopia tour packages from Extraordinary Ethiopia Tours: historical and heritage tours, the Omo Valley, Danakil Depression, Simien and Bale trekking, wildlife safaris, birding, coffee, festivals and Addis Ababa day trips.',
      ),
    },
    '/tours',
    locale,
  )
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const tours = await getToursData(locale)

  return (
    <>
      <PageHero
        eyebrow={copy('Tours & Journeys')}
        title={copy('Every way to experience Ethiopia')}
        lede={copy(
          'From day trips out of Addis Ababa to three-week expeditions, choose a package as it stands or let us adapt it to your dates, interests and budget.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-landscape.jpg"
        imageAlt={copy(
          'Basalt pinnacles of the Simien Mountains rising above the clouds',
        )}
        crumbs={[{ label: copy('Home'), href: '/' }, { label: copy('Tours') }]}
        meta={[
          { label: copy('Journeys'), value: String(tours.length) },
          { label: copy('Length'), value: copy('1 to 17 Days') },
          { label: copy('Group Size'), value: copy('Solo to Groups') },
          { label: copy('Guiding'), value: copy('Private & Group') },
        ]}
      />

      {/* Featured journey */}
      <FeaturedJourney tours={tours} />

      {/* All journeys */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('The Collection')}
          title={copy('Every journey we run')}
          aside={copy(
            'Filter by the kind of travelling you want to do: historical, cultural, festival, coffee, wildlife, trekking, birding, Danakil or day trips. Any of these can be lengthened, shortened or combined.',
          )}
        />
        <ToursGrid tours={tours} />
      </section>

      {/* Promises */}
      <JourneyPromises />

      <CtaBand
        title={copy('Or start with a blank page')}
        text={copy(
          'Many of our guests combine two of these tours. Describe the journey you have in mind and our team will design it around you.',
        )}
        secondary={{ label: copy('See Destinations'), href: '/destinations' }}
      />
    </>
  )
}

export const revalidate = 3600
