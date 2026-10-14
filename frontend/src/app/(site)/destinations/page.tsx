import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { DestinationInfoCard } from '@/features/destinations/components/destination-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/layout/cta-band'
import { destinations } from '@/content'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Ethiopia destinations: Lalibela, Gondar, Axum, the Simien and Bale Mountains, the Danakil Depression, Harar, the Omo Valley and its peoples, Addis Ababa and the country’s great festivals.',
}

const regions = Array.from(new Set(destinations.map((d) => d.region)))

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
          { label: 'Altitude Range', value: '-116 – 4,550 m' },
          { label: 'Best Months', value: 'Oct – Mar' },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Map"
          title="Regions, peoples and festivals"
          aside="Most itineraries combine several of these. Tell us which ones pull at you and we will plan the route between them."
        />

        <Reveal className="mb-12 flex flex-wrap gap-2 sm:mb-16">
          {regions.map((r) => (
            <span
              key={r}
              className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
            >
              {r}
            </span>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90} className="h-full">
              <DestinationInfoCard destination={d} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where to begin?"
        text="Send us a sentence about the trip you have in mind — the season, the pace, what draws you to Ethiopia — and our team will come back with two or three routes worth considering."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/simien-gelada.jpg"
      />
    </>
  )
}
