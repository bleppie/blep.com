# blep.com

Brian Knep's website, built with [Astro](https://astro.build) and hosted on GitHub Pages.
Every push to `main` rebuilds and publishes the site automatically
(see `.github/workflows/deploy.yml`).

## Where things are

```
src/content/pages/            ← all the content; the folder path is the URL
  home/index.md               ← home page slideshow + section blurbs
  about/index.md              ← /about/
  works/index.md              ← /works/ (the Artwork grid)
  works/traces/index.md       ← /works/traces/ (a series)
  works/traces/namaste/       ← /works/traces/namaste/
    index.md                  ←   its text and media list
    Worms-01.jpg              ←   its images, right next to it
public/files/                 ← PDFs and animated GIFs, served as-is
src/components/, src/pages/   ← templates (you rarely need these)
src/styles/site.css           ← the look
```

## Editing a work

A work's `index.md` looks like this:

```markdown
---
slug: "works/traces/namaste"     # must match the folder path
title: "Namaste"
order: 10                        # position among its siblings (lower = earlier)
media: "digital prints mounted in lightboxes"
year: 2009
thumb: "./Worms-01.jpg"          # picture used in the series / Artwork grid
content:                         # the main column, top to bottom
  - image: "./Worms-01.jpg"
    half: true                   # optional: half width, so two sit side by side
  - image: "./Worms-02.jpg"
    half: true
  - gallery:                     # grid of thumbnails that open large on click
      - image: "./Namaste-Feldman.jpg"
        caption: "Installed at Ronald Feldman Fine Arts, NY"
  - vimeo: "13525868"            # or  - youtube: "bDNQlq_-6v4"
  - text: |
      Any **Markdown** text in the main column.
  - divider: true
---

The text that appears in the right-hand column, in Markdown.
*Italics*, **bold**, [links](/works/traces/).
```

Images can be full-size originals; the build makes small, fast versions automatically.
If you misspell a field or reference an image that isn't there, the build fails
with a message telling you which file — nothing broken gets published.

## Adding a work

1. Copy an existing work's folder, e.g. `works/traces/namaste/` → `works/traces/new-piece/`.
2. Change `slug` to `works/traces/new-piece`, update the text, drop in the images.
3. Set `order` to place it among its siblings. It appears in the series grid and
   in the Prev/Next links automatically.

A folder that has sub-folders is a series: its page shows a grid of its works.

## Working locally

```sh
npm install
npm run dev        # live preview at http://localhost:4321
npm run build      # the finished site goes to dist/
```

## Publishing

Every push to `main` builds and publishes the site (Actions tab shows progress).
Until www.blep.com points here it's served at https://bleppie.github.io/blep.com/ —
the build detects this and adjusts all links automatically.

To switch www.blep.com over, see "Pointing www.blep.com at GitHub Pages" below.

## Pointing www.blep.com at GitHub Pages

1. At your DNS provider, set these records:
   - `www` — **CNAME** → `bleppie.github.io`
   - `@` (bare blep.com) — **A** records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - optional IPv6 `@` **AAAA** → `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
2. Repo **Settings → Pages → Custom domain**: enter `www.blep.com`, Save.
   GitHub checks DNS, then issues an HTTPS certificate (minutes to an hour).
3. Tick **Enforce HTTPS** once it's offered.
4. Re-run the latest deploy (Actions → Deploy to GitHub Pages → Re-run) so the
   links drop the `/blep.com` prefix.
