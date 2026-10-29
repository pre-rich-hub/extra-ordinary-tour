import { useCopy } from '@/i18n/copy'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { LayoverPackage } from '../types'
import { LayoverBookingForm } from './layover-booking-form'

export function LayoverEnquiry({
  packages,
}: {
  packages: LayoverPackage[]
}) {
  const copy = useCopy()

  return (
    <section
      id="book"
      className="shell grid scroll-mt-24 gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28"
    >
      <Reveal>
        <p className="eyebrow mb-5 text-accent">{copy('Book a Layover')}</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
          {copy('Send us your flight details')}
        </h2>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {copy(
            'Your flight numbers are all we need to get started. We will check the visa requirements for your passport, recommend a suitable layover tour and coordinate a driver around your arrival and departure schedule.',
          )}
        </p>
        <ul className="mt-10 space-y-4">
          {[
            copy('Quick confirmation: we aim to respond within a few hours.'),
            copy(
              'Airport pickup: your driver will meet you at Bole International Airport at the agreed arrival time.',
            ),
            copy(
              'Private transport: enjoy your own vehicle, never a shared coach.',
            ),
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 leading-relaxed text-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
              {copy(item)}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <LayoverBookingForm
          packages={packages.map(({ slug, title, hours }) => ({
            slug,
            title,
            hours,
          }))}
        />
      </Reveal>
    </section>
  )
}
