import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export type FaqItem = { question: string; answer: ReactNode }

/** Visible questions and answers. No FAQPage markup by design (geo.md, G2). */
export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: FaqItem[]
}) {
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal
            key={item.question}
            delay={(i % 2) * 90}
            className="border-t border-border pt-6"
          >
            <h3 className="mb-3 font-serif text-xl text-foreground sm:text-2xl">
              {item.question}
            </h3>
            <div className="text-pretty leading-relaxed text-muted-foreground">
              {item.answer}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
