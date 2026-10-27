import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix a root-relative path ("/works/") with the site's base path. */
export const withBase = (href: string) => (href.startsWith('/') && !href.startsWith('//') ? BASE + href : href);
/** Same, for every href="/…" and src="/…" in an HTML string. */
export const htmlWithBase = (html: string) => (BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html);

export const url = (slug: string) => withBase(slug === 'home' ? '/' : `/${slug}/`);
export const parentOf = (slug: string) => slug.split('/').slice(0, -1).join('/');

export async function allPages() {
  return (await getCollection('pages')).sort((a, b) => a.data.order - b.data.order);
}
export const childrenOf = (pages: Page[], slug: string) =>
  pages.filter((p) => p.data.slug !== 'home' && parentOf(p.data.slug) === slug);
