import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  {
    n: '01',
    title: 'You tell us what you have in mind',
    text: 'Start with a few details: your travel dates, interests, preferred travel style, group size and budget. Or simply tell us which tour caught your eye. We’ll take it from there.',
  },
  {
    n: '02',
    title: 'We design your itinerary',
    text: 'Within 24 hours, we’ll respond to your enquiry, check availability and send you a tailored itinerary with clear pricing for your dates and group.',
  },
  {
    n: '03',
    title: 'We refine every detail',
    text: 'Want to add a festival, include a trek, stay an extra night or replace a long drive with a flight? We’ll adjust the route and fine-tune the details until the journey feels right for you.',
  },
  {
    n: '04',
    title: 'We welcome you to Ethiopia',
    text: 'From your arrival at Bole International Airport to the final day of your tour, we’re here to help. Enjoy carefully arranged travel, knowledgeable local guides and support from our team throughout your journey, including 24-hour assistance for urgent travel needs.',
  },
]

export function PlanningSteps() {
  const copy = useCopy()

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('What Happens Next')}
          title={copy('How we plan your journey')}
          aside={copy(
            'Four simple steps from your first enquiry to your arrival in Ethiopia.',
          )}
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 90}
              className="border-t border-border pt-6"
            >
              <p className="font-serif text-3xl text-accent">{copy(s.n)}</p>
              <p className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                {copy(s.title)}
              </p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {copy(s.text)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
