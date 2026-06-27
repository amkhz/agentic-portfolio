# T4c — M4 Motion Pass: Interface-Craft Design Critique (MOTION)

**Reviewer:** Tyrell review agent (code-level critique; no browser driver)
**Branch:** `feat/conservatory-tokens`
**Date:** 2026-06-27
**Method:** Interface-Craft "Design Critique" + `design-motion-principles` lens (Emil Kowalski / Jakub Krehel / Jhey Tompkins), scored against VECTOR P4 and DESIGN.md "Motion — a doctrine pillar."
**Scope:** review only. No code changed. Live feel to be verified by Justin on :5173.

---

## Overall verdict

**Strong, doctrine-aligned pass. Ships at B+.** The spring-physics arrival register reads organic rather than mechanical, reduced-motion coverage is genuinely complete across both engines (CSS catch-all + per-component `useReducedMotion`), and every animation is transform/opacity/filter — nothing layout-triggering. The `linear()` curves are correctly spring-sampled and overshoot-free. The deliberate `springHover` bounce exception is tasteful in principle.

What keeps it from A-: (1) **token drift** — two motion tokens are defined-but-dead, including one whose doctrine comment claims it powers interaction; (2) a **sluggish hover** that contradicts the responsiveness the spring work was meant to deliver; (3) a likely **parallax edge-overflow** craft bug; (4) two surfaces (case study, notes) lean on borrowed/generic motion instead of a distinct "one ambitious moment."

---

## Motion-principles breakdown

### Easing & curve quality — A-
- `--ease-settle` deltas per 10%: `.122 .215 .200 .155 .109 .073 .048 .030 .019 .029`. Velocity rises to a peak at 20% then decelerates monotonically to a soft landing at 1.0. That early accel + long tail is the real spring step-response signature — reads organic, not a mechanical ramp. No overshoot. Correct for arrival.
- `--ease-organic` deltas: `.33 .221 .148 .099 .067 .044 .030 .020 .014 .027`. Quick response, exponential soft tail. Good interaction curve — **but it is never referenced anywhere** (see P2-1).
- Spring presets: `springSettle` (0.9s) / `springSoft` (0.55s) both `bounce: 0` → critically damped, correct. `scrollSpring` (stiff 80 / damp 24 / mass 0.6) computes to a damping ratio ~1.7 (overdamped) — appropriate for a lag-smoothing follower, no overshoot. Good.

### Stagger & rhythm — A-
- Hero: `staggerChildren 0.12, delayChildren 0.15` over 4 items → last child starts ~0.51s, settles ~1.4s. On the long side for a hero but it is *the* ambitious moment, so acceptable. If it reads slow live, trim stagger to `0.10`.
- List cascade: `staggerChildren 0.09, delayChildren 0.05` against a 0.9s settle → heavy overlap = fluid ink-in. Good. Watch the tail on long lists (Work/Notes) — acceptable as-is.

### "One ambitious moment per surface" — B
| Surface | Ambitious moment | Verdict |
|---|---|---|
| Home | Hero staggered settle | Distinct, earned |
| Work | TocLinkList cascade | Distinct |
| Case study | CoverParallax (subtle) | Under-served — see P2-3 |
| Notes | TocLinkList cascade | **Borrowed from Work** — no distinct signature (P2-3) |
| About | ProfileCard tilt | Distinct (pointer-tracked) |

### Interaction feel — B
- `springHover` exception (bounce 0.32) is the right instinct and stays out of the arrival/page register per doctrine. But `duration: 0.5s` is slow for a hover and `0.32` is a hair hot for the restraint brief (P2-2).
- **Thumb hover scale** uses `duration-[700ms] ease-[var(--ease-settle)]` — a 700ms arrival curve on a hover interaction reads as molasses and contradicts the spring work (P1-2).

### Reduced motion — A
- CSS `@media (prefers-reduced-motion: reduce)` zeroes transition + animation durations globally.
- Crucially, that catch-all does **not** stop motion/react JS springs (rAF-driven). Coverage there depends entirely on per-component `useReducedMotion`, and it is present and correct in **all five** JS-motion components (Hero, PageTransition, CoverParallax, TocLinkList, RevealOnScroll-via-constant). Thumb + AboutPage arrow carry explicit `motion-reduce:` / are CSS-only. ProfileCard gates via `matchMedia`. **No gap found.** One consistency nit in P3.

### Performance — A-
- Everything animates `opacity` / `translate` / `transform` / `filter` — compositor-friendly, no layout thrash. `eq-bar` keyframes correctly use `scaleY` not `height`.
- `PageTransition key={pathname}` forces a full remount of the routed subtree per navigation (re-runs entrances, re-inits IntersectionObservers). Documented and acceptable for a content site; noted P3.
- `filter: blur()` transition on every reveal is the one mild cost + the one mild slop-risk (P2-4).

---

## Findings (P0–P3)

### P0 — Blocking
None. No broken behavior, no layout animation, no reduced-motion gap.

### P1 — Fix before merge

**P1-1 — Dead motion tokens contradict their own doctrine (drift).**
`--ease-organic` (globals.css L127) is defined with a comment stating it is the curve "For interaction (hover/focus lift)" — but it is referenced **nowhere**. Interaction lift moved to `springHover` (JS). Likewise in `motionConfig.ts`, `easeOutExpo` (L14) and the entire `duration` object (L17–22) are exported but **never imported** — the springs replaced them. This is exactly the "keep these in sync" drift the file header warns against: doctrine now lies about what powers interaction.
*Fix:* wire `--ease-organic` into the real interaction transitions (see P1-2, which gives it a home), then delete `easeOutExpo` + `duration` from motionConfig.ts — or, if they're intended as public API, add a one-line "// reserved, currently unused" note so the next reader doesn't trust a stale claim. Net: no token should be defined-but-dead.

**P1-2 — Thumb hover is sluggish (700ms arrival curve on an interaction).**
`TocLinkList.tsx` L95: `transition-transform duration-[700ms] ease-[var(--ease-settle)] group-hover:scale-[1.07]`. Hover feedback wants to feel immediate (Emil: interaction must track intent); 700ms on the slow settle curve makes the image scale lag noticeably behind the cursor.
*Fix:* `transition-transform duration-[var(--duration-slow)] ease-[var(--ease-organic)] group-hover:scale-[1.07]` (400ms + the quick-response curve). This simultaneously gives `--ease-organic` a legitimate home, resolving half of P1-1. If 400ms still drags, drop to 300ms.

**P1-3 — CoverParallax likely overflows / gaps at the frame edge (verify live).**
`CoverParallax` translates its inner `motion.div` by ±24px, but the `ref` container has no `overflow-hidden` and the image is not overscanned. The image sits inside `DossierFrame`'s padded content box; a 24px vertical drift will either push the image past the frame border or reveal a ~24px gap of `bg-bg-base` at the top/bottom edge as it travels.
*Fix:* add `overflow-hidden` to the outer `ref` div and overscan the moving layer so the drift never exposes an edge, e.g. inner wrapper `className="h-[calc(100%+48px)] -mt-6"` (or `scale-[1.06]`) so ±24px stays within bounds. Justin: confirm at the case-study cover whether an edge gap is visible before/after.

### P2 — Should fix

**P2-1 — `--ease-organic` orphan** — folded into P1-1/P1-2. Listed for the token-audit trail: after P1-2 it is referenced once; consider also using it for the AboutPage arrow and BackLink hovers so interaction curve is consistent across the site.

**P2-2 — `springHover` tuning.** `{ bounce: 0.32, duration: 0.5 }`. For an 8px glide + 1.2% scale the absolute overshoot is tiny, so it's tasteful — but 0.5s is slow for hover and 0.32 is the upper edge of "restrained."
*Fix:* `{ bounce: 0.24, duration: 0.4 }`. Keeps the deliberate wave (still clearly distinct from the bounce:0 arrival register) while snapping the lift closer to the cursor and trimming the spring back on hover-out. Re-check on rapid in/out — bouncy hover-out can jitter.

**P2-3 — Two surfaces lack a distinct ambitious moment.**
- *Case study:* DESIGN.md lists **both** "subtle parallax on case-study covers" **and** "deliberate page-transition choreography on case-study entry" as permitted vocabulary. Today the entry is just the generic site-wide `springSoft` fade+rise — identical to every other route — so the case-study's signature reduces to one subtle parallax. *Option:* give case-study routes a slightly more deliberate entry (e.g. a marginally longer rise or a cover-first sequence) so the entry reads composed, not uniform. Low-risk, high-payoff.
- *Notes:* uses the exact `TocLinkList ... reveal` cascade as Work. The hero is quieter but the motion signature is a carbon copy. Acceptable as shared grammar, but Notes currently has no moment of its own. *Option:* differentiate via rhythm (slower `delayChildren`, gentler) so "reflective register" is felt in motion, not just layout.

**P2-4 — Magic-number duration + blur-on-every-reveal.**
`RevealOnScroll` hardcodes `transitionDuration: "950ms"` — an orphan value living in neither `globals.css` (`--duration-*` tops out at 600/1200) nor `motionConfig` (`springSettle` is 900). It reads as the settle family but is a third, untokenized number.
*Fix:* add `--duration-reveal: 900ms` (align to springSettle) and reference it, so the reveal and the JS cascade are provably the same tempo.
Separately: the `filter: blur(5px)→0` runs on **every** RevealOnScroll (4× About, 4× Home, Work, Notes). Repeated blur-rise-fade across every section is the one element that could tip toward generic-AI-template feel (DESIGN.md says "slow warm *fades*," not blur). *Consider:* reserve the blur for the ambitious moments and let secondary sections do a plain fade+rise — cheaper and more restrained.

### P3 — Nice to have

**P3-1 — RevealOnScroll uses a module-level `prefersReducedMotion` constant** (evaluated once at import) instead of the `useReducedMotion` hook every other motion component uses. Works (and the CSS catch-all double-covers it since it's a CSS transition), but it won't react to a mid-session preference change and is an inconsistency. Switch to `useReducedMotion` for uniformity.

**P3-2 — `PageTransition key={pathname}` full remount** — documented, acceptable. Only revisit if navigation ever feels heavy on low-end devices; an `AnimatePresence`-free enter-only transition is the right robustness call as-is.

**P3-3 — Consistency** — once `--ease-organic` is live, route all interaction-scale/translate hovers (Thumb, AboutPage arrow `group-hover:translate-x-1`, BackLink) through it + a `--duration-normal/slow` so "interaction = organic curve, arrival = settle curve" is a legible, enforced split.

---

## Highest-value concrete tweaks (apply order)

1. **Thumb hover** (P1-2): `duration-[700ms] ease-[var(--ease-settle)]` → `duration-[var(--duration-slow)] ease-[var(--ease-organic)]`. Fixes sluggish hover **and** gives `--ease-organic` a home.
2. **`springHover`** (P2-2): `{ bounce: 0.32, duration: 0.5 }` → `{ bounce: 0.24, duration: 0.4 }`.
3. **CoverParallax** (P1-3): `overflow-hidden` on the ref container + overscan the inner layer (`scale-[1.06]` or `h-[calc(100%+48px)] -mt-6`). Verify the cover edge live.
4. **Token hygiene** (P1-1 / P2-4): delete unused `easeOutExpo` + `duration` from motionConfig.ts (or mark reserved); add `--duration-reveal: 900ms` and use it in RevealOnScroll instead of the `950ms` magic number.
5. **Distinct moments** (P2-3): nudge case-study entry to read deliberate, and give Notes a gentler cascade tempo so it isn't a Work copy.
