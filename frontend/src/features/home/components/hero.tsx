import Image from 'next/image'
import { HeroActions } from '@/features/home/components/hero-actions'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/lalibela-giyorgis.jpg"
          alt="Bet Giyorgis (Church of St. George) in Lalibela, Ethiopia, a historic monolithic rock-hewn church"
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/10 to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col items-center pb-20 pt-32 text-center sm:pb-24 lg:pb-28">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="max-w-[18ch] text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.01em] text-background text-shadow-soft [animation:fade-up_1s_ease_0.1s_both] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Discover Ethiopia.{' '}
            <em className="italic text-accent">Experience the Extraordinary!</em>
          </h1>

          <p className="mt-6 max-w-[52ch] text-pretty leading-relaxed text-background/90 [animation:fade-up_1s_ease_0.25s_both] sm:mt-8 sm:text-lg">
            Private and small-group journeys from the rock-hewn churches of
            Lalibela to the salt and fire of the Danakil.
          </p>
        </div>

        <div className="mt-14 w-full sm:mt-16">
          <HeroActions />
        </div>
      </div>
    </section>
  )
}


