import { useCopy } from '@/i18n/copy'
import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { Faq } from '@/components/ui/faq'
import { hasPrice, nightsLabel } from '../lib/format'
import { tours } from '../data/tours'
import type { Tour } from '../types'

const link = 'text-primary underline underline-offset-4 hover:text-accent'

// Every answer comes from this tour's catalogue data or from terms the site
// already publishes; nothing here is a new claim.
export function TourFaq({ tour: t }: { tour: Tour }) {
  const copy = useCopy()
  const locale = useLocale() as AppLocale
  const first = t.itinerary[0]
  const last = t.itinerary[t.itinerary.length - 1]
  // Seasons are localized, so compare against the English catalogue.
  const yearRound =
    tours.find((x) => x.slug === t.slug)?.season === 'Year-round'

  return (
    <Faq
      eyebrow={copy('Before You Book')}
      title={copy('Questions about this journey')}
      items={[
        {
          question: copy('How long is this tour?'),
          answer:
            t.itinerary.length > 1
              ? copy(
                  '{v0} ({v1}). It begins with “{v2}” and ends with “{v3}”; the full day-by-day plan is above.',
                  {
                    v0: t.days,
                    v1: nightsLabel(t.nights, locale),
                    v2: first.title,
                    v3: last.title,
                  },
                )
              : copy('One full day: “{v0}”. The plan for the day is above.', {
                  v0: first.title,
                }),
        },
        {
          question: copy('When is the best time to take this tour?'),
          answer: yearRound
            ? copy(
                'It runs year-round. Ask us about your dates and we will tell you honestly what the weather and roads will be like.',
              )
            : copy(
                'Recommended season: {v0}. If your dates fall outside it, ask us and we will tell you honestly what the weather and roads will be like.',
                { v0: t.season },
              ),
        },
        {
          question: copy('Is it private, and can the itinerary be changed?'),
          answer: copy(
            'It runs as a private tour or as a small group, for {v0}. Like every journey we offer, it can be shaped around your interests, schedule and budget.',
            { v0: t.group },
          ),
        },
        {
          question: copy('How much does it cost, and how do I book?'),
          answer: (
            <>
              {hasPrice(t.from)
                ? copy('Prices start from {v0}.', { v0: t.from })
                : copy(
                    'We create a personalized quotation based on your itinerary, travel dates, accommodation preferences, and number of travellers.',
                  )}{' '}
              {copy(
                'Send an enquiry and within 24 hours our team confirms availability and sends an itinerary and a clear quote. A 30% deposit secures the booking, and the balance is due at least 30 days before arrival.',
              )}{' '}
              <Link href="/terms-and-conditions" className={link}>
                {copy('Read the booking terms')}
              </Link>
            </>
          ),
        },
      ]}
    />
  )
}
