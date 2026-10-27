import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.blep.com',
  trailingSlash: 'always',
  // The old "All" pages were duplicates of the section indexes.
  redirects: { '/works/all/': '/works/', '/rd/all/': '/rd/' },
});
