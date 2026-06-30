# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public site for **POD**, a non-partisan civic-governance initiative for Kerala panchayats. Bilingual (English / Malayalam). Two independent pages:

- `index.html` — the full editorial site (hero, four pillars, methodology, 5-year roadmap, Knowledge Hub archive, voices, FAQ, get-involved).
- `join.html` — standalone phone-first signup page; POSTs to a Google Apps Script Web App (`SIGNUP_ENDPOINT` in `join.jsx`) using `mode: "no-cors"` form-urlencoded.

## Build: light precompile

The source is still plain global-scope `.jsx` (no ES modules), but it is **precompiled** before deploy — the browser no longer loads `@babel/standalone` or the React development builds. `build.mjs`:

1. Babel-compiles each source file with `preset-react` + `transform-block-scoping` (the block-scoping plugin turns cross-file top-level `const`s into redeclarable `var`s, exactly as in-browser Babel used to — this is what lets the files be concatenated into one scope; e.g. `useEffect` is declared in both `sections.jsx` and `sections2.jsx`).
2. Concatenates each page's files in the original `<script>` order (see `BUNDLES` in `build.mjs`) and minifies with esbuild → `dist/app.min.js`, `dist/join.min.js`.
3. Copies static assets, vendors production React into `dist/vendor/`, and rewrites the HTML (swaps the dev `<script>` block for production React + the one bundle; the static fallback markup inside `#root` is preserved).

**Edit the `.jsx` files in the repo root — those are the source of truth.** `dist/` is a build artifact (gitignored); never edit it by hand.

If you add a new source file to a page, add it to that page's `BUNDLES` list in `build.mjs` in the right order.

### Run locally

```bash
npm install        # first time
npm run watch      # rebuilds dist/ on every source change
npm run serve      # static-serves dist/ at http://localhost:8000 (separate terminal)
```

A one-shot build is `npm run build`. `file://` does not work — fonts/assets need a real HTTP server.

### Deploy

Firebase Hosting, project `a-day-together-in-panchayat`:

```bash
npm run deploy     # = npm run build && firebase deploy --only hosting
```

`firebase.json` serves `dist/`, sets `no-cache` on `*.js|css|html`, long-immutable caching on `/vendor/**`, and 24h on `uploads/**`.

## Architecture — how the files connect

Everything runs in one global scope; files are not modules. Load order (from `index.html`): `tweaks-panel.jsx` → `i18n.jsx` → `content.jsx` → `sections.jsx` → `sections2.jsx` → `app.jsx`.

- **`app.jsx`** — the `App` component, mounts to `#root`, wires the section components in order, owns `lang` state and the Tweaks panel (accent color + density, applied as CSS custom properties on `:root`).
- **`sections.jsx`** — `Nav`, `Hero`, `Shift`, `Pillars`, `MethodologyClock`.
- **`sections2.jsx`** — `Roadmap`, `Archive` (the Knowledge Hub, with `ArchiveCard` / `ArchiveMedia`), `Voices`, `FAQList`, `CoCreator`, `Footer`.
- **`content.jsx`** — the English data (`PILLARS`, `ARCHIVE`, `VOICES`, `FAQ`, …) **and** the i18n plumbing: `LangContext`, `useLang()`, and `useT()` (returns `STRINGS[lang]`).
- **`i18n.jsx`** — all UI strings (`STRINGS.en` / `STRINGS.ml`) and the Malayalam data mirrors (`PILLAR_ML`, `ARCHIVE_ML`, `VOICES_ML`, `FAQ_ML`), exported via `Object.assign(window, …)`.
- **`styles.css`** — all styling; Malayalam typography is gated on the `html.lang-ml` class, which `App` toggles when language switches.
- **`tweaks-panel.jsx`** — reusable design-tweak shell (`useTweaks`, `TweaksPanel`, `TweakColor`, etc.) plus an edit-mode host protocol (`/*EDITMODE-BEGIN*/…/*EDITMODE-END*/` markers, `postMessage`). Generic infra shared across prototypes; usually untouched.

### Bilingual rule (important)

There is no translation library — English and Malayalam are **parallel hand-maintained data**. UI strings live as `STRINGS.en` / `STRINGS.ml` keys in `i18n.jsx`; structured content lives as `X` (English, in `content.jsx`) paired with `X_ML` (Malayalam, in `i18n.jsx`). Components read the active language via `useT()` / `useLang()` from `LangContext`. When you add or change copy, update **both** language sources or one language will silently fall out of sync.

### Adding a Knowledge Hub entry

Append one object to **both** `ARCHIVE` (`content.jsx`) and `ARCHIVE_ML` (`i18n.jsx`), keyed by ISO date. Schema: `platform`, `topic`, `iso`, `date`, `title`, `outlet`, `duration`, `url`, plus `videoId` for YouTube items (drives inline playback in `ArchiveMedia`).
