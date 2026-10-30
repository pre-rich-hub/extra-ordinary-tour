import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { hasPrice, priceShort } from '../lib/format'
import { BookingCard } from '@/components/cards/booking-card'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function TourBooking({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  return (
    <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label={copy('Designed Around You')}
            title={
              hasPrice(t.from)
                ? copy('Starting from {v0}', { v0: priceShort(t.from) })
                : copy('A Quote Made for Your Journey')
            }
            subtitle={
              hasPrice(t.from)
                ? copy(
                    'per person, twin share. The final cost depends on group size, accommodation standard and other arrangements.',
                  )
                : copy(
                    'We create a personalized quotation based on your itinerary, travel dates, accommodation preferences, and number of travellers.',
                  )
            }
            rows={[
              {
                k: 'Duration',
                v: t.nights
                  ? copy('{v0} / {v1} Nights', { v0: t.days, v1: t.nights })
                  : t.days,
              },
              { k: 'Group size', v: t.group },
              { k: 'Best season', v: t.season },
              // Every journey starts and finishes in Addis Ababa.
              { k: 'Start & finish', v: copy('Addis Ababa') },
            ]}
            primary={{ label: copy('Book this tour'), href: '#enquire' }}
          />
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            {copy('Travelling as a larger group?')}{' '}
            <Link
              href="/contact"
              className="text-primary underline underline-offset-4 hover:text-accent"
            >
              {copy('Contact us and we’ll arrange a custom plan.')}
            </Link>
          </p>
        </Reveal>
      </div>
    </aside>
  )
}
