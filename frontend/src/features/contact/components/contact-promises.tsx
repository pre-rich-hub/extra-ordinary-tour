import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { promises } from '@/features/about/data/company'

export function ContactPromises() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
      <SectionHeading
        eyebrow="Our Promise"
        title="What you get from working with us"
        align="center"
      />
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {promises.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 90}
            className="border-t border-border pt-6"
          >
            <p className="mb-3 font-serif text-xl text-foreground sm:text-2xl">
              {p.title}
            </p>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {p.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
