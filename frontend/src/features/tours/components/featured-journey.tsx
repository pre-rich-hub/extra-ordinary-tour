import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { hasPrice, nightsLabel, priceShort } from '../lib/format'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function FeaturedJourney({ tours }: { tours: Tour[] }) {
  const copy = useCopy()
  const locale = useLocale() as AppLocale

  const hero = tours.find((t) => t.featured) ?? tours[0]
  return (
    <section className="border-b border-border">
      <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]">
            <Image
              src={hero.image || '/placeholder.svg'}
              alt={copy(hero.title)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 bg-accent px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
              {copy('Most Requested')}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-5 text-accent">
            {copy('Signature Journey')}
          </p>
          <h2 className="text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {copy(hero.title)}
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {copy(hero.summary)}
          </p>

          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {[
              { label: copy('Duration'), value: hero.days },
              { label: copy('Season'), value: hero.season },
              { label: copy('Group'), value: hero.group },
              {
                label: hasPrice(hero.from) ? copy('From') : copy('Price'),
                value: priceShort(hero.from),
              },
            ].map((m) => (
              <div key={m.label} className="border-t border-border pt-4">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {copy(m.label)}
                </dt>
                <dd className="mt-1.5 font-serif text-lg text-foreground sm:text-xl">
                  {copy(m.value)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {nightsLabel(hero.nights, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {copy(hero.group)}
            </span>
          </div>

          <Link
            href={`/tours/${hero.slug}`}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-xs"
          >
            {copy('View the full itinerary')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
