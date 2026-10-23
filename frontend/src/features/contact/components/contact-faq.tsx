import { useCopy } from '@/i18n/copy'
import { Link } from '@/i18n/navigation'
import { Faq } from '@/components/ui/faq'

const link = 'text-primary underline underline-offset-4 hover:text-accent'

// Answers restate what the site, tour catalogue and terms already publish;
// add questions here only with facts the client has confirmed.
export function ContactFaq() {
  const copy = useCopy()

  return (
    <Faq
      eyebrow={copy('Planning Questions')}
      title={copy('What travellers ask before they write')}
      items={[
        {
          question: copy('Do you run private tours or group tours?'),
          answer: copy(
            'Both. We specialise in custom-designed private tours and carefully organised group tours for solo travellers, couples, families and friends.',
          ),
        },
        {
          question: copy('Can I change an itinerary?'),
          answer: copy(
            'Yes. Every tour on this site is a starting point. Tell us how long you have and what you want to see, and our team will plan the route, including the flights, the guides and the timing.',
          ),
        },
        {
          question: copy('How quickly will you reply?'),
          answer: copy(
            'Within 24 hours, and usually the same day. We confirm availability and send an itinerary and a clear quote for your dates and group.',
          ),
        },
        {
          question: copy('How do I book and pay?'),
          answer: (
            <>
              {copy(
                'A 30% deposit of the total tour price secures your booking. The remaining 70% is due at least 30 days before arrival; if you book less than 30 days ahead, full payment may be required at booking.',
              )}{' '}
              <Link href="/terms-and-conditions" className={link}>
                {copy('Read the booking terms')}
              </Link>
            </>
          ),
        },
        {
          question: copy('What is included in a tour?'),
          answer: copy(
            'Every tour includes a guide, and each tour page lists exactly what its price covers. On most tours, international flights, the Ethiopian visa and travel insurance are not included.',
          ),
        },
        {
          question: copy('Do I need a visa for Ethiopia?'),
          answer: (
            <>
              {copy(
                'That depends on your passport. When you enquire, we confirm the visa position for your nationality. Ethiopia’s official e-visa service is',
              )}{' '}
              <a
                href="https://www.evisa.gov.et"
                className={link}
                rel="noopener"
                target="_blank"
              >
                evisa.gov.et
              </a>
              .
            </>
          ),
        },
        {
          question: copy(
            'Where are you based, and can we reach you during the trip?',
          ),
          answer: copy(
            'Our team is based in Lalibela and supports you 24 hours a day, before and during your trip.',
          ),
        },
      ]}
    />
  )
}
