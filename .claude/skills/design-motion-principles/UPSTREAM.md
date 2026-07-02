# Upstream provenance

Forked from **[kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles)** @ `4a9ca87` (v2.1.1, 2026-05-30).
Forked: 2026-07-02.

This is the **agentic-portfolio-tuned** copy. Within this repo it overrides the global
skill at `~/.claude/skills/design-motion-principles/` (project skills win). The clean
global copy stays at v2.1.1 for other projects; a pristine backup of the pre-fork state
is at `~/.claude/backups/design-motion-principles.v1.1.20260530/`.

## Divergence from upstream

- **SKILL.md** — added STEP 0.5 (portfolio vs lab zone detection + explicit "play" override); a "when to use vs the crew skills" routing note; repo-specific designer weighting (Portfolio = Jakub/Jhey/Emil, Lab = Jhey/Jakub/Emil); replaced the millisecond duration tables with the wave-driven Motion Model (springs first) for the Portfolio zone.
- **references/anti-checklist.md** — added "Portfolio Zone — House Anti-Patterns": accent glow, fixed-bezier-as-reflex, arrival overshoot, performative motion, layout animation (from DESIGN.md + VECTOR.md P4).
- **references/motion-cookbook.md** — added §0 "Portfolio motion system": the real easing/duration tokens + Motion spring configs + reduced-motion pattern.
- **references/creation-gotchas.md** — added portfolio-specific gotchas.
- **references/accessibility.md** — added the house reduced-motion pattern.

Governing doctrine lives in `DESIGN.md` (motion pillar) and `VECTOR.md` P4 (wave-driven motion mandate). If those change, re-reconcile this fork.

## Syncing future upstream edits

This is now a 3-way merge, not a clean pull. Base = `4a9ca87`.
1. Clone `kylezantos/design-motion-principles` to scratch.
2. Diff upstream `main` against base `4a9ca87` to see what changed upstream.
3. Re-apply the divergence list above on top of the new upstream.

To abandon the fork and go back to the pure skill, restore from the backup above and
delete this directory (project skill removed → global copy takes over again).
