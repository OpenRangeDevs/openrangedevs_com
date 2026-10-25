// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Unpublished pages (e.g. case studies awaiting client approval) are built
// but kept out of the sitemap and marked noindex. See src/data/seo.ts.
import { unlistedPaths } from './src/data/unlisted.mjs'

export default defineConfig({
  site: 'https://openrangedevs.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !unlistedPaths.some((path) => page.endsWith(path)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
