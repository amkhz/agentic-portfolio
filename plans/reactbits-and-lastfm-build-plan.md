# React Bits + Last.fm Build Plan

> Combined build plan for the animation layer and music integration. Two branches, sequenced so Phase 1 outputs feed Phase 2.

**Created:** 2026-03-06
**Branches:** `feature-reactbits` (Phase 1), `feature-lastfm` (Phase 2)

---

## Phase 1: Animation Layer (`feature-reactbits`)

### 1.0 Setup: React Bits MCP Server

**What:** Configure the `reactbits-mcp-server` so Tyrell can query components, pull TS+Tailwind source code, and view demos directly during the build session.

**Steps:**
- Add MCP server config to Claude Code settings:
  ```json
  "reactbits": {
    "command": "npx",
    "args": ["reactbits-dev-mcp-server"],
    "env": { "GITHUB_TOKEN": "<token>" }
  }
  ```
- Verify connectivity: list categories, search a component, pull source code
- The GitHub token is optional (60 req/hr without, 5,000/hr with). For a multi-component build session, the token is worth having.

**Why first:** Having the MCP server active means we pull component code directly into the codebase instead of copy-pasting from the browser. Faster iteration, fewer transcription errors.

---

### 1.1 Zero-Dependency Components

**Goal:** Establish the animation layer with components that add zero bundle weight.

**Components to adopt (in order):**
| Component | Use Case | Customization |
|-----------|----------|---------------|
| **Magnet** | Magnetic hover on ProjectCards | `magnetStrength`, `padding` |
| **SpotlightCard** | Cursor-following glow on cards | `spotlightColor` set to brass `rgba(200,149,106,0.15)` |
| **GlitchText** | Accent text, labels, headings | Requires 2 Tailwind keyframes |
| **ClickSpark** | Global click micro-interaction | `sparkColor` set to brass |
| **ElectricBorder** | Featured card/section borders | `color` set to brass or magenta, canvas-based |
| **Noise** | Animated grain overlay | `patternAlpha`, `patternRefreshInterval`. Evaluate as GrainOverlay replacement |

**Process for each component:**
1. Query MCP server: `get_component` with style=tailwind
2. Drop into `src/components/effects/`
3. Replace any hardcoded colors with token CSS variables
4. Verify `prefers-reduced-motion` is respected (add if missing)
5. Test in dev, check Lighthouse impact

**Architecture layers touched:**
- `design-system/tokens.css` -- animation timing tokens if needed
- `src/components/effects/` -- new components
- `src/components/content/` or `src/components/interactive/` -- integrate Magnet/SpotlightCard into existing cards

---

### 1.2 GSAP Scroll Animations

**Goal:** Replace or enhance RevealOnScroll with cinematic scroll-triggered animations.

**New dependency:** `gsap` + `ScrollTrigger` plugin (~30KB gzipped)

**Components:**
| Component | Use Case | Replaces |
|-----------|----------|----------|
| **ScrollFloat** | Hero headings, section titles | -- |
| **ScrollReveal** | Case study section intros (word-level blur + rotation) | -- |
| **AnimatedContent** | Generic scroll entrance wrapper | RevealOnScroll |

**Decision needed:** Do we replace RevealOnScroll entirely with AnimatedContent, or keep both? AnimatedContent is more configurable (direction, scale, ease, disappearAfter). Recommend replacing once we confirm feature parity.

**Architecture layers touched:**
- `design-system/tokens.css` -- scroll animation timing tokens
- `src/components/effects/` -- new components, potentially deprecate RevealOnScroll

---

### 1.3 Dev Tuning Panel

**Goal:** Build a dev-only animation tuning UI so Justin can fine-tune animation variables in real-time.

**Architecture:**
- `core/dev/tuning-schema.ts` -- parameter definitions (pure data, no DOM)
- `src/components/dev/TuningPanel.tsx` -- floating panel component
- Conditionally rendered via `import.meta.env.DEV` (zero bytes in production)

**Capabilities:**
- Reads/writes CSS custom properties via `document.documentElement.style.setProperty()`
- Tailwind v4 picks up changes instantly (runtime CSS variable resolution)
- Sliders for timing, easing, distances; color pickers for accents
- Toggle with `Ctrl+Shift+D`
- "Copy as CSS" button to export tuned values back to tokens
- "Reset" button to restore defaults
- Collapsible, draggable, stays out of the way

**Schema pattern:**
```typescript
export const tunableParams = [
  { key: '--animation-reveal-duration', label: 'Reveal Duration', type: 'range', min: 200, max: 1500, step: 50 },
  { key: '--animation-reveal-distance', label: 'Reveal Distance', type: 'range', min: 8, max: 64, step: 4 },
  { key: '--glow-opacity', label: 'Glow Opacity', type: 'range', min: 0, max: 1, step: 0.05 },
  // Add params as we adopt components
] as const;
```

**Why here in the sequence:** Build the panel after 1.1 and 1.2 so we have real animations to tune. Then use it to dial in every subsequent component.

---

### 1.4 Motion Components

**Goal:** Add Framer Motion-powered components for text reveals and metric animations.

**New dependency:** `motion` (Framer Motion, ~15KB gzipped)

**Components:**
| Component | Use Case |
|-----------|----------|
| **DecryptedText** | Track name reveal in NowPlaying, project titles, stat labels |
| **CountUp** | Metric cards, listening stats |
| **AnimatedList** | Case study section navigation, project lists |

**Architecture layers touched:**
- `src/components/effects/` -- new components
- `src/components/content/MetricCard.tsx` -- integrate CountUp

---

### 1.5 Quality Gate

Before merging `feature-reactbits`:
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Lighthouse performance > 90
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No raw color values (token colors only)
- [ ] WCAG 2.2 AA maintained
- [ ] Every new file documented with its architectural layer

---

## Phase 2: Last.fm Tier 1 (`feature-lastfm`)

### 2.0 API Proxy: Vercel Serverless Function

**What:** Create a serverless function that proxies Last.fm API calls, keeping the API key server-side.

**Why Vercel:** The site is already deployed on Vercel (confirmed by `vercel.json` SPA rewrites, `@vercel/analytics` in bundle). Adding an `api/` directory to the project root gives us same-origin serverless functions with zero CORS config. No new accounts, no new deploys.

**Implementation:**
- `api/lastfm.ts` at project root (Vercel convention, auto-deployed)
- Environment variables `LASTFM_API_KEY` and `LASTFM_USER` set in Vercel dashboard
- Supports `method` query param to select Last.fm API method
- `Cache-Control: public, max-age=15` for edge caching
- Input validation on allowed methods (whitelist `user.getRecentTracks` etc.)

**Local development:**
- `vite.config.ts` `server.proxy` forwards `/api/lastfm` to Last.fm directly (with key from `.env.local`)
- `.env.local` added to `.gitignore` (should already be there)

**Fallback noted:** If we ever leave Vercel, Cloudflare Workers is a 20-minute migration (100K req/day free, edge latency, ~30 lines of code).

**Architecture layers touched:**
- `api/lastfm.ts` -- Vercel serverless function (project root, outside the four layers by necessity)
- `services/lastfm.ts` -- client-side service wrapper (the proper services/ layer)
- `vite.config.ts` -- dev proxy config

---

### 2.1 Service Layer

**What:** Client-side service wrapper in `services/lastfm.ts`.

**Exports:**
```typescript
type NowPlayingData = {
  isPlaying: boolean;
  track: { name: string; artist: string; album: string; albumArt: string; url: string } | null;
  recentTracks: Track[]; // for idle state
};

function fetchNowPlaying(): Promise<NowPlayingData>;
```

**Architecture layers touched:**
- `services/lastfm.ts` -- new file
- `core/content/` -- TypeScript types for Last.fm data if needed

---

### 2.2 NowPlaying Hook

**What:** `src/lib/useNowPlaying.ts` -- custom hook that polls `services/lastfm.ts`.

**Behavior:**
- Polls every 30 seconds (configurable)
- Returns `{ data: NowPlayingData, isLoading, error }`
- Pauses polling when tab is not visible (`document.hidden`)
- Graceful degradation: if API fails, shows last known state

---

### 2.3 NowPlaying Component

**What:** `src/components/interactive/NowPlaying.tsx`

**States:**
- **Playing:** Album art (small luminous square), track name (DecryptedText reveal), artist, subtle pulse/glow
- **Idle:** "Lately listening to" with last track or small album art stack, dimmer glow
- **Error/Loading:** Graceful fallback, no layout shift

**Design direction:**
- Filament metaphor: glows warm when music is flowing, dims when idle
- Album art is the only photographic element in the UI
- Token colors for text and borders; album art provides its own color
- `prefers-reduced-motion`: static glow, no pulse

**Placement:** Start with fixed bottom-right corner. Expands on hover/tap. Collapses on mobile. Prototype alternatives if time permits.

**Animation integration from Phase 1:**
- DecryptedText for track name reveal on song change
- GlowEffect (existing) or SpotlightCard for the warm glow
- Magnet for subtle hover pull

**Architecture layers touched:**
- `design-system/tokens.css` -- NowPlaying-specific tokens (glow intensity, pulse timing)
- `src/components/interactive/NowPlaying.tsx` -- new component
- `src/lib/useNowPlaying.ts` -- new hook
- `src/layouts/Layout.tsx` -- mount NowPlaying in the layout shell

---

### 2.4 Quality Gate

Before merging `feature-lastfm`:
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] NowPlaying works in both playing and idle states
- [ ] Graceful fallback when API is unavailable
- [ ] `prefers-reduced-motion` respected
- [ ] No API key exposed in client bundle
- [ ] Mobile layout tested
- [ ] Lighthouse performance > 90

---

## Dependency Budget

| Package | Size (gzipped) | Phase | Components Using It |
|---------|----------------|-------|---------------------|
| gsap + ScrollTrigger | ~30KB | 1.2 | ScrollFloat, ScrollReveal, AnimatedContent |
| motion | ~15KB | 1.4 | DecryptedText, CountUp, AnimatedList |
| (zero-dep components) | 0KB | 1.1 | Magnet, SpotlightCard, GlitchText, ClickSpark, ElectricBorder, Noise |
| (dev tuning panel) | 0KB prod | 1.3 | Dev-only, tree-shaken in production |

Total new production weight: ~45KB gzipped. Acceptable for the animation quality gained.

---

## Open Questions

1. **GSAP licensing:** GSAP recently changed licensing. Verify the free tier covers our use case (portfolio site, no SaaS).
2. **RevealOnScroll migration:** Replace entirely with AnimatedContent, or keep as a lightweight fallback?
3. **NowPlaying placement:** Fixed corner vs. header strip vs. something else. Prototype during 2.3.
4. **Polling interval:** 15s (responsive) vs. 30s (conservative). Start at 30s, tune down if it feels laggy.
5. **MCP server location:** Last.fm MCP server (Tier 2) -- monorepo (`packages/mcp-lastfm/`) or separate repo? Decide before Tier 2 work begins.

---

## ADRs to Write

- **ADR 003:** React Bits adoption strategy (copy-paste model, dependency budget, prefers-reduced-motion policy)
- **ADR 004:** Last.fm integration architecture (Vercel serverless proxy, polling strategy, data flow)
