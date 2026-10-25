import { useCopy } from '@/i18n/copy'
import { hasPrice } from '../lib/format'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import type { Tour } from '../types'

export function TourEnquiry({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  return (
    <section
      id="enquire"
      className="border-t border-border bg-secondary text-secondary-foreground"
    >
      <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">{copy('Enquire')}</p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl lg:text-5xl">
            {copy('Make ')}
            {copy(t.title)} {copy('yours')}
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/70 sm:text-lg">
            {copy(
              'Send us your dates and we will confirm availability, quote precisely, and suggest the two or three changes we would make if it were our own trip.',
            )}
          </p>
          <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-background/70">
            {copy('Runs ')}
            {copy(t.season)} · {copy(t.group)} ·{' '}
            <span className="text-background">
              {hasPrice(t.from)
                ? copy('from {v0}', { v0: t.from })
                : copy('A quote made for your journey')}
            </span>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <EnquiryForm
            subject={t.title}
            canonicalSubject={t.canonicalTitle ?? t.title}
            defaultStyles={
              t.styleKeys ?? t.style.split('·').map((s) => s.trim())
            }
          />
        </Reveal>
      </div>
    </section>
  )
}
