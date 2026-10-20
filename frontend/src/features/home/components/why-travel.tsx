'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import { reviewSummaries } from '@/features/reviews/data/testimonials'
import { slogan } from '@/config/site'
import { whyUs } from '@/features/about/data/company'

// The three reasons this section features; the rest still feed other pages.
const featured = ['local', 'tailored', 'explore'] as const
const reasons = featured.map((icon) => whyUs.find((r) => r.icon === icon)!)

const stats = [
  ...reviewSummaries.map((s) => ({ label: s.platform, value: `${s.rating?.toFixed(1)} / 5` })),
  { label: 'Experience', value: '10+ years' },
  { label: 'Support', value: '24/7' },
]

export function WhyTravel() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reason = reasons[active]

  const go = (i: number, focus = false) => {
    const next = (i + reasons.length) % reasons.length
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: reasons.length - 1,
    }
    if (e.key in moves) {
      e.preventDefault()
      go(moves[e.key], true)
    }
  }

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        {/* Image panel — bleeds to the left edge of the viewport */}
        <Reveal className="relative aspect-[4/3] w-full min-w-0 overflow-hidden bg-muted lg:aspect-auto lg:min-h-[640px]">
          {reasons.map((r, i) => (
            <Image
              key={r.image}
              src={r.image}
              alt={`${r.place}, Ethiopia`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                'object-cover transition-[opacity,transform] duration-[1200ms] ease-out',
                i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
              )}
              aria-hidden={i !== active}
            />
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent"
          />

          <p className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:bottom-7 sm:left-8">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            {reason.place}
          </p>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-8">
            <span className="mr-2 font-serif text-base tabular-nums text-white">
              {String(active + 1).padStart(2, '0')}
              <span className="mx-1.5 text-white/40">/</span>
              {String(reasons.length).padStart(2, '0')}
            </span>
            {[
              { label: 'Previous reason', Icon: ChevronLeft, to: active - 1 },
              { label: 'Next reason', Icon: ChevronRight, to: active + 1 },
            ].map(({ label, Icon, to }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(to)}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-foreground"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Content panel */}
        <div className="min-w-0 px-5 pt-14 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:px-16 lg:pt-0 xl:px-24">
          <div className="w-full max-w-[36rem]">
            <Reveal>
              <p className="eyebrow mb-5 text-muted-foreground">
                The Extraordinary Difference
              </p>
              <h2
                id="why-us-title"
                className="text-balance font-serif text-5xl font-light italic leading-[0.95] text-accent sm:text-6xl lg:text-7xl"
              >
                Why travel with us
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div
                role="tablist"
                aria-label="Reasons to travel with us"
                className="-mx-5 mt-10 flex gap-x-6 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {reasons.map((r, i) => (
                  <button
                    key={r.title}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`why-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls="why-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => go(i)}
                    onKeyDown={onTabKey}
                    className={cn(
                      'relative shrink-0 whitespace-nowrap pb-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                      'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-500',
                      i === active
                        ? 'text-foreground after:scale-x-100'
                        : 'text-muted-foreground/70 after:scale-x-0 hover:text-foreground',
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div
                id="why-panel"
                role="tabpanel"
                aria-labelledby={`why-tab-${active}`}
                aria-live="polite"
                className="mt-8 lg:min-h-[12.75rem]"
              >
                <div key={active} className="animate-in fade-in slide-in-from-bottom-1 duration-700">
                  <h3 className="font-serif text-3xl text-foreground sm:text-[2.1rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-pretty leading-[1.85] text-muted-foreground">
                    {reason.body ?? reason.text}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Proof row */}
            <Reveal delay={160}>
              <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-border pt-7 sm:flex sm:flex-wrap sm:gap-y-4">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      'pr-5 sm:border-l sm:border-border sm:px-6',
                      i === 0 && 'sm:border-l-0 sm:pl-0',
                      i % 2 === 1 && 'border-l border-border pl-5',
                    )}
                  >
                    <dt className="text-[12px] text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 font-serif text-xl italic leading-tight text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center self-start whitespace-nowrap border border-accent px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  Plan your journey
                </Link>
                <p className="font-serif text-lg italic text-primary">{slogan}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
