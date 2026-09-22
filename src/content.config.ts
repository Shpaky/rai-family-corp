import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
  Content model. Rule: the JSON root holds non-textual data only; everything a
  visitor reads lives under `i18n.<locale>` so each locale is complete on its own.
*/

const categoryText = z.object({
  name: z.string(),
  /** Intro paragraph of the category page. */
  lead: z.string(),
  /** Meta description of the category page, up to ~155 characters. */
  description: z.string(),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    order: z.number().default(100),
    /** Colour of the category chip on cards. */
    tone: z.enum(['warm', 'surface', 'surface-strong']).default('surface'),
    i18n: z.object({ en: categoryText, ru: categoryText }),
  }),
});

const product = z.object({
  name: z.string(),
  text: z.string(),
  /** Key characteristics, one per line. */
  specs: z.array(z.string()).default([]),
});

const nullableText = z.string().nullable().default(null);

const localized = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    body: z.array(z.string()).default([]),
    /** Individual products inside the line. */
    products: z.array(product).default([]),
    /** Product audiences (not the operator's). */
    forWhom: z.array(z.string()).min(1),
    /** Key figures, verbatim from the manufacturer's documents. */
    facts: z.array(z.string()).default([]),
    /** 1–2 short figures for the card. */
    keyFigures: z.array(z.string()).max(2).default([]),
    /** Stock and dispatch line for the card. */
    logistics: nullableText,
    manufacturerNote: nullableText,
    howToBuy: z
      .object({
        dispatch: nullableText,
        moq: nullableText,
        packaging: nullableText,
        priceNote: nullableText,
        incoterms: nullableText,
      })
      .default({ dispatch: null, moq: null, packaging: null, priceNote: null, incoterms: null }),
    references: z
      .array(z.object({ title: z.string(), text: z.string(), image: image().optional() }))
      .default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  });

/** Absolute URL, or a PDF under public/docs/<slug>/ (resolved with BASE_URL by the component). */
const documentUrl = z.union([z.url(), z.string().regex(/^\/docs\/[a-z0-9-]+\/[^/]+\.pdf$/)]);

const document = z.object({
  /** Short label shared by all locales, e.g. "TDS (EN)". */
  label: z.string(),
  url: documentUrl,
  type: z.enum(['tds', 'sds', 'certificate', 'test', 'authorization', 'leaflet', 'presentation']),
});

const directions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/directions' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().default(100),
      brand: z.string(),
      category: reference('categories'),
      status: z.enum(['active', 'on-order', 'coming']).default('active'),
      /** false hides the direction everywhere (card, page, sitemap) without deleting its content. */
      published: z.boolean().default(true),
      /** Reserved: not rendered or filtered anywhere yet; every hub direction is B2B, retail lives on therusstore.com. */
      audiences: z.array(z.enum(['b2b', 'b2c'])).default([]),
      /** Name of the source sub-folder in ./directions (see npm run check:directions). */
      source: z.string(),
      tags: z.array(z.string()).default([]),
      /** true puts the direction first in the home carousel. */
      featured: z.boolean().default(false),
      /** 4:3 cover, e.g. ./covers/<slug>.jpg next to the JSON. */
      image: image().optional(),
      manufacturer: z
        .object({
          name: z.string(),
          city: z.string().nullable().default(null),
          founded: z.number().nullable().default(null),
          logo: image().optional(),
        })
        .nullable()
        .default(null),
      howToBuy: z.object({ stockInIndia: z.boolean() }).nullable().default(null),
      documents: z.array(document).default([]),
      i18n: z.object({ en: localized({ image }), ru: localized({ image }) }),
    }),
});

export const collections = { categories, directions };
