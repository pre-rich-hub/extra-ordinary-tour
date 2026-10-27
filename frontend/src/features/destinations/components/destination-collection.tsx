import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Reveal } from '@/components/ui/reveal'
import { SectionNav } from '@/components/ui/section-nav'
import { DestinationInfoCard } from './destination-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { getDestinations } from '../data/localized'
import { destinationRegions, regionMembers } from '../data/regions'

export function DestinationCollection() {
  const copy = useCopy()

  const destinations = getDestinations(useLocale() as AppLocale)

  // One section per region, in the client's order; labels come from the
  // destinations themselves so they follow the page language.
  const groups = destinationRegions
    .map((r) => {
      const members = regionMembers(r.label, destinations)
      const label =
        members.find((d) => d.regionKey === r.label)?.region ?? r.label
      // Cards name the group they are listed in, even for shared members.
      const items = members.map((d) => ({ ...d, region: label }))
      return { id: r.id, label, items }
    })
    .filter((g) => g.items.length)

  return (
    <>
      <section className="shell pb-6 pt-16 sm:pt-20 lg:pt-28">
        <SectionHeading
          eyebrow={copy('The Map')}
          title={copy('Explore Ethiopia’s regions, cultures & festivals')}
          aside={copy(
            'Many of our journeys combine several destinations and experiences. Tell us what interests you most, and we will design a route that brings them together into a journey tailored to you.',
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
