import { useCopy } from '@/i18n/copy'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { slogan } from '@/config/site'

export function AboutIntroduction() {
  const copy = useCopy()

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black_5%,transparent_65%)]"
      />
      <div className="shell relative grid gap-16 py-24 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">{copy('Who we are')}</p>
          <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]">
            {copy('Travel is more than sightseeing.')}{' '}
            <em className="italic text-primary">
              {copy('It is a connection to a place and its people.')}
            </em>
          </h2>
          <div className="mt-10 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              {copy(
                "Extraordinary Ethiopia Tours is a locally owned tour operator based in Lalibela, specializing in journeys across Ethiopia. We bring the country's ancient history, diverse cultures and remarkable landscapes to life through thoughtful planning, first-hand local knowledge and personal service.",
              )}
            </p>
            <p>
              {copy(
                'We organize tailor-made private tours and carefully coordinated group journeys for solo travellers, couples, families and friends. Whether you are visiting Ethiopia for the first time or returning to discover more, we shape each itinerary around your interests, travel style and budget. You can also combine destinations and experiences to create a single journey that reflects your own vision of Ethiopia.',
              )}
            </p>
          </div>
          <p className="mt-10 border-l-2 border-accent pl-5 font-serif text-2xl italic text-foreground sm:text-[1.7rem]">
            {copy(slogan)}
          </p>
        </Reveal>

        {/* Staggered collage */}
        <Reveal delay={150} className="relative">
          <div className="grid aspect-[5/6] grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] gap-4 sm:gap-5 lg:aspect-auto lg:h-full lg:min-h-[620px]">
            <div className="relative col-span-4 row-span-5 overflow-hidden rounded-sm shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
              <Image
                src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792852734/3-Day_Lalibela_Rock-Hewn_Churches.jpg"
                alt={copy(
                  'Pilgrims in white shawls walking among the rock-hewn churches of Lalibela',
                )}
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-sm">
              <Image
                src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792851938/enkutatesh.png"
                alt={copy(
                  'Yellow Adey Abeba daisies, the flowers of the Ethiopian New Year',
                )}
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-4 col-start-3 row-span-3 row-start-6 overflow-hidden rounded-sm shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
              <Image
                src="https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849798/Simien_Mountains.png"
                alt={copy(
                  'A gelada, the grass-grazing monkey found only in the Ethiopian highlands.',
                )}
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-2 col-start-1 row-span-3 row-start-6 flex flex-col justify-end border border-border bg-card p-4 sm:p-6">
              <span className="font-serif text-4xl leading-none text-accent sm:text-5xl">
                80+
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-muted-foreground">
                {copy('Ethnic groups & languages to discover')}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
