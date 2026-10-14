'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'
import { destinations } from '@/content'
import { cn } from '@/lib/utils'

// The index is designed around eight entries; the rest live on /destinations.
const indexed = destinations.slice(0, 8)

export function DestinationIndex() {
  const [active, setActive] = useState(0)
  const current = indexed[active]

  return (
    <section
      id="destination-index"
      aria-labelledby="destination-index-title"
      className="bg-background"
    >
      <MobileIndex />

      <div className="hidden lg:grid lg:grid-cols-2">
        {/* Image panel: every photo is stacked and cross-faded */}
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal sm:aspect-[16/10] lg:aspect-auto lg:min-h-[min(100svh,860px)]">
          {indexed.map((d, i) => (
            <Image
              key={d.slug}
              src={d.image}
              alt={i === active ? d.name : ''}
              aria-hidden={i !== active}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                'object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-12">
            <div key={current.slug} className="[animation:fade-up_0.7s_ease_both]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[11px]">
                {current.tag} · {current.region}
              </p>
              <p className="mt-3 max-w-[38ch] text-pretty font-serif text-xl leading-snug text-background sm:text-2xl">
                {current.teaser}
              </p>
            </div>
          </div>
        </div>

        {/* Index */}
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          <Reveal>
            <p
              className="font-serif text-xl text-accent sm:text-2xl"
            >
              Our destinations
            </p>
            <div className="mt-5 h-px w-full bg-border" />

            <ul className="mt-8 sm:mt-10">
              {indexed.map((d, i) => {
                const isActive = i === active
                return (
                  <li key={d.slug}>
                    <Link
                      href={`/destinations/${d.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-current={isActive || undefined}
                      className="group flex items-baseline gap-4 py-1 outline-none sm:gap-5"
                    >
                      <span
                        className={cn(
                          'w-6 shrink-0 font-sans text-[11px] font-semibold tabular-nums tracking-[0.1em] transition-colors duration-500',
                          isActive ? 'text-accent' : 'text-muted-foreground/40',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-serif text-[2rem] leading-[1.18] transition-all duration-500 ease-out sm:text-[2.6rem] xl:text-5xl',
                          isActive
                            ? 'translate-x-1 text-foreground'
                            : 'text-muted-foreground/45 group-hover:text-muted-foreground/70',
                          'group-focus-visible:underline group-focus-visible:decoration-accent group-focus-visible:decoration-1 group-focus-visible:underline-offset-8',
                        )}
                      >
                        {d.name}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className={cn(
                          'h-5 w-5 shrink-0 self-center text-accent transition-all duration-500',
                          isActive ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-10 h-px w-full bg-border sm:mt-12" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Eight highlights, one country — and many more to discover.
              </p>
              <TextLink href="/destinations">View all destinations</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Phones and tablets: a two-column grid of photo tiles, each linking
// straight to its destination — no hover needed.
function MobileIndex() {
  return (
    <div className="shell py-16 sm:py-20 lg:hidden">
      <Reveal>
        <h2
          id="destination-index-title"
          className="text-center font-serif text-[2.1rem] leading-tight text-foreground sm:text-4xl"
        >
          Our destinations
        </h2>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
        {indexed.map((d, i) => (
          <li key={d.slug}>
            <Reveal delay={(i % 2) * 80}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-sm bg-charcoal touch-manipulation transition-transform duration-300 active:scale-[0.96] active:duration-100 px-3 text-center"
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                />
                <span className="absolute inset-0 bg-charcoal/35 transition-colors duration-500 group-hover:bg-charcoal/50 group-active:bg-charcoal/50" />
                <span className="relative text-balance text-[15px] font-medium leading-tight text-background [text-shadow:0_1px_12px_rgb(0_0_0/0.45)] sm:text-lg">
                  {d.name}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <TextLink href="/destinations">View all destinations</TextLink>
      </div>
    </div>
  )
}
