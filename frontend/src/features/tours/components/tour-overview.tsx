import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { Check, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { placeDestinations } from '@/features/destinations/data/relations'
import type { Destination } from '@/features/destinations/types'
import type { Tour } from '../types'

const chip =
  'inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]'

export function TourOverview({
  tour: t,
  destinations,
}: {
  tour: Tour
  destinations: Destination[]
}) {
  const copy = useCopy()
  // Places with a destination guide link to it; the rest stay plain labels.
  const guides = placeDestinations(t, destinations)

  return (
    <Reveal className="lg:col-start-1 lg:row-start-1">
      <p className="eyebrow mb-5 text-accent">{copy('The Journey')}</p>
      <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
        {t.nights
          ? copy('{v0} nights, designed around the hours that matter', {
              v0: t.nights,
            })
          : copy('One full day, designed around the hours that matter')}
      </h2>
      <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {copy(t.summary)}
      </p>

      {t.highlights?.length ? (
        <div className="mt-10">
          <p className="eyebrow mb-5 text-primary">{copy('Highlights')}</p>
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-x-10">
            {t.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10">
        <p className="eyebrow mb-5 text-primary">{copy('Places')}</p>
        <ul className="flex flex-wrap gap-2">
          {t.places.map((p, i) => (
            <li key={p}>
              {guides[i] ? (
                <Link
                  href={`/destinations/${guides[i]}`}
                  className={`${chip} transition-colors hover:border-primary/40 hover:text-primary`}
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  {copy(p)}
                </Link>
              ) : (
                <span className={chip}>
                  <MapPin className="h-3 w-3 text-accent" />
                  {copy(p)}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
