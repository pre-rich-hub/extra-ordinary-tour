# Afar Horizon Expeditions — Frontend

Marketing site and admin panel for Afar Horizon Expeditions, built with
Next.js (App Router), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # API_BASE_URL of the Express backend
pnpm dev                     # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm typecheck` | TypeScript check without emitting |

The site works without the backend: every page falls back to the static
catalogue in `src/content`.

## Project structure

```
src/
├── app/                     Routes only — thin pages that compose features
│   ├── (site)/              Public site (route group, no URL segment)
│   │   ├── page.tsx         Home
│   │   ├── about/  blog/  contact/  destinations/  layover/  tours/
│   ├── admin/               Admin panel (session-guarded layout)
│   ├── login/               Admin sign-in
│   ├── layout.tsx           Root layout: fonts, nav, footer, support widget
│   ├── not-found.tsx
│   └── globals.css          Design tokens and global styles
│
├── components/              Shared, feature-agnostic UI
│   ├── ui/                  Primitives: Reveal, LinkButton, SectionHeading…
│   ├── layout/              Site chrome: SiteNav, SiteFooter, PageHero…
│   ├── cards/               InfoCard, BookingCard
│   └── icons/               Third-party brand marks
│
├── features/                Feature modules (components owned by one area)
│   ├── home/                Homepage sections
│   ├── tours/               TourCard, ToursGrid
│   ├── destinations/        Destination cards
│   ├── blog/                PostCard, PostsGrid
│   ├── enquiry/             Enquiry and newsletter forms
│   └── admin/               Admin components and API helpers
│
├── content/                 Static catalogue (destinations, tours, posts…)
├── types/                   Shared domain types
├── hooks/                   Reusable React hooks
└── lib/
    ├── api-client.ts        Typed client for the Express API
    ├── catalog.ts           Merges live API data over the static catalogue
    └── utils.ts             `cn()` class-name helper
```

### Conventions

- **Imports** use the `@/` alias, which points at `src/`.
- **Pages stay thin.** Route files fetch data and compose sections; markup
  lives in `features/` or `components/`.
- **Where a component goes:** used by one feature → `features/<feature>`;
  used across features → `components/`.
- **Content vs. types:** edit copy and catalogue entries in `src/content`;
  shapes live in `src/types` and are the contract for the API overlay.
- **Colours** come from the tokens in `globals.css` (`bg-primary`,
  `bg-copper`, …) rather than raw hex values.
- **Files** are kebab-case; components are PascalCase named exports.

## Further reading

- [`docs/backend-design.md`](docs/backend-design.md) — backend architecture notes.
