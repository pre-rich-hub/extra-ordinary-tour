import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import type { Tour } from '../types'

export function TourItinerary({ tour: t }: { tour: Tour }) {
  const copy = useCopy()

  return (
    <div className="border-t border-border pt-16 sm:pt-20 lg:col-start-1 lg:row-start-2 lg:mt-20 lg:pt-20">
      <Reveal className="mb-12 max-w-2xl sm:mb-16">
        <p className="eyebrow mb-5 text-accent">{copy('Day by Day')}</p>
        <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
          {copy('The itinerary, as it usually runs')}
        </h2>
        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {copy(
            'A working draft rather than a fixed schedule. We move days around for weather, festivals and how you are feeling.',
          )}
        </p>
      </Reveal>

      <ol className="relative border-l border-border pl-8 sm:pl-12">
        {t.itinerary.map((step, i) => (
          <Reveal
            key={step.day}
            delay={i * 70}
            as="li"
            className="relative pb-10 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute -left-[38px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-4 ring-background sm:-left-[54px]"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[11px]">
              {copy(step.day)}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-[1.75rem]">
              {copy(step.title)}
            </h3>
            <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {copy(step.text)}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
