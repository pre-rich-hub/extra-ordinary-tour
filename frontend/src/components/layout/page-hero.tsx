import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

interface PageHeroProps {
  eyebrow: string
  title: string
  lede?: string
  image: string
  imageAlt: string
  crumbs?: Crumb[]
  meta?: { label: string; value: string }[]
  align?: 'left' | 'center'
  metaStyle?: 'grid' | 'chips'
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  crumbs = [],
  meta,
  align = 'left',
  metaStyle = 'grid',
}: PageHeroProps) {
  const copy = useCopy()

  return (
    <section className="relative isolate flex min-h-[74svh] items-end overflow-hidden pt-28 sm:min-h-[68svh] lg:min-h-[76vh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image || '/placeholder.svg'}
          alt={copy(imageAlt)}
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/35 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="shell pb-12 sm:pb-16 lg:pb-20">
        {crumbs.length > 0 && (
          <nav
            aria-label={copy('Breadcrumb')}
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-background/60"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-accent"
                  >
                    {copy(c.label)}
                  </Link>
                ) : (
                  <span className="text-background/90">{copy(c.label)}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 opacity-50" />
                )}
              </span>
            ))}
          </nav>
        )}

        <div
          className={
            align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'
          }
        >
          <p
            className={`eyebrow mb-5 text-accent ${align === 'center' ? 'justify-center' : ''}`}
          >
            {copy(eyebrow)}
          </p>
          <h1 className="text-balance text-[2.15rem] font-medium leading-[1.05] text-background text-shadow-soft sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {copy(title)}
          </h1>
          {lede && (
            <p
              className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed text-background/80 sm:mt-7 sm:text-lg ${
                align === 'center' ? 'mx-auto' : ''
              }`}
            >
              {copy(lede)}
            </p>
          )}
        </div>

        {meta && meta.length > 0 && metaStyle === 'chips' && (
          <dl className="mt-8 flex flex-wrap gap-2.5 sm:mt-10">
            {meta.map((m) => (
              <div
                key={m.label}
                className="flex items-baseline gap-2.5 rounded-full border border-background/25 bg-charcoal/30 px-4 py-2 backdrop-blur-sm"
              >
                <dt className="text-[10px] uppercase tracking-[0.18em] text-background/55">
                  {copy(m.label)}
                </dt>
                <dd className="font-serif text-base text-accent sm:text-lg">
                  {copy(m.value)}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {meta && meta.length > 0 && metaStyle === 'grid' && (
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden border border-background/20 bg-background/15 sm:mt-12 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-charcoal/40 px-5 py-4 sm:px-6">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-background/55">
                  {copy(m.label)}
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-background sm:text-2xl">
                  {copy(m.value)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
