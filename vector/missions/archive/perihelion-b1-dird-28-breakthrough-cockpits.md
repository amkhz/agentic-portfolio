# Mission: B.1 content sweep — dird-28-breakthrough-cockpits

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b1-dird-28-breakthrough-cockpits` (off main, after PR #93)
**Lane:** Workstream B.1 per-guide pipeline, sixth guide and the last of the four DIRD guides. Spec: `plans/perihelion-format-alignment-brief.md` + `plans/perihelion-b1-renderer-scope.md`. Templates: `vector/missions/archive/perihelion-b1-dird-15-vacuum-spacetime-engineering.md` (primary), plus the archived dird-14, dird-13, emergent-quantization, and quantum-gravity logs.

## Scope

`dird-28-breakthrough-cockpits.md` arrived in the cleanest pre-sweep condition of the series: a 48-entry glossary with every marker already sitting on its true first mention, but zero callouts, zero inline glosses, `figures: []` present against format rules, and the deferred `source.authors` slot from PRs #60/#61 coming due. This sweep is the full B.1 retrofit on that base plus the authors-slot resolution. It closes B.1 across all four DIRD guides.

## The authors decision (deferred slot from PR #61)

**Branch taken: the dead-end / institutional fallback.** Per the decision tree in `vector/research/dird-authorship.md` (open question 2) and the deferral bullet in `plans/perihelion-next-steps.md`:

- The research note has no working-table entry for DIRD 28 and assessed it as "not a physics-heavy DIRD where Puthoff or Davis would be the natural author."
- Re-checked the upstream brief in-session: the DIRD 28 entry in `~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/dird-technology-briefs.md` ("Cockpits in the Era of Breakthrough Flight") carries only the institutional line `Author / Institution: DIA / AAWSA Program` — the same source that positively attributed DIRD 15 to Puthoff offers no personal author here, consistent with the FOIA-redacted cover posture ([[reference_dird_pdf_authors_redacted]]).
- No personal author surfaced → `source.authors` shipped as the canonical spelling-corrected fallback **`DIA / AAWSAP Program`** (was `DIA / AAWSA Program`, missing the P). This also closes dird-28's side of the `AAWSA`/`AAWSAP` mismatch.
- `vector/research/dird-authorship.md` updated: table row for dird-28 marked resolved with the grounding, open question 2 annotated. **DIRD 14's slot was not touched** — it stays deferred with its own mismatch, per its B.1 log.

## What changed

- **Glossary: 48 entries in, 48 out.** Audit found no duplicate keys, no unused entries (all 48 referenced by markers), and no orphan markers. **0 new markers** — unlike the prior four DIRD/paper sweeps, every key's first literal body occurrence is already marked, so there were no true-first-mention gaps to close without prose rewriting (which is B.2's lane). No person entries added: Puthoff appears only possessively ("Puthoff's speculation (Ep 86)") and Birdie Jaworski only inside the TransDimensional Mapping entry, per the dird-14 precedent. 48 resolved term nodes total.
- **3 inline definition glosses** (colon separator per renderer scope), only for terms the prose does not define in place: Anti-G suits and warp bubble (`#g-force-revolution` — the two the brief's worked example designated for this exact guide), TransDimensional Mapping (`#consciousness-cockpit`, the most opaque term in the guide). Sourced verbatim from the frontmatter entries (first two, two, and three sentences respectively). To keep glosses em-dash-free, one punctuation-only restructure (em-dash to colon, zero wording changes) was made in the `warp bubble` frontmatter entry, per the dird-13/14/15 precedent; the other two were already em-dash-free. Considered and declined: `sensor fusion` and `progressive disclosure` in `#new-information` — the surrounding prose partially carries both; flagged below for B.2 per the brief's leave-it-out-and-flag rule.
- **8 callouts:**
  - Design Hook ×5 — the five bold-led paragraphs of the closing `#design-implications` section (field health display, synthetic orientation, intent-to-action gap, failure modes, training environment) converted to proper callouts, prose verbatim including inherited em-dashes, arrows, and `|term|` markers, per the brief's conversion guidance and the dird-14/15 precedent.
  - Read Next ×2 — DIRD 15 (in `#consciousness-cockpit`, after the unified-thesis paragraph; that section runs on dird-15's consciousness-coherence framework, and dird-15's prose names "the 'cockpit' (DIRD 28)" from its side), and DIRD 13 (in `#design-implications`, after the opening paragraph that explicitly names it; reciprocates dird-13's Read Next to this guide). Both referenced guides are in the library.
  - Subguide queued ×1 — DIRD 34 (Cognitive Limits on Simultaneous Control of Multiple Unmanned Spacecraft; title grounded in the upstream `dird-technology-briefs.md`), in `#control-paradigms` after the supervisory-control paragraph that cites it. Not in the library or `core/lab/upcoming.ts`, and no other guide carries it; per the dird-13 DIRD 18 precedent. DIRD 12 is referenced only inside the `neural interfaces` glossary entry, not in body prose; no callout, per the don't-manufacture rule.
  - **Territory Bridge ×0 — deliberate deviation from the brief's worked example.** The worked example (written pre-precedent, using this very guide) manufactures a `#g-force-revolution` bridge, but no body prose names a cross-territory connection: T2 and T3 never appear in the guide, and every territory reference is T1-internal. The brief's own rule ("if the connection is implicit, don't manufacture a callout") wins; surfaced for Justin below.
- **`figures: []` removed** (format rules: omit the field when empty).
- **`source.authors` resolved** — see the authors-decision section above. Only frontmatter line changed beyond `figures`.
- **Shared-term alignment cross-checked.** `warp bubble` is the only key shared with a sibling (dird-13): substantively aligned with per-guide framing (dird-13 describes the mechanism, dird-28 the occupant experience), no contradiction, nothing rewritten.

## Verification

- Validation ran exclusively via npm scripts per the locked workflow (no throwaway parser scripts). Callout and gloss patterns conform to the renderer-scope detection rules by construction: two-block exact-match bold labels with the blank `>` separator line, single-paragraph colon-separated glosses.
- `npm run audit:orphans`: 0 orphans across 0 guides (audit at `vector/audits/orphan-terms-2026-06-10.md`, unchanged).
- Bounded grep sweep: 5 Design Hook, 2 Read Next, 1 Subguide queued labels; 48 `|term|` markers; 48 glossary keys all marker-referenced.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **Em-dash density in inherited copy.** 51 lines in the file carry em-dashes from the original conversion, including the five verbatim-converted Design Hook bodies and most glossary definitions. Only the `warp bubble` entry was touched (punctuation-only, to enable its gloss). The rest is B.2's lane.
- **Glossary entry length.** 48 entries and the majority of inherited definitions run 3 to 6 sentences against the 1 to 3 sentence rule (e.g. `G-force tolerance`, `spatial orientation`, `Category A spatial disorientation`, `galvanic vestibular stimulation`, `pilot as mission director`, `Supervisory control`, `Synthetic orientation`, `Failure modes`, `hybrid models`, `training environment`). Trimming is content work; flagged for B.2.
- **Second-person address in glossary entries (voice flag).** `meditation chamber` ("This is where your RV training provides irreplaceable input — you know what environmental conditions...") and `TransDimensional Mapping` ("The digital TDM workspace you're designing for T1...") address Justin directly and read as personal notes rather than library copy. The TDM entry's second-person sentence was deliberately excluded from its inline gloss, but the frontmatter entries themselves are B.2's call — this is the strongest invitational-posture question in the guide.
- **Marker-gap opportunities needing prose touches (B.2):** (1) Puthoff appears only possessively in `#consciousness-cockpit`; no `Hal Puthoff` entry, though dird-13 and dird-15 both carry one — a B.2 prose touch could create the first-mention opportunity. (2) "spatial disorientation" in `#g-force-revolution` precedes the `|Category A spatial disorientation|` marker but isn't the exact key; the exact-match rule blocks marking it without rewording. (3) Birdie Jaworski is identified only inside the `TransDimensional Mapping` entry, never in body prose.
- **Declined gloss candidates for B.2's consideration:** `sensor fusion` and `progressive disclosure` (`#new-information`). Both entries have clean em-dash-free opening sentences if B.2 wants them glossed; the call here was that "fusion across exotic modalities" and "disclosure of complexity so operators aren't overwhelmed" partially define them in place.
- **No Territory Bridge, contra the brief's worked example.** If Justin wants the worked example's DIRD 13/15/SED bridge in `#g-force-revolution`, it needs a sentence of body prose first that actually draws the cross-territory line — content work, surfaced for B.2 or a Justin pass.
- **`source.url` missing.** Allowed for DIRD-source guides per locked decision; no stable public URL for DIRD 28.
- **`status: draft`** stands until the B.2 voice pass completes, matching the dird-13/14/15 sequence. Status flips are the orchestrator's call.
- **DIRD coverage complete; B.1 is not yet library-complete.** This closes the format track across all four DIRD guides (13/14/15/28), but `uapx-field-methods.md` still carries zero callouts and has not had its per-guide B.1 pass; `uap-field-map.md` already has its 42 callouts from the original authoring. The pipeline has remaining work after this guide.
- **B.2 next:** the guide now has a clean canonical structure for the voice sweep.
