import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({
  title: z.string(),
  summary: z.string(),
  body: z.array(z.string()).default([]),
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
    i18n: z.object({ en: localized, ru: localized, hi: localized }),
  }),
});

export const collections = { directions };
