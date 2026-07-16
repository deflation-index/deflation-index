# Deflation Index Logo & Brand Assets

**Version:** 3.3
**Last Updated:** July 16, 2026
**Copyright:** © 2026 Deflation Index LLC. All rights reserved.

---

## Brand Overview

The Deflation Index mark is a serif monogram: a black roman **D** paired with a gold italic **I**, set on a cream paper field. The pairing mirrors the index's editorial voice — a disciplined, analytic **D** (deflation, data, discipline) next to a lighter, italicized **I** (index, inflection, insight).

The mark draws from the site's actual type system: **Spectral** (display serif) and **Space Grotesk** (body sans). *(This corrects the previous revision of this doc, which cited Fraunces/Inter — that pairing was retired when the site moved to the Paper visual identity and this doc was never updated to match.)*

The mark replaces an earlier cyan-on-dark "DI" wordset. All current site pages, social previews, and favicons reference the new mark.

---

## What changed in v3.1

Same D and I letterforms as v3.0 — nothing was redrawn. Two things changed:

1. **Tighter crop.** The old canvas held the letters at roughly 66% width / 42% height fill. All variants are recropped to the actual glyph bounding box, so the mark reads bolder at small sizes without touching the letterforms.
2. **`di_logo_no_border.svg` is now transparent, not paper-background.** The baked-in paper background (`#FAFAF6`) was showing as a faint edge against the site's white nav (`#FFFFFF`) — close enough to look like a rendering artifact, not a deliberate box. Removing it fixes the nav specifically.

   **This is a real change from v3.0's documented behavior, not a bug fix to something broken.** The old contrast figures below (Ink/Gold on Paper) no longer automatically apply to `no_border.svg`, since it now sits directly on whatever background hosts it. It's verified against white (`#FFFFFF`) and paper (`#FAFAF6`) — both pass.

   It is **not** safe on dark sections (the stat band, footer) — the ink `#1B1B1B` D is nearly invisible against `#1A1A1A`. For those contexts use `marks/di_logo_reversed.svg` instead (added in v3.2): same gold I, D recolored to Paper `#FAFAF6`. Verified: Paper-on-`#1A1A1A` = 16.6:1, Gold-on-`#1A1A1A` = 5.6:1 — both clear WCAG AA with room to spare. `no_border.svg` and `di_logo_reversed.svg` are not interchangeable — pick based on whether the section is light or dark, don't apply either one universally.

   Every other variant (`primary.svg`, `social_profile.png`, `og.png`) keeps the paper background exactly as before — the contrast figures below still hold for those.

---

## Color Specifications

| Token | Hex | Role in logo |
|-------|-----|--------------|
| Paper | `#FAFAF6` | Background field (primary, social, OG variants — not `no_border`, which is transparent as of v3.1) |
| Ink | `#1B1B1B` | Serif "D" glyph |
| Gold | `#B88A2B` | Italic "I" glyph |
| Divider | `#E3E1D8` | 2px border on the primary variant |

Contrast: Ink on Paper = 14.2:1 (WCAG AAA). Gold on Paper = 4.9:1 (WCAG AA for normal text, passes for display-size logo use). These hold for every paper-background variant. `no_border.svg` is transparent — verify contrast against whatever background it's placed on; see note above. The monochrome variant uses Ink on transparent for print and one-color contexts.

---

## Files

### In-product (`assets/logo/`)

| File | Dimensions | Use |
|------|------------|-----|
| `di_logo_no_border.svg` | 300×300 (scalable) | **Primary in-product mark** — site nav, footer, inline placements. Transparent as of v3.1 (see above) — no longer a paper-background variant. |
| `di_logo_32.png` | 32×32 | Small favicon. Opaque, paper background. |
| `di_logo_64.png` | 64×64 | Large favicon, Apple touch icon. Opaque, paper background — kept opaque deliberately, since transparent PNGs render unpredictably as Apple touch icons. |

### Marks archive (`assets/logo/marks/`) — for OG cards, social avatars, print, one-color contexts

| File | Dimensions | Use |
|------|------------|-----|
| `di_logo_primary.svg` | 400×400 (scalable) | Bordered variant — formal contexts, framed presentations. Also the base every raster export below is generated from. |
| `di_logo_black.svg` | 300×300 (scalable) | Monochrome (ink-only, transparent) — print, dark backgrounds, one-color contexts |
| `di_logo_512.png` | 512×512 | Raster of the bordered mark (`primary.svg`) |
| `di_logo_social_profile.png` | 512×512 | Social avatars — paper background baked in (opaque, for platform compatibility), but **no border**, unlike `primary.svg`/`og.png`. This is deliberate: avatars get circle-cropped by the platform, and a square border becomes four disconnected arcs after that crop — actively worse than no border, not a neutral tradeoff. Padding is still generous enough to clear a circular crop cleanly (verified). |
| `di_logo_og.png` | 1200×1200 | Open Graph / link previews (referenced from `index.html` meta tags). Raster of the bordered mark. |
| `di_logo_black_512.png` | 512×512 | Raster of the monochrome mark |
| `di_logo_reversed.svg` | 300×300 (scalable) | Dark-background variant — Paper `#FAFAF6` D, unchanged Gold I, transparent. For the dark stat band, footer, or any `#1A1A1A`-class section. See contrast note above. |
| `di_logo_reversed_512.png` | 512×512 | Raster of the reversed mark |

### Favicons (repository root)

| File | Size | Use |
|------|------|-----|
| `favicon.ico` | 16×16, 32×32, 48×48, 64×64 (single file) | Browser tab icon |

### Implementation

```html
<!-- Site nav / footer / in-product (transparent as of v3.1 — sits on whatever background hosts it) -->
<img src="/assets/logo/di_logo_no_border.svg"
     alt="The Deflation Index" height="40">

<!-- Hero / marketing surface (bordered, formal) -->
<img src="/assets/logo/marks/di_logo_primary.svg"
     alt="The Deflation Index" height="120">

<!-- Dark sections only: stat band, footer -->
<img src="/assets/logo/marks/di_logo_reversed.svg"
     alt="The Deflation Index" height="40">

<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/di_logo_32.png">
<link rel="icon" type="image/png" sizes="64x64" href="/assets/logo/di_logo_64.png">
<link rel="apple-touch-icon" href="/assets/logo/di_logo_64.png">
```

Minimum display height: 24px digital, 0.35" print.

---

## Usage Guidelines

### Permitted

You may use the Deflation Index mark to reference, cite, or link to the project — in academic papers, journalism, blog posts, presentations, GitHub projects, newsletters, and social posts that discuss DI data or findings. Attribute as "The Deflation Index" or "Deflation Index LLC" and link to deflationindex.com when practical.

### Not permitted without permission

Selling merchandise or products bearing the mark, creating derivative or modified logos, implying endorsement or partnership, or incorporating the mark into competing financial products.

### Don't

Don't recolor the mark, change the D–I proportions, add effects (shadows, glows, outlines), stretch or skew it, place it on busy photographic backgrounds, or combine it with other logos into a new lockup.

Brand usage is reserved separately from the site's code (MIT) and data/methodology/docs (CC BY 4.0) licenses — see `LICENSE` at the repo root.

---

## Contact

Licensing / permissions: info@deflationindex.com
Source: https://github.com/deflation-index/deflation-index
Site: https://deflationindex.com

---

*Maintainer: Deflation Index LLC. Guide last revised July 16, 2026.*
