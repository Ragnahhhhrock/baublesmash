# Bauble Smash – Design System

**Feel:** chunky, glossy, festive arcade. Dark pine-night backdrop so shiny baubles pop. Mobile first: big tap targets, one-thumb play.
**Voice:** short and punchy. "Tap. Smash. Sparkle."

## Colour
| Role | Token | Hex |
|---|---|---|
| Background | night / deep | #0B2A22 / #061A15 |
| Tree | pine / tree / tree-light | #14503F / #1E7A57 / #2A9468 |
| Primary (action, "SMASH") | red / red-dark | #E5283B / #A8142A |
| Highlight (badges, star, score) | gold / gold-dark | #FFC93C / #E8A317 |
| Secondary text, ice bauble | ice / ice-dark | #9FE3F5 / #4FB6D6 |
| Bauble accent | plum / plum-dark | #8E3AA8 / #5E1F78 |
| Text on dark | cream | #FFF8EC |

Rules: cream on night is the default text (contrast > 14:1). Dark text (deep) on gold. Never red text on pine (low contrast). Bauble colours are red, gold, ice, plum, each with a light-to-dark radial gradient (light at 35%/30%) and a white gloss ellipse.

## Type
- Display: **Archivo Black**, uppercase, with a hard offset shadow (8px, red-dark) – titles, score, buttons' big moments.
- Body/UI: **DM Sans** 500/700.
- Scale: hero clamp(3rem, 14vw, 8rem) · h1 40 · h2 28 · body 16 · small 13.

## Shape, space, motion
- 4px spacing base. Radius: 8 / 16 / pill. Buttons are pills with a chunky bottom shadow that squashes on press.
- Tap target ≥ 48px. Safe-area insets respected (`viewport-fit=cover`).
- Motion: tap 120ms, smash 450ms with an overshoot ease (`cubic-bezier(.34,1.56,.64,1)`). Smash = bauble flashes, 10–12 triangular shards burst out, gold sparkles fade. Honour `prefers-reduced-motion` (swap burst for a quick fade).

## Components
- **Bauble:** circle + gold cap + loop + gloss highlight (see `favicon.svg`).
- **Shard:** small triangle, same gradient as parent bauble.
- **Button:** `.bs-btn` (red) / `.bs-btn--gold`.
- **Badge:** `.bs-badge` gold pill, tracking .12em.
- **Sparkle:** four-point star, gold or cream.

## Assets
`og-image.png` 1200×630 · `twitter-card.png` 1200×600 · `favicon.svg/.ico` · `apple-touch-icon.png` 180 · `icon-192/512.png` · `tokens.css` · `meta.html` · `site.webmanifest`
