'use client'

import { useCopy } from '@/i18n/copy'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { MapPin } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import { reviewSummaries } from '@/features/reviews/data/testimonials'
import { slogan } from '@/config/site'
import type { whyUs as sourceRecords } from '@/features/about/data/company'

// The three reasons this section features, shown together; the rest still
// feed other pages.
const featured = ['local', 'tailored', 'explore'] as const

// Rated platforms only; the strip has room for four figures.
const stats = [
  ...reviewSummaries
    .filter((s) => s.rating !== null)
    .map((s) => ({
      label: s.platform,
      value: `${s.rating?.toFixed(1)} / 5`,
    })),
  { label: 'Experience', value: '10+ years' },
]

export function WhyTravelClient({ whyUs }: { whyUs: typeof sourceRecords }) {
  const copy = useCopy()

  const reasons = featured.map((icon) => whyUs.find((r) => r.icon === icon)!)
  const lead = reasons[0]

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="overflow-hidden bg-background pb-20 sm:pb-24 lg:py-32"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        {/* Image panel — bleeds to the left edge of the viewport */}
        <Reveal className="relative aspect-[4/3] w-full min-w-0 overflow-hidden bg-muted lg:aspect-auto lg:min-h-[640px]">
          <Image
            src={lead.image}
            alt={copy('{v0}, Ethiopia', { v0: lead.place })}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: lead.position }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent"
          />

          <p className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:bottom-7 sm:left-8">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            {copy(lead.place)}
          </p>
        </Reveal>

        {/* Content panel */}
        <div className="min-w-0 px-5 pt-14 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:px-16 lg:pt-0 xl:px-24">
          <div className="w-full max-w-[36rem]">
            <Reveal>
              <p className="eyebrow mb-5 text-muted-foreground">
                {copy('The Extraordinary Difference')}
              </p>
              <h2
                id="why-us-title"
                className="text-balance font-serif text-5xl font-light italic leading-[0.95] text-accent sm:text-6xl lg:text-7xl"
              >
                {copy('Why travel with us')}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 space-y-7">
                {reasons.map((r) => (
                  <div key={r.title}>
                    <h3 className="font-serif text-2xl text-foreground sm:text-[1.75rem]">
                      {copy(r.title)}
                    </h3>
                    <p className="mt-2.5 text-pretty leading-[1.85] text-muted-foreground">
                      {r.body ?? r.text}
                    </p>
                  </div>
                ))}
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
                    <dt className="text-[12px] text-muted-foreground">
                      {copy(s.label)}
                    </dt>
                    <dd className="mt-1 font-serif text-xl italic leading-tight text-foreground">
                      {copy(s.value)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center self-start whitespace-nowrap border border-accent px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  {copy('Plan your journey')}
                </Link>
                <p className="font-serif text-lg italic text-primary">
                  {copy(slogan)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
