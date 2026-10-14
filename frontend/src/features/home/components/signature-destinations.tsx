import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { DestinationFeatureCard } from '@/features/destinations/components/destination-card'
import { LinkButton } from '@/components/ui/link-button'
import { destinations } from '@/content'

export function SignatureDestinations() {
  const featured = destinations.slice(0, 6)

  return (
    <section id="destinations" className="bg-muted/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Signature Destinations"
          title="Top destinations loved by travellers"
          aside="From rock-hewn churches and walled cities to volcanic lowlands and Afro-alpine plateaus, each region reveals a different chapter of Ethiopia's story."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 120}>
              <DestinationFeatureCard destination={d} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center sm:mt-14">
          <LinkButton href="/destinations" variant="outline">
            Explore All Destinations
          </LinkButton>
        </Reveal>
      </div>
    </section>
  )
}
