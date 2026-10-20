import { Reveal } from '@/components/ui/reveal'
import { NewsletterForm } from './newsletter-form'

export function NewsletterSection() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            The Letter
          </p>
          <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
            One letter a season, no more than that
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-background/70">
            Festival dates worth planning around, new itineraries and the
            occasional honest word about where to go this season.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:justify-self-end">
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  )
}
