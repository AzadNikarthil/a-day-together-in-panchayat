# POD — Reimagining Local Governance

A non-partisan, grassroots civic-governance initiative for Kerala panchayats. This repository is the source for the public site at **[a-day-together-in-panchayat.web.app](https://a-day-together-in-panchayat.web.app)**.

POD proposes parallel, citizen-centric institutions at the panchayat level — moving from a colonial *ruling* model to a *community-regulating* one. The site is bilingual (English / Malayalam) and acts as both the public face of the initiative and a curated index ("Knowledge Hub") of conversations already happening on YouTube, Facebook, and in the press.

## Status

Early. The Knowledge Hub entries and the concept paper PDF are real content; most of the surrounding editorial copy is scaffolding meant to be replaced as the initiative takes shape. See the wiki's *Content status* page for the full breakdown.

## Pages

- `index.html` — the full editorial site (hero, three pillars, methodology, 5-year roadmap, Knowledge Hub, voices, FAQ, get-involved).
- `join.html` — a standalone phone-first signup page, intended for sharing on WhatsApp / Instagram. Posts to a Google Apps Script Web App that writes to a Google Sheet.

## Tech

Plain HTML + React 18 + global-scope JSX, **precompiled** at deploy time (a light `build.mjs` step — no in-browser Babel, no ES-module rewrite). The source files stay simple; `build.mjs` Babel-compiles + minifies them into one bundle per page and emits a ready-to-serve `dist/`.

```
index.html       join.html        styles.css
app.jsx          join.jsx
sections.jsx     sections2.jsx    tweaks-panel.jsx
content.jsx      i18n.jsx
build.mjs        package.json     favicon.svg
uploads/         (concept paper PDF + hero image)
dist/            (build output — gitignored)
```

`content.jsx` holds the English archive data; `i18n.jsx` holds all UI strings and the Malayalam archive data. **Edit the `.jsx` files, not `dist/`.**

## Run locally

```bash
npm install        # first time only
npm run watch      # rebuilds dist/ on change
npm run serve      # serves dist/ at http://localhost:8000 (separate terminal)
```

(`npm run build` for a one-shot build.) `file://` doesn't work — a real HTTP server is required.

## Deploy

Firebase Hosting, project `a-day-together-in-panchayat`.

```bash
npm run deploy     # build, then firebase deploy --only hosting
```

The repo's `firebase.json` serves `dist/`, sets `no-cache` on HTML/CSS/JS, long caching on `/vendor/**`, and 24h on `uploads/**`.

## Contributing content

Adding a Knowledge Hub video / article means adding one object to both `ARCHIVE` (in `content.jsx`) and `ARCHIVE_ML` (in `i18n.jsx`), keyed by ISO date. See the wiki's *Knowledge Hub* page for the schema and a worked example.

## License

Not yet declared. Treat the site copy and the concept paper PDF as © 2026 POD — A non-partisan citizen initiative.
