import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import type { Metadata } from 'next'
import { getLayoverPackagesData } from '@/features/layover/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { hasPrice, priceShort } from '@/features/tours/lib/format'
import { LayoverPackages } from '@/features/layover/components/layover-packages'
import { LayoverAssurances } from '@/features/layover/components/layover-assurances'
import { LayoverEnquiry } from '@/features/layover/components/layover-enquiry'

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
      title: copy('Addis Ababa Layover Tours'),
      description: copy(
        'Private 6, 12, 24 and 48-hour layover tours from Bole International. Met at the gate, visa on arrival, back at check-in with time to spare.',
      ),
    },
    '/layover',
    locale,
  )
}
// The catalog is API-backed and the admin is the source of truth. Render per
// request so a newly created package appears on the next page load.
export const dynamic = 'force-dynamic'

export default async function LayoverPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()

  const packages = await getLayoverPackagesData(locale)
  const packageCount = packages.length
  const shortest = packages[0]?.hours ?? copy('6 Hours')
  const from = packages[0]?.price ?? copy('On request')

  const crumbs = [
    { label: copy('Home'), href: '/' },
    { label: copy('Layover Tours') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/layover',
          locale,
          name: copy('Six hours in Addis is more than a stopover'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Addis Ababa Layover Tours')}
        title={copy('Six hours in Addis is more than a stopover')}
        lede={copy(
          "With Ethiopian Airlines connecting travellers across Africa and beyond, a long layover in Addis Ababa can become an opportunity to discover Ethiopia's capital. Enjoy a private city tour with airport pickup and drop-off, explore local landmarks, experience Ethiopian coffee culture and return to the airport with sufficient time for your onward flight.",
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792854897/layove.jpg"
        imageAlt={copy(
          'An Ethiopian Airlines plane over the runway, with the airport terminal behind',
        )}
        crumbs={crumbs}
        metaStyle="chips"
        meta={[
          { label: copy('Packages'), value: String(packageCount) },
          { label: copy('Shortest'), value: shortest },
          {
            label: hasPrice(from) ? copy('Starting from') : copy('Price'),
            value: hasPrice(from) ? priceShort(from) : from,
          },
          { label: copy('Airport'), value: copy('Bole (ADD)') },
        ]}
      />

      {/* Packages */}
      <LayoverPackages packages={packages} />

      {/* Assurances */}
      <LayoverAssurances />

      {/* Enquiry */}
      <LayoverEnquiry />

      <CtaBand
        title={copy('Long stopover? Discover Lalibela.')}
        text={copy(
          "With two nights in Ethiopia, you may have time to fly to Lalibela, explore its remarkable rock-hewn churches and experience the town's unique atmosphere before returning to Addis Ababa for your onward flight. We will help coordinate flights, accommodation and sightseeing around your schedule, subject to flight availability.",
        )}
        primary={{ label: copy('Plan a Stopover'), href: '/contact' }}
        secondary={{ label: copy('See Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-medhane-alem.jpg"
      />
    </>
  )
}
