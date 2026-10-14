import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const experiences = [
  {
    kicker: 'Origins & ritual',
    title: 'Coffee Journeys',
    text: 'Trace the bean from the wild forests of Kaffa to the farms of Yirgacheffe, and share the ceremony with the families who grow it.',
    image: '/images/coffee-ceremony.jpg',
    href: '/tours/4-day-ethiopia-coffee',
  },
  {
    kicker: 'Fire & salt',
    title: 'Danakil Expeditions',
    text: 'Camp beneath desert stars, watch the glow of Erta Ale’s lava lake and walk among the sulphur springs of Dallol.',
    image: '/images/danakil-dallol.jpg',
    href: '/tours/3-day-afar-danakil-from-addis',
  },
  {
    kicker: 'People & culture',
    title: 'Omo Valley Encounters',
    text: 'Market days, village visits and ceremonies with the Hamar, Karo, Mursi and their neighbours — always respectfully, always with local guides.',
    image: '/images/karo.jpg',
    href: '/tours/6-day-omo-valley-tribal-and-cultural',
  },
  {
    kicker: 'Peaks & trails',
    title: 'Trekking & Wildlife',
    text: 'Walk the Simien escarpment among gelada troops, or search for the Ethiopian wolf on the Sanetti Plateau of the Bale Mountains.',
    image: '/images/simien-trek.jpg',
    href: '/tours/5-day-simien-mountains-trek',
  },
]

// Caption panels alternate light and dark in a checkerboard, and the right
// column's panels sit a little lower — the offset keeps the grid from feeling
// like a spreadsheet.
const panelTone = ['light', 'dark', 'dark', 'light'] as const

export function Experiences() {
  return (
    <section id="experiences" className="bg-background py-20 sm:py-24 lg:py-32">
      <Reveal className="shell mb-14 text-center sm:mb-20">
        <p className="eyebrow mb-5 justify-center text-accent">
          Signature Experiences
        </p>
        <h2 className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
          Moments <em className="italic">that stay with you</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[50ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          History, culture, adventure, wildlife and trekking — combine them
          into one journey, designed around how you like to travel.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-[1120px] gap-x-6 gap-y-16 px-5 sm:px-6 md:grid-cols-2 lg:gap-x-8 lg:gap-y-20 lg:px-10">
        {experiences.map((e, i) => {
          const dark = panelTone[i] === 'dark'
          const rightColumn = i % 2 === 1
          return (
            <Reveal key={e.title} delay={(i % 2) * 140}>
              <Link href={e.href} className="group block">
                <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={e.image}
                    alt={e.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/10" />
                </div>

                <div
                  className={cn(
                    'relative mx-5 -mt-20 px-6 py-8 text-center shadow-[0_28px_60px_-30px_oklch(0.185_0.012_58/0.55)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:mx-[11%] sm:px-8 sm:py-9',
                    rightColumn ? 'md:-mt-16' : 'md:-mt-24',
                    dark
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-sand text-foreground',
                  )}
                >
                  <p
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]',
                      dark ? 'text-accent' : 'text-primary',
                    )}
                  >
                    {e.kicker}
                  </p>
                  <h3 className="mt-3 text-[1.7rem] leading-tight sm:text-3xl">
                    {e.title}
                  </h3>
                  <p
                    className={cn(
                      'mx-auto mt-4 max-w-[38ch] text-pretty text-[15px] leading-relaxed',
                      dark ? 'text-secondary-foreground/75' : 'text-foreground/70',
                    )}
                  >
                    {e.text}
                  </p>
                  <span
                    className={cn(
                      'mt-5 inline-flex items-center gap-2 border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300',
                      dark
                        ? 'border-accent/40 text-accent group-hover:border-accent'
                        : 'border-foreground/25 text-foreground group-hover:border-foreground',
                    )}
                  >
                    Discover More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-16 flex justify-center sm:mt-20">
        <Link
          href="/tours"
          className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-14px_oklch(0.705_0.098_76/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground sm:text-xs"
        >
          Explore Travel Styles
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}
