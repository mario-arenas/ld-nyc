# ld-nyc.com website

Astro static site. It builds plain HTML into `../docs/`, which GitHub Pages serves at https://www.ld-nyc.com
(Settings → Pages → Deploy from a branch → `redesign` → `/docs`).

```sh
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # production build into ../docs/
npm run preview    # serve the build
```

## How it fits together

- `src/data/projects.json`: the 15 projects (name, type, description, photo list). Edit text here.
- `src/assets/`: photos. Astro makes AVIF/WebP copies at several sizes at build time.
- `src/lib/projects.ts`: categories, cover photo choices, featured projects on the home page.
- `src/pages/`: home (`index.astro`), projects list (`work/index.astro`), one template for every project (`work/[slug].astro`).
- `src/components/`: header, footer, project card, LD monogram.
- `scripts/import-legacy.mjs`: one-off import from the old site (one folder up). Re-running it overwrites `projects.json` and the photos.

## Publishing a change

GitHub Pages serves `docs/` as committed; it does not build anything. After editing:

```sh
npm run build                  # regenerates ../docs
git add -A . ../docs
git commit -m "Describe the change"
git push                       # live in a minute or two
```

Edits made only in `src/` (for example on github.com) do not reach the site until someone rebuilds and commits `docs/`.

## Notes

- `public/CNAME` and `public/.nojekyll` must stay: the first keeps the custom domain, the second stops GitHub
  from dropping the `_astro/` folder (it ignores folders starting with `_`).
- `src/pages/[...legacy].ts` generates redirect pages for the old site's URLs (`/work/biggio.html`, `/about/us.html`, ...).
- About, Press and Contact are sections on the home page, not their own pages.
- Photos are the old 900px web copies. Higher-resolution originals will make a big difference.
- No contact form: email and phone links only.
- The previous site is preserved on the `legacy-site` branch.
