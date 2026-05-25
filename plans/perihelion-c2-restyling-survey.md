# Perihelion C.2 — Lab Component Restyling Survey

> Read-only audit. 2026-05-25 by Tyrell, prepared while Justin was away. No code changes; this is a punch list for the C.2 restyling implementation session.

## Why this exists

C.2 included three pieces: (1) callout icons in `GuideBlockquote` (shipped PR #64), (2) `GuideCard` hover refinement (shipped PR #63), and (3) **broader lab-component restyling against the C.1.5 graphite background**. This survey covers #3.

C.1.5 changed `--lab-bg-deep` from L≈0.08 to L=0.17. Every component that visually rests on the deep bg or layers a surface above it was calibrated against the older, darker floor. The expected drift: anything that depended on the contrast delta between deep and surface (or deep and a border) now feels softer than designed.

## Token landscape (current main)

| Token | OKLCH L | Role |
|---|---|---|
| `--lab-bg-deep` | 0.17 | Page floor (graphite) |
| `--lab-bg-surface` | 0.205 | Card/raised panel |
| `--lab-bg-raised` | 0.24 | Hover state for cards |
| `--lab-border-subtle` | 0.32 | Dividers, card borders |
| `--lab-border-strong` | 0.42 | Heavier emphasis borders |
| `--lab-text-muted` | 0.62 | Meta, dim divider gradients |
| `--guide-accent` | per-guide | Brass / dusty magenta / accent dot |

The deep→surface delta is **~0.035 in L**. That's the key number. Surface elements ride low above the floor; further tuning may need a slightly raised `--lab-bg-surface` or a more present `--lab-border-subtle`.

---

## Component punch list

### LibraryWelcome (Field Notes triptych) — **P2**

`border-t` + `bg-lab-bg-surface` cards on graphite. The L=0.205 surface against the L=0.17 floor is a 3.5-point delta — designed for a darker floor where the lift felt deliberate. On graphite the three cards likely read as nearly flat — the only edge that distinguishes them is the top hairline in `--lab-border-subtle`.

**Direction to verify live:** do the cards feel "raised" or "stamped on the floor"? If stamped, options are (a) bump `--lab-bg-surface` to L≈0.22, (b) add a `border-x` and `border-b` at a faint opacity, or (c) lean into flatness by removing the `bg-lab-bg-surface` entirely and letting the border-top hairline carry it alone (more editorial).

### TerritoryBadge pulse — **P2**

Active-territory pulse: `opacity: [0.2, 0.32, 0.2, ...]`, `scale: [1, 1.1, ...]`. Three pulses then settles at opacity 0.2. The opacity range was tuned against the prior darker floor; the pulse ring's *visible intensity* depends on (pulse opacity × guide-accent) layered over the bg.

On graphite the contrast between (pulse ring at 0.2 opacity) and (graphite floor) is meaningfully reduced. The settled "live" state at opacity 0.2 may now read as nearly invisible.

**Direction to verify live:** does the badge still feel alive after the pulse settles? If not, candidate fix: bump settled opacity to ~0.32, pulse range to `[0.32, 0.48, ...]`. Keep the same duration and count.

### PerihelionSigil orbit gradient dim end — **P3**

Orbit gradient: `lab-text-muted @ 0.25 opacity` → `lab-text-muted @ 0.85` → `guide-accent @ 1.0`. The 0% stop (the orbit's start at apoapsis) is effectively L=0.62 at 0.25 alpha on a graphite floor — that's roughly 1.5:1 contrast. May read as a broken stroke rather than a fading orbit.

**Direction to verify live:** does the orbit feel continuous, or does the dim end disappear? If it disappears, candidate fix: raise the 0% stop opacity to 0.4 or shift the 0% stop color to a slightly lighter token.

### TerritoryGrid section dividers — **P3**

Header underline + "In the pipeline" divider both use `bg-lab-border-subtle` at 1px. L=0.32 on a L=0.17 floor reads as a modest line — designed for a darker floor where the line was crisper. May feel weak now.

**Direction to verify live:** do territory sections read as cleanly delineated? If not, candidate fix: bump `--lab-border-subtle` to L≈0.36, or use `--lab-border-strong` (L=0.42) for the section-header underline specifically.

### LibraryHeader colophon affordance — **P3**

The `+` glyph in the colophon `<summary>` is a `text-[0.85rem]` character with a rotation transform on open. Tiny. Doesn't read as an obvious affordance — easy to miss that the colophon is expandable.

**Direction to verify live:** does the colophon's "expandable" affordance read on first scan? If not, candidate fix: use a Lucide `Plus` / `ChevronRight` icon at 12–14px instead of the text glyph, with the rotate-90 transform on `group-open:`. Tightens the affordance and matches the Lucide pattern landing in PR #64.

### GuideCard hover (post-PR #63) — **P3 / monitor**

Hover treatment: `motion-safe:hover:-translate-y-0.5` + border to `guide-accent` + bg from `surface` to `raised` (L=0.205 → L=0.24, a 3.5-point delta — also subtle on graphite). The status dot's accent glow intensifies on hover.

The mechanical lift + accent glow are the load-bearing signals — those work. The bg shift is the soft one and may be hard to perceive. Not a real defect, just a note that the *background* part of the hover is doing less work than designed.

**Direction to verify live:** is the hover already cohesive enough, or does the bg shift want amplifying? Likely fine. Monitor.

### UpcomingCard — **P3**

Dashed `lab-border-subtle` on transparent bg. Dashed border on graphite at L=0.32 should still read. The transparent bg means UpcomingCards sit flush with the floor while GuideCards rise above it — that depth differential is a feature (built vs not-yet-built reads visually). Likely fine.

**Direction to verify live:** dashed border opacity + dash spacing — does it feel like "pipeline marker" or "broken element"? Verify and move on.

---

## Cross-cutting observations

- **The graphite floor wants a slightly more present `--lab-border-subtle`.** Three of the six components above rely on that single token. A bump from L=0.32 to L=0.36 would lift dividers and card borders without touching color hue.
- **The deep→surface lift could go either direction.** Bigger delta (lift surface to L=0.22) gives more material warmth; smaller delta + stronger borders gives more editorial / monograph flatness. This is a *direction* choice, not a fix — worth a deliberate pick.
- **The pulse / glow / orbit tokens are all opacity-driven against the floor.** They were tuned together. If `--lab-bg-deep` shifts again, expect to recalibrate all three at once.
- **No new tokens needed** in any P2/P3 above. All candidate fixes are either Tailwind class swaps, opacity bumps, or one-line token adjustments.

## Recommended implementation order

1. **LibraryWelcome surface lift OR border addition** (P2, biggest visual delta)
2. **TerritoryBadge pulse opacity bump** (P2, single component, clear signal)
3. **`--lab-border-subtle` bump to L≈0.36** (one token, three dividends — TerritoryGrid, LibraryWelcome borders if added, GuideCard border base state)
4. **Colophon affordance → Lucide icon** (P3, consistency with PR #64 pattern)
5. **PerihelionSigil gradient dim end** (P3, isolated polish)

Verify each change live before stacking the next — token bumps cascade across components.

## Not in scope

- **Color palette changes.** OKLCH tokens are locked per Justin's feedback note.
- **Type system changes.** Three-face stack from the polish branch (`polish/portfolio-visual-2026-05-17`) is portfolio-side, not Perihelion-side per ADR-011 scope.
- **GuideBlockquote callout chips.** Shipped in PR #64. The 14px icon size is locked unless 16px is preferred after live review.
- **Per-guide content edits.** Writer / Joi territory.

## Follow-ups this survey surfaces

- The doctrine drift between the parked polish branch and main is non-trivial. The polish branch is 44 commits behind main and includes superseding doctrine for portfolio surfaces (not lab). Worth a dedicated session to rebase or formally park.
- Consider whether C.2 wants its own ADR. The original Workstream C plan in `perihelion-next-steps.md` is more pragmatic than architectural; if any of the token shifts above land, an ADR-012 might be earned.
