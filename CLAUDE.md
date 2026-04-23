# CLAUDE.md — Zahid Pirani Portfolio Site

## Project Overview

Plain HTML/CSS/JS portfolio site. No frameworks, no build tools, no npm. Every page is a standalone `.html` file. Styles live in a single shared `assets/site.css`. Nav and footer are injected at runtime by `assets/site.js`.

**Stack:** Vanilla HTML5 · CSS custom properties · Vanilla JS (IIFE) · Google Fonts · Unsplash (placeholder images)

---

## File Structure

```
/
├── index.html               # Homepage — hero + project card grid
├── about.html               # Experience, skills, education, contact
├── skills.html              # Full skills breakdown with pills, chips, stat strip
├── assets/
│   ├── site.css             # SINGLE stylesheet — all tokens + all components
│   └── site.js              # IIFE — injects nav/footer, scroll reveal, mobile menu
└── work/                    # Case study pages (9 total)
    ├── shell-tpc.html
    ├── orion.html
    ├── atp-mobile.html
    ├── atp-web.html
    ├── axi-crypto.html
    ├── axi-design-system.html
    ├── goldpesa-uniswap.html
    ├── goldpesa-staking.html
    └── goldpesa-polygon.html
```

---

## Design Tokens

All tokens are CSS custom properties on `:root` in `assets/site.css`. **Never hardcode hex values — always use these tokens.**

### Colour Palette

```css
:root {
  /* Backgrounds — warm charcoal, matches zpirani.com */
  --bg:        #16171E;   /* page background */
  --surface:   #1D1F28;   /* card / section bg */
  --surface-2: #252730;   /* hover state */
  --surface-3: #2D2F3C;   /* elevated (dropdown) */

  /* Text */
  --ink:       #EDEDF2;   /* primary text */
  --muted:     #8080A0;   /* secondary text — WCAG AA 4.7:1 on --bg */
  --muted-lt:  #3A3C4E;   /* tertiary / rules / disabled labels */

  /* Borders */
  --rule:      #23252F;   /* hairline dividers, grid gaps */

  /* Accent — cyan */
  --accent:    #22D3EE;
  --accent-lt: rgba(34,211,238,0.08);  /* tint backgrounds */
  --accent-40: rgba(34,211,238,0.40);  /* border tints */

  /* Green — availability / DeFi / positive states */
  --green:     #34D399;
  --green-lt:  rgba(52,211,153,0.08);
}
```

**Colour usage rules:**
- Accent (`--accent`) = interactive elements, highlights, Shell/Axi accent tags, progress bar
- Green (`--green`) = GoldPesa tags, availability dot, positive delta values
- `--muted` for all body copy — do not go lower than this for readable text
- `--muted-lt` for labels, metadata, rule lines only — not for readable text (fails contrast)

---

## Typography

Three typefaces, each with a specific role. Never mix roles.

| Typeface | Role | CSS |
|---|---|---|
| **Schibsted Grotesk** | All headings (h1–h5), brand mark, section titles | `font-family: 'Schibsted Grotesk', system-ui, sans-serif` |
| **Inter** | Body copy, buttons, paragraphs, UI text | `font-family: 'Inter', system-ui, sans-serif` (body default) |
| **JetBrains Mono** | Tags, labels, metadata, kickers, nav CTA, captions, monospace data | `font-family: 'JetBrains Mono', monospace` |

### Type Scale

```css
/* Headings — Schibsted Grotesk */
h2 { font-size: clamp(20px, 2.2vw, 26px); font-weight: 700; letter-spacing: -0.022em; }
h3 { font-size: 17px; font-weight: 600; letter-spacing: -0.012em; }
h4 { font-size: 14px; font-weight: 600; }

/* Hero h1 (index.html page-level style) */
.hero h1 {
  font-size: clamp(56px, 9.5vw, 136px);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.04em;
}

/* Case study hero h1 (cs-hero, defined in site.css) */
.cs-hero h1 {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.03em;
}

/* Body */
body { font-size: 16px; line-height: 1.55; letter-spacing: 0.015em; }
p    { color: var(--muted); line-height: 1.72; }
```

Google Fonts import (used on every page):
```html
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Component Patterns

### Layout Containers

```html
<div class="wrap">        <!-- max-width: 1200px, padding: 0 48px → 0 20px mobile -->
<div class="wrap-narrow"> <!-- max-width: 760px  — case study body text -->
<div class="wrap-wide">   <!-- max-width: 1440px — nav/footer inner -->
```

### Tags / Badges

JetBrains Mono, pill shape (9999px radius). Three variants:

```html
<span class="tag">Default</span>          <!-- --muted text, --surface-2 bg -->
<span class="tag accent">Accent</span>    <!-- --accent text, --accent-lt bg -->
<span class="tag green">Green</span>      <!-- --green text, --green-lt bg -->
```

Tag CSS summary:
```css
.tag { font-family: 'JetBrains Mono'; font-size: 10px; letter-spacing: 0.08em;
       text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; }
```

### Buttons

Revolut-style pill buttons (9999px radius). Four variants:

```html
<a href="..." class="btn btn-dark">Primary action</a>
<a href="..." class="btn btn-outline">Secondary</a>
<a href="..." class="btn btn-accent">Accent fill</a>
<a href="..." class="btn btn-ghost">Ghost cyan</a>
```

Button CSS summary:
```css
.btn { padding: 14px 32px; border-radius: 9999px; font-size: 14px; font-weight: 500;
       border: 2px solid transparent; font-family: 'Inter'; }
.btn-dark    { background: var(--ink); color: var(--bg); }
.btn-outline { border-color: var(--ink); color: var(--ink); }
.btn-accent  { background: var(--accent); color: #000; }
.btn-ghost   { background: var(--accent-lt); color: var(--accent); border-color: var(--accent-40); }
```

### Project Cards (homepage)

Cards are **`<a>` elements** — the entire card is the link. No nested `<a>` inside. Use `<span class="rlink">` for the "View case study" text:

```html
<a href="work/shell-tpc.html" class="cs-card featured reveal">
  <div class="thumb thumb-shell-tpc">
    <img src="..." alt="Descriptive alt text" loading="lazy">
  </div>
  <div class="card-body">
    <div class="card-tags">
      <span class="tag accent">Enterprise UX</span>
    </div>
    <h3>Terminal Performance Center</h3>
    <p>Description text…</p>
    <span class="rlink">View case study</span>  <!-- NOT <a> — card itself is the link -->
  </div>
</a>
```

**Card variants:**
- `.cs-card` — standard (flex-column, 20px radius — overridden to 0 inside `.cs-grid`)
- `.cs-card.featured` — flex-row wide layout (image + body side by side)
- `.cs-card.cs-card-wide` — spans full grid width, grid-column: 1 / -1

**Card grid — flat tile system:**
```html
<div class="cs-grid">           <!-- 2-column, gap: 1px, background: var(--rule) -->
<div class="cs-grid cs-grid-3"> <!-- 3-column -->
```
Grid gap is `1px` with `background: var(--rule)` — this creates hairline dividers between tiles. Cards have `border-radius: 0` and `border: none` inside grids.

**Thumb gradient backgrounds** (fallback if image fails):
```css
.thumb-shell-tpc { background: linear-gradient(145deg, #07101E, #0D2040, #122E5E); } /* navy */
.thumb-orion     { background: linear-gradient(145deg, #060C18, #0A1830, #0D2240); } /* dark navy */
.thumb-axi       { background: linear-gradient(145deg, #0C0C10, #131318); }          /* near-black */
.thumb-goldpesa  { background: linear-gradient(145deg, #060E09, #0A1C10, #0F2618); } /* dark green */
```

### Section Headers (homepage)

```html
<div class="section-header">
  <div class="section-header-left">
    <span class="section-num">01</span>          <!-- JetBrains Mono, --muted-lt -->
    <span class="section-company">Shell</span>   <!-- Schibsted Grotesk 800 18px -->
    <span class="section-desc">Terminal &amp; LNG</span> <!-- JetBrains Mono 12px, hidden on 480px -->
  </div>
  <span class="section-period">2025 – Present</span> <!-- JetBrains Mono, --muted-lt -->
</div>
```

### Case Study Hero (`cs-hero`)

Used on all `work/*.html` pages:

```html
<section class="cs-hero">
  <div class="wrap">
    <div class="eyebrow">
      <span class="tag accent">Company · Date</span>
      <span class="tag accent" style="margin-left:8px;">Domain</span>
    </div>
    <h1>Case Study Title</h1>
    <p class="lead">One-paragraph overview…</p>
    <div class="cs-meta">
      <div class="meta-item"><label>Company</label><span>Shell</span></div>
      <div class="meta-item"><label>Role</label><span>Senior Product Designer</span></div>
      <!-- additional meta-items -->
    </div>
  </div>
</section>

<div class="cs-hero-img">
  <img src="https://images.unsplash.com/photo-{id}?w=1400&h=560&fit=crop&auto=format&q=80"
       alt="Descriptive alt" loading="lazy">
</div>
```

### Case Study Body (`cs-body`)

```html
<div class="cs-body">
  <div class="wrap-narrow">
    <h2>Section Heading</h2>
    <p>Body paragraph…</p>
    <ul>
      <li>Bullet — styled with cyan em-dash via ::before</li>
    </ul>

    <!-- Stat strip (3-column) -->
    <div class="cs-stat-row">
      <div class="cs-stat">
        <div class="num">100+</div>
        <div class="label">Label text</div>
      </div>
    </div>

    <!-- Inline image -->
    <figure class="cs-img">
      <img src="..." alt="...">
      <figcaption>Caption in JetBrains Mono</figcaption>
    </figure>
  </div>
</div>
```

### Next Case Study Footer

```html
<section class="cs-next">
  <div class="inner">
    <div>
      <p>Next case study</p>
      <h3>ORION — Inventory Intelligence →</h3>
    </div>
    <a href="orion.html" class="btn btn-dark">View →</a>
  </div>
</section>
```

### Scroll Reveal

Add `.reveal` + optional delay class to any element for intersection-based fade-up:

```html
<div class="reveal">               <!-- fades in at 0.08 threshold -->
<div class="reveal reveal-delay-1"> <!-- +60ms delay -->
<div class="reveal reveal-delay-2"> <!-- +120ms delay -->
<div class="reveal reveal-delay-3"> <!-- +180ms delay -->
<div class="reveal reveal-delay-4"> <!-- +240ms delay -->
```

Respects `prefers-reduced-motion` — motion disabled at OS level.

### Arrow Link (`rlink`)

JetBrains Mono label that auto-appends `↗` and shifts on hover:

```html
<span class="rlink">View case study</span>  <!-- inside <a> cards -->
<a href="..." class="rlink">External link</a> <!-- standalone usage -->
```

---

## Navigation & Footer

Nav and footer HTML are **injected by `assets/site.js`** — do not write them in page HTML. Pages only need:

```html
<div id="site-nav"></div>   <!-- top of <body> -->
<div id="site-footer"></div> <!-- before </body> -->
<script src="assets/site.js"></script>   <!-- root pages -->
<script src="../assets/site.js"></script> <!-- work/* pages -->
```

The JS IIFE auto-detects path depth (`inWork`) and prefixes all links with `../` for work pages.

**Nav items:**
- Work (index.html)
- Shell dropdown → shell-tpc.html, orion.html
- Axi dropdown → atp-mobile.html, atp-web.html, axi-crypto.html, axi-design-system.html
- GoldPesa dropdown → goldpesa-uniswap.html, goldpesa-staking.html, goldpesa-polygon.html
- About → about.html
- Skills → skills.html
- CTA button → mailto:zahid@zpirani.com

---

## Page Templates

### Root page (`index.html`, `about.html`, `skills.html`)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Page Title — Zahid Pirani</title>
  <meta name="description" content="...">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css">
  <style>/* page-specific styles only */</style>
</head>
<body>
<div id="site-nav"></div>

<!-- page content -->

<div id="site-footer"></div>
<script src="assets/site.js"></script>
</body>
</html>
```

### Case study page (`work/*.html`)

Same as above but:
- `href="../assets/site.css"` (one level up)
- `src="../assets/site.js"` (one level up)
- No `<style>` block needed — all case study styles are in `site.css`
- Wrap content in `<main>` if adding landmark semantics

---

## Styling Approach

**No CSS framework, no preprocessor.** Everything is plain CSS in `assets/site.css`.

- **Global styles only** — no CSS modules, no scoped styles, no utility classes
- **Page-specific overrides** go in a `<style>` block in the page `<head>`
- **Inline styles** are acceptable for one-off layout tweaks on existing components (e.g. `style="border-left: 1px solid var(--rule);"`)
- **Never hardcode colours** — always use CSS custom properties
- **Responsive breakpoints:**
  - `1080px` — tablet nav adjustments
  - `900px` — 3-col grid → 2-col
  - `768px` — mobile nav, reduced padding
  - `700px` — about/skills grid changes
  - `640px` — hero strip 4-col → 2-col
  - `600px` — stat-row, footer stacking
  - `580px` — card grid → single column
  - `480px` — section-desc hidden

---

## Asset / Image Conventions

**Placeholder images:** Unsplash CDN with consistent parameters:

```
https://images.unsplash.com/photo-{PHOTO_ID}?w={W}&h={H}&fit=crop&auto=format&q=80
```

Homepage card images: `w=900&h=500`  
Case study hero images: `w=1400&h=560`

**Photo IDs by project:**

| Project | Photo ID | Subject |
|---|---|---|
| Shell TPC | `1551288049-bebda4e38f71` | Analytics dashboard |
| ORION | `1460925895917-afdab827c52f` | Business data charts |
| ATP Mobile | `1563986768494-4dee2763ff3f` | Mobile finance app |
| ATP Web | `1611974789855-9c2a0a7236a3` | Trading charts |
| Axi Crypto | `1621761191319-c6fb62004040` | Crypto trading |
| Axi Design System | `1558655146-d09347e92766` | Design components |
| GoldPesa Uniswap | `1639762681057-408e52192e55` | DeFi/blockchain |
| GoldPesa Staking | `1605792657660-596af9009e82` | Crypto yield |
| GoldPesa Polygon | `1451187580459-43490279c0fa` | Global network |

All images use `loading="lazy"` and must have descriptive `alt` text.

---

## Icons

**No icon library.** Icons are inline SVG only.

The Z logo in the nav is a 26×26px SVG of 16 parallel diagonal lines with two `clipPath` definitions, using `stroke="currentColor"` to inherit the surrounding text colour. It lives inside `assets/site.js` as a template literal string in the nav HTML.

No other icons are currently used. If adding icons, use inline SVG with `aria-hidden="true"` and an accompanying visually-hidden label.

---

## Accessibility Checklist

- Focus ring: `outline: 1px solid var(--accent); outline-offset: 3px` via `:focus-visible`
- All interactive cards are `<a>` elements — no div-based click handlers
- `prefers-reduced-motion`: disables reveal transitions, card image scale, all CSS transitions, availability pulse
- Touch targets: nav hamburger 44×44px, nav CTA min 44px height, buttons 14px font with 14px vertical padding
- Alt text required on all `<img>` elements
- Landmark: `<main>` wraps the work section grid on index.html
- Text contrast: `--ink` on `--bg` = ~14:1, `--muted` on `--bg` = ~4.7:1 (WCAG AA)

---

## Adding a New Case Study Page

1. Create `work/new-page.html` using the case study template above
2. Add a card to `index.html` under the appropriate company section (use `<a class="cs-card">`)
3. Add the nav dropdown link in `assets/site.js` under the correct company dropdown `<ul>`
4. Use the matching `.thumb-{company}` gradient class on the card thumbnail div
5. Add a `<section class="cs-next">` at the bottom linking to the adjacent case study

---

## Figma → Code Translation Rules

When implementing a Figma design into this codebase:

1. **Map Figma fills to tokens** — never use raw hex. Match to the nearest `--bg`, `--surface`, `--accent` etc.
2. **Typography** — map Figma text styles to the three-typeface system above based on role (heading → Schibsted Grotesk, UI/body → Inter, label/mono → JetBrains Mono)
3. **Spacing** — no spacing scale token exists; use literal `px` values or `rem`, keeping consistent with existing patterns (multiples of 8px preferred)
4. **Border radius** — pill elements use `9999px`, cards use `20px` (or `0` inside grids), dropdowns use `8px`, stat rows use `0`
5. **Shadows** — this design uses no box-shadows. Depth is created with border/rule lines only
6. **Component reuse** — always use existing CSS classes before writing new ones. The full class list is in `assets/site.css`
7. **No JavaScript components** — if a Figma component needs interactivity, implement it in `assets/site.js` following the existing IIFE pattern. No external JS libraries
8. **Page-scoped styles** — if a style is only needed on one page, add it in a `<style>` block in that page's `<head>`. Only add to `site.css` if it's reusable across pages
