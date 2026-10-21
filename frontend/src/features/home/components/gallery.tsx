'use client'

import { useCopy } from '@/i18n/copy'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'

const shots = [
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-giyorgis.jpg',
    location: 'Lalibela',
    description:
      'The cross-shaped roof of Bete Giyorgis, carved down into the rock.',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-gelada.jpg',
    location: 'Simien Mountains',
    description:
      'Gelada troops grazing on the highland meadows above the escarpment.',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/danakil-dallol.jpg',
    location: 'Danakil Depression',
    description:
      'Sulphur springs and salt terraces more than 100 metres below sea level.',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/omo-river.jpg',
    location: 'Omo Valley',
    description: 'Evening light on a great bend of the Omo River.',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/timkat.jpg',
    location: 'Timkat',
    description: 'Priests in ceremonial robes leading the Epiphany procession.',
  },
  {
    src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lake-tana-monastery.jpg',
    location: 'Lake Tana',
    description:
      'A thatched island monastery on the shore of Ethiopia’s largest lake.',
  },
]

export function Gallery() {
  const copy = useCopy()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % shots.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [isPlaying, activeIndex])

  return (
    <section
      id="journal"
      aria-label={copy('Photo gallery')}
      className="group/viewport relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal"
    >
      {shots.map((shot, idx) => {
        const isActive = idx === activeIndex
        // Alternate animation direction/style
        const kbClass = idx % 2 === 0 ? 'animate-kb-1' : 'animate-kb-2'
        return (
          <div
            key={shot.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              isActive
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={shot.src}
              alt={copy('{v0}, Ethiopia', { v0: shot.location })}
              fill
              sizes="100vw"
              className={`object-cover ${isActive ? kbClass : 'scale-100'}`}
            />
          </div>
        )
      })}

      {/* Shading so the overlaid copy stays legible on any photo */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-charcoal/40 via-transparent via-35% to-charcoal/90" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-charcoal/40 to-transparent" />

      {/* Bottom bar: caption, dots and controls, aligned to the page shell */}
      <div className="shell absolute inset-x-0 bottom-0 z-30 pb-8 sm:pb-10 lg:pb-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div
            key={activeIndex}
            className="max-w-md text-balance [animation:fade-up_0.8s_ease_both]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(shots.length).padStart(2, '0')}{' '}
              {copy('· Captured Moments')}
            </span>
            <h3 className="mt-2 font-serif text-3xl font-normal tracking-wide text-white sm:text-4xl lg:text-5xl">
              {copy(shots[activeIndex].location)}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-sand/80 sm:text-base">
              {copy(shots[activeIndex].description)}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-5 sm:items-end">
            <div className="hidden items-center gap-2 sm:flex">
              {shots.map((_, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx)
                      setIsPlaying(true) // reset timer & keep playing on selection
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={copy('Go to slide {v0}', { v0: idx + 1 })}
                  />
                )
              })}
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={
                  isPlaying ? copy('Pause slideshow') : copy('Play slideshow')
                }
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + shots.length) % shots.length,
                  )
                }
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={copy('Previous slide')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % shots.length)
                }
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={copy('Next slide')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic CSS animations styles injected locally */}
      <style>{`
          @keyframes kb-pan-1 {
            0% { transform: scale(1.03) translate(0%, 0%); }
            100% { transform: scale(1.08) translate(-1%, -0.5%); }
          }
          @keyframes kb-pan-2 {
            0% { transform: scale(1.08) translate(0%, 0%); }
            100% { transform: scale(1.03) translate(1%, 0.5%); }
          }
          .animate-kb-1 {
            animation: kb-pan-1 8000ms ease-out forwards;
          }
          .animate-kb-2 {
            animation: kb-pan-2 8000ms ease-out forwards;
          }
          @keyframes progress-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          .animate-progress-grow {
            animation: progress-grow 7000ms linear forwards;
          }
        `}</style>

      {/* Progress Bar indicating time remaining for current slide */}
      {isPlaying && (
        <div
          key={activeIndex}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent/90 z-30 origin-left animate-progress-grow"
        />
      )}
    </section>
  )
}
