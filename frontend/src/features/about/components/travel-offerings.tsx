import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { getTours } from '@/features/tours/data/localized'

const offerings = [
  {
    title: 'The Historic Route',
    text: 'Axum, Lalibela, Gondar, Lake Tana and the cliff churches of Tigray.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/gondar-fasil-ghebbi-walls.jpg',
    href: '/tours/10-day-historic-route',
    span: 'sm:col-span-2 sm:row-span-2 lg:col-span-7',
  },
  {
    title: 'Omo Valley Cultures',
    text: 'Markets, villages and ceremonies with the peoples of the south.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793014223/omo-village-women-group.jpg',
    href: '/tours/6-day-omo-valley-tribal-and-cultural',
    span: 'lg:col-span-5',
  },
  {
    title: 'Danakil Depression',
    text: 'Erta Ale’s lava lake, Dallol and the salt caravans.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/danakil-dallol-pools-visitors.jpg',
    href: '/tours/3-day-afar-danakil-from-addis',
    span: 'lg:col-span-5',
  },
  {
    title: 'Trekking & Wildlife',
    text: 'The Simien and Bale Mountains, gelada, walia ibex and the Ethiopian wolf.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/simien-escarpment-view.jpg',
    href: '/tours/5-day-simien-mountains-trek',
    span: 'lg:col-span-4',
  },
  {
    title: 'Festivals & Coffee',
    text: 'Timkat, Genna and Meskel, and the coffee lands of the south.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/lalibela-genna-crowd-panorama.jpg',
    href: '/tours/8-day-north-with-timkat-festival',
    span: 'lg:col-span-4',
  },
  {
    title: 'Addis Ababa & Day Trips',
    text: 'City tours, layovers and excursions from the capital.',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/addis-trinity.jpg',
    href: '/tours/addis-ababa-full-day-city-tour',
    span: 'sm:col-span-2 lg:col-span-4',
  },
]

export function TravelOfferings() {
  const copy = useCopy()

  const tours = getTours(useLocale() as AppLocale)

  return (
    <section className="shell py-24 sm:py-28 lg:py-36">
      <Reveal className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6 text-accent">{copy('What we do')}</p>
          <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            {copy('One country, ')}
            <em className="italic text-primary">{copy('many journeys')}</em>
          </h2>
        </div>
        <Link
          href="/tours"
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent sm:text-xs"
        >
          {copy('Explore all ')}
          {copy(tours.length)} {copy('tours')}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid auto-rows-[260px] gap-4 sm:auto-rows-[300px] sm:grid-cols-2 sm:gap-5 lg:auto-rows-[280px] lg:grid-cols-12">
        {offerings.map((o, i) => (
          <Reveal
            key={o.title}
            delay={(i % 3) * 90}
            className={`h-full ${o.span}`}
          >
            <Link
              href={o.href}
              className="group relative block h-full overflow-hidden rounded-sm bg-charcoal"
            >
              <Image
                src={o.image}
                alt={copy(o.title)}
                fill
                sizes={
                  i === 0
                    ? '(max-width: 1024px) 100vw, 58vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-background/30 text-background backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3
                  className={`font-serif leading-[1.05] text-background ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-[1.7rem]'}`}
                >
                  {copy(o.title)}
                </h3>
                <p className="mt-2 max-w-[38ch] text-pretty text-sm leading-relaxed text-background/75">
                  {copy(o.text)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
