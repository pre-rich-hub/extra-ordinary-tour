import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import {
  SafariBookingsMark,
  SafariGoMark,
  TripadvisorMark,
} from '@/components/icons/brand-marks'
import { contact } from '@/config/site'
import { testimonials } from '@/features/reviews/data/testimonials'

const platforms = [
  {
    name: 'Tripadvisor',
    href: 'https://www.tripadvisor.com/Attraction_Review-g480193-d19444662-Reviews-Extraordinary_Ethiopia_Tours-Lalibela_Amhara_Region.html',
    mark: <TripadvisorMark />,
  },
  {
    name: 'SafariBookings',
    href: 'https://www.safaribookings.com/p6779',
    mark: <SafariBookingsMark />,
  },
  {
    name: 'SafariGo',
    href: 'https://www.safarigo.com/operator/extraordinary-ethiopia-tours-3022',
    mark: <SafariGoMark />,
  },
]

export function GuestReviews() {
  const featured = testimonials.find((t) => t.name === 'Tamryn') ?? testimonials[0]
  return (
    <section className="shell grid gap-14 py-24 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20 lg:py-32">
      <Reveal>
        <p className="eyebrow mb-6 text-accent">
          In our guests’ words
        </p>
        <blockquote className="text-balance font-serif text-3xl italic leading-[1.2] text-foreground sm:text-4xl">
          &ldquo;{featured.quote}&rdquo;
        </blockquote>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {featured.name} <span className="text-accent">·</span> {featured.detail}
          {featured.platform && (
            <>
              {' '}
              <span className="text-accent">·</span> Review on {featured.platform}
            </>
          )}
        </p>
      </Reveal>

      <Reveal delay={150} className="border border-border bg-card p-8 sm:p-10">
        <p className="font-serif text-2xl text-foreground">Find us where travellers plan</p>
        <p className="mt-2 text-pretty text-muted-foreground">
          Read reviews from our guests, or reach us directly at{' '}
          <a
            href={`mailto:${contact.email}`}
            className="break-all text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
          >
            {contact.email}
          </a>
          .
        </p>
        <ul className="mt-8 grid gap-3">
          {platforms.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} reviews`}
                className="group flex h-[72px] items-center justify-between rounded-md bg-ivory px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_oklch(0.185_0.012_58/0.6)]"
              >
                {p.mark}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
