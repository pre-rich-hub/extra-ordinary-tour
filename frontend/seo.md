# SEO implementation plan

Prepared: 2026-10-21. Status: **Phases 0–1 complete; Phase 2 is next**.

Implement one phase at a time. For each phase, record changed files, checks, results and any dependency before moving to the next phase. This document does not authorize deployment or changes to external accounts.

## Goal and boundaries

Make Extraordinary Ethiopia Tours easy to crawl, understand and discover across English, Spanish and French, while protecting existing traffic when replacing https://extraordinaryethiopiatours.com/.

Keep the feature-based architecture and direct component composition in `app/[locale]` pages. Keep current tours, destinations, route slugs and business facts unless a specific defect requires correction. All three languages remain published, as requested; human translation review is not a prerequisite for this plan.

Cloudinary migration is complete for 84 content images; the logo remains local because its Cloudinary URL was unavailable. SEO work uses the current optimized delivery URLs. A separate GEO/AI-search project can reuse the business identity and structured content established here.

## Current project baseline

| Area                  | Observed implementation                                                                                                            | Work remaining                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Public inventory      | 8 fixed pages, 50 tours, 62 destinations and 13 articles per locale: 133 × 3 = 399 URLs                                            | Capture a reproducible inventory and compare it with the existing client site                                    |
| Language routing      | `/en`, `/es`, `/fr`; English entity slugs; locale-aware navigation                                                                 | Preserve this behavior and validate all page families                                                            |
| Indexing              | All three locales are published; admin/login are noindex                                                                           | Validate actual HTML, headers, error pages and deployment environments                                           |
| Canonicals/hreflang   | Shared helpers in `src/lib/seo/`; compatibility exports in `src/i18n/metadata.ts`; reciprocal language links and English x-default | Continue validating the shared policy as metadata/schema expand                                                  |
| Discovery             | `app/sitemap.ts` lists all 399 URLs; `app/robots.ts` exists                                                                        | Audit canonical-only inclusion, URL responses and future catalogue changes                                       |
| Metadata              | Most pages have title/description; detail pages have basic Open Graph images                                                       | Homepage inherits generic defaults; descriptions reuse narrative copy; social metadata needs consistent coverage |
| Structured data       | No JSON-LD implementation found in the public frontend                                                                             | Add truthful, page-appropriate business and content entities                                                     |
| Errors/redirects      | Unprefixed/slash variants redirect directly; unknown entities return HTTP 404 with localized noindex screens                       | Implement the reviewed legacy redirect map during launch                                                         |
| Images/performance    | Cloudinary responsive delivery is enabled for 84 content images; animated heroes/carousels exist                                   | Measure delivery, loading, layout stability and interaction costs                                                |
| Content contracts     | Articles contain display dates rather than canonical ISO date fields; tours may be quoted on request                               | Use factual dates and commercial data for metadata/schema; avoid invented values                                 |
| Trust/navigation      | Contact and review links exist; some social URLs are `#`; privacy/terms labels currently link to contact                           | Correct misleading destinations and use only verified identity/profile details                                   |
| Existing verification | TypeScript, Vitest, translation audit and a 399-route crawler                                                                      | Extend these with SEO-specific assertions and representative performance checks                                  |

The planning tool initially could not retrieve the existing site's sitemap. Phase 0 subsequently captured its robots rules, sitemap index and 167 public requested URLs. See [the baseline report](docs/seo/baseline-report.md). Search Console/ranking history remains unavailable, and the old and new inventories remain separate datasets.

## Phase overview

| Phase                           | Priority            | Deliverable                                                   | Dependency                                            |
| ------------------------------- | ------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| 0. Inventory and search intent  | First               | Baseline, page/keyword map, legacy URL inventory              | Public site crawl; account exports optional initially |
| 1. Technical foundation         | Pre-launch          | Shared SEO helpers, crawl rules, canonical and error behavior | Phase 0                                               |
| 2. Metadata and social previews | Pre-launch          | Localized metadata for every public page                      | Phase 1                                               |
| 3. Structured data              | Pre-launch          | Business, breadcrumbs and page-specific JSON-LD               | Phases 1–2; confirmed facts                           |
| 4. On-page content and linking  | Pre-launch          | Clear headings, useful contextual links and trust information | Phase 0; coordinated with Phases 2–3                  |
| 5. Images and performance       | Pre-launch baseline | Measured loading improvements and responsive media            | Existing local images are sufficient                  |
| 6. SEO verification             | Pre-launch          | Full crawl report and release checks                          | Phases 1–5                                            |
| 7. Migration and launch         | Launch              | Legacy redirects, production checks and sitemap submission    | Hosting/domain and account access                     |
| 8. Monitoring and iteration     | After launch        | Search performance reports and prioritized improvements       | Production data                                       |

### Phase 0 — Inventory, search intent and migration baseline

Tasks:

- [x] Generate the new site's complete route inventory, grouped by locale and page type.
- [x] Record current title, description, canonical, robots, hreflang, main heading, social image and response status.
- [x] Crawl the existing client website when reachable; inspect its sitemap locations and navigation. Search Console/backlink/server-log imports remain unavailable and are recorded as launch dependencies.
- [x] Draft a CSV mapping `old URL → new canonical URL → action → reason`. Match real content intent rather than assuming matching slugs.
- [x] Assign one primary search intent to each English page and equivalent Spanish/French intents. Initial topics can include Ethiopia tours, historic-route journeys, Lalibela, Simien trekking, Danakil, Omo Valley and Addis Ababa layovers; these are starting hypotheses, not measured keyword-volume claims.
- [x] Separate transactional tour pages, destination guides and informational articles to reduce overlap. Do not create extra pages solely to repeat keyword variants.
- [x] Capture business facts and verified profile URLs from existing project/client sources; list unresolved fields separately.

Deliverables: `frontend/docs/seo/route-inventory.csv`, `search-intent-map.csv`, `legacy-url-map.csv`, and a short baseline report. Add these files when executing this phase.

Done when: all 399 current URLs have an inventory row; each page family has a defined purpose; known old URLs are mapped or explicitly unresolved. Lack of Search Console access does not stop local implementation, but an incomplete legacy inventory remains a launch dependency.

Phase 0 result: [baseline report](docs/seo/baseline-report.md), 399 route rows, 399 intent rows, 167 legacy rows, 145 proposed targets and 22 explicit unresolved migration cases. Reproduction and validation commands are in [the evidence README](docs/seo/README.md). No page behavior or redirects were changed.

### Phase 1 — Technical SEO foundation

Tasks:

- [x] Introduce shared business/site entities, canonical URL handling and metadata utilities in `src/lib/seo/`. Keep locale routing/publication in `src/i18n/`; provide compatibility exports if needed during the refactor.
- [x] Standardize the production origin, HTTPS/host/trailing-slash policy and treatment of query parameters. Coordinate host redirects with deployment configuration to prevent loops and chains.
- [x] Preserve self canonicals for each language, reciprocal en/es/fr hreflang and English x-default. Translated pages must not canonicalize to English.
- [x] Make indexable pages render substantive content, metadata and crawlable links without requiring browser interaction.
- [x] Investigate unknown-slug streaming and implement correct 404 behavior where feasible. Cover normal browsers and crawlers; avoid reintroducing the previously observed strict-fallback/internal errors.
- [x] Reserve 410 for content known to have been permanently removed. Keep unknown pages out of the sitemap and marked noindex.
- [x] Verify robots.txt, sitemap.xml and private/error indexing rules. Use authentication for private access; robots.txt is not an access-control mechanism.
- [x] Define preview/staging noindex behavior without changing the user's production publication choice. Production must allow all three locales.
- [x] Preserve a successful 200 response for real public pages and direct redirects to final canonical targets.

Done when: technical checks pass across all page families; valid pages are indexable; invalid URLs cannot masquerade as valid catalogue pages; any remaining framework-specific HTTP limitation is explicitly documented before launch.

Phase 1 result: [technical foundation report](docs/seo/technical-foundation.md). Production and preview builds passed; all 399 public URLs passed the production crawl. Unknown routes return HTTP 404 for browsers and crawlers, with localized error screens. Hosting-level HTTPS/www redirects remain a documented Phase 7 deployment check.

### Phase 2 — Localized metadata and social previews

Tasks:

- [ ] Add purpose-written SEO titles and descriptions to feature-owned SEO data, with complete English/Spanish/French coverage.
- [ ] Give the homepage a clear brand-and-service title and description rather than relying only on layout defaults.
- [ ] Make list pages, tours, destinations and articles distinct; include duration/location/theme only where supported by their content.
- [ ] Keep visible headings and search intent consistent with metadata. Use length recommendations as editorial guidance, not a guaranteed Google display limit or a reason to truncate words blindly.
- [ ] Apply the title template once and support an absolute homepage title.
- [ ] Complete Open Graph and Twitter card defaults/overrides: localized title and description, canonical URL, absolute image URL, dimensions where known, and useful image alt text.
- [ ] Define a default branded share image using existing assets; use entity-specific images for appropriate detail pages. No AI image generation or Cloudinary upload is required.
- [ ] Add canonical ISO article publication dates from genuine source dates; add modification dates only when an actual editorial change is known. Do not use build time as a content update date.

Done when: every public URL has appropriate localized metadata, one intended canonical, complete language alternatives and a resolvable social image. Missing/duplicate metadata is reported by the audit, with intentional exceptions documented.

### Phase 3 — Structured data and business identity

Tasks:

- [ ] Create a server-rendered `JsonLd` component in `src/components/seo/`, with safe serialization that prevents HTML/script injection.
- [ ] Define stable entity IDs for the business, website and pages. Use the same business identity across locales and localized page URLs for page entities.
- [ ] Add a verified `Organization`/`TravelAgency` identity and `WebSite` information, avoiding duplicate competing business entities.
- [ ] Add `BreadcrumbList` matching the visible breadcrumbs and localized canonical URLs.
- [ ] Add `Article` or `BlogPosting` to journal detail pages using real author/date/image information.
- [ ] Model tours with relevant Schema.org trip types and destinations with appropriate place types when their fields support it. Schema.org validity does not imply a dedicated Google tour rich result.
- [ ] Include offers only when real price, currency and relevant booking terms are available. Omit unknown prices; never encode “on request” as zero or invent availability.
- [ ] Use verified profile links only. Do not invent coordinates, postal codes, licenses, awards, authorship credentials or offices.
- [ ] Do not add copied platform ratings or self-serving business review markup to seek review stars. FAQs can improve visible content, but Google retired FAQ rich results in May 2026; do not add FAQ markup as a Google rich-result deliverable. See [Google’s documentation updates](https://developers.google.com/search/updates#may-2026).

Done when: JSON-LD parses, matches visible content and passes relevant validators. Resolve errors; assess optional-field warnings against the actual available facts. Record which Google rich-result types are supported and which schemas are descriptive only.

### Phase 4 — On-page content, internal links and trust

Tasks:

- [ ] Audit one clear main heading per page and a sensible heading hierarchy for the existing design.
- [ ] Check that introductions answer the page's intended question and that tour itineraries/inclusions and destination guidance are visible and useful.
- [ ] Replace broad name-substring matching for related tours with verified slug/ID relationships where it produces irrelevant recommendations.
- [ ] Connect destination pages to relevant tours and articles, and articles back to useful destination/tour pages. Use descriptive localized anchor text.
- [ ] Identify orphan pages and ensure all published catalogue pages are reachable through normal navigation, not only through the sitemap or filters.
- [ ] Check visible author information and practical business/contact details against actual sources.
- [ ] Correct placeholder social links and mislabeled footer destinations. Use genuine privacy/terms pages only when suitable business content exists; do not generate legal claims or label the contact page as a legal policy.
- [ ] Keep catalog offerings and translations intact unless a specific change is needed for clarity or accuracy. Do not repeat the entire translation project or require the waived human review.

Done when: important pages have relevant contextual incoming links, no broken/misleading key navigation remains, headings fit the content, and all identity claims are grounded in real facts. Pending client-supplied legal/business fields are recorded rather than fabricated.

### Phase 5 — Image SEO and performance

Tasks:

- [ ] Measure representative mobile and desktop pages: home, tours list/detail, destinations list/detail, journal detail, gallery and contact.
- [ ] Audit current file sizes, intrinsic dimensions, responsive `sizes`, hero loading priority, deferred images and layout stability.
- [x] Cloudinary delivery is implemented through a custom Next Image loader, with automatic quality/format and responsive widths. Validate its performance on the eventual host.
- [ ] Serve appropriately sized modern images, reserve layout space, and retain original source filenames when the later Cloudinary migration needs them.
- [ ] Review alt text by purpose: descriptive text for meaningful images, empty alt for decorative images. Do not use alt text for keyword repetition.
- [ ] Reduce unnecessary hero/carousel work, animation overhead, font cost and shared client payloads where measurements show a problem. For example, the root layout currently supplies complete slim catalogue arrays to a menu that displays only a few entries.
- [ ] Record repeatable lab results and follow real-user metrics after launch. Aim for LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile when field data is available; Lighthouse alone cannot establish these field results.

Done when: there are measured improvements or a documented acceptable baseline, no visual/functional regression, and a clear remaining media task list. The local logo does not block the earlier phases.

### Phase 6 — SEO automation and release verification

Tasks:

- [ ] Add `seo:audit`/`seo:routes` checks alongside the existing i18n checks, reusing inventory and URL helpers rather than duplicating their source of truth.
- [ ] Crawl all 399 current URLs for status, robots, canonical, hreflang, titles/descriptions, headings, internal links and social image responses.
- [ ] Check actual response headers and raw HTML as well as browser-rendered output. Include known/unknown slugs, unsupported locales, query variants and URL normalization cases.
- [ ] Verify sitemap URLs return 200, are canonical/indexable and contain reciprocal locale alternatives. Update expected counts if the legitimate page inventory changes.
- [ ] Check JSON-LD structure, business IDs, language/URL consistency, absent invented offers and safe serialization.
- [ ] Run focused regression tests, explicit TypeScript, the translation audit and production build. The existing `ignoreBuildErrors` setting means a successful build is insufficient by itself.
- [ ] Perform representative browser, mobile, social-preview and structured-data validation; review performance results from Phase 5.
- [ ] Produce a release report with resolved items, exact known limitations and external launch dependencies.

Done when: release-critical failures are fixed and checks are reproducible. Do not require a perfect Lighthouse score or promise rankings/indexing merely because validation passes.

### Phase 7 — Existing-site migration and production launch

Tasks:

- [ ] Confirm hosting can run this Next.js application's Node/runtime features, rewrites and ISR; confirm domain, HTTPS and preferred host configuration.
- [ ] Complete the old-to-new URL map from Phase 0. Implement explicit legacy redirects before the generic “add /en” redirect so old URLs do not go through unnecessary hops or land on a locale-prefixed 404.
- [ ] Redirect equivalent pages permanently to their closest relevant canonical page. Do not redirect every missing old URL to the homepage. Keep genuinely removed pages as 404/410 where appropriate.
- [ ] Preserve required verification files, valuable media URLs and important inbound-link destinations; test known query/trailing-slash variants and redirect loops.
- [ ] Validate the deployment before traffic switches, then repeat production canonical, robots, language, sitemap and redirect checks on the real domain.
- [ ] With account access, verify the Search Console property and submit the canonical sitemap; configure Bing Webmaster Tools if available. Do not use Search Console Change of Address merely for a same-domain redesign.
- [ ] Retain a rollback record and monitor immediately after deployment. Keep permanent migration redirects in place for at least a year, and longer where users/backlinks still need them.

Done when: the real domain serves the intended indexable build, old important URLs reach the right pages, search-engine verification/sitemap submission is recorded, and the production crawl passes. cPanel/hosting, DNS and account access are needed here; they do not block earlier repository work.

### Phase 8 — Monitoring and iteration

Tasks:

- [ ] Record launch baselines for impressions, clicks, queries, CTR, indexed pages, crawl errors and real-user performance.
- [ ] Monitor errors/redirects closely during launch week, then review weekly during the first month and monthly thereafter.
- [ ] Segment results by language and page type. Investigate discovery, canonical selection, soft 404s, content overlap and poor snippets before adding more pages.
- [ ] Improve metadata, useful content and contextual links based on observed queries and business priorities.
- [ ] Track enquiry conversions if suitable analytics and consent handling are configured. Vercel Analytics in the current code is not evidence that Search Console or GA4 is connected.

Done when: a repeatable reporting process exists, issues have owners/actions, and the next improvements are based on real data. Rankings and search-engine indexing are not guaranteed deliverables.

## Intended code ownership

```text
frontend/
├── seo.md
├── docs/seo/                 Inventories, intent map, migration map, reports
├── scripts/                 SEO audits and production crawl checks
└── src/
    ├── lib/seo/             Shared URL, entity, metadata and JSON-LD helpers
    ├── components/seo/      Server-rendered JSON-LD component
    ├── i18n/               Locale routing and publication source of truth
    ├── features/<feature>/
    │   ├── data/           Feature-owned SEO copy and actual entity facts
    │   └── ...             Existing feature components/types/loaders
    └── app/
        ├── [locale]/       Page composition and generateMetadata
        ├── sitemap.ts
        └── robots.ts
```

Create helper files as their phases need them. Do not create a second route inventory, business identity or localization system that can drift from the existing one.

## Progress log

| Phase | Status      | Evidence / dependency                                                              |
| ----- | ----------- | ---------------------------------------------------------------------------------- |
| Plan  | Complete    | Existing code inspected; current primary documentation consulted                   |
| 0     | Complete    | 399 project URLs and 167 legacy URLs inventoried; map and validation complete      |
| 1     | Complete    | Technical helpers, true 404s, canonical redirects, production/preview verification |
| 2–6   | Not started | Remaining metadata, schema, content, performance and release verification          |
| 7     | Not started | Complete legacy inventory; hosting/domain/account access                           |
| 8     | Not started | Production search data after launch                                                |

## Primary references

Consult these when implementing each phase; search presentation and supported structured-data features can change.

- [Google: redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google: Change of Address tool scope](https://support.google.com/webmasters/answer/9370220)
- [Google: URL migrations and redirect mapping](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google: localized page versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: breadcrumb markup](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: article markup](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Schema.org: TouristTrip](https://schema.org/TouristTrip)
- [Google: self-serving business reviews](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)
- [Google: FAQ rich-result retirement and current documentation updates](https://developers.google.com/search/updates#may-2026)
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
