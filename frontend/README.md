# Extraordinary Ethiopia Tours — Frontend

Marketing site and admin panel built with Next.js App Router, React 19,
TypeScript, and Tailwind CSS v4.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev                     # http://localhost:3000
```

Set `API_BASE_URL` to the Express backend origin. Browser requests use
same-origin `/api/...` URLs through the existing Next.js rewrite. The public
site can render without a backend using the static data owned by each feature.
Admin authentication and mutations require the backend.

| Script                      | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `pnpm dev`                  | Development server                      |
| `pnpm build` / `pnpm start` | Production build and server             |
| `pnpm typecheck`            | TypeScript check without emitting       |
| `pnpm test`                 | Localization regression tests           |
| `pnpm i18n:audit`           | Translation coverage and ICU validation |

The equivalent `npm run <script>` commands also work with installed dependencies.
Run the explicit type check as well as the build: the current Next.js configuration
ignores TypeScript errors during builds.

## Project structure

```text
src/
├── app/                     Routes, data loading, and page composition
│   ├── [locale]/            Public en/es/fr routes and localized site layout
│   ├── (private)/           English admin and login routes, own root layout
│   ├── global-not-found.tsx Unsupported locales and unmatched root URLs
│   ├── sitemap.ts           Published locale URLs
│   ├── robots.ts
│   └── globals.css          Design tokens and global styles
├── features/                Business functionality and its data
│   ├── home/                Homepage sections and featured-story selection data
│   ├── about/               Founder story, company sections, promises
│   ├── tours/               Catalogue, API overlay, cards, itinerary sections
│   ├── destinations/        Destination data, cards, overview and visit sections
│   ├── layover/             Packages, API overlay, assurances, enquiry section
│   ├── blog/                Articles, cards, article header/body sections
│   ├── gallery/             Photos, grid, lightbox
│   ├── contact/             Contact details, planning steps, promises
│   ├── enquiry/             Journey enquiry form and submission API
│   ├── newsletter/          Subscription form and API
│   ├── reviews/             Testimonials, platform summaries, review display
│   ├── auth/                Login form and server-only session checks
│   ├── support/             Retained assistant API client; no chat interface
│   └── admin/
│       ├── components/      Admin shell, sidebar, shared admin primitives
│       ├── lib/             Shared admin request and formatting helpers
│       └── <resource>/      Resource-owned components (including dashboard)
├── components/              Shared UI, layout pieces, cards, brand icons
├── config/                  Site identity, contact facts, navigation
├── hooks/                   Feature-independent React hooks
├── i18n/                    Routing, request, navigation, publication and copy
├── messages/                Shared English, Spanish and French UI messages
└── lib/
    ├── api/                 Shared JSON transport, timeout, query encoding
    └── utils.ts             General class-name utilities
```

Admin resources are `dashboard`, `tours`, `destinations`, `layover-packages`,
`categories`, `blog`, `gallery`, `testimonials`, `bookings`, `contacts`, and
`subscribers`. Keep public and admin components separate: their data contracts and
request handling serve different audiences.

## Feature conventions

Create only the subfolders a feature needs:

```text
features/tours/
├── components/              Cards, grids, overview, itinerary, enquiry sections
├── data/                    Static records and lookup helpers
├── api/                     Endpoint functions and API payload types
├── server/                  Server-only API/static catalogue composition
├── lib/                     Tour price and duration formatting
└── types.ts                 Public tour display contract
```

- **Pages compose sections directly.** Keep route parameters, `generateMetadata`,
  `generateStaticParams`, `revalidate`, redirects, and `notFound()` in `app`.
  Each `page.tsx` loads its data and returns the ordered feature components,
  shared heroes, CTA bands, and layout wrappers. Put substantial section markup
  in feature components. Page composition belongs in the route itself.
- **Ownership follows the domain.** Tour records belong in `tours/data`,
  testimonial records in `reviews/data`, and domain types in the owning feature's
  `types.ts`. Sharing a feature component across pages does not make it generic.
- **Shared code stays small.** Use `components` for presentation reused across
  domains, `hooks` for general hooks, and `lib` for feature-independent utilities.
  Shared infrastructure must not import feature modules. Site chrome can compose
  feature components such as the newsletter form.
- **Imports use `@/` across features and relative paths within a feature.**
  Import explicit modules, for example `@/features/tours/types` or
  `../components/tour-card`. Avoid catch-all barrels and never mix server-only
  modules with client exports.
- **Server boundaries are explicit.** Catalogue overlays and session checks use
  `server-only`. Client components import feature API clients, not server modules.
  The session guard forwards cookies to the backend origin on the server;
  browser requests keep their existing same-origin URLs and credentials behavior.
- **Preserve catalogue behavior.** Live tours overlay prices and featured flags
  by slug; display copy remains static. Layover packages retain their existing
  fallback and media-path rules. Changing these contracts is separate work.
- **Naming and styles.** Files use kebab-case and components use PascalCase named
  exports. Use design tokens from `globals.css` rather than adding raw colours.

For example, the About route imports its sections and makes their order visible:

```tsx
import { AboutHero } from '@/features/about/components/about-hero'
import { AboutIntroduction } from '@/features/about/components/about-introduction'
import { FounderStory } from '@/features/about/components/founder-story'
import { PlacesMarquee } from '@/features/about/components/places-marquee'
import { TravelOfferings } from '@/features/about/components/travel-offerings'
import { CompanyValues } from '@/features/about/components/company-values'
import { GuestReviews } from '@/features/about/components/guest-reviews'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntroduction />
      <FounderStory />
      <PlacesMarquee />
      <TravelOfferings />
      <CompanyValues />
      <GuestReviews />
    </>
  )
}
```

Keep shared `PageHero`, `SectionHeading`, and `CtaBand` instances directly in a
page where they clarify its composition. Admin pages similarly import their
resource component from `features/admin/<resource>/components`.

## Localization and upcoming work

Add these when implementing the corresponding capability; they are not empty
placeholder directories in this refactor.

| Responsibility                               | Location                       |
| -------------------------------------------- | ------------------------------ |
| English, Spanish, French routing and loading | `src/i18n/`                    |
| Translated UI messages                       | `src/messages/{en,es,fr}.json` |
| Translated domain content                    | Owning feature's data layer    |
| Cloudinary URL and delivery helpers          | `src/lib/media/`               |
| Shared image component                       | `src/components/media/`        |
| Shared metadata and structured-data helpers  | `src/lib/seo/`                 |
| Page-specific SEO content                    | Owning feature                 |
| Sitemap and robots route exports             | `src/app/`                     |

Public URLs now use `/en`, `/es` and `/fr`. Unprefixed public URLs permanently redirect to English. All three languages allow indexing and are included in sitemap and hreflang. Admin/login stay unprefixed. See [the localization guide](i18n.md) for translation files, verification and publication steps. Broader SEO/GEO work is tracked in [the SEO plan](seo.md).

## Image delivery

Public content uses the client's Cloudinary cloud `oyw9kdvp`. The 84 referenced
photos and portraits retain their original filenames as public IDs. The four
Media Library folders are organizational: the supplied delivery URLs have no
folder prefix. Do not add `destinations/`, `tours/`, `gallery/`, or `layover/`
to these public IDs.

Source URLs use `f_auto,q_auto,c_limit,w_1200` for a bounded default, including
existing social metadata. The custom Next Image loader in
`src/lib/media/cloudinary-loader.ts` replaces that width with the width requested
by the browser through `srcset`. Existing `sizes`, lazy loading, hero priority,
and CSS crops still apply. Cloudinary handles format, quality and resizing;
images do not pass through a second Next.js optimizer.

`public/images/logo.png` remains local because its Cloudinary URL returned 404.
Local originals are retained as backups; placeholders and app icons also remain
local. No Cloudinary API credentials are needed for public image delivery.
The migration verified all 84 original and optimized public URLs (HTTP 200),
plus responsive image output on all 399 prerendered public pages.

References: [Next.js custom image loaders](https://nextjs.org/docs/app/api-reference/config/next-config-js/images)
and [Cloudinary image optimization](https://cloudinary.com/documentation/image_optimization).

## Verification

Technical SEO policy and production/preview checks are documented in
[the Phase 1 report](docs/seo/technical-foundation.md). Custom staging deployments
must set `SEO_ENV=preview` or `SEO_ENV=staging` before building and starting.
Production remains indexable in English, Spanish and French.

Run `pnpm typecheck` and `pnpm build`. Smoke-check public list/detail routes,
unknown slugs, login, and unauthenticated admin redirects. With a test backend
and account, check authenticated admin navigation and form success/error states.
Confirm public catalogue pages still render when the backend is unavailable.

See [backend design](docs/backend-design.md) for backend architecture notes.
