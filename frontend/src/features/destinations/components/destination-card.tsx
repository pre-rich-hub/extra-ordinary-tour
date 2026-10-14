import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock, MapPin, Mountain } from 'lucide-react'
import { InfoCard } from '@/components/cards/info-card'
import type { Destination } from '@/types'
import { cn } from '@/lib/utils'

/** Photo-topped card with a fact grid. Used on the Destinations listing. */
export function DestinationInfoCard({
  destination: d,
  className,
}: {
  destination: Destination
  className?: string
}) {
  return (
    <InfoCard
      href={`/destinations/${d.slug}`}
      image={d.image}
      imageAlt={`${d.name}, Ethiopia`}
      badge={d.tag}
      eyebrow={d.region}
      title={d.name}
      summary={d.teaser}
      facts={[
        { icon: MapPin, label: d.region },
        { icon: Mountain, label: d.altitude },
        { icon: Clock, label: d.bestTime },
        { icon: CalendarDays, label: d.duration },
      ]}
      className={className}
    />
  )
}

/**
 * Tall portrait card with centred copy and an outlined call to action that
 * fills with gold on hover. Used by the homepage Signature Destinations grid.
 */
export function DestinationFeatureCard({
  destination: d,
  className,
}: {
  destination: Destination
  className?: string
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={cn(
        'group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-sm bg-charcoal touch-manipulation transition-transform duration-300 active:scale-[0.96] active:duration-100 shadow-[0_30px_60px_-34px_oklch(0.185_0.012_58/0.6)]',
        className,
      )}
    >
      <Image
        src={d.image || '/placeholder.svg'}
        alt={`${d.name}, Ethiopia`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 via-45% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative flex flex-col items-center px-6 pb-8 pt-24 text-center sm:px-8 sm:pb-9">
        <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-sand/80">
          {d.duration} · {d.tag}
          <span className="block text-accent">{d.region}</span>
        </p>
        <h3 className="mt-3 text-balance font-serif text-[2rem] leading-[1.05] text-background sm:text-[2.25rem]">
          {d.name}
        </h3>
        <p className="mt-3 max-w-[34ch] text-pretty text-sm leading-relaxed text-background/80">
          {d.teaser}
        </p>
        <span className="mt-6 inline-flex items-center gap-2.5 rounded-sm border border-accent/70 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          Explore {d.name.split(' ')[0]}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
