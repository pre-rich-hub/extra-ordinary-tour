import type { Destination } from '../types'

// Destinations, attractions, peoples and festivals covered by Extraordinary
// Ethiopia Tours. Regions mirror the operator's own groupings; the first six
// entries are the signature destinations shown on the homepage.
export const destinations: Destination[] = [
  // ─── Signature destinations ─────────────────────────────────────────────
  {
    slug: 'lalibela',
    name: 'Lalibela',
    region: 'Historic Northern Ethiopia',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/lalibela-bete-giyorgis-trench.jpg',
    teaser:
      'Eleven churches carved downward into living rock, still alive with prayer.',
    intro:
      'The “New Jerusalem” of King Lalibela: a 12th-century holy city excavated from the red volcanic rock of the Lasta Mountains, where the liturgy has never stopped.',
    bestTime: 'September to July',
    duration: '2 to 3 days',
    altitude: '2,500 m',
    highlights: [
      'Bete Medhane Alem, the largest monolithic church in the world',
      'The cross-shaped Bete Giyorgis, cut 12 metres down into the rock',
      'Tunnels and trenches linking the northern and eastern clusters',
      'Mountain monasteries of Asheton Maryam and Yemrehanna Kristos',
      'Genna and Timkat, when tens of thousands of pilgrims arrive',
    ],
    paragraphs: [
      'Lalibela, once known as Roha, was the capital of the Zagwe dynasty. Under King Lalibela in the late 12th and early 13th centuries, eleven churches were carved directly out of the rock in two main groups, joined by tunnels and ceremonial passages, with the solitary Bete Giyorgis standing apart. UNESCO inscribed them as a World Heritage Site in 1978.',
      'Lalibela is not a ruin. It is a working sanctuary and Ethiopia’s holiest town, where priests still descend the same rock stairways their predecessors cut eight centuries ago. Arriving early, you hear the chant before you see the churches. Our founder was born here and began his career guiding these churches, so we know the hours when they are at their most beautiful.',
      'Beyond the town, the Lasta Mountains hide many more cave and rock churches from the same period, community trekking routes, and the high massif of Abune Yosef, all easy to combine with a visit.',
    ],
  },
  {
    slug: 'harar',
    name: 'Harar',
    region: 'Eastern Ethiopia',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/harar-jugol-alley.jpg',
    teaser:
      'A walled Muslim city of 82 mosques, colourful markets and the hyena men.',
    intro:
      'One of the holiest cities in Islam, set among green hills on the eastern wall of the Rift Valley, its maze of alleys enclosed by the Jugol wall since the 16th century.',
    bestTime: 'October to March',
    duration: '2 days',
    altitude: '1,885 m',
    highlights: [
      'The Jugol, Harar’s historic walled town, with its five ancient gates',
      'The hyena-feeding ritual outside the walls at dusk',
      'Arthur Rimbaud’s house and the Harari cultural museum',
      'Spice, basket and silversmith markets of the old city',
    ],
    paragraphs: [
      'Founded between the 7th and 11th centuries, Harar became the capital of an independent Muslim emirate in the 16th century, when Emir Nur built the Jugol wall to protect it. For centuries it was the centre of Islamic learning in the Horn of Africa and a prosperous caravan city trading with Arabia and beyond. Its old town, with 82 mosques and more than a hundred shrines in less than half a square kilometre, was inscribed by UNESCO in 2006.',
      'Today the Adare, Oromo, Somali and Amhara peoples share its lanes and markets, where women in vivid dresses sell spices, woven baskets and silver jewellery beneath Moorish arches. Visit the former home of the French poet Arthur Rimbaud, and as night falls, watch the hyena men feed wild hyenas by hand, a tradition that has continued for generations.',
    ],
  },
  {
    slug: 'danakil-depression',
    name: 'Danakil Depression',
    region: 'Nature & Wildlife',
    tag: 'Expedition',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/danakil-dallol-sulphur-pools.jpg',
    teaser: 'One of the hottest places on earth, painted in sulphur and salt.',
    intro:
      'More than 100 metres below sea level: acid springs the colour of egg yolk, a permanent lava lake, and salt caravans that have not changed in a thousand years.',
    bestTime: 'November to March',
    duration: '3 to 4 days',
    altitude: '-116 m',
    highlights: [
      'The yellow, green and orange mineral terraces of Dallol',
      'Overnight ascent to the lava lake of Erta Ale',
      'Afar salt miners and camel caravans on Lake Assale',
      'Sunset over the salt flats and nights under desert stars',
    ],
    paragraphs: [
      'Part of the Great Rift Valley near the Eritrean border, the Danakil Depression lies as low as 116 metres below sea level around Lake Assale, one of the lowest points in Africa. It is one of the hottest, driest and most tectonically active regions on the planet, with daytime temperatures that regularly pass 45 °C.',
      'Its landscapes are unlike anything else on earth: the hydrothermal field of Dallol, where potash and sulphur create surreal coloured pools; the salt flats where Afar miners still cut blocks by hand and load them onto camel caravans bound for the highlands; and the shield volcano of Erta Ale with its glowing lava lake.',
      'We run the Danakil as a fully supported expedition with experienced desert drivers, a cook, a local Afar guide, a police escort, comfortable camp beds and plenty of drinking water. Comfort within reason, and honest advice about the rest.',
    ],
  },
  {
    slug: 'omo-valley',
    name: 'Omo Valley',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'Living Cultures',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793014223/omo-river-aerial.webp',
    teaser:
      'A living mosaic of peoples who have shaped this river valley for millennia.',
    intro:
      'The lower Omo is one of the most culturally diverse regions on earth, home to the Hamar, Mursi, Karo, Dassanech and many more, each with its own language, dress and ceremonies.',
    bestTime: 'Year-round except April and May',
    duration: '5 to 9 days',
    altitude: '400 to 1,500 m',
    highlights: [
      'Weekly markets at Key Afar, Dimeka and Turmi',
      'A Hamar bull-jumping ceremony, when timing allows',
      'Mursi communities in the hills of Mago National Park',
      'Karo villages high above a bend of the Omo River',
      'The South Omo Museum in Jinka',
    ],
    paragraphs: [
      'The Omo River flows south through some of Africa’s most remote country before reaching Lake Turkana. Its lower valley, a UNESCO World Heritage Site for its fossil discoveries, is home to more than a dozen communities representing several language families, from the Hamar and Banna to the Mursi, Karo, Arbore, Dassanech and Nyangatom.',
      'Many still live by cattle herding and riverside farming, and traditions such as body painting, scarification, lip plates and the Hamar bull jump remain central to identity. Gateway towns such as Arba Minch, Jinka and Turmi make it possible to combine village visits with Lake Chamo, the Dorze highlands and the stone-walled villages of Konso.',
      'We travel the Omo with local guides from the communities we visit, plan around market days and ceremonies, and ask before every photograph, so that conversation, not the camera, leads.',
    ],
  },
  {
    slug: 'simien-mountains',
    name: 'Simien Mountains',
    region: 'Nature & Wildlife',
    tag: 'UNESCO National Park',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793090614/gelada-male.jpg',
    teaser:
      'The Roof of Africa, where gelada monkeys graze above a thousand-metre drop.',
    intro:
      'Jagged basalt pinnacles, escarpments that fall away into cloud, and endemic wildlife found nowhere else: walia ibex, gelada and the Ethiopian wolf.',
    bestTime: 'September to June',
    duration: '1 to 5 days',
    altitude: '3,200 to 4,550 m',
    highlights: [
      'Walking among habituated gelada troops near Sankaber and Gich',
      'Walia ibex on the cliffs around Chenek',
      'Sunrise from Imet Gogo, ridge after ridge above the clouds',
      'Jinbar waterfall plunging off the escarpment',
      'Optional ascent of Ras Dashen, Ethiopia’s highest peak',
    ],
    paragraphs: [
      'Created to protect the endangered walia ibex, the Simien Mountains National Park was one of the first sites anywhere to be inscribed on UNESCO’s World Heritage List, in 1978. It lies on the northwestern side of the Simien massif, between Gondar, Axum and Lalibela on the historic northern route.',
      'The Simien are less a mountain range than a broken plateau, split by erosion into towers, gorges and sheer escarpments. Endemic mammals include the gelada, walia ibex and Ethiopian wolf, while lammergeiers and thick-billed ravens ride the thermals. Giant lobelias dot the Afro-alpine grassland and ancient tree heathers line the trails.',
      'You can visit on a day trip from Gondar or walk the escarpment for several days, camping at Sankaber, Gich and Chenek with a scout, cook and mules. The single rainy season runs from June to mid-September; the rest of the year the park is open and spectacular.',
    ],
  },
  {
    slug: 'bale-mountains',
    name: 'Bale Mountains',
    region: 'Nature & Wildlife',
    tag: 'UNESCO National Park',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/bale-sanetti-lobelia-lake.jpg',
    teaser:
      'Afro-alpine moorland holding the rarest canid on earth: the Ethiopian wolf.',
    intro:
      'The Sanetti Plateau is the largest expanse of Afro-alpine habitat in Africa and the best place in the world to see a wild Ethiopian wolf hunt.',
    bestTime: 'October to April',
    duration: '3 to 6 days',
    altitude: '2,500 to 4,377 m',
    highlights: [
      'Ethiopian wolf tracking on the Sanetti Plateau',
      'Tulu Dimtu, Ethiopia’s second-highest peak, at 4,377 m',
      'The Harenna cloud forest with wild coffee and colobus monkeys',
      'Mountain nyala and Menelik’s bushbuck around Dinsho',
      'More than 250 bird species, including 16 Ethiopian endemics',
    ],
    paragraphs: [
      'The Bale Mountains protect one of Africa’s most unique ecosystems and were inscribed by UNESCO as a World Heritage Site in 2023. Their most famous residents are the Ethiopian wolf, the world’s rarest canid, roughly half of whose population lives here, and the mountain nyala, an antelope found only in Ethiopia.',
      'The road across the Sanetti Plateau is the highest all-weather road in Africa. Mornings there are cold, clear and quiet, and sightings of a rust-coloured wolf working a rodent burrow are genuinely intimate. Below the southern escarpment, the Harenna Forest is another world of moss, wild coffee, colobus and hornbills.',
    ],
  },

  // ─── Historic North ─────────────────────────────────────────────────────
  {
    slug: 'gondar',
    name: 'Gondar',
    region: 'Historic Northern Ethiopia',
    tag: 'Imperial City',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793090614/gondar-fasilides-castle-stairs.jpg',
    teaser:
      'The Camelot of Africa: castles, baths and painted ceilings of a highland empire.',
    intro:
      'Ethiopia’s 17th-century imperial capital, where stone castles rise above the city and Timkat still fills the royal bath each January.',
    bestTime: 'September to July',
    duration: '1 to 2 days',
    altitude: '2,133 m',
    highlights: [
      'The Fasil Ghebbi royal enclosure, a UNESCO World Heritage Site',
      'Debre Berhan Selassie and its ceiling of winged angel faces',
      'Fasilides’ Bath, flooded for the Timkat celebrations',
      'The ruined palace of Empress Mentewab at Kuskuam',
    ],
    paragraphs: [
      'Founded by Emperor Fasilides in 1636, Gondar was the seat of Ethiopia’s emperors for more than two centuries. The Royal Enclosure contains castles and palaces built between 1635 and 1855, architecture unlike anything else in Africa, blending Aksumite traditions with Arabian, Indian and European influences. It was inscribed by UNESCO in 1979.',
      'Beyond the enclosure lie the palace of Ras Bet, the bath of Fasilides, the ruins of Kuskuam and the church of Debre Berhan Selassie, whose ceiling of painted cherubs is one of the most photographed images in Ethiopia. Gondar pairs naturally with the Simien Mountains and is the finest place in the country to celebrate Timkat.',
    ],
  },
  {
    slug: 'bahir-dar-lake-tana',
    name: 'Bahir Dar & Lake Tana',
    region: 'Historic Northern Ethiopia',
    tag: 'Island Monasteries',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849769/bahirdar.jpg',
    teaser:
      'Island monasteries, papyrus boats and the source of the Blue Nile.',
    intro:
      'A palm-lined lakeside town on the shore of Ethiopia’s largest lake, whose islands shelter painted monasteries and centuries-old manuscripts.',
    bestTime: 'September to July',
    duration: '1 to 2 days',
    altitude: '1,800 m',
    highlights: [
      'Boat trip to Ura Kidane Mehret and its painted murals',
      'Dega Estifanos and the remains of medieval emperors',
      'Fishermen in traditional papyrus tankwa boats',
      'Pelicans and hippos where the Blue Nile leaves the lake',
    ],
    paragraphs: [
      'Bahir Dar has always been a centre of trade, and fishermen still use tankwas (small papyrus boats) on the lake. Today it is a pleasant base with palm-lined avenues, colourful markets and weaving workshops, and the starting point for exploring Lake Tana.',
      'The lake’s islands and peninsulas hold some twenty monasteries. Ura Kidane Mehret on the Zege Peninsula is famous for its vivid frescoes; Dega Estifanos guards icons and the remains of several emperors; Kibran Gabriel has a cathedral-like church first built in the 17th century. Some island monasteries admit men only, and your guide will plan accordingly.',
    ],
  },
  {
    slug: 'blue-nile-falls',
    name: 'Blue Nile Falls',
    region: 'Historic Northern Ethiopia',
    tag: 'Natural Wonder',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/blue-nile-falls.jpg',
    teaser:
      'Tis Issat, the “Smoking Water”, thundering into a basalt gorge.',
    intro:
      'Near Bahir Dar, the Blue Nile plunges more than 40 metres over a wide basalt lip, throwing up a mist that drenches onlookers and paints rainbows across the gorge.',
    bestTime: 'August to December',
    duration: 'Half day',
    altitude: '1,700 m',
    highlights: [
      'The 17th-century Portuguese bridge over the gorge',
      'Rainbows in the spray after the rainy season',
      'A short walk through farmland to the viewpoint',
      'Monkeys and colourful birds in the riverine forest',
    ],
    paragraphs: [
      'Known locally as Tis Issat, the falls lie about 30 kilometres from Bahir Dar. In full flood they can stretch some 400 metres wide, and the continuous spray sustains a small evergreen forest full of monkeys and birds.',
      'The walking trail crosses open fields before descending to a fortified stone bridge built in the 17th century, then climbs a grassy hillside to the main viewpoint. Water flow is partly regulated by a hydroelectric scheme upstream, so the falls are most impressive during and just after the rains, from August to December.',
    ],
  },
  {
    slug: 'axum',
    name: 'Axum',
    region: 'Historic Northern Ethiopia',
    tag: 'Ancient Capital',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849727/Axum.png',
    teaser:
      'Granite obelisks, royal tombs and the claimed resting place of the Ark.',
    intro:
      'Capital of the Kingdom of Aksum, one of the four great powers of the ancient world, and the spiritual heart of Ethiopian Orthodox Christianity.',
    bestTime: 'September to July',
    duration: '1 to 2 days',
    altitude: '2,131 m',
    highlights: [
      'The Northern Stelae Park and the fallen Great Stele',
      'Church of Our Lady Mary of Zion and the Chapel of the Tablet',
      'Tombs of King Kaleb and King Gebre Meskel',
      'The Ezana Inscription and the Queen of Sheba’s Palace',
      'The Hidar Tsion festival in late November',
    ],
    paragraphs: [
      'The Aksumite Kingdom grew from around the 4th century BC to dominate trade between Africa, Arabia, the Roman world and India by the 1st century AD. It minted its own coins, developed its own script, and under King Ezana in the 4th century became one of the first kingdoms in the world to adopt Christianity. UNESCO inscribed its archaeological sites in 1980.',
      'Ethiopian tradition holds that the Ark of the Covenant rests in the Chapel of the Tablet beside the Church of St Mary of Zion, and the city is closely tied to the Queen of Sheba. Highlights include the monumental stelae (single blocks of granite carved to imitate multi-storey towers), royal tombs, palace ruins and the Archaeological Museum.',
    ],
  },
  {
    slug: 'gheralta-tigray-churches',
    name: 'Gheralta & the Rock Churches of Tigray',
    region: 'Historic Northern Ethiopia',
    tag: 'Cliff Churches',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849747/gheralta-mountains.jpg',
    teaser:
      'More than 120 rock-hewn churches, some reached only by climbing a cliff.',
    intro:
      'Among the sandstone towers of the Gheralta massif, ancient churches are carved into cliff faces, their walls covered with frescoes few travellers ever see.',
    bestTime: 'September to April',
    duration: '2 to 3 days',
    altitude: '2,000 to 2,600 m',
    highlights: [
      'The climb to Abuna Yemata Guh and its 15th-century frescoes',
      'Abreha we Atsbeha, one of Ethiopia’s oldest churches',
      'Debre Maryam Korkor and Daniel Korkor on the ridge top',
      'Wukro Cherkos, a semi-monolithic church of Aksumite style',
      'The cliff-top monastery of Debre Damo',
    ],
    paragraphs: [
      'More than 120 rock-hewn churches are recorded in Tigray, dating from roughly the 4th to the 15th century, many older than Lalibela’s. Most are clustered around the Gheralta mountains northwest of Mekelle, where the views across the Hawzen plain are as memorable as the art.',
      'Abuna Yemata Guh requires a near-vertical scramble with a short section of bare rock and a narrow ledge high above the valley; inside, its domed ceiling is painted with saints and apostles. Debre Damo, founded by Abune Aregawi in the 6th century, is reached by a leather rope and is open to men only. Easier visits include Abreha we Atsbeha and Wukro Cherkos.',
    ],
  },
  {
    slug: 'yemrehanna-kristos',
    name: 'Yemrehanna Kristos',
    region: 'Historic Northern Ethiopia',
    tag: 'Cave Church',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/yemrehanna-kristos.jpg',
    teaser:
      'A built church of wood and stone, hidden inside a cave above Lalibela.',
    intro:
      'One of Ethiopia’s best-preserved late-Aksumite buildings, constructed in alternating layers of wood and stone inside a vast natural cave.',
    bestTime: 'October to April',
    duration: 'Half day',
    altitude: '2,700 m',
    highlights: [
      'The stepped wood-and-stone façade',
      'Painted and carved interior ceilings',
      'A walk through juniper woodland to the cave',
      'A blueprint for the rock-hewn churches of Lalibela',
    ],
    paragraphs: [
      'Unlike Lalibela’s churches, Yemrehanna Kristos was built rather than excavated, on a foundation of wood and basalt beneath an overhanging cave about 40 kilometres from town. It may predate the churches of Lalibela by several decades, and its layered façade shows clearly where their architectural language came from.',
      'Few travellers make the journey, which only adds to its atmosphere. A short drive and a gentle walk bring you to the cave, where a priest will show you the interior and the ancient remains of pilgrims kept at the back.',
    ],
  },
  {
    slug: 'yeha',
    name: 'Yeha',
    region: 'Historic Northern Ethiopia',
    tag: 'Archaeology',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849794/yeha.png',
    teaser:
      'Ethiopia’s oldest standing building: a 2,500-year-old temple near Axum.',
    intro:
      'The birthplace of Ethiopia’s earliest high civilisation, where a pre-Christian temple still stands to its full height after 25 centuries.',
    bestTime: 'September to July',
    duration: 'Half day',
    altitude: '2,100 m',
    highlights: [
      'The Great Temple of Yeha, built around the 7th to 5th century BC',
      'Polished stone blocks laid without mortar',
      'The monastery of Abba Afse and its manuscripts',
      'A scenic highland drive from Axum',
    ],
    paragraphs: [
      'Less than two hours’ drive from Axum, Yeha was a centre of the pre-Aksumite kingdom of D’mt. Its Great Temple, a single roofless chamber about 20 metres long, has walls some 10 metres high built from smoothly polished stone blocks, some more than three metres long, fitted together without mortar.',
      'Beside the ruins, the monastery of Abba Afse, one of the Nine Saints, preserves manuscripts and religious treasures. It is an essential stop for anyone interested in the origins of Ethiopian civilisation.',
    ],
  },
  {
    slug: 'negash',
    name: 'Negash',
    region: 'Historic Northern Ethiopia',
    tag: 'Islamic Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/negash.jpg',
    teaser:
      'Site of Africa’s first Muslim settlement and a symbol of religious coexistence.',
    intro:
      'A small village in Tigray where the Christian king of Aksum gave refuge to the earliest followers of the Prophet Muhammad in the 7th century.',
    bestTime: 'September to July',
    duration: '1 to 2 hours',
    altitude: '2,000 m',
    highlights: [
      'The Al-Nejashi Mosque, rebuilt on a historic site',
      'Tombs of the early Muslim refugees',
      'The story of the first Hijra to Abyssinia',
      'An easy stop on the road between Mekelle and Wukro',
    ],
    paragraphs: [
      'Negash lies about 60 kilometres north of Mekelle. Tradition holds that early Muslims, including members of the Prophet Muhammad’s family, fled persecution in Mecca and were welcomed here by the Aksumite king, known in Arabic as al-Najashi. It is regarded as the site of the first mosque in Africa.',
      'For Ethiopians of both faiths, Negash remains a powerful reminder of the country’s long tradition of peaceful coexistence between Christian and Muslim communities.',
    ],
  },
  {
    slug: 'abune-yosef',
    name: 'Abune Yosef',
    region: 'Historic Northern Ethiopia',
    tag: 'Highland Trekking',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793090614/abune-yosef-summit-hikers.webp',
    teaser:
      'A 4,284-metre massif above Lalibela with Ethiopian wolves and gelada.',
    intro:
      'One of the most spectacular mountains of the Lasta massif: a fragile Afro-alpine world of giant lobelias, rare wildlife and remote farming villages.',
    bestTime: 'September to May',
    duration: '2 to 4 days',
    altitude: '3,000 to 4,284 m',
    highlights: [
      'A chance of seeing the endangered Ethiopian wolf',
      'Large troops of gelada on the grasslands',
      'Community guesthouses on the trek from Lalibela',
      'More than 220 bird species, including endemics',
    ],
    paragraphs: [
      'Rising to 4,284 metres in North Wollo, Abune Yosef is among the highest mountains in Ethiopia. Its habitats range from montane dry forest and juniper woodland to Afro-alpine grassland above 3,500 metres, home to at least 43 mammal species, including the Ethiopian wolf, gelada, klipspringer and leopard, and more than 220 species of birds.',
      'On the northwestern slopes, farming communities grow barley, potatoes and lentils at more than 3,300 metres. Community-run guesthouses make it possible to trek here from Lalibela, combining extraordinary scenery with genuine highland hospitality.',
    ],
  },
  {
    slug: 'asheton-maryam',
    name: 'Asheton Maryam',
    region: 'Historic Northern Ethiopia',
    tag: 'Mountain Monastery',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/asheton-maryam.jpg',
    teaser:
      'A cliff-top monastery above Lalibela with sweeping views of the Lasta mountains.',
    intro:
      'Carved into the side of Mount Abune Yosef at around 3,150 metres, this monastery is traditionally attributed to King Na’akueto La’ab, Lalibela’s nephew.',
    bestTime: 'October to April',
    duration: 'Half day',
    altitude: '3,150 m',
    highlights: [
      'A scenic hike or mule ride from Lalibela',
      'Ancient crosses, manuscripts and church treasures',
      'Panoramic views over Lalibela and the Lasta range',
    ],
    paragraphs: [
      'Asheton Maryam sits high above Lalibela and is reached by a steep path of about one and a half hours, rewarding visitors with superb views and a quiet, atmospheric church partly cut into the rock.',
      'The priests here keep processional crosses, illuminated manuscripts and other treasures, which they are often happy to show. It is a favourite excursion on our Timkat and longer Lalibela journeys.',
    ],
  },

  // ─── Eastern Ethiopia ───────────────────────────────────────────────────
  {
    slug: 'dire-dawa',
    name: 'Dire Dawa',
    region: 'Eastern Ethiopia',
    tag: 'Railway City',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/dire-dawa.jpg',
    teaser:
      'Ethiopia’s railway city, founded where the line from Djibouti reached the hills.',
    intro:
      'A lively commercial city with colonial-era architecture, colourful markets and a historic railway station, and the gateway to Harar.',
    bestTime: 'October to March',
    duration: 'Half day to 1 day',
    altitude: '1,200 m',
    highlights: [
      'The historic railway station and old locomotives',
      'Kafira market, where camel caravans once arrived',
      'The French-influenced old town of Kezira',
      'Easy flights from Addis Ababa',
    ],
    paragraphs: [
      'Dire Dawa was founded in 1902 when the Ethiopia-Djibouti railway reached the area, and it quickly grew into a hub for trade and industry. Its tree-lined streets, arcaded buildings and multicultural atmosphere make it unlike any other city in Ethiopia.',
      'Most travellers pass through on the way to Harar, about an hour away, but the markets, railway heritage and relaxed pace are worth a few hours of their own.',
    ],
  },
  {
    slug: 'sof-omar-cave',
    name: 'Sof Omar Cave',
    region: 'Eastern Ethiopia',
    tag: 'Natural Wonder',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/sof-omar.jpg',
    teaser:
      'Ethiopia’s longest cave system, carved through limestone by the Weyib River.',
    intro:
      'More than 15 kilometres of passages, pillars and domed chambers, sacred to local Muslims and a natural extension of a Bale Mountains journey.',
    bestTime: 'October to March',
    duration: '1 day',
    altitude: '1,300 m',
    highlights: [
      'The Chamber of Columns with pillars up to 20 metres high',
      'The underground course of the Weyib River',
      'Shrines connected with Sheikh Sof Omar',
      'Dik-dik, kudu and dry-country birds around the entrance',
    ],
    paragraphs: [
      'Sof Omar lies east of the Bale Mountains, where the Weyib River has cut an extraordinary network of limestone caves stretching for about 15 kilometres, one of the longest cave systems in Africa. Inside are towering pillars, natural arches, domes and deep chambers.',
      'According to tradition the caves sheltered Sheikh Sof Omar in the 12th century, and they remain a place of pilgrimage. A guided walk through the main section takes around an hour, and can easily be added to a Bale Mountains itinerary.',
    ],
  },

  // ─── Addis Ababa & surroundings ─────────────────────────────────────────
  {
    slug: 'addis-ababa',
    name: 'Addis Ababa',
    region: 'Addis Ababa & Surroundings',
    tag: 'Capital City',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849746/addis-abebe.jpg',
    teaser:
      'Africa’s diplomatic capital: museums, cathedrals, markets and coffee.',
    intro:
      'The “New Flower”, founded by Emperor Menelik II and Empress Taytu in 1886, is the political, cultural and culinary heart of Ethiopia and the gateway to the country.',
    bestTime: 'Year-round',
    duration: '1 to 2 days',
    altitude: '2,355 m',
    highlights: [
      'Lucy and three million years of human history at the National Museum',
      'Holy Trinity Cathedral and the tomb of Emperor Haile Selassie',
      'Merkato, one of the largest open-air markets in Africa',
      'Panoramic views from Mount Entoto',
      'Traditional dinner with music, dance and a coffee ceremony',
    ],
    paragraphs: [
      'With a population of several million, Addis Ababa is home to the headquarters of the African Union and the UN Economic Commission for Africa, earning it the title of Africa’s diplomatic capital. It is also one of the highest capital cities in the world.',
      'The city offers a fascinating blend of history and modern life: the fossil of Lucy (Australopithecus afarensis) at the National Museum, the Ethnological Museum in Haile Selassie’s former palace, Holy Trinity Cathedral, Unity Park, the bustle of Merkato and the cool forests of Entoto above the city. Every one of our journeys begins here.',
    ],
  },
  {
    slug: 'museums-and-monuments',
    name: 'Museums & Monuments of Addis Ababa',
    region: 'Addis Ababa & Surroundings',
    tag: 'Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/addis-museum.jpg',
    teaser:
      'Lucy, imperial treasures and the story of one of the world’s oldest nations.',
    intro:
      'From the 3.2-million-year-old fossil of Lucy to the palace of Haile Selassie, the capital’s museums are the perfect introduction to Ethiopia.',
    bestTime: 'Year-round',
    duration: 'Half day to 1 day',
    altitude: '2,355 m',
    highlights: [
      'Lucy and Selam at the National Museum of Ethiopia',
      'The Ethnological Museum in Haile Selassie’s former palace',
      'The Red Terror Martyrs’ Memorial Museum',
      'Holy Trinity Cathedral and St George’s Cathedral',
    ],
    paragraphs: [
      'The National Museum houses Ethiopia’s most important archaeological and historical collections, including Lucy, the 3.2-million-year-old hominid discovered in the Afar in 1974. The Ethnological Museum, inside the former palace of Emperor Haile Selassie at Addis Ababa University, presents the traditions, crafts and beliefs of Ethiopia’s many peoples.',
      'Combine them with the city’s cathedrals and monuments for a rich day that explains the origins of humanity, the rise of ancient kingdoms and the making of modern Ethiopia.',
    ],
  },
  {
    slug: 'entoto',
    name: 'Entoto',
    region: 'Addis Ababa & Surroundings',
    tag: 'Nature Park',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/entoto.jpg',
    teaser:
      'Forested hills above the capital with views, history and fresh mountain air.',
    intro:
      'The eucalyptus-covered ridge where Menelik II founded his capital, now home to Entoto Natural Park and the historic church of Entoto Maryam.',
    bestTime: 'Year-round',
    duration: 'Half day',
    altitude: '2,600 to 3,100 m',
    highlights: [
      'Panoramic views over Addis Ababa',
      'Entoto Maryam Church, where Menelik II was crowned',
      'Walking, cycling and horse-riding trails',
      'Around 200 bird species, including the Abyssinian catbird',
    ],
    paragraphs: [
      'Entoto rises between 2,600 and 3,100 metres on the northern edge of the city. Menelik II built his first palace and the church of Entoto Maryam here before moving down to found Addis Ababa, and the area remains rich in history.',
      'Entoto Natural Park now offers forest trails, viewpoints, restaurants and outdoor activities, and the ridge is a favourite training ground for Ethiopia’s long-distance runners at dawn.',
    ],
  },
  {
    slug: 'unity-park',
    name: 'Unity Park',
    region: 'Addis Ababa & Surroundings',
    tag: 'Palace Gardens',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793090614/unity-park-palace-hall.jpg',
    teaser:
      'The grounds of Menelik II’s Grand Palace, opened to the public in 2019.',
    intro:
      'A 40-acre park inside the historic National Palace compound, with royal residences, banquet halls, gardens and a zoo.',
    bestTime: 'Year-round',
    duration: '2 to 3 hours',
    altitude: '2,355 m',
    highlights: [
      'Menelik II’s original palace buildings and throne halls',
      'Indigenous gardens and a small zoo with Abyssinian lions',
      'Exhibitions on Ethiopia’s regions and history',
      'An easy addition to an Addis Ababa city tour',
    ],
    paragraphs: [
      'Unity Park opened in 2019 within the Grand Palace compound, the seat of Ethiopian government for more than a century. Visitors can walk through restored royal residences, banqueting halls and gardens dating from the time of Menelik II.',
      'Pavilions celebrate the cultures of Ethiopia’s regions, while the zoo and landscaped grounds make it a pleasant stop for families and history lovers alike.',
    ],
  },
  {
    slug: 'menagesha-suba-forest',
    name: 'Menagesha Suba Forest',
    region: 'Addis Ababa & Surroundings',
    tag: 'Ancient Forest',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/menagesha.jpg',
    teaser:
      'One of Africa’s oldest protected forests, just 45 kilometres from Addis Ababa.',
    intro:
      'Ancient juniper and podocarpus forest on the slopes of Mount Wechecha, said to have been protected since the 15th century.',
    bestTime: 'October to May',
    duration: '1 day',
    altitude: '2,300 to 3,385 m',
    highlights: [
      'Hiking trails through giant juniper and Hagenia trees',
      'The extinct volcano of Mount Wechecha',
      'Menelik’s bushbuck, colobus monkeys and endemic birds',
      'Fresh mountain air close to the capital',
    ],
    paragraphs: [
      'About 2,500 hectares of indigenous forest cover the southern and western slopes of Mount Wechecha, an extinct volcano reaching 3,385 metres. It is one of the largest remaining patches of native forest near the capital and was a royal forest in the time of Menelik II.',
      'The forest shelters the endemic Menelik’s bushbuck, leopards and colobus monkeys, and birds such as the black-winged lovebird, Abyssinian woodpecker and Abyssinian catbird, ideal for a day of hiking and birdwatching.',
    ],
  },
  {
    slug: 'wenchi-crater-lake',
    name: 'Wenchi Crater Lake',
    region: 'Addis Ababa & Surroundings',
    tag: 'Volcanic Lake',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/wenchi.jpg',
    teaser:
      'An island monastery, hot springs and green hills inside an extinct volcano.',
    intro:
      'About 150 kilometres west of Addis Ababa, a deep blue lake fills the caldera of an extinct volcano high in the Oromia highlands.',
    bestTime: 'October to June',
    duration: '1 day',
    altitude: '2,800 to 3,386 m',
    highlights: [
      'Hiking or horse riding down to the lake shore',
      'Boat trip to the island monastery of Cherkos',
      'Hot springs and waterfalls in the valley',
      'Community-run eco-tourism with local guides',
    ],
    paragraphs: [
      'Wenchi is one of the most beautiful landscapes in central Ethiopia. Farmland, forest and waterfalls ring the crater, and a community-run eco-tourism association provides guides, horses and boats.',
      'A typical visit includes the walk or ride down to the lake, a boat crossing to the small island monastery, and time at the hot springs before lunch with a view. It is one of our favourite day trips from the capital.',
    ],
  },
  {
    slug: 'debre-libanos',
    name: 'Debre Libanos',
    region: 'Addis Ababa & Surroundings',
    tag: 'Monastery & Gorge',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/debre-libanos.jpg',
    teaser:
      'A historic monastery on the edge of a gorge, with gelada and the Portuguese Bridge.',
    intro:
      'Founded by Saint Tekle Haymanot in the 13th century, Debre Libanos is one of Ethiopia’s most important monasteries, set on a ledge above the Jemma River gorge.',
    bestTime: 'September to May',
    duration: '1 day',
    altitude: '2,500 m',
    highlights: [
      'The monastery church with its stained-glass windows',
      'The Portuguese Bridge and gelada on the cliffs',
      'Views into the immense Blue Nile Gorge',
      'Endemic birds, including the white-winged cliff chat',
    ],
    paragraphs: [
      'About 100 kilometres north of Addis Ababa, Debre Libanos was founded in the 13th century and remains a major centre of pilgrimage. The present church was built under Haile Selassie, and the cave of Tekle Haymanot lies on the hillside above.',
      'Nearby, a short walk leads to the old stone bridge known as the Portuguese Bridge, where gelada graze on the cliff edges, and further north the road reaches the rim of the Blue Nile Gorge, more than a kilometre deep.',
    ],
  },
  {
    slug: 'tiya-and-adadi-mariam',
    name: 'Tiya & Adadi Mariam',
    region: 'Addis Ababa & Surroundings',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/tiya.jpg',
    teaser:
      'Mysterious carved stelae and a rock-hewn church, an easy day from Addis Ababa.',
    intro:
      'South of the capital, a UNESCO-listed field of engraved standing stones and a semi-monolithic church attributed to the time of King Lalibela.',
    bestTime: 'Year-round',
    duration: '1 day',
    altitude: '2,000 to 2,200 m',
    highlights: [
      'Tiya’s 36 standing stelae engraved with swords and symbols',
      'Adadi Mariam, a rock-hewn church carved into the hillside',
      'The Melka Kunture prehistoric site on the Awash River',
      'Rural Gurage and Oromo villages along the way',
    ],
    paragraphs: [
      'Tiya, inscribed by UNESCO in 1980, is one of the most important of the many stelae sites in the Soddo region. Its 36 monuments, some engraved with enigmatic swords and symbols, mark ancient burial grounds whose builders remain a mystery.',
      'Adadi Mariam, about 70 kilometres from Addis Ababa, is a semi-monolithic church carved into soft rock, traditionally linked to King Lalibela and still in use by the local community.',
    ],
  },

  // ─── Nature & Wildlife ──────────────────────────────────────────────────
  {
    slug: 'erta-ale',
    name: 'Erta Ale',
    region: 'Nature & Wildlife',
    tag: 'Active Volcano',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792850077/erta-ale.png',
    teaser:
      'The “Smoking Mountain”: one of the few volcanoes on earth with a lava lake.',
    intro:
      'A basaltic shield volcano in the Danakil whose summit crater has held molten lava for more than a century.',
    bestTime: 'November to March',
    duration: '1 to 2 days',
    altitude: '613 m',
    highlights: [
      'An evening trek to the crater rim with camels carrying the camp',
      'The glow of the lava against the desert night sky',
      'Black lava fields stretching to the horizon',
      'Sunrise over the Danakil before the descent',
    ],
    paragraphs: [
      'Erta Ale means “Smoking Mountain” in the Afar language. Its pit craters have hosted a persistent lava lake since at least the early 20th century, one of very few in the world, although activity varies and the lake level rises and falls.',
      'The hike from Dodom takes around three hours and is made in the cool of the evening, with camels carrying mattresses, food and water. We design every Erta Ale excursion around the group’s fitness, the weather and current volcanic conditions.',
    ],
  },
  {
    slug: 'awash-national-park',
    name: 'Awash National Park',
    region: 'Nature & Wildlife',
    tag: 'Safari',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/awash-oryx.jpg',
    teaser:
      'Oryx plains, hot springs and a waterfall, three hours east of the capital.',
    intro:
      'Ethiopia’s most accessible safari park, set around the dormant Fantale volcano and the gorge of the Awash River.',
    bestTime: 'October to April',
    duration: '2 to 3 days',
    altitude: '750 to 2,007 m',
    highlights: [
      'Beisa oryx and Soemmerring’s gazelle on the Ilala Sala plains',
      'The Awash Falls tumbling into the river gorge',
      'The palm-fringed hot springs at Filwoha',
      'More than 450 recorded bird species',
    ],
    paragraphs: [
      'Straddling the Awash River in the lowlands east of Addis Ababa, the park combines arid acacia woodland, open grassland and riverine forest. Wildlife includes Beisa oryx, Swayne’s hartebeest, gerenuk, warthogs and baboons, and the birdlife is outstanding.',
      'The Awash Falls, where the river plunges into its gorge, are a highlight, as are the clear blue hot-spring pools at Filwoha. Its proximity to the capital makes Awash ideal for a short safari.',
    ],
  },
  {
    slug: 'abijatta-shalla',
    name: 'Abijatta-Shalla National Park',
    region: 'Nature & Wildlife',
    tag: 'Rift Valley Lakes',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/abijatta-flamingo.jpg',
    teaser:
      'Two very different soda lakes, flamingos, pelicans and steaming hot springs.',
    intro:
      'In the heart of the Rift Valley, the shallow, bird-rich Lake Abijatta lies beside the deep volcanic caldera of Lake Shalla.',
    bestTime: 'September to May',
    duration: '1 to 2 days',
    altitude: '1,540 to 2,075 m',
    highlights: [
      'Lesser and greater flamingos on Lake Abijatta',
      'Great white pelicans breeding on Shalla’s islands',
      'Hot springs on the shore of Lake Shalla',
      'Acacia woodland with ostrich and Grant’s gazelle',
    ],
    paragraphs: [
      'Both lakes are terminal soda lakes with no outlet, but they could hardly be more different. Abijatta is shallow, with a fluctuating water level and fresh water flowing in through the Horakello stream, where water birds gather to drink and bathe. Shalla, by contrast, fills a deep crater surrounded by volcanic cliffs.',
      'Together they make one of Ethiopia’s best birding destinations, easily combined with a night at nearby Lake Langano.',
    ],
  },
  {
    slug: 'rift-valley-lakes',
    name: 'Rift Valley Lakes',
    region: 'Nature & Wildlife',
    tag: 'Lakes & Birdlife',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/langano.jpg',
    teaser:
      'Ziway, Langano and Hawassa: a chain of lakes alive with birds and fishermen.',
    intro:
      'South of Addis Ababa, the Great Rift Valley holds a string of lakes, each with its own character, linking the capital with the coffee lands and the Omo Valley.',
    bestTime: 'September to May',
    duration: '1 to 3 days',
    altitude: '1,580 to 1,700 m',
    highlights: [
      'Marabou storks and pelicans at the Lake Ziway shore',
      'Swimming and lodges on Lake Langano',
      'The morning fish market at Lake Hawassa',
      'Wondo Genet hot springs and forest birding',
    ],
    paragraphs: [
      'Lake Ziway is known for its fishermen and island monasteries; Lake Langano, with its reddish-brown water, is one of the few lakes in Ethiopia considered free of bilharzia and is popular for relaxing stays; Lake Hawassa is famous for its lively fish market, where marabou storks wait for scraps.',
      'Almost every southern journey passes through the Rift Valley, and the lakes are excellent for birdwatching at any time of year.',
    ],
  },
  {
    slug: 'nech-sar-national-park',
    name: 'Nech Sar National Park',
    region: 'Nature & Wildlife',
    tag: 'Safari',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/nechsar.jpg',
    teaser:
      'Zebra plains and giant crocodiles between Lake Abaya and Lake Chamo.',
    intro:
      'Near Arba Minch, savannah and groundwater forest fill the land between two great lakes, crossed by the narrow “Bridge of God”.',
    bestTime: 'October to March',
    duration: '1 to 2 days',
    altitude: '1,108 to 1,650 m',
    highlights: [
      'Boat trip on Lake Chamo to the “crocodile market”',
      'Burchell’s zebra and Grant’s gazelle on the Nech Sar plains',
      'Views from the Bridge of God between the two lakes',
      'Around 190 bird species, including the kori bustard',
    ],
    paragraphs: [
      'Located about 500 kilometres south of Addis Ababa, the park covers some 514 square kilometres of savannah, bushland and groundwater forest fed by the springs that give Arba Minch (“Forty Springs”) its name. Lake Chamo is known for its very large Nile crocodiles and hippos.',
      'From Arba Minch, travellers can combine Nech Sar with the Dorze highlands, Konso and the onward journey to the Omo Valley.',
    ],
  },
  {
    slug: 'mago-national-park',
    name: 'Mago National Park',
    region: 'Nature & Wildlife',
    tag: 'Wilderness',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/mago.jpg',
    teaser:
      'Savannah and riverine forest on the Omo, home of the Mursi people.',
    intro:
      'A 2,162-square-kilometre park on the east bank of the Omo River, where wildlife and some of Ethiopia’s most distinctive cultures share the land.',
    bestTime: 'Year-round except April and May',
    duration: '1 day',
    altitude: '450 to 2,528 m',
    highlights: [
      'Mursi villages in the hills of the park',
      'Grass savannah below Mount Mago',
      'Buffalo, giraffe and Lelwel hartebeest',
      'An easy excursion from Jinka',
    ],
    paragraphs: [
      'Around 770 kilometres southwest of Addis Ababa, Mago National Park is mainly grass savannah with forest along its rivers. Some 56 species of mammals have been recorded, including buffalo, giraffe, elephant, lion, leopard and gerenuk, although wildlife is shy and best regarded as a bonus.',
      'Most travellers visit Mago to meet the Mursi, whose villages lie within and around the park.',
    ],
  },
  {
    slug: 'omo-national-park',
    name: 'Omo National Park',
    region: 'Nature & Wildlife',
    tag: 'Remote Wilderness',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793014223/omo-national-park-eland.webp',
    teaser:
      'Ethiopia’s largest national park: true wilderness on the west bank of the Omo.',
    intro:
      'More than 4,000 square kilometres of savannah, riverine forest and hills, among the least-visited wildlife areas in East Africa.',
    bestTime: 'November to March',
    duration: 'Expedition',
    altitude: '400 to 1,500 m',
    highlights: [
      'Eland, oryx, buffalo and Burchell’s zebra',
      'The remote west bank of the Omo River',
      'Surma and Me’en communities nearby',
      'Genuine expedition travel far from other visitors',
    ],
    paragraphs: [
      'Omo National Park covers roughly 4,068 square kilometres of wilderness. Eland, oryx, Lelwel hartebeest, buffalo, giraffe, elephant, lion, leopard and cheetah roam its plains, though access is difficult and facilities minimal.',
      'Visits are by special arrangement as part of a supported expedition, often combined with the Surma (Suri) communities around Kibish.',
    ],
  },
  {
    slug: 'chebera-churchura-national-park',
    name: 'Chebera Churchura National Park',
    region: 'Other Destinations & Experiences',
    tag: 'Elephants',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793099700/chebera-churchura-forest-valley.jpg',
    teaser:
      'Green forests, waterfalls and one of Ethiopia’s largest elephant herds.',
    intro:
      'A remote and lush park in the Omo-Gibe basin, protecting elephants, lions, buffalo and hippos among forests, rivers and wetlands.',
    bestTime: 'November to March',
    duration: '2 to 3 days',
    altitude: '600 to 2,000 m',
    highlights: [
      'African elephants in a forest setting',
      'Waterfalls, hot springs and river valleys',
      'Dawro and Konta communities around the park',
      'Rich birdlife in diverse habitats',
    ],
    paragraphs: [
      'Covering about 1,250 square kilometres, Chebera Churchura is characterised by montane and riverine forest, woodland and wetland. It is one of Ethiopia’s most important elephant conservation areas and also shelters lion, leopard, buffalo and hippo.',
      'Surrounded by the Dawro and Konta peoples, it offers authentic wilderness and cultural encounters for travellers looking beyond the usual routes.',
    ],
  },
  {
    slug: 'gambella-national-park',
    name: 'Gambela National Park',
    region: 'Other Destinations & Experiences',
    tag: 'Wildlife Migration',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793100841/gambela-park-white-eared-kob-herd.jpg',
    teaser:
      'Ethiopia’s tropical west, with the great migration of the white-eared kob.',
    intro:
      'The vast grass plains of the Baro River region: one of Ethiopia’s largest and least-explored protected areas.',
    bestTime: 'December to April',
    duration: 'Expedition',
    altitude: '400 to 770 m',
    highlights: [
      'The seasonal migration of the white-eared kob',
      'Nile lechwe, buffalo, elephant and hippo',
      'Shoebill and other wetland birds',
      'Anuak and Nuer communities along the Baro River',
    ],
    paragraphs: [
      'Gambela is Ethiopia’s true tropical zone, a land of tall Sudanese grass, wetlands and rivers. Gambella National Park is home to elephant, buffalo, lion, leopard, hippo, Nile crocodile and rare antelopes such as the Nile lechwe, and hosts one of Africa’s largest mammal migrations when vast herds of white-eared kob move across the plains.',
      'Remote and with limited infrastructure, Gambela is best visited as a tailor-made expedition for adventurous travellers.',
    ],
  },
  {
    slug: 'gambela',
    name: 'Gambela',
    region: 'Western Ethiopia',
    tag: 'Baro River Gateway',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793099700/gambela-village-sunset.jpg',
    teaser:
      'A riverside town on the Baro, gateway to Ethiopia’s tropical west.',
    intro:
      'The capital of the Gambela Region, on the banks of the Baro River in the western lowlands near the border with South Sudan.',
    bestTime: 'November to March',
    duration: '1 to 2 days',
    altitude: 'About 500 m',
    highlights: [
      'Life along the banks of the Baro River',
      'Anuak and Nuer communities and their traditions',
      'Traces of the early 20th-century river port',
      'The starting point for Gambela National Park',
    ],
    paragraphs: [
      'Gambela lies in the hot, green lowlands of western Ethiopia, where the Baro River flows west towards South Sudan and the Nile. In the early twentieth century the town was a river port leased to Anglo-Egyptian Sudan, and steamers carried coffee and other goods downriver; traces of that era can still be seen along the riverbank.',
      'Today Gambela is home to the Anuak and Nuer peoples, among others, and is the base for expeditions into Gambela National Park. Ethiopian Airlines flies to Gambela from Addis Ababa, and visits are best arranged as part of a tailor-made journey to the west.',
    ],
  },
  {
    slug: 'jimma',
    name: 'Jimma',
    region: 'Western Ethiopia',
    tag: 'Royal Coffee Town',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793100842/jimma-abba-jifar-palace-aerial.jpg',
    teaser:
      'The old capital of the Kingdom of Jimma, at the heart of Ethiopia’s coffee country.',
    intro:
      'The largest city in southwestern Ethiopia, once the seat of King Abba Jifar II and still a centre of the coffee trade.',
    bestTime: 'October to February',
    duration: '1 to 2 days',
    altitude: 'About 1,780 m',
    highlights: [
      'The palace of King Abba Jifar II above the city',
      'The Jimma Museum and its royal collection',
      'Coffee farms and markets in the surrounding hills',
      'A gateway to Kafa and the southwestern forests',
    ],
    paragraphs: [
      'Jimma was the capital of the Kingdom of Jimma, one of the Gibe kingdoms of the southwest. Its best-known ruler, Abba Jifar II, reigned from 1878 until 1932, and his wooden palace and mosque still stand on a hill above the city. The Jimma Museum holds objects from the royal court.',
      'Surrounded by green hills and coffee farms, Jimma remains one of Ethiopia’s main coffee-trading centres and a natural stop on journeys to Kafa, Bonga and Mizan Teferi. The city has an airport with flights from Addis Ababa.',
    ],
  },
  {
    slug: 'mizan-teferi',
    name: 'Mizan Teferi',
    region: 'Western Ethiopia',
    tag: 'Forests & Coffee',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793099700/mizan-coffee-drying-beds.webp',
    teaser:
      'A green highland town among forests and coffee estates in Ethiopia’s far southwest.',
    intro:
      'A town in the Bench Sheko Zone, surrounded by forest and coffee plantations, and the gateway to the remote Surma lands.',
    bestTime: 'November to February',
    duration: '1 to 2 days',
    altitude: 'About 1,450 m',
    highlights: [
      'The Bebeka coffee estate, one of the largest in Ethiopia',
      'Forest walks rich in birdlife and primates',
      'The Bench people and their local markets',
      'The road south towards Kibish and the Surma (Suri)',
    ],
    paragraphs: [
      'Mizan Teferi sits in one of the wettest and greenest corners of Ethiopia, where the highlands fall away towards the lowlands of the Omo. The surrounding forests and plantations make it a rewarding stop for travellers interested in coffee and nature.',
      'Nearby Bebeka is one of the country’s largest coffee estates. Mizan Teferi is also the starting point for expeditions south to Kibish and the Surma (Suri) communities, and combines naturally with Jimma, Bonga and the Kafa Biosphere Reserve.',
    ],
  },
  {
    slug: 'kafta-sheraro-national-park',
    name: 'Kafta Sheraro National Park',
    region: 'Other Destinations & Experiences',
    tag: 'Elephants',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/kafta.jpg',
    teaser:
      'Elephant country between the Tekeze River and the Eritrean border.',
    intro:
      'Established in 2007 in northwestern Tigray, this park forms part of a large transboundary ecosystem with Eritrea’s Gash-Setit.',
    bestTime: 'November to March',
    duration: 'Expedition',
    altitude: '550 to 1,000 m',
    highlights: [
      'One of Ethiopia’s most important elephant refuges',
      'Acacia savannah and riverine forest along the Tekeze',
      'Greater kudu, bushbuck and rich birdlife',
      'Remote, rarely visited wilderness',
    ],
    paragraphs: [
      'Kafta Sheraro covers some 5,000 square kilometres between the Tekeze River in the north and the Ruwassa River in the south, about 600 kilometres from Mekelle. Its woodland, grassland and acacia savannah support African elephants, greater kudu, leopard, hyena and many birds.',
      'Visits require careful planning and current local advice, and are arranged on request.',
    ],
  },

  // ─── Southern Ethiopia & Omo Valley ────────────────────────────────────
  {
    slug: 'konso',
    name: 'Konso',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'UNESCO Cultural Landscape',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/konso-village.webp',
    teaser:
      'Walled hilltop villages, stone terraces and carved wooden waka memorials.',
    intro:
      'A UNESCO-listed cultural landscape of dry-stone terraces and fortified villages, shaped by more than 400 years of Konso farming tradition.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day to 1 day',
    altitude: '1,650 m',
    highlights: [
      'Walking through the gates and lanes of a walled village',
      'Mora houses where men gather and boys sleep',
      'Waka: carved wooden figures commemorating heroes',
      'Terraced hillsides stretching to the horizon',
    ],
    paragraphs: [
      'The Konso live among basalt hills in southern Ethiopia, where generations of farmers have built stone terraces to cultivate sorghum, maize and cotton in a challenging environment. Their villages, built on hilltops and enclosed by stone walls, are entered through narrow gates and organised around communal mora houses.',
      'The Konso Cultural Landscape was inscribed by UNESCO in 2011. A visit is a highlight of any journey between Arba Minch and the Omo Valley.',
    ],
  },
  {
    slug: 'dorze-and-chencha',
    name: 'Dorze & Chencha',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'Highland Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/dorze.jpg',
    teaser:
      'Beehive-shaped bamboo houses and master weavers in the Guge highlands.',
    intro:
      'High above Arba Minch, the Dorze people are famous for their towering houses of bamboo and ensete leaves and for weaving some of Ethiopia’s finest cotton.',
    bestTime: 'Year-round',
    duration: 'Half day',
    altitude: '2,600 to 2,900 m',
    highlights: [
      'Traditional Dorze houses up to 12 metres tall',
      'Weavers at work on handlooms',
      'Tasting kocho bread made from false banana',
      'Views over Lake Abaya and Lake Chamo',
    ],
    paragraphs: [
      'The Dorze live in the cool Guge mountains, where their distinctive beehive-shaped houses can last for generations. Families farm ensete (false banana) and are renowned as weavers of the cotton shamma worn throughout Ethiopia.',
      'A visit includes a family home, a weaving demonstration and a taste of local food and drink, with spectacular views over the Rift Valley lakes on the drive up from Arba Minch.',
    ],
  },
  {
    slug: 'arba-minch',
    name: 'Arba Minch',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'Gateway Town',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849744/arba-minch.jpg',
    teaser:
      'The town of “Forty Springs”, between two lakes on the road to the Omo.',
    intro:
      'Set on the Rift Valley escarpment above Lake Abaya and Lake Chamo, Arba Minch is the gateway to Nech Sar, the Dorze highlands and the Omo Valley.',
    bestTime: 'Year-round',
    duration: '1 to 2 days',
    altitude: '1,285 m',
    highlights: [
      'Boat safaris on Lake Chamo',
      'Views across the Bridge of God',
      'Day trips to Dorze and Chencha',
      'The forest springs that give the town its name',
    ],
    paragraphs: [
      'Arba Minch is named after the springs that bubble up in the groundwater forest below the town. It sits between Lake Abaya, tinted red by sediment, and Lake Chamo, home to large crocodiles and hippos.',
      'With good hotels and an airport, it is the natural base for exploring southern Ethiopia before continuing to Konso, Jinka and Turmi.',
    ],
  },
  {
    slug: 'hawassa',
    name: 'Hawassa',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'Lakeside City',
    image: '/images/hawassa.webp',
    teaser:
      'A relaxed lakeside city in the Rift Valley, known for its morning fish market.',
    intro:
      'On the shore of Lake Hawassa, about 275 km south of Addis Ababa, Hawassa is a green, easy-going city and a natural stop between the capital and the south.',
    bestTime: 'Year-round',
    duration: '1 to 2 days',
    altitude: '1,708 m',
    highlights: [
      'The early-morning fish market on the lakeshore',
      'Marabou storks, pelicans and kingfishers along the water',
      'Boat trips on Lake Hawassa to look for hippos',
      'Sunset views over the lake from Tabor Hill',
    ],
    paragraphs: [
      'Hawassa lies on the eastern shore of Lake Hawassa, a freshwater lake in the Great Rift Valley. Its tree-lined avenues and lakeside promenade make it one of the most pleasant cities in southern Ethiopia.',
      'The city is best known for its fish market, where fishermen bring in their catch at dawn while marabou storks wait for scraps. The lake is also home to hippos and a rich variety of water birds.',
      'Hawassa is a convenient overnight stop on journeys between Addis Ababa, Arba Minch and the Omo Valley, and a base for the hot springs of Wondo Genet and the coffee lands of Sidama.',
    ],
  },
  {
    slug: 'mursi-people',
    name: 'Mursi People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-mursi-woman.webp',
    teaser:
      'Cattle herders of Mago National Park, known for the clay lip plate.',
    intro:
      'One of the best-known peoples of the Omo Valley, living between the Omo River and Mago National Park.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '500 to 1,500 m',
    highlights: [
      'The lip-plate tradition of Mursi women',
      'White body and face painting',
      'Cattle-centred culture and Donga stick fighting',
      'Villages in the hills of Mago National Park',
    ],
    paragraphs: [
      'The Mursi are agro-pastoralists whose cattle are central to wealth, marriage and identity, and who cultivate sorghum along the Omo River. Some communities move seasonally with the availability of water and grazing.',
      'They are internationally known for the lip plate worn by some women, a symbol of identity and beauty, and for body painting with white clay. Visits are usually made from Jinka; we ask that photographs are always taken with consent.',
    ],
  },
  {
    slug: 'hamar-people',
    name: 'Hamar People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793014223/omo-hamar-woman-horn.jpg',
    teaser:
      'Ochre-braided hair, beaded leather, and the bull-jumping rite of passage.',
    intro:
      'Semi-pastoralists of the Hamer Bena district around Turmi and Dimeka, and among the most visited communities of the Omo Valley.',
    bestTime: 'Year-round except April and May',
    duration: '1 to 2 days',
    altitude: '900 to 1,500 m',
    highlights: [
      'The bull-jumping ceremony (ukuli bula), when it takes place',
      'Market days in Turmi and Dimeka',
      'Evening dances in Hamar villages',
      'Women’s ochre-coated hair and leather skirts',
    ],
    paragraphs: [
      'The Hamar live in a fertile part of the Omo Valley in round, grass-roofed huts set around cattle and goat enclosures. Cattle provide milk, meat and status, and families trade with their neighbours for sorghum and maize.',
      'Their best-known tradition is the bull-jumping ceremony, in which a young man runs across the backs of a line of cattle to prove his readiness for marriage, accompanied by singing, dancing and celebrations. Afterwards he joins the maza, the young men who help organise future ceremonies.',
    ],
  },
  {
    slug: 'karo-people',
    name: 'Karo People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-karo-painted-men.jpg',
    teaser:
      'Master body painters living on the banks of the Omo River.',
    intro:
      'A small community on the eastern bank of the Omo, renowned for some of the most elaborate body painting in Africa.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '400 to 500 m',
    highlights: [
      'Chalk, ochre and charcoal body art',
      'Villages perched above a sweeping bend of the river',
      'Riverside sorghum and maize gardens',
      'Ceremonial dances and beadwork',
    ],
    paragraphs: [
      'The Karo use white chalk, red ochre, yellow mineral pigments and charcoal to create striking designs on their faces and bodies for ceremonies and celebrations. Men wear clay hair buns decorated with feathers, and women are known for their beadwork and scarification.',
      'They are agro-pastoralists who farm the fertile riverbanks of the Omo. The village of Kolcho, high above the river, is one of the most beautiful places in southern Ethiopia.',
    ],
  },
  {
    slug: 'banna-people',
    name: 'Banna People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/banna.jpg',
    teaser:
      'Highland neighbours of the Hamar, famous for stilt walking and beekeeping.',
    intro:
      'Living in the hills between Key Afar and Jinka, the Banna share language and many customs with the Hamar and Bashada peoples.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '1,200 to 1,600 m',
    highlights: [
      'The Thursday market at Key Afar',
      'Young men on stilts, painted with chalk',
      'Colourful beadwork and clay hair decorations',
      'Traditional beehives in the trees',
    ],
    paragraphs: [
      'The Banna combine cattle herding with farming and are skilled beekeepers. Singing and dancing are central to their social life, and natural pigments are used for body decoration during important occasions.',
      'Key Afar’s weekly market, where Banna, Hamar and Tsemay meet to trade, is one of the liveliest in the Omo Valley.',
    ],
  },
  {
    slug: 'arbore-people',
    name: 'Arbore People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-arbore-family.webp',
    teaser:
      'Pastoralists of the dry plains near Lake Chew Bahir, with striking black headscarves.',
    intro:
      'A small community in the southern Omo Valley with ancestral ties to the Borana and Konso peoples.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '500 m',
    highlights: [
      'Colourful necklaces and black head coverings',
      'Ceremonial songs and dances',
      'Cattle camps on the dry plains',
      'An easy stop between Konso and Turmi',
    ],
    paragraphs: [
      'The Arbore are pastoralists for whom cattle are the measure of wealth and status. Music and dance are central to community life, believed to bring harmony and prosperity.',
      'Women wear layered bead necklaces and earrings, and young girls often cover their heads with black cloth against the strong sun. A visit offers insight into one of the Omo’s smaller and less-visited communities.',
    ],
  },
  {
    slug: 'ari-people',
    name: 'Ari People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-ari-woman.webp',
    teaser:
      'Farmers, potters and blacksmiths of the green highlands around Jinka.',
    intro:
      'One of the largest communities of South Omo, the Ari cultivate coffee, bananas and maize in the fertile hills surrounding Jinka.',
    bestTime: 'Year-round',
    duration: 'Half day',
    altitude: '1,500 m',
    highlights: [
      'Village walks among coffee and banana gardens',
      'Women potters at work',
      'Traditional blacksmiths forging tools',
      'Jinka’s Saturday market',
    ],
    paragraphs: [
      'Unlike many of their pastoral neighbours, the Ari are primarily farmers, and their land is among the most productive in the region. They are known for pottery, weaving and ironwork, and many families sell their crafts at Jinka market.',
      'A walk through an Ari village is a gentle and rewarding introduction to southern Ethiopian life, easily combined with the South Omo Museum.',
    ],
  },
  {
    slug: 'dassanech-people',
    name: 'Dassanech People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-dassanech-hut.webp',
    teaser:
      'Semi-nomads of the Omo delta, near the northern shore of Lake Turkana.',
    intro:
      'Living in Ethiopia’s far south near the Kenyan border, the Dassanech have adapted to one of the harshest environments in the country.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '370 m',
    highlights: [
      'Crossing the Omo River by dugout canoe at Omorate',
      'Headdresses made from beads and recycled objects',
      'Dome-shaped homes on the dry delta',
      'Cattle, goats and camels at the heart of life',
    ],
    paragraphs: [
      'The Dassanech raise cattle, goats, sheep and camels, and farm sorghum and maize on the riverbanks when floods allow. Wealth is traditionally measured in livestock.',
      'Women wear vivid jewellery and creative headpieces made from beads, metal and recycled materials. Visits begin with a short dugout crossing of the Omo at Omorate.',
    ],
  },
  {
    slug: 'nyangatom-people',
    name: 'Nyangatom People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-nyangatom-women.jpg',
    teaser:
      'Nilotic pastoralists of the west bank, famous for their heavy bead collars.',
    intro:
      'Also known as the Bume, the Nyangatom live near the borders with South Sudan and Kenya and are related to the Toposa and Turkana.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day to 1 day',
    altitude: '400 to 500 m',
    highlights: [
      'Women’s layered collars of coloured beads',
      'Semi-nomadic cattle camps',
      'Ceremonial songs and dances',
      'Remote villages on the west bank of the Omo',
    ],
    paragraphs: [
      'The Nyangatom are semi-pastoralists who move with their cattle, goats and sheep in search of grazing, while growing crops when conditions allow. Livestock represent wealth, status and security.',
      'Women wear spectacular bead necklaces, sometimes weighing several kilograms. Visiting them requires a longer excursion and is ideal for photographers and travellers seeking remote cultural encounters.',
    ],
  },
  {
    slug: 'surma-people',
    name: 'Surma (Suri) People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-surma-lip-plate.webp',
    teaser:
      'Remote cattle herders of Kibish, known for body art, lip plates and Donga.',
    intro:
      'Living in the far southwest near South Sudan, the Surma (or Suri) are culturally close to the Mursi and Me’en.',
    bestTime: 'November to March',
    duration: '2 to 3 days',
    altitude: '1,000 to 1,500 m',
    highlights: [
      'Elaborate body painting with clay and plant pigments',
      'The Donga stick-fighting ceremony',
      'Lip plates worn by some women',
      'A genuine expedition via Mizan Teferi',
    ],
    paragraphs: [
      'The Surma are pastoralists for whom cattle are central to social and economic life. Body painting is an important art form for men and women alike, and some women wear clay lip plates as a mark of identity.',
      'Men are known for Donga, a ritual stick-fighting contest that demonstrates courage and skill. Reaching Kibish is a journey in itself, best undertaken on our photography expedition.',
    ],
  },
  {
    slug: 'tsemay-people',
    name: 'Tsemay People',
    region: 'Southern Ethiopia & Omo Valley',
    tag: 'People & Culture',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-tsemay-pottery-market.jpg',
    teaser:
      'Agro-pastoralists of the Weito valley, between Konso and the Hamar.',
    intro:
      'A small community living south of Konso and east of the Hamar, with close ties to the Banna and Arbore.',
    bestTime: 'Year-round except April and May',
    duration: 'Half day',
    altitude: '600 to 1,000 m',
    highlights: [
      'Beaded leather skirts and calabash containers',
      'Men carrying small wooden headrest stools',
      'The Weito River valley',
      'Key Afar market, shared with the Banna and Hamar',
    ],
    paragraphs: [
      'The Tsemay combine livestock herding with growing sorghum and maize along the Weito River. Cattle hold great social and economic value, and a man’s status is measured by his herd.',
      'Women wear leather skirts decorated with beads and shells, while men often carry small wooden stools. Ritual dances bring the community together at ceremonies and celebrations.',
    ],
  },
  {
    slug: 'yirgacheffe-and-sidama',
    name: 'Yirgacheffe & Sidama',
    region: 'Other Destinations & Experiences',
    tag: 'Coffee Lands',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/coffee-farm.jpg',
    teaser:
      'The farms and washing stations behind some of the world’s most celebrated coffees.',
    intro:
      'In the green hills south of Hawassa, smallholder farmers grow coffee in the shade of ensete and indigenous trees, as they have for generations.',
    bestTime: 'October to January (harvest)',
    duration: '2 to 4 days',
    altitude: '1,700 to 2,200 m',
    highlights: [
      'Picking and processing during the harvest season',
      'Washing stations and raised drying beds',
      'The UNESCO-listed Gedeo agroforestry landscape',
      'Coffee ceremonies with farming families',
    ],
    paragraphs: [
      'Sidama and Yirgacheffe are names known to coffee lovers worldwide. Around Aleta Wondo, Dilla and Yirgacheffe, coffee is grown under a canopy of trees in a traditional agroforestry system; the Gedeo Cultural Landscape was inscribed by UNESCO in 2023.',
      'Our coffee journeys visit farms and washing stations, explain how cherries become green coffee, and always end with the ceremony itself: roasted, ground and brewed in a clay jebena.',
    ],
  },
  {
    slug: 'kaffa-and-bonga',
    name: 'Kafa Biosphere Reserve & Bonga',
    region: 'Other Destinations & Experiences',
    tag: 'Birthplace of Coffee',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/kaffa-forest.jpg',
    teaser:
      'Wild Arabica in the montane forests of the Kafa Biosphere Reserve.',
    intro:
      'In Ethiopia’s southwest, the Kaffa region, which gave coffee its name, still holds forests where Coffea arabica grows wild.',
    bestTime: 'October to May',
    duration: '2 to 3 days',
    altitude: '1,700 to 2,300 m',
    highlights: [
      'Forest walks to the Mankira “mother coffee” trees',
      'The UNESCO Kafa Biosphere Reserve',
      'Colobus monkeys and forest birds',
      'The Bebeka coffee estate near Mizan Teferi',
    ],
    paragraphs: [
      'Legend says coffee was discovered in Kaffa by a goatherd named Kaldi. Today the Kafa Biosphere Reserve, recognised by UNESCO in 2010, protects montane rainforest where wild coffee grows beneath the canopy.',
      'From Bonga, short treks lead into the forest at Mankira, and the journey continues to Bebeka, one of Ethiopia’s largest coffee estates, to follow the bean from farm to cup.',
    ],
  },

  // ─── Festivals & Events ─────────────────────────────────────────────────
  {
    slug: 'timkat',
    name: 'Timkat (Epiphany)',
    region: 'Festivals & Events',
    tag: 'UNESCO Intangible Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/gondar-timkat-fasilides-bath-crowd.jpg',
    teaser:
      'Ethiopia’s greatest festival: processions, holy water and joyful celebration.',
    intro:
      'Celebrated on 19 January (20 January in leap years), Timkat commemorates the baptism of Christ in the Jordan and was inscribed by UNESCO in 2019.',
    bestTime: '18 to 20 January',
    duration: '2 to 3 days',
    altitude: '2,133 m (Gondar)',
    highlights: [
      'Ketera: the eve-of-festival procession of the Tabots',
      'All-night prayers and hymns beside the water',
      'The blessing and sprinkling of the water at dawn',
      'The joyful return of the Tabots to their churches',
      'Fasilides’ Bath in Gondar, filled for the occasion',
    ],
    paragraphs: [
      'On the eve of Timkat, every church’s Tabot, a sacred replica of the Ark of the Covenant, is wrapped in rich cloth and carried in procession to a pool or river, accompanied by priests in ceremonial robes, deacons, choirs and thousands of worshippers. Prayers and hymns continue through the night.',
      'At dawn the water is blessed and sprinkled over the crowds as a renewal of baptismal vows; in Gondar, worshippers leap into Fasilides’ Bath. Later, the Tabots are escorted back to their churches with singing, dancing and celebration. Gondar, Lalibela and Addis Ababa are the most memorable places to experience it.',
    ],
  },
  {
    slug: 'meskel',
    name: 'Meskel (Finding of the True Cross)',
    region: 'Festivals & Events',
    tag: 'UNESCO Intangible Heritage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/meskel.jpg',
    teaser:
      'Bonfires, yellow daisies and songs to celebrate the discovery of the True Cross.',
    intro:
      'Celebrated on 27 September (28 in leap years) for more than 1,600 years, Meskel was inscribed by UNESCO as intangible cultural heritage in 2013.',
    bestTime: '26 to 27 September',
    duration: '1 to 2 days',
    altitude: '2,355 m (Addis Ababa)',
    highlights: [
      'The great Demera bonfire in Meskel Square, Addis Ababa',
      'Processions of priests, deacons and choirs',
      'Meskel daisies (adey abeba) carpeting the countryside',
      'Celebrations in Gondar, Axum and Lalibela',
    ],
    paragraphs: [
      'Meskel (“cross” in Ge’ez and Amharic) commemorates the discovery of the True Cross by Empress Helena, mother of Constantine the Great. Tradition holds that she followed the smoke of a bonfire to find it, and Ethiopia believes a fragment is kept at the mountain monastery of Gishen Mariam.',
      'On the eve of the festival, tall Demera bonfires decorated with yellow Meskel daisies are lit across the country, the largest in Meskel Square in Addis Ababa, surrounded by singing crowds. The direction in which the burning pole falls is said to foretell the year ahead.',
    ],
  },
  {
    slug: 'genna',
    name: 'Genna (Ethiopian Christmas)',
    region: 'Festivals & Events',
    tag: 'Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793096397/lalibela-genna-priests-flag.jpg',
    teaser:
      'An all-night vigil among the rock-hewn churches of Lalibela on 7 January.',
    intro:
      'Ethiopian Orthodox Christians celebrate Christmas on 7 January, after a 40-day fast, with one of the most moving religious gatherings in Africa.',
    bestTime: '6 to 7 January',
    duration: '2 to 3 days',
    altitude: '2,500 m (Lalibela)',
    highlights: [
      'Tens of thousands of white-robed pilgrims in Lalibela',
      'Debtera chanting from the rim of Bete Maryam',
      'Candle-lit prayers through Christmas Eve',
      'Feasting as the 40-day fast comes to an end',
    ],
    paragraphs: [
      'On Christmas Eve worshippers gather in their churches for a vigil of prayers and hymns that lasts for hours. Priests and debtera, scholars of church music and poetry, lead chants preserved since Christianity reached Ethiopia.',
      'Lalibela is the most remarkable place to experience Genna. Pilgrims walk for days to reach the rock-hewn churches, and on Christmas morning the priests’ chanting echoes across the trench of Bete Maryam. Accommodation books up early, so we recommend reserving well in advance.',
    ],
  },
  {
    slug: 'fasika',
    name: 'Fasika (Ethiopian Easter)',
    region: 'Festivals & Events',
    tag: 'Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/fasika.jpg',
    teaser:
      'Candle-lit services and celebrations that end the 55-day Lenten fast.',
    intro:
      'Ethiopian Easter follows the Orthodox calendar, usually falling in April or early May, and is preceded by Hudade, the longest fast of the year.',
    bestTime: 'March to May (date varies)',
    duration: '2 to 3 days',
    altitude: '2,500 m (Lalibela)',
    highlights: [
      'Holy Week services among Lalibela’s churches',
      'The overnight Easter vigil with candles',
      'Breaking the fast with family feasts',
      'Celebrations in Axum and Lalibela',
    ],
    paragraphs: [
      'For 55 days Orthodox Christians abstain from meat, dairy and other animal products, eating vegetarian dishes such as lentils and split peas with injera, and taking their first meal only after 3 pm on most days.',
      'On Easter Eve churches fill for an overnight service of prayer, hymns and candles that ends in the early hours. Families then break their fast with chicken, lamb, tella and tej. Holy Week in Lalibela is especially memorable.',
    ],
  },
  {
    slug: 'enkutatash',
    name: 'Enkutatash (Ethiopian New Year)',
    region: 'Festivals & Events',
    tag: 'Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792851938/enkutatesh.png',
    teaser:
      'Yellow flowers, songs and new beginnings as the rains end on 11 September.',
    intro:
      'Ethiopia follows its own calendar of thirteen months, and welcomes its New Year on 11 September (12 in leap years).',
    bestTime: '11 September',
    duration: '1 day',
    altitude: 'Nationwide',
    highlights: [
      'Fields covered with yellow adey abeba flowers',
      'Girls singing door-to-door with bouquets',
      'Church services and family feasts',
      'A countryside at its greenest after the rains',
    ],
    paragraphs: [
      'Enkutatash means “gift of jewels”. Tradition holds that when the Queen of Sheba returned from visiting King Solomon, her chiefs welcomed her by replenishing her treasury with jewels.',
      'The festival coincides with the end of the long rains, when the highlands burst into green and yellow flowers. Families exchange greetings, share festive meals and children sing traditional songs from house to house.',
    ],
  },
  {
    slug: 'ashenda',
    name: 'Ashenda',
    region: 'Festivals & Events',
    tag: 'Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792851930/ashenda.png',
    teaser:
      'A celebration of girls and young women in the towns of Tigray and Amhara.',
    intro:
      'Held in late August at the end of the Filseta fast in honour of the Virgin Mary, Ashenda fills the streets with colour, song and dance.',
    bestTime: 'Late August',
    duration: '2 to 3 days',
    altitude: '2,000 to 2,500 m',
    highlights: [
      'Girls in embroidered dresses with braided hair',
      'Skirts of tall ashenda grass worn at the waist',
      'Singing and drumming from house to house',
      'Known as Shadey, Solel and Ashendye in different regions',
    ],
    paragraphs: [
      'Ashenda takes its name from the tall green grass that girls tie around their waists for the celebration. Homes and shops are decorated with fresh grass as a sign of welcome.',
      'Young women dress in their finest traditional clothes, decorate themselves with jewellery and gather to sing, dance and drum through the streets, celebrating youth, beauty and cultural identity.',
    ],
  },
  {
    slug: 'buhe',
    name: 'Buhe',
    region: 'Festivals & Events',
    tag: 'Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793090614/buhe-bonfire-celebration.jpg',
    teaser:
      'The Feast of the Transfiguration: bonfires, bread and boys singing hoya hoye.',
    intro:
      'Celebrated on 19 August, Buhe commemorates the Transfiguration of Christ on Mount Tabor and marks the coming end of the rainy season.',
    bestTime: '19 August',
    duration: '1 day',
    altitude: 'Nationwide',
    highlights: [
      'Chibo bonfires lit in every neighbourhood',
      'Boys singing hoya hoye from door to door',
      'Special bread baked for the occasion',
      'Church services across the country',
    ],
    paragraphs: [
      'After church services, neighbours tie bundles of sticks into a chibo and set it alight, singing and dancing around the flames in a celebration similar to Meskel.',
      'Groups of boys go from house to house singing hoya hoye and receiving gifts of bread in return, a joyful and very local celebration of community.',
    ],
  },
  {
    slug: 'hidar-tsion',
    name: 'Hidar Tsion',
    region: 'Festivals & Events',
    tag: 'Pilgrimage',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/axum-zion.jpg',
    teaser:
      'Thousands of pilgrims gather in Axum to honour Mary of Zion each November.',
    intro:
      'Celebrated on 30 November (Hidar 21 in the Ethiopian calendar), Hidar Tsion is the great annual festival of the Church of Our Lady Mary of Zion in Axum.',
    bestTime: '30 November',
    duration: '2 days',
    altitude: '2,131 m (Axum)',
    highlights: [
      'Processions around the Church of St Mary of Zion',
      'The Chapel of the Tablet, said to house the Ark',
      'Pilgrims from across Ethiopia in white shawls',
      'Axum’s stelae and archaeological sites',
    ],
    paragraphs: [
      'The Church of Our Lady Mary of Zion is one of the most sacred places in Ethiopian Christianity. According to tradition, the adjoining Chapel of the Tablet houses the Ark of the Covenant.',
      'Each November, pilgrims fill the city for prayers, chanting and colourful processions. Combine the festival with Axum’s ancient monuments for a deeply memorable visit.',
    ],
  },
  {
    slug: 'eid-al-fitr',
    name: 'Eid al-Fitr',
    region: 'Festivals & Events',
    tag: 'Islamic Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/eid.jpg',
    teaser:
      'Communal prayers and family feasts marking the end of Ramadan.',
    intro:
      'Ethiopia’s Muslim communities celebrate the end of the holy month of Ramadan with prayers, hospitality and charity.',
    bestTime: 'Date follows the lunar calendar',
    duration: '1 to 3 days',
    altitude: 'Nationwide',
    highlights: [
      'Mass prayers in Addis Ababa’s stadium and squares',
      'Celebrations in Harar, Dire Dawa and Jimma',
      'Visits between family and friends',
      'Traditional food and generous hospitality',
    ],
    paragraphs: [
      'Eid al-Fitr begins on the first day of Shawwal, after the sighting of the new moon. It opens with communal prayers, followed by visits to family and friends, festive meals, gifts and charity for those in need.',
      'In Addis Ababa, huge crowds gather in white for morning prayers, while Harar, the historic centre of Islam in Ethiopia, celebrates with particular devotion.',
    ],
  },
  {
    slug: 'eid-al-adha',
    name: 'Eid al-Adha',
    region: 'Festivals & Events',
    tag: 'Islamic Festival',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792851928/Eid_al-Adha.png',
    teaser:
      'The Festival of Sacrifice, celebrated with prayers, sharing and community.',
    intro:
      'Commemorating Prophet Ibrahim’s obedience to God, Eid al-Adha is celebrated by Muslims throughout Ethiopia about 70 days after the end of Ramadan.',
    bestTime: 'Date follows the lunar calendar',
    duration: '1 to 4 days',
    altitude: 'Nationwide',
    highlights: [
      'Morning prayers in mosques and open grounds',
      'Sharing meat with relatives, neighbours and the poor',
      'Traditional dress and family gatherings',
      'Celebrations in Harar and Addis Ababa',
    ],
    paragraphs: [
      'Families gather for prayers, share meals and sacrifice sheep, goats or cattle, distributing the meat among relatives, neighbours and those in need in a spirit of generosity and compassion.',
      'Celebrations are colourful and welcoming, offering visitors a wonderful insight into Ethiopia’s religious diversity.',
    ],
  },
  {
    slug: 'great-ethiopian-run',
    name: 'Great Ethiopian Run',
    region: 'Festivals & Events',
    tag: 'Sporting Event',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/great-run.jpg',
    teaser:
      'Run 10 km at 2,400 metres with tens of thousands of Ethiopians each November.',
    intro:
      'Africa’s largest road race, founded in 2001 by the legendary Haile Gebrselassie and held every November in the streets of Addis Ababa.',
    bestTime: 'Mid to late November',
    duration: '1 day',
    altitude: '2,355 m (Addis Ababa)',
    highlights: [
      'The international 10 km road race',
      'A sea of runners in the same coloured T-shirt',
      'Music, dancing and celebration along the route',
      'A chance to spot Ethiopia’s future champions',
    ],
    paragraphs: [
      'Haile Gebrselassie, Peter Middlebrook and Abi Masefield conceived the race after the 2000 Sydney Olympics, and its first edition in 2001 attracted 10,000 runners. It has since grown to tens of thousands of participants, with a 5 km women-only race as well.',
      'Elite athletes such as Kenenisa Bekele and Tirunesh Dibaba have raced here, but for most participants the altitude and atmosphere are the real challenge. We can arrange registration and combine the run with a tour.',
    ],
  },
]

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}
