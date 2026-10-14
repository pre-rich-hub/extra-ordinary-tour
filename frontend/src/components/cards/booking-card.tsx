import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// Pricing / planning card used on tour and destination pages: dark header,
// cream body of label–value rows, and two actions.
export function BookingCard({
  label,
  title,
  subtitle,
  rows,
  primary,
  secondary = { label: 'Ask a question', href: '/contact' },
}: {
  label: string
  title: string
  subtitle?: string
  rows: { k: string; v: string }[]
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <div className="border border-linen-edge bg-linen p-1.5 shadow-[0_24px_50px_-34px_oklch(0.185_0.012_58/0.5)]">
      <div className="bg-espresso px-6 py-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-background/60">
          {label}
        </p>
        <p className="mt-1.5 font-serif text-[1.9rem] leading-tight text-background">{title}</p>
        {subtitle && <p className="mt-0.5 text-[13px] text-background/60">{subtitle}</p>}
      </div>

      <div className="bg-parchment px-6 pb-6 pt-1.5">
        <dl className="divide-y divide-linen-edge">
          {rows.map((row) => (
            <div key={row.k} className="flex items-center justify-between gap-5 py-3.5">
              <dt className="shrink-0 text-sm text-foreground/70">{row.k}</dt>
              <dd className="text-right text-[15px] font-semibold text-foreground">{row.v}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={primary.href}
          className="group mt-5 flex w-full items-center justify-center gap-2.5 bg-copper px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-copper-deep"
        >
          {primary.label}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <Link
          href={secondary.href}
          className="mt-3 flex w-full items-center justify-center border border-copper px-5 py-[0.9rem] text-[12px] font-semibold uppercase tracking-[0.16em] text-copper transition-colors duration-300 hover:bg-copper hover:text-white"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  )
}
