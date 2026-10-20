import { Plane, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const assurances = [
  {
    icon: Plane,
    title: 'We track your inbound flight',
    text: 'If you land two hours late, your driver is still there and the day is reshaped around the time you actually have.',
  },
  {
    icon: BadgeCheck,
    title: 'Visa on arrival, handled',
    text: 'Most nationalities can buy a visa at Bole. We send the exact steps, the cost, and someone waiting on the other side of it.',
  },
  {
    icon: Clock3,
    title: 'Back three hours early',
    text: 'Every itinerary is timed to return you to the terminal three hours before your onward departure. We do not gamble with connections.',
  },
  {
    icon: ShieldCheck,
    title: 'Luggage stays safe',
    text: 'Checked through to your final destination in most cases. Hand luggage travels locked in the vehicle or in a day-room safe.',
  },
]

export function LayoverAssurances() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Logistics First"
          title="On a layover, timing is the whole product"
          lede="Sights are easy. Not missing your onward flight is the part that takes experience."
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
                {a.title}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-background/70">
                {a.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
