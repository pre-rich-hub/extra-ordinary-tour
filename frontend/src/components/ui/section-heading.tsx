import { Reveal } from '@/components/ui/reveal'
import { TextLink } from '@/components/ui/link-button'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  lede?: string
  aside?: string
  action?: { href: string; label: string }
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  aside,
  action,
  tone = 'light',
  align = 'left',
  className,
}: SectionHeadingProps) {
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
        className,
      )}
    >
      <div className={align === 'center' && !aside ? 'mx-auto' : undefined}>
        <p
          className={cn(
            'eyebrow mb-4 text-accent sm:mb-5',
            align === 'center' && !aside && 'justify-center',
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            'text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl',
            heading,
          )}
        >
          {title}
        </h2>
        {lede && (
          <p className={cn('mt-5 text-pretty leading-relaxed sm:text-lg', body)}>
            {lede}
          </p>
        )}
      </div>
      {(aside || action) && (
        <div className="flex max-w-sm shrink-0 flex-col items-start gap-5">
          {aside && (
            <p
              className={cn(
                'text-pretty text-sm leading-relaxed sm:text-base',
                body,
              )}
            >
              {aside}
            </p>
          )}
          {action && (
            <TextLink
              href={action.href}
              tone={tone === 'dark' ? 'accent' : 'primary'}
            >
              {action.label}
            </TextLink>
          )}
        </div>
      )}
    </Reveal>
  )
}
