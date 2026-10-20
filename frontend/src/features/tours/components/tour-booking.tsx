import { hasPrice, priceShort } from '../lib/format'
import { BookingCard } from '@/components/cards/booking-card'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function TourBooking({ tour: t }: { tour: Tour }) {
  return (
    <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label="Pricing"
            title={hasPrice(t.from) ? `From ${priceShort(t.from)}` : 'Price on request'}
            subtitle={hasPrice(t.from) ? 'per person, twin share' : 'quoted for your dates and group size'}
            rows={[
              { k: 'Duration', v: t.nights ? `${t.days} / ${t.nights} Nights` : t.days },
              { k: 'Group size', v: t.group },
              { k: 'Best season', v: t.season },
              {
                k: 'Start & finish',
                v:
                  t.places[0] === t.places[t.places.length - 1]
                    ? t.places[0]
                    : `${t.places[0]} to ${t.places[t.places.length - 1]}`,
              },
            ]}
            primary={{ label: 'Book this tour', href: '#enquire' }}
          />
        </Reveal>
      </div>
    </aside>
  )
}
