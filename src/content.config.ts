import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every page of the site is a folder under src/content/pages/ holding an
// index.md plus its images. The folder path is the URL:
//   src/content/pages/works/traces/namaste/index.md  →  /works/traces/namaste/
// Front matter is checked against this schema when the site builds, so a
// typo or a missing image stops the build instead of publishing a broken page.
const pages = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/pages' }),
  schema: ({ image }) => {
    const picture = z.object({ image: image(), caption: z.string().optional(), half: z.boolean().optional() }).strict();
    const gif = z.object({ gif: z.string(), caption: z.string().optional(), half: z.boolean().optional() }).strict();
    const block = z.union([
      picture,                                              // - image: ./photo.jpg
      gif,                                                  // - gif: /files/animation.gif
      z.object({ gallery: z.array(z.union([picture, gif])) }).strict(), // grid of thumbnails
      z.object({ youtube: z.string() }).strict(),           // - youtube: VIDEO_ID
      z.object({ vimeo: z.string() }).strict(),             // - vimeo: VIDEO_ID
      z.object({ text: z.string() }).strict(),              // - text: | markdown
      z.object({ divider: z.literal(true) }).strict(),      // - divider: true
    ]);
    return z.object({
      slug: z.string(),                 // URL path, matches the folder
      title: z.string(),
      order: z.number(),                // position among its siblings
      media: z.string().optional(),     // e.g. "digital prints mounted in lightboxes"
      year: z.union([z.number(), z.string()]).optional(),
      thumb: image().optional(),        // used in the parent's grid
      content: z.array(block).default([]), // main column, top to bottom
      // home page only
      slides: z.array(z.object({ image: image(), title: z.string(), link: z.string() })).optional(),
      sections: z.array(z.object({ title: z.string(), link: z.string(), blurb: z.string() })).optional(),
    });
  },
});

export const collections = { pages };
