import Image from 'next/image'
import { Check, Plane } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { LayoverPackage } from '../types'

export function LayoverPackages({ packages }: { packages: LayoverPackage[] }) {
  return (
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
  )
}
