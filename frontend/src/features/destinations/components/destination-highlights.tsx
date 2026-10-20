import { useCopy } from '@/i18n/copy'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

export function DestinationHighlights({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  return (
    <Reveal className="border-t border-border pt-12 lg:col-start-1 lg:row-start-2 lg:mt-14">
      <p className="eyebrow mb-6 text-primary">{copy('Highlights')}</p>
      <ul className="grid gap-5 sm:grid-cols-2 sm:gap-x-10">
        {d.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
              {copy(h)}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
