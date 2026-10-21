# Phase 0 SEO baseline and migration findings

Date: 2026-10-21. **Phase 0 complete; Phase 1 has not started.**

## What was captured

The local production build was crawled separately from the client's live WordPress website. No public page content, SEO metadata, image delivery, redirect rules or account settings were changed.

| Dataset                    | Result                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Project URLs               | 399: 133 each in English, Spanish and French                                                                    |
| Project page inventory     | 8 fixed pages + 50 tour details + 62 destination details + 13 articles per language                             |
| Intent map                 | 399 locale-specific rows with page purpose, query hypothesis, content angle and potential overlap               |
| Legacy URL discovery       | 167 requested URLs from the live robots/sitemaps and internal-link crawl                                        |
| Existing redirects         | 22 legacy URLs initially return 301; all 167 requests ultimately return 200                                     |
| Distinct final legacy URLs | 145, including WordPress archive/template pages                                                                 |
| Migration proposals        | 145 old URLs have proposed targets, covering 120 distinct new English canonical URLs                            |
| Unresolved legacy URLs     | 22, explicitly classified rather than sent to a generic homepage                                                |
| Discovery limits           | Public crawl queue exhausted below the 500-page cap; no Search Console, backlink or server-log export available |

The four layover packages share one `/layover` page per language. Gallery images and embedded reviews are not separate indexable page records. A local URL check does not establish that the new build is deployed on the live client domain.

Source/build details and capture timestamps are in [project-summary.json](project-summary.json). The local production build ID was `uzNsBpudI-iuFQnY91Rxe`; its application state matches the current published-locale configuration. The source commit recorded during capture was `ec596a4adf189d42eed27a95845acdd008563ea8`.

## Project metadata findings

The measured rows are in [route-inventory.csv](route-inventory.csv).

| Check                      | Observation                                                                                                                 | Follow-up                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Response status            | All 399 valid project URLs return 200                                                                                       | Preserve in Phases 1/6                                                                 |
| Publication                | All 399 allow indexing; document language matches the locale                                                                | Preserve all three published languages                                                 |
| Canonicals                 | One intended self canonical on every valid URL                                                                              | Centralize/generalize in Phase 1 without regression                                    |
| Language alternatives      | Four correct alternatives per page: en, es, fr and English x-default                                                        | Preserve reciprocal links and matching sitemap alternatives                            |
| Main headings              | One H1 on each valid project page                                                                                           | Keep headings aligned with page intent in Phase 4                                      |
| Titles/descriptions        | Present on every valid URL; no exact duplicate groups within a locale                                                       | Improve relevance in Phase 2; absence of duplicates is not proof of quality            |
| Homepage metadata          | Generic brand/default description rather than a distinct service-led search message                                         | Phase 2                                                                                |
| Social images              | 24 fixed-page URLs have no Open Graph image; the 375 detail-page references have corresponding local files                  | Add share defaults in Phase 2; image optimization belongs to Phase 5                   |
| Social image accessibility | All 375 image-bearing detail pages lack `og:image:alt`                                                                      | Phase 2                                                                                |
| Twitter previews           | 375 detail pages expose an image/large-image card; 24 fixed pages have a summary card without an image                      | Phase 2                                                                                |
| Structured data            | No JSON-LD blocks on any of the 399 pages                                                                                   | Phase 3                                                                                |
| Metadata length review     | 167 titles exceed 60 characters; 213 descriptions exceed 160 characters; the longest captured description is 411 characters | Editorial review queue in Phase 2, not automatic failures or Google display guarantees |

The local asset observation checks file presence under `public/`; it is not a claim that the old production host currently serves the new `/images/...` URLs. Cloudinary is not needed to resolve the metadata gaps.

## Technical response baseline for Phase 1

[technical-probes.csv](technical-probes.csv) records the actual responses and every robots meta value, including conflicting values emitted during streamed errors.

| Request                    | Initial status | Final status | Observation                                                                   |
| -------------------------- | -------------- | ------------ | ----------------------------------------------------------------------------- |
| `/`                        | 308            | 200          | Redirects directly to `/en`                                                   |
| `/about`                   | 308            | 200          | Redirects directly to `/en/about`                                             |
| `/en/tours/unknown`        | 200            | 200          | Streamed not-found response includes both `index, follow` and `noindex`       |
| `/fr/destinations/unknown` | 200            | 200          | Same streamed-error behavior in French                                        |
| `/en/blog/unknown`         | 404            | 404          | Correct status; response contains noindex as well as inherited index metadata |
| `/de`                      | 404            | 404          | Unsupported locale is noindex                                                 |
| `/admin`                   | 307            | 200          | Unauthenticated request redirects to the English login page                   |
| `/login`                   | 200            | 200          | Login is noindex/nofollow                                                     |

Use this as the starting point for Phase 1's error-response work. Do not call the current streaming behavior a correct HTTP 404 simply because the eventual browser screen says “not found.” These probes use the inventory crawler's user agent, not a verified Googlebot request. Recheck browser and crawler responses when implementing the fix.

## Search intent and overlap

[search-intent-map.csv](search-intent-map.csv) distinguishes:

- Homepage: custom/private journey discovery.
- Tour collection: compare available packages; individual tours: a specific duration, route and travel style.
- Destination collection/details: choose regions/places and understand a visit; cultural-group pages provide context for respectful visits.
- Layover: use an Addis Ababa stopover; contact/about: branded enquiry/business research.
- Journal: informational guidance, with article-specific questions and angles.

Spanish and French have their own query hypotheses, derived from existing localized records and short localized planning phrases. No keyword volumes, competitive rankings, impressions or conversion data were obtained. These are inputs for Phase 2, not evidence that a page ranks or that a query has measured demand.

Priority overlap groups:

1. **Lalibela:** destination overview, complete travel guide, churches guide, UNESCO-recognition article and individual tour offers need distinct purposes. The map separates town/logistics planning from church-site/history guidance and transactional itineraries. The UNESCO ranking claim needs a genuine supporting reference before expanding it into SEO copy or schema; no new claim has been added.
2. **Practical Ethiopia planning:** `what-to-know-before-visiting-ethiopia` and `essential-travel-information` should distinguish first-visit orientation from detailed entry/health/money essentials.
3. **Ethiopia history:** the country-background and cradle-of-humanity articles can serve different historical/archaeological questions.

Do not delete or merge existing pages merely because topics overlap. Validate purpose and internal-link relationships first, and use actual search data when available.

## Legacy migration decisions

Read [legacy-url-map.csv](legacy-url-map.csv) for proposals and [legacy-url-decisions.json](legacy-url-decisions.json) for their explicit inputs. **No redirect has been implemented.**

| Action                                                    | Legacy URL rows |
| --------------------------------------------------------- | --------------- |
| Proposed permanent redirects                              | 141             |
| Proposed archive consolidation to the journal             | 4               |
| Topic/category content gaps                               | 18              |
| Legal pages needing equivalents                           | 2               |
| WordPress builder templates needing retirement assessment | 2               |

145 rows have a target; 22 are unresolved. Confidence is high for 138 rows and medium for 7; the 22 unresolved rows have no target. Medium-confidence cases and all proposals still need technical/content validation when migration rules are implemented.

Mapping evidence includes exact visible legacy tour codes matched to existing source catalogue comments. This identifies legacy counterparts for **49 of the 50 tour records**. **53 of 62 destination records** and **all 13 journal articles** have identified targets from existing legacy content. New records without an old counterpart are not errors and have not been removed.

Important examples:

| Old URL                          | Proposed new canonical                           | Why                                                                                                            |
| -------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `/10-days-historic-route-tours/` | `/en/tours/10-day-historic-route`                | Same tour code `EDT-03-H10`                                                                                    |
| `/lalibela-tours/`               | `/en/destinations/lalibela`                      | Actual legacy destination page                                                                                 |
| `/lalibela/`                     | `/en/blog/lalibela-churches-guide`               | Already redirects to a churches article on the legacy site; a naive destination-slug match would change intent |
| `/omo-valley-tours/`             | `/en/destinations/omo-valley`                    | Legacy destination overview                                                                                    |
| `/omo-valley/`                   | `/en/tours/6-day-omo-valley-tribal-and-cultural` | Already redirects to the six-day tour, confirmed by its tour code                                              |
| `/ethiopia-tours/`               | `/en`                                            | Observed legacy alias of the homepage, not a stand-alone tour index                                            |
| `/privacy-policy/`               | Unresolved                                       | A real old legal page exists, but the new app currently points its privacy label to contact                    |
| `/?elementskit_template=header`  | Unresolved                                       | WordPress builder content; the meaningful query must not be collapsed into the homepage                        |

Legacy rules must run before the generic “prefix with /en” redirect at launch. Otherwise old URLs such as `/10-days-historic-route-tours/` would become `/en/10-days-historic-route-tours/`, which is not a new application route.

### The 22 unresolved rows

- **18 topic/category URLs:** Addis surroundings; birdwatching collection and birding information; coffee; culture; Danakil collection; day trips; eastern Ethiopia; wildlife; festival tours and festival information; historic north and historical tour collections; safari and southern Ethiopia collections (including existing aliases); trekking. These do not have dedicated equivalents in the present route inventory. A client-side filter without a supported, indexable URL is not a replacement landing page.
- **2 legal URLs:** privacy and terms. Preserve or recreate equivalent appropriate pages rather than redirecting them to contact.
- **2 template query URLs:** header and footer. Determine indexing/inbound-link value before retirement; do not add them to the new public sitemap.

Their exact URLs and reasons are in the map. Resolving these cases is a pre-launch dependency in Phases 4/7, not a reason to stop Phase 1 now.

## Business facts and source quality

[business-facts.md](business-facts.md) records the canonical business name, phone, address, email, source statements, profile links and missing identity fields.

Notable findings:

- The public contact address matches the project's street/city/country data.
- The legacy contact body has an email-domain typo while its footer and project configuration use the expected domain. Keep the canonical project email consistent.
- SafariBookings and SafariGo show matching business profiles and are linked by the live client site. Tripadvisor is linked by the client, but its profile content could not be fetched directly in this research run.
- Some project social links are unverified or placeholders. Exact coordinates, postal code, legal registration identifiers and a corroborated founding date are not supplied as canonical project facts; omit unknown fields in Phase 3.

## Coverage and remaining dependencies

- Live robots.txt was accessible and allowed this public crawl. Its advertised index was `https://extraordinaryethiopiatours.com/sitemap_index.xml`; `/sitemap.xml` redirects there. Page/post/template/category/author child sitemaps were captured successfully.
- Both the sitemap inventory and same-host internal-link queue were processed; no URLs remained queued and no HTML fetch failures occurred in the final crawl. This is completeness for **discovered public URLs**, not proof that every historic indexed/backlinked URL is known.
- Search Console, historical analytics, backlink exports and server logs were unavailable. Import these later to extend the migration map and set traffic-based priorities.
- Hosting/cPanel/DNS and production account access are still needed for launch. No login, account change, form submission, sitemap submission or deployment was performed.
- Core Web Vitals and full media-delivery performance have not been measured here; that is Phase 5.
- The baseline records all three languages as indexable, consistent with the user's publication decision. No human translation review gate was reintroduced.

## Validation and next phase

`python3 scripts/seo-phase0-check.py` passes for all route/intent/legacy/map rows, real target membership, locale alternatives, query identity and important alias cases. Python script syntax checks and Markdown formatting checks were also performed. Existing frontend runtime code was not changed, so an additional application rebuild/test cycle was not necessary for these evidence artifacts; the previously built production app supplied the capture.

**Next: Phase 1 — technical SEO foundation.** Start with shared SEO URL/entity helpers and accurate error/indexing behavior. Preserve the now-measured canonical/hreflang behavior, keep all languages published, and carry the unresolved migration cases forward explicitly.
