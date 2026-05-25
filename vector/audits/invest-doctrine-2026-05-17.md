# Doctrine Audit

**Date:** 2026-05-17
**Files audited:** VECTOR.md, CLAUDE.md, ARCHITECTURE.md, PRODUCT.md (cross-referenced), ADR-011 (cross-referenced), plans/portfolio-visual-recalibration-brief.md (cross-referenced)
**Project stage:** development
**Trigger:** Post-recalibration doctrine review (ADR-011 + Round 1–4 Paper exploration)

---

## Findings

### CONTRADICTION — high

- **`ARCHITECTURE.md:Stack` (line 62)** — Stack table lists `Space Grotesk (display), Didact Gothic (body), Podkova (heading)`. Superseded by ADR-011, which locks the spine as `Fraunces (display) + Geist (body) + JetBrains Mono (mono kicker)`. VECTOR.md (line 159, 164), CLAUDE.md, and PRODUCT.md are all updated; ARCHITECTURE.md is the only doctrine file still describing the old system.
- **`ARCHITECTURE.md:Conventions:Styling` (line 210)** — Says `Didact Gothic at weight 400 only`. This is the exact constraint ADR-011 explicitly supersedes. Direct contradiction with VECTOR.md, CLAUDE.md, PRODUCT.md.

### INCOMPLETE — high

- **`ARCHITECTURE.md:Decisions` table (lines 241–249)** — Lists ADRs 001, 003, 004, 005, 006. Missing ADRs 007 (constellation-navigation), 008 (defer-design-md), 009 (lab-subdomain-architecture), 010 (perihelion-rename), and 011 (this recalibration). Five missing entries in the decision registry. Downstream skills (invest-architecture, future audits) depend on this table being current.

### STRUCTURE — medium

- **`ARCHITECTURE.md:Project Structure` tree (lines 73–183)** — Root files exist but are undeclared: `PRODUCT.md` (added today), `labs.html` (Perihelion entry point per ADR-009), `MANIFEST.md` (Investiture inventory artifact from 2026-04-14), `invest.md`, `AUDIT.md`, `STASH_NOTES.md`, `VOID.md`. README.md is also undeclared but conventionally implicit.
- **`ARCHITECTURE.md:Project Structure` tree** — Under `/vector/`, declares `/schemas`, `/research`, `/audits`, `/decisions`. Missing `/missions/` (exists with content including an `archive/` subdirectory).

### DRIFT — medium

- **`src/styles/globals.css` (lines 6–8) vs. ADR-011** — Declares `--font-display: 'Podkova'`, `--font-heading: 'Space Grotesk'`, `--font-body: 'Didact Gothic'`. Doctrine now says Fraunces / Geist / JetBrains Mono. Codebase has not migrated yet — *expected* per the deferred tokens.css migration plan, but flagging it makes the drift explicit and traceable.
- **Font token location vs. ARCHITECTURE.md layer rule** — Font tokens live in `src/styles/globals.css`, not `design-system/tokens.css`. ARCHITECTURE.md says "All visual decisions live here" pointing to design-system/. The current arrangement may be intentional (Tailwind v4 `@theme` structure), but if the migration moves fonts into design-system/tokens.css, that's a structural change worth a brief note in the next ADR (tokens migration).

### GAP — low

- **`ARCHITECTURE.md:What Not to Do` (line 38) and `Conventions:Styling` (line 208)** — Both ban hex (`#000`, `#FFF`) and default Tailwind colors but don't explicitly require OKLCH. VECTOR.md and CLAUDE.md now say "all color is OKLCH via tokens." ARCHITECTURE.md should match for consistency.
- **`ARCHITECTURE.md:Last Updated` (line 3)** — `2026-03-14`. Stale by ~2 months and especially stale after today's changes. Refresh.

### INFO

- **PRODUCT.md is not in the Reading Order.** VECTOR > CLAUDE > ARCHITECTURE is the declared sequence (VECTOR.md Principle 6, CLAUDE.md Reading Order section). PRODUCT.md is now the operational source of truth for design direction (per CLAUDE.md Design Context section). Worth considering whether PRODUCT.md becomes a fourth doctrine file in the reading order, or whether it remains a /impeccable artifact referenced from CLAUDE.md. Not a defect, but a structural question for clarity.
- **ADR-011 cross-references are correct.** Related Decisions section properly cites ADRs 005, 008, 009, 010 and the VECTOR.md supersession.
- **plans/portfolio-visual-recalibration-brief.md is well-formed** — has status, scope, locked decisions section, full discovery summary, and surface-by-surface treatment. No findings.

---

## Summary

- **Critical:** 0
- **High:** 3 (all in ARCHITECTURE.md)
- **Medium:** 4
- **Low:** 2
- **Info:** 3
- **Doctrine health: GAPS FOUND**

VECTOR.md, CLAUDE.md, PRODUCT.md, and ADR-011 are internally consistent and cross-aligned after today's updates. ARCHITECTURE.md is the lagging file — it still describes the pre-recalibration type system in three places and is missing five ADRs from its registry. Once ARCHITECTURE.md catches up, the doctrine will be SOUND.

The codebase drift (globals.css fonts) is expected and tracked; it is the planned migration that the next ADR will scope.

---

## Recommended Actions

1. **Update ARCHITECTURE.md type system references.** Fix line 62 (Stack table — replace old fonts with new three-face spine and reference ADR-011), fix line 210 (Styling — remove "Didact Gothic at weight 400 only"). Refresh `Last Updated` to today.
2. **Backfill ARCHITECTURE.md Decisions table.** Add ADRs 007, 008, 009, 010, 011 to the table at lines 241–249. Five missing entries is a significant registry drift.
3. **Tighten the OKLCH rule in ARCHITECTURE.md** (lines 38 and 208) to match VECTOR.md and CLAUDE.md ("all color is OKLCH via tokens"). Then update the Project Structure tree to add at minimum `PRODUCT.md`, `labs.html`, `MANIFEST.md`, and `/vector/missions/` — or explicitly note them as out-of-scope-for-tree.
