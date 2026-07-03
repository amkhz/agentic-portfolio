# Upstream provenance

Forked from **[kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles)** @ `4a9ca87` (v2.1.1, 2026-05-30).
Forked: 2026-07-02.

This is the **agentic-portfolio-tuned** copy. Within this repo it overrides the global
skill at `~/.claude/skills/design-motion-principles/` (project skills win). The clean
global copy stays at pristine v2.1.1 for other projects — the global copy IS the
pre-fork state; diff against it to see this fork's full divergence.

(Separately, `~/.claude/backups/design-motion-principles.v1.1.20260530/` holds the old
v1.1 skill from before the global was updated to v2.1.1. It is a historical snapshot,
NOT a rollback target — restoring it would downgrade the global by two versions.)

## Divergence from upstream (every edited hunk)

- **SKILL.md**
  - frontmatter: description rewritten (trimmed under the 512-char hygiene limit, zone-awareness noted)
  - added STEP 0.5: three-register zone detection — Portfolio / Perihelion shipped / Experiment — with explicit play-signal override (branch names excluded as a detection signal)
  - added "When to use this vs. the crew motion skills" routing section (lanes vs /impeccable animate and /interface-craft, incl. the critique-module overlap)
  - Context-to-Perspective Mapping: repo-specific three-zone table prepended; upstream table kept as fallback
  - Duration Guidelines replaced by "Motion Model — springs first" (wave doctrine + tokens + motionConfig presets govern Portfolio/Perihelion; upstream bands demoted to Experiment-zone guidance, row labels reworded)
  - Golden Rule paragraph rewritten to cite the house doctrine
- **references/anti-checklist.md** — added "Portfolio Zone — House Anti-Patterns" (accent glow, fixed-bezier-as-reflex, arrival overshoot, performative motion, layout animation); applies in Portfolio + Perihelion, skipped only in Experiment
- **references/audit-checklist.md** — added a zone-supersession note at the top (house anti-patterns override the bezier-rewarding / height-animation / spring-as-nice-to-have lines in Portfolio + Perihelion)
- **references/motion-cookbook.md** — added §0 "Portfolio motion system": CSS easing/duration tokens (with --ease-out-expo marked legacy vs --ease-settle), the motionConfig.ts spring presets (import-only rule), shadow-token guard against the upstream rgba() recipes, reduced-motion house patterns
- **references/creation-gotchas.md** — added "Portfolio-specific (this repo)" section (tokens/presets only, no arrival overshoot, no glow, one ambitious moment, house reduced-motion pattern, Experiment-only exemption)
- **references/accessibility.md** — added "House pattern (agentic-portfolio)": global CSS block + useReducedMotion() hook vs mount-check patterns, component examples with paths
- **workflows/audit.md** — Zone line added to the reconnaissance inference template; zone checkbox added to Success Criteria
- **workflows/create.md** — Zone line added to the inference block; STEP 3 items 2 and 5 carve out Portfolio/Perihelion (tokens + presets govern, 900ms reveal is correct, don't clamp to upstream bands); zone checkbox added to Success Criteria
- **UPSTREAM.md** — this file (new)
- **.agents/skills/design-motion-principles** — symlink per the crew single-source convention (new)

Untouched upstream files: references/emil-kowalski.md, jakub-krehel.md, jhey-tompkins.md,
performance.md, output-format.md, demo-shell.html, report-template.html.

Governing doctrine lives in `DESIGN.md` (motion pillar), `VECTOR.md` P4 (wave-driven
motion mandate), and `vector/decisions/ADR-016` P6 (Perihelion motion convergence).
The JS mirror of the motion tokens is `src/components/effects/motionConfig.ts`.
If any of those change, re-reconcile this fork.

## Syncing future upstream edits

This is a 3-way merge, not a clean pull. Base = `4a9ca87`.
1. Clone `kylezantos/design-motion-principles` to scratch.
2. Diff upstream `main` against base `4a9ca87` to see what changed upstream.
3. Re-apply the divergence list above on top of the new upstream.

## Abandoning the fork

Delete this directory (and the `.agents/skills/design-motion-principles` symlink).
The pristine global v2.1.1 copy takes over automatically. Do NOT restore the v1.1
backup unless you specifically want the old pre-Create-mode skill back.
