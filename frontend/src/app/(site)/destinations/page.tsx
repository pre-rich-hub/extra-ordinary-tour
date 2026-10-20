import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { destinations } from '@/features/destinations/data/destinations'
import { DestinationCollection } from '@/features/destinations/components/destination-collection'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Ethiopia destinations: Lalibela, Gondar, Axum, the Simien and Bale Mountains, the Danakil Depression, Harar, the Omo Valley and its peoples, Addis Ababa and the country’s great festivals.',
}

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Travel"
        title="Discover the Land of Origins"
        lede="Rock-hewn churches and royal castles, Afro-alpine plateaus, a lava lake below sea level, the peoples of the Omo Valley and festivals found nowhere else."
        image="/images/gondar-fasil.jpg"
        imageAlt="The castle of Fasilides in the royal enclosure of Gondar"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        meta={[
          { label: 'Destinations', value: String(destinations.length) },
          { label: 'UNESCO Sites', value: '12' },
          { label: 'Altitude Range', value: '-116 to 4,550 m' },
          { label: 'Best Months', value: 'Oct to Mar' },
        ]}
      />

      <DestinationCollection />

      <CtaBand
        title="Not sure where to begin?"
        text="Send us a sentence about the trip you have in mind (the season, the pace, what draws you to Ethiopia) and our team will come back with two or three routes worth considering."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/simien-gelada.jpg"
      />
    </>
  )
}
