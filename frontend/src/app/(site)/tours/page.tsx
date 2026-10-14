import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { hasPrice, nightsLabel, priceShort } from '@/lib/utils'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ToursGrid } from '@/features/tours/components/tours-grid'
import { CtaBand } from '@/components/layout/cta-band'
import { promises } from '@/content'
import { getToursData } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Tours & Journeys',
  description:
    'Ethiopia tour packages from Extraordinary Ethiopia Tours: historical and heritage tours, the Omo Valley, Danakil Depression, Simien and Bale trekking, wildlife safaris, birding, coffee, festivals and Addis Ababa day trips.',
}

export default async function ToursPage() {
  const tours = await getToursData()
  const hero = tours.find((t) => t.featured) ?? tours[0]

  return (
    <>
      <PageHero
        eyebrow="Tours & Journeys"
        title="Every way to experience Ethiopia"
        lede="From day trips out of Addis Ababa to three-week expeditions, choose a package as it stands or let us adapt it to your dates, interests and budget."
        image="/images/simien-landscape.jpg"
        imageAlt="Basalt pinnacles of the Simien Mountains rising above the clouds"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Tours' }]}
        meta={[
          { label: 'Journeys', value: String(tours.length) },
          { label: 'Length', value: '1 – 17 Days' },
          { label: 'Group Size', value: 'Solo to Groups' },
          { label: 'Guiding', value: 'Private & Group' },
        ]}
      />

      {/* Featured journey */}
      <section className="border-b border-border">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]">
              <Image
                src={hero.image || '/placeholder.svg'}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 bg-accent px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                Most Requested
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow mb-5 text-accent">
              Signature Journey
            </p>
            <h2 className="text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
              {hero.title}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {hero.summary}
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                { label: 'Duration', value: hero.days },
                { label: 'Season', value: hero.season },
                { label: 'Group', value: hero.group },
                { label: hasPrice(hero.from) ? 'From' : 'Price', value: priceShort(hero.from) },
              ].map((m) => (
                <div key={m.label} className="border-t border-border pt-4">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg text-foreground sm:text-xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {nightsLabel(hero.nights)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {hero.group}
              </span>
            </div>

            <Link
              href={`/tours/${hero.slug}`}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-xs"
            >
              View the full itinerary
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All journeys */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Every journey we run"
          aside="Filter by the kind of travelling you want to do — historical, cultural, festival, coffee, wildlife, trekking, birding, Danakil or day trips. Any of these can be lengthened, shortened or combined."
        />
        <ToursGrid tours={tours} />
      </section>

      {/* Promises */}
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="How We Work"
            title="What is true of every journey on this page"
            tone="dark"
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 90}
                className="border-t border-background/20 pt-6"
              >
                <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                  {p.title}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-background/70">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Or start with a blank page"
        text="Many of our guests combine two of these tours. Describe the journey you have in mind and our team will design it around you."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
      />
    </>
  )
}
