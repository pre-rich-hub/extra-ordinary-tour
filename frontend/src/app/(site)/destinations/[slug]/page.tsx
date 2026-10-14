import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { BookingCard } from '@/components/cards/booking-card'
import { Reveal } from '@/components/ui/reveal'
import { TourCard } from '@/features/tours/components/tour-card'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { CtaBand } from '@/components/layout/cta-band'
import { destinations, getDestination, tours } from '@/content'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }
  return {
    title: d.name,
    description: d.intro,
    openGraph: { title: d.name, description: d.intro, images: [d.image] },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) notFound()

  const related = tours.filter((t) => t.places.some((p) => p.includes(d.name.split(' ')[0]))).slice(0, 3)
  const fallback = related.length ? related : tours.slice(0, 3)
  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 4)

  return (
    <>
      <PageHero
        eyebrow={`${d.tag} · ${d.region}`}
        title={d.name}
        lede={d.intro}
        image={d.image}
        imageAlt={`${d.name}, Ethiopia`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: d.name },
        ]}
        meta={[
          { label: 'Best Time', value: d.bestTime },
          { label: 'Suggested Stay', value: d.duration },
          { label: 'Altitude', value: d.altitude },
          { label: 'Region', value: d.region },
        ]}
      />

      {/* Essay + highlights, with the planning card pinned alongside */}
      <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 lg:py-28 xl:grid-cols-[1fr_380px] xl:gap-x-20">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow mb-5 text-accent">
              Why We Go
            </p>
            <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
              {d.teaser}
            </h2>
            <div className="mt-8 space-y-6">
              {d.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

        <aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <Reveal delay={120}>
              <BookingCard
                label="Plan your visit"
                title={d.name}
                subtitle={`${d.tag} · ${d.region}`}
                rows={[
                  { k: 'Suggested stay', v: d.duration },
                  { k: 'Best time', v: d.bestTime },
                  { k: 'Altitude', v: d.altitude },
                  { k: 'Region', v: d.region },
                ]}
                primary={{ label: 'Plan this trip', href: '#enquire' }}
              />
            </Reveal>
          </div>
        </aside>

          <Reveal className="border-t border-border pt-12 lg:col-start-1 lg:row-start-2 lg:mt-14">
            <p className="eyebrow mb-6 text-primary">
              Highlights
            </p>
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-x-10">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Related tours, in the left column so the card stays pinned */}
          <div className="border-t border-border pt-12 lg:col-start-1 lg:row-start-3 lg:mt-14">
            <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4 text-accent sm:mb-5">
                  Journeys Including {d.name}
                </p>
                <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
                  Routes that pass through here
                </h2>
              </div>
              <Link
                href="/tours"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
              >
                All tours
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {fallback.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 2) * 90} className="h-full">
                  <TourCard tour={t} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw" />
                </Reveal>
              ))}
            </div>
          </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            Plan This Destination
          </p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            Build {d.name} into your journey
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            Nothing here is fixed. Tell us how long you have and what else you
            want to see, and our team will plan the route — including the
            flights, the guides and the hours that matter.
          </p>

          <div className="mt-12">
            <p className="eyebrow mb-6 text-primary">
              Also Consider
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/destinations/${o.slug}`}
                    className="group flex items-center gap-4 border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={o.image || '/placeholder.svg'}
                        alt=""
                        aria-hidden
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                        {o.name}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {o.region}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm subject={d.name} defaultStyles={[]} />
        </Reveal>
      </section>

      <CtaBand
        title="Speak to someone who has been there this season"
        text="Our guides travel these routes all year. Ask about road conditions, festival dates or the best time to visit — you will get a straight answer."
        secondary={{ label: 'All Destinations', href: '/destinations' }}
        image={d.image}
      />
    </>
  )
}
