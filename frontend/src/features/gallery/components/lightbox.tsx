'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryPhoto } from '@/types'

/**
 * Full-screen photo viewer. Shows the uncropped image with its caption;
 * supports arrow keys, Escape, swipe and returns focus on close.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const photo = photos[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const count = photos.length

  const go = (dir: 1 | -1) => onIndexChange((index + dir + count) % count)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, onClose, onIndexChange])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title}, photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[70] flex flex-col bg-charcoal/97 text-background backdrop-blur-sm [animation:fade-up_0.35s_ease_both]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <span className="font-serif text-sm tabular-nums text-background/70">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-background/25 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 sm:px-20 lg:px-28">
        <div key={photo.src} className="relative h-full w-full [animation:fade-up_0.45s_ease_both]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <LightboxArrow side="left" onClick={() => go(-1)} />
        <LightboxArrow side="right" onClick={() => go(1)} />
      </div>

      <div key={`${photo.src}-caption`} className="shell py-6 text-center [animation:fade-up_0.5s_ease_both] sm:py-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
          {photo.category} · {photo.location}
        </p>
        <p className="mt-2 font-serif text-2xl sm:text-3xl">{photo.title}</p>
        <p className="mx-auto mt-2 max-w-[60ch] text-pretty text-sm leading-relaxed text-background/70 sm:text-base">
          {photo.caption}
        </p>
      </div>
    </div>
  )
}

function LightboxArrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-background/25 bg-charcoal/40 backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:flex ${
        side === 'left' ? 'left-5 lg:left-8' : 'right-5 lg:right-8'
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  )
}
