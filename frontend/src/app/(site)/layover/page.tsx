import type { Metadata } from 'next'
import Image from 'next/image'
import { Check, Plane, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { CtaBand } from '@/components/layout/cta-band'
import { hasPrice } from '@/lib/utils'
import { getLayoverPackagesData } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Addis Ababa Layover Tours',
  description:
    'Private 6, 12, 24 and 48-hour layover tours from Bole International. Met at the gate, visa on arrival, back at check-in with time to spare.',
}

const assurances = [
  {
    icon: Plane,
    title: 'We track your inbound flight',
    text: 'If you land two hours late, your driver is still there and the day is reshaped around the time you actually have.',
  },
  {
    icon: BadgeCheck,
    title: 'Visa on arrival, handled',
    text: 'Most nationalities can buy a visa at Bole. We send the exact steps, the cost, and someone waiting on the other side of it.',
  },
  {
    icon: Clock3,
    title: 'Back three hours early',
    text: 'Every itinerary is timed to return you to the terminal three hours before your onward departure. We do not gamble with connections.',
  },
  {
    icon: ShieldCheck,
    title: 'Luggage stays safe',
    text: 'Checked through to your final destination in most cases. Hand luggage travels locked in the vehicle or in a day-room safe.',
  },
]

export default async function LayoverPage() {
  const packages = await getLayoverPackagesData()
  const packageCount = packages.length
  const shortest = packages[0]?.hours ?? '6 Hours'
  const from = packages[0]?.price ?? 'On request'

  return (
    <>
      <PageHero
        eyebrow="Addis Layover Tours"
        title="Six hours in Addis is not a waiting room"
        lede="Ethiopian Airlines connects half of Africa through Bole. If your connection is long enough for coffee, it is long enough for a private city loop — met at the gate, back at check-in with time to spare."
        image="/images/addis-skyline.jpg"
        imageAlt="The Addis Ababa skyline at dusk seen from the Entoto hills"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Layover' }]}
        meta={[
          { label: 'Packages', value: String(packageCount) },
          { label: 'Shortest', value: shortest },
          { label: hasPrice(from) ? 'From' : 'Price', value: from },
          { label: 'Airport', value: 'Bole (ADD)' },
        ]}
      />

      {/* Packages */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Choose Your Window"
          title="Four packages, sized to your connection"
          aside="Tell us your inbound and onward flight numbers and we will tell you honestly which of these fits."
        />

        <div className="space-y-6 sm:space-y-8">
          {packages.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <article className="group grid gap-0 overflow-hidden border border-border bg-card lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <span className="absolute left-5 top-5 flex items-center gap-2 bg-accent px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                    <Plane className="h-3 w-3" />
                    {p.hours}
                  </span>
                </div>

                <div className="flex flex-col p-7 sm:p-9 lg:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="font-serif text-xl text-primary sm:text-2xl">
                      {p.price}
                    </p>
                  </div>
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    {p.teaser}
                  </p>

                  <div className="mt-7 grid gap-7 sm:grid-cols-2">
                    <div>
                      <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        The Day
                      </p>
                      <ol className="space-y-2.5">
                        {p.itinerary.map((step, n) => (
                          <li
                            key={step}
                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-px shrink-0 font-serif text-primary">
                              {String(n + 1).padStart(2, '0')}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        Included
                      </p>
                      <ul className="space-y-2.5">
                        {p.includes.map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                          >
                            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-8 border-t border-border pt-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Best for:{' '}
                    <span className="text-foreground">{p.best}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Assurances */}
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Logistics First"
            title="On a layover, timing is the whole product"
            lede="Sights are easy. Not missing your onward flight is the part that takes experience."
            tone="dark"
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 90}
                className="border-t border-background/20 pt-6"
              >
                <a.icon className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                  {a.title}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-background/70">
                  {a.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            Book a Layover
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            Send us your flight numbers
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            That is genuinely all we need to start. We will confirm the visa
            position for your passport, propose the right package, and hold a
            driver for the window.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              'Confirmed within a few hours, not days',
              'Met at Bole whatever your arrival time',
              'Private vehicle — never a shared coach',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 leading-relaxed text-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <EnquiryForm subject="Addis Ababa layover tour" defaultStyles={['Layover']} />
        </Reveal>
      </section>

      <CtaBand
        title="Long stopover? Go north instead."
        text="With two nights you can fly to Lalibela, see the rock churches at dawn and be back at Bole for your onward leg. It is the best 48 hours in the country."
        primary={{ label: 'Plan a Stopover', href: '/contact' }}
        secondary={{ label: 'See Tours', href: '/tours' }}
        image="/images/lalibela-medhane-alem.jpg"
      />
    </>
  )
}

// ISR: admin edits surface within an hour (deliberate deviation from the
// statically frozen tours pages — the catalog is now API-backed).
export const revalidate = 3600
