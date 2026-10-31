import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ChevronRight } from 'lucide-react'


export function AboutHero({
  tourCount,
  destinationCount,
}: {
  tourCount: number
  destinationCount: number
}) {
  const copy = useCopy()
  const stats = [
    { value: '10+', label: 'Years guiding in Ethiopia' },
    { value: String(tourCount), label: 'Tours & journeys' },
    { value: String(destinationCount), label: 'Places, peoples & festivals' },
    { value: '24/7', label: 'Support on every trip' },
  ]

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      <Image
        src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792850077/erta-ale.png"
        alt={copy(
          'Steam rising from the summit crater of Erta Ale, the active shield volcano of the Danakil.',
        )}
        fill
        priority
        sizes="100vw"
        className="-z-10 animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-charcoal" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

      <div className="shell pt-36">
        <nav
          aria-label={copy('Breadcrumb')}
          className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60"
        >
          <Link href="/" className="transition-colors hover:text-accent">
            {copy('Home')}
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-background/90">{copy('About Us')}</span>
        </nav>

        <p className="eyebrow mb-6 text-accent [animation:fade-up_1s_ease_0.1s_both]">
          {copy('About Extraordinary Ethiopia Tours')}
        </p>
        <h1 className="max-w-[15ch] text-balance font-serif text-[2.9rem] font-medium leading-[0.98] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-7xl lg:text-[6.25rem]">
          {copy('Discover Ethiopia.')}{' '}
          <em className="italic text-accent">
            {copy('Experience the Extraordinary!')}
          </em>
        </h1>
        <p className="mt-8 max-w-[50ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
          {copy(
            'A locally owned tour operator based in Lalibela, creating private and group journeys through Ethiopia’s remarkable history, diverse cultures and breathtaking landscapes. Discover the Land of Origins through meaningful experiences and the knowledge of those who call it home.',
          )}
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
              <dt className="sr-only">{copy(s.label)}</dt>
              <dd className="font-serif text-4xl leading-none text-background sm:text-5xl lg:text-6xl">
                {copy(s.value)}
              </dd>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-background/60 sm:text-[11px]">
                {copy(s.label)}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
