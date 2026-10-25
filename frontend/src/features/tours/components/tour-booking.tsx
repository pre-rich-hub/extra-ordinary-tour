import { useCopy } from '@/i18n/copy'
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
            label={
              hasPrice(t.from) ? copy('Pricing') : copy('Tailor-Made Journey')
            }
            title={
              hasPrice(t.from)
                ? copy('From {v0}', { v0: priceShort(t.from) })
                : copy('Priced to Your Plans')
            }
            subtitle={
              hasPrice(t.from)
                ? copy('per person, twin share')
                : copy(
                    'Quoted individually once we know your travel dates, accommodation preferences, and group size.',
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
              {
                k: 'Start & finish',
                v:
                  t.places[0] === t.places[t.places.length - 1]
                    ? t.places[0]
                    : copy('{v0} to {v1}', {
                        v0: t.places[0],
                        v1: t.places[t.places.length - 1],
                      }),
              },
            ]}
            primary={{ label: copy('Book this tour'), href: '#enquire' }}
          />
        </Reveal>
      </div>
    </aside>
  )
}
