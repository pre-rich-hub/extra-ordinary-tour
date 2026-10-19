import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroActions() {
  return (
    <div className="mx-auto flex w-full max-w-[540px] flex-col items-center [animation:fade-up_1s_ease_0.4s_both]">
      <Link
        href="#plan"
        className="group inline-flex h-[60px] w-full max-w-[440px] items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-12px_oklch(0.705_0.098_76/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand"
      >
        Plan My Journey
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
