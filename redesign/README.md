# ld-nyc.com redesign (prototype)

Astro static site. Builds plain HTML into `dist/`, so it can still be hosted free on GitHub Pages.

```sh
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # production build into dist/
npm run preview    # serve the build
```

## How it fits together

- `src/data/projects.json`: the 15 projects (name, type, description, photo list). Edit text here.
- `src/assets/`: photos. Astro makes AVIF/WebP copies at several sizes at build time.
- `src/lib/projects.ts`: categories, cover photo choices, featured projects on the home page.
- `src/pages/`: home (`index.astro`), projects list (`work/index.astro`), one template for every project (`work/[slug].astro`).
- `src/components/`: header, footer, project card, LD monogram.
- `scripts/import-legacy.mjs`: one-off import from the old site (one folder up). Re-running it overwrites `projects.json` and the photos.

## Not done yet

- About, Press and Contact are sections on the home page, not their own pages.
- Copy is a draft based on the old site and needs Doris's review.
- Photos are the old 900px web copies. Higher-resolution originals will make a big difference.
- No contact form yet: email and phone links only.
- Not wired up to deploy; the live site is still the old one at the repo root.
