# Design Reference — next-level.gg

A teardown of the Next Level gaming-cafe website, captured by examining its live HTML and stylesheet (`css/main.css`). Use this as a design reference — it is **not** how the current KaiGaming codebase is built (KaiGaming is React + Tailwind neobrutalist; this site is Bulma + Poppins, dark/neon/glassmorphism).

## Tech Stack (for context)

- **CSS framework:** Bulma v0.9.4 (utility + component classes: `.section`, `.hero`, `.columns`, `.button`, `.navbar`, `.tabs`)
- **Carousel:** tiny-slider 2.9.4 (`.tns-*` classes, hero + hideouts sliders)
- **Icons:** Google Material Icons + Material Icons Outlined (`<i class="material-icons">`)
- **Font:** Poppins (Google Fonts), weights 200–900 + italic 300

## Overall Aesthetic

Dark, cinematic, high-energy esports vibe. Full-bleed dark background images per section, oversized display typography, floating rotated game-cover cards, glassmorphism cards (blurred translucent panels), and a single hot-red accent used sparingly for CTAs and highlights. Mood: premium gaming lounge, competitive, bold.

## Color Palette

| Role | Hex | Notes |
|---|---|---|
| **Accent / primary (red)** | `#ec1e24` | Bulma `is-primary` override; CTAs, active pills, bullets, icon highlights |
| Accent hover / darker red | `#d81218` | |
| Near-black surface | `#1f1f1f` | dark panels/text |
| Deep dark | `#191919`, `#121212`, `#000` | hero gradient stops |
| Light text | `#f2f2f2` | body copy on dark |
| Muted light | `rgba(242,242,242,0.7)` / `0.5` | subtitles, secondary copy |
| Card muted gray | `#bab9b9` | service-card paragraph |
| White | `#fff` | headings on dark, hero title |

Hero background gradient: `linear-gradient(#464646 0%, #191919 60.54%, #000 100%)`.

## Typography

- **Family:** `"Poppins", sans-serif` everywhere.
- **Hero title** (`.slide-1 .text .title`): weight **900**, white, `drop-shadow(0 0 .5rem black)`. Scales responsively: 50px → 70px → 110px → **150px**. Has a duplicated outlined-stroke layer (`-webkit-text-stroke: 2px #fff`, transparent fill) for the word "Gaming".
- **Hero subtitle** (`.subtitle`): weight **800**, white, huge — 82px → 122px → 182px → **272px**, with `drop-shadow(0 1rem 2rem black)`.
- **Hero eyebrow** (`h3`): 16px → 22px → 30px, capitalized, white.
- **Section titles:** Bulma `.title` — default `hsl(0,0%,21%)`, weight 600, but overridden to `#fff` on dark sections.
- **Tabs:** 16px, scaling to 24px on large screens.
- **Body / cards:** 16px, weight 300 (light) for paragraphs; card headings weight 500 with dark text-shadow.
- Mobile clamp: `.title.is-1` → 2rem, `.subtitle.is-4` → 1rem below 690px.

## Layout & Structure

Single-page (`index.html`) built from stacked full-width `.section.is-medium` blocks, most with a dark background image. Max container width widens to **1690px** on very large screens (`≥1408px`).

Section order on the homepage:

1. **Navbar** — fixed-top, dark. Brand logo scales 1.05 on hover (bouncy cubic-bezier). Active link goes bold. `navbar-start` pushed right (`margin-left:auto`). Responsive nav tightening between 1024–1215px to prevent wrapping.
2. **Hero slider** (`#home`) — full height (`calc(100dvh - 101px)`), gradient bg, giant stacked title + subtitle, red brushstroke image (`red-mark.png`) behind text, and **5 floating game-cover cards** (warzone, dota, csgo, valorant, apex) absolutely positioned at varied rotations (−25° to +20°), each with `border-radius:20px` and a soft `box-shadow`. Cards hidden on mobile, scaled up progressively on larger breakpoints.
3. **Hideouts / Cafés** (`#cafe`, `.section.hideouts`) — "Our Gaming Cafés". Carousel of location photos (`border-radius:1.5rem`, 300px, object-fit cover) + translucent info cards (`rgba(0,0,0,0.35)`, rounded 1.5rem) with Material icon + red icon color.
4. **About** (`#about`, `.section.about`) — background image, glass `.about-card` (rounded 20px, `backdrop-filter:blur(14px)`). Vision + Mission cards.
5. **Offerings / Services** (`#services`, `.section.offering`) — 8 glass `.service-card`s (Gaming Café, Consoles, Racing Simulators, VR, Streaming Room, PC Building, Hardware Rentals, Events). Icons are `filter:invert(1)` at `opacity:0.2`, scaling to 1.1 on card hover. Includes **pill tabs** (`.cs-tabs`) and tab cards.
6. **Colosseum** (`.section.colosseum`, hidden by default) — Upcoming/Past/Tournaments tabs; events grid `repeat(2,1fr)` → `repeat(4,1fr)` at ≥640px.
7. **Brand integrations** (`.section.brand`) — background image, white 18px text, custom red round bullet list.
8. **Footer** — dark, logo hover-scale, social icons greyed (`filter:invert(9); opacity:.2`) turning into white circles on hover.

Other pages: **Rentals** (`rentals/`), **Community League** (`community-league/`), **Contact** (`contact.html`), **Franchise** (`franchise.html`).

## Components

### Buttons
- **Primary CTA:** `.button.is-primary.is-rounded` — bg `#ec1e24`, white text, fully rounded, semibold.
- **Secondary:** `.button.is-outlined.is-rounded` — transparent, bordered, rounded, semibold.

### Glassmorphism cards (service / about)
```css
background: rgba(0, 0, 0, 0.1);      /* about: 0.09 */
padding: 30px;
border-radius: 20px;                  /* service-card has no radius */
backdrop-filter: blur(14px);
border: 1px solid rgba(255,255,255,0.03);
box-shadow: 0 0 10px rgba(0,0,0,0.14);
```

### Pill tabs (`.cs-tabs`)
Inline rounded-full pills (`border-radius:50px`), translucent border, muted white text. Active state: red (`#ec1e24`) background + white text. Grow in padding/size at 769px and 1280px.

### Carousel controls (`.tns-controls`)
Hidden below 1024px. Prev/next arrows are transparent buttons positioned ±3rem outside the track, drawing Material Icons `arrow_back_ios` / `arrow_forward_ios` via `::after content`. Hover → `opacity:0.8`.

## Motion & Effects

- **Bouncy hover** on brand/logo: `transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s; transform: scale(1.05)`.
- **Service icon zoom:** `scale(1.1)` on card hover with the same bouncy easing.
- **Drop shadows** on hero text for legibility over imagery.
- **Text-stroke outline** technique for the layered "Gaming" hero word.

## Responsive Breakpoints (observed)

`640px` · `690px` (mobile clamps) · `768/769px` · `870px` · `1024px` (nav + carousel arrows appear, 100px fixed-nav padding) · `1215px` · `1280px` · `1360/1366px` · `1408px` (container → 1690px) · `1690px` (max hero scale + type sizes).

## Takeaways for a Redesign

- One saturated accent (`#ec1e24`) against near-black + white does the heavy lifting — keep accent usage disciplined (CTAs, active states, bullets, icon tints only).
- Oversized 800–900 weight display type is the signature; pair with light (300) body copy.
- Glassmorphism (`backdrop-filter: blur`) + rounded corners (20px / 1.5rem) define the card language.
- Depth comes from full-bleed dark background photos per section plus floating, rotated, shadowed imagery — not from flat fills.
