// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hosting is GitHub Pages until MVP and something else after.
// Both values therefore come from the environment; defaults target Pages.
const site = process.env.SITE_URL ?? 'https://shpaky.github.io';
const base = process.env.BASE_PATH ?? '/rai-family-corp';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'hi'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru', hi: 'hi' },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Sans Devanagari',
      cssVariable: '--font-devanagari',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['devanagari'],
      fallbacks: ['sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
