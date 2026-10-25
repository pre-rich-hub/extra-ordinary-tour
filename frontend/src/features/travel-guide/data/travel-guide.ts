import type { GuideSection } from '@/components/layout/guide-sections'

// The Travel Guide page, in planning order. Follows the client's legacy
// "Travel Guide" page and pre-departure notes; check fees before each season.
export const travelGuide: GuideSection[] = [
  {
    id: 'when-to-go',
    label: 'When to go',
    eyebrow: 'Climate & seasons',
    title: 'When to visit Ethiopia',
    paragraphs: [
      'Ethiopia’s climate depends far more on altitude than on the month. Most of the country is high plateau, where days are warm and nights cool all year, while the lowlands of the Danakil, Awash and the Omo Valley can be extremely hot.',
      'We welcome travellers from September through July. The main rains fall from about mid-June to mid-September in the north and centre, so September brings green hills, wildflowers and the festivals of Enkutatash and Meskel. October to May is dry and clear across the historic north and the mountains, and the Danakil is most comfortable from November to March. In the south, short rains usually fall around March to May and again in October and November.',
      'Festival dates such as Genna, Timkat and Meskel are among the busiest times of the year, so plan and book early if you want to travel then.',
    ],
    facts: [
      {
        label: 'Highlands',
        value: 'Warm days, cool nights (about 8 to 28 °C)',
      },
      { label: 'Lowlands', value: 'Very hot, can exceed 45 °C' },
      { label: 'Main rains', value: 'Mid-June to mid-September (north)' },
      {
        label: 'Southern rains',
        value: 'Around March to May and October to November',
      },
    ],
    links: [
      {
        label: 'Best time to visit Ethiopia',
        href: '/blog/best-time-to-visit-ethiopia',
      },
    ],
  },
  {
    id: 'packing',
    label: 'What to pack',
    eyebrow: 'Packing list',
    title: 'What to pack for Ethiopia',
    paragraphs: [
      'Pack for several climates in one trip. Highland towns such as Addis Ababa, Lalibela, Gondar and the Simien are cool in the mornings and evenings, while the Omo Valley, the Danakil and Awash can be very hot.',
      'We recommend your passport and a copy of your e-Visa, comfortable walking shoes, light clothing for warm days and a fleece or warm layer, a rain jacket, a hat, sunglasses and sunscreen, insect repellent, personal medication and a basic first-aid kit, a headlamp, a power bank, a universal adapter, a reusable water bottle and a small daypack. Modest clothing that covers shoulders and knees is useful for visiting churches and mosques.',
    ],
  },
  {
    id: 'getting-around',
    label: 'Getting around',
    eyebrow: 'Transport & connectivity',
    title: 'Getting around Ethiopia',
    paragraphs: [
      'Ethiopian Airlines runs a reliable domestic network connecting Addis Ababa with Lalibela, Gondar, Axum, Bahir Dar, Dire Dawa, Arba Minch, Jinka and other key destinations. Travelling by air saves days on the longer routes of the historic north.',
      'Paved roads now connect most popular destinations, while remote areas such as the Omo Valley and the Danakil require 4x4 vehicles. The modern Addis Ababa–Djibouti railway offers an alternative route to the east. On our tours, experienced drivers and well-maintained vehicles handle every road journey.',
      'Internet and mobile coverage are good in cities and most hotels but limited in the Omo Valley, the Danakil and the mountains. Local SIM cards from Ethio Telecom or Safaricom are easy to buy with your passport.',
    ],
    facts: [
      {
        label: 'Domestic flights',
        value: 'Ethiopian Airlines, from Addis Ababa',
      },
      { label: 'Remote areas', value: '4x4 vehicles required' },
      {
        label: 'Electricity',
        value: '220 V, European-style plugs (types C, E and F)',
      },
      { label: 'Mobile networks', value: 'Ethio Telecom and Safaricom' },
    ],
  },
  {
    id: 'visas',
    label: 'Visas & entry',
    eyebrow: 'Before you fly',
    title: 'Visas and entry requirements',
    paragraphs: [
      'Most international travellers need a visa. The easiest option is the official e-Visa, applied for online at evisa.gov.et before you travel. Visas on arrival are available to eligible nationalities at Bole International Airport in Addis Ababa, and citizens of Kenya and Djibouti may enter without a visa.',
      'Passengers transiting through Addis Ababa on Ethiopian Airlines may be eligible for a transit visa that lets them leave the airport and explore the city during a stopover. Your passport should be valid for at least six months after arrival, and you need a yellow fever vaccination certificate if you arrive from a country with a risk of yellow fever.',
      'Visa fees and entry rules change, so always check the official e-Visa website before you travel. When you book with us, we confirm the requirements for your passport.',
    ],
    facts: [
      { label: 'Official e-Visa portal', value: 'evisa.gov.et' },
      { label: '30-day tourist e-Visa', value: 'USD 62 (single entry)' },
      { label: '90-day tourist e-Visa', value: 'USD 152 (single entry)' },
      { label: 'Passport validity', value: 'At least six months' },
    ],
    links: [{ label: 'Addis Ababa layover tours', href: '/layover' }],
  },
  {
    id: 'money',
    label: 'Money',
    eyebrow: 'Currency & payments',
    title: 'Money and currency',
    paragraphs: [
      'The currency is the Ethiopian birr (ETB). US dollars, euros and pounds sterling can be exchanged at banks and authorised exchange offices; the National Bank of Ethiopia publishes official rates at nbe.gov.et. Keep your exchange receipts, as you may need them to change unused birr back before departure.',
      'Cards are accepted at many hotels, restaurants and shops in Addis Ababa and other large towns, and ATMs are common there, but cash is essential in rural areas, at markets and in remote regions such as the Omo Valley, the Danakil and the Simien. Tipping is not compulsory but is customary and much appreciated by guides, drivers, scouts and hotel staff.',
    ],
  },
  {
    id: 'health-safety',
    label: 'Health & safety',
    eyebrow: 'Stay well',
    title: 'Health, altitude and safety',
    paragraphs: [
      'Many destinations lie above 2,000 metres, so take your first day easy, drink plenty of water and limit alcohol until you have adjusted. Drink only bottled or filtered water. Ask your doctor or a travel clinic about recommended vaccinations and about malaria precautions for lowland areas well before you travel.',
      'Comprehensive travel insurance covering medical treatment, evacuation and trip interruption is essential. Some sites involve uneven ground and steep steps, so please tell us about any mobility needs or medical conditions when you plan your trip. Our team is available 24 hours a day throughout your journey.',
    ],
  },
  {
    id: 'etiquette',
    label: 'Etiquette',
    eyebrow: 'Travel respectfully',
    title: 'Local customs, etiquette and photography',
    paragraphs: [
      'Ethiopia is home to many cultures and religious traditions. Dress modestly in churches, monasteries and mosques, remove your shoes before entering Orthodox churches, and follow your guide’s advice on local customs. Always ask permission before photographing people.',
      'When visiting communities in the Omo Valley, speak to your guide before giving anything; rather than handing out gifts, we recommend supporting local schools or community projects. Photography is prohibited around military sites, airports and some government buildings, and certain religious ceremonies may restrict it. Drones cannot be brought into Ethiopia without prior government authorisation.',
    ],
  },
  {
    id: 'food-drink',
    label: 'Food & drink',
    eyebrow: 'Eating well',
    title: 'Food and drink',
    paragraphs: [
      'Ethiopian cuisine is rich, varied and full of flavour. The staple is injera, a sourdough flatbread made from teff, served with meat and vegetable stews such as doro wat, tibs, shiro and misir wat. Vegetarian and vegan travellers eat very well, especially on the many fasting days when restaurants offer plant-based menus. International food is easy to find in Addis Ababa and in hotels along the main routes.',
      'Don’t miss a traditional coffee ceremony, a centuries-old ritual of hospitality and friendship, and try local drinks such as tej (honey wine), tella (home-brewed beer) and areki (a grain spirit).',
    ],
  },
  {
    id: 'holidays',
    label: 'Public holidays',
    eyebrow: 'The Ethiopian calendar',
    title: 'Public holidays and festivals',
    paragraphs: [
      'Ethiopia follows its own calendar, about seven to eight years behind the Gregorian one. Many public holidays are rooted in Orthodox Christian tradition, while others celebrate the country’s history. They are marked by colourful ceremonies, music and community gatherings, and are a wonderful time to visit.',
      'In the year before a Gregorian leap year, the September and January holidays fall one day later. Islamic holidays follow the lunar calendar and move each year, and Good Friday and Easter follow the Orthodox calendar.',
    ],
    facts: [
      { label: '11 September', value: 'Ethiopian New Year (Enkutatash)' },
      { label: '27 September', value: 'Finding of the True Cross (Meskel)' },
      { label: '7 January', value: 'Ethiopian Christmas (Genna)' },
      { label: '19 January', value: 'Ethiopian Epiphany (Timkat)' },
      { label: '2 March', value: 'Victory of Adwa' },
      { label: 'April or May', value: 'Good Friday and Easter (Fasika)' },
      { label: '1 May', value: 'International Labour Day' },
      { label: '5 May', value: 'Patriots’ Victory Day' },
      { label: '28 May', value: 'Downfall of the Derg' },
      { label: 'Lunar calendar', value: 'Eid al-Fitr, Eid al-Adha and Mawlid' },
    ],
    links: [
      { label: 'Timkat', href: '/destinations/timkat' },
      { label: 'Meskel', href: '/destinations/meskel' },
      { label: 'Genna', href: '/destinations/genna' },
    ],
  },
]
