// Small admin-only UI primitives. Kept utilitarian on purpose: this is an
// internal tool, so these are plain class strings around design tokens from
// globals.css (parchment background, highland green primary, antique gold
// accent, charcoal sidebar). No component library beyond @/components/ui/button.

import { Loader2 } from 'lucide-react'

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20" aria-label="Loading">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  )
}

export function AdminFeedback({
  message,
  tone = 'error',
}: {
  message: string
  tone?: 'error' | 'success'
}) {
  if (!message) return null
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
        tone === 'error'
          ? 'border-destructive/30 bg-destructive/10 text-destructive'
          : 'border-emerald-600/30 bg-emerald-600/10 text-emerald-700'
      }`}
    >
      {message}
    </p>
  )
}

export const adminInputClass =
  'w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

export const adminLabelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export const adminPanelClass =
  'rounded-xl border border-border bg-card p-6 shadow-sm'

export const adminPrimaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50'

export const adminSecondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50'