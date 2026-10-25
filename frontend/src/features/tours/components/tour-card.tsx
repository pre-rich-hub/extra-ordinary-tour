import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { useCopy } from '@/i18n/copy'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { InfoCard } from '@/components/cards/info-card'
import type { TourCardData } from '../types'
import { hasPrice, nightsLabel, priceShort } from '../lib/format'

export function TourCard({
  tour: t,
  sizes,
}: {
  tour: TourCardData
  sizes?: string
}) {
  const copy = useCopy()
  const locale = useLocale() as AppLocale

  const [kind] = t.style.split(' · ')
  return (
    <InfoCard
      href={`/tours/${t.slug}`}
      image={t.image}
      imageAlt={copy(t.title)}
      badge={kind}
      eyebrow={
        hasPrice(t.from)
          ? copy('From {v0} per person', { v0: priceShort(t.from) })
          : copy('Designed Around You')
      }
      title={copy(t.title)}
      summary={t.teaser}
      facts={[
        { icon: MapPin, label: copy('{v0} places', { v0: t.places.length }) },
        { icon: Users, label: t.group },
        { icon: Clock, label: t.season },
        {
          icon: CalendarDays,
          label: t.nights
            ? `${t.days} · ${nightsLabel(t.nights, locale)}`
            : t.days,
        },
      ]}
      sizes={sizes}
    />
  )
}
