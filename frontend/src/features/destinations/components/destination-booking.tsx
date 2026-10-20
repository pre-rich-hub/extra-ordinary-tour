import { BookingCard } from '@/components/cards/booking-card'
import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

export function DestinationBooking({ destination: d }: { destination: Destination }) {
  return (
    <aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
      <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label="Plan your visit"
            title={d.name}
            subtitle={`${d.tag} · ${d.region}`}
            rows={[
              { k: 'Suggested stay', v: d.duration },
              { k: 'Best time', v: d.bestTime },
              { k: 'Altitude', v: d.altitude },
              { k: 'Region', v: d.region },
            ]}
            primary={{ label: 'Plan this trip', href: '#enquire' }}
          />
        </Reveal>
      </div>
    </aside>
  )
}
