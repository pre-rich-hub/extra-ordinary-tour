import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  {
    n: '01',
    title: 'You write, we listen',
    text: 'A sentence is enough to start: your dates, interests, travel style, group size and budget, or the package that caught your eye.',
  },
  {
    n: '02',
    title: 'We draft a route',
    text: 'Within 24 hours our team confirms availability and sends an itinerary and a clear quote for your dates and group.',
  },
  {
    n: '03',
    title: 'We redraw it',
    text: 'Add a festival, a trek or an extra night; swap a drive for a flight. We adjust the plan until it is exactly right for you.',
  },
  {
    n: '04',
    title: 'We are there',
    text: 'Met at Bole International Airport whatever your arrival time, guided throughout, and supported by our team 24 hours a day.',
  },
]

export function PlanningSteps() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="What Happens Next"
          title="How we plan your journey"
          aside="Four simple steps from first message to your arrival in Ethiopia."
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 90}
              className="border-t border-border pt-6"
            >
              <p className="font-serif text-3xl text-accent">{s.n}</p>
              <p className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                {s.title}
              </p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
