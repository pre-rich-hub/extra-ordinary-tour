import { LegalPage, legalMetadata } from '@/features/legal/server/legal-page'
import { privacyPolicy } from '@/features/legal/data/privacy-policy'

type Params = { params: Promise<{ locale: string }> }

export function generateMetadata(props: Params) {
  return legalMetadata(
    props,
    '/privacy-policy',
    'Privacy Policy',
    'How Extraordinary Ethiopia Tours collects, uses, shares and protects the personal information of website visitors and travellers.',
  )
}

export default function PrivacyPolicyPage(props: Params) {
  return (
    <LegalPage
      {...props}
      path="/privacy-policy"
      label="Privacy Policy"
      document={privacyPolicy}
    />
  )
}
