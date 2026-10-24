import { LegalPage, legalMetadata } from '@/features/legal/server/legal-page'

type Params = { params: Promise<{ locale: string }> }

export function generateMetadata(props: Params) {
  return legalMetadata(
    props,
    '/terms-and-conditions',
    'Terms & Conditions',
    'Booking, payment, cancellation and travel terms for tours with Extraordinary Ethiopia Tours: 30% deposit, balance 30 days before arrival.',
  )
}

export default function TermsPage(props: Params) {
  return (
    <LegalPage
      {...props}
      path="/terms-and-conditions"
      label="Terms & Conditions"
      document="termsAndConditions"
    />
  )
}
