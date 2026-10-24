import type { LegalDocument } from '../types'

// Verbatim English text of the client's published Terms and Conditions
// (extraordinaryethiopiatours.com/terms-and-conditions/, captured 2026-10-21).
// Keep locales/es.json and locales/fr.json in step with any change here.
export const termsAndConditions: LegalDocument = {
  title: 'Terms and Conditions',
  intro: [
    {
      type: 'paragraph',
      lines: [
        'Welcome to Extraordinary Ethiopia Tours. We are committed to providing our guests with safe, reliable, well-organized, and memorable travel experiences throughout Ethiopia.',
      ],
    },
    {
      type: 'paragraph',
      lines: [
        'These Terms & Conditions set out the terms under which Extraordinary Ethiopia Tours provides tour, travel, accommodation, transportation, guiding, and related travel services.',
      ],
    },
    {
      type: 'paragraph',
      lines: [
        'By making a booking, paying a deposit, or participating in a tour organized by Extraordinary Ethiopia Tours, you confirm that you have read, understood, and accepted these Terms & Conditions.',
      ],
    },
  ],
  sections: [
    {
      heading: 'Booking and Confirmation',
      content: [
        {
          type: 'paragraph',
          lines: [
            'To make a booking with Extraordinary Ethiopia Tours, the client must provide the information reasonably required to arrange the tour.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['A booking will be considered confirmed only when:'],
        },
        {
          type: 'list',
          items: [
            'The required booking information has been received;',
            'A 30% deposit of the total tour price has been paid; and',
            'Extraordinary Ethiopia Tours has issued a written booking confirmation.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Until the deposit has been received and the booking has been confirmed in writing, availability of flights, accommodation, transportation, and other services cannot be guaranteed.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The 30% deposit may be used to secure services required for the client’s trip, including accommodation, domestic flights, transportation, guides, permits, park fees, and other arrangements included in the confirmed itinerary.',
          ],
        },
      ],
    },
    {
      heading: 'Payment Terms',
      content: [
        {
          type: 'paragraph',
          lines: [
            'A 30% deposit of the total tour price is required at the time of booking to secure the reservation.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The remaining 70% balance must be paid in full at least 30 days before the scheduled arrival or tour departure date, as stated in the booking confirmation.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'For bookings made less than 30 days before the scheduled arrival or departure date, full payment may be required at the time of booking.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'If the remaining balance is not received by the required payment deadline, Extraordinary Ethiopia Tours reserves the right to cancel the booking and apply the applicable cancellation charges.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any costs already paid to airlines, hotels, suppliers, permit authorities, or other service providers may be non-refundable.',
          ],
        },
      ],
    },
    {
      heading: 'Payment Methods',
      content: [
        {
          type: 'paragraph',
          lines: ['Extraordinary Ethiopia Tours may accept payment through:'],
        },
        {
          type: 'list',
          items: [
            'Bank transfer',
            'PayPal',
            'Online payment services',
            'Other payment methods agreed upon in writing',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The client is responsible for ensuring that the full required amount is received by Extraordinary Ethiopia Tours.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any bank charges, international transfer fees, currency-conversion charges, credit card fees, or other transaction costs may be payable by the client unless otherwise agreed in writing.',
          ],
        },
      ],
    },
    {
      heading: 'Tour Prices and Inclusions',
      content: [
        {
          type: 'paragraph',
          lines: [
            'The total tour price is based on the services specifically stated in the quotation, itinerary, invoice, or booking confirmation issued to the client.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['Depending on the selected tour, the price may include:'],
        },
        {
          type: 'list',
          items: [
            'Accommodation',
            'Transportation',
            'Domestic flights',
            'Professional guides',
            'Airport transfers',
            'Meals specifically stated in the itinerary',
            'Entrance fees',
            'Park fees',
            'Permits',
            'Activities specifically listed in the itinerary',
            'Other services expressly stated as included',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Unless specifically stated as included, the tour price does not normally include:',
          ],
        },
        {
          type: 'list',
          items: [
            'International flights',
            'Visa fees',
            'Travel insurance',
            'Personal expenses',
            'Alcoholic beverages',
            'Laundry',
            'Tips and gratuities',
            'Optional activities',
            'Extra hotel nights',
            'Meals not specified as included',
            'Additional transportation',
            'Personal purchases',
            'Other services not specifically included in the confirmed itinerary',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any additional service requested by the client after confirmation may incur an additional charge.',
          ],
        },
      ],
    },
    {
      heading: 'Cancellation by the Client',
      content: [
        {
          type: 'paragraph',
          lines: [
            'If you need to cancel your booking, you must notify Extraordinary Ethiopia Tours in writing as soon as possible.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Unless otherwise stated in your booking confirmation or agreed in writing, the following cancellation charges apply:',
          ],
        },
        {
          type: 'table',
          head: ['Cancellation Notice', 'Applicable Charge'],
          rows: [
            [
              '60 days or more before departure',
              '30% deposit may be refundable, less any non-refundable costs and applicable fees',
            ],
            ['30–59 days before departure', '50% of total tour price'],
            ['15–29 days before departure', '75% of total tour price'],
            ['Less than 15 days before departure', '100% of total tour price'],
            ['No-show or cancellation after departure', 'No refund'],
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The cancellation date will be the date on which Extraordinary Ethiopia Tours receives the client’s written cancellation request.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Certain services may have separate cancellation and refund conditions imposed by third-party suppliers. These may include:',
          ],
        },
        {
          type: 'list',
          items: [
            'Airlines',
            'Hotels',
            'National parks',
            'Government authorities',
            'Permit providers',
            'Special activities',
            'Camps',
            'Transportation providers',
            'Other travel suppliers',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where such services are non-refundable, the relevant amount may be deducted from any refund due to the client.',
          ],
        },
        {
          type: 'note',
          label: 'Important',
          text: 'The cancellation charges above do not prevent Extraordinary Ethiopia Tours from applying a different cancellation policy where the client has been informed of and agreed to specific terms for a particular tour, service, promotion, or supplier.',
        },
      ],
    },
    {
      heading: 'Changes to a Booking by the Client',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We will make reasonable efforts to accommodate requests to change a confirmed booking, including changes to:',
          ],
        },
        {
          type: 'list',
          items: [
            'Travel dates',
            'Accommodation',
            'Activities',
            'Transportation',
            'Destinations',
            'Tour itinerary',
          ],
        },
        {
          type: 'paragraph',
          lines: ['All changes are subject to availability.'],
        },
        {
          type: 'paragraph',
          lines: [
            'Changes may result in additional costs, including supplier cancellation fees, airline charges, accommodation charges, transportation costs, or differences in tour prices.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any additional cost will be communicated to the client before the requested change is confirmed.',
          ],
        },
      ],
    },
    {
      heading: 'Changes or Cancellation by Extraordinary Ethiopia Tours',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours makes every reasonable effort to operate tours according to the confirmed itinerary.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'However, circumstances beyond our reasonable control may require us to change, postpone, or cancel part or all of a tour.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['Such circumstances may include:'],
        },
        {
          type: 'list',
          items: [
            'Severe weather',
            'Natural disasters',
            'Government restrictions',
            'Changes in government regulations',
            'Security situations',
            'Political unrest',
            'Road closures',
            'Flight cancellations',
            'Airline schedule changes',
            'Strikes',
            'Public health emergencies',
            'Natural or environmental conditions',
            'Other force majeure events',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where reasonably possible, Extraordinary Ethiopia Tours will provide a suitable alternative itinerary, accommodation, transportation, or activity.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'If a change results in a difference in cost, we will communicate this to the client as soon as reasonably practicable.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where a tour must be cancelled due to circumstances beyond our reasonable control, any refund will generally be based on amounts recoverable from suppliers and on services that have not already been provided, purchased, or become non-refundable.',
          ],
        },
      ],
    },
    {
      heading: 'Flights and Transportation',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Domestic flights, international flights arranged by us, road transportation, transfers, and other transportation services are subject to availability and operational conditions.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Flight schedules, departure times, routes, vehicles, travel times, and transportation arrangements may change due to circumstances beyond our control.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'These circumstances may include weather, road conditions, airline operational requirements, government regulations, technical problems, delays, cancellations, or safety considerations.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where necessary, Extraordinary Ethiopia Tours will make reasonable efforts to arrange suitable alternatives.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Additional costs resulting from changes requested by the client may be charged to the client.',
          ],
        },
      ],
    },
    {
      heading: 'Accommodation',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Accommodation will be arranged according to the category, hotel, lodge, campsite, or property specified in the confirmed itinerary.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Hotel availability is subject to confirmation by the accommodation provider.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'If the confirmed accommodation becomes unavailable due to circumstances beyond our reasonable control, Extraordinary Ethiopia Tours may arrange alternative accommodation of a similar or reasonably comparable standard.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We will notify the client of any significant accommodation change as soon as reasonably possible.',
          ],
        },
      ],
    },
    {
      heading: 'Special Destinations and Activities',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Some Ethiopian destinations and activities require additional planning, permits, local guides, special transportation, park fees, security arrangements, or other logistical support.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['These may include:'],
        },
        {
          type: 'list',
          items: [
            'Danakil Depression',
            'Simien Mountains',
            'Bale Mountains',
            'Trekking',
            'Hiking',
            'Camping',
            'Wildlife excursions',
            'Remote-area travel',
            'Adventure activities',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Additional charges may apply depending on the requirements of the destination or activity.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Clients participating in physically demanding activities are responsible for ensuring that they are reasonably fit and prepared for the activity.',
          ],
        },
      ],
    },
    {
      heading: 'Travel Insurance',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Travel insurance is strongly recommended for every traveler.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We recommend that clients obtain comprehensive travel insurance that may include cover for:',
          ],
        },
        {
          type: 'list',
          items: [
            'Trip cancellation',
            'Trip interruption',
            'Medical expenses',
            'Emergency evacuation',
            'Repatriation',
            'Lost or delayed baggage',
            'Flight delays and cancellations',
            'Personal accidents',
            'Travel disruption',
            'Other unexpected travel expenses',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Clients are responsible for checking that their insurance provides adequate coverage for their personal circumstances and the activities included in their tour.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours is not responsible for losses that could reasonably have been covered by appropriate travel insurance.',
          ],
        },
      ],
    },
    {
      heading: 'Passports, Visas and Travel Documents',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Each traveler is responsible for obtaining and carrying all documents required for their trip.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['This includes, where applicable:'],
        },
        {
          type: 'list',
          items: [
            'A valid passport',
            'Appropriate visa',
            'Entry permits',
            'Travel insurance documents',
            'Vaccination or health documentation',
            'Flight documents',
            'Other required travel documentation',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours may provide general assistance or information regarding visa and entry requirements, but the traveler remains responsible for ensuring that they meet all applicable entry requirements.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We strongly recommend that travelers verify current requirements with the appropriate embassy, consulate, or government authority before traveling.',
          ],
        },
      ],
    },
    {
      heading: 'Late Arrival, Missed Services and No-Show',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours will not normally provide refunds for services missed because of:',
          ],
        },
        {
          type: 'list',
          items: [
            'Late arrival',
            'Missed flights',
            'Failure to arrive at the agreed meeting point',
            'Failure to obtain required travel documents',
            'Failure to obtain a required visa',
            'Voluntary withdrawal from the tour',
            'Changes to personal travel plans',
            'Failure to follow agreed meeting arrangements',
            'Other circumstances attributable to the traveler',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any additional costs resulting from such circumstances may be the responsibility of the traveler.',
          ],
        },
      ],
    },
    {
      heading: 'Traveler Responsibilities',
      content: [
        {
          type: 'paragraph',
          lines: ['Travelers are expected to:'],
        },
        {
          type: 'list',
          items: [
            'Provide accurate information when making a booking;',
            'Follow reasonable instructions provided by guides and tour representatives;',
            'Respect local laws and regulations;',
            'Respect local communities, customs, and cultural practices;',
            'Take reasonable care of their personal belongings;',
            'Arrive at agreed meeting points on time;',
            'Have the appropriate clothing and equipment for their tour;',
            'Follow reasonable safety instructions;',
            'Inform us in advance of any special requirements that may affect their travel arrangements.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Travelers are also responsible for ensuring that they are physically and practically prepared for the activities included in their selected tour.',
          ],
        },
      ],
    },
    {
      heading: 'Health and Safety',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Some destinations in Ethiopia involve challenging road conditions, long journeys, high altitudes, remote locations, hot or cold environments, hiking, trekking, camping, and other activities that may involve physical risks.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Travelers should carefully consider their personal health and fitness before participating in such activities.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where appropriate, travelers should seek professional medical advice before travel.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours reserves the right, where reasonably necessary for safety, to modify or discontinue an activity if conditions are considered unsafe.',
          ],
        },
      ],
    },
    {
      heading: 'Personal Belongings',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Travelers are responsible for their passports, money, valuables, electronic devices, luggage, medication, and other personal belongings throughout the tour.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours recommends that travelers take reasonable precautions to protect their belongings and maintain copies of important documents.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Travel insurance should be obtained to provide protection against loss, theft, or damage to personal property.',
          ],
        },
      ],
    },
    {
      heading: 'Complaints',
      content: [
        {
          type: 'paragraph',
          lines: [
            'If a client experiences a problem during a tour, they should notify their guide, driver, tour representative, or Extraordinary Ethiopia Tours as soon as reasonably possible.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'We will make reasonable efforts to investigate the issue and provide an appropriate solution while the tour is in progress.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'If the matter cannot be resolved during the trip, the client should submit a formal complaint in writing as soon as reasonably possible after completion of the tour.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The complaint should include relevant details and supporting information where available.',
          ],
        },
      ],
    },
    {
      heading: 'Third-Party Service Providers',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours may arrange services through independent third-party providers, including:',
          ],
        },
        {
          type: 'list',
          items: [
            'Airlines',
            'Hotels',
            'Lodges',
            'Restaurants',
            'Drivers',
            'Guides',
            'Transportation companies',
            'Activity operators',
            'Government or park authorities',
            'Other tourism service providers',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'These providers may have their own terms, conditions, operating procedures, and cancellation policies.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours will make reasonable efforts to select reliable suppliers and coordinate the services included in your itinerary.',
          ],
        },
      ],
    },
    {
      heading: 'Force Majeure',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours will not be liable for delays, changes, interruptions, losses, or inability to provide services resulting from circumstances beyond our reasonable control.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'These circumstances may include natural disasters, extreme weather, government actions, political unrest, security incidents, epidemics or pandemics, strikes, transportation disruptions, road closures, flight cancellations, or other unforeseeable events.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'In such circumstances, we will make reasonable efforts to assist travelers and arrange suitable alternatives where practicable.',
          ],
        },
      ],
    },
    {
      heading: 'Liability',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours will exercise reasonable care and skill in arranging and providing the services included in your confirmed itinerary.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'However, we cannot accept responsibility for losses, delays, additional expenses, injuries, or disruptions resulting from circumstances beyond our reasonable control or from the acts or omissions of independent third-party service providers, except to the extent that applicable law provides otherwise.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.',
          ],
        },
      ],
    },
    {
      heading: 'Website and Tour Information',
      content: [
        {
          type: 'paragraph',
          lines: [
            'We make reasonable efforts to ensure that information published on our website, brochures, itineraries, quotations, and promotional materials is accurate.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'However, prices, schedules, accommodation, transportation, activities, and other travel arrangements may change.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'The specific itinerary, quotation, and booking confirmation issued to the client will take precedence over general website information where applicable.',
          ],
        },
      ],
    },
    {
      heading: 'Privacy and Personal Information',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours may collect and use personal information provided by clients for purposes including:',
          ],
        },
        {
          type: 'list',
          items: [
            'Processing bookings;',
            'Arranging flights and accommodation;',
            'Organizing transportation;',
            'Communicating with clients;',
            'Providing requested travel services; and',
            'Meeting applicable legal or operational requirements.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Personal information will be handled in accordance with our applicable privacy practices and legal obligations.',
          ],
        },
      ],
    },
    {
      heading: 'Photography and Marketing',
      content: [
        {
          type: 'paragraph',
          lines: [
            'Extraordinary Ethiopia Tours may occasionally take photographs or videos during tours for promotional, marketing, or social media purposes.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Where identifiable images of clients are intended for promotional use, we will seek appropriate permission where required.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Clients who do not wish to appear in promotional photographs or videos should inform Extraordinary Ethiopia Tours in advance or notify their tour representative during the trip.',
          ],
        },
      ],
    },
    {
      heading: 'Acceptance of Terms',
      content: [
        {
          type: 'paragraph',
          lines: [
            'By submitting a booking request, paying the 30% deposit, making full payment, or participating in a tour organized by Extraordinary Ethiopia Tours, the client confirms that they:',
          ],
        },
        {
          type: 'list',
          items: [
            'Have read and understood these Terms & Conditions;',
            'Accept the applicable booking and payment terms;',
            'Accept the applicable cancellation and refund conditions;',
            'Have provided accurate information;',
            'Agree to comply with reasonable instructions provided during the tour; and',
            'Agree to these Terms & Conditions.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'These Terms & Conditions should be read together with the client’s quotation, invoice, confirmed itinerary, booking confirmation, and any additional written agreement provided by Extraordinary Ethiopia Tours.',
          ],
        },
      ],
    },
    {
      heading: 'Governing Law',
      content: [
        {
          type: 'paragraph',
          lines: [
            'These Terms & Conditions shall be interpreted in accordance with the applicable laws and regulations of the Federal Democratic Republic of Ethiopia, unless otherwise required by applicable law.',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'Any dispute relating to a booking or tour should first be addressed through good-faith communication between the client and Extraordinary Ethiopia Tours.',
          ],
        },
      ],
    },
    {
      heading: 'Contact Us',
      content: [
        {
          type: 'paragraph',
          lines: [
            'If you have any questions regarding our tours, booking procedures, payment requirements, cancellation policy, or these Terms & Conditions, please contact us before making your reservation.',
          ],
        },
        {
          type: 'paragraph',
          lines: ['Extraordinary Ethiopia Tours'],
        },
        {
          type: 'paragraph',
          lines: [
            'Email: info@extraordinaryethiopiatours.com',
            'Phone / WhatsApp: +251912039405',
            'Website: www.extraordinaryethiopiatours.com',
            'Address: Meskel Kibra Kebele, Workdinagy Street, Lalibela. Ethiopia',
          ],
        },
      ],
    },
    {
      heading: 'Payment Summary',
      content: [
        {
          type: 'paragraph',
          lines: ['For clarity, our standard payment schedule is:'],
        },
        {
          type: 'paragraph',
          lines: [
            '30% — Deposit required to confirm your booking',
            '70% — Final balance payable at least 30 days before arrival/departure',
          ],
        },
        {
          type: 'paragraph',
          lines: [
            'For bookings made less than 30 days before arrival/departure, full payment may be required at the time of booking.',
          ],
        },
      ],
    },
  ],
}
