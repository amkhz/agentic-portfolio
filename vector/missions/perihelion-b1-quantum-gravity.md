# Mission: B.1 content sweep — quantum-gravity

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b1-quantum-gravity` (stacked on `chore/perihelion-c2-emoji-strip`, PR #71)
**Lane:** Workstream B.1 per-guide pipeline, first guide. Spec: `plans/perihelion-format-alignment-brief.md` + `plans/perihelion-b1-renderer-scope.md`.

## Scope

`quantum-gravity.md` was the barest guide in the library: `glossary: {}`, zero `|term|` markers, zero callouts, `figures: []` present against format rules. This sweep is the full B.1 retrofit.

## What changed

- **Glossary built out: 18 entries.** Scoped to the source (synthesis guide register). Terms shared with the White-paper deep dive (`emergent-quantization`) carry aligned definitions: quadratic dispersion, dispersion relation, Madelung transformation, quantum potential, stochastic electrodynamics, Casimir effect. No em-dashes in new copy.
- **`|term|` markers** placed on first lowercase mentions; capitalized sentence-start occurrences left unmarked rather than rewriting prose (prose is B.2's lane). Two mechanical normalizations: "Bose-Einstein Condensate" lowercased to match the key, "zero-point vacuum fluctuations" reordered to "zero-point fluctuations in the vacuum", italics dropped from "mathematical isospectrality" so the marker parses.
- **3 inline definition glosses** (colon separator per renderer scope), only for terms the prose does not define in place: Rarity-Tapster interferometer, weak equivalence principle, stochastic electrodynamics. All other terms rely on click-reveal.
- **5 callouts:**
  - Design Hook — converted from the `**Design implication.**` paragraph in `#implications`
  - Read Next ×2 — `emergent-quantization` (in `#white`), DIRD 15 + DIRD 13 guides (in `#gap`)
  - Territory Bridge — T1↔T4 via `uap-field-map` (in `#implications`)
  - Subguide queued — DIRD 19 (Antigravity), referenced twice in the guide, not in library or upcoming queue
- **`figures: []` removed** (format rules: omit the field when empty).

## Verification

- Parser sweep: all 5 callouts detect on the right variant, all 3 glosses detect as `definition` with correct terms, zero `plain` fall-throughs, 7 sections.
- `npm run audit:orphans`: 0 orphans (audit at `vector/audits/orphan-terms-2026-06-09.md`).
- Gates: 102/102 tests, lint 0 errors, build green.

## Exit flags

- **Kicker deviation:** `kicker: "Synthesis Guide"` is outside the two active values (`DIRD Guide Series` / `Research Guide Series`). Left as-is; surfacing for Justin. Either bless it as a third value in the format rules or normalize to `Research Guide Series`.
- **`source.url` missing.** The guide synthesizes two papers; the schema has one `url` slot. Options: pick the White paper as primary, or extend the schema. Deferred.
- **B.2 next:** voice sweep on this guide now has a clean canonical structure to operate on. The Writer pass can also reconsider the em-dash density in the inherited prose.
