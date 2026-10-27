import { defineConfig } from 'astro/config';

// BASE_PATH is set by the deploy workflow. It's "/blep.com" while the site is
// served from bleppie.github.io/blep.com/, and empty once www.blep.com points here.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');

// Prefix root-relative links in Markdown (e.g. "/works/traces/") with the base path.
function rehypeBase() {
  const walk = (node) => {
    if (node.type === 'element') {
      for (const attr of ['href', 'src']) {
        const v = node.properties?.[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//')) node.properties[attr] = base + v;
      }
    }
    node.children?.forEach(walk);
  };
  return (tree) => { if (base) walk(tree); };
}

export default defineConfig({
  site: 'https://www.blep.com',
  base: base || '/',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [rehypeBase] },
  // The old "All" pages were duplicates of the section indexes.
  redirects: { '/works/all/': `${base}/works/`, '/rd/all/': `${base}/rd/` },
});
