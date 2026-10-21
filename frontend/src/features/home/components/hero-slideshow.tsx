'use client'

import { useCopy } from '@/i18n/copy'

import { useEffect, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

// How long each photo holds, and how long the crossfade into the next takes.
const SLIDE_MS = 7000
const FADE_MS = 1800

// Each slide drifts along its own path so the sequence feels like camera moves.
const slides = [
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-giyorgis.jpg',
    alt: 'Bet Giyorgis (Church of St. George) in Lalibela, Ethiopia, a historic monolithic rock-hewn church',
    place: 'Bet Giyorgis, Lalibela',
    from: 'scale(1.12)',
    to: 'scale(1)',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-landscape.jpg',
    alt: 'Jagged peaks rising through the clouds in the Simien Mountains',
    place: 'Simien Mountains',
    from: 'scale(1.04) translate3d(-2%, 1%, 0)',
    to: 'scale(1.14) translate3d(1.5%, -1%, 0)',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg',
    alt: 'Green terraced valleys and mountains in the Lalibela highlands',
    place: 'Lalibela highlands',
    from: 'scale(1.14) translate3d(2%, 0, 0)',
    to: 'scale(1.03) translate3d(-1.5%, 0, 0)',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lake-tana.jpg',
    alt: 'Fishermen paddling papyrus boats on Lake Tana',
    place: 'Lake Tana',
    from: 'scale(1.03) translate3d(1.5%, 0, 0)',
    to: 'scale(1.12) translate3d(-2%, -1%, 0)',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/blue-nile-falls.jpg',
    alt: 'The Blue Nile Falls pouring into a rocky gorge',
    place: 'Blue Nile Falls',
    from: 'scale(1.14) translate3d(0, -1.5%, 0)',
    to: 'scale(1.02) translate3d(0, 1%, 0)',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/abune-yosef.jpg',
    alt: 'Mountain ridges fading into golden light at sunset',
    place: 'Abune Yosef',
    from: 'scale(1.03) translate3d(-1%, 1%, 0)',
    to: 'scale(1.13) translate3d(2%, 0, 0)',
  },
]

export function HeroSlideshow() {
  const copy = useCopy()

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  // Photos are mounted one ahead of when they appear, so only what's needed loads.
  const [mounted, setMounted] = useState(2)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => {
      const next = (active + 1) % slides.length
      setPrev(active)
      setActive(next)
      setMounted((m) => Math.max(m, next + 2))
    }, SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [active])

  return (
    <>
      {/* Own stacking context, so the hero's dark overlays stay above every slide */}
      <div className="absolute inset-0 isolate">
        {slides.slice(0, mounted).map((s, i) => {
          const isActive = i === active
          const isPrev = i === prev
          return (
            <div
              key={s.src}
              aria-hidden={!isActive}
              className={cn(
                'absolute inset-0 transition-opacity ease-in-out',
                isActive
                  ? 'z-[2] opacity-100'
                  : isPrev
                    ? 'z-[1] opacity-100'
                    : 'z-0 opacity-0',
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              <Image
                src={s.src}
                alt={isActive ? copy(s.alt) : ''}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover will-change-transform motion-reduce:[animation:none]"
                style={
                  {
                    '--kb-from': s.from,
                    '--kb-to': s.to,
                    transform: s.from,
                    animation:
                      isActive || isPrev
                        ? `ken-burns ${SLIDE_MS + FADE_MS}ms linear forwards`
                        : undefined,
                  } as CSSProperties
                }
              />
            </div>
          )
        })}
      </div>

      {/* Where the current shot was taken */}
      <p
        key={active}
        className="absolute bottom-6 left-6 z-[3] hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-background/80 [animation:fade-up_1s_ease_both] md:flex lg:bottom-8 lg:left-10"
      >
        <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
        {copy(slides[active].place)}
      </p>
    </>
  )
}
