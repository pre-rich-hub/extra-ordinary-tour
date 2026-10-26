import type { LegalDocument } from '../types'

// Verbatim English text of the client's published Privacy Policy
// (extraordinaryethiopiatours.com/privacy-policy/, captured 2026-10-21).
// Keep locales/es.json, fr.json and de.json in step with any change here.
export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  intro: [
    {
      type: 'paragraph',
      lines: [
        'At Extraordinary Ethiopia Tours, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, contact us, make an inquiry, or use our travel and tour services.',
      ],
    },
  ],
  sections: [
    {
      heading: '1. Information We Collect',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We may collect personal information that you voluntarily provide to us, including:',
          ],
        },
        {
          type: 'list',
          items: [
            'Full name',
            'Email address',
            'Telephone or WhatsApp number',
            'Country of residence',
            'Travel dates and preferences',
            'Number of travelers',
            'Accommodation or transportation requirements',
            'Passport or other travel information when necessary for a booking',
            'Payment and billing information when required',
            'Any other information you provide when contacting or booking with us',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We may also automatically collect limited technical information, such as your IP address, browser type, device information, and pages visited on our website.',
          ],
        },
      ],
    },
    {
      heading: '2. How We Use Your Information',
      content: [
        {
          type: 'paragraph',
          lines: ['Extraordinary Ethiopia Tours may use your information to:'],
        },
        {
          type: 'list',
          items: [
            'Respond to your questions and travel inquiries',
            'Prepare customized itineraries and quotations',
            'Process and manage tour bookings',
            'Arrange accommodation, transportation, guides, activities, and other travel services',
            'Communicate with you about your trip',
            'Process payments where applicable',
            'Improve our website, tours, and customer service',
            'Send travel-related information or promotional communications where you have agreed to receive them',
            'Meet legal, accounting, and administrative requirements',
          ],
        },
      ],
    },
    {
      heading: '3. Sharing Your Information',
      content: [
        {
          type: 'paragraph',
          lines: ['We do not sell or rent your personal information.'],
        },
        {
          type: 'paragraph',
          lines: [
            'We may share relevant information with trusted third parties when necessary to provide the services you request. These may include:',
          ],
        },
        {
          type: 'list',
          items: [
            'Hotels and accommodation providers',
            'Airlines and transportation providers',
            'Local guides and activity providers',
            'Payment service providers',
            'Travel partners and service providers',
            'Government or regulatory authorities where required by law',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We only seek to provide these parties with information that is reasonably necessary for the relevant service.',
          ],
        },
      ],
    },
    {
      heading: '4. Payment Information',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Where payments are made through third-party payment providers, your payment information may be processed directly by those providers according to their own privacy policies and security practices.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours does not intentionally retain complete credit or debit card information unless it is necessary and lawfully permitted to do so.',
          ],
        },
      ],
    },
    {
      heading: '5. Cookies',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Our website may use cookies and similar technologies to improve website functionality, understand how visitors use our website, and improve your browsing experience.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'You can adjust your browser settings to refuse or delete cookies. However, some website features may not function properly if cookies are disabled.',
          ],
        },
      ],
    },
    {
      heading: '6. Data Security',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We take reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, misuse, alteration, or disclosure.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'However, no method of transmitting or storing information online can be guaranteed to be completely secure.',
          ],
        },
      ],
    },
    {
      heading: '7. How Long We Keep Your Information',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing our services, maintaining business records, resolving disputes, and complying with legal or accounting obligations.',
          ],
        },
      ],
    },
    {
      heading: '8. Your Privacy Rights',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Depending on applicable law, you may have rights regarding your personal information, including the right to:',
          ],
        },
        {
          type: 'list',
          items: [
            'Request access to information we hold about you',
            'Ask us to correct inaccurate information',
            'Request deletion of your information where legally applicable',
            'Withdraw consent where processing is based on consent',
            'Object to certain uses of your information',
            'Request information about how your personal information is handled',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'To exercise these rights, please contact us using the details provided below.',
          ],
        },
      ],
    },
    {
      heading: '9. Third-Party Websites',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Our website may contain links to third-party websites, including hotels, airlines, payment providers, booking platforms, and other travel services.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours is not responsible for the privacy practices, content, or security of third-party websites. We encourage you to review their privacy policies before providing personal information.',
          ],
        },
      ],
    },
    {
      heading: '10. Children’s Privacy',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Our website and services are not specifically directed toward children. We do not knowingly collect personal information from children without appropriate consent where such consent is required by law.',
          ],
        },
      ],
    },
    {
      heading: 'Changes to This Privacy Policy',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or business practices.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any updated version will be posted on this page with a revised Effective Date.',
          ],
        },
      ],
    },
  ],
}
