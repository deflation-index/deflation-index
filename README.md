# The Deflation Index

An open record of how technology made things radically cheaper, and where the abundance went.

## Running locally

This is a static site. Serve the folder over HTTP (`file://` blocks the script loads):

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `caddy file-server`, GitHub Pages, Netlify, Cloudflare Pages, etc.).

The JSX in `src/` is precompiled into `dist/` (plain JS, committed to the repo), so deployment needs no build. **If you edit any `.jsx` file**, rebuild and commit `dist/`:

```bash
npm install        # once
npm run build      # or: npm run watch
```

## Structure

```
index.html                    Entry point (static SEO fallback + script loading)
src/
  data.js                     Window-attached DI data (extracted from data/*.json)
  DIChart.jsx                 Reusable chart engine (multi-series, zoom, log/linear)
  abundance-v2.jsx            Home + shared shell (Reveal, theme, newsletter, nav)
  abundance-v2-pages.jsx      Sectors / Sector / Explore / Stories / Method
  app.jsx                     Router + app shell + footer
dist/                         Compiled JS served in production (npm run build)
data/
  constants.json              Single source of truth for series, weights, sources
  master_index.json           Computed weighted index, 1990-2024
  sectors.json                Per-sector series + metadata
assets/logo/                  Favicons + lockup
favicon.ico
```

## Data

Series-level URLs and per-datapoint provenance live in [`data/constants.json`](data/constants.json). The Method page lists one canonical link per institution.

The full v3.0.3 source spreadsheets are in [`data/excel/`](data/excel/). Detailed methodology, weighting, and changelog live in [`docs/`](docs/). The legacy v3.0 JSON API contract is preserved in [`data/api_legacy_v3.0/`](data/api_legacy_v3.0/) for anyone who linked to it.

## License

Three-part split, by design:

- **Code** (this repo's HTML, JSX, scripts) — [MIT](LICENSE)
- **Data, methodology, written documentation** — [CC BY 4.0](LICENSE)
- **The Deflation Index name and logo marks** — © 2026 Deflation Index LLC, all rights reserved

See [`LICENSE`](LICENSE) for the full text.

## Contributing

PRs welcome — particularly data corrections, source improvements, and methodology critiques. See [`docs/operations/CONTRIBUTING.md`](docs/operations/CONTRIBUTING.md).

Site: <https://deflationindex.com> · Contact: info@deflationindex.com
