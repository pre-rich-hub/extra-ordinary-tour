import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type InfoCardFact = { icon: LucideIcon; label: string }

// Photo-topped card shared by destinations and tours: badge and title over
// the image, then a white panel with a summary, a 2×2 fact grid and a
// centred Explore link.
export function InfoCard({
  href,
  image,
  imageAlt,
  badge,
  eyebrow,
  title,
  summary,
  facts,
  cta = 'Explore',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className,
}: {
  href: string
  image: string
  imageAlt: string
  badge: string
  eyebrow: string
  title: string
  summary: string
  facts: InfoCardFact[]
  cta?: string
  sizes?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full touch-manipulation flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_oklch(0.185_0.012_58/0.45)] active:scale-[0.97] active:border-accent active:shadow-[0_20px_40px_-24px_oklch(0.185_0.012_58/0.5)] active:duration-100',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <Image
          src={image || '/placeholder.svg'}
          alt={imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 group-active:scale-105 group-active:duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 via-45% to-transparent" />

        <span className="absolute left-5 top-5 rounded-sm bg-brass px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-sm">
          {badge}
        </span>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brass-light">
            {eyebrow}
          </p>
          <h3 className="mt-1.5 text-balance font-serif text-[1.75rem] leading-[1.1] text-background sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7">
        <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
          {facts.map(({ icon: Icon, label }) => (
            <li key={label} className="flex min-w-0 items-start gap-2.5 text-sm leading-snug text-foreground/85">
              <Icon aria-hidden className="mt-px h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-center gap-2.5 border-t border-border pt-5 text-[12px] font-semibold uppercase tracking-[0.24em] text-foreground transition-colors duration-300 group-hover:text-accent group-active:text-accent group-active:duration-75">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
