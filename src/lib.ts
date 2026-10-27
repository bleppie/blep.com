import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;
export const url = (slug: string) => (slug === 'home' ? '/' : `/${slug}/`);
export const parentOf = (slug: string) => slug.split('/').slice(0, -1).join('/');

export async function allPages() {
  return (await getCollection('pages')).sort((a, b) => a.data.order - b.data.order);
}
export const childrenOf = (pages: Page[], slug: string) =>
  pages.filter((p) => p.data.slug !== 'home' && parentOf(p.data.slug) === slug);
