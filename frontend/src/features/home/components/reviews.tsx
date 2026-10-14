'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { reviewSummaries, testimonials } from '@/content'
import { useScrollEdges } from '@/hooks/use-scroll-edges'
import { SafariBookingsEmblem, TripadvisorOwl } from '@/components/icons/brand-marks'
import { cn } from '@/lib/utils'
import type { ReviewPlatform, ReviewSummary, Testimonial } from '@/types'

const avatarTones = ['bg-primary', 'bg-accent', 'bg-secondary']

const platformStyle: Record<ReviewPlatform, { tile: string; name: string }> = {
  Tripadvisor: { tile: 'bg-tripadvisor', name: 'Tripadvisor' },
  SafariBookings: { tile: 'bg-safaribookings', name: 'SafariBookings' },
}

export function Reviews() {

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="shell grid gap-x-12 gap-y-10 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-y-16">
        {reviewSummaries.map((summary, r) => (
          <Fragment key={summary.platform}>
            {/* Left: this platform's heading + rating card (same design for each) */}
            <Reveal delay={r * 80}>
              {(
                <div className="mb-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Guest reviews
                  </p>
                  <h2
                    id={r === 0 ? 'reviews-title' : undefined}
                    className="mt-3 font-sans text-[2rem] font-extrabold uppercase leading-none tracking-[0.02em] text-foreground"
                  >
                    Excellent
                  </h2>
                  <Stars value={summary.rating ?? 5} className="mt-4 gap-1" size="h-9 w-9" />
                  <p className="mt-4 text-[15px] text-foreground/80">
                    Based on{' '}
                    <span className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
                      {summary.count ?? testimonials.filter((t) => t.platform === summary.platform).length} verified reviews
                    </span>
                  </p>
                </div>
              )}
              <PlatformCard
                platform={summary.platform}
                rating={summary.rating}
                count={summary.count}
                url={summary.url}
              />
            </Reveal>

            {/* Right: this platform's reviews, top-aligned with its card */}
            <Reveal delay={120 + r * 80} className="min-w-0">
              <ReviewRow
                summary={summary}
                reviews={testimonials.filter((t) => t.platform === summary.platform)}
              />
            </Reveal>
          </Fragment>
        ))}
      </div>
    </section>
  )
}

function ReviewRow({ summary, reviews }: { summary: ReviewSummary; reviews: Testimonial[] }) {
  const { ref: track, edges } = useScrollEdges({ start: true, end: true })

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  if (reviews.length === 0) return null

  return (
    <div>
      <div className="relative">
        <div
          ref={track}
          role="region"
          aria-label={`${summary.platform} reviews`}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((t, i) => (
            <ReviewCard
              key={`${t.name}-${i}`}
              name={t.name}
              detail={t.detail}
              quote={t.quote}
              title={t.title}
              rating={t.rating ?? 5}
              platform={t.platform}
              photo={t.image}
              tone={avatarTones[i % avatarTones.length]}
            />
          ))}
        </div>

        <Arrow side="left" hidden={edges.start} onClick={() => step(-1)} />
        <Arrow side="right" hidden={edges.end} onClick={() => step(1)} />
      </div>
    </div>
  )
}

function PlatformTile({ platform, className }: { platform: ReviewPlatform; className?: string }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg shadow-[0_12px_28px_-14px_oklch(0.185_0.012_58/0.6)]',
        platformStyle[platform].tile,
        className,
      )}
    >
      {platform === 'Tripadvisor' ? (
        <TripadvisorOwl className="h-[62%] w-[62%]" />
      ) : (
        <SafariBookingsEmblem className="h-[66%] w-[66%]" />
      )}
    </span>
  )
}

function PlatformCard({
  platform,
  rating,
  count,
  url,
}: {
  platform: ReviewPlatform
  rating: number | null
  count: number | null
  url: string | null
}) {
  const body = (
    <>
      <PlatformTile platform={platform} className="h-14 w-14" />
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {platformStyle[platform].name}
        </span>
        <span className="mt-1 flex items-center gap-2">
          {rating !== null && (
            <span className="font-sans text-[1.6rem] font-extrabold leading-none text-foreground">
              {rating.toFixed(1)}
            </span>
          )}
          <Stars value={rating ?? 5} className="gap-0.5" size="h-4 w-4" />
        </span>
        {count !== null && (
          <span className="mt-1 block text-[13px] text-muted-foreground">
            {count} reviews
          </span>
        )}
      </span>
      {url && (
        <ArrowUpRight className="h-4 w-4 shrink-0 self-start text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      )}
    </>
  )

  const card =
    'group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300'

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read all ${count ?? ''} ${platform} reviews`}
      className={cn(card, 'hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_18px_36px_-22px_oklch(0.185_0.012_58/0.55)]')}
    >
      {body}
    </a>
  ) : (
    <div className={card}>{body}</div>
  )
}

function ReviewCard({
  name,
  detail,
  quote,
  title,
  rating,
  platform,
  photo,
  tone,
}: {
  name: string
  detail: string
  quote: string
  title?: string
  rating: number
  platform?: ReviewPlatform
  photo: string
  tone: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col sm:w-[330px] xl:w-[calc((100%-3rem)/3)]">
      <header className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-xl text-background',
            tone,
          )}
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-foreground">{name}</span>
          <span className="block truncate text-[13px] text-muted-foreground">{detail}</span>
        </span>
        {platform && (
          <span title={`Review on ${platform}`}>
            <PlatformTile platform={platform} className="h-7 w-7 rounded-md shadow-none" />
          </span>
        )}
      </header>

      <Stars value={rating} className="mt-3 gap-0.5" size="h-[18px] w-[18px]" />

      {title && (
        <p className="mt-3 line-clamp-1 font-serif text-lg leading-snug text-foreground">{title}</p>
      )}

      <div className="mt-2 flex gap-4">
        <p
          className={cn(
            'min-w-0 flex-1 self-start text-pretty text-[15px] leading-relaxed text-foreground/85',
            !open && '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden',
          )}
        >
          {quote}
        </p>
        <span className="relative hidden h-[84px] w-[84px] shrink-0 overflow-hidden rounded-md bg-muted sm:block">
          <Image src={photo} alt="" fill sizes="84px" className="object-cover" />
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-auto self-start pt-4 text-[13px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        {open ? 'Show less' : 'Read full review'}
      </button>
    </article>
  )
}

// Five stars with the last one partly filled for fractional ratings (e.g. 4.9).
function Stars({ value, className, size }: { value: number; className?: string; size: string }) {
  return (
    <span className={cn('flex items-center', className)} aria-label={`${value} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <span key={i} className={cn('relative inline-block', size)}>
            <Star aria-hidden className={cn(size, 'absolute inset-0 fill-border text-border')} strokeWidth={1} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star aria-hidden className={cn(size, 'fill-accent text-accent')} strokeWidth={1} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

function Arrow({
  side,
  hidden,
  onClick,
}: {
  side: 'left' | 'right'
  hidden: boolean
  onClick: () => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous reviews' : 'Next reviews'}
      className={cn(
        'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_8px_24px_-10px_oklch(0.185_0.012_58/0.45)] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground',
        side === 'left' ? '-left-5' : '-right-5',
        hidden && 'invisible',
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.6} />
    </button>
  )
}
