import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

export function DestinationOverview({
  destination: d,
}: {
  destination: Destination
}) {
  const copy = useCopy()

  return (
    <Reveal className="lg:col-start-1 lg:row-start-1">
      <p className="eyebrow mb-5 text-accent">{copy('Why We Go')}</p>
      <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
        {copy(d.teaser)}
      </h2>
      <div className="mt-8 space-y-6">
        {d.paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
          >
            {copy(p)}
          </p>
        ))}
      </div>
    </Reveal>
  )
}
