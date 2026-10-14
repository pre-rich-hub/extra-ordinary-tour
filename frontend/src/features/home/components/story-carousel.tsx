'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { tours as staticTours } from '@/content'
import type { Tour } from '@/types'
import { cn } from '@/lib/utils'

// The list is rendered three times so the track can loop endlessly: we keep
// the scroll position inside the middle copy and silently jump by one copy's
// width whenever the visitor drifts into the first or last.
const COPIES = 3

export function StoryCarousel({ tours = staticTours }: { tours?: Tour[] }) {
  const track = useRef<HTMLDivElement>(null)

  const copyWidth = () => (track.current ? track.current.scrollWidth / COPIES : 0)

  const recenter = useCallback(() => {
    const el = track.current
    if (!el) return
    const w = copyWidth()
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w
    else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    // Start on the middle copy, with its first card centred.
    const first = el.children[tours.length] as HTMLElement | undefined
    if (first) {
      el.scrollLeft = first.offsetLeft - (el.clientWidth - first.offsetWidth) / 2
    }

    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(recenter, 140)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', onScroll)
    }
  }, [recenter, tours.length])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.children[0] as HTMLElement | undefined
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  const slides = Array.from({ length: COPIES }, (_, copy) =>
    tours.map((t, i) => ({ tour: t, copy, index: i })),
  ).flat()

  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <Reveal className="shell mb-12 text-center sm:mb-16">
        <p className="eyebrow mb-5 justify-center text-accent">
          Signature Journeys
        </p>
        <h2
          id="stories-title"
          className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
        >
          Your journey, <em className="font-serif italic">your story</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          History, culture, trekking, wildlife, festivals and coffee — wherever
          Ethiopia calls you, our local team brings honest advice and
          first-hand knowledge to every chapter of the journey.
        </p>
      </Reveal>

      <Reveal delay={120} className="relative">
        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Signature journeys"
          className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map(({ tour: t, copy, index }) => {
            const clone = copy !== 1
            return (
              <Link
                key={`${copy}-${t.slug}`}
                href={`/tours/${t.slug}`}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                className={cn(
                  'group relative block aspect-[4/3] w-[78vw] shrink-0 snap-center overflow-hidden rounded-sm bg-muted touch-manipulation transition-transform duration-300 active:scale-[0.96] active:duration-100 sm:w-[46vw] md:w-[38vw] lg:w-[27vw] lg:max-w-[400px]',
                  index % 2 === 0 && 'md:mt-[72px]',
                )}
              >
                <Image
                  src={t.image || '/placeholder.svg'}
                  alt={clone ? '' : t.title}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 768px) 46vw, (max-width: 1024px) 38vw, 27vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t.days} · {t.style}
                  </p>
                  <h3 className="flex items-start gap-2 font-sans text-[15px] font-medium leading-snug text-background sm:text-base">
                    <MapPin className="mt-[3px] h-3.5 w-3.5 shrink-0 fill-background/90 stroke-charcoal/40" />
                    {t.title}
                  </h3>
                  <div className="grid grid-rows-[1fr] transition-all duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="inline-flex items-center gap-1.5 pl-[22px] pt-1.5 text-[13px] text-background/85">
                        View trip
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <CarouselArrow side="left" onClick={() => step(-1)} />
        <CarouselArrow side="right" onClick={() => step(1)} />
      </Reveal>
    </section>
  )
}

function CarouselArrow({
  side,
  onClick,
}: {
  side: 'left' | 'right'
  onClick: () => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous journey' : 'Next journey'}
      className={cn(
        'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-[0_6px_24px_-8px_oklch(0.185_0.012_58/0.35)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex',
        side === 'left' ? 'left-4 lg:left-6' : 'right-4 lg:right-6',
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  )
}
