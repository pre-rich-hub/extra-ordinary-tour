import type { Metadata } from 'next'
import { getToursData } from '@/features/tours/server/catalog'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeading } from '@/components/ui/section-heading'
import { ToursGrid } from '@/features/tours/components/tours-grid'
import { CtaBand } from '@/components/layout/cta-band'
import { FeaturedJourney } from '@/features/tours/components/featured-journey'
import { JourneyPromises } from '@/features/tours/components/journey-promises'

export const metadata: Metadata = {
  title: 'Tours & Journeys',
  description:
    'Ethiopia tour packages from Extraordinary Ethiopia Tours: historical and heritage tours, the Omo Valley, Danakil Depression, Simien and Bale trekking, wildlife safaris, birding, coffee, festivals and Addis Ababa day trips.',
}

export default async function ToursPage() {
  const tours = await getToursData()

  return (
    <>
      <PageHero
        eyebrow="Tours & Journeys"
        title="Every way to experience Ethiopia"
        lede="From day trips out of Addis Ababa to three-week expeditions, choose a package as it stands or let us adapt it to your dates, interests and budget."
        image="/images/simien-landscape.jpg"
        imageAlt="Basalt pinnacles of the Simien Mountains rising above the clouds"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Tours' }]}
        meta={[
          { label: 'Journeys', value: String(tours.length) },
          { label: 'Length', value: '1 to 17 Days' },
          { label: 'Group Size', value: 'Solo to Groups' },
          { label: 'Guiding', value: 'Private & Group' },
        ]}
      />

      {/* Featured journey */}
      <FeaturedJourney tours={tours} />

      {/* All journeys */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Every journey we run"
          aside="Filter by the kind of travelling you want to do: historical, cultural, festival, coffee, wildlife, trekking, birding, Danakil or day trips. Any of these can be lengthened, shortened or combined."
        />
        <ToursGrid tours={tours} />
      </section>

      {/* Promises */}
      <JourneyPromises />

      <CtaBand
        title="Or start with a blank page"
        text="Many of our guests combine two of these tours. Describe the journey you have in mind and our team will design it around you."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
      />
    </>
  )
}
