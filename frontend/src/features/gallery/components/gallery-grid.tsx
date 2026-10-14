'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Expand } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { GalleryCategory, GalleryPhoto } from '@/types'
import { cn } from '@/lib/utils'
import { Lightbox } from './lightbox'

const ALL = 'All'
const frame: Record<GalleryPhoto['shape'], string> = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

/** Filterable masonry grid of photos that open in a full-screen lightbox. */
export function GalleryGrid({
  photos,
  categories,
}: {
  photos: GalleryPhoto[]
  categories: GalleryCategory[]
}) {
  const [filter, setFilter] = useState<GalleryCategory | typeof ALL>(ALL)
  const [open, setOpen] = useState<number | null>(null)

  const visible = filter === ALL ? photos : photos.filter((p) => p.category === filter)

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mb-10 flex flex-wrap gap-2 sm:mb-14">
        {[ALL, ...categories].map((c) => {
          const on = c === filter
          const n = c === ALL ? photos.length : photos.filter((p) => p.category === c).length
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c as GalleryCategory | typeof ALL)}
              className={cn(
                'inline-flex items-center gap-2 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:text-[11px]',
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
              )}
            >
              {c}
              <span className={cn('tabular-nums', on ? 'text-primary-foreground/60' : 'text-muted-foreground/60')}>
                {n}
              </span>
            </button>
          )
        })}
      </div>

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
        {visible.map((p, i) => (
          <li key={p.src} className="mb-5 break-inside-avoid lg:mb-6">
            <Reveal delay={(i % 3) * 90}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}, ${p.location}`}
                className={cn(
                  'group relative block w-full touch-manipulation overflow-hidden rounded-sm bg-muted text-left transition-transform duration-300 active:scale-[0.98] active:duration-100',
                  frame[p.shape],
                )}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 via-50% to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-4 top-4 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    {p.category} · {p.location}
                  </span>
                  <span className="mt-1.5 block font-serif text-2xl leading-tight text-background">
                    {p.title}
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          photos={visible}
          index={open}
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </>
  )
}
