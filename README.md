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
