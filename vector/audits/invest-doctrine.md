# Doctrine Audit

**Files audited:** `VECTOR.md`, `CLAUDE.md`, `ARCHITECTURE.md`
**Project stage:** `development` (from VECTOR.md)
**Run date:** 2026-05-25
**Doctrine timestamps:** ARCHITECTURE.md last updated 2026-03-14 (72 days stale); VECTOR.md and CLAUDE.md carry no `Last Updated` markers.

---

### Findings

#### INCOMPLETE — high

- `ARCHITECTURE.md:project structure tree` — Tree omits the entire `core/lab/` subdirectory (8 source files: `parse-guide.ts`, `guide-types.ts`, `guides.ts`, `territories.ts`, `upcoming.ts`, parse tests, plus the `guides/` content folder). The lab arm ships per ADR-009 and is actively maintained. invest-architecture cannot reason about layer boundaries here without the doctrine acknowledging the directory.
- `ARCHITECTURE.md:project structure tree` — Tree omits the entire `src/lab/` subdirectory (29 source files across `layouts/`, `pages/`, `components/guide/`, `components/library/`). Doctrine does not currently declare what UI lives at `labs.justinh.design`.
- `ARCHITECTURE.md:project structure tree` — Tree omits constellation components in `src/components/content/` (`ConstellationField.tsx`, `ConstellationPage.tsx`, `ConstellationContent.tsx`, `ConstellationNode.tsx`, `ConstellationStrip.tsx`) and `renderSection.tsx`, all of which ship and are referenced by ADR-007.
- `ARCHITECTURE.md:project structure tree` — Tree omits `design-system/lab-tokens.css` (222 lines, parallel token surface for the lab). The layer rule names only `tokens.css`; lab-tokens.css coexists undeclared.
- `ARCHITECTURE.md:path aliases` — No path-aliases section exists in ARCHITECTURE.md. CLAUDE.md declares four aliases; `vite.config.ts` actually configures five (`@lab` → `./src/lab`). Aliases belong in the architecture doctrine.
- `ARCHITECTURE.md:ADR table` — Table stops at ADR-006 (2026-04-11). ADRs 007 (Constellation), 008 (Defer DESIGN.md), 009 (Lab subdomain), 010 (Perihelion rename) exist on disk and are referenced from CLAUDE.md and elsewhere.

#### CONTRADICTION — high

- `VECTOR.md:constraints` declares "Three-font system: Space Grotesk (display), Didact Gothic (body, 400 only), Podkova (headings, 400–700). Do not add fonts or use weights outside these ranges." `package.json` ships `@fontsource/jetbrains-mono` and `design-system/lab-tokens.css` declares `--lab-mono-font` consumed by `src/lab/styles/lab.css`. The lab uses a fourth font. Doctrine and reality contradict on a *hard* constraint.
- `VECTOR.md:constraints` + `CLAUDE.md:Design System Non-Negotiables` declare "Didact Gothic only has weight 400 — do not use other weights." Active in-flight initiative on branch `polish/portfolio-visual-2026-05-17` (plan: `plans/portfolio-visual-recalibration-brief.md`) replaces this with a three-face type stack ("designer-as-craftsperson + editorial discipline"). Doctrine has not been updated to reflect the recalibration direction.
- `ARCHITECTURE.md:stack` lists `motion/react` as the animation library. `package.json` ships the unified `motion` package (no separate `/react` subpackage). Functionally equivalent but the wording is stale.
- `ARCHITECTURE.md:layer table` declares `design-system/tokens.css` as *the* location for all visual decisions ("All visual decisions live here"). Reality is two parallel files: `tokens.css` for the portfolio + `lab-tokens.css` for the lab arm. Doctrine treats it as a single file; reality is a coordinated pair.

#### STRUCTURE — high (declared but missing) / medium (exists but undeclared)

- `ARCHITECTURE.md` declares `services/api.ts`. File does not exist on disk. Only `services/analytics.ts` and `services/lastfm.ts` are present. **(high)**
- `core/lab/` exists on disk; not declared in the structure tree. **(medium)**
- `src/lab/` exists on disk; not declared. **(medium)**
- `design-system/lab-tokens.css` exists; not declared. **(medium)**
- `VOID.md` exists at repo root (added by Impeccable v3.0.7 upgrade, PR #50); not referenced in any doctrine file. **(medium)**
- `core/content/codex.ts` + `core/content/constellation.ts` exist; only `case-studies.ts`, `resume.ts`, `lastfm.ts`, etc. are listed in the structure tree. **(medium)**

#### DRIFT — medium

- `ARCHITECTURE.md:stack` declares Tailwind v4 + CSS variable tokens. Reality includes two token surfaces (`design-system/tokens.css` + `design-system/lab-tokens.css`) plus a TS-side parallel (`core/tokens/index.ts`). Doctrine should describe the actual token topology: which file is the source of truth, how the lab surface relates to the portfolio surface, how the TS exports stay in sync.
- `ARCHITECTURE.md:project structure tree` describes the project at the moment of writing (2026-03-14). Since then the project has added Perihelion (two-arm house, second Vite entry, lab subdomain rewrite, eight launch guides, guide renderer, lab tokens, voice profile work, motion design system audit). The structure tree should be regenerated.
- `CLAUDE.md:path aliases` lists four aliases. Reality has five. Add `@lab/* → ./src/lab/*` and confirm CLAUDE.md is the right home for this table — proposing to move to ARCHITECTURE.md per the gap above.

#### GAP — low

- `ARCHITECTURE.md:conventions` does not declare a convention for JSX-returning utility files. Two examples currently exist (`src/components/content/renderSection.tsx`, `src/lib/parseInline.tsx`) — both `camelCase.tsx` because they export functions that return JSX rather than components. Doctrine has only "Components: PascalCase.tsx" and "Utilities: camelCase.ts" — no rule for the hybrid case.
- `ARCHITECTURE.md:`design-system` rule" declares "no hardcoded colors, spacing, or font sizes *anywhere else in the project*." Doctrine should explicitly call out the existing exception used in practice — copy-paste effect components (canvas, WebGL, holographic gradients) carry internal color constants. The exception currently lives only in the "What Not to Do" / "Raw color values" sub-bullet; promote it to a first-class rule so it is unambiguous.
- `CLAUDE.md:When You Commit` declares the trailer as `Claude Opus 4.6`. PR #53 is in flight to bump this to 4.7. Until that merges, both are valid depending on which timestamp the agent reads. Resolve and remove the ambiguity.

#### CROSS-DOC CONSISTENCY — low

- `CLAUDE.md:Design System Non-Negotiables` line 94 references the brass + magenta accents using raw hex literals (`#C8956A`, `#C278A0`). Per the project's standing posture (memory: "OKLCH only, no hex"), doctrine itself should reference these as token names (`--theme-accent-primary`, `--theme-secondary-primary`) or at minimum cite the OKLCH equivalents. Doctrine drift on a stated style rule.
- `ARCHITECTURE.md:ADR table` line for ADR-008 reads "Defer DESIGN.md adoption" — but DESIGN.md has since been *adopted and renamed* to PRODUCT.md (via the Impeccable v3 upgrade). ADR-008 should either be marked Superseded or have a follow-on ADR (e.g., ADR-011 Adopt PRODUCT.md) added. CLAUDE.md correctly references PRODUCT.md; the ADR ledger lags.

---

### Summary

- **Critical:** 0 | **High:** 9 (6 incomplete, 1 structure-declared-missing, 4 contradiction, accounted under categories) | **Medium:** 9 (4 structure-undeclared, 3 drift, 2 other) | **Low:** 6
- **Doctrine health:** GAPS FOUND

The doctrine is structurally sound — all three files exist, all required sections are present, and the core rules (four layers, import direction, token discipline, naming) are coherent and audit-ready. The damage is in *reality coverage*: the doctrine describes the project as it stood on 2026-03-14 and hasn't kept up with Perihelion (lab arm), the constellation system, the token surface expansion, the four-ADR backlog, or the Portfolio Visual Recalibration that is mid-flight. Two *hard* constraints (three-font system, Didact 400-only) are actively contradicted by code on `main` and by an approved in-flight initiative respectively.

### Recommended Actions

1. **Rebuild `ARCHITECTURE.md`'s project structure tree from disk** and add a section for the multi-entry / two-Vite-build layout (Portfolio + Perihelion). Include `core/lab/`, `src/lab/`, `design-system/lab-tokens.css`, the constellation components, `VOID.md`, and the missing path alias `@lab`. Bump the `Last Updated` line. This single edit unblocks roughly half the findings above.
2. **Reconcile the three-font / Didact 400-only constraints in `VECTOR.md` and `CLAUDE.md` against reality.** Either accept the four-font lab register (JetBrains Mono) and document it as a lab-side exception, *or* land the Portfolio Visual Recalibration first and then rewrite the typography section to reflect the three-face stack. Pick a direction. The current state is doctrine actively lying about a hard constraint.
3. **Extend the ADR table in `ARCHITECTURE.md`** to include ADRs 007-010, and add a status note on ADR-008 ("Defer DESIGN.md adoption") to reflect that DESIGN.md was subsequently adopted and renamed to PRODUCT.md.
