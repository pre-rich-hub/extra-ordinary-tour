import { useCopy } from '@/i18n/copy'
const places = [
  'Lalibela',
  'Gondar',
  'Axum',
  'Simien Mountains',
  'Lake Tana',
  'Harar',
  'Danakil Depression',
  'Omo Valley',
  'Bale Mountains',
  'Gheralta',
  'Addis Ababa',
  'Konso',
]

export function PlacesMarquee() {
  const copy = useCopy()

  return (
    <section
      aria-label={copy('Places we travel')}
      className="overflow-hidden border-b border-border bg-linen py-8 sm:py-10"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((repeat) => (
          <ul
            key={repeat}
            aria-hidden={repeat === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {places.map((p) => (
              <li key={p} className="flex items-center">
                <span className="whitespace-nowrap px-8 font-serif text-3xl italic text-espresso/80 sm:px-12 sm:text-5xl">
                  {copy(p)}
                </span>
                <span aria-hidden className="h-2 w-2 rotate-45 bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
