# SEO release report

Date: 2026-10-23. Scope: the new Next.js site at the commit carrying this report, verified on a local production build (`corepack pnpm build && corepack pnpm start --port 3104`). It is **not yet deployed** to `extraordinaryethiopiatours.com`; the live domain still serves the old WordPress site. Passing these checks does not promise rankings or indexing.

## Verdict

The repository is release-ready for SEO. Every automated check passes, no release-critical failure is open, and the remaining work depends on hosting, DNS, accounts or client input (Phase 7).

## Checks

Run from `frontend`. `next.config.mjs` sets `typescript.ignoreBuildErrors`, so a successful build alone proves nothing about types: always run `typecheck`.

| Command                                                       | Covers                                                                                                                                                                                                                                                                                                 | Result                  |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `corepack pnpm typecheck`                                     | Explicit TypeScript check                                                                                                                                                                                                                                                                              | Pass                    |
| `corepack pnpm test`                                          | 24 unit tests: canonicals, sitemap inventory, robots, metadata, JSON-LD serialization and linking, offer rules, catalogue relationships                                                                                                                                                                | Pass                    |
| `corepack pnpm i18n:audit`                                    | Translation catalogue completeness, ICU arguments, registered UI phrases                                                                                                                                                                                                                               | Pass (532 phrases)      |
| `corepack pnpm build`                                         | Production build                                                                                                                                                                                                                                                                                       | Pass (424 static pages) |
| `corepack pnpm seo:audit`                                     | All six server checks below, against one production server                                                                                                                                                                                                                                             | Pass                    |
| ↳ `seo:technical`                                             | 404s for unknown slugs/locales/admin with noindex, 308 normalization (locale prefix, trailing slash, query preservation), private-path headers, robots.txt, sitemap count, as browser, Googlebot and Twitterbot                                                                                        | Pass (36 responses)     |
| ↳ `seo:routes`                                                | All 401 sitemap URLs: HTTP 200, no `X-Robots-Tag`, `index, follow`, page/sitemap alternates identical and reciprocal, one H1 and no skipped heading levels, no `#` links; 405 distinct internal link targets return 200 directly; detail-page query variants, unknown slugs and translated legal pages | Pass                    |
| ↳ `i18n:routes`                                               | 399 localized pages: document language, canonical, robots, four alternates; English redirects; sitemap locales                                                                                                                                                                                         | Pass                    |
| ↳ `seo:metadata`                                              | Titles/descriptions present and unique per language, single self-canonical, hreflang, complete Open Graph/Twitter tags, article dates, all 82 share images resolve                                                                                                                                     | Pass                    |
| ↳ `seo:schema`                                                | JSON-LD parses, one shared business entity, resolvable `@id`s, visible breadcrumbs, main entity = H1, no review/rating/FAQ markup, no price-less offers                                                                                                                                                | Pass                    |
| ↳ `seo:vocab`                                                 | Every JSON-LD type and property is valid Schema.org vocabulary for its type                                                                                                                                                                                                                            | Pass (401 URLs)         |
| `SEO_ENV=preview` build + `SEO_CHECK_PREVIEW=1 seo:technical` | Preview/staging builds send `X-Robots-Tag: noindex, nofollow`, `noindex` meta and an empty sitemap                                                                                                                                                                                                     | Pass                    |
| `node scripts/i18n-browser.cjs`                               | Headless Chrome: language switching, filters, gallery keyboard use, enquiry/newsletter validation, mobile navigation and overflow, localized 404 screens, no uncaught exceptions                                                                                                                       | Pass                    |

`seo:metadata` and `seo:vocab` need outbound network access (Cloudinary images; the Schema.org vocabulary, cached in the OS temp directory or supplied with `SCHEMA_VOCAB=<path>`). `pnpm lint` does not run: `eslint` is not installed.

Social previews: sampled home, tour, destination and article share images are real 1200×630 JPEGs (96–161 KB) matching their declared dimensions.

## Resolved, by phase

| Phase | Outcome                                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | Inventory of 399 project URLs and 167 legacy URLs, search-intent map, legacy URL proposals ([baseline report](baseline-report.md))                                                         |
| 1     | Shared SEO helpers, true 404s, canonical redirects, crawl rules, preview noindex ([technical foundation](technical-foundation.md))                                                         |
| 2     | Purpose-written localized titles/descriptions, Open Graph/Twitter cards, 1200×630 share images, ISO article dates                                                                          |
| 3     | One `TravelAgency`/`WebSite` identity, breadcrumbs, `BlogPosting`, `TouristTrip`, `TouristDestination` from verified facts only                                                            |
| 4     | Explicit destination/tour/article relationships (every destination and tour has contextual incoming links), client's legal pages ported verbatim, footer placeholders removed, heading fix |
| 5     | 25–45% lighter pages: 6.7 KB logo, trimmed client payloads, finer image widths; before/after Lighthouse baseline                                                                           |
| 6     | `seo:routes`, `seo:vocab` and the `seo:audit` gate; stale sitemap count in `i18n:routes` corrected; this report                                                                            |

## Known limitations

- **Mobile LCP is above 2.5 s in lab runs** (about 4.7–5.9 s on most pages under simulated slow 4G), dominated by the hero photograph's download from Cloudinary. Lab timings here vary by ±2 s between runs; judge by field data after launch. Desktop and byte-weight results are in [seo.md, Phase 5](../../seo.md).
- **Translation messages** (~27 KB, all UI phrases) are serialized on every page; reducing this needs an i18n refactor.
- **No tour offers** are emitted while the booking API returns no prices; offers appear automatically for real USD adult prices.
- **Rich results**: only breadcrumbs and articles are Google rich-result types here. Business, trip and destination markup is descriptive. Google's Rich Results Test needs a public URL and has not been run.
- **Legal pages are English-only** on all languages, canonical to English, by decision; they show no effective date.
- **`public/images`** holds 57 MB of unreferenced original photos, kept for the Cloudinary migration.

## Launch dependencies (Phase 7)

These need hosting, DNS, accounts or the client, and were out of reach for repository work:

1. **Hosting**: a Node.js host that runs the proxy, rewrites (`API_BASE_URL`) and ISR; HTTPS and a single preferred host (www vs. apex) redirecting at the edge.
2. **Legacy redirects**: implement the 145 proposed old → new mappings from `legacy-url-map.csv` before the generic “add `/en`” redirect, and decide the 22 unresolved URLs (including `/privacy-policy/` and `/terms-and-conditions/`, which now have direct equivalents at `/en/privacy-policy` and `/en/terms-and-conditions`).
3. **Production environment**: deploy with production `SEO_ENV`/`VERCEL_ENV` so pages are indexable, and preview deployments with `SEO_ENV=preview`.
4. **After deployment**: rerun `seo:audit` with `SEO_BASE_URL=https://extraordinaryethiopiatours.com`; run Google's Rich Results Test on an article and a tour; check link previews in WhatsApp/Facebook.
5. **Search Console / Bing Webmaster Tools**: verify the property and submit `https://extraordinaryethiopiatours.com/sitemap.xml`. No Change of Address (same domain).
6. **Client confirmations**: Instagram and YouTube ownership (then add them and Facebook to structured-data `sameAs`); legal text currency, effective date and the “Workdinagy/Workdingay Street” spelling; any Spanish/French legal translations.
7. **Monitoring (Phase 8)**: field LCP/INP/CLS at the 75th percentile, Search Console coverage and redirect hits for at least a year.
