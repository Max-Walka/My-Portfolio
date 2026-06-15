# Max Walker Portfolio — Design System

> midnight gallery wall — black canvas, Syne display type, single crimson accent

**Theme:** dark

A developer portfolio built on a pure black canvas. Typography carries the personality — Syne 800 at large display sizes creates immediate impact, Inter 600 at micro-sizes (10–13px) handles all labels and metadata in the Studio HEED tradition. The single chromatic element is crimson (#e63329), used only for tech tags, the pulse dot, and link hover states. Everything else is achromatic. No gradients on UI surfaces, no drop shadows, no decorative chrome. Hairline borders (1px, rgba(255,255,255,0.08)) are the structural language. The constellation canvas in the hero adds technical depth without noise.

---

## Tokens — Colors

| Name        | Value                    | Token                 | Role                                                   |
| ----------- | ------------------------ | --------------------- | ------------------------------------------------------ |
| Void        | `#000000`                | `--color-void`        | Page canvas and hero background — pure black           |
| Surface     | `#0a0a0a`                | `--color-surface`     | Subtle card lift on dark sections if needed            |
| White       | `#ffffff`                | `--color-white`       | Primary text and borders                               |
| Muted       | `rgba(255,255,255,0.4)`  | `--color-muted`       | Body text, subtitles, descriptions                     |
| Faint       | `rgba(255,255,255,0.25)` | `--color-faint`       | Section numbers, meta keys, placeholder labels         |
| Hairline    | `rgba(255,255,255,0.08)` | `--color-hairline`    | All borders — section dividers, card edges, nav bottom |
| Crimson     | `#e63329`                | `--color-crimson`     | Accent — tech tags, pulse dot, link hovers only        |
| Crimson Dim | `#b32720`                | `--color-crimson-dim` | Crimson hover/pressed state                            |

**Rule:** Crimson appears in exactly four places: pulse dot, tech tag borders and text, link hover states, focus rings. Nowhere else.

---

## Tokens — Typography

### Syne — Display & Headings

- Weights: 700, 800
- Sizes: hero name (clamp 56px–96px), section headings (clamp 22px–32px), project titles (14px)
- Line height: 0.9 for hero, 1.1 for headings
- Letter spacing: -0.04em hero, -0.02em headings
- Role: The single emotional moment per section. Used with restraint.

### Inter — Everything Else

- Weights: 400, 500, 600
- Sizes: 10px (labels, keys), 11px (tags, hints), 12px (nav links, meta values), 13px (body, subtitle), 15px (nav name)
- Line height: 1.6–1.8 for body, 1.0 for labels
- Letter spacing: 0.12em on uppercase labels, 0.02em–0.04em on nav
- Role: The functional workhorse. Weight 600 at small sizes is the Studio HEED signature — authority through precision, not scale.

### Type Scale

| Role            | Font  | Size                     | Weight | Usage                              |
| --------------- | ----- | ------------------------ | ------ | ---------------------------------- |
| hero-name       | Syne  | clamp(56px, 10vw, 96px)  | 800    | MAX WALKER                         |
| section-heading | Syne  | clamp(22px, 3.5vw, 32px) | 700    | About, Projects                    |
| project-title   | Syne  | 14px                     | 700    | Carousel card titles               |
| nav-name        | Inter | 13px                     | 600    | Max Walker in nav                  |
| nav-link        | Inter | 12px                     | 600    | About, Projects, Contact           |
| eyebrow         | Inter | 11px                     | 600    | Full Stack Developer & AI Engineer |
| body            | Inter | 13px                     | 400    | Bio text                           |
| meta-key        | Inter | 10px                     | 600    | Degree, Location, etc.             |
| meta-value      | Inter | 12px                     | 600    | AUT, Auckland, etc.                |
| skill-tag       | Inter | 11px                     | 600    | Next.js, Python, etc.              |
| section-number  | Inter | 10px                     | 600    | 01, 02                             |
| project-num     | Inter | 10px                     | 600    | 01 / 07                            |
| project-cat     | Inter | 11px                     | 600    | RAG · MCP Server                   |
| tech-tag        | Inter | 10px                     | 600    | Python, FastAPI                    |
| hint            | Inter | 10px                     | 600    | Drag to explore →                  |

---

## Tokens — Spacing & Shape

**Base unit:** 4px

### Spacing

| Token          | Value | Usage                                              |
| -------------- | ----- | -------------------------------------------------- |
| `--spacing-4`  | 4px   | Tight gaps within components                       |
| `--spacing-6`  | 6px   | Tag gaps, small icon gaps                          |
| `--spacing-8`  | 8px   | Social icon gap, small internal gaps               |
| `--spacing-14` | 14px  | Carousel gap between tiles (Studio HEED heartbeat) |
| `--spacing-16` | 16px  | Section header gap                                 |
| `--spacing-20` | 20px  | Nav padding vertical                               |
| `--spacing-24` | 24px  | Skills section top margin                          |
| `--spacing-28` | 28px  | Nav link gap                                       |
| `--spacing-32` | 32px  | General 32px spacing (sections use `px-[4vw]`)      |
| `--spacing-40` | 40px  | About grid gap                                     |
| `--spacing-48` | 48px  | Section vertical padding                           |

### Border Radius

| Element          | Value | Note                    |
| ---------------- | ----- | ----------------------- |
| Cards / tiles    | 5px   | Architectural, not soft |
| Skill tags       | 5px   | Matches card language   |
| Tech tags        | 5px   | Matches card language   |
| Social icons     | 5px   | Matches card language   |
| Buttons (if any) | 999px | Pill only — reserved    |
| Everything else  | 0px   | Sharp                   |

**Rule:** 0px, 5px, or 999px only. Never 8px, 12px, or any other value.

### Borders

All borders are hairline: `1px solid rgba(255,255,255,0.08)`
Hover state: `1px solid rgba(255,255,255,0.25)`
Accent border (tech tags): `1px solid rgba(230,51,41,0.3)`
No shadows. No glow. No elevation.

---

## Layout

- **Page:** Single scrolling page, no routes
- **Width:** No max-width containers on any section — every section spans the full viewport width
- **Section padding:** 48px vertical, `px-[4vw]` horizontal
- **Nav padding:** 20px vertical, `px-[4vw]` horizontal
- **Hero min-height:** 380px, content aligned to bottom
- **About grid:** 1.2fr 1fr, 40px gap, stacks on mobile
- **Carousel:** Full bleed (margin 0 -4vw), tiles 220px wide, 140px image height, 14px gap

**Horizontal padding rule:** All sections use `px-[4vw]` horizontal padding to match the hero and nav. No max-width containers on any section. This applies to About, Projects, and any future sections.

---

## Components

### Nav

Flat. No background. No pill. No border-radius.

- Left: "Max Walker" — Inter 13px 600 white
- Right: "About", "Projects", "Contact" — Inter 12px 600 rgba(255,255,255,0.4), white on hover
- Bottom: 1px solid rgba(255,255,255,0.08)
- Padding: 20px vertical, `px-[4vw]` horizontal

### Hero

Pure black background (#000000) with constellation canvas behind all content. Content aligned to bottom of section.

- Eyebrow: Inter 11px 600 rgba(255,255,255,0.3) uppercase 0.12em tracking
- Name: Syne 800 clamp(56px,10vw,96px) white line-height 0.9 letter-spacing -0.04em
- Subtitle: Inter 13px 400 rgba(255,255,255,0.4)
- Bottom row: social icons left, pulse dot right
- Social icons: 30x30px, 5px radius, 1px hairline border, icon color rgba(255,255,255,0.4)
- Pulse dot: 6px circle, #e63329, CSS pulse animation, "Auckland, New Zealand" label in Inter 11px 600 rgba(255,255,255,0.3) uppercase

### Section Header Pattern

Used on About and Projects sections:

```
[section-number] [section-title (encrypted reveal)] [hairline extending to edge]
```

- Number: Inter 10px 600 rgba(255,255,255,0.25) uppercase 0.14em tracking
- Title: Syne 700 clamp(22px,3.5vw,32px) white — encrypted text component
- Line: flex:1 height 1px rgba(255,255,255,0.08)
- Gap between elements: 16px

### About Section

Two columns (1.2fr 1fr), 40px gap.

Left column:

- Bio text: Inter 13px 400 rgba(255,255,255,0.5) line-height 1.8
- Skills label: Inter 10px 600 rgba(255,255,255,0.25) uppercase 0.12em tracking
- Skill tags: Inter 11px 600 rgba(255,255,255,0.4), 1px solid rgba(255,255,255,0.1) border, 5px radius, 5px 10px padding, hover to white

Right column (meta table):

- Each row: flex space-between, padding 10px 0, border-bottom 1px rgba(255,255,255,0.06)
- Key: Inter 10px 600 rgba(255,255,255,0.25) uppercase 0.06em tracking
- Value: Inter 12px 600 white

### Project Tile (Carousel)

- Width: 220px fixed
- Border: 1px solid rgba(255,255,255,0.08), 5px radius
- Hover: border-color rgba(255,255,255,0.25)
- Image area: 140px height, dark gradient background, project label centered (Inter 10px 600 rgba(255,255,255,0.2) uppercase)
- Caption padding: 14px
- Project number: Inter 10px 600 rgba(255,255,255,0.2) uppercase, 6px margin-bottom
- Project title: Syne 700 14px white
- Category: Inter 11px 600 rgba(255,255,255,0.3) 0.04em tracking, 10px margin-bottom
- Tech tags: Inter 10px 600 #e63329, border 1px solid rgba(230,51,41,0.3), 5px radius, 2px 7px padding

### Constellation Canvas

- position: absolute inset-0 w-full h-full
- ~55 particles, random position and velocity
- Particle: white circle, r 0.4–1.6px, opacity 0.2
- Lines: drawn between particles within 110px distance, opacity scales with proximity (max 0.05)
- Speed: 0.25 max velocity — slow and ambient
- Bounces off edges
- Cleans up requestAnimationFrame on unmount

---

## Surfaces

| Level          | Value                  | Purpose                        |
| -------------- | ---------------------- | ------------------------------ |
| 0 — Void       | #000000                | Page canvas and hero           |
| 1 — Hairline   | rgba(255,255,255,0.08) | Section borders and card edges |
| 2 — Muted text | rgba(255,255,255,0.4)  | Body copy and subtitles        |
| 3 — Faint text | rgba(255,255,255,0.25) | Labels and meta keys           |
| 4 — White      | #ffffff                | Primary text                   |
| 5 — Crimson    | #e63329                | Accent only                    |

No surfaces are elevated. No shadows. Depth comes from tonal text contrast and hairline borders only.

---

## Do's and Don'ts

### Do

- Use Syne 800 for the hero name and Syne 700 for all section headings
- Use Inter 600 at 10–12px for all labels, keys, numbers, tags — the micro-weight signature
- Keep crimson (#e63329) strictly limited to: pulse dot, tech tag borders/text, link hover states
- Use 5px border-radius on all cards, tiles, tags, and icons — never deviate
- Separate every section with a 1px hairline border (rgba(255,255,255,0.08))
- Keep the constellation canvas low-opacity and slow — ambient, not distracting
- Use the encrypted text component on About and Projects headings only
- Stack the about grid vertically on mobile

### Don't

- Never add "open to work", "hire me", or job-hunting language anywhere
- Never use font weights above 800 or below 400
- Never use border-radius values other than 0px, 5px, or 999px
- Never add drop shadows, box shadows, or glow effects to any surface
- Never add gradients to UI elements (dark gradient backgrounds on project image placeholders only)
- Never introduce a second accent color
- Never use type sizes above 96px or below 10px
- Never use colored backgrounds on skill tags — border only
- Never add a sticky nav with background fill

---

## CSS Custom Properties

```css
:root {
  --color-void: #000000;
  --color-surface: #0a0a0a;
  --color-white: #ffffff;
  --color-muted: rgba(255, 255, 255, 0.4);
  --color-faint: rgba(255, 255, 255, 0.25);
  --color-hairline: rgba(255, 255, 255, 0.08);
  --color-crimson: #e63329;
  --color-crimson-dim: #b32720;

  --font-syne: "Syne", ui-sans-serif, system-ui, sans-serif;
  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius-sharp: 0px;
  --radius-card: 5px;
  --radius-pill: 999px;

  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-14: 14px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
}
```

## Tailwind v4

```css
@theme {
  --color-void: #000000;
  --color-surface: #0a0a0a;
  --color-crimson: #e63329;
  --color-crimson-dim: #b32720;

  --font-syne: "Syne", ui-sans-serif, system-ui, sans-serif;
  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius-card: 5px;
  --radius-pill: 999px;

  --spacing-14: 14px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-48: 48px;
}
```
