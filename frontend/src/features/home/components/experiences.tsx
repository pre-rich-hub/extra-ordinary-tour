'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const experiences = [
  {
    kicker: 'Origins & ritual',
    title: 'Coffee Journeys',
    text: 'Trace the bean from the wild forests of Kaffa to the farms of Yirgacheffe, and share the ceremony with the families who grow it.',
    image: '/images/coffee-ceremony.jpg',
    href: '/tours/4-day-ethiopia-coffee',
  },
  {
    kicker: 'Fire & salt',
    title: 'Danakil Expeditions',
    text: 'Camp beneath desert stars, watch the glow of Erta Ale’s lava lake and walk among the sulphur springs of Dallol.',
    image: '/images/danakil-dallol.jpg',
    href: '/tours/3-day-afar-danakil-from-addis',
  },
  {
    kicker: 'People & culture',
    title: 'Omo Valley Encounters',
    text: 'Market days, village visits and ceremonies with the Hamar, Karo, Mursi and their neighbours, always respectfully, always with local guides.',
    image: '/images/karo.jpg',
    href: '/tours/6-day-omo-valley-tribal-and-cultural',
  },
  {
    kicker: 'Peaks & trails',
    title: 'Trekking & Wildlife',
    text: 'Walk the Simien escarpment among gelada troops, or search for the Ethiopian wolf on the Sanetti Plateau of the Bale Mountains.',
    image: '/images/simien-trek.jpg',
    href: '/tours/5-day-simien-mountains-trek',
  },
]

// The track holds two copies of the list so the slide that wraps from one end
// to the other always travels while hidden, never across the visible stage.
const slides = [...experiences, ...experiences]
const count = slides.length

// Where a slide sits for its distance from the active one. Every slot is
// absolutely positioned, so moving between them is a plain CSS transition.
const slots: Record<number, string> = {
  [-2]: 'left-[-20%] top-[10%] h-[80%] w-[6%] opacity-0 lg:w-[16%]',
  [-1]: 'left-0 top-[10%] h-[80%] w-[6%] cursor-pointer lg:left-[1.5%] lg:w-[16%]',
  0: 'left-[8%] top-0 h-full w-[84%] lg:left-[20%] lg:w-[60%]',
  1: 'left-[94%] top-[10%] h-[80%] w-[6%] cursor-pointer lg:left-[82.5%] lg:w-[16%]',
  2: 'left-[120%] top-[10%] h-[80%] w-[6%] opacity-0 lg:w-[16%]',
}
const hiddenSlot = 'left-[45%] top-[10%] h-[80%] w-[10%] opacity-0'

const AUTOPLAY_MS = 6000

export function Experiences() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (step: number) => setActive((a) => (a + step + count) % count),
    [],
  )

  // `active` is a dependency so a manual move restarts the countdown.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, go, active])

  const current = slides[active]

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-title"
      aria-roledescription="carousel"
      className="overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <Reveal className="shell mb-12 text-center sm:mb-16">
        <p className="eyebrow mb-5 justify-center text-accent">
          Signature Experiences
        </p>
        <h2
          id="experiences-title"
          className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
        >
          Moments <em className="italic">that stay with you</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          History, culture, adventure, wildlife and trekking. Combine them
          into one journey, designed around how you like to travel.
        </p>
        <Link
          href="/tours"
          className="mt-7 inline-block border-b border-foreground/70 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent sm:text-xs"
        >
          Explore Travel Styles
        </Link>
      </Reveal>

      <Reveal className="mx-auto max-w-[1600px]" delay={120}>
        <div
          className="relative aspect-[1.59] w-full lg:aspect-[2.96]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          }}
        >
          {slides.map((s, i) => {
            let offset = (i - active + count) % count
            if (offset > count / 2) offset -= count
            const isActive = offset === 0
            const isSide = Math.abs(offset) === 1
            return (
              <div
                key={`${s.title}-${i}`}
                aria-hidden={!isActive}
                onClick={isSide ? () => go(offset) : undefined}
                className={cn(
                  'absolute overflow-hidden bg-muted transition-all duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]',
                  slots[offset] ?? hiddenSlot,
                )}
              >
                <Image
                  src={s.image}
                  alt={isActive ? s.title : ''}
                  fill
                  sizes="(min-width: 1024px) 60vw, 84vw"
                  className={cn(
                    'object-cover transition-transform duration-[1400ms] ease-out',
                    isActive ? 'scale-100' : 'scale-110',
                  )}
                />
                {isActive && (
                  <Link
                    href={s.href}
                    className="absolute inset-0"
                    aria-label={`Discover ${s.title}`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Every caption shares one grid cell, so the block is always as tall
            as the longest one and the page below never jumps between slides. */}
        <div className="shell mt-8 grid text-center sm:mt-10" aria-live="polite">
          {experiences.map((e) => {
            const isCurrent = e === current
            return (
              <div
                key={e.title}
                aria-hidden={!isCurrent}
                className={cn(
                  '[grid-area:1/1] transition-[opacity,transform] duration-700 ease-out',
                  isCurrent
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none invisible translate-y-2 opacity-0',
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">
                  {e.kicker}
                </p>
                <h3 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                  {e.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {e.text}
                </p>
                <Link
                  href={e.href}
                  tabIndex={isCurrent ? undefined : -1}
                  className="group mt-5 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-foreground"
                >
                  Discover More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
