# openrangedevs_com

Marketing site for OpenRangeDevs — a single-page marketing site built with Vite, React, TypeScript, and Tailwind CSS, with scroll-driven animations powered by Lenis.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Lenis** for smooth scrolling
- **Playwright** for E2E testing
- **oxlint** for linting

## Getting started

```bash
pnpm install
pnpm dev        # start the dev server (http://localhost:5173)
pnpm build      # type-check and build for production
pnpm preview    # preview the production build
pnpm lint       # run oxlint
```

## Structure

- `src/components/` — section components (Hero, Services, Survey, Case Studies, Team, Testimonials, FAQ, Footer, …)
- `src/content.ts` — shared copy, client logos, testimonials, and the booking calendar URL
- `src/hooks/` — shared hooks (e.g. `useInView`)
- `public/assets/` — images, logos, and SVG marks

All "Book a call" / "Contact Us" CTAs link to the scheduling calendar defined by `CALENDAR_URL` in `src/content.ts`.

## Deploy (Kamal)

Production runs on the shared ORD Kamal droplet via `kamal-proxy`.

1. Copy `.env.example` → `.env` and set `KAMAL_REGISTRY_PASSWORD` (DO API token with registry access).
2. Deploy:

```bash
bin/deploy
```

Use `bin/deploy` instead of bare `kamal deploy` when Docker Desktop is not running. Buildx pushes from the remote builder and needs local registry credentials to share; Desktop’s `credsStore` returns a DOCR `405` if the daemon is down.

`Cannot connect to the Docker daemon` during deploy is expected if Desktop is stopped — the image still builds on `ord-kamal-builder-1`.

