# POD — Reimagining Local Governance

A non-partisan, grassroots civic-governance initiative for Kerala panchayats. This repository is the source for the public site at **[a-day-together-in-panchayat.web.app](https://a-day-together-in-panchayat.web.app)**.

POD proposes parallel, citizen-centric institutions at the panchayat level — moving from a colonial *ruling* model to a *community-regulating* one. The site is bilingual (English / Malayalam) and acts as both the public face of the initiative and a curated index ("Knowledge Hub") of conversations already happening on YouTube, Facebook, and in the press.

## Status

Early. The Knowledge Hub entries and the concept paper PDF are real content; most of the surrounding editorial copy is scaffolding meant to be replaced as the initiative takes shape. See the wiki's *Content status* page for the full breakdown.

## Pages

- `index.html` — the full editorial site (hero, three pillars, methodology, 5-year roadmap, Knowledge Hub, voices, FAQ, get-involved).
- `join.html` — a standalone phone-first signup page, intended for sharing on WhatsApp / Instagram. Posts to a Google Apps Script Web App that writes to a Google Sheet.

## Tech

Plain HTML + CDN React 18 + Babel-in-browser JSX. **No build step.** The browser transpiles JSX on load.

```
index.html       join.html        styles.css
app.jsx          join.jsx
sections.jsx     sections2.jsx    tweaks-panel.jsx
content.jsx      i18n.jsx
uploads/         (concept paper PDF + hero image)
```

`content.jsx` holds the English archive data; `i18n.jsx` holds all UI strings and the Malayalam archive data.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

`file://` doesn't work — Babel refuses CORS-blocked scripts, so a real HTTP server is required.

## Deploy

Firebase Hosting, project `a-day-together-in-panchayat`.

```bash
firebase deploy --only hosting
```

The repo's `firebase.json` sets `no-cache` on HTML/CSS/JSX and 24h caching on `uploads/**`.

## Contributing content

Adding a Knowledge Hub video / article means adding one object to both `ARCHIVE` (in `content.jsx`) and `ARCHIVE_ML` (in `i18n.jsx`), keyed by ISO date. See the wiki's *Knowledge Hub* page for the schema and a worked example.

## License

Not yet declared. Treat the site copy and the concept paper PDF as © 2026 POD — A non-partisan citizen initiative.
