Max Walker — Portfolio CLAUDE.md
Project Overview
Personal developer portfolio website for Max Walker. Goal: clean, impressive, production-grade. Showcases projects and skills to potential employers. Not a job-hunting cry for help — the work speaks for itself.

Stack
LayerTechnologyFrameworkNext.js 15 (App Router)LanguageTypeScript — strict modeStylingTailwind CSS v4Componentsshadcn/uiAnimationsFramer Motion (motion/react)DeploymentVercel

Repository Layout
portfolio/
├── app/
│ ├── layout.tsx # Root layout, font imports
│ ├── page.tsx # Single page — all sections
│ └── globals.css # Tailwind v4 theme tokens
├── components/
│ ├── ui/ # shadcn + custom base components
│ │ ├── encrypted-text.tsx
│ │ └── constellation.tsx
│ ├── Nav.tsx
│ ├── Hero.tsx
│ ├── About.tsx
│ ├── Projects.tsx
│ └── Contact.tsx (if added)
├── lib/
│ └── utils.ts # cn() utility
├── public/
│ └── images/ # Project screenshots go here
├── CLAUDE.md
└── DESIGN.md

Fonts
Two fonts only — both loaded via next/font/google:

Syne — weights 700, 800. Used for: hero name, section headings, project titles
Inter — weights 400, 500, 600. Used for: everything else

Load in app/layout.tsx and pass as CSS variables (--font-syne, --font-inter).

Components
ConstellationBackground

Lives at components/ui/constellation.tsx
Pure canvas implementation — no external library
React component using useRef and useEffect
Props: particleCount (default 55), lineDistance (default 110), particleOpacity (default 0.2), lineOpacity (default 0.05)
Must clean up animation frame on unmount
Positioned absolute inset-0 w-full h-full inside a relative parent
Low opacity — it supports the hero, it does not compete with it

EncryptedText

Lives at components/ui/encrypted-text.tsx
Triggers on scroll into view (useInView, once: true)
Used on: About section heading, Projects section heading
NOT used on the hero name — hero name is static, large, immediate
Props already defined in the component — use as-is

ProjectCarousel

Auto-scrolls slowly, pauses on hover, drag to scrub
Handles any number of projects — never breaks layout
Each tile: 220px wide, 5px border-radius, hairline border
Project image area: 140px tall, dark gradient background (until real screenshots added)
Below image: project number, title (Syne), category, tech tags
Tags: crimson border, crimson text, transparent background, 5px radius

Hard Rules

TypeScript strict mode — no any, ever
No inline styles — use Tailwind classes only. Exception: canvas element styles
No external animation libraries except motion/react — no GSAP, no anime.js
No gradients on UI surfaces — dark section backgrounds only, not cards or nav
No drop shadows — depth comes from hairline borders and tonal contrast
No border-radius values except 0px, 5px, or 999px — the system is sharp, card, or pill only
Single page application — everything on one scrolling page, no routing needed
Mobile responsive — must work at 375px width minimum. Hero name scales down, carousel still scrolls, about grid stacks vertically
No placeholder text in final output — every string must be real content
Environment variables — none required for this project. No .env needed
Never commit node_modules — .gitignore covers this

Sections & Build Order
Build in this order:

Nav — name left, links right, flat, no background, no pill styling, hairline bottom border
Hero — constellation canvas behind, name large (Syne 800), one-line subtitle, social icons, Auckland pulse dot
About — two column: bio + skills left, meta table right. Encrypted reveal on heading
Projects — auto-scroll carousel. Encrypted reveal on heading
Wire encrypted text — add to section headings once structure is solid

Content
Hero

Name: MAX WALKER
Eyebrow: Full Stack Developer & AI Engineer
Subtitle: Building production-grade software.
Pulse dot label: Auckland, New Zealand
Social icons: LinkedIn, GitHub (icon only, link to real URLs)

About Bio
CS graduate from AUT with a focus on full stack development and AI engineering. I build production-grade software — from hand-rolled RAG pipelines and MCP servers to clinical tools deployed in real hospitals.
About Meta Table
KeyValueDegreeBSc Computer Science — AUTMajorSoftware Dev & CybersecurityLocationAuckland, New ZealandFocusFull Stack · AI Engineering
Skills
Next.js, React, TypeScript, Python, FastAPI, Supabase, PostgreSQL, pgvector, Docker, Tailwind, Node.js, MCP, RAG, Git, Linux
Projects (3 real, add more later)

DOCBase — RAG · MCP Server · Full Stack — Python, FastAPI, Next.js, pgvector
Graardor Sim — Web App · Live Data · Simulation — Next.js, TypeScript, Redis
SCI Assessment — Clinical Tool · Healthcare · Full Stack — React, Supabase, Vercel

Styling Conventions

Dark sections: background: #000000
Section borders: border-bottom: 1px solid rgba(255,255,255,0.08)
Muted text: rgba(255,255,255,0.4) or rgba(255,255,255,0.25)
Primary text: #ffffff
Accent: #e63329 (crimson) — used only on: tech tags, pulse dot, hover states on links
Nav links hover: white
Section numbers: rgba(255,255,255,0.25), 10px, uppercase, 0.14em tracking
Section headings: Syne 700, clamp(22px, 3.5vw, 32px)
All section padding: 48px 32px

What Claude Should Never Do

Never add "open to work" or job-hunting language anywhere
Never use font weights above 800 or below 400
Never use more than two accent colors (white and crimson only)
Never add decorative gradients, glows, or shadows to UI surfaces
Never create additional pages or routes
Never install LangChain, LlamaIndex, or any AI framework
Never use console.log in production code
Never leave TODO comments in final output
Never use placeholder lorem ipsum text

---

## Current State & Session Notes (updated 2026-06-15)

**Build status:** All four sections are built and wired into `app/page.tsx` (Nav → Hero → About → Projects). `EncryptedText` and the constellation canvas are fully implemented. Site typechecks clean (`tsc --noEmit`) and builds. There is **no Contact section/route** — contact info lives in About.

**Intentional deviations from the spec above** (these supersede the earlier sections where they conflict — confirmed with the user):

- **Layout / padding:** No max-width containers. Every section is full-bleed and uses `px-[4vw]` horizontal padding (not `px-32`/32px). Nav, Hero, About, Projects share the `4vw` left edge. DESIGN.md has been updated to match.
- **Nav:** Sticky (`sticky top-0 z-50`) with a solid `bg-void` fill — this deliberately overrides the "never a sticky nav with background fill" rule, since content scrolls behind it. Edge-to-edge `px-[4vw]`. The "Max Walker" link is a client `onClick` that smooth-scrolls to the absolute top (`window.scrollTo`). Links: About, Projects only.
- **Hero:** Name on two lines (MAX / WALKER), `clamp(64px,10vw,120px)`, bottom-aligned (`justify-end`). Social icons use **react-icons** (`FaLinkedinIn`, `FaGithub`), not lucide. `EncryptedText` IS used on the hero name (Max, then Walker, sequenced via `startDelayMs`) — overrides the original "NOT on the hero name" rule, per explicit user request.
- **About:** Two-column flex (left `flex-1` bio + skills, right `w-64` meta `<dl>`). Skill tags now match the project tech-tag style (crimson border + crimson text, transparent). A **Contact block** sits at the bottom of the left column: hairline divider, "Contact" label, then email / LinkedIn / GitHub plain-text links (Inter 12px 600 white/40 → white).
- **Projects:** Single full-bleed **infinite carousel** (one row, not the original tile carousel). Driven by `transform: translate3d` (NOT `scrollLeft` — scrollLeft rounds to whole px and stalls/jumps; transform is sub-pixel and seamless). Cards `w-[64vw]` (~1.5 visible), image area `h-[60vh]` `object-cover object-top` on `bg-[#0a0a0a]`. **Click toggles play/pause; drag scrubs; hover does nothing.** Section is `h-[calc(100vh-64px)]` + `scroll-mt-[64px]` so the Projects header is the scroll floor. `SPEED`/`GAP` consts at the top control motion. Single `projects` array, important-first; some entries are clearly-labelled dummy projects for testing.

**Current real content (overrides the Content section above):**
- Bio mentions "small business websites" (no longer "clinical tools / hospitals").
- Projects: DOCBase, OSRS Loot Simulator, Spinal Cord Injury Assessment Tool, PipeWorks Plumbing (+ Atlas Analytics / Forge CMS dummies).
- Contact: email `walkermax193@gmail.com`, LinkedIn `https://www.linkedin.com/in/maxwalker1998/`, GitHub `https://github.com/Max-Walka`.
- Project screenshots go in `public/images/`, referenced via the optional `image` field on a project (e.g. `/images/DOCBaseUI.PNG`). Filenames are **case-sensitive** in production (Linux/Vercel).

**Dependencies:** Next pinned to **15.5.19** (patched CVE-2025-66478). Added **react-icons**. `motion` (Framer Motion), Tailwind v4, `lucide-react` also installed.

**Dev / workflow gotchas:**
- Work on the **`dev`** branch, merge to **`main`**; both push to `origin`. `node_modules`, `.next`, `dev.log`, `next-env.d.ts` are gitignored — never commit them (a past incident committed `node_modules` and broke the repo).
- **Never run `npm run build` while `next dev` is running** — they share `.next`; the build clobbers the dev server's chunks and the page 404s / renders unstyled. Stop dev first.
- If the editor flags errors on every JSX line, `node_modules` is missing/broken — run `npm install` and restart the TS server.
