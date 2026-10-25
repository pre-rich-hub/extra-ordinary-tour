import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'

// One chapter of a long-form guide page; records arrive already localized.
export type GuideSection = {
  id: string
  // Short label for the sticky in-page navigation.
  label: string
  eyebrow: string
  title: string
  paragraphs: string[]
  facts?: { label: string; value: string }[]
  links?: { label: string; href: string }[]
  image?: string
  imageAlt?: string
}

/** Long-form chapters: heading and photo beside prose, facts and links. */
export function GuideSections({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="shell divide-y divide-border">
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="grid scroll-mt-36 gap-10 py-16 sm:py-20 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-24"
        >
          <Reveal>
            <p className="eyebrow mb-4 text-accent">{s.eyebrow}</p>
            <h2
              id={`${s.id}-title`}
              className="text-balance font-serif text-3xl leading-[1.1] text-foreground sm:text-4xl"
            >
              {s.title}
            </h2>
            {s.image && (
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={s.image}
                  alt={s.imageAlt ?? ''}
                  className="object-cover"
                />
              </div>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-[17px]">
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {s.facts && (
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                {s.facts.map((f) => (
                  <div key={f.label} className="bg-card p-5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-pretty text-foreground">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {s.links && (
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {s.links.map((l) => (
                  <TextLink key={l.href} href={l.href}>
                    {l.label}
                  </TextLink>
                ))}
              </div>
            )}
          </Reveal>
        </section>
      ))}
    </div>
  )
}
