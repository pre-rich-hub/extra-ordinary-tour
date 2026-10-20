import { Reveal } from '@/components/ui/reveal'
import { DestinationInfoCard } from './destination-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { destinations } from '../data/destinations'

const regions = Array.from(new Set(destinations.map((d) => d.region)))

export function DestinationCollection() {
  return (
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
  )
}
