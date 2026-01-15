# Deflation Index Logo & Brand Assets

**Version:** 2.0  
**Last Updated:** January 15, 2026  
**Copyright:** © 2026 Deflation Index LLC. All rights reserved.

---

## Brand Overview

The Deflation Index uses a **multi-asset brand system** following industry best practices (similar to Bloomberg, Goldman Sachs, The New York Times). We maintain different logo formats for different contexts:

- **Icon Logo** (Cyan "DI") - Compact symbol for small spaces
- **Text Logo** (Gold wordmark) - Professional wordmark for headers and documents  
- **Horizontal Lockup** (Icon + Text) - Combined format for presentations and co-branding

This approach ensures our brand remains recognizable and professional across all contexts while maintaining flexibility for different use cases.

---

## Quick Reference: Which Logo Should I Use?

```
Need a logo? Use this decision tree:

Space Constraints:
├─ Square space < 100px? → ICON LOGO (cyan "DI")
├─ Horizontal space 200px+? → TEXT LOGO (gold)
└─ Need both symbol + name? → HORIZONTAL LOCKUP

Specific Use Cases:
├─ Website navigation header → TEXT LOGO (gold, standard)
├─ Social media avatar (Twitter/X, LinkedIn) → ICON LOGO (with dark background)
├─ Browser favicon → ICON LOGO (cyan on dark)
├─ Document letterhead → TEXT LOGO (gold, standard or compact)
├─ Email signature → TEXT LOGO (gold, compact)
├─ Presentation title slide → HORIZONTAL LOCKUP
├─ Social media banner/cover → HORIZONTAL LOCKUP or TEXT LOGO (wide)
├─ Open Graph/link preview → ICON LOGO (1200×630 format)
├─ Print materials (color) → TEXT LOGO (gold) or ICON LOGO (cyan)
└─ Print materials (B&W) → ICON LOGO (black variant)
```

---

## Color Specifications

### Primary Brand Colors

**Gold (Primary Brand Color)**
- **Hex:** `#FFD700`
- **RGB:** `255, 215, 0`
- **Use:** Text logo, CTAs, headers, highlights, authority
- **Represents:** Value, abundance, established authority

**Cyan (Data/Technology Color)**
- **Hex:** `#00CED1` or `#00FFFF` (icon uses #00FFFF)
- **RGB:** `0, 206, 209` or `0, 255, 255`
- **Use:** Icon logo, data visualization, technology emphasis
- **Represents:** Deflation, technology, precision, cooling

**Deep Black (Background)**
- **Hex:** `#0A0A0A` or `#000000`
- **RGB:** `10, 10, 10` or `0, 0, 0`
- **Use:** Primary dark backgrounds for logos

### Contrast & Accessibility

- Gold (#FFD700) on black (#000000): **12.6:1** (WCAG AAA compliant)
- Cyan (#00FFFF) on black (#000000): **6.7:1** (WCAG AA compliant)
- Both colors meet accessibility standards on dark backgrounds

---

## Icon Logo (Cyan "DI")

### Design Concept

**Name:** "The Unveiling" (Variation B)  
**Construction:** Layered letterforms with 5px shadow offset at 25% opacity  
**Symbolism:** Shadow layer represents hidden abundance; bright foreground represents revealed truth

### Files Available

**Location:** `assets/logo/icon/` (recommended structure)

| File | Dimensions | Use Case |
|------|------------|----------|
| `di_logo_primary.svg` | Scalable | **PRIMARY - Use for all digital/web contexts** |
| `di_logo_512.png` | 512×512px | Legacy transparent version (use on dark backgrounds only) |
| `di_logo_social_profile.png` | 512×512px | **Social media avatars** (dark background baked in) |
| `di_logo_og.png` | 1200×630px | Open Graph images, social sharing cards |
| `di_logo_black.svg` | Scalable | Monochrome version for light backgrounds/print |
| `di_logo_black_512.png` | 512×512px | PNG version of black logo |

### When to Use Icon Logo

✅ **Favicons** (browser tab icons)  
✅ **Social media profile pictures** (Twitter/X, LinkedIn, Substack)  
✅ **App icons** (mobile/desktop applications)  
✅ **Small square contexts** (under 100×100px)  
✅ **Symbol-only branding** (when text won't fit)  
✅ **GitHub repository avatars**

### Important: Social Media Profiles

**Use `di_logo_social_profile.png`** for social media avatars because:
- ✅ Dark background (#0A0A0A) is baked into the image
- ✅ Maintains brand identity on white/light platform backgrounds
- ✅ Perfect contrast (21:1) ensures visibility

**Don't use** transparent `di_logo_512.png` for profiles on light backgrounds - the cyan will be nearly invisible (1.5:1 contrast ratio).

### Technical Specifications (Icon)

**Font:** Arial Bold (700 weight)  
**Minimum Sizes:**
- Digital: 32px height minimum
- Print: 0.5 inches height minimum
- Below these sizes, shadow effect becomes illegible

**Recommended Implementation (SVG):**
```html
<img src="assets/logo/icon/di_logo_primary.svg" 
     alt="The Deflation Index" 
     height="40">
```

---

## Text Logo (Gold "THE DEFLATION INDEX")

### Design Concept

Professional wordmark in gold establishing authority and credibility. Uses bold, confident typography with strategic letter spacing for readability and impact.

### Files Available

**Location:** `assets/logo/text/` (recommended structure)

| File | Dimensions | Font Size | Use Case |
|------|------------|-----------|----------|
| `di_logo_text_gold.svg` | 800×120px | 48px | **Standard** - Website headers, documents, general branding |
| `di_logo_text_gold_wide.svg` | 1200×100px | 56px | **Wide** - Banner headers, social covers, wide displays |
| `di_logo_text_gold_compact.svg` | 600×80px | 36px | **Compact** - Email signatures, tight spaces, mobile |

### When to Use Text Logo

✅ **Website navigation headers**  
✅ **Document letterheads** (PDF reports, presentations)  
✅ **Email signatures**  
✅ **Official correspondence**  
✅ **Professional presentations**  
✅ **Marketing materials** (when you have horizontal space)  
✅ **Social media banners/covers** (use wide variant)

### Variant Selection Guide

**Standard (`di_logo_text_gold.svg`):**
- Use for: Most contexts, website headers, documents
- Space needed: 800px+ width recommended
- Best for: Desktop displays, full-size documents

**Wide (`di_logo_text_gold_wide.svg`):**
- Use for: Social media covers (Twitter/X header, LinkedIn banner)
- Space needed: 1200px+ width
- Best for: Full-width banners, hero sections

**Compact (`di_logo_text_gold_compact.svg`):**
- Use for: Email signatures, mobile headers, tight layouts
- Space needed: 600px+ width minimum
- Best for: Constrained contexts, responsive mobile

### Technical Specifications (Text)

**Font Family:** Archivo Black  
**Font Weight:** 900 (Black)  
**Letter Spacing:** -2px (standard), -1.5px (compact)  
**Color:** #FFD700 (gold)  
**Source:** Google Fonts - https://fonts.google.com/specimen/Archivo+Black

**Recommended Implementation:**
```html
<img src="assets/logo/text/di_logo_text_gold.svg" 
     alt="The Deflation Index" 
     height="48">
```

---

## Horizontal Lockup (Icon + Text Combined)

### Design Concept

Combined format featuring the cyan "DI" icon on the left and gold text on the right. Provides both symbol recognition and full name clarity.

### File Available

**Location:** `assets/logo/lockup/` (recommended structure)

| File | Dimensions | Use Case |
|------|------------|----------|
| `di_lockup_horizontal.svg` | 1000×140px | Presentations, email headers, co-branding |

### When to Use Horizontal Lockup

✅ **Presentation title slides**  
✅ **Social media cover photos** (alternative to text-only)  
✅ **Email marketing headers**  
✅ **Co-branding contexts** (partnering with other organizations)  
✅ **When you want both icon recognition AND full name**  
✅ **Conference materials** (posters, banners)

### Technical Specifications (Lockup)

**Components:** Cyan DI icon (left) + Gold text (right)  
**Minimum Width:** 400px (maintain legibility)

---

## Favicon Files

**Location:** Repository root (not in assets/logo/)

| File | Size | Use Case |
|------|------|----------|
| `favicon.ico` | Multi-size | Browser tab icon (legacy format) |
| `di_logo_32.png` | 32×32px | Small favicon |
| `di_logo_64.png` | 64×64px | Large favicon, Apple touch icon |

All favicon files use the **icon logo** with dark background (#0A0A0A) and cyan "DI" for readability across all browser themes.

---

## File Format Guide

### Format Comparison

**SVG (Scalable Vector Graphics)** - Recommended for most uses
- ✅ Scales infinitely without quality loss
- ✅ Small file size (typically <1KB)
- ✅ Editable and flexible
- ✅ Supported by all modern browsers
- Use for: Web, digital documents, anywhere vectors work

**PNG (Portable Network Graphics)**
- ✅ Universal compatibility
- ✅ Supports transparency
- ⚠️ Fixed resolution (doesn't scale well)
- Use for: Older systems, specific size requirements, social media

### Generating PNG from SVG

If you need PNG versions not provided:
1. Open SVG in browser or design tool (Figma, Illustrator, Inkscape)
2. Export/Save As PNG at desired resolution
3. Recommended sizes: 300px, 600px, 1200px, 2400px width
4. **Always maintain aspect ratio** - don't distort

---

## Usage Guidelines

### ✅ PERMITTED USES

You may use Deflation Index logos for:

**Attribution & Reference**
- Citing The Deflation Index in academic papers, research, reports
- Linking to deflationindex.com or GitHub repository
- Attribution in data visualizations using DI data
- Bibliography and reference sections

**Academic & Educational**
- Research papers, dissertations, theses
- Conference presentations and academic posters
- Classroom materials and educational content
- Teaching economics, monetary policy, technology trends
- Student projects analyzing DI data

**Journalism & Media**
- News articles and blog posts about The Deflation Index
- Podcast cover art when discussing the project
- Video content referencing the project
- Book chapters citing DI data
- Documentary films featuring DI analysis

**Community & Open Source**
- GitHub README files linking to this project
- Personal blog posts analyzing DI findings
- Social media posts sharing DI insights
- Newsletter content discussing the data
- Open source projects using DI data

### Requirements When Using

When you use any logo, you must:

1. **Don't modify** - Use logos as-is without alterations
2. **Maintain clear space** - Minimum 20px padding around logo
3. **Link back** - Include link to deflationindex.com or github.com/deflation-index
4. **Attribute properly** - Credit "The Deflation Index" or "Deflation Index LLC"
5. **Maintain minimum size** - Never below specified minimums (illegible)
6. **Use appropriate variant** - Follow the decision tree for context

### Example Attribution

**Markdown:**
```markdown
Source: The Deflation Index (https://deflationindex.com)
```

**Academic Citation:**
```
Deflation Index LLC. (2026). The Deflation Index: Measuring Technological 
Progress (1990-2024) [Data set]. https://github.com/deflation-index/deflation-index
```

**HTML:**
```html
<p>Data source: <a href="https://deflationindex.com">The Deflation Index</a></p>
```

---

### ❌ PROHIBITED USES

You may **NOT** use any logo for:

**Commercial Misuse**
- Creating competing indices or derivative products for sale
- Incorporating into proprietary financial products without permission
- Selling merchandise (t-shirts, mugs, stickers) with logos
- Using in paid products, apps, or services without authorization

**Misleading Use**
- Implying official affiliation, partnership, or endorsement by DI
- Suggesting your product/service is created by or endorsed by us
- Using logos in ways that confuse users about the source
- Falsely claiming collaboration or sponsorship

**Modified Versions**
- Altering, distorting, recoloring, or redesigning any logo
- Combining logos with other logos or graphics
- Changing shadow offset, opacity, fonts, or proportions
- Adding effects (drop shadows, glows, outlines, embossing)
- Rotating, stretching, skewing, or warping logos
- Creating derivative logo designs

**Context That Harms Brand**
- Using in contexts that damage The Deflation Index reputation
- Associating with controversial, offensive, or illegal content
- Political campaign materials (unless citing data objectively)
- Endorsing products/services without permission
- Implying views or positions DI doesn't hold

---

## Brand Consistency Rules

### DO:

✅ **Use exact colors** - Gold #FFD700, Cyan #00CED1 or #00FFFF  
✅ **Maintain letter spacing** - Don't condense or expand text  
✅ **Keep logos on appropriate backgrounds** - Dark for cyan, dark or light for gold  
✅ **Use SVG format when possible** - Scalable, crisp, small file size  
✅ **Provide clear space** - Minimum 20px padding around logos  
✅ **Choose appropriate variant** - Standard/wide/compact based on space  
✅ **Test at target size** - Ensure legibility before publishing  
✅ **Link back to source** - Help others find The Deflation Index

### DON'T:

❌ **Change colors** - No gradients, no different shades of gold/cyan  
❌ **Distort aspect ratio** - Always scale proportionally  
❌ **Add effects** - No shadows, glows, bevels, outlines, or embossing  
❌ **Place on busy backgrounds** - Ensure clear readability  
❌ **Mix variants inappropriately** - Don't use icon in navigation header  
❌ **Use below minimum sizes** - Logos become illegible  
❌ **Modify fonts or spacing** - Use provided files as-is  
❌ **Combine with other logos** - Keep DI branding separate and clear

---

## Accessibility Best Practices

### Contrast Requirements

All logo variants meet WCAG accessibility standards when used properly:
- Gold on black: 12.6:1 (AAA compliant - excellent)
- Cyan on black: 6.7:1 (AA compliant - good)
- Gold on dark gray (#0F0F0F): 12.4:1 (AAA compliant - excellent)

### Alt Text Recommendations

Always include descriptive alt text:

**Icon Logo:**
```html
alt="The Deflation Index"
alt="DI logo"
```

**Text Logo:**
```html
alt="The Deflation Index"
alt="The Deflation Index wordmark"
```

**Horizontal Lockup:**
```html
alt="The Deflation Index - Tracking where the abundance goes"
```

### Screen Reader Considerations

For navigation logos, consider hiding decorative instances:
```html
<img src="logo.svg" alt="" aria-hidden="true">
<span class="sr-only">The Deflation Index</span>
```

---

## Examples of Correct Use

### Website Header

```html
<nav class="nav">
    <a href="index.html" class="nav-logo">
        <img src="assets/logo/text/di_logo_text_gold.svg" 
             alt="The Deflation Index"
             height="48">
    </a>
</nav>
```

### Academic Paper (LaTeX)

```latex
\begin{figure}
  \includegraphics[height=0.5in]{di_logo_text_gold.pdf}
  \caption{Source: The Deflation Index (deflationindex.com)}
\end{figure}
```

### Blog Post (Markdown)

```markdown
![The Deflation Index](assets/logo/text/di_logo_text_gold.svg)

*Analysis based on data from [The Deflation Index](https://deflationindex.com)*
```

### Presentation Title Slide

```
[Use horizontal lockup centered at top]
di_lockup_horizontal.svg (height: 80-100px)

"The 560-Point Gap: Technology vs. Monetary Policy"
Your Name | Date
```

### Email Signature

```html
<img src="https://deflationindex.com/assets/logo/text/di_logo_text_gold_compact.svg"
     alt="The Deflation Index"
     height="32">
<br>
Israel [Last Name]
<br>
Founder, The Deflation Index
<br>
info@deflationindex.com
```

---

## Common Use Cases

### Social Media Setup

**Twitter/X:**
- Profile picture: `di_logo_social_profile.png` (512×512)
- Header image: `di_logo_text_gold_wide.svg` or `di_lockup_horizontal.svg` (1500×500)
- Bio: "Measuring where the abundance went. 96% tech deflation vs. 550% M2 expansion."

**LinkedIn Company Page:**
- Logo: `di_logo_social_profile.png` (512×512)
- Cover image: `di_logo_text_gold_wide.svg` or `di_lockup_horizontal.svg` (1584×396)
- Description: Professional positioning

**Substack:**
- Publication logo: `di_logo_social_profile.png` (512×512)
- Header: `di_logo_text_gold_wide.svg` (custom dimensions)

### GitHub Repository

```markdown
<p align="center">
  <img src="assets/logo/icon/di_logo_primary.svg" 
       alt="The Deflation Index" 
       height="120">
</p>

# The Deflation Index

Measuring where the abundance went...
```

### Website Implementation

**Navigation Header:**
```css
.nav-logo img {
  height: 48px; /* Standard text logo */
  width: auto;
}

@media (max-width: 768px) {
  .nav-logo img {
    height: 36px; /* Compact variant on mobile */
  }
}
```

**Favicon Link Tags:**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/di_logo_32.png">
<link rel="icon" type="image/png" sizes="64x64" href="/di_logo_64.png">
<link rel="apple-touch-icon" href="/di_logo_64.png">
```

---

## Need Permission or Have Questions?

### Contact Us For:

**Commercial Partnerships**
- Using logos in paid products or services
- Merchandise or physical products with logos
- Large-scale campaigns or marketing materials
- White-label or OEM arrangements

**Modified Versions**
- Custom logo variants for specific contexts
- Color adjustments for special use cases
- Integration into complex branding systems

**Enterprise Licensing**
- Institutional use of logos and data
- API integration with logo usage
- Custom analysis with branded deliverables

**Questions**
- Clarification on permitted use
- Specific context not covered here
- Bulk licensing inquiries

**Email:** info@deflationindex.com  
**Response Time:** 2-3 business days

---

### You Don't Need Permission For:

✅ Academic citations and research papers  
✅ Blog posts and articles referencing DI  
✅ Social media posts sharing findings  
✅ Educational materials and presentations  
✅ GitHub projects linking to DI  
✅ Journalism and news coverage  
✅ Non-commercial use following these guidelines

Just follow the usage guidelines above and you're good to go!

---

## Quality Checklist

Before using any logo, verify:

**Visual Quality:**
- [ ] Using high-resolution file (SVG preferred)
- [ ] Logo maintains minimum size requirements
- [ ] Colors match specifications exactly
- [ ] Clear space maintained around logo
- [ ] Appropriate background (dark for cyan, flexible for gold)
- [ ] Logo is legible at intended display size

**Technical Implementation:**
- [ ] Alt text included and descriptive
- [ ] Aspect ratio maintained (not stretched/squashed)
- [ ] File format appropriate for use case
- [ ] Links back to deflationindex.com included
- [ ] Attribution provided where needed

**Brand Consistency:**
- [ ] Using correct logo variant for context
- [ ] No modifications or effects added
- [ ] Placement doesn't crowd or conflict with other elements
- [ ] Professional context and presentation

---

## Updates & Versioning

**Current Version:** 2.0 (January 15, 2026)

**Version History:**
- **v2.0** (Jan 2026): Unified guide combining icon and text logos
- **v1.1** (Jan 2026): Added social profile images and black variants
- **v1.0** (Jan 2026): Initial icon logo documentation

**Upcoming Changes:**
- PNG variants for all text logos (if demand warrants)
- Additional lockup variations (vertical, stacked)
- Animated logo versions for digital use (GIF/video)

These guidelines are updated periodically. Check this file for the most current usage policies.

---

## Additional Resources

**Website:** https://deflationindex.com  
**GitHub:** https://github.com/deflation-index/deflation-index  
**Documentation:** https://github.com/deflation-index/deflation-index/tree/main/docs  
**Brand Assets:** This directory (`assets/logo/`)

**Brand Guidelines (Full Package):**
- Typography recommendations
- Color palette
- Website design principles
- Data visualization standards
- Voice and tone guidelines

Download complete brand package from [latest release](../../releases).

---

## File Structure Reference

**Recommended organization:**

```
assets/logo/
├── README.md (this file)
├── icon/
│   ├── di_logo_primary.svg ⭐ PRIMARY ICON
│   ├── di_logo_512.png
│   ├── di_logo_social_profile.png ⭐ SOCIAL AVATARS
│   ├── di_logo_og.png
│   ├── di_logo_black.svg
│   └── di_logo_black_512.png
├── text/
│   ├── di_logo_text_gold.svg ⭐ PRIMARY TEXT
│   ├── di_logo_text_gold_wide.svg
│   └── di_logo_text_gold_compact.svg
└── lockup/
    └── di_lockup_horizontal.svg ⭐ PRIMARY LOCKUP
```

**Root directory (favicons):**
```
/favicon.ico
/di_logo_32.png
/di_logo_64.png
```

---

## Summary: Most Common Uses

**I need a logo for...**

| Context | Use This File | Notes |
|---------|--------------|-------|
| **Website header** | `text/di_logo_text_gold.svg` | Standard text logo |
| **Twitter profile** | `icon/di_logo_social_profile.png` | Dark background built in |
| **LinkedIn profile** | `icon/di_logo_social_profile.png` | Dark background built in |
| **Browser favicon** | Root `/favicon.ico` | Multiple sizes in one file |
| **Email signature** | `text/di_logo_text_gold_compact.svg` | Compact variant |
| **PDF report header** | `text/di_logo_text_gold.svg` | Standard text logo |
| **Presentation title** | `lockup/di_lockup_horizontal.svg` | Icon + text combined |
| **Social banner** | `text/di_logo_text_gold_wide.svg` | Wide text logo |
| **GitHub README** | `icon/di_logo_primary.svg` | Primary icon SVG |
| **Academic paper** | `text/di_logo_text_gold.svg` | Professional text logo |

---

## Brand Philosophy

The Deflation Index logo system reflects our core values:

**Professional** - Bloomberg Terminal quality, institutional credibility  
**Accessible** - Clear, readable, works in any context  
**Bold** - Confident design, unafraid minimalism  
**Rigorous** - Every detail intentional, nothing arbitrary  
**Transparent** - Open source, documented, explainable

Every logo usage should reinforce these values. When in doubt, choose the option that best serves clarity, professionalism, and transparency.

---

## Legal

**Copyright:** © 2026 Deflation Index LLC. All rights reserved.

**Trademark:** The Deflation Index name and logos are proprietary trademarks of Deflation Index LLC.

**License:** Logos are available for use under the terms described in this document. Commercial use requires explicit permission. Open source and academic use is encouraged with proper attribution.

**Terms:** Use of these logos constitutes acceptance of the usage guidelines outlined in this document.

---

**Questions?** info@deflationindex.com  
**Technical Issues?** Open an issue on [GitHub](../../issues)  
**General Info?** Visit [deflationindex.com](https://deflationindex.com)

---

*The Deflation Index logo system - Multi-asset brand architecture for professional financial data platforms.*

**Last Updated:** January 15, 2026 | **Maintainer:** The Deflation Index Team
