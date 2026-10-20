import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { destinations } from '../data/destinations'
import type { Destination } from '../types'

export function DestinationEnquiry({ destination: d }: { destination: Destination }) {
  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 4)
  return (
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
          want to see, and our team will plan the route, including the
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
  )
}
