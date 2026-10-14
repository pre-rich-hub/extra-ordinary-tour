import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { InfoCard } from '@/components/cards/info-card'
import type { Tour } from '@/types'
import { hasPrice, nightsLabel, priceShort } from '@/lib/utils'

export function TourCard({
  tour: t,
  sizes,
}: {
  tour: Tour
  sizes?: string
}) {
  const [kind] = t.style.split(' · ')
  return (
    <InfoCard
      href={`/tours/${t.slug}`}
      image={t.image}
      imageAlt={t.title}
      badge={kind}
      eyebrow={hasPrice(t.from) ? `From ${priceShort(t.from)} per person` : 'Price on request'}
      title={t.title}
      summary={t.teaser}
      facts={[
        { icon: MapPin, label: `${t.places.length} places` },
        { icon: Users, label: t.group },
        { icon: Clock, label: t.season },
        { icon: CalendarDays, label: t.nights ? `${t.days} · ${nightsLabel(t.nights)}` : t.days },
      ]}
      sizes={sizes}
    />
  )
}
