import { useCopy } from '@/i18n/copy'
import { Check, X } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function TourInclusions({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
      <Reveal>
        <p className="eyebrow mb-6 text-primary">{copy('What Is Included')}</p>
        <ul className="space-y-4">
          {t.includes.map((item) => (
            <li key={item} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-pretty leading-relaxed text-foreground">
                {copy(item)}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120}>
        <p className="eyebrow mb-6 text-muted-foreground">
          {copy('Not Included')}
        </p>
        <ul className="space-y-4">
          {t.excludes.map((item) => (
            <li key={item} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                <X className="h-3 w-3" />
              </span>
              <span className="text-pretty leading-relaxed text-muted-foreground">
                {copy(item)}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
