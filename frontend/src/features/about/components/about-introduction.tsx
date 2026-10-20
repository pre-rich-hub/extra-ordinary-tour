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
            {copy('Travel is more than sightseeing:')}{' '}
            <em className="italic text-primary">
              {copy('it is a connection to a place and its people.')}
            </em>
          </h2>
          <div className="mt-10 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              {copy(
                "Extraordinary Ethiopia Tours is a trusted Ethiopia travel specialist and locally based tour operator. We create journeys that showcase the country's ancient history, diverse cultures and spectacular landscapes, with the professional, personal and flexible service that only a local team can give.",
              )}
            </p>
            <p>
              {copy(
                'We specialise in custom-designed private tours and carefully organised group tours for solo travellers, couples, families and friends. Whether it is your first visit or your fifth, every itinerary is shaped around your interests, travel style and budget, and our tours can be combined into one complete journey.',
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
                src="/images/lalibela-pilgrims.jpg"
                alt={copy(
                  'Priests holding processional crosses during a celebration in Lalibela',
                )}
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-sm">
              <Image
                src="/images/coffee-ceremony.jpg"
                alt={copy(
                  'A jebena and cups prepared for an Ethiopian coffee ceremony',
                )}
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-4 col-start-3 row-span-3 row-start-6 overflow-hidden rounded-sm shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
              <Image
                src="/images/simien-landscape.jpg"
                alt={copy(
                  'Basalt pinnacles of the Simien Mountains rising above the clouds',
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
                {copy('Peoples & languages to discover')}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
