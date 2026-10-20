import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { destinations } from '@/features/destinations/data/destinations'
import { tours } from '@/features/tours/data/tours'

const stats = [
  { value: '10+', label: 'Years guiding in Ethiopia' },
  { value: String(tours.length), label: 'Tours & journeys' },
  { value: String(destinations.length), label: 'Places, peoples & festivals' },
  { value: '24/7', label: 'Support on every trip' },
]

export function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      <Image
        src="/images/lalibela-giyorgis.jpg"
        alt="The cross-shaped Church of St George carved into the rock at Lalibela"
        fill
        priority
        sizes="100vw"
        className="-z-10 animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-charcoal" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

      <div className="shell pt-36">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60"
        >
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-background/90">About Us</span>
        </nav>

        <p className="eyebrow mb-6 text-accent [animation:fade-up_1s_ease_0.1s_both]">
          About Extraordinary Ethiopia Tours
        </p>
        <h1 className="max-w-[15ch] text-balance font-serif text-[2.9rem] font-medium leading-[0.98] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-7xl lg:text-[6.25rem]">
          Discover Ethiopia.{' '}
          <em className="italic text-accent">Experience the Extraordinary!</em>
        </h1>
        <p className="mt-8 max-w-[50ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
          A locally based tour operator from Lalibela, creating private and
          group journeys through the history, cultures and landscapes of the
          Land of Origins, for the real Ethiopian experience.
        </p>
      </div>

      {/* Stats band */}
      <div className="shell mt-16 pb-10 sm:mt-20 sm:pb-14">
        <dl className="grid grid-cols-2 border-t border-background/20 [animation:fade-up_1s_ease_0.5s_both] lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`pt-6 sm:pt-8 ${i % 2 === 1 ? 'pl-6 sm:pl-10' : ''} ${i > 0 ? 'lg:border-l lg:border-background/20 lg:pl-10' : ''} ${i > 1 ? 'mt-6 lg:mt-0' : ''}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-4xl leading-none text-background sm:text-5xl lg:text-6xl">
                {s.value}
              </dd>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-background/60 sm:text-[11px]">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
