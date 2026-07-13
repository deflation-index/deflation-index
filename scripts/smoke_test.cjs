#!/usr/bin/env node
/**
 * Render smoke test for the Deflation Index site.
 *
 * Executes the compiled dist/ bundles in a jsdom window using the same
 * scoping semantics the browser applies (each dist file runs in its own
 * strict scope, matching the type="module" script tags in index.html;
 * src/data.js runs as a classic script), then asserts the app mounts and
 * key content renders.
 *
 * This exists because of a production outage: two dist files declared the
 * same top-level const, which is fine in isolated scopes but a SyntaxError
 * when plain script tags share the global lexical scope. Any test that
 * eval()s files individually cannot catch that class of bug — scoping
 * semantics are the point.
 *
 * Run:  npm test   (requires devDependencies: npm install)
 */
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'https://deflationindex.com/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const w = dom.window;

// Browser APIs jsdom lacks
w.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
w.ResizeObserver = class { observe() {} disconnect() {} unobserve() {} };
w.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} };
w.fetch = () => Promise.resolve({ ok: true, text: () => Promise.resolve('# stub') });
w.scrollTo = () => {};
w.__TWEAKS__ = { palette: 'paper', device: 'desktop' };
w.marked = { parse: (s) => s };

// React UMD builds (same version as the CDN tags in index.html).
// Resolved via package.json because react's "exports" map hides the umd/ subpath.
const pkgDir = (name) => path.dirname(require.resolve(`${name}/package.json`));
w.eval(fs.readFileSync(path.join(pkgDir('react'), 'umd/react.production.min.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(pkgDir('react-dom'), 'umd/react-dom.production.min.js'), 'utf8'));

// Classic script — global scope, must run before the modules
w.eval(read('src/data.js'));

// dist bundles — strict, isolated scope per file (module semantics)
for (const f of ['DIChart', 'abundance-v2', 'abundance-v2-pages', 'app']) {
  const file = `dist/${f}.js`;
  if (!fs.existsSync(path.join(ROOT, file))) {
    console.error(`FAIL ${file} missing — run \`npm run build\` first`);
    process.exit(1);
  }
  w.eval(`(function(){"use strict";\n${read(file)}\n})()`);
}

const results = [];
const check = (name, ok) => { results.push([name, ok]); };

setTimeout(() => {
  const html = w.document.getElementById('app').innerHTML;
  const H = w.DI.headline;

  check('app mounted (static fallback replaced)', !html.includes('Static fallback') && html.includes('radically cheaper'));
  check('hero + four numbers derive from headline',
    html.includes(Math.abs(H.di_2025_cumulative_pct).toFixed(1) + '%') &&
    html.includes(Math.round(H.m2_2025_cumulative_pct) + '%') &&
    html.includes(Math.round(H.cpi_2025_cumulative_pct) + '%'));
  check('gap arithmetic internally consistent',
    Math.abs((Math.abs(H.di_2025_cumulative_pct) + H.m2_2025_cumulative_pct - H.cpi_2025_cumulative_pct) - H.abundance_gap_2025_pp) < 1);
  check('newsletter form present', html.includes('Delivered via Substack'));
  check('footer substack + changelog links', html.includes('deflationindex.substack.com') && html.includes('CHANGELOG.md'));
  check('no emoji icons', !/\u{1F4F6}|\u{1F4BB}|☀|\u{1F50B}/u.test(html));

  w.location.hash = '#/method';
  setTimeout(() => {
    const h2 = w.document.getElementById('app').innerHTML;
    check('method route renders formula', h2.includes('DI(t)'));

    w.location.hash = '#/explore';
    setTimeout(() => {
      const h3 = w.document.getElementById('app').innerHTML;
      check('explore sliders labelled', h3.includes('Comparison year A') && h3.includes('Dollar amount'));

      let failed = 0;
      for (const [name, ok] of results) {
        console.log(ok ? 'PASS' : 'FAIL', name);
        if (!ok) failed++;
      }
      console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
      process.exit(failed ? 1 : 0);
    }, 250);
  }, 250);
}, 500);
