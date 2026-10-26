import { useCopy } from '@/i18n/copy'
import { Plane, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const assurances = [
  {
    icon: Plane,
    title: 'We track your inbound flight',
    text: 'If your flight arrives late, we adjust your pickup and itinerary around the time available. Your driver stays informed of your arrival, helping you make the most of your layover.',
  },
  {
    icon: BadgeCheck,
    title: 'Visa guidance before you arrive',
    text: 'We provide practical guidance on Ethiopian visa requirements, application procedures and applicable fees before your journey. Where visa on arrival is available to you, we explain what to expect at Bole International Airport.',
  },
  {
    icon: Clock3,
    title: 'Your onward flight comes first',
    text: 'Every itinerary is planned around your departure time, airport procedures and expected traffic conditions. We allow a suitable return buffer so you can enjoy your city tour without unnecessary pressure about your connecting flight.',
  },
  {
    icon: ShieldCheck,
    title: 'Practical luggage arrangements',
    text: 'If your checked luggage is transferred directly to your final destination, you can explore with less to carry. For hand luggage, we can discuss suitable storage arrangements in advance, depending on availability and your tour plans.',
  },
]

export function LayoverAssurances() {
  const copy = useCopy()

  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('Logistics First')}
          title={copy('On a layover, timing is everything')}
          lede={copy(
            'Seeing the sights is the easy part. Planning your city tour around airport procedures, traffic conditions and your onward flight takes local knowledge and experience. We carefully plan every excursion to help you make the most of your time in Addis Ababa while allowing sufficient time to return to the airport.',
          )}
          tone="dark"
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 90}
              className="border-t border-background/20 pt-6"
            >
              <a.icon className="mb-4 h-5 w-5 text-accent" aria-hidden />
              <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                {copy(a.title)}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-background/70">
                {copy(a.text)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
