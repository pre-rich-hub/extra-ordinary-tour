import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'
import { tours as staticTours } from '@/features/tours/data/tours'
import type { Tour } from '@/features/tours/types'
import { cn } from '@/lib/utils'

// Desktop mosaic: a large feature with two tiles stacked beside it, then a
// row of three. Positions follow the tour order.
const placement = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
]

export function StoryCarousel({ tours = staticTours }: { tours?: Tour[] }) {
  const journeys = tours.slice(0, placement.length)

  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <Reveal className="shell mb-12 text-center sm:mb-16">
        <p className="eyebrow mb-5 justify-center text-accent">Signature Journeys</p>
        <h2
          id="stories-title"
          className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
        >
          Six ways to <em className="italic text-accent">know Ethiopia</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          History, culture, trekking, wildlife, festivals and coffee. Wherever
          Ethiopia calls you, our local team brings honest advice and
          first-hand knowledge to every chapter of the journey.
        </p>
      </Reveal>

      {/* Stacked on phones, two columns on tablets, editorial mosaic on desktop */}
      <div className="shell">
        <ul
          aria-label="Signature journeys"
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-[280px] lg:grid-cols-12"
        >
          {journeys.map((t, i) => (
            <Reveal
              key={t.slug}
              as="li"
              delay={(i % 3) * 90}
              className={placement[i]}
            >
              <JourneyTile tour={t} large={placement[i].includes('row-span-2')} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <TextLink href="/tours">Explore every journey</TextLink>
        </div>
      </div>
    </section>
  )
}

function JourneyTile({ tour: t, large }: { tour: Tour; large: boolean }) {
  const kind = t.style.split(' · ')[0]

  return (
    <Link
      href={`/tours/${t.slug}`}
      className="group relative block aspect-[4/3] h-full overflow-hidden bg-charcoal lg:aspect-auto"
    >
      <Image
        src={t.image || '/placeholder.svg'}
        alt={t.title}
        fill
        sizes={large ? '(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw'}
        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/25 transition-colors duration-500 group-hover:from-charcoal/90" />

      <p className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-background/90 sm:left-6 sm:top-6">
        {kind}
      </p>
      {/* "Explore" shows on touch screens; on desktop it slides out of the arrow on hover */}
      <span className="absolute right-5 top-5 flex h-10 items-center rounded-full border border-accent bg-accent pl-4 pr-3 text-accent-foreground transition-all duration-300 sm:right-6 sm:top-6 lg:border-background/40 lg:bg-transparent lg:px-[11px] lg:text-background lg:group-hover:border-accent lg:group-hover:bg-accent lg:group-hover:pl-4 lg:group-hover:pr-3 lg:group-hover:text-accent-foreground lg:group-focus-visible:border-accent lg:group-focus-visible:bg-accent lg:group-focus-visible:pl-4 lg:group-focus-visible:pr-3 lg:group-focus-visible:text-accent-foreground">
        <span className="overflow-hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 max-w-[5rem] pr-1.5 lg:max-w-0 lg:pr-0 lg:opacity-0 lg:group-hover:max-w-[5rem] lg:group-hover:pr-1.5 lg:group-hover:opacity-100 lg:group-focus-visible:max-w-[5rem] lg:group-focus-visible:pr-1.5 lg:group-focus-visible:opacity-100">
          Explore
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
        <h3
          className={cn(
            'text-balance font-serif leading-[1.08] text-background',
            'text-2xl sm:text-[1.7rem]', large && 'lg:text-[2.6rem]',
          )}
        >
          {t.title}
        </h3>
        <p className="mt-2 text-[12px] tracking-wide text-background/75">
          {t.days} <span className="mx-1.5 text-accent">·</span> {t.season}
        </p>

        {/* Short description opens on hover or keyboard focus on desktop */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
          <p
            className={cn(
              'overflow-hidden text-pretty text-[13px] leading-relaxed text-background/80',
              large ? 'max-w-[52ch]' : 'max-w-[40ch]',
            )}
          >
            <span className="block pt-3">{t.teaser}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
