import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const product = z.object({
  name: z.string(),
  text: z.string(),
});

const localized = z.object({
  title: z.string(),
  summary: z.string(),
  body: z.array(z.string()).default([]),
  /** Individual products inside a direction that shares one product site. */
  products: z.array(product).default([]),
  /** Product audiences (as on the product site). Falls back to operator audiences when empty. */
  forWhom: z.array(z.string()).default([]),
  /** Key figures, verbatim from the product site. */
  facts: z.array(z.string()).default([]),
  /** Stock and dispatch line. */
  logistics: z.string().nullable().default(null),
});

const document = z.object({
  /** Short label shared by all locales, e.g. "TDS (EN)". */
  label: z.string(),
  url: z.url(),
});

const directions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/directions' }),
  schema: z.object({
    order: z.number().default(100),
    brand: z.string(),
    category: z.enum(['food-and-drinks', 'construction', 'industrial', 'consumer', 'other']),
    status: z.enum(['active', 'launching', 'planned']).default('active'),
    audiences: z.array(z.enum(['distributors', 'institutions', 'manufacturers', 'consumers'])),
    site: z.url().nullable().default(null),
    documents: z.array(document).default([]),
    i18n: z.object({ en: localized, ru: localized, hi: localized }),
  }),
});

export const collections = { directions };
