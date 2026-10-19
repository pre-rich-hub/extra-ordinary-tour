'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Tour } from '@/types'
import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'
import { cn, hasPrice } from '@/lib/utils'

const ALL = 'All'
const MAX_CARDS = 6

// Featured tours as filterable, information-rich cards: trip type, length,
// group size, a short description and price at a glance.
export function TourIndex({ tours }: { tours: Tour[] }) {
  const [filter, setFilter] = useState(ALL)

  // Tabs come from the travel styles the featured tours actually cover.
  const styles = useMemo(() => {
    const seen = new Set<string>()
    tours.forEach((t) => t.style.split(' · ').forEach((s) => seen.add(s)))
    return [ALL, ...seen]
  }, [tours])

  const shown = (
    filter === ALL ? tours : tours.filter((t) => t.style.split(' · ').includes(filter))
  ).slice(0, MAX_CARDS)

  return (
    <div className="shell">
      {/* Heading, with the intro and the way to every tour alongside */}
      <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow mb-5 text-muted-foreground">Featured Tours</p>
          <h2
            id="tours-title"
            className="text-balance font-serif text-5xl font-light italic leading-[0.98] text-accent sm:text-6xl lg:text-[4.25rem]"
          >
            Popular tours, shaped around you
          </h2>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-[44ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            Not fixed packages but starting points. Every itinerary is reshaped
            around your pace, your interests and the journey you imagined.
          </p>
          <TextLink href="/tours" className="mt-5">
            View all tours
          </TextLink>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={80} className="mt-12 border-b border-border sm:mt-14">
        <div
          role="tablist"
          aria-label="Filter tours by style"
          className="-mb-px flex flex-wrap gap-x-7 gap-y-2"
        >
          {styles.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={s === filter}
              onClick={() => setFilter(s)}
              className={cn(
                'shrink-0 whitespace-nowrap border-b pb-3 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                s === filter
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground/75 hover:text-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Up to six cards: one column on phones, two on tablets, three on desktop */}
      <Reveal delay={160}>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <TourCard key={`${filter}-${t.slug}`} tour={t} />
          ))}
        </div>
      </Reveal>
    </div>
  )
}

function TourCard({ tour: t }: { tour: Tour }) {
  return (
    <article className="animate-in fade-in duration-500">
      <Link
        href={`/tours/${t.slug}`}
        className="group flex h-full flex-col border border-border bg-card transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_oklch(0.215_0.012_55/0.45)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={t.image}
            alt={t.title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 84vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute left-4 top-4 flex gap-1.5">
            <span className="bg-card/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
              {t.style.split(' · ')[0]}
            </span>
            {t.nights === 0 && (
              <span className="bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                Day trip
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-balance font-serif text-[1.65rem] leading-[1.1] text-foreground transition-colors duration-300 group-hover:text-primary">
            {t.title}
          </h3>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/80">
            {t.days} · {t.group}
          </p>
          <p className="mt-4 text-pretty text-[14px] leading-relaxed text-muted-foreground line-clamp-3">
            {t.teaser}
          </p>
          <p className="mt-auto pt-5 text-[13px] text-muted-foreground">
            Best season: <span className="text-foreground">{t.season}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
          <p className="whitespace-nowrap font-serif text-base italic text-foreground sm:text-lg">
            {hasPrice(t.from) ? (
              <>
                From <span className="not-italic">{t.from.replace(/ per person$/, '')}</span>
              </>
            ) : (
              'Price on request'
            )}
          </p>
          <span className="shrink-0 border border-accent px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
            View Journey
          </span>
        </div>
      </Link>
    </article>
  )
}
