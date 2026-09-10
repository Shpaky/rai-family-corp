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
- Ссылки и ассеты учитывают `base` (`import.meta.env.BASE_URL`). Адрес и base
  задаются через env `SITE_URL` / `BASE_PATH` (см. `.env.example`); по умолчанию
  GitHub Pages `https://shpaky.github.io/rai-family-corp/`. После MVP хостинг
  сменится — в коде адрес не хардкодить. Для ссылок между страницами использовать
  `href(locale, path)` из `src/i18n/utils.ts`.
- Семантический HTML. Каждая интерактивная сущность доступна с клавиатуры.
  Компилятор Astro 7 строгий: все не-void теги закрываются.
- Все анимации отключаются при prefers-reduced-motion
- Изображения только через `<Image />`/`<Picture />` из astro:assets, avif/webp

## Контент и i18n

- Локали: `en` (основная, без префикса), `ru` (`/ru/`), `hi` (`/hi/`). Страницы —
  через `src/pages/[...locale]/…` и `localePaths()`; hreflang/canonical даёт `Seo.astro`.
- Все тексты — в `src/i18n/ui.ts` (EN источник, RU/HI переводы; HI — черновик до
  проверки носителем). В разметке строк нет.
- Направления (продукты) — content collection `src/content/directions/*.json`
  (схема в `src/content.config.ts`). Новое направление = новый JSON-файл.
  Ссылка на сайт направления (`site`) — через `siteHref(site, locale)`: сайты
  направлений повторяют схему локалей хаба (EN в корне, `/ru/`, `/hi/`), переход
  с языковой версии хаба ведёт на ту же языковую версию сайта направления.
- Бренд: свой стиль на палитре «Сделано в России» (`руководство к брендированию.pdf`),
  знак «Made in Russia» можно использовать как партнёрскую марку. Шрифты Montserrat и
  Noto Sans Devanagari — через Fonts API Astro (`astro.config.mjs`), самохостинг на сборке.
- Ключевое преимущество для всех текстов: официальный оператор павильона РЭЦ в Индии.
- Команду/руководство не показывать. Контакты, партнёры, цифры — только подтверждённые,
  до получения данных — плейсхолдеры из `ui.ts` (`contacts.placeholder`).

## Процесс

- Одна секция лендинга = один коммит (`feat(<section>): ...`), push после коммита.
- Перед коммитом: `npm run build && npm run lint && npm run test:a11y`
- После каждой секции сделать скриншоты на 360/768/1280 (`npm run shots`) и показать.
- `npm run check:budget` и `npm run lighthouse` — перед пушем крупных секций и перед релизом.
- Astro 7 `preview` уходит в фон, когда видит агентское окружение; тестовые скрипты
  запускают его с `ASTRO_PREVIEW_BACKGROUND=1 … --ignore-lock`, чтобы он остался на переднем плане.
