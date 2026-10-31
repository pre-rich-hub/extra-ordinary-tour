import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { getDestinationsData } from '@/features/destinations/server/catalog'
import { DestinationCollection } from '@/features/destinations/components/destination-collection'

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
      title: copy(
        'Ethiopia Destinations: Lalibela, Simien, Danakil & Omo Valley',
      ),
      description: copy(
        'Ethiopia destinations: Lalibela, Gondar, Axum, the Simien and Bale Mountains, the Danakil Depression, Harar, the Omo Valley and its peoples, Addis Ababa and the country’s great festivals.',
      ),
    },
    '/destinations',
    locale,
  )
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const destinations = await getDestinationsData(locale)

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Destinations') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/destinations',
          locale,
          type: 'CollectionPage',
          name: copy('Discover the Land of Origins'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Where We Travel')}
        title={copy('Discover the Land of Origins')}
        lede={copy(
          'From ancient rock-hewn churches and royal castles to Afro-alpine plateaus, volcanic landscapes, the rich cultural traditions of the Omo Valley and festivals rooted in centuries of history, Ethiopia offers extraordinary discoveries at every turn.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/gondar-fasil.jpg"
        imageAlt={copy(
          'The castle of Fasilides in the royal enclosure of Gondar',
        )}
        crumbs={crumbs}
        meta={[
          { label: copy('Destinations'), value: String(destinations.length) },
          { label: copy('UNESCO Sites'), value: '12' },
          { label: copy('Altitude Range'), value: copy('-116 to 4,550 m') },
          { label: copy('Best Months'), value: copy('Sep to Jul') },
        ]}
      />

      <DestinationCollection destinations={destinations} />

      <CtaBand
        title={copy('Not sure where to begin?')}
        text={copy(
          'Send us a sentence about the trip you have in mind (the season, the pace, what draws you to Ethiopia) and our team will come back with two or three routes worth considering.',
        )}
        secondary={{ label: copy('Browse Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-gelada.jpg"
      />
    </>
  )
}

export const revalidate = 3600
