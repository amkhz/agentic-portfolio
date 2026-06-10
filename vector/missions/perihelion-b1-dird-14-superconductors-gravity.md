# Mission: B.1 content sweep — dird-14-superconductors-gravity

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b1-dird-14-superconductors-gravity` (off main, after PR #82)
**Lane:** Workstream B.1 per-guide pipeline, fourth guide. Spec: `plans/perihelion-format-alignment-brief.md` + `plans/perihelion-b1-renderer-scope.md`. Templates: `vector/missions/perihelion-b1-quantum-gravity.md`, `vector/missions/perihelion-b1-dird-13-warp-drive.md`, `vector/missions/perihelion-b1-emergent-quantization.md`.

## Scope

`dird-14-superconductors-gravity.md` arrived in the dird-13 profile: a rich 45-entry glossary and 45 `|term|` markers already in place, but zero callouts, zero inline glosses, and `figures: []` present against format rules. This sweep is the full B.1 retrofit on that base.

## What changed

- **Glossary: 45 entries in, 45 out.** Audit found no duplicate keys, no unused entries (all 45 are referenced by markers), and no orphan markers. Shared-term alignment check against dird-15 (Extended Electrodynamics, Cooper pairs, Josephson junction, Hoverr thruster, Morningbird Space, vacuum state display, coherence feedback system): substantively aligned with per-guide framing, no contradictions; nothing rewritten. No person entries added: unlike dird-13, the body never carries a full literal name lacking an entry (`Puthoff's`, `Glenn's`, and `Sakharov's proposal` are possessive or covered by marked terms; adding markers would require prose rewriting, which is B.2's lane).
- **1 new `|term|` marker** on a true first mention: `|quantum coherence|` in `#superconductivity-basics` ("In a superconductor, |quantum coherence| extends across the entire material"); the prior sole marker sat at the section's closing paragraph. Both now resolve, per the dird-13 precedent. 46 resolved term nodes total.
- **3 inline definition glosses** (colon separator per renderer scope), only for terms the prose does not define in place: gravity engineering (`#big-picture`), Marx generator (`#podkletnov`), Rindler horizon (`#morningbird`). Sourced verbatim from the frontmatter entries; the gravity engineering and Rindler horizon glosses use the first two sentences of their longer entries. To keep glosses em-dash-free, one punctuation-only restructure (em-dash to comma, zero wording changes) was made in each of those two frontmatter entries, per the dird-13 precedent. The Marx generator entry's first sentence was already em-dash-free.
- **7 callouts:**
  - Design Hook ×4 — the four bold-led paragraphs of the closing `#design-implications` section (laboratory instrument interface, gravity engineering dashboard, coherence-as-mechanism thread, replication crisis as design problem) converted to proper callouts, prose verbatim, per the brief's conversion guidance. The four bold-led model paragraphs in `#theoretical-models` are content structure, not design implications; left as paragraphs per the emergent-quantization precedent.
  - Read Next ×2 — DIRD 15 (in `#theoretical-models`, after the Sakharov-Puthoff paragraph that explicitly links the two guides), DIRD 13 + DIRD 28 (in `#design-implications`, after the opening paragraph that names both as the framework/application counterparts). All three referenced guides are in the library.
  - Territory Bridge ×1 — T3 to T1 via the coherence amplification hypothesis (in `#theoretical-models`, after the paragraph that explicitly names Territory 1 and the consciousness-coherence connection).
  - No Subguide queued: DIRD 19 is the only out-of-library DIRD referenced, once in passing in `#design-implications`, and it already carries a Subguide queued callout in `quantum-gravity.md`; not duplicated, per the dird-13 DIRD 36 precedent.
- **`figures: []` removed** (format rules: omit the field when empty).
- **`source.authors` left untouched, as deferred.** The personal-author lines on the DIRD 14 and 28 covers are FOIA-redacted and the project-wide research decision on the slot is pending; this is a deliberate deferral, not a gap. Noting for that decision: the current value reads `DIA / AAWSA Program` while `source.venue` reads `DIA / AAWSAP Program` (missing P); resolve both together when the slot is settled.

## Verification

- Parser sweep (throwaway tsx over `core/lab/parse-guide.ts`, not committed): all 7 callouts detect on the right variant, all 3 glosses detect as `definition` with correct terms, zero `plain` fall-throughs, zero parse warnings, 7 sections with anchors unchanged, 45/45 glossary entries referenced, 46 resolved term nodes.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **`source.authors` deferred** (see above): leave alone until the FOIA-redaction research decision lands; fix the `AAWSA`/`AAWSAP` mismatch as part of that same decision.
- **`source.url` missing.** Allowed for DIRD-source guides per locked decision; no stable public URL for DIRD 14.
- **`source.notes` is a non-schema field** carrying the ICOD-date colophon note from the Track A frontmatter pass. Deliberate; left in place, flagged per the brief's don't-strip-unknown-fields rule.
- **Em-dash density in inherited copy.** The body prose and most glossary definitions carry heavy em-dash usage from the original conversion (62 lines in the file). Only the two glossed entries were touched (punctuation-only). The rest is B.2's lane.
- **Glossary entry length.** Many inherited definitions run 4 to 8 sentences against the 1 to 3 sentence rule (e.g. `gravity engineering`, `critical temperature`, `Meissner effect`, `experimental artifacts`, `64 times the speed of light`, `coherence-as-mechanism thread`). Trimming is content work; flagged for B.2.
- **Marker-gap opportunities needing prose touches (B.2):** (1) Chance Glenn is never introduced in body prose; `#morningbird` jumps from the |Morningbird Space| marker to "Glenn's approach" and relies on the glossary entry to identify him. (2) The plural "Josephson junctions" in the `#morningbird` SQUIDs parenthetical precedes the singular `|Josephson junction|` marker later in the same paragraph; the exact-match rule blocks marking it without rewording. (3) No `Hal Puthoff` entry, though Puthoff is referenced six times possessively; a B.2 prose touch could create the first-mention opportunity dird-13 has.
- **`status: draft`** stands until the B.2 voice pass completes, matching the dird-13 sequence (status flipped post-B.2).
- **B.2 next:** the guide now has a clean canonical structure for the voice sweep.
