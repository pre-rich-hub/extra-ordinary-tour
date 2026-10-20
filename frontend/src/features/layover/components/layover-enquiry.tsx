import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'

export function LayoverEnquiry() {
  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
      <Reveal>
        <p className="eyebrow mb-5 text-accent">
          Book a Layover
        </p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
          Send us your flight numbers
        </h2>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          That is genuinely all we need to start. We will confirm the visa
          position for your passport, propose the right package, and hold a
          driver for the window.
        </p>
        <ul className="mt-10 space-y-4">
          {[
            'Confirmed within a few hours, not days',
            'Met at Bole whatever your arrival time',
            'Private vehicle, never a shared coach',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 leading-relaxed text-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <EnquiryForm subject="Addis Ababa layover tour" defaultStyles={['Layover']} />
      </Reveal>
    </section>
  )
}
