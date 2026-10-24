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
import { hasPrice } from '@/features/tours/lib/format'
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
// ISR: admin edits surface within an hour (deliberate deviation from the
// statically frozen tours pages — the catalog is now API-backed).
export const revalidate = 3600

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
    { label: copy('Layover') },
  ]

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: '/layover',
          locale,
          name: copy('Six hours in Addis is not a waiting room'),
          crumbs,
        })}
      />
      <PageHero
        eyebrow={copy('Addis Layover Tours')}
        title={copy('Six hours in Addis is not a waiting room')}
        lede={copy(
          'Ethiopian Airlines connects half of Africa through Bole. If your connection is long enough for coffee, it is long enough for a private city loop: met at the gate, back at check-in with time to spare.',
        )}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792854897/layove.jpg"
        imageAlt={copy(
          'An Ethiopian Airlines plane over the runway, with the airport terminal behind',
        )}
        crumbs={crumbs}
        meta={[
          { label: copy('Packages'), value: String(packageCount) },
          { label: copy('Shortest'), value: shortest },
          { label: hasPrice(from) ? copy('From') : copy('Price'), value: from },
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
        title={copy('Long stopover? Go north instead.')}
        text={copy(
          'With two nights you can fly to Lalibela, see the rock churches at dawn and be back at Bole for your onward leg. It is the best 48 hours in the country.',
        )}
        primary={{ label: copy('Plan a Stopover'), href: '/contact' }}
        secondary={{ label: copy('See Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-medhane-alem.jpg"
      />
    </>
  )
}
