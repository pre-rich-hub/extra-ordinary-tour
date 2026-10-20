import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import { Reveal } from '@/components/ui/reveal'

export function PlanJourney() {
  const copy = useCopy()

  return (
    <section
      id="plan"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/lalibela-landscape.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/75" />
      </div>

      <div className="shell relative grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">
            {copy('Plan your journey')}
          </p>
          <h2 className="max-w-[20ch] text-balance font-serif text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            {copy('Your Ethiopia, designed around you')}
          </h2>
          <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {copy(
              'Every great journey starts with a conversation. Share your dates, interests and budget, and our team in Lalibela will reply within 24 hours with an itinerary made only for you. From the rock-hewn churches to the Simien peaks and the Danakil, every day is shaped around what matters to you.',
            )}
          </p>
          <ul className="mt-10 space-y-4">
            {[
              copy('A locally based team with licensed local guides'),
              copy('Private, group and solo journeys, all tailor-made'),
              copy('Here for you 24/7, before and during your trip'),
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/90 sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {copy(item)}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  )
}
