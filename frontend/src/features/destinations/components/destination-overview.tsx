import { Reveal } from '@/components/ui/reveal'
import type { Destination } from '../types'

export function DestinationOverview({ destination: d }: { destination: Destination }) {
  return (
    <Reveal className="lg:col-start-1 lg:row-start-1">
      <p className="eyebrow mb-5 text-accent">
        Why We Go
      </p>
      <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
        {d.teaser}
      </h2>
      <div className="mt-8 space-y-6">
        {d.paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  )
}
