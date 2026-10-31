import { useCopy } from '@/i18n/copy'
import { HeroActions } from './hero-actions'
import { HeroVideo } from './hero-video'

export function Hero() {
  const copy = useCopy()

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/10 to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col items-center pb-20 pt-32 text-center sm:pb-24 lg:pb-28">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="max-w-[18ch] text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.01em] text-background text-shadow-soft [animation:rise_1s_ease_0.1s_both] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {copy('Discover Ethiopia')}{' '}
            <em className="italic text-accent">
              {copy('Experience the Extraordinary!')}
            </em>
          </h1>

          <h2 className="mt-6 text-balance text-lg font-medium tracking-[0.01em] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:mt-8 sm:text-2xl">
            {copy('Private & Customized Tours in Ethiopia')}
          </h2>

          <p className="mt-3 max-w-[56ch] text-pretty leading-relaxed text-background/90 [animation:fade-up_1s_ease_0.25s_both] sm:mt-4 sm:text-lg">
            {copy(
              'Discover Ethiopia your way, from the ancient rock-hewn churches of Lalibela to the dramatic landscapes of the Danakil Depression. Every journey is tailored to your interests, pace, and preferences.',
            )}
          </p>
        </div>

        <div className="mt-14 w-full sm:mt-16">
          <HeroActions />
        </div>
      </div>
    </section>
  )
}
