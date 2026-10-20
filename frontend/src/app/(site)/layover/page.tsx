import type { Metadata } from 'next'
import { getLayoverPackagesData } from '@/features/layover/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { hasPrice } from '@/features/tours/lib/format'
import { LayoverPackages } from '@/features/layover/components/layover-packages'
import { LayoverAssurances } from '@/features/layover/components/layover-assurances'
import { LayoverEnquiry } from '@/features/layover/components/layover-enquiry'

export const metadata: Metadata = {
  title: 'Addis Ababa Layover Tours',
  description:
    'Private 6, 12, 24 and 48-hour layover tours from Bole International. Met at the gate, visa on arrival, back at check-in with time to spare.',
}
// ISR: admin edits surface within an hour (deliberate deviation from the
// statically frozen tours pages — the catalog is now API-backed).
export const revalidate = 3600

export default async function LayoverPage() {
  const packages = await getLayoverPackagesData()
  const packageCount = packages.length
  const shortest = packages[0]?.hours ?? '6 Hours'
  const from = packages[0]?.price ?? 'On request'

  return (
    <>
      <PageHero
        eyebrow="Addis Layover Tours"
        title="Six hours in Addis is not a waiting room"
        lede="Ethiopian Airlines connects half of Africa through Bole. If your connection is long enough for coffee, it is long enough for a private city loop: met at the gate, back at check-in with time to spare."
        image="/images/addis-skyline.jpg"
        imageAlt="The Addis Ababa skyline at dusk seen from the Entoto hills"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Layover' }]}
        meta={[
          { label: 'Packages', value: String(packageCount) },
          { label: 'Shortest', value: shortest },
          { label: hasPrice(from) ? 'From' : 'Price', value: from },
          { label: 'Airport', value: 'Bole (ADD)' },
        ]}
      />

      {/* Packages */}
      <LayoverPackages packages={packages} />

      {/* Assurances */}
      <LayoverAssurances />

      {/* Enquiry */}
      <LayoverEnquiry />

      <CtaBand
        title="Long stopover? Go north instead."
        text="With two nights you can fly to Lalibela, see the rock churches at dawn and be back at Bole for your onward leg. It is the best 48 hours in the country."
        primary={{ label: 'Plan a Stopover', href: '/contact' }}
        secondary={{ label: 'See Tours', href: '/tours' }}
        image="/images/lalibela-medhane-alem.jpg"
      />
    </>
  )
}
