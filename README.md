# Rai Family Corp — сайт-визитка

Презентационный сайт Rai Family Corp LLP, официального оператора павильона
Российского экспортного центра в Индии. Статическая сборка на Astro 7 + Tailwind 4,
три языка (EN, RU, HI), без клиентских фреймворков.

## Команды

| Команда                | Что делает                                          |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | dev-сервер                                          |
| `npm run build`        | `astro check` + сборка в `dist/`                    |
| `npm run lint`         | eslint, prettier, проверка токенов                  |
| `npm run test:a11y`    | axe + клавиатурная проверка всех страниц из `dist/` |
| `npm run check:budget` | JS ≤ 50 КБ на страницу                              |
| `npm run lighthouse`   | Lighthouse CI: Perf/A11y/BP ≥ 95, SEO = 100         |
| `npm run shots`        | скриншоты всех страниц на 360/768/1280 в `shots/`   |

Перед `test:a11y`, `lighthouse` и `shots` нужен свежий `npm run build`.

## Где что менять

- Тексты всех языков — `src/i18n/ui.ts`.
- Направления (продукты) — `src/content/directions/*.json`; новый файл = новая карточка и страница.
- Токены дизайна (цвета, шрифты, размеры) — `src/styles/global.css`, блок `@theme`.
- Адрес сайта и base — env `SITE_URL`, `BASE_PATH` (`.env.example`). CI для GitHub Pages — `.github/workflows/deploy.yml`.

Правила разработки — в `CLAUDE.md`.
