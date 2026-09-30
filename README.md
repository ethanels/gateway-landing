# Handoff: Gateway English Center — Placeholder Landing Page

## Overview
A single-page, bilingual (English / Arabic) placeholder site for Gateway English Center, an English language center launching in Saudi Arabia. It holds the headline, About Us statement, three differentiators ("uniques"), and founder contact while the full website is developed. Mobile first.

## Project / Deploy
- The site is a plain static site in `public/` (`index.html`, `styles.css`, `main.js`, `_headers`, `assets/`). No framework, no build step.
- Deployed with **Cloudflare Pages** (Git integration): production branch `master`, build command **none**, build output directory **`public`**. Files outside `public/` (like this README) are not published.
- Feature flags: constants at the top of `public/main.js`.
- Copy: English is in `public/index.html`; both languages are in the `COPY` object in `public/main.js`.
- `public/_headers` sets security headers on Cloudflare Pages.

## Local Server
Run the server from inside `public/`:

```
cd ~/GitHub/gateway-landing/public && python3 -m http.server 8000
```

Then open http://localhost:8000. To check Arabic, set `SHOW_LANGUAGE_TOGGLE = true` in `public/main.js` and open http://localhost:8000/?lang=ar.

## About the Design Files
The design was handed off as an HTML design-canvas reference with two artboards: **4a** (desktop, resizable) and **4b** (mobile, 390px). The reference file was removed from the repo after the site was built; this document is the spec.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final. Recreate precisely. The only exception: the dashed orange "900px screen break" line in 4a is a design annotation — **do not build it**.

## Page Structure (top to bottom)

### 0. Announcement bar (temporary)
- Full-width strip at the very top, above the header. Static text, **no scrolling/marquee**.
- Text: "Coming soon to Saudi Arabia" (`COPY` → `soon` in `public/main.js`), centered.
- Background `#1E3A8A`, text `#FFFFFF`.
- Font: Anybody **Expanded** (`wdth` 125), 600, uppercase, letter-spacing `.12em`, line-height 1.3, size `clamp(11px, 0.9vw, 13px)`.
- Padding `clamp(9px, 0.8vw, 11px) 20px` (16px sides on mobile).
- Build it as one self-contained element so it can be deleted cleanly at launch.

### 1. Header
- Row, `justify-content: space-between`, `align-items: center`.
- Padding: `calc(clamp(24px, 2.5vw, 36px) + 10px)` top (34px on mobile), `clamp(20px, 4.4vw, 64px)` sides, 0 bottom.
- **Logo** left: `assets/logo.svg`, width `clamp(150px, 18vw, 260px)`, height auto. Link to `/` optional.
- **Language toggle** right (see Components). Hidden when `SHOW_LANGUAGE_TOGGLE` is false (see Feature Flags).
- **The header must stay `dir="ltr"` in both languages**: logo always left, toggle always right.

### 2. Hero
- Column, centered both axes, `text-align: center`.
- `min-height: clamp(320px, 34.7vw, 500px)`; gap `clamp(28px, 2.8vw, 40px)`; side padding `clamp(24px, 4.4vw, 64px)`.
- **Headline** (h1): see Typography. `max-width: 900px`, `text-wrap: balance`.
- **Contact Us button**: scrolls to the contact section (see Interactions).
- Design intent: at a 1440 × 900 desktop viewport, the headline and button fill the first screen and the top of the Gateway Difference box peeks in above the fold, with Unique 1 ending just above 900px.

### 3. Gateway Difference box
- Outer wrapper side padding `clamp(16px, 4.4vw, 64px)`.
- Box: `max-width: 1160px`, centered, background `#DBEAFE`, radius `clamp(24px, 2.2vw, 32px)`.
- Padding: top `clamp(48px, 12.5vw, 180px)`, sides `clamp(20px, 5vw, 72px)`, bottom `clamp(24px, 5vw, 72px)`.
- Desktop: 2-column grid `minmax(0,1fr) minmax(0,1fr)`, gap `clamp(28px, 5vw, 72px)`, `align-items: start`.
  - Column 1 (start side): three unique tiles stacked, gap `clamp(12px, 1.1vw, 16px)`.
  - Column 2: heading "The Gateway Difference" (h2) above the About Us paragraph; gap `clamp(14px, 1.5vw, 22px)`; `padding-top: 8px`.
- **≤ 760px**: single column; the heading and paragraph move **above** the tiles (`order: -1`), paragraph block gets `padding: 0 4px`.
- In Arabic, the grid mirrors naturally with `dir="rtl"` (tiles on the right).

**Unique tile**
- Background `#F6F1E8`, radius 18px (16px acceptable on mobile).
- Padding `clamp(18px, 1.8vw, 26px) clamp(18px, 1.9vw, 28px)`.
- Row: icon + label, `align-items: center`, gap `clamp(14px, 1.4vw, 20px)`.
- Icon: circle `clamp(40px, 3.3vw, 48px)`, background `#E1702E`, containing a Lucide icon at 52% of the circle, stroke `#FFFFFF`, stroke-width 2, round caps/joins, no fill.
  1. Cambridge-Certified, Native English Teachers → **award**
  2. In-Person lessons at Satellite branches in Mid-Sized Saudi Cities → **map-pin**
  3. At-Home lessons with Artificial Intelligence tools → **sparkles**
- Label: DM Sans 500, `clamp(17px, 1.46vw, 21px)`, line-height 1.25, color `#1E3A8A`. Labels wrap to 2–3 lines (unique 2 is long); keep the icon vertically centered.
- Scroll-reveal animation — see Interactions.

### 4. Contact footer (`id="contact"`)
- `margin-top: clamp(64px, 8.3vw, 120px)`; full-width; background `#3D3D3D`.
- Padding `clamp(32px, 3.3vw, 48px) clamp(24px, 4.4vw, 64px) clamp(36px, 3.6vw, 52px)`.
- Column, `align-items: flex-start`, `text-align: start` (left in English, right in Arabic), gap 4px, line-height 1.5.
- Name: DM Sans 700, 19px (17px mobile), color `#F6F1E8`.
- Role: DM Sans 400, 16px (14px mobile), color `#DBEAFE`.
- Email: `mailto:` link, DM Sans 400, 16px (14px mobile), color `#F6F1E8`, underlined, `text-underline-offset: 3px`, always `dir="ltr"`.
- No "Contact" heading.

## Components

**Language toggle**
- Pill button: border 1.5px solid `#1E3A8A`, radius 999px, overflow hidden, transparent background.
- Two segments: "EN" and "عربي". Font DM Sans 500, 12.6px desktop / 11.7px mobile. Segment padding 4.5px 13.5px (desktop) / 3.6px 10.8px (mobile).
- Active segment: background `#1E3A8A`, text `#F6F1E8`. Inactive: transparent, text `#1E3A8A`.
- Accessibility: use two `<button>`s in a group with `aria-pressed`, or one toggle with `aria-label="Switch language"`.

**Contact Us button**
- Pill, padding 16px 34px (14px 28px mobile), background `#E1702E`, text `#FFFFFF`, DM Sans 500, 17px (16px mobile), no underline.
- Hover: background `#C95F22`. Add a visible `:focus-visible` outline (e.g. 3px `#1E3A8A`, offset 3px).

## Feature Flags
Expose as simple config (e.g. constants at the top of `main.js`) so they can be switched without touching other code:
- `SHOW_LANGUAGE_TOGGLE` — **default `false`** (client's current choice). When `false`: toggle not rendered, page is English only (`lang="en"`, `dir="ltr"`), any stored language choice ignored, logo sits alone top-left. When `true`: full bilingual behavior below.
- `ANIMATE_UNIQUES` — default `true`. Enables the tile scroll reveal.

## Interactions & Behavior
- **Unique tiles scroll reveal**: each tile starts at `opacity: 0; transform: translateY(24px)` and animates to `opacity: 1; transform: none` when 25% of it enters the viewport (IntersectionObserver, `threshold: 0.25`). Duration 600ms, easing `cubic-bezier(.2,.7,.2,1)`, stagger 120ms per tile (0 / 120 / 240ms). Plays once per page load. Skip (tiles simply visible) when `prefers-reduced-motion: reduce` or `ANIMATE_UNIQUES` is false. Apply the hidden start state from JS, not CSS, so tiles are never stuck invisible if JS fails.
- **Contact Us** → smooth-scroll to `#contact` (`scroll-behavior: smooth` on `html`, or `scrollIntoView({behavior:'smooth'})`). Respect `prefers-reduced-motion`.
- **Language toggle** → swaps all copy (see the `COPY` object in `public/main.js`), sets `<html lang>` and `dir` (`en`/`ltr`, `ar`/`rtl`), and updates `<title>` if desired. Persist the choice in `localStorage`. Default: English. Consider also supporting `?lang=ar` for sharing.
- **Mirroring in Arabic**: everything mirrors via `dir="rtl"` **except** the header row (logo left, toggle right, forced `ltr`) and the email address (`ltr`).
- **Responsive**: all sizes use `clamp()` between the mobile value (390px) and the desktop value (1440px); the only breakpoint is **760px** for the box going single-column. The reference file used container units (`cqi`); use `vw` on the real page.
- No forms, loading, or error states.

## Copy
All English and Arabic copy lives in the `COPY` object in `public/main.js` (English also in `public/index.html`); keep them in sync. Notes:
- "Gateway" and "Reagan White" stay in English in the Arabic version, except where the client supplied Arabic: the heading "ميزة القيتوي" and "معهد قيتوي للغة الإنجليزية" in the About Us text.
- The Arabic translation should be reviewed by a native speaker before launch.

## Design Tokens

**Colors**
| Token | Hex | Use |
|---|---|---|
| Primary | `#1E3A8A` | Text, toggle, announcement bar |
| Secondary | `#3B82F6` | Reserved (not used on this page) |
| Background blue | `#DBEAFE` | Gateway Difference box, footer role text |
| Warm Neutral | `#F6F1E8` | Page background, tiles, footer text |
| Accent | `#E1702E` | Contact Us button, icon circles |
| Accent hover | `#C95F22` | Button hover |
| Body text | `#33406b` | About Us paragraph |
| Footer | `#3D3D3D` | Contact footer background |
| Logo light blue | `#7598CC` | Logo only |

**Typography**
| Element | Font | Weight | Size (mobile → desktop) | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Announcement bar | Anybody Expanded (`wdth` 125) | 600 | 11px → 13px, uppercase | 1.3 | .12em |
| Headline (h1) | Anybody, normal width (`wdth` 100) | 600 | 38px → 68px (`clamp(38px, 4.7vw, 68px)`) | 1.08 | -0.02em |
| Difference heading (h2) | Anybody, normal width | 600 | 28px → 40px (`clamp(28px, 2.8vw, 40px)`) | 1.15 | -0.015em |
| About paragraph | DM Sans | 400 | 16px → 19px (`clamp(16px, 1.32vw, 19px)`) | 1.65 | 0 |
| Unique labels | DM Sans | 500 | 17px → 21px | 1.25 | 0 |
| Button | DM Sans | 500 | 16px → 17px | 1 | 0 |
| Toggle | DM Sans | 500 | 11.7px → 12.6px | 1 | 0 |
| Contact name | DM Sans | 700 | 17px → 19px | 1.5 | 0 |
| Contact role / email | DM Sans | 400 | 14px → 16px | 1.5 | 0 |

- **Arabic text**: fall back to **Tajawal** (400/700) — neither Anybody nor DM Sans has Arabic glyphs. Stack: `'Anybody', 'Tajawal', sans-serif` and `'DM Sans', 'Tajawal', sans-serif`. Tajawal is a placeholder pending client confirmation.
- Google Fonts: `Anybody:wdth,wght@50..150,100..900`, `DM+Sans:wght@400;500;700`, `Tajawal:wght@400;700`. Self-hosting is fine.
- The logo's "Gateway" uses Anybody **Expanded** (`wdth` 125) and "ENGLISH CENTER" uses DM Sans; both fonts must be loaded for `logo.svg` to render correctly when inlined. For robustness, consider converting the logo text to outlines in a design tool.

**Radii**: tiles 18px · box 24–32px · pills 999px
**Shadows**: none on the live page (shadows in the reference are artboard framing only)

## Assets
- `assets/logo.svg` — full logo (mark + wordmark), client-supplied. Text is live SVG text (see font note above). Inline it in the HTML so the page's web fonts apply.
- `assets/favicon.svg` — mark only on a 240×240 square, client-supplied. Use `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">`; generate a 32px PNG/ICO fallback and a 180px `apple-touch-icon` from it.
- Icons: [Lucide](https://lucide.dev) `award`, `map-pin`, `sparkles` (ISC license). Inline SVG.

## Head / SEO
```html
<title>Gateway English Center | Functional English</title>
<meta name="description" content="Gateway English Center | Functional English">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Files
- `README.md` — this document (not published)
- `.gitignore`
- `public/index.html`, `public/styles.css`, `public/main.js` — the site
- `public/_headers` — Cloudflare Pages security headers
- `public/assets/` — `logo.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`

## Open Items
- Native-speaker review of the Arabic copy (including the new uniques and announcement text).
- Remove the announcement bar at launch.
- Confirm Arabic font (Tajawal is a placeholder).
- Custom domain setup on Cloudflare Pages (gatewayenglishcenter.com).
- Deliberate deviation: on desktop (> 760px) the Gateway Difference box's top padding is reduced from the spec (see `padding-top` in the desktop media query in `public/styles.css`).
