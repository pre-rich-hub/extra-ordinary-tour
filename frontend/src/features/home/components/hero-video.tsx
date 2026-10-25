'use client'

import { useCopy } from '@/i18n/copy'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

// Muted (ac_none) and resized by Cloudinary; WebM/VP9 is about 40% smaller
// than MP4 where supported. Phones get the 960 px cut.
const VIDEO =
  'https://res.cloudinary.com/oyw9kdvp/video/upload/ac_none,q_auto,w_{w}/v1792932263/homev'
const FALLBACK = {
  src: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/blue-nile-falls.jpg',
  alt: 'The Blue Nile Falls pouring into a rocky gorge',
  place: 'Blue Nile Falls',
}
// Give up on a video that has not started by then, and stop its download.
const START_TIMEOUT_MS = 10000

type Connection = { saveData?: boolean; effectiveType?: string }

export function HeroVideo() {
  const copy = useCopy()

  // The photo is server-rendered and is what the page paints first; the video
  // is added after hydration and fades in over it only once it plays.
  const [width, setWidth] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType ?? '')
    )
      return
    setWidth(window.matchMedia('(min-width: 768px)').matches ? 1920 : 960)
  }, [])

  useEffect(() => {
    if (!width || playing) return
    const t = window.setTimeout(() => setWidth(null), START_TIMEOUT_MS)
    return () => window.clearTimeout(t)
  }, [width, playing])

  const src = width && VIDEO.replace('{w}', String(width))

  return (
    <>
      <div className="absolute inset-0 isolate">
        <Image
          src={FALLBACK.src}
          alt={playing ? '' : copy(FALLBACK.alt)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {src && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onPlaying={() => setPlaying(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
              playing ? 'opacity-100' : 'opacity-0',
            )}
          >
            <source src={`${src}.webm`} type="video/webm" />
            {/* The browser tried every source; keep the photo. */}
            <source
              src={`${src}.mp4`}
              type="video/mp4"
              onError={() => {
                setWidth(null)
                setPlaying(false)
              }}
            />
          </video>
        )}
      </div>

      {/* Where the photo was taken; the video spans several places */}
      {!playing && (
        <p className="absolute bottom-6 left-6 z-[3] hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-background/80 [animation:fade-up_1s_ease_both] md:flex lg:bottom-8 lg:left-10">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          {copy(FALLBACK.place)}
        </p>
      )}
    </>
  )
}
