# DIRD authorship — research notes

**Status:** Working notes, not authoritative.
**Started:** 2026-05-25
**Purpose:** Ground the deferred `source.authors` slot fix for DIRDs 14 and 28 in a future B.1 sub-pass. Audit of DIRDs 13 and 15 included for completeness — DIRD 15 confirmed correct 2026-05-25; DIRD 13's `Puthoff et al.` is a small open question.

---

## Why this file exists

The PDF cover pages for the AAWSAP DIRDs have their personal-author lines FOIA-redacted under (b)(6) — see [[reference_dird_pdf_authors_redacted]]. PR #51 originally framed DIRDs 14 and 28's `source.authors: DIA / AAWSA Program` as a "venue value in the authors slot" drift. PR #60 (the follow-up) deferred the slot question because it turned out to be tangled with a research question: who actually authored each DIRD, given the redactions?

This file collects what we know from secondary sources so a future pass can fill `source.authors` with grounded values rather than institutional placeholders.

---

## Justin's working table (2026-05-25)

Compiled from a mix of FOIA-disclosed authorship, interviews, and secondary reporting in UFO / aerospace press. Not authoritative — see caveats below.

| DIRD title (as researched) | Commonly associated author | Notes |
| --- | --- | --- |
| Warp Drive, Dark Energy, and the Manipulation of Extra Dimensions | Hal Puthoff | Marquee "Puthoff" report — one of the most-cited DIRDs |
| Traversable Wormholes, Stargates, and Negative Energy | Hal Puthoff | Highly discussed exotic-physics DIRD frequently linked to Puthoff |
| Aerospace Applications of Quantum Vacuum Fluctuations | Hal Puthoff | Grouped with Puthoff's speculative physics work |
| Antigravity for Aerospace Applications | Eric Davis / AAWSAP technical contributors | Commonly discussed as a technical DIRD; public attribution less neat than the headline titles |
| Advanced Space Propulsion Based on Vacuum Fluctuation Energy | Eric Davis / AAWSAP technical contributors | Often referenced in the same cluster of exotic-propulsion studies. **Title-cluster note (2026-05-25):** likely refers to DIRD 24 ("Concepts for Extracting Energy from the Quantum Vacuum"), *not* DIRD 15 ("Vacuum Spacetime Metric Engineering"). The two titles cluster around "Vacuum + Energy / Engineering" but the underlying papers are distinct — DIRD 15 is about reshaping spacetime; DIRD 24 is about energy extraction. |
| Alcubierre Warp Drive and Related Concepts | Hal Puthoff / AAWSAP contributors | Often discussed as part of the broader warp-drive set, not a clean single-author work |
| Overview of Torsion Fields and Related Phenomena | AAWSAP contributors | Program-era technical paper, no celebrity attribution in UFO discourse |

**Caveats (Justin's own):**

- Public sources don't always map every DIRD title to a definitively published author name.
- Some attributions are reconstructed from FOIA releases, interviews, and secondary reporting rather than a neat official author list.
- Safe shorthand: **Puthoff** is the marquee name for the physics-heavy DIRDs; **Eric Davis** is the marquee name for the program's technical coordination and several of the associated studies.

---

## Applied to the eight published portfolio guides

Cross-referencing the working table against `core/lab/guides/*.md`. Title variations in the research table don't always map cleanly to the canonical DIRD titles, so flag carefully.

| Slug | Canonical title | Current `source.authors` | Research-grounded best guess | Status |
| --- | --- | --- | --- | --- |
| `dird-13-warp-drive` | DIRD 13: Warp Drive, Dark Energy, and the Manipulation of Extra Dimensions | `Puthoff et al.` | Hal Puthoff (Justin's "Warp Drive, Dark Energy..." entry) | **Looks correct.** Possibly tighten to `Hal Puthoff` if the `et al.` is unsourced. |
| `dird-14-superconductors-gravity` | DIRD 14: The Role of Superconductors in Gravity Research | `DIA / AAWSA Program` | **Unknown.** Not in the working table. | **Open.** Institutional fallback may be the right answer if no personal author surfaces. |
| `dird-15-vacuum-spacetime-engineering` | DIRD 15: Advanced Space Propulsion Based on Vacuum Spacetime Metric Engineering | `Hal Puthoff` | Hal Puthoff (confirmed). Title-cluster confusion with Justin's "Vacuum Fluctuation Energy" entry resolved 2026-05-25 — that entry maps to a different DIRD. | **Confirmed.** Two independent sources: (1) DIRD 15 body, line 84: "DIRD 15 is the theoretical spine of the entire collection. Written by Hal Puthoff at the Institute for Advanced Studies at Austin (now EarthTech International)." (2) Upstream brief at `dird-technology-briefs.md`: "Author / Institution: Harold 'Hal' Puthoff / Institute for Advanced Studies at Austin." No edit needed. Could optionally tighten to `Hal Puthoff (Institute for Advanced Studies at Austin)` parallel to the `Harold Puthoff (EarthTech International)` formatting on `core/lab/upcoming.ts:35` if institutional context is wanted, but the bare `Hal Puthoff` is canonical and consistent with DIRD 13's `Puthoff et al.`. |
| `dird-28-breakthrough-cockpits` | DIRD 28: Cockpits in the Era of Breakthrough Flight | `DIA / AAWSAP Program` | **No personal author surfaced.** Not in the working table; upstream brief carries only the institutional line. | **Resolved 2026-06-09 via the fallback branch** (B.1 sweep, this guide's pass). Re-checked the upstream brief's DIRD 28 entry (`dird-technology-briefs.md`, "Cockpits in the Era of Breakthrough Flight"): "Author / Institution: DIA / AAWSA Program" — institutional only, matching the redacted-cover posture. Per the decision tree below, the canonical spelling-corrected fallback `DIA / AAWSAP Program` shipped in the guide's `source.authors`. |
| `emergent-quantization` | (non-DIRD) | (varies) | — | Out of scope for this research. |
| `quantum-gravity` | (non-DIRD) | (varies) | — | Out of scope. |
| `uap-field-map` | (non-DIRD) | (varies) | — | Out of scope. |
| `uapx-field-methods` | (non-DIRD) | (varies) | — | Out of scope. |

---

## Open questions for the future fix

1. ~~**DIRD 15 attribution.**~~ **Resolved 2026-05-25.** Hal Puthoff confirmed by body text + upstream brief. The working-table entry that looked like a contradiction was about a different DIRD (likely DIRD 24, "Concepts for Extracting Energy from the Quantum Vacuum") — title-cluster confusion between "Vacuum Spacetime Metric Engineering" and "Vacuum Fluctuation Energy."

2. **DIRDs 14 and 28 (the original deferred question).** Neither is in the working table. Decision tree:
   - If research surfaces a personal author → use it.
   - If research dead-ends → use `DIA / AAWSAP Program` (institutional, spelling-corrected) as the canonical fallback. Document in the schema spec that institutional values are valid for redacted-author DIRDs.

   **DIRD 28: resolved 2026-06-09** via the dead-end branch during its B.1 sweep — see the table row above. **DIRD 14 remains open**; its slot (including the `AAWSA`/`AAWSAP` mismatch noted in its B.1 log) is untouched and stays deferred.

3. **`et al.` vs. specific naming on DIRD 13.** Current `Puthoff et al.` — is the "et al." sourced (i.e., we know there were co-authors), or was it a hedge? If unsourced, tighten to `Hal Puthoff` for consistency with DIRD 15.

4. **Eric Davis institutional affiliation.** If we attribute DIRDs to Davis, do we use just his name or "Eric Davis (EarthTech International)" parallel to the `Harold Puthoff (EarthTech International)` formatting we already use in `core/lab/upcoming.ts:35`? Pick a convention.

5. **DIRD 24 attribution.** Not yet a published portfolio guide, but worth recording: based on the working table + the title-cluster note above, DIRD 24 ("Concepts for Extracting Energy from the Quantum Vacuum") most likely traces to Eric Davis / AAWSAP technical contributors rather than Puthoff. Useful pre-attribution if DIRD 24 ever gets built out as a guide.

---

## What lives where

- **This file** — working notes, claims, open questions. Add to it as research lands.
- **`core/lab/guides/*.md`** `source.authors:` — only update once a claim here is grounded enough to ship. Until then, current values stand.
- **[[reference_dird_pdf_authors_redacted]]** — memory entry on the redaction posture, for future agents who hit this question cold.
- **PR #60 mission log** (`vector/missions/perihelion-b1-dird-frontmatter-followups.md`) — captures the deferral framing and points back here.

---

## Sources to chase next

Not yet consulted; listed for the next research-pass agent:

- `~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/dird-technology-briefs.md` — upstream brief overview; consistently uses institutional `DIA / AAWSA Program` (no P) for unattributed DIRDs, so doesn't add personal attribution but confirms the institutional fallback convention.
- The DIRD PDFs themselves — inside covers occasionally have non-redacted attribution language ("produced under contract DIA-08-1003-013" etc.). PDF text extraction tools weren't available in the PR #60 session; install `poppler` (brew) or run a one-off `pdftotext` pass to surface anything not visible on the cover.
- Eric Davis's published bibliography (EarthTech, Institute for Advanced Studies at Austin) — should cluster with any DIRDs he authored.
- Hal Puthoff's published bibliography — same.
- Public AAWSAP discussions: Lacatski / Kelleher / Knapp's "Skinwalkers at the Pentagon," any Congressional disclosures, journalist interviews with program participants.
