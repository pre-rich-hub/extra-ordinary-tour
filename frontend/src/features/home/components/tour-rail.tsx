'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Tour } from '@/types'
import { useScrollEdges } from '@/hooks/use-scroll-edges'
import { cn, hasPrice, priceShort } from '@/lib/utils'

// Left inset that lines the first item up with the 1280px page shell, while
// still letting the rail bleed off both edges of the viewport.
const INSET =
  'pl-5 pr-5 sm:pl-6 sm:pr-6 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-10'
const SCROLL_PAD =
  'scroll-pl-5 sm:scroll-pl-6 lg:scroll-pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]'

const CARD = 'w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-[320px] lg:w-[340px]'

export function TourRail({ tours }: { tours: Tour[] }) {
  const { ref: track, edges } = useScrollEdges({ start: true, end: false }, 24)

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('[data-card]')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const perStep = window.matchMedia('(min-width: 1024px)').matches ? 2 : 1
    el.scrollBy({
      left: dir * (card.offsetWidth + gap) * perStep,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="relative">
      {/* Phones and tablets: heading sits above the rail */}
      <div className="shell mb-8 sm:mb-10 lg:hidden">
        <p className="eyebrow mb-4 text-accent">Featured Tours</p>
        <h2 className="text-balance text-[2rem] leading-[1.05] text-secondary-foreground sm:text-5xl">
          Popular tours, <em className="italic text-accent">shaped around you</em>
        </h2>
        <p className="mt-3 text-pretty font-serif text-base italic leading-relaxed text-secondary-foreground/65 sm:text-lg">
          Every package can be adjusted to your dates, pace and budget.
        </p>
      </div>

      <div
        ref={track}
        role="region"
        aria-label="Featured tours"
        className={cn(
          'flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden',
          INSET,
          SCROLL_PAD,
        )}
      >
        {/* Intro panel travels with the cards, as the first item in the rail */}
        <div className="hidden w-[340px] shrink-0 snap-start flex-col justify-center pr-10 lg:flex">
          <p className="eyebrow mb-6 text-accent">
            Featured Tours
          </p>
          <h2
            id="tours-title"
            className="text-balance text-4xl leading-[1.05] text-secondary-foreground sm:text-5xl"
          >
            Popular tours, <em className="italic text-accent">shaped around you</em>
          </h2>
          <p className="mt-6 text-pretty font-serif text-lg italic leading-relaxed text-secondary-foreground/65">
            A starting point for conversation — every itinerary is reshaped
            around your pace, your interests, and the journey you imagined.
          </p>
        </div>

        {tours.map((t) => (
          <TourPanel key={t.slug} tour={t} />
        ))}

        <CustomPanel />

        {/* "View all" sits at the very end of the rail */}
        <div className="flex shrink-0 snap-end items-center pl-2 pr-4 lg:pl-4">
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 whitespace-nowrap border border-secondary-foreground/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Floating arrows over the rail edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-6 lg:flex">
        <RailButton
          side="left"
          disabled={edges.start}
          onClick={() => step(-1)}
          className={cn('pointer-events-auto transition-opacity', edges.start && 'invisible')}
        />
        <RailButton
          side="right"
          disabled={edges.end}
          onClick={() => step(1)}
          className={cn('pointer-events-auto transition-opacity', edges.end && 'invisible')}
        />
      </div>

      {/* Phones and tablets: arrows beneath the rail */}
      <div className="shell mt-6 flex gap-3 lg:hidden">
        <RailButton side="left" disabled={edges.start} onClick={() => step(-1)} />
        <RailButton side="right" disabled={edges.end} onClick={() => step(1)} />
      </div>
    </div>
  )
}

function TourPanel({ tour: t }: { tour: Tour }) {
  const kind = t.style.split(' · ')[0]
  const price = priceShort(t.from)

  return (
    <Link
      href={`/tours/${t.slug}`}
      data-card
      className={cn(
        CARD,
        'group relative block aspect-[9/16] overflow-hidden rounded-sm bg-charcoal touch-manipulation transition-transform duration-300 active:scale-[0.96] active:duration-100 shadow-[0_40px_70px_-40px_black] sm:aspect-[10/17]',
      )}
    >
      <Image
        src={t.image || '/placeholder.svg'}
        alt={t.title}
        fill
        sizes="(max-width: 640px) 78vw, 340px"
        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 via-50% to-charcoal/30" />

      <span className="absolute right-5 top-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-background text-shadow-soft">
        {t.nights ? `${t.nights} Nights` : 'Day Trip'}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
          {kind} · {t.season}
        </p>
        <h3 className="mt-2.5 text-balance font-serif text-[1.75rem] leading-[1.08] text-background">
          {t.title}
        </h3>

        {/* Teaser and price open on hover or keyboard focus */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 text-pretty text-[13px] leading-relaxed text-background/75 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {t.teaser}
            </p>
            <p className="pt-2 font-serif text-[15px] italic text-sand/80">
              {hasPrice(t.from) ? `From ${price} per person` : 'Price on request'}
            </p>
          </div>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 border border-background/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-background transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          Explore Trip
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function CustomPanel() {
  return (
    <Link
      href="#plan"
      className={cn(
        CARD,
        'group relative flex aspect-[9/16] flex-col justify-center overflow-hidden rounded-sm bg-charcoal p-7 shadow-[0_40px_70px_-40px_black] sm:aspect-[10/17]',
      )}
    >
      <Image
        src="/images/simien-landscape.jpg"
        alt=""
        fill
        sizes="340px"
        className="object-cover opacity-70 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-charcoal/50 to-charcoal/90" />
      <span className="absolute right-5 top-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-background text-shadow-soft">
        Custom trips
      </span>
      <div className="relative">
        <span className="mb-6 block h-px w-12 bg-accent" />
        <h3 className="font-serif text-[2.1rem] leading-[1.05] text-background">
          Create your own <em className="italic text-accent">itinerary</em>
        </h3>
        <p className="mt-4 max-w-[28ch] text-pretty text-sm leading-relaxed text-background/75">
          Tell us how you like to travel and our team will design a journey
          from scratch — replies within 24 hours.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 bg-accent px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-foreground transition-all duration-300 group-hover:bg-sand">
          Create Trip
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function RailButton({
  side,
  disabled,
  onClick,
  className,
}: {
  side: 'left' | 'right'
  disabled: boolean
  onClick: () => void
  className?: string
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? 'Previous tours' : 'Next tours'}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full border border-secondary-foreground/25 bg-charcoal/55 text-secondary-foreground backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:cursor-default disabled:opacity-30 disabled:hover:border-secondary-foreground/25 disabled:hover:bg-charcoal/55 disabled:hover:text-secondary-foreground',
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  )
}
