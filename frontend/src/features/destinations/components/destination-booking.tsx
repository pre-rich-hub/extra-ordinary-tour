import { useCopy } from '@/i18n/copy'
import { BookingCard } from '@/components/cards/booking-card'
import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

export function DestinationBooking({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  return (
    <aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
      <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label={copy('Plan your visit')}
            title={copy(d.name)}
            subtitle={copy('{v0} · {v1}', { v0: d.tag, v1: d.region })}
            rows={[
              { k: 'Suggested stay', v: d.duration },
              { k: 'Best time', v: d.bestTime },
              { k: 'Altitude', v: d.altitude },
              { k: 'Region', v: d.region },
            ]}
            primary={{ label: copy('Plan this trip'), href: '#enquire' }}
          />
        </Reveal>
      </div>
    </aside>
  )
}
