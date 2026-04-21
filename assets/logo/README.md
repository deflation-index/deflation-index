# Deflation Index Logo & Brand Assets

**Version:** 3.0
**Last Updated:** April 19, 2026
**Copyright:** © 2026 Deflation Index LLC. All rights reserved.

---

## Brand Overview

The Deflation Index mark is a serif monogram: a black roman **D** paired with a gold italic **I**, set on a cream paper field. The pairing mirrors the index's editorial voice — a disciplined, analytic **D** (deflation, data, discipline) next to a lighter, italicized **I** (index, inflection, insight) — and draws directly from the site's type system (Fraunces display serif, Inter body sans).

The mark replaces an earlier cyan-on-dark "DI" wordset. All current site pages, social previews, and favicons reference the new mark.

---

## Color Specifications

The logo uses the same four-color palette as the rest of the design system:

| Token | Hex | Role in logo |
|-------|-----|--------------|
| Paper | `#FAFAF6` | Background field (bordered variant only) |
| Ink | `#1B1B1B` | Serif "D" glyph |
| Gold | `#B88A2B` | Italic "I" glyph |
| Divider | `#E3E1D8` | 2px border on the primary variant |

Contrast: Ink on Paper = 14.2:1 (WCAG AAA). Gold on Paper = 4.9:1 (WCAG AA for normal text, passes for display-size logo use). The monochrome variant uses Ink on transparent for print and one-color contexts.

---

## Files

### Icon (`assets/logo/icon/`)

| File | Dimensions | Use |
|------|------------|-----|
| `di_logo_primary.svg` | 400×400 (scalable) | **Primary** — hero, OG cards, anywhere a framed mark reads well |
| `di_logo_no_border.svg` | 400×400 (scalable) | Header / nav / inline placements where a border would compete |
| `di_logo_black.svg` | 400×400 (scalable) | Monochrome (ink-only, transparent) — print, dark backgrounds, one-color contexts |
| `di_logo_512.png` | 512×512 | Raster of the no-border mark |
| `di_logo_social_profile.png` | 512×512 | Social avatars — bordered variant, paper background baked in |
| `di_logo_og.png` | 1200×1200 | Open Graph / link previews |
| `di_logo_black_512.png` | 512×512 | Raster of the monochrome mark |

### Favicons (repository root)

| File | Size | Use |
|------|------|-----|
| `favicon.ico` | Multi-size | Browser tab icon |
| `di_logo_32.png` | 32×32 | Small favicon |
| `di_logo_64.png` | 64×64 | Large favicon, Apple touch icon |

### Implementation

```html
<!-- Nav header (no border reads cleaner at small sizes) -->
<img src="/assets/logo/icon/di_logo_no_border.svg"
     alt="The Deflation Index" height="40">

<!-- Hero / marketing surface (bordered) -->
<img src="/assets/logo/icon/di_logo_primary.svg"
     alt="The Deflation Index" height="120">

<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/di_logo_32.png">
<link rel="icon" type="image/png" sizes="64x64" href="/di_logo_64.png">
<link rel="apple-touch-icon" href="/di_logo_64.png">
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

*Maintainer: Deflation Index LLC. Guide last revised April 19, 2026.*
