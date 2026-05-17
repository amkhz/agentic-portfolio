# Mission: Perihelion slug migration (B.1 small piece)

**Branch:** `chore/perihelion-slug-migration`
**Date:** 2026-05-17
**Owner:** Tyrell (direct, not delegated — cross-layer refactor wanted undivided attention)

Schema migration locked 2026-05-03 in `plans/perihelion-next-steps.md`: rename the canonical frontmatter identifier from `id:` to `slug:` to match the upstream format spec (`plans/perihelion-format-rules.md`). Removes a long-standing schema deviation called out in the format rules and prepares the eight Archive guides for the per-guide pipeline (B.1 alignment → B.2 voice).

## Scope

11 files touched, two layers.

**Core layer:**
- `core/lab/guide-types.ts` — `GuideFrontmatter.id` → `GuideFrontmatter.slug`
- `core/lab/parse-guide.ts` — `validateFrontmatter` now reads `data.slug` and emits `slug:` into the returned shape
- `core/lab/parse-guide.test.ts` — fixture frontmatter updated to use `slug:`

**Content layer (all 8 Archive guides):**
- `core/lab/guides/dird-13-warp-drive.md`
- `core/lab/guides/dird-14-superconductors-gravity.md`
- `core/lab/guides/dird-15-vacuum-spacetime-engineering.md`
- `core/lab/guides/dird-28-breakthrough-cockpits.md`
- `core/lab/guides/emergent-quantization.md`
- `core/lab/guides/quantum-gravity.md`
- `core/lab/guides/uap-field-map.md`
- `core/lab/guides/uapx-field-methods.md`

## Out of scope

- **No cross-check validation** (`frontmatter.slug === parameter slug`). Considered, dropped to keep this PR a pure rename. Add later if authoring drift becomes a real problem.
- **No `src/lab/` changes.** Confirmed via grep: no `frontmatter.id` or `frontmatter['id']` reference exists in `src/` or `core/` outside the parser and tests. The `Guide.slug` field at the top level of the parsed type was already named `slug` (it's the filename-derived slug, fed into `parseGuide(source, slug)` by `core/lab/guides.ts`).
- **No upstream format-rules sync.** `plans/perihelion-format-rules.md` already documents the canonical `slug:` schema; the upstream `~/projects/design-futures/guide-format-rules.md` sync is tracked as a separate reminder in the plan.
- **No DIRD year/venue corrections.** That's a separate B.1 small piece (`dird-frontmatter` follow-on). Sits adjacent in the same plan but on a different branch.

## Gates

- `npm run lint` — 0 errors, 4 warnings (all pre-existing in `renderSection.tsx`, unrelated to this migration; noise multiplied by ESLint walking the agent worktrees under `.claude/worktrees/`).
- `npm run test` — 88/88 pass across 6 test files. `parse-guide.test.ts` runs all 14 tests against the renamed schema.
- `npm run build` — succeeds. Pre-existing chunk-size warnings on `labs-*.js` unchanged.

## What this unblocks

- **B.1 small piece — DIRD frontmatter pass** can now run against the migrated schema. Touches the same four guide files (13/14/15/28) but on different frontmatter lines (`source.year`, `source.venue`), so it's a clean follow-on, not a collision.
- **Per-guide pipeline** (B.1 alignment → B.2 voice) operates on the canonical schema. No guide will get voice-tuned under `id:` only to be schema-migrated later.
- **Upstream authoring** can resume against `slug:` without portfolio-side translation.

## Notes for review

- Pure rename; no behavior change at runtime — the parser reads a different key from the same YAML, the type emits a different field name from the same shape.
- ESLint pulling in the `.claude/worktrees/` paths is a separate concern. Worth a `.eslintignore` (or equivalent) entry if the worktree pattern continues. Out of scope for this branch.
