import Link from 'next/link'
import {
  ArrowRight,
  Leaf,
  MapPin,
  MessageCircle,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { reviewSummaries, slogan, whyUs } from '@/content'

const icons: Record<(typeof whyUs)[number]['icon'], LucideIcon> = {
  local: MapPin,
  tailored: SlidersHorizontal,
  handled: Route,
  support: MessageCircle,
  safety: ShieldCheck,
  responsible: Leaf,
}

export function WhyTravel() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        {/* Heading */}
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow mb-5 text-accent">
              <span className="h-px w-10 bg-accent" />
              The Extraordinary Difference
            </p>
            <h2
              id="why-us-title"
              className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem]"
            >
              Why travel with us<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[46ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              A small local team, a country we know by heart, and six things
              you can count on from your first message to your flight home.
            </p>
            <p className="mt-3 font-serif text-lg italic text-primary">{slogan}</p>
          </div>
        </Reveal>

        {/* Reasons */}
        <ul className="mt-14 grid gap-px border-y border-border bg-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((r, i) => {
            const Icon = icons[r.icon]
            return (
              <Reveal
                key={r.title}
                as="li"
                delay={(i % 3) * 80}
                className="group relative bg-background px-1 py-9 transition-colors duration-300 hover:bg-card sm:px-8 sm:py-10"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-primary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="font-serif text-sm tabular-nums text-muted-foreground/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl text-foreground">{r.title}</h3>
                <p className="mt-3 max-w-[38ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
              </Reveal>
            )
          })}
        </ul>

        {/* Proof bar */}
        <Reveal className="mt-12 flex flex-col gap-8 sm:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12">
            {reviewSummaries.map((s) => (
              <div key={s.platform}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {s.platform}
                </dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-foreground">
                  <span className="font-serif text-3xl leading-none">{s.rating?.toFixed(1)}</span>
                  <Star aria-hidden className="h-4 w-4 fill-accent text-accent" strokeWidth={1} />
                  <span className="ml-1 text-[13px] text-muted-foreground">{s.count} reviews</span>
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Experience
              </dt>
              <dd className="mt-1.5 font-serif text-3xl leading-none text-foreground">10+ years</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Support
              </dt>
              <dd className="mt-1.5 font-serif text-3xl leading-none text-foreground">24/7</dd>
            </div>
          </dl>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 self-start rounded-full bg-primary px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground lg:self-auto"
          >
            Plan your journey
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
