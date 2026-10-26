import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { getToursData } from '@/features/tours/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { ToursGrid } from '@/features/tours/components/tours-grid'
import { toCardData } from '@/features/tours/types'
import { CtaBand } from '@/components/layout/cta-band'
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
      title: copy('Ethiopia Tour Packages & Private Journeys'),
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

  const crumbs = [{ label: copy('Home'), href: '/' }, { label: copy('Tours') }]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/tours',
          locale,
          type: 'CollectionPage',
          name: copy('Every way to experience Ethiopia'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Tours & Journeys')}
        title={copy('Every way to experience Ethiopia')}
        lede={copy(
          'From day trips out of Addis Ababa to three-week expeditions, choose a package as it stands or let us adapt it to your dates, interests and budget.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/lalibela-bete-giyorgis-trench.jpg"
        imageAlt={copy(
          'Bete Giyorgis, the rock-hewn Church of St George in Lalibela, standing in the trench carved around it',
        )}
        crumbs={crumbs}
        meta={[
          { label: copy('Journeys'), value: String(tours.length) },
          { label: copy('Length'), value: copy('1 to 19 Days') },
          { label: copy('Group Size'), value: copy('Solo to Groups') },
          { label: copy('Guiding'), value: copy('Private & Group') },
        ]}
      />

      {/* All journeys */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('The Collection')}
          title={copy('Every journey we run')}
          aside={copy(
            'Browse by category, from day trips and coffee tours to the Danakil Depression and the Omo Valley. Any of these journeys can be lengthened, shortened or combined.',
          )}
        />
        <ToursGrid tours={tours.map(toCardData)} />
      </section>

      {/* Create your own */}
      <CtaBand
        title={copy('Or create your own journey')}
        text={copy(
          'Many of our guests combine several tours to experience more of Ethiopia in one trip. Tell us what interests you and our team will design a personalized itinerary around your travel dates, pace and preferences.',
        )}
        secondary={{ label: copy('See Destinations'), href: '/destinations' }}
      />

      {/* Promises */}
      <JourneyPromises />
    </>
  )
}

export const revalidate = 3600
