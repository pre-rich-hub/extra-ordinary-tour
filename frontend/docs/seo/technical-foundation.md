# Phase 1: technical SEO foundation

## URL and identity policy

The preferred origin is `https://extraordinaryethiopiatours.com` (HTTPS,
non-www). `src/lib/seo/entities.ts` owns that origin and business name, and reuses
the existing contact configuration. No new business claims have been added.
`urls.ts` normalizes canonical paths: no trailing slash, query string or fragment.
Localized canonicals remain self-referencing. English, Spanish and French remain
published with reciprocal language alternatives and English x-default.

General metadata logic now lives in `src/lib/seo/metadata.ts`; the old
`src/i18n/metadata.ts` exports remain compatible with existing page imports.
Locale definitions and publication policy remain in `src/i18n/`.

Public requests such as `/tours/?style=trek` redirect directly to
`/en/tours?style=trek` with HTTP 308. Query values are retained for application
behavior and tracking, but excluded from canonical URLs. Explicit locale URLs
with trailing slashes redirect to their slash-free version. Invalid language
prefixes remain 404s. Admin/login retain their unprefixed routes and authentication.

HTTPS and www-to-apex redirects must be configured at the eventual hosting edge.
Do not add redirects based on an unverified forwarded-protocol header: a TLS
terminating proxy can otherwise create loops. Preview hosts are not redirected
to production. Host normalization remains a deployment verification item in
Phase 7, along with the legacy WordPress redirect map.

## Missing routes and indexing

Detail-page metadata calls `notFound()` for unknown catalogue slugs. The tour and
destination route-level loading boundaries were removed because they committed
HTTP 200 before the missing-record check. Known routes remain prerendered; on a
cache miss these routes wait for rendering rather than sending a skeleton first.
`htmlLimitedBots: /.*/` makes metadata blocking for browsers and crawlers alike;
this favors correct status/head output over streaming metadata. No strict
`dynamicParams: false` fallback restrictions were introduced.

The locale layout supplies title/description defaults only; route pages own
canonical, hreflang and robots metadata. This prevents missing routes from
inheriting the homepage canonical and its `index` directive. Next's not-found
handling adds `noindex`. Unknown pages are excluded from the sitemap; no 410
responses are invented for content whose permanent removal is unconfirmed.

Private pages retain noindex metadata and server-side authentication. Response
headers also mark `/admin`, `/login` and `/api` as `noindex, nofollow`. Robots rules
permit crawling login/admin so crawlers can see their noindex responses; this
does not grant access to protected content. `/api/` remains disallowed.

## Preview and staging deployment

Set `SEO_ENV=preview` or `SEO_ENV=staging` **before building and starting** a
non-production deployment. Vercel's `VERCEL_ENV` is detected automatically when
`SEO_ENV` is absent. An ordinary production build defaults to production; local
Next development defaults to non-production. `SEO_ENV=production` explicitly
selects production policy. Unknown environment values fail closed to noindex.

Non-production builds send a site-wide `X-Robots-Tag: noindex, nofollow`, emit
noindex public-page metadata, return an empty sitemap and omit sitemap discovery
from robots.txt. Pages remain crawlable so noindex can be read. Canonical URLs
still identify the production origin. Build each environment separately: moving
a production artifact to staging and changing runtime variables alone cannot
rewrite prerendered metadata.

Production allows all three locales and contains 399 canonical sitemap URLs.
Translation publication choices have not changed.

## Repeatable checks

From `frontend/`, run:

```sh
corepack pnpm test
corepack pnpm typecheck
corepack pnpm i18n:audit
corepack pnpm build
corepack pnpm start --port 3104
# In another terminal:
corepack pnpm seo:technical
corepack pnpm i18n:routes
```

For a separately built preview, run the technical check with
`SEO_CHECK_PREVIEW=1`. `SEO_BASE_URL` overrides its default localhost:3104 URL.
The existing route crawl is for production and now requires actual HTTP 404
responses and noindex for unknown routes.

## Verification results — 2026-10-21

- 18 automated tests passed, including canonical/query handling, production and
  preview indexing, existing translations, catalogue identity and image delivery.
- Explicit TypeScript and the full translation audit passed.
- Production and isolated preview builds completed successfully.
- All 399 production public URLs passed the response, language, canonical,
  robots and reciprocal hreflang crawl; sitemap contains exactly 399 entries.
- 36 technical response checks passed in production and another 36 in preview:
  browser/Googlebot/Twitterbot 404s, direct redirects, repeated query preservation,
  private access redirects, robots rules and sitemap policy.
- Chrome verified localized missing-tour, destination and article screens in all
  three languages, with no inherited canonical and no uncaught browser errors.
- The production build configuration was restored after the isolated preview
  check. No deployment or external account changes were made.

Remaining launch checks: actual hosting HTTPS/www behavior and legacy redirects.
Phase 2 will improve localized titles/descriptions and social metadata coverage;
Phase 3 will introduce structured data. The Phase 0 CSV files remain a historical
baseline rather than being overwritten by these new results.

## References

- [Next.js blocking metadata configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots)
- [Next.js notFound](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [Google noindex and crawl access](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
