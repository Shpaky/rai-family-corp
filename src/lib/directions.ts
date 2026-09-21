import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/config';

export type Direction = CollectionEntry<'directions'>;
export type Category = CollectionEntry<'categories'>;

const STATUS_RANK = { active: 0, 'on-order': 1, coming: 2 } as const;

/** Published directions, unsorted. */
export async function getDirections(): Promise<Direction[]> {
  return getCollection('directions', (e) => e.data.published);
}

/** Categories by order, with their published directions. Empty categories are dropped. */
export async function getCategoriesWithDirections(directions?: Direction[]) {
  const all = directions ?? (await getDirections());
  const categories = (await getCollection('categories')).sort(
    (a, b) => a.data.order - b.data.order,
  );
  return categories
    .map((category) => ({
      category,
      directions: all.filter((d) => d.data.category.id === category.id),
    }))
    .filter((c) => c.directions.length > 0);
}

export function categoryOf(direction: Direction, categories: Category[]): Category {
  const c = categories.find((x) => x.id === direction.data.category.id);
  if (!c)
    throw new Error(
      `Direction "${direction.id}" references unknown category "${direction.data.category.id}"`,
    );
  return c;
}

/** Catalog order: in stock first, then by order, then by title. */
export function sortCatalog(list: Direction[], locale: Locale): Direction[] {
  return [...list].sort(
    (a, b) =>
      STATUS_RANK[a.data.status] - STATUS_RANK[b.data.status] ||
      a.data.order - b.data.order ||
      a.data.i18n[locale].title.localeCompare(b.data.i18n[locale].title, locale),
  );
}

/** Home carousel: featured first, then in stock, then by order; at most 12 (all when 8 or fewer). */
export function pickCarousel(list: Direction[]): Direction[] {
  const sorted = [...list].sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      STATUS_RANK[a.data.status] - STATUS_RANK[b.data.status] ||
      a.data.order - b.data.order,
  );
  return list.length <= 8 ? sorted : sorted.slice(0, 12);
}

/** Up to three similar directions: same category first, then others, by order. */
export function pickSimilar(current: Direction, list: Direction[]): Direction[] {
  const others = list
    .filter((d) => d.id !== current.id)
    .sort((a, b) => a.data.order - b.data.order);
  const same = others.filter((d) => d.data.category.id === current.data.category.id);
  const rest = others.filter((d) => d.data.category.id !== current.data.category.id);
  return [...same, ...rest].slice(0, 3);
}

/** Absolute or base-aware URL of a document. */
export function documentHref(url: string): string {
  return url.startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${url}` : url;
}
