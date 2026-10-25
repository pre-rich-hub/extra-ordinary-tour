import { useCopy } from '@/i18n/copy'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { DestinationInfoCard } from '@/features/destinations/components/destination-card'
import type { Destination } from '@/features/destinations/types'

// One highlight per region, in the order most first journeys follow.
export const majorDestinationSlugs = [
  'lalibela',
  'axum',
  'gondar',
  'simien-mountains',
  'bahir-dar-lake-tana',
  'danakil-depression',
  'omo-valley',
  'bale-mountains',
  'harar',
]

export function MajorDestinations({
  destinations,
}: {
  destinations: Destination[]
}) {
  const copy = useCopy()

  return (
    <section
      id="destinations"
      className="scroll-mt-36 bg-muted/40 py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={copy('Where to go')}
          title={copy('Major travel destinations')}
          lede={copy(
            'From the historic north to the deep south, these are the places that shape most first journeys through Ethiopia.',
          )}
          action={{ href: '/destinations', label: copy('All destinations') }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 80}>
              <DestinationInfoCard destination={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
