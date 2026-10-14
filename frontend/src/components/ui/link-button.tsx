import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'gold' | 'outline' | 'outlineLight'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-sm px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 sm:py-4 sm:text-xs'

const variants: Record<Variant, string> = {
  solid:
    'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90',
  gold: 'bg-accent text-accent-foreground hover:-translate-y-0.5 hover:bg-accent/90',
  outline:
    'border border-foreground/20 text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground',
  outlineLight:
    'border border-background/40 text-background hover:border-accent hover:bg-accent hover:text-accent-foreground',
}

export function LinkButton({
  href,
  children,
  variant = 'solid',
  className,
  withArrow = true,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  withArrow?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], 'w-full sm:w-auto', className)}
    >
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  )
}

export function TextLink({
  href,
  children,
  className,
  tone = 'primary',
}: {
  href: string
  children: React.ReactNode
  className?: string
  tone?: 'primary' | 'accent'
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-xs',
        tone === 'primary'
          ? 'text-primary hover:text-accent'
          : 'text-accent hover:text-background',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover:translate-x-1" />
    </Link>
  )
}
