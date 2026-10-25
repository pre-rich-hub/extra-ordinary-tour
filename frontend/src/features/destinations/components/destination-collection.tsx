import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Reveal } from '@/components/ui/reveal'
import { SectionNav } from '@/components/ui/section-nav'
import { DestinationInfoCard } from './destination-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { getDestinations } from '../data/localized'
import { destinationRegions } from '../data/regions'

export function DestinationCollection() {
  const copy = useCopy()

  const destinations = getDestinations(useLocale() as AppLocale)

  // One section per region, in the client's order; labels come from the
  // destinations themselves so they follow the page language.
  const groups = destinationRegions
    .map((r) => {
      const items = destinations.filter((d) => d.regionKey === r.label)
      return { id: r.id, label: items[0]?.region ?? r.label, items }
    })
    .filter((g) => g.items.length)

  return (
    <>
      <section className="shell pb-6 pt-16 sm:pt-20 lg:pt-28">
        <SectionHeading
          eyebrow={copy('The Map')}
          title={copy('Regions, peoples and festivals')}
          aside={copy(
            'Most itineraries combine several of these. Tell us which ones pull at you and we will plan the route between them.',
          )}
        />
      </section>

      <SectionNav items={groups.map(({ id, label }) => ({ id, label }))} />

      <div className="shell pb-16 sm:pb-20 lg:pb-28">
        {groups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className="scroll-mt-32 pt-14 sm:pt-16 lg:pt-20"
          >
            <Reveal className="mb-8 flex items-baseline justify-between gap-6 border-b border-border pb-4 sm:mb-10">
              <h2
                id={`${g.id}-title`}
                className="text-balance font-serif text-2xl text-foreground sm:text-3xl lg:text-4xl"
              >
                {g.label}
              </h2>
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {copy('{v0} destinations', { v0: g.items.length })}
              </span>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {g.items.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 3) * 90} className="h-full">
                  <DestinationInfoCard destination={d} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
