import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { getDestinations } from '../data/localized'
import type { Destination } from '../types'

export function DestinationEnquiry({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  const destinations = getDestinations(useLocale() as AppLocale)

  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 4)
  return (
    <section
      id="enquire"
      className="scroll-mt-24 shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28"
    >
      <Reveal>
        <p className="eyebrow mb-5 text-accent">
          {copy('Plan This Destination')}
        </p>
        <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
          {copy('Build ')}
          {copy(d.name)} {copy('into your journey')}
        </h2>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {copy(
            'Nothing here is fixed. Tell us how long you have and what else you want to see, and our team will plan the route, including the flights, the guides and the hours that matter.',
          )}
        </p>

        <div className="mt-12">
          <p className="eyebrow mb-6 text-primary">{copy('Also Consider')}</p>
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
                      {copy(o.name)}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {copy(o.region)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <EnquiryForm
          subject={d.name}
          canonicalSubject={d.canonicalName ?? d.name}
          defaultStyles={[]}
        />
      </Reveal>
    </section>
  )
}
