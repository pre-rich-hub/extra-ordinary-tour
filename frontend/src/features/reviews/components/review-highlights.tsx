import { getLocale } from 'next-intl/server'
import { ArrowUpRight, Star } from 'lucide-react'
import type { AppLocale } from '@/i18n/routing'
import { getCopy } from '@/i18n/copy-server'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import {
  getTestimonials,
  reviewSummaries,
} from '@/features/reviews/data/localized'

// Two short guest reviews with links to the platforms they were posted on,
// for pages without the full homepage review section.
const highlighted = ['sarah', 'd-thomas']

export async function ReviewHighlights() {
  const copy = await getCopy()
  const locale = (await getLocale()) as AppLocale
  const testimonials = getTestimonials(locale)
  const reviews = highlighted
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t) => t !== undefined)
  const urlOf = (platform?: string) =>
    reviewSummaries.find((s) => s.platform === platform)?.url ?? null

  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
      <SectionHeading
        eyebrow={copy('Guest reviews')}
        title={copy('What our guests say')}
        aside={copy(
          'Rated 5.0 on Tripadvisor and Google, and 4.9 on SafariBookings.',
        )}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {reviews.map((r, i) => {
          const url = urlOf(r.platform)
          return (
            <Reveal
              key={r.id}
              delay={i * 90}
              className="flex h-full flex-col rounded-sm border border-border bg-card p-7 sm:p-8"
            >
              <div
                className="flex gap-0.5 text-accent"
                aria-label={copy('{v0} out of 5 stars', { v0: r.rating ?? 5 })}
              >
                {Array.from({ length: r.rating ?? 5 }, (_, n) => (
                  <Star key={n} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 line-clamp-5 text-pretty font-serif text-lg leading-relaxed text-foreground sm:text-xl">
                {'“'}
                {copy(r.quote)}
                {'”'}
              </blockquote>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {r.name} <span className="text-accent">·</span> {copy(r.detail)}
              </p>
              {url && r.platform && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-accent"
                >
                  {copy('Read more reviews on {v0}', { v0: r.platform })}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
