# Gateway English Center —  Landing Page

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


## Feature Flags
Expose as simple config (e.g. constants at the top of `main.js`) so they can be switched without touching other code:
- `SHOW_LANGUAGE_TOGGLE` — **default `false`** (client's current choice). When `false`: toggle not rendered, page is English only (`lang="en"`, `dir="ltr"`), any stored language choice ignored, logo sits alone top-left. When `true`: full bilingual behavior below.
- `ANIMATE_UNIQUES` — default `true`. Enables the tile scroll reveal.

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

