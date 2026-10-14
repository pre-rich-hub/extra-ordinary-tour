import { TourRail } from '@/features/home/components/tour-rail'
import { tours as staticTours } from '@/content'
import type { Tour } from '@/types'

export function FeaturedTours({ tours = staticTours }: { tours?: Tour[] }) {
  const featured = tours.filter((t) => t.featured)

  return (
    <section
      id="tours"
      aria-labelledby="tours-title"
      className="relative isolate overflow-hidden bg-secondary py-20 text-secondary-foreground sm:py-24 lg:py-28"
    >
      <Contours />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_50%,oklch(0.42_0.06_48/0.4),transparent_60%)]" />
      <TourRail tours={featured} />
    </section>
  )
}

// Faint hand-drawn contour lines behind the rail, like a topographic map of
// the highlands.
function Contours() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-[140%] w-auto -translate-y-1/2 text-sand opacity-[0.07]"
      viewBox="0 0 600 800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {Array.from({ length: 9 }, (_, i) => {
        const k = i * 26
        return (
          <path
            key={i}
            d={`M ${120 + k * 0.4} ${700 - k * 0.3}
                C ${-40 + k} ${520 - k * 0.2}, ${60 + k * 0.6} ${260 + k * 0.3}, ${260 + k * 0.2} ${220 + k * 0.5}
                S ${560 - k * 0.6} ${330 + k * 0.2}, ${470 - k * 0.5} ${520 - k * 0.4}
                S ${260 + k * 0.3} ${760 - k * 0.6}, ${120 + k * 0.4} ${700 - k * 0.3}`}
          />
        )
      })}
    </svg>
  )
}
