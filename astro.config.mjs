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
    locales: ['en', 'ru'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru' },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Overpass',
      cssVariable: '--font-body',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Playfair Display',
      cssVariable: '--font-display-face',
      weights: ['600 800'],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
