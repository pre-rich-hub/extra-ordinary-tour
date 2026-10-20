import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { getPromises } from '@/features/about/data/localized'

export function JourneyPromises() {
  const copy = useCopy()
  const promises = getPromises(useLocale() as AppLocale)

  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy('How We Work')}
          title={copy('What is true of every journey on this page')}
          tone="dark"
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="border-t border-background/20 pt-6"
            >
              <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                {copy(p.title)}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-background/70">
                {copy(p.text)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
