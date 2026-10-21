import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

/** The next few destinations in the same region, in catalogue order. */
export function DestinationRegion({
  destination: d,
  destinations,
}: {
  destination: Destination
  destinations: Destination[]
}) {
  const copy = useCopy()

  const region = destinations.filter((o) => o.regionKey === d.regionKey)
  const at = region.findIndex((o) => o.slug === d.slug)
  const nearby = [...region.slice(at + 1), ...region.slice(0, at)].slice(0, 6)
  if (!nearby.length) return null
  return (
    <section className="shell pb-16 sm:pb-20 lg:pb-24">
      <Reveal className="border-t border-border pt-12">
        <h2 className="eyebrow font-sans text-accent">
          {copy('More in {v0}', { v0: d.region })}
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {nearby.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/destinations/${o.slug}`}
                className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:text-[11px]"
              >
                <MapPin className="h-3 w-3 text-accent" />
                {copy(o.name)}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
