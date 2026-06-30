/* === POD build ===
   Light precompile: turns the source .jsx (global-scope, no modules) into
   minified production bundles so the browser never loads @babel/standalone
   or the React development builds.

   Each page's source files are Babel-compiled (preset-react + block-scoping,
   so cross-file top-level `const`s become redeclarable `var`s exactly like
   the old in-browser Babel did), concatenated in the same order the <script>
   tags used, then minified with esbuild. Static assets + a rewritten HTML
   (production React + the one bundle) are emitted to dist/.

   Usage:  node build.mjs            one-shot build
           node build.mjs --watch    rebuild on source change
*/

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import babel from "@babel/core";
import * as esbuild from "esbuild";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, "dist");

/* page bundle → ordered source files (must match the old <script> order) */
const BUNDLES = {
  "app.min.js":  ["tweaks-panel.jsx", "i18n.jsx", "content.jsx", "sections.jsx", "sections2.jsx", "app.jsx"],
  "join.min.js": ["i18n.jsx", "content.jsx", "join.jsx"],
};

/* every source file the build reads — used by --watch */
const SOURCES = [...new Set(Object.values(BUNDLES).flat())]
  .concat(["index.html", "join.html", "styles.css"]);

const STATIC_COPIES = ["styles.css", "uploads", "favicon.svg"];

/* the <script> block each HTML uses, swapped for production React + bundle */
const HTML_SCRIPTS = {
  "index.html": `<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="app.min.js"></script>`,
  "join.html": `<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="join.min.js"></script>`,
};

function compileFile(file) {
  const src = readFileSync(path.join(ROOT, file), "utf8");
  const { code } = babel.transformSync(src, {
    filename: file,
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [["@babel/preset-react", { runtime: "classic" }]],
    plugins: ["@babel/plugin-transform-block-scoping"],
  });
  return code;
}

async function buildBundle(outName, files) {
  const joined = files.map((f) => `/* ${f} */\n${compileFile(f)}`).join("\n;\n");
  const { code } = await esbuild.transform(joined, {
    minify: true,
    target: "es2018",
    legalComments: "none",
  });
  writeFileSync(path.join(DIST, outName), code);
}

function rewriteHtml(file) {
  const html = readFileSync(path.join(ROOT, file), "utf8");
  /* swap the source's dev <script> block (the only scripts on the page) for
     the production React + bundle tags. Any static fallback markup inside
     #root is left untouched — it's the no-JS / crawler / first-paint view. */
  const out = html.replace(
    /<script[\s\S]*<\/body>/,
    `${HTML_SCRIPTS[file]}\n</body>`
  );
  if (out === html) throw new Error(`HTML rewrite matched nothing in ${file}`);
  writeFileSync(path.join(DIST, file), out);
}

function copyVendor() {
  mkdirSync(path.join(DIST, "vendor"), { recursive: true });
  const vendor = [
    ["react", "umd/react.production.min.js"],
    ["react-dom", "umd/react-dom.production.min.js"],
  ];
  for (const [pkg, rel] of vendor) {
    const from = path.join(ROOT, "node_modules", pkg, rel);
    cpSync(from, path.join(DIST, "vendor", path.basename(rel)));
  }
}

async function build() {
  const t0 = Date.now();
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  for (const [outName, files] of Object.entries(BUNDLES)) {
    await buildBundle(outName, files);
  }
  for (const asset of STATIC_COPIES) {
    cpSync(path.join(ROOT, asset), path.join(DIST, asset), { recursive: true });
  }
  copyVendor();
  for (const file of Object.keys(HTML_SCRIPTS)) {
    rewriteHtml(file);
  }
  console.log(`built dist/ in ${Date.now() - t0}ms`);
}

await build();

if (process.argv.includes("--watch")) {
  console.log("watching for changes…");
  let timer = null;
  for (const file of SOURCES) {
    watch(path.join(ROOT, file), () => {
      clearTimeout(timer);
      timer = setTimeout(() => build().catch((e) => console.error(e.message)), 80);
    });
  }
}
