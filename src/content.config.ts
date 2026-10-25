import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const step = z.object({ number: z.string(), title: z.string(), body: z.string() })

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    // false = page is built but noindex and left out of the sitemap.
    // Flip to true once the client has approved being named publicly.
    published: z.boolean().default(false),
    order: z.number(),
    client: z.string(),
    project: z.string(),
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    challenge: z.string(),
    approach: z.string(),
    impact: z.string(),
    lede: z.string(),
    contextTitle: z.string(),
    context: z.array(z.string()),
    steps: z.array(step),
    outcomeTitle: z.string(),
    outcomeBody: z.string(),
    disciplines: z.array(z.string()),
    signal: z.array(z.string()).length(4),
    showTestimonial: z.boolean().default(false),
  }),
})

// Problem-aware articles for the SEO plan. Add a Markdown file to
// src/content/insights/ and it becomes /insights/<file-name>/.
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    published: z.boolean().default(false),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
})

export const collections = { 'case-studies': caseStudies, insights }
