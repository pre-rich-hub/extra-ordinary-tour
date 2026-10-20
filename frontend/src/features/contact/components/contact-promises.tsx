import { useLocale } from 'next-intl'
import type { AppLocale } from '@/i18n/routing'
import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { getPromises } from '@/features/about/data/localized'

export function ContactPromises() {
  const copy = useCopy()
  const promises = getPromises(useLocale() as AppLocale)

  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
      <SectionHeading
        eyebrow={copy('Our Promise')}
        title={copy('What you get from working with us')}
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
              {copy(p.title)}
            </p>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {copy(p.text)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
