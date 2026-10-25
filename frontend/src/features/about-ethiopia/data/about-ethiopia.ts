import type { GuideSection } from '@/components/layout/guide-sections'

const img = (file: string) =>
  `https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/${file}`

// The About Ethiopia page, in reading order. History follows the client's
// legacy "About Ethiopia" page; the other chapters complete the brief.
export const aboutEthiopia: GuideSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    eyebrow: 'The Land of Origins',
    title: 'A country like no other',
    paragraphs: [
      'Ethiopia is one of the most fascinating countries in the world, a land where ancient history, dramatic landscapes and vibrant cultural traditions come together. As the birthplace of humanity and home to one of Africa’s oldest civilisations, it offers a remarkable journey through time.',
      'From the peaks of the Simien Mountains and the mighty Blue Nile to the rock-hewn churches of Lalibela, historic cities, more than eighty peoples and the volcanic wonders of the Danakil, Ethiopia is a destination like no other. It is also one of only two African countries never colonised, and it keeps its own alphabet, its own calendar and its own way of telling time.',
    ],
    facts: [
      { label: 'Capital', value: 'Addis Ababa' },
      { label: 'Population', value: 'More than 120 million' },
      { label: 'Area', value: 'About 1.1 million km²' },
      {
        label: 'Languages',
        value: 'Amharic, Afaan Oromo, Tigrinya, Somali, Afar and 80 more',
      },
      { label: 'Currency', value: 'Ethiopian birr (ETB)' },
      { label: 'Time zone', value: 'East Africa Time (UTC+3)' },
      { label: 'Calendar', value: '13 months, 7 to 8 years behind' },
      { label: 'UNESCO World Heritage', value: '12 sites' },
    ],
  },
  {
    id: 'history',
    label: 'History',
    eyebrow: 'Three thousand years',
    title: 'From the Land of Punt to the African Union',
    image: img('axum-stelae.jpg'),
    imageAlt: 'The ancient granite stelae of Axum',
    paragraphs: [
      'The story begins long before written history. In 1974 the 3.2-million-year-old skeleton of Lucy, known in Ethiopia as Dinkinesh, was found in the Afar region, one of many discoveries that make the country a cradle of humanity.',
      'Long before many of the world’s great civilisations rose, this region was a centre of trade and innovation. The ancient Egyptians knew it as part of the Land of Punt, and trade routes linked it with the Middle East, Asia and the Mediterranean. The Kingdom of Aksum became one of Africa’s greatest powers, with its own written script, minted coins, towering stelae and far-reaching commerce.',
      'In the 4th century King Ezana of Aksum embraced Christianity, making Ethiopia one of the world’s earliest Christian nations. In the 7th century Aksum gave refuge to the first followers of the Prophet Muhammad fleeing persecution in Arabia, the beginning of a long tradition of Christians and Muslims living side by side.',
      'In the late 12th and early 13th centuries King Lalibela created his “New Jerusalem” of eleven churches carved from solid rock. In the 17th century Emperor Fasilides founded Gondar as the imperial capital, and it flourished as a centre of religion, art and architecture, leaving castles and churches that remain among the country’s great sights.',
      'Ethiopia preserved its independence through the colonial era. In 1896 Emperor Menelik II defeated the Italian army at the Battle of Adwa, inspiring anti-colonial movements across Africa. In the 20th century Emperor Haile Selassie modernised the country and championed African unity, helping to found the Organisation of African Unity, today the African Union, headquartered in Addis Ababa.',
    ],
    links: [
      { label: 'Axum', href: '/destinations/axum' },
      { label: 'Lalibela', href: '/destinations/lalibela' },
      { label: 'Gondar', href: '/destinations/gondar' },
    ],
  },
  {
    id: 'geography',
    label: 'Geography',
    eyebrow: 'Nature at its most dramatic',
    title: 'From the Roof of Africa to below sea level',
    image: img('simien-landscape.jpg'),
    imageAlt: 'Basalt pinnacles of the Simien Mountains above the clouds',
    paragraphs: [
      'Ethiopia sits in the Horn of Africa, and most of it is high plateau, which is why the highlands enjoy mild, pleasant weather all year. Ras Dashen in the Simien Mountains rises to 4,550 metres, while the Danakil Depression in the Afar region falls more than 100 metres below sea level and is one of the hottest places on earth.',
      'The Great Rift Valley cuts through the country from north-east to south-west, lined with volcanoes, hot springs and a chain of lakes rich in birdlife. The Blue Nile begins at Lake Tana and thunders over the Blue Nile Falls, and the Ethiopian highlands supply most of the water that reaches Egypt along the Nile.',
      'Isolated by altitude, Ethiopia’s mountains shelter wildlife found nowhere else: the gelada, the walia ibex, the mountain nyala and the Ethiopian wolf, the rarest canid on earth. More than 850 bird species have been recorded, from flamingos on the Rift Valley lakes to highland endemics, making the country one of Africa’s great birding destinations.',
    ],
    links: [
      { label: 'The Simien Mountains', href: '/destinations/simien-mountains' },
      {
        label: 'The Danakil Depression',
        href: '/destinations/danakil-depression',
      },
      { label: 'The Bale Mountains', href: '/destinations/bale-mountains' },
    ],
  },
  {
    id: 'people-culture',
    label: 'People & culture',
    eyebrow: 'A living mosaic',
    title: 'More than eighty peoples, one remarkable heritage',
    image: img('dorze.jpg'),
    imageAlt:
      'Tall woven bamboo houses of the Dorze people in the southern highlands',
    paragraphs: [
      'Ethiopia is home to more than eighty ethnic groups, among them the Oromo, Amhara, Somali, Tigrayan, Sidama, Afar and the many peoples of the south. Each has its own language, dress, music and customs, and travelling from one region to the next can feel like crossing into another country.',
      'Amharic is written in Ge’ez, or fidel, one of the world’s oldest alphabets still in everyday use, and Ge’ez itself survives as the language of the Orthodox liturgy. The Oromo Gada system, a traditional form of self-government, is recognised by UNESCO as part of humanity’s intangible heritage.',
      'In the Omo Valley in the far south, communities such as the Hamar, Karo, Mursi and Dassanech maintain ways of life shaped by the river and the seasons, best visited respectfully and with experienced local guides. Everywhere, from Tigray to the south, music and dance are part of daily life: the shoulder dance of eskista, the songs of the azmari and the sound of the krar.',
    ],
    links: [
      { label: 'The Omo Valley', href: '/destinations/omo-valley' },
      { label: 'Konso', href: '/destinations/konso' },
    ],
  },
  {
    id: 'faith-traditions',
    label: 'Faith & traditions',
    eyebrow: 'Ancient faiths, living traditions',
    title: 'Where faith shapes the rhythm of the year',
    image: img('lalibela-pilgrims.jpg'),
    imageAlt:
      'Orthodox priests in white robes holding processional crosses in Lalibela',
    paragraphs: [
      'The Ethiopian Orthodox Tewahedo Church has shaped the country for sixteen centuries. Its priests still carry illuminated manuscripts and processional crosses, believers observe more than 180 fasting days a year, and churches from Tigray to Lake Tana preserve paintings and treasures many centuries old.',
      'Islam arrived in the time of the Prophet Muhammad, and Ethiopia is home to one of Africa’s oldest Muslim communities. The village of Negash and the walled city of Harar, with its hundreds of mosques and shrines, are important centres of Islamic heritage.',
      'Ethiopia follows its own calendar of thirteen months, seven to eight years behind the Gregorian one, and the New Year, Enkutatash, falls in September. Time is counted from dawn, so 7 a.m. is one o’clock in Ethiopian time. Religious festivals fill the year with colour: Meskel and Timkat are both recognised by UNESCO as intangible cultural heritage.',
    ],
    links: [
      { label: 'Timkat, the Epiphany', href: '/destinations/timkat' },
      { label: 'Meskel', href: '/destinations/meskel' },
      { label: 'Harar', href: '/destinations/harar' },
    ],
  },
  {
    id: 'coffee-food',
    label: 'Coffee & food',
    eyebrow: 'The birthplace of coffee',
    title: 'Coffee, injera and the art of hospitality',
    image: img('coffee-ceremony.jpg'),
    imageAlt:
      'A traditional Ethiopian coffee ceremony with a clay jebena and small cups',
    paragraphs: [
      'Coffee comes from Ethiopia. Legend tells of Kaldi, a goatherd in the Kaffa region who noticed his goats dancing after eating the berries of a wild shrub, and wild Arabica still grows in the forests of the south-west. Yirgacheffe, Sidama and Harar give their names to some of the world’s most prized beans.',
      'The coffee ceremony is the heart of Ethiopian hospitality. Green beans are roasted over charcoal, ground by hand and brewed in a clay jebena, then served in three rounds, abol, tona and baraka, with incense and conversation. Being invited to one is a mark of friendship.',
      'Ethiopian food is built around injera, a soft sourdough flatbread made from the tiny grain teff, shared from a single plate with stews such as doro wat, shiro and misir wat. Thanks to the many fasting days, vegetarian and vegan dishes are everywhere. Try tej, the traditional honey wine, and tella, the home-brewed beer.',
    ],
    links: [
      {
        label: 'Yirgacheffe & Sidama coffee lands',
        href: '/destinations/yirgacheffe-and-sidama',
      },
      {
        label: 'Kaffa, home of wild coffee',
        href: '/destinations/kaffa-and-bonga',
      },
    ],
  },
]
