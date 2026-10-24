import { useCopy } from '@/i18n/copy'
import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  // Makes the eyebrow a link, e.g. to the section's full listing.
  eyebrowHref?: string
  title: string
  lede?: string
  aside?: string
  action?: { href: string; label: string }
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  // On phones, show only the eyebrow; the title stays for screen readers.
  compactOnMobile?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  eyebrowHref,
  title,
  lede,
  aside,
  action,
  tone = 'light',
  align = 'left',
  compactOnMobile = false,
  className,
}: SectionHeadingProps) {
  const copy = useCopy()

  const heading = tone === 'dark' ? 'text-background' : 'text-foreground'
  const body = tone === 'dark' ? 'text-background/70' : 'text-muted-foreground'

  return (
    <Reveal
      className={cn(
        'mb-10 sm:mb-14',
        aside || action
          ? 'flex flex-col justify-between gap-6 md:flex-row md:items-end'
          : align === 'center'
            ? 'mx-auto max-w-2xl text-center'
            : 'max-w-2xl',
        compactOnMobile && 'max-sm:mb-6',
        className,
      )}
    >
      <div className={align === 'center' && !aside ? 'mx-auto' : undefined}>
        <p
          className={cn(
            'eyebrow text-accent sm:mb-5',
            compactOnMobile ? 'mb-0' : 'mb-4',
            align === 'center' && !aside && 'justify-center',
          )}
        >
          {eyebrowHref ? (
            <Link
              href={eyebrowHref}
              className="-my-3 inline-flex touch-manipulation items-center gap-2 py-3 [-webkit-tap-highlight-color:transparent] transition-[opacity,transform] duration-150 active:scale-95 active:opacity-60"
            >
              {copy(eyebrow)}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : (
            copy(eyebrow)
          )}
        </p>
        <h2
          className={cn(
            'text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl',
            heading,
            compactOnMobile && 'max-sm:sr-only',
          )}
        >
          {copy(title)}
        </h2>
        {lede && (
          <p
            className={cn('mt-5 text-pretty leading-relaxed sm:text-lg', body)}
          >
            {copy(lede)}
          </p>
        )}
      </div>
      {(aside || action) && (
        <div
          className={cn(
            'flex max-w-sm shrink-0 flex-col items-start gap-5',
            compactOnMobile && 'max-sm:hidden',
          )}
        >
          {aside && (
            <p
              className={cn(
                'text-pretty text-sm leading-relaxed sm:text-base',
                body,
              )}
            >
              {copy(aside)}
            </p>
          )}
          {action && (
            <TextLink
              href={action.href}
              tone={tone === 'dark' ? 'accent' : 'primary'}
            >
              {copy(action.label)}
            </TextLink>
          )}
        </div>
      )}
    </Reveal>
  )
}
