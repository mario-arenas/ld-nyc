# LD Creative Renovations (ld-nyc.com)

This is the `redesign` branch, which serves the live site.

- `docs/`: the built website. GitHub Pages publishes this folder as-is (Settings → Pages → `redesign` → `/docs`).
- `redesign/`: the Astro source. See `redesign/README.md` for how to edit and publish.
- Everything else at the root (`about/`, `assets/`, `work/`, ...) is the previous site's files, kept because
  `redesign/scripts/import-legacy.mjs` reads them. They are not served.

The previous site, exactly as it was, lives on the `legacy-site` branch.

DNS is at Network Solutions: four A records on `@` (185.199.108.153–111.153) and a `www` CNAME to
`mario-arenas.github.io`. Leave the MX records alone: they deliver the domain's Google Workspace email.
