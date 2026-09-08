# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Правила проекта

## Стек
Astro 7 (Node >= 22.12), TypeScript strict, Tailwind 4 (`@tailwindcss/vite`).
Статическая сборка, клиентских фреймворков нет.
Никаких новых зависимостей без явного согласования. Утверждённый набор
dev-зависимостей — см. `package.json` (astro, sitemap, check, sharp,
tailwind, eslint/prettier с astro-плагинами, playwright + axe, lhci).

## Жёсткие ограничения
- Бюджет JS: <= 50 КБ на страницу (`npm run check:budget`)
- Lighthouse: Perf/A11y/BP >= 95, SEO = 100 (`npm run lighthouse`)
- Только токены из `@theme` в `src/styles/global.css`. Произвольные значения
  (`text-[13px]`, `bg-[#a3a3a3]`, hex в разметке/SVG) запрещены — `npm run lint:tokens`.
  В инлайн-SVG использовать `currentColor` и классы.
- Ссылки и ассеты учитывают `base` (`import.meta.env.BASE_URL`), сайт живёт
  на `https://shpaky.github.io//`.
- Семантический HTML. Каждая интерактивная сущность доступна с клавиатуры.
  Компилятор Astro 7 строгий: все не-void теги закрываются.
- Все анимации отключаются при prefers-reduced-motion
- Изображения только через `<Image />`/`<Picture />` из astro:assets, avif/webp

## Процесс
- Одна секция лендинга = один коммит (`feat(<section>): ...`), push после коммита.
- Перед коммитом: `npm run build && npm run lint && npm run test:a11y`
- После каждой секции сделать скриншоты на 360/768/1280 (`npm run shots`) и показать.
