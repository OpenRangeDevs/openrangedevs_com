// Paths excluded from the sitemap: any content entry with `published: false`.
// Read straight from frontmatter so astro.config.mjs doesn't need the content layer.
import { readdirSync, readFileSync, existsSync } from 'node:fs'

const collections = [
  ['src/content/case-studies', '/case-studies/'],
  ['src/content/insights', '/insights/'],
]

const isPublished = (source) => /^published:\s*true\s*$/m.test(source.split(/^---\s*$/m)[1] ?? '')

export const unlistedPaths = [
  '/contact/thanks/',
  ...collections.flatMap(([dir, prefix]) =>
    existsSync(dir)
      ? readdirSync(dir)
          .filter((file) => file.endsWith('.md') && !isPublished(readFileSync(`${dir}/${file}`, 'utf8')))
          .map((file) => `${prefix}${file.replace(/\.md$/, '')}/`)
      : [],
  ),
]
