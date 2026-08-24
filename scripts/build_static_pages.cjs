#!/usr/bin/env node
/**
 * Build the static, crawlable HTML pages for the site.
 *
 * Why this exists: the site is a hash-routed SPA, and URL fragments are
 * invisible to search engines and social-card scrapers. These pages give
 * the essays, the four sectors, and the methodology real URLs with their
 * own <title>, meta description, canonical, Open Graph card, and JSON-LD.
 *
 * Single source of truth: everything numeric comes from src/data.js
 * (window.DI); essay bodies come from data/stories/<slug>.md. If data.js
 * changes, `npm run build` regenerates every page in sync.
 *
 * Output (committed, same policy as dist/):
 *   stories/<slug>.html          — the three essays
 *   sectors/index.html           — sector index
 *   sectors/<id>.html            — per-sector page: chart, table, sources
 *   method.html                  — formula, weights, sources, audit note
 *
 * Run:  node scripts/build_static_pages.cjs   (chained into `npm run build`)
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const ORIGIN = 'https://deflationindex.com';
const OG_IMG = `${ORIGIN}/assets/logo/marks/di_og_card.png`;
const TODAY = new Date().toISOString().slice(0, 10);

// Load window.DI from src/data.js (classic script that assigns to window)
const window = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'src/data.js'), 'utf8'))(window);
const DI = window.DI;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// v4 anchor-ledger CSVs per sector (for Dataset JSON-LD distributions)
const SECTOR_CSVS = {
  computing: ['computing_power.csv', 'storage.csv', 'memory.csv'],
  communications: ['comms_transit.csv'],
  energy: ['energy_solar.csv'],
  transportation: ['transportation_battery.csv'],
};

// Query-facing titles per sector
const SECTOR_TITLES = {
  computing: 'Computing costs, 1990–2025: $/GFLOPS, disk and memory',
  communications: 'Internet transit prices, 1998–2025: $/Mbps per month',
  energy: 'Solar electricity costs, 2010–2025: LCOE per kWh',
  transportation: 'Lithium-ion battery pack prices, 2010–2025: $/kWh',
};

// ---------------------------------------------------------------------------
// Shared page chrome — paper palette + type, mirrored from src/abundance-v2.jsx
// ---------------------------------------------------------------------------
const CSS = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body { margin:0; padding:0; background:#FFFFFF; color:#1A1A1A; font-family:'Space Grotesk', system-ui, sans-serif; }
  a { color:#B88A2B; }
  .wrap { max-width:680px; margin:0 auto; padding:2.5rem 1.5rem 5rem; }
  .wrap-wide { max-width:820px; margin:0 auto; padding:2.5rem 1.5rem 5rem; }
  nav.site { border-bottom:1px solid #E8E8E5; }
  nav.site .inner { max-width:1200px; margin:0 auto; padding:.85rem 1.25rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; }
  nav.site a.brand { display:flex; align-items:center; gap:.55rem; text-decoration:none; color:#1A1A1A; font-family:'Spectral', Georgia, serif; font-weight:500; font-size:1.18rem; }
  nav.site img { height:32px; width:32px; border-radius:6px; display:block; }
  nav.site a.back { text-decoration:none; font-size:.85rem; color:#4A4A4A; }
  .kickrow { display:flex; justify-content:space-between; align-items:baseline; gap:1rem; margin:2rem 0 .8rem; }
  .kicker { font-family:'Space Mono', ui-monospace, monospace; font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#B88A2B; }
  .mins { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; }
  h1 { font-family:'Spectral', Georgia, serif; font-size:clamp(2rem,4.5vw,3rem); font-weight:400; letter-spacing:-.02em; margin:0 0 .8rem; line-height:1.15; }
  h2 { font-family:'Spectral', Georgia, serif; font-size:1.55rem; font-weight:500; letter-spacing:-.01em; margin:2.4rem 0 .8rem; }
  .dek { color:#4A4A4A; font-size:1.15rem; max-width:58ch; margin:0 0 2.4rem; line-height:1.55; }
  .di-prose { color:#4A4A4A; font-size:1.06rem; line-height:1.75; }
  .di-prose p { margin:0 0 1.15rem; }
  .di-prose strong { color:#1A1A1A; font-weight:600; }
  .di-prose h2 { font-family:'Spectral', Georgia, serif; color:#1A1A1A; font-size:1.55rem; font-weight:500; letter-spacing:-.01em; margin:2.4rem 0 .8rem; }
  .di-prose h3 { font-family:'Spectral', Georgia, serif; color:#1A1A1A; font-size:1.2rem; font-weight:500; margin:2rem 0 .6rem; }
  .di-prose ul, .di-prose ol { margin:0 0 1.2rem; padding-left:1.4rem; }
  .di-prose li { margin:.35rem 0; }
  .di-prose a { color:#B88A2B; text-decoration:underline; text-underline-offset:2px; }
  .di-prose hr { border:0; border-top:1px solid #E8E8E5; margin:2rem 0; }
  .di-prose blockquote { border-left:3px solid #B88A2B; margin:1.4rem 0; padding:.2rem 0 .2rem 1.2rem; color:#4A4A4A; font-style:italic; }
  .di-prose code { font-family:'Space Mono', ui-monospace, monospace; font-size:.9em; background:#F4F4F1; padding:.1rem .35rem; border-radius:4px; }
  .stats { display:flex; flex-wrap:wrap; gap:2rem; margin:1.6rem 0 2rem; }
  .stats .stat .n { font-family:'Spectral', Georgia, serif; font-size:2rem; font-weight:500; color:#2F5F7A; }
  .stats .stat .l { font-family:'Space Mono', ui-monospace, monospace; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:#9A9A98; margin-top:.2rem; }
  figure { margin:2rem 0; }
  figure svg { display:block; width:100%; height:auto; border:2px solid #E8E8E5; border-radius:14px; }
  figcaption { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; margin-top:.6rem; }
  table.di { border-collapse:collapse; width:100%; margin:1.4rem 0 2rem; font-size:.92rem; }
  table.di caption { text-align:left; font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#9A9A98; margin-bottom:.6rem; }
  table.di th { text-align:right; font-family:'Space Mono', ui-monospace, monospace; font-size:.7rem; letter-spacing:.08em; text-transform:uppercase; color:#4A4A4A; border-bottom:2px solid #E8E8E5; padding:.45rem .6rem; }
  table.di th:first-child, table.di td:first-child { text-align:left; }
  table.di td { text-align:right; font-family:'Space Mono', ui-monospace, monospace; font-size:.8rem; color:#4A4A4A; border-bottom:1px solid #F4F4F1; padding:.4rem .6rem; }
  .cardlist { list-style:none; margin:2rem 0; padding:0; display:grid; gap:1rem; }
  .cardlist a { display:block; border:2px solid #E8E8E5; border-radius:14px; padding:1.4rem 1.6rem; text-decoration:none; color:inherit; }
  .cardlist a:hover { border-color:#B88A2B; }
  .cardlist .name { font-family:'Spectral', Georgia, serif; font-size:1.5rem; font-weight:500; }
  .cardlist .drop { font-family:'Spectral', Georgia, serif; font-size:1.3rem; color:#2F5F7A; margin-top:.2rem; }
  .cardlist .meta { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; margin-top:.35rem; }
  footer.essays { border-top:1px solid #E8E8E5; margin-top:3.5rem; padding-top:1.6rem; }
  footer.essays .label { font-family:'Space Mono', ui-monospace, monospace; font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#9A9A98; margin-bottom:.8rem; }
  footer.essays ul { list-style:none; margin:0 0 1.4rem; padding:0; display:flex; flex-direction:column; gap:.5rem; }
  footer.essays a { text-underline-offset:2px; }
  footer.essays .meta { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; }
  a:focus-visible { outline:2px solid #B88A2B; outline-offset:2px; border-radius:4px; }
`;

function shell({ title, description, canonical, ogType = 'website', jsonld, body, wide = false }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG_IMG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG_IMG}">
<script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
</script>
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/di_logo_32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<nav class="site">
  <div class="inner">
    <a class="brand" href="/"><img src="/assets/logo/di_logo_no_border.svg" alt="">The Deflation Index</a>
    <a class="back" href="/">Interactive site →</a>
  </div>
</nav>
<main class="${wide ? 'wrap-wide' : 'wrap'}">
${body}
</main>
</body>
</html>
`;
}

function siteFooter(extra = []) {
  const essays = DI.stories.map(s => `      <li><a href="/stories/${s.slug}.html">${esc(s.title)}</a></li>`);
  const links = [
    ...extra,
    ...essays,
    '      <li><a href="/#/explore">Explore the data</a></li>',
    '      <li><a href="https://github.com/deflation-index/deflation-index">Data, methodology &amp; code (GitHub)</a></li>',
  ];
  return `  <footer class="essays">
    <div class="label">More from the Deflation Index</div>
    <ul>
${links.join('\n')}
    </ul>
    <div class="meta">CC BY 4.0 · Free. Open. Argue with it.</div>
  </footer>`;
}

// ---------------------------------------------------------------------------
// Static SVG chart: sector series vs CPI, 1990=100, log scale
// ---------------------------------------------------------------------------
function sectorChartSVG(s) {
  const W = 720, H = 340, m = { t: 20, r: 18, b: 40, l: 58 };
  const years = DI.years, cpi = DI.cpi;
  const start = s.dataStart || 1990;
  const startIdx = years.indexOf(start);
  const vals = s.data.slice(startIdx);
  const lo = Math.floor(Math.log10(Math.min(...vals)));
  const hi = Math.ceil(Math.log10(Math.max(...cpi)));
  const x = (yr) => m.l + (yr - 1990) / (2025 - 1990) * (W - m.l - m.r);
  const y = (v) => m.t + (hi - Math.log10(v)) / (hi - lo) * (H - m.t - m.b);
  const fmtTick = (n) => n >= 0 ? (10 ** n).toLocaleString('en-US') : (n >= -3 ? (10 ** n).toString() : `1e${n}`);

  const decades = [];
  const step = (hi - lo) > 6 ? 2 : 1;
  for (let n = hi; n >= lo; n -= step) decades.push(n);

  const grid = decades.map(n =>
    `<line x1="${m.l}" y1="${y(10 ** n).toFixed(1)}" x2="${W - m.r}" y2="${y(10 ** n).toFixed(1)}" stroke="#E8E8E5" stroke-width="1"/>` +
    `<text x="${m.l - 8}" y="${(y(10 ** n) + 3).toFixed(1)}" text-anchor="end" font-family="Space Mono, monospace" font-size="10" fill="#9A9A98">${fmtTick(n)}</text>`
  ).join('\n    ');

  const xTicks = [1990, 2000, 2010, 2020, 2025].map(yr =>
    `<text x="${x(yr).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-family="Space Mono, monospace" font-size="10" fill="#9A9A98">${yr}</text>`
  ).join('\n    ');

  const line = (arr, fromIdx, color, width) => {
    const pts = arr.map((v, i) => i < fromIdx ? null : `${x(years[i]).toFixed(1)},${y(v).toFixed(1)}`).filter(Boolean).join(' ');
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
  };

  const dropTxt = `${s.drop}%`;
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Log-scale line chart, ${start} to 2025, both series indexed to 100 in 1990: ${esc(s.name)} (${esc(s.metric)}) falls ${dropTxt} while CPI rises to 250.">
    <rect width="${W}" height="${H}" fill="#FFFFFF"/>
    ${grid}
    ${xTicks}
    ${line(cpi, 0, '#6A6A68', 2)}
    ${line(s.data, startIdx, '#2F5F7A', 2.5)}
    <g font-family="Space Grotesk, sans-serif" font-size="12">
      <rect x="${m.l + 10}" y="${m.t + 6}" width="12" height="3" fill="#2F5F7A"/><text x="${m.l + 28}" y="${m.t + 11}" fill="#1A1A1A">${esc(s.name)} (${esc(s.metric)})</text>
      <rect x="${m.l + 10}" y="${m.t + 26}" width="12" height="3" fill="#6A6A68"/><text x="${m.l + 28}" y="${m.t + 31}" fill="#1A1A1A">CPI-U</text>
    </g>
  </svg>`;
}

function fmtIdx(v) {
  if (v >= 100) return v.toFixed(1);
  if (v >= 1) return v.toFixed(2);
  return v.toPrecision(3);
}

function sectorTable(s) {
  const start = s.dataStart || 1990;
  const rows = DI.years.map((yr, i) => {
    const val = yr < start ? '—' : fmtIdx(s.data[i]);
    return `      <tr><td>${yr}</td><td>${val}</td><td>${DI.cpi[i].toFixed(1)}</td></tr>`;
  }).join('\n');
  return `    <table class="di">
      <caption>${esc(s.name)} index vs CPI, 1990 = 100 (series starts ${start})</caption>
      <thead><tr><th>Year</th><th>${esc(s.name)}</th><th>CPI-U</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>`;
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------
function buildStories() {
  const OUT = path.join(ROOT, 'stories');
  fs.mkdirSync(OUT, { recursive: true });
  for (const story of DI.stories) {
    const mdPath = path.join(ROOT, 'data/stories', story.slug + '.md');
    if (!fs.existsSync(mdPath)) { console.error(`SKIP ${story.slug}: missing ${mdPath}`); process.exitCode = 1; continue; }
    const bodyHtml = marked.parse(fs.readFileSync(mdPath, 'utf8'));
    const url = `${ORIGIN}/stories/${story.slug}.html`;
    const jsonld = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: story.title, description: story.dek, url, mainEntityOfPage: url,
      image: OG_IMG, datePublished: '2026-07-13', dateModified: TODAY,
      author: { '@type': 'Organization', name: 'Deflation Index LLC', url: ORIGIN },
      publisher: { '@type': 'Organization', name: 'Deflation Index LLC', url: ORIGIN },
      isPartOf: { '@type': 'WebSite', name: 'The Deflation Index', url: ORIGIN },
      license: 'https://creativecommons.org/licenses/by/4.0/', isAccessibleForFree: true,
    };
    const body = `  <article>
    <div class="kickrow"><span class="kicker">${esc(story.kicker)}</span><span class="mins">${story.readMins} min read</span></div>
    <h1>${esc(story.title)}</h1>
    <p class="dek">${esc(story.dek)}</p>
    <div class="di-prose">
${bodyHtml}
    </div>
  </article>
${siteFooter([`      <li><a href="/sectors/">The four sectors</a></li>`, `      <li><a href="/method.html">How the index is built</a></li>`])}`;
    fs.writeFileSync(path.join(OUT, story.slug + '.html'),
      shell({ title: `${story.title} — The Deflation Index`, description: story.dek, canonical: url, ogType: 'article', jsonld, body }));
    console.log(`built stories/${story.slug}.html`);
  }
}

function buildSector(s) {
  const start = s.dataStart || 1990;
  const url = `${ORIGIN}/sectors/${s.id}.html`;
  const title = SECTOR_TITLES[s.id] || `${s.name}, ${start}–2025`;
  const description = `${s.tangible.then} ${s.tangible.now}`.slice(0, 300);
  const csvs = (SECTOR_CSVS[s.id] || []).map(f => ({
    '@type': 'DataDownload', encodingFormat: 'text/csv',
    contentUrl: `https://raw.githubusercontent.com/deflation-index/deflation-index/main/data/v4/${f}`,
  }));
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Dataset',
    name: `${s.name} — The Deflation Index`,
    description: `${s.metricLong}. Indexed to 1990=100, measured ${start}–2025. ${s.narrative}`,
    url, license: 'https://creativecommons.org/licenses/by/4.0/',
    temporalCoverage: `${start}/2025`, isAccessibleForFree: true,
    creator: { '@type': 'Organization', name: 'Deflation Index LLC', url: ORIGIN },
    isPartOf: { '@type': 'Dataset', name: 'The Deflation Index', url: ORIGIN },
    distribution: csvs,
  };
  const body = `  <article>
    <div class="kickrow"><span class="kicker">Sector · ${(s.weight * 100).toFixed(1)}% of the index</span><span class="mins"><a href="/#/sectors/${s.id}" style="text-decoration:none;color:inherit">interactive version →</a></span></div>
    <h1>${esc(s.name)}.</h1>
    <p class="dek">${esc(s.metricLong)}.</p>
    <div class="stats">
      <div class="stat"><div class="n">${s.drop}%</div><div class="l">since ${start}</div></div>
      <div class="stat"><div class="n">${s.annualRate}%/yr</div><div class="l">annual rate</div></div>
      <div class="stat"><div class="n">$100</div><div class="l">buys: ${esc(s.buysPer100.now)}</div></div>
    </div>
    <div class="di-prose">
      <p><strong>Then:</strong> ${esc(s.tangible.then)}</p>
      <p><strong>Now:</strong> ${esc(s.tangible.now)}</p>
      <p>${esc(s.narrative)}</p>
    </div>
    <figure>
      ${sectorChartSVG(s)}
      <figcaption>${esc(s.name)} (${esc(s.metric)}) vs CPI-U · 1990 = 100 · log scale · v4.0</figcaption>
    </figure>
    <h2>The series, year by year</h2>
${sectorTable(s)}
    <h2>Sources</h2>
    <div class="di-prose">
      <p>${s.sources.map(esc).join(' · ')}. Every datapoint's provenance and verification status is public in the <a href="https://github.com/deflation-index/deflation-index/tree/main/data/v4">anchor ledger on GitHub</a>.</p>
    </div>
  </article>
${siteFooter([
    ...DI.sectors.filter(o => o.id !== s.id).map(o => `      <li><a href="/sectors/${o.id}.html">${esc(o.name)}: ${o.drop}% since ${o.dataStart || 1990}</a></li>`),
    `      <li><a href="/method.html">How the index is built</a></li>`,
  ])}`;
  fs.writeFileSync(path.join(ROOT, 'sectors', s.id + '.html'),
    shell({ title: `${title} — The Deflation Index`, description, canonical: url, jsonld, body, wide: true }));
  console.log(`built sectors/${s.id}.html`);
}

function buildSectorsIndex() {
  const url = `${ORIGIN}/sectors/`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'The four sectors — The Deflation Index', url,
    description: 'Computing, communications, energy, transportation: the four technology-cost series behind the Deflation Index, each a single sourced metric.',
    isPartOf: { '@type': 'WebSite', name: 'The Deflation Index', url: ORIGIN },
  };
  const cards = DI.sectors.map(s => `    <li><a href="/sectors/${s.id}.html">
      <div class="name">${esc(s.name)}</div>
      <div class="drop">${s.drop}% since ${s.dataStart || 1990}</div>
      <div class="meta">${esc(s.metric)} · ${(s.weight * 100).toFixed(1)}% of the index</div>
    </a></li>`).join('\n');
  const body = `  <article>
    <div class="kickrow"><span class="kicker">Sectors</span><span class="mins"><a href="/#/sectors" style="text-decoration:none;color:inherit">interactive version →</a></span></div>
    <h1>Four sectors. One curve each.</h1>
    <p class="dek">The Deflation Index averages four technology-cost series, each a single sourced metric starting when measurement starts. Each tells its own story.</p>
    <ul class="cardlist">
${cards}
    </ul>
  </article>
${siteFooter([`      <li><a href="/method.html">How the index is built</a></li>`])}`;
  fs.writeFileSync(path.join(ROOT, 'sectors', 'index.html'),
    shell({ title: 'The four sectors — The Deflation Index', description: 'Computing, communications, energy, transportation: the four technology-cost series behind the Deflation Index.', canonical: url, jsonld, body }));
  console.log('built sectors/index.html');
}

function buildMethod() {
  const url = `${ORIGIN}/method.html`;
  const H = DI.headline;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'WebPage',
    name: 'How the Deflation Index is built', url,
    description: 'A weighted geometric mean of four technology-cost series, 1990–2025, indexed to 1990=100 with CPI as reference. Formula, weights, sources, and the v4.0 audit.',
    isPartOf: { '@type': 'WebSite', name: 'The Deflation Index', url: ORIGIN },
  };
  const weightRows = DI.sectors.map(s =>
    `      <tr><td><a href="/sectors/${s.id}.html">${esc(s.name)}</a></td><td>${esc(s.metric)}</td><td>${(s.weight * 100).toFixed(2)}%</td><td>${s.dataStart || 1990}</td><td>${s.sources.map(esc).join(', ')}</td></tr>`
  ).join('\n');
  const body = `  <article>
    <div class="kickrow"><span class="kicker">Method · v4.0</span><span class="mins"><a href="/#/method" style="text-decoration:none;color:inherit">full method, interactive →</a></span></div>
    <h1>How it's built.</h1>
    <p class="dek">The Deflation Index measures cost per unit of capability: what a dollar buys in compute, bandwidth, kilowatt-hours, and stored energy. It is not a cost-of-living measure. The distance between the two is the subject. Mechanically: a weighted geometric mean of four technology-cost series, indexed to 1990 = 100, with CPI as the reference line.</p>
    <div class="di-prose">
      <h2>The formula</h2>
      <p>The index is a weighted <strong>geometric</strong> mean: DI<sub>t</sub> = ∏ S<sub>i,t</sub><sup>w<sub>i</sub></sup>, where each S<sub>i,t</sub> is a sector cost series indexed to 100 at its 1990 base and each w<sub>i</sub> is its weight. Geometric, not arithmetic, because the series span orders of magnitude — an arithmetic average quietly becomes a chart of its slowest component. Late-start sectors hold at 100 until their first measured year. The arithmetic variant is published alongside as a sensitivity.</p>
      <h2>The four series</h2>
    </div>
    <table class="di">
      <caption>Sectors, weights, and sources (v4.0)</caption>
      <thead><tr><th>Sector</th><th>Metric</th><th>Weight</th><th>Starts</th><th>Sources</th></tr></thead>
      <tbody>
${weightRows}
      </tbody>
    </table>
    <div class="di-prose">
      <p>The weights balance GDP contribution, enabling effect, and deflationary force — and that third factor makes the index partly weighted by the thing it measures. We disclose and size that circularity in <a href="https://github.com/deflation-index/deflation-index/blob/main/docs/methodology/WEIGHT_JUSTIFICATION.md#a-circularity-in-the-weighting">the weighting doc</a>: removing the factor entirely leaves the composite at −99.98% (published: −99.97%).</p>
      <h2>The line, and its reference</h2>
      <p>The index is drawn against <strong>CPI-U</strong> (BLS, CPIAUCSL), indexed to 1990 = 100, so a nominal-dollar series has its context. Through 2025: technology ${H.di_2025_cumulative_pct}%, CPI +${Math.round(H.cpi_2025_cumulative_pct)}%. <strong>M2</strong> (FRED, M2SL) is published in the data for anyone who wants the monetary comparison — <a href="/stories/the-abundance-gap.html">the argument that comparison suggests is an essay</a>, kept separate from the measurement.</p>
      <h2>The v4.0 correction</h2>
      <p>In 2026 we audited our own index and found the headline was too small: arithmetic averaging muted the fastest series, some early anchors were back-extrapolations rather than measurements, and some labels didn't match their series. v4.0 rebuilt the index on three rules — every series is the single metric its label claims, every datapoint traces to a published source, every series starts when defensible measurement starts. <a href="/stories/the-honest-index.html">The full account is here</a>; the audit memo is in <a href="https://github.com/deflation-index/deflation-index/tree/main/docs/methodology">the repository</a>, next to the data it criticizes.</p>
      <h2>What it isn't</h2>
      <p>Not a counter-CPI, not a cost-of-living measure, not investment advice. It measures the technology input layer — raw units of capability — and deliberately excludes housing, healthcare, education, and everything else you actually spend most of your money on. <a href="/stories/what-is-deflation-index.html">What it actually measures</a> covers the distinction.</p>
    </div>
  </article>
${siteFooter([`      <li><a href="/sectors/">The four sectors</a></li>`])}`;
  fs.writeFileSync(path.join(ROOT, 'method.html'),
    shell({ title: "How the Deflation Index is built: formula, weights, sources — The Deflation Index", description: 'A weighted geometric mean of four technology-cost series, 1990–2025, indexed to 1990=100 with CPI as reference. Formula, weights, sources, and the v4.0 audit.', canonical: url, jsonld, body, wide: true }));
  console.log('built method.html');
}

// ---------------------------------------------------------------------------
fs.mkdirSync(path.join(ROOT, 'sectors'), { recursive: true });
buildStories();
DI.sectors.forEach(buildSector);
buildSectorsIndex();
buildMethod();
console.log('static pages done.');
