# openrangedevs_com

Marketing site for OpenRangeDevs, built with **Astro** and hosted on **Netlify**.
Every page is prerendered to static HTML (crawlable, fast, no client framework
shipped); React components are used only as templates at build time.

## Stack

- **Astro 7** (static output) + React components for markup
- **Tailwind CSS v4**
- **Lenis** smooth scrolling, scroll reveals and interactions in `src/scripts/site.ts` (~22 KB JS)
- **Netlify Forms** for the contact form
- **@astrojs/sitemap**, per-page meta / Open Graph / JSON-LD in `src/layouts/BaseLayout.astro`

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # astro check + static build to dist/
pnpm preview    # serve dist/
pnpm lint       # oxlint
```

Requires Node ≥ 22.23.4.

## Structure

| Path | What lives there |
| --- | --- |
| `src/pages/` | Routes: `/`, `/contact/`, `/contact/thanks/`, `/case-studies/[slug]/`, `/insights/[slug]/`, `404` |
| `src/components/` | Section components (rendered to static HTML) |
| `src/content/case-studies/*.md` | One file per case study (frontmatter only) |
| `src/content/insights/*.md` | Articles — add a file to publish `/insights/<file-name>/` |
| `src/data/site.ts` | Business details, nav, testimonial, booking calendar URL |
| `src/scripts/` | Client behaviour (`site.ts`) and contact form enhancement |
| `public/` | Images, `_headers`, `robots.txt`, `og-image.jpg` |

### Publishing content

Case studies and articles have a `published` flag. With `published: false` the
page is still built (and linkable) but carries `noindex` and is left out of the
sitemap. Set `published: true` once the content is approved.

### Contact form

The form in `src/pages/contact/index.astro` is plain HTML with `data-netlify="true"`,
so Netlify detects it at deploy time. Field names must stay in sync with
`src/scripts/contact-form.ts`. Spam protection is a honeypot (`bot-field`) plus
Netlify's built-in Akismet filtering.

Old hash URLs (`/#contact`, `/#case-studies/<slug>`) are redirected client-side
from the home page.

## Deploy (Netlify)

Build settings live in `netlify.toml`; pushes to `main` deploy production and
pull requests get deploy previews. No environment variables are required.

One-time setup in the Netlify UI:

1. **Forms → Enable form detection**, then redeploy.
2. **Project configuration → Notifications → Form submission notifications** → email.
3. **Domain management** → add `openrangedevs.com` (primary) and `www.openrangedevs.com`.
