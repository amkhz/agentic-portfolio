# Product Manifest — agentic-portfolio

Generated: 2026-04-14 | Files inventoried: 95 source + config | Investiture v1.5

---

## 1. File Tree

### design-system/

```
tokens.css                     — CSS custom properties: dark/light palettes, shadows, constellation, animation, texture tokens (OKLCH)
```

### core/content/

```
ai-leadership.md               — Case study: AI-powered leadership development platform
building-this-portfolio.md      — Meta case study: constellation-format narrative of building this portfolio
instant-doc-review.md           — Case study: instant document review tool
instant-sow.md                  — Case study: instant statement of work generator
the-craft.md                    — Constellation node content: design craft philosophy
the-sound.md                    — Constellation node content: sound/music integration
the-system.md                   — Constellation node content: design system thinking
voice-profile.md                — Constellation node content: writing voice and persona
drafts/the-evolution-draft.md   — Draft constellation node: evolution/growth narrative
drafts/the-evolution-notes.md   — Working notes for the evolution node
case-studies.ts                 — Type definitions for case study sections; exports parsed content indexed by slug
case-studies.test.ts            — Tests: content coverage, structure validation, section type contracts
codex.ts                        — Groups flat sections into chapters with heading-derived IDs, override support
codex.test.ts                   — Tests: heading-to-kebab, chapter grouping, preamble extraction
constellation.ts                — Pure data + seeded radial layout algorithm for spatial node navigation
constellation.test.ts           — Tests: node positioning, boundary clamping, deterministic seeding
lastfm.ts                       — Type-only definitions for Last.fm data (Track, NowPlayingData)
parse-case-study.ts             — Markdown parser: fence-based syntax to typed CaseStudySection arrays
resume.ts                       — Resume model parser: Markdown to structured header/experience/skills/education
```

### core/tokens/

```
index.ts                        — Design system source of truth (JS): colors, typography, spacing, motion, shadows, case study metadata
tokens.test.ts                  — Tests: token structure validation, case study metadata presence/uniqueness
```

### core/utils/

```
format.ts                       — Utility functions: formatDate, slugify, truncate, debounce
index.ts                        — Re-exports cn() (clsx + tailwind-merge)
utils.test.ts                   — Tests: cn, formatDate, slugify, truncate, debounce edge cases
```

### services/

```
analytics.ts                    — Re-exports Vercel Analytics and SpeedInsights components
lastfm.ts                       — Last.fm API: fetches now-playing/recent tracks with metadata parsing
```

### src/

```
main.tsx                        — Entry point: BrowserRouter, HelmetProvider, ThemeProvider, font imports
App.tsx                         — React Router: 6 routes nested under Layout
```

### src/layouts/

```
Layout.tsx                      — Shell: Header, Footer, ScrollToTop, GrainOverlay, Analytics, SpeedInsights
```

### src/pages/

```
HomePage.tsx                    — Landing: hero, featured meta case study spotlight, selected work grid, about snippet
AboutPage.tsx                   — Profile: portrait card, bio, beliefs section, contact buttons
WorkPage.tsx                    — Gallery: featured meta case study + 3-column case study card grid
CaseStudyPage.tsx               — Dynamic: fetches by slug, renders constellation or standard template
ResumePage.tsx                  — Resume: async Markdown loading, download PDF, structured sections
NotFoundPage.tsx                — 404: decorative glow, link home
```

### src/components/content/

```
Hero.tsx                        — Full-width hero with animated particles background, heading, CTA
AboutSnippet.tsx                — Profile card with bio and CTA button
ProjectCard.tsx                 — Case study link card with hero image, title, metric badge, tags
CaseStudyPage.tsx               — Linear case study template: hero, breadcrumb, tags, rendered sections
CodexPage.tsx                   — Multi-chapter case study with expandable spine navigation
CodexSpine.tsx                  — Interactive vertical accordion with spine line and staggered entrance
CodexChapter.tsx                — Collapsible chapter section with grid animation and connections
CodexNode.tsx                   — Expandable chapter button with rotating diamond marker
ConstellationPage.tsx           — Spatial case study container: dual-column grid, mobile strip, hash navigation
ConstellationField.tsx          — SVG node field with animated connection lines and position tuning
ConstellationNode.tsx           — Positioned node marker with size/status styling and drag-to-tune
ConstellationContent.tsx        — Rich section renderer for constellation nodes with connection peeks
ConstellationStrip.tsx          — Mobile horizontal dot strip for node selection
ConnectionPeek.tsx              — Inline peek button into connected nodes with hover effects
SectionHeading.tsx              — Flexible heading (h2/h3) with display typography
TextBlock.tsx                   — Paragraph block splitting on double-newlines with inline parsing
ImageBlock.tsx                  — Responsive image with aspect ratio, lightbox, lazy loading
ImageLightbox.tsx               — Full-screen modal image viewer with backdrop close
MetricCard.tsx                  — Animated count-up metric display with accent variants
MetricGrid.tsx                  — Responsive 3-column metric grid container
CalloutBlock.tsx                — Highlighted callout text with optional label
ComparisonBlock.tsx             — Side-by-side before/after image comparison
QuoteBlock.tsx                  — Blockquote with accent border, attribution, role
renderSection.tsx               — Utility dispatching section types with reveal animations
```

### src/components/content/resume/

```
ResumeHeader.tsx                — Name, title, contact links
ResumeSection.tsx               — Section container with bordered title
ResumeExperienceItem.tsx        — Experience card: role, company, date, achievements
ResumeSkillGroup.tsx            — Skill category with label and items list
```

### src/components/effects/

```
CountUp.tsx                     — Scroll-triggered animated number counter with spring physics
DecryptedText.tsx               — Character-by-character scramble reveal with a11y fallback
GlowEffect.tsx                  — Configurable radial gradient glow overlay (brass/magenta)
GrainOverlay.tsx                — SVG fractal noise grain filter applied full-screen
Particles.tsx                   — WebGL point cloud with Perlin motion and hover tracking (ogl)
ParticlesTuner.tsx              — Dev-only slider panel for tuning Particles parameters
ProfileCard.tsx                 — 3D tilt card with pointer-driven parallax and holographic shine
tiltEngine.ts                   — Pointer-driven tilt physics engine extracted from ProfileCard
RevealOnScroll.tsx              — Intersection-triggered fade-in with blur transition
SpotlightCard.tsx               — Mouse-tracked radial light effect over card
Threads.tsx                     — WebGL animated line threads with Perlin noise (ogl)
```

### src/components/interactive/

```
Button.tsx                      — Polymorphic button/anchor with 3 variants (primary/secondary/ghost)
NowPlaying.tsx                  — Last.fm now-playing indicator with expandable panel and EQ bars
Tag.tsx                         — Capsule badge with default/highlight tone variants
ThemeToggle.tsx                 — Dark/light toggle with adaptive SVG icon
```

### src/components/layout/

```
Container.tsx                   — Responsive max-width (1200px) wrapper with semantic tag support
Header.tsx                      — Sticky nav: logo, nav links (active state), theme toggle, now-playing
Footer.tsx                      — Footer with nav links, colophon, accent divider
ScrollToTop.tsx                 — Route change scroll-to-top listener (renders null)
```

### src/lib/

```
parseInline.tsx                 — Markdown inline text (bold/links) to React nodes
site-metadata.ts                — Site URL from Vite env or window.location.origin
useNowPlaying.ts                — Hook polling Last.fm API every 30s with visibility check
useTheme.ts                     — Theme context hook with toggle function
```

### src/providers/

```
ThemeProvider.tsx                — Dark/light state with cookie persistence, system preference sync
```

### src/styles/

```
globals.css                     — Tailwind import, theme variable mappings, keyframes, focus/transition styles
```

### scripts/

```
generate-favicons.ts            — Generates favicon.ico and apple-touch-icon.png with JH monogram
generate-og-images.ts           — Generates 1200x630 OG image with Satori + sharp
generate-sitemap.ts             — Generates sitemap.xml with static + dynamic case study routes
install.sh                      — Cross-platform setup: Git, Node.js, npm deps, Claude Code, skills
preflight.sh                    — Verification: Node 20+, npm, Git, deps, doctrine files, Claude Code
setup-skills.sh                 — Symlinks .claude/skills/ and .cursor/skills/ to .agents/skills/
start.sh                        — Launches Vite dev + Claude Code with auto-cleanup
```

### public/

```
1pageresume.md                  — One-page resume in Markdown (fetched by ResumePage)
2pageresume.md                  — Two-page resume in Markdown
favicon.ico                     — Generated favicon
favicon.png                     — Favicon source
apple-touch-icon.png            — iOS home screen icon
robots.txt                      — Crawler rules
sitemap.xml                     — Generated sitemap
resume/justin-hernandez-resume-1page.pdf — Downloadable PDF resume
images/                         — 29 static images: case study screenshots, about photo, logos
```

### Root config

```
package.json                    — Dependencies, scripts (dev/build/test/lint/preview)
package-lock.json               — Lock file
tsconfig.json                   — Strict TS, ES2022, path aliases (@/, @core, @services, @design-system)
vite.config.ts                  — React + Tailwind plugins, path aliases, port 5173
vercel.json                     — SPA rewrite rule (all paths to index.html)
eslint.config.js                — TS + React Hooks + React Refresh
index.html                      — HTML template with theme detection script
```

---

## 2. Architecture Overview

**agentic-portfolio** is a single-page application serving Justin Hernandez's design portfolio. It is built for hiring managers, design leads, and collaborators evaluating design and technical capabilities. The site showcases case studies in three presentation formats: linear pages, expandable codex (accordion spine), and a spatial constellation field.

**Stack:** React 19 + Vite 6 + TypeScript (strict) + Tailwind v4 + React Router v7. Deployed to Vercel. No backend, no database, no auth. Content is Markdown parsed at build time.

**Architecture:** Four-layer system enforced by ARCHITECTURE.md:
- **design-system/** — CSS custom properties (OKLCH), the visual source of truth
- **core/** — Pure functions, data models, content parsing, design tokens (JS). No DOM access.
- **services/** — External API communication (Vercel analytics, Last.fm)
- **src/** — UI components only. Imports from the other three layers.

**Entry point:** `index.html` → `src/main.tsx` → `src/App.tsx` (router) → `src/layouts/Layout.tsx` (shell)

---

## 3. Pages & Routes

| Path | Component | Purpose | Auth |
|------|-----------|---------|------|
| `/` | HomePage | Landing: hero, featured work spotlight, selected projects, about snippet | Public |
| `/about` | AboutPage | Profile: portrait card, bio, beliefs, contact | Public |
| `/work` | WorkPage | Gallery: all case studies in card grid | Public |
| `/work/:slug` | CaseStudyPage | Dynamic case study (constellation or linear template) | Public |
| `/resume` | ResumePage | Resume from Markdown with PDF download | Public |
| `*` | NotFoundPage | 404 error page | Public |

---

## 6. Components

| Component | Lines | Purpose | Key Props | State |
|-----------|-------|---------|-----------|-------|
| Hero | 44 | Landing hero with particles | — | No |
| AboutSnippet | 44 | Profile card + CTA | — | No |
| ProjectCard | 98 | Case study link card | study | No |
| CaseStudyPage (content) | 101 | Linear case study template | slug | No |
| CodexPage | 134 | Multi-chapter case study | slug | Yes |
| CodexSpine | 165 | Vertical accordion spine | chapters | Yes |
| CodexChapter | 91 | Collapsible chapter | id, isOpen, sections | No |
| CodexNode | 130 | Expandable chapter button | id, title, isOpen | No |
| ConstellationPage | 252 | Spatial case study shell | slug | Yes |
| ConstellationField | 277 | SVG node field | nodes, selectedId | Yes |
| ConstellationNode | 135 | Positioned node marker | node, isSelected | No |
| ConstellationContent | 214 | Node content renderer | node, sections | No |
| ConstellationStrip | 91 | Mobile node strip | nodes, selectedId | No |
| ConnectionPeek | 68 | Inline peek to connected node | targetNode, tease | No |
| SectionHeading | 12 | Flexible h2/h3 | children, as | No |
| TextBlock | 22 | Paragraph text | children | No |
| ImageBlock | 118 | Image with lightbox | src, alt, expandable | Yes |
| ImageLightbox | 66 | Fullscreen image modal | src, alt, onClose | No |
| MetricCard | 56 | Animated metric display | value, label, accent | No |
| MetricGrid | 11 | 3-column metric container | children | No |
| CalloutBlock | 29 | Highlighted callout | label, body | No |
| ComparisonBlock | 56 | Before/after comparison | before, after | No |
| QuoteBlock | 26 | Blockquote with attribution | text, attribution | No |
| renderSection | 129 | Section type dispatcher | section, index | No |
| CountUp | 130 | Animated number counter | to, from, duration | Yes |
| DecryptedText | 127 | Scramble reveal text | text, speed | Yes |
| GlowEffect | 49 | Radial gradient glow | color, size | No |
| GrainOverlay | 56 | SVG grain filter overlay | — | No |
| Particles | 247 | WebGL point cloud (ogl) | particleCount, speed | Yes |
| ParticlesTuner | 204 | Dev-only particle tuner | className | Yes |
| ProfileCard | 431 | 3D tilt card with parallax | avatarUrl, enableTilt | Yes |
| RevealOnScroll | 65 | Intersection fade-in | children, delay | Yes |
| SpotlightCard | 66 | Mouse-tracked light effect | children, spotlightColor | Yes |
| Threads | 210 | WebGL line threads (ogl) | color, amplitude | Yes |
| Button | 70 | Polymorphic button/anchor | variant, href | No |
| NowPlaying | 187 | Last.fm now-playing | className | Yes |
| Tag | 29 | Capsule badge | children, tone | No |
| ThemeToggle | 71 | Dark/light toggle | className | No |
| Container | 25 | Max-width wrapper | children, as | No |
| Header | 58 | Sticky nav bar | — | No |
| Footer | 57 | Footer with links | — | No |
| ScrollToTop | 13 | Route change scroll reset | — | No |
| ResumeHeader | 48 | Resume name + contacts | name, title, contacts | No |
| ResumeSection | 15 | Resume section container | title, children | No |
| ResumeExperienceItem | 41 | Experience card | item | No |
| ResumeSkillGroup | 19 | Skill category list | group | No |

---

## 7. Hooks / Services / Utilities

| Module | Purpose | Returns/Exports | Consumed By |
|--------|---------|-----------------|-------------|
| `useTheme` | Dark/light theme context | `{ theme, toggleTheme }` | ThemeToggle, ThemeProvider |
| `useNowPlaying` | Last.fm polling (30s) | `{ track, isPlaying }` | NowPlaying |
| `parseInline` | Markdown inline to React | React nodes | TextBlock, CalloutBlock, content components |
| `getSiteUrl` | Site URL from env | string | OG generation, metadata |
| `cn` | clsx + tailwind-merge | string | Most components |
| `formatDate` | Date formatting | string | Resume, content display |
| `slugify` | Text to kebab-case | string | Codex chapter IDs |
| `truncate` | Truncate with ellipsis | string | Content display |
| `debounce` | Timer-based delay | debounced function | Event handlers |
| `services/analytics` | Vercel tracking | Analytics, SpeedInsights | Layout |
| `services/api` | HTTP client | get, post, put, del | Services layer |
| `services/lastfm` | Last.fm API | fetchNowPlaying | useNowPlaying |

---

## 8. Configuration & Environment

| Variable/File | Purpose | Required |
|---------------|---------|----------|
| `VITE_LASTFM_API_KEY` | Last.fm API key for now-playing | Optional (feature degrades gracefully) |
| `VITE_SITE_URL` | Canonical site URL | Optional (falls back to window.location) |
| `VITE_API_BASE_URL` | Base URL for API service | Optional (unused in current features) |
| `tsconfig.json` | TypeScript strict mode, path aliases | Required |
| `vite.config.ts` | React + Tailwind plugins, aliases | Required |
| `vercel.json` | SPA rewrite rule | Required for deployment |
| `eslint.config.js` | Lint rules | Required for lint gate |

---

## 9. Feature Inventory

### Navigation & Layout
- **Sticky header** with logo, nav links (active state), theme toggle, now-playing — Working
- **Footer** with nav links, colophon — Working
- **Dark/light theme** with cookie persistence, system preference sync — Working
- **Scroll to top** on route change — Working
- **Skip-to-main** accessibility link — Working

### Home Page
- **Animated hero** with WebGL particles background — Working
- **Featured meta case study spotlight** — Working
- **Selected work grid** (3 cards) — Working
- **About snippet** with CTA — Working

### Case Studies
- **Linear template** with hero, breadcrumb, tags, rendered sections — Working
- **Codex template** with expandable spine accordion, chapter navigation — Working
- **Constellation template** with SVG spatial field, connection lines, node selection — Working
- **Mobile constellation strip** for small screens — Working
- **Hash-based deep linking** to constellation nodes and codex chapters — Working
- **Connection peeks** between related nodes — Working
- **Section types:** text, image, metrics, comparison, quote, callout — All working

### Content (6 case studies)
- `building-this-portfolio` — Meta case study (constellation format) — Working
- `ai-leadership` — AI leadership platform — Working
- `instant-doc-review` — Document review tool — Working
- `instant-sow` — Statement of work generator — Working
- Constellation nodes: the-craft, the-sound, the-system, voice-profile — Working
- Draft: the-evolution — In progress

### Effects & Polish
- **Grain overlay** (SVG fractal noise) — Working
- **Glow effects** (brass/magenta radial gradients) — Working
- **Reveal on scroll** with blur transition — Working
- **Spotlight card** (mouse-tracked light) — Working
- **Profile card** with 3D tilt, parallax, holographic shine — Working
- **Decrypted text** scramble reveal — Working
- **Count-up** animated metrics — Working
- **Image lightbox** — Working
- **Particles tuner** (dev-only) — Working

### Integrations
- **Last.fm now-playing** with 30s polling, expandable panel, EQ bars — Working
- **Vercel Analytics** — Working
- **Vercel Speed Insights** — Working

### Resume
- **Async Markdown resume** with loading skeleton — Working
- **PDF download** — Working
- **Structured sections:** experience, education, skills, professional development — Working

### SEO & Assets
- **Generated sitemap** with static + dynamic routes — Working
- **Generated OG images** (Satori + sharp) — Working
- **Generated favicons** — Working
- **react-helmet-async** for per-page meta tags — Working

### Developer Experience
- **Particles tuner** panel for dev-mode parameter tuning — Working
- **Constellation tune mode** for dragging node positions — Working
- **Path aliases** (@/, @core, @services, @design-system) — Working
- **5 test suites** in core/ (content, tokens, utils) — Working
- **Lint + build gates** — Working

---

Files inventoried: 95
Sections produced: File Tree, Architecture, Routes, Components, Hooks/Services/Utilities, Configuration, Feature Inventory
Project type: Single-page design portfolio (React SPA, no backend)
