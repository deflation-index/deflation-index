#!/usr/bin/env node
/**
 * Build static HTML pages for the Stories essays.
 *
 * Why this exists: the site is a hash-routed SPA, and URL fragments are
 * invisible to search engines and social-card scrapers. These pages give
 * each essay a real URL (/stories/<slug>.html) with its own <title>,
 * meta description, canonical, Open Graph card, and Article JSON-LD —
 * the essays are the site's organic-search surface.
 *
 * Single source of truth: story metadata comes from src/data.js
 * (window.DI.stories) and body copy from data/stories/<slug>.md.
 *
 * Run:  node scripts/build_story_pages.cjs   (also chained into `npm run build`)
 * Output is committed, same policy as dist/.
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'stories');
const ORIGIN = 'https://deflationindex.com';

// Load window.DI from src/data.js (classic script that assigns to window)
const window = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'src/data.js'), 'utf8'))(window);
const DI = window.DI;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Paper palette + type, mirrored from src/abundance-v2.jsx (makeTheme/palettes.paper)
const CSS = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body { margin:0; padding:0; background:#FFFFFF; color:#1A1A1A; font-family:'Space Grotesk', system-ui, sans-serif; }
  a { color:#B88A2B; }
  .wrap { max-width:680px; margin:0 auto; padding:2.5rem 1.5rem 5rem; }
  nav.site { border-bottom:1px solid #E8E8E5; }
  nav.site .inner { max-width:1200px; margin:0 auto; padding:.85rem 1.25rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; }
  nav.site a.brand { display:flex; align-items:center; gap:.55rem; text-decoration:none; color:#1A1A1A; font-family:'Spectral', Georgia, serif; font-weight:500; font-size:1.18rem; }
  nav.site img { height:32px; width:32px; border-radius:6px; display:block; }
  nav.site a.back { text-decoration:none; font-size:.85rem; color:#4A4A4A; }
  .kickrow { display:flex; justify-content:space-between; align-items:baseline; gap:1rem; margin:2rem 0 .8rem; }
  .kicker { font-family:'Space Mono', ui-monospace, monospace; font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#B88A2B; }
  .mins { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; }
  h1 { font-family:'Spectral', Georgia, serif; font-size:clamp(2rem,4.5vw,3rem); font-weight:400; letter-spacing:-.02em; margin:0 0 .8rem; line-height:1.15; }
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
  footer.essays { border-top:1px solid #E8E8E5; margin-top:3.5rem; padding-top:1.6rem; }
  footer.essays .label { font-family:'Space Mono', ui-monospace, monospace; font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#9A9A98; margin-bottom:.8rem; }
  footer.essays ul { list-style:none; margin:0 0 1.4rem; padding:0; display:flex; flex-direction:column; gap:.5rem; }
  footer.essays a { text-underline-offset:2px; }
  footer.essays .meta { font-family:'Space Mono', ui-monospace, monospace; font-size:.72rem; color:#9A9A98; }
  a:focus-visible { outline:2px solid #B88A2B; outline-offset:2px; border-radius:4px; }
`;

function page(story, bodyHtml, others) {
  const url = `${ORIGIN}/stories/${story.slug}.html`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.dek,
    url,
    mainEntityOfPage: url,
    image: `${ORIGIN}/assets/logo/marks/di_og_card.png`,
    datePublished: '2026-07-13',
    dateModified: new Date().toISOString().slice(0, 10),
    author: { '@type': 'Organization', name: 'Deflation Index LLC', url: ORIGIN },
    publisher: { '@type': 'Organization', name: 'Deflation Index LLC', url: ORIGIN },
    isPartOf: { '@type': 'WebSite', name: 'The Deflation Index', url: ORIGIN },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(story.title)} — The Deflation Index</title>
<meta name="description" content="${esc(story.dek)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(story.title)}">
<meta property="og:description" content="${esc(story.dek)}">
<meta property="og:image" content="${ORIGIN}/assets/logo/marks/di_og_card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(story.title)}">
<meta name="twitter:description" content="${esc(story.dek)}">
<meta name="twitter:image" content="${ORIGIN}/assets/logo/marks/di_og_card.png">
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
    <a class="back" href="/#/stories">All stories →</a>
  </div>
</nav>
<main class="wrap">
  <article>
    <div class="kickrow"><span class="kicker">${esc(story.kicker)}</span><span class="mins">${story.readMins} min read</span></div>
    <h1>${esc(story.title)}</h1>
    <p class="dek">${esc(story.dek)}</p>
    <div class="di-prose">
${bodyHtml}
    </div>
  </article>
  <footer class="essays">
    <div class="label">More from the Deflation Index</div>
    <ul>
${others.map(o => `      <li><a href="/stories/${o.slug}.html">${esc(o.title)}</a></li>`).join('\n')}
      <li><a href="/#/explore">Explore the data</a></li>
      <li><a href="https://github.com/deflation-index/deflation-index">Data, methodology &amp; code (GitHub)</a></li>
    </ul>
    <div class="meta">CC BY 4.0 · Free. Open. Argue with it.</div>
  </footer>
</main>
</body>
</html>
`;
}

fs.mkdirSync(OUT, { recursive: true });
let built = 0;
for (const story of DI.stories) {
  const mdPath = path.join(ROOT, 'data/stories', story.slug + '.md');
  if (!fs.existsSync(mdPath)) {
    console.error(`SKIP ${story.slug}: no markdown at ${mdPath}`);
    process.exitCode = 1;
    continue;
  }
  const bodyHtml = marked.parse(fs.readFileSync(mdPath, 'utf8'));
  const others = DI.stories.filter(s => s.slug !== story.slug);
  fs.writeFileSync(path.join(OUT, story.slug + '.html'), page(story, bodyHtml, others));
  built++;
  console.log(`built stories/${story.slug}.html`);
}
console.log(`${built}/${DI.stories.length} story pages built.`);
