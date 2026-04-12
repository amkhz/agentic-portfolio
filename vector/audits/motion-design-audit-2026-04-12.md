# Motion Design Audit Report

**Scope:** All animation, transition, and motion patterns across agentic-portfolio
**Date:** 2026-04-12
**Auditor:** Tyrell

---

## Anti-Patterns Verdict

**Pass.** No AI slop. No gratuitous parallax, no bounce easing on interaction states, no scroll-jacking, no glassmorphism. Motion serves information hierarchy and spatial context. The spring easing is a proper `linear()` approximation, not a lazy `cubic-bezier` bounce. The aesthetic reads as "someone who understands physics-based motion," not "someone who installed a template."

One yellow flag: `--ease-bounce` is defined in the token system but only referenced in `globals.css` (never used in components). It's overshoot-style easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) that would read as bouncy/playful -- inconsistent with the Blade Runner restraint. Not a problem today, but it's a loaded gun in the token set.

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 2 |
| Medium | 5 |
| Low | 4 |

**Top issues:**
1. **`transition-all` overuse** (High) -- 20 instances across 13 files. Animates every property including layout-triggering ones, and collides with the global theme-switch transition on every element.
2. **Inconsistent reduced-motion coverage** (High) -- Constellation node hover scale, ConstellationStrip dot transitions, ConnectionPeek hover effects, and Button active:scale all fire even with `prefers-reduced-motion: reduce` because they use bare Tailwind classes without `motion-safe:` guards.
3. **Duration token bypass** (Medium) -- `duration-200`, `duration-500` used as raw Tailwind values instead of semantic tokens (`duration-normal`, `duration-slow`).
4. **No exit animation on constellation content** (Medium) -- Content enters with `fadeIn_400ms` but vanishes instantly on node switch.
5. **Missing `ease-spring` from JS token export** (Medium) -- `core/tokens/index.ts` exports 4 easing functions but omits `--ease-spring`, the most distinctive one in the system.

---

## Detailed Findings

### High Severity

#### H1: `transition-all` overuse (Performance / Consistency)

**Locations:** 20 occurrences across 13 files (ConstellationNode, ConstellationField, ConstellationStrip, ConnectionPeek, CodexNode, CodexChapter, Button, ThemeToggle, ProjectCard, ImageBlock, HomePage, WorkPage)

**Description:** `transition-all` animates every CSS property that changes, including properties you don't intend to animate. Combined with the global theme-switch rule (globals.css:131-141) that already transitions `background-color`, `color`, `border-color`, and `box-shadow` on every element, `transition-all` creates double-transition declarations and potentially animates `width`, `height`, `padding`, or other layout-triggering properties during state changes.

**Impact:**
- Browser must check and potentially animate every changed property, not just the intended ones
- On lower-end devices, unintended layout property transitions (e.g., `min-width` changes in ConstellationStrip dots) cause extra layout recalculations
- The global theme transition already handles color properties -- `transition-all` on components creates competing transition declarations with potentially different durations

**Recommendation:** Replace each `transition-all` with the specific properties being animated:
- Nodes/cards with hover glow: `transition-[border-color,box-shadow,transform]`
- Opacity reveals: `transition-opacity`
- SVG connection lines: `transition-[stroke,stroke-width,stroke-opacity]`

**Suggested command:** `/optimize` to replace `transition-all` with scoped transition properties

---

#### H2: Incomplete `prefers-reduced-motion` coverage (Accessibility)

**Locations:**
- `Button.tsx:38` -- `active:scale-95` fires without `motion-safe:` guard
- `ConstellationStrip.tsx:52,63` -- `transition-all duration-normal` on strip dots and containers, no motion guard
- `ConnectionPeek.tsx:20,31,55` -- All transitions and `translate-x-0.5` hover without motion guards
- `ImageBlock.tsx:61` -- Hover transition without motion guard
- All `SpotlightCard` wrappers (HomePage, WorkPage, ProjectCard) -- `transition-all` without motion guard
- `WorkPage.tsx:99,144` -- `transition-transform duration-500 group-hover:scale-[1.02]` without motion guard

**Description:** The global CSS `prefers-reduced-motion` rule (globals.css:173-180) sets `transition-duration: 0ms !important` and `animation-duration: 0ms !important` on `*`, which catches most of these. However, this brute-force approach means the global rule is doing the heavy lifting that component-level `motion-safe:`/`motion-reduce:` guards should handle.

**WCAG Standard:** WCAG 2.1 SC 2.3.3 (Animation from Interactions, AAA)

**Impact:** Currently mitigated by the global rule, but the architecture is fragile. If you move to component-scoped motion preferences, many components would need individual guards added.

**Recommendation:** Add `motion-safe:` prefix to all transform/scale/translate hover effects at the component level for defense-in-depth. Priority targets: Button `active:scale-95`, all `group-hover:scale-[1.02]` on WorkPage, ConnectionPeek `translate-x-0.5`.

**Suggested command:** `/harden` to add motion-safe guards to all interactive motion

---

### Medium Severity

#### M1: Duration token bypass with raw Tailwind values

**Locations:**
- `Header.tsx:27,41` -- `duration-200` (should be `duration-normal`)
- `Footer.tsx:16,22,28,34` -- `duration-200` (should be `duration-normal`)
- `ResumeHeader.tsx:28,35` -- `duration-200` (should be `duration-normal`)
- `WorkPage.tsx:99,144` -- `duration-500` (no matching token -- between `slow` 400ms and `slower` 600ms)
- `SpotlightCard.tsx:56` -- `duration-500` (same issue)

**Description:** The motion token system defines five semantic durations (`fast` 100ms, `normal` 200ms, `slow` 400ms, `slower` 600ms, `ambient` 1200ms). Raw `duration-200` is equivalent to `duration-normal` but bypasses the semantic name. `duration-500` has no token equivalent at all.

**Impact:** If duration tokens are tuned globally, these raw values won't update.

**Recommendation:** Replace `duration-200` with `duration-normal`. For `duration-500`, either add a `--duration-moderate: 500ms` token or round to `duration-slow` (400ms) / `duration-slower` (600ms).

**Suggested command:** `/normalize` to align all durations with the token system

---

#### M2: No exit animation on constellation content panel

**Location:** `ConstellationPage.tsx:203`

**Description:** Content enters with `motion-safe:animate-[fadeIn_400ms_ease-out]` but when switching nodes, the old content unmounts instantly (React unmount) and the new content fades in. Smooth entrance, harsh exit.

**Impact:** On node-to-node navigation, there's a visual pop where content disappears and re-enters. The 1200ms grid transition is smooth, but the content swap within it is abrupt.

**Recommendation:** Either (a) add a brief crossfade using a key-based transition wrapper, or (b) accept the instant swap as intentional. If you add exit animation, keep it shorter than entrance (200ms out, 400ms in) to avoid feeling sluggish.

**Suggested command:** `/animate` to evaluate and add exit transition if warranted

---

#### M3: Missing `ease-spring` from JS token export

**Location:** `core/tokens/index.ts:128-133`

**Description:** The `motion.easing` export includes `default`, `in`, `out`, and `bounce` but omits `spring` -- the `linear()` approximation used for the most distinctive animations (constellation grid, NowPlaying expand, CodexChapter accordion).

**Impact:** Any JS code that needs the spring easing programmatically would need to hardcode the `linear()` value.

**Recommendation:** Add `spring` to `motion.easing` in `core/tokens/index.ts`.

---

#### M4: Unused `--ease-bounce` token

**Location:** `globals.css:103`, `core/tokens/index.ts:132`

**Description:** `--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)` is defined in both CSS and JS tokens but never used in any component. Overshoot/bounce easing is explicitly an anti-pattern in the design skill's DON'T list.

**Impact:** No runtime impact. Design system hazard -- someone could reach for it thinking it's endorsed.

**Recommendation:** Remove it or add a comment that it should be used sparingly.

**Suggested command:** `/distill` to remove unused motion tokens

---

#### M5: Global theme-switch transition is broad

**Location:** `globals.css:131-141`

**Description:** Theme-switch transition applies `background-color`, `color`, `border-color`, `box-shadow` at 300ms to a long selector list including `div`, `span`, `img`, `svg`, `p`, and more.

**Impact:** Every element in the DOM gets four transition declarations whether it needs them or not. On constellation view with many SVG lines, this adds unnecessary declarations to decorative elements.

**Recommendation:** Consider scoping to semantic containers and interactive elements only.

**Suggested command:** `/optimize` to scope theme transitions more narrowly

---

### Low Severity

#### L1: ProfileCard holographic animation runs at 18s infinite

**Location:** `ProfileCard.tsx:386`

**Description:** Holographic shine background animation runs continuously. Paused for reduced-motion. Runs even off-screen.

**Impact:** Minimal -- browsers optimize non-visible CSS animations.

---

#### L2: ConstellationNode pulse uses Tailwind's default `pulse` keyframe

**Location:** `ConstellationNode.tsx:73`

**Description:** `animate-[pulse_3s_ease-in-out_infinite]` uses opacity pulse. The constellation's motion vocabulary is otherwise transform/position-based.

**Recommendation:** Consider replacing with a subtle scale or glow pulse.

**Suggested command:** `/animate` to refine compact node pulse

---

#### L3: `setTimeout(50)` for scroll timing

**Location:** `ConstellationPage.tsx:56`

**Description:** Uses `setTimeout(50)` to defer scroll-to-content. `requestAnimationFrame` (used correctly for `handleBack` on line 80) would be more reliable.

**Recommendation:** Replace with `requestAnimationFrame` for consistency.

---

#### L4: NowPlaying grid animation motion guard inconsistency

**Location:** `NowPlaying.tsx:110`

**Description:** Grid uses `motion-safe:` guards but content opacity inside may not. Global rule catches it anyway.

---

## Positive Findings

1. **Excellent token system.** Five semantic durations and five easing functions with clear naming. The `linear()` spring approximation is well-crafted.

2. **Consistent motion hierarchy.** Duration scale maps cleanly to interaction tiers: 100ms micro-feedback, 200ms interactions, 400ms emphasis, 600ms structural, 1200ms spatial.

3. **Strong reduced-motion foundation.** Global rule + component-level `motion-safe:` on impactful animations shows deliberate accessibility thinking.

4. **GPU-accelerated where it matters.** EQ bars use `scaleY` not `height`. ProfileCard uses `translate3d()`. Particles/Threads are WebGL. No layout-triggering continuous animations.

5. **No animation library sprawl.** Framer Motion limited to CountUp. Everything else is CSS or vanilla RAF.

6. **`data-no-transition` pattern.** Prevents theme flash on page load.

7. **Constellation grid transition is the signature moment.** 1200ms spring for hero-to-reading is genuinely impressive -- communicates spatial context and feels physical.

---

## Recommendations by Priority

### Short-term
1. Replace `transition-all` with scoped properties across 13 files (`/optimize`)
2. Add `motion-safe:` guards to Button, ConnectionPeek, ImageBlock, WorkPage hover effects (`/harden`)

### Medium-term
3. Replace raw `duration-200` / `duration-500` with token values (`/normalize`)
4. Add `spring` to `core/tokens/index.ts` motion export (manual)
5. Evaluate content exit animation for node-to-node switches (`/animate`)

### Long-term
6. Scope theme-switch transition selector more narrowly (`/optimize`)
7. Remove or quarantine `--ease-bounce` token (`/distill`)
8. Replace ConstellationNode pulse with a glow/scale variant (`/animate`)

---

## Motion Inventory Summary

| Category | Count | Key Techniques |
|----------|-------|----------------|
| CSS Transitions | 40+ | Tailwind classes, token easings |
| @keyframes | 4 | eq-bar-a/b/c, fadeIn, pc-holo-bg |
| requestAnimationFrame loops | 4 | Particles, Waves, Threads, ProfileCard |
| setTimeout/setInterval | 2 | DecryptedText, ProfileCard entering |
| Framer Motion (useSpring) | 1 | CountUp |
| Motion Tokens | 5 easing + 5 duration | Comprehensive system |
| Reduced-motion checks | 8+ | Accessibility-first |
| Will-change declarations | 2 | GPU hints |
| Motion-safe/reduce guards | 15+ | Tailwind + CSS |
