# Off-site entity presence (GEO G3)

Checked 2026-10-23 without logging in or contacting anyone. AI answer engines describe a business from what other sites say about it as well as from its own site, so conflicting details off-site become conflicting answers. Canonical values are those in `src/lib/seo/entities.ts` and [business facts](../seo/business-facts.md).

## What each source says

| Source                                                                                                                                          | Name | Phone               | Address / location                               | Website link                                | Founded    | Other                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ------------------------------------------------ | ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical (new site)                                                                                                                            | ✓    | +251 912 039405     | Workdingay Street, Meskel Kibra Kebele, Lalibela | —                                           | not stated | Private and group tours                                                                                                                                                      |
| Old site, [contact page](https://extraordinaryethiopiatours.com/contact-us/)                                                                    | ✓    | ✓                   | ✓                                                | —                                           | not stated | Also shows the misspelt `info@extraordinaryethiopatours.com`; terms spell the street "Workdinagy"                                                                            |
| [SafariBookings](https://www.safaribookings.com/p6779)                                                                                          | ✓    | ✓ (`+251912039405`) | "Office in: Ethiopia" (no town)                  | `http://www.extraordinaryethiopiatours.com` | **2019**   | 4.9/5 from 38 reviews; 5–10 employees; "Member of: ETOA, Lalibela & Surrounding Guide association & ETGA"; private and fixed group tours; many tour listings with USD prices |
| [SafariGo](https://www.safarigo.com/operator/extraordinary-ethiopia-tours-3022)                                                                 | ✓    | not shown           | "Lalibela and **Addis Ababa** based"             | none found                                  | **2011**   | 0 reviews, 1 tour listed                                                                                                                                                     |
| [Tripadvisor](https://www.tripadvisor.com/Attraction_Review-g480193-d19444662-Reviews-Extraordinary_Ethiopia_Tours-Lalibela_Amhara_Region.html) | ?    | ?                   | Listed under Lalibela (from the URL)             | ?                                           | ?          | Blocks automated fetches (HTTP 403); check manually                                                                                                                          |
| [Facebook](https://www.facebook.com/extraordinaryethiopiatours)                                                                                 | ?    | ?                   | ?                                                | ?                                           | ?          | Requires login; check manually                                                                                                                                               |
| Google Business Profile, Bing Places                                                                                                            | —    | —                   | —                                                | —                                           | —          | None found by web search; existence and ownership unknown                                                                                                                    |

Web searches for the business name, with "Lalibela" or with the founder's name, returned only SafariBookings pages: the operator profile, reviews and several tour listings under separate IDs. No press, guidebook, association directory or Wikipedia/Wikidata coverage was found.

## Inconsistencies to resolve

1. **Founding year**: SafariBookings says 2019, SafariGo 2011; the old site states none, and the founder's biography says "more than 10 years of experience". The new site's homepage description said "since 2005" without any source; that was removed on 2026-10-23. The site states no year until the client confirms one, after which both platforms should be corrected to match.
2. **Location**: SafariGo says "Lalibela and Addis Ababa based"; everywhere else says Lalibela. If there is an Addis Ababa office, its address should be published consistently; if not, SafariGo should say Lalibela.
3. **Website link**: SafariBookings links to `http://www.`; it should link to `https://extraordinaryethiopiatours.com` (the preferred host chosen in Phase 7). SafariGo has no website link.
4. **Address detail**: SafariBookings shows only "Ethiopia". Adding "Lalibela" and the street address matches every other source.
5. **Street spelling**: "Workdingay" (site, old contact page) vs "Workdinagy" (old terms). Pending client confirmation.
6. **Memberships**: SafariBookings lists ETOA and ETGA memberships and a Lalibela guide association. If the client confirms them and they have public member listings, they are strong independent references: link them from the About page and, where the association lists members online, use them as `sameAs`/`memberOf`.

## Actions

Client (or whoever holds the accounts):

- [ ] Claim or create Google Business Profile and Bing Places for the Lalibela office, with exactly the canonical name, address, phone, `https://` website and hours.
- [ ] Correct founding year, location and website link on SafariBookings and SafariGo once confirmed.
- [ ] Check Tripadvisor and Facebook show the same name, phone, address and website; confirm ownership of Instagram and YouTube.
- [ ] Ask the associations listed on SafariBookings whether they publish member directories, and get listed.
- [ ] Seek genuine mentions (travel guides, partner hotels, travel press). No paid links, review swaps or AI-targeted posts.

Repository, once the client confirms:

- [ ] Add confirmed profiles (Tripadvisor, Facebook, Instagram, YouTube, Google Business Profile, association listings) to `profiles` in `src/lib/seo/entities.ts`, which feeds `sameAs`.
- [ ] Add `foundingDate` and `memberOf` to the `TravelAgency` entity only with confirmed values.
- [ ] Re-run this check after launch and record changes here.
