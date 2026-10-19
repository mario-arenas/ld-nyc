# LD Creative Renovations (ld-nyc.com)

Static brochure site. Plain HTML, CSS and images; no build step.

## Run locally

```sh
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080

## Hosting

Served by GitHub Pages from the `master` branch (repo root). Pushing to `master` deploys.

- `CNAME`: the custom domain (`www.ld-nyc.com`). The bare `ld-nyc.com` redirects to it.
- `.nojekyll`: turns off GitHub's Jekyll step, which would otherwise drop the `_thumbs` image folders.

DNS lives at Network Solutions. Records for the site:

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | mario-arenas.github.io |

Do not change the MX records: they deliver the domain's Google Workspace email.

## Known gaps

- Contact form still posts to the old ExpressionEngine CMS, so submissions go nowhere.
- `assets/images/press/vanityFair1999-5.jpg` is linked from the Press page but missing.
- Google Analytics uses the retired Universal Analytics tag (`UA-31683500-1`), which no longer collects data.
