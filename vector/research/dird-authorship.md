# DIRD authorship — research notes

**Status:** Working notes, not authoritative.
**Started:** 2026-05-25
**Purpose:** Ground the deferred `source.authors` slot fix for DIRDs 14 and 28 (and re-audit DIRDs 13 and 15) in a future B.1 sub-pass.

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
| Advanced Space Propulsion Based on Vacuum Fluctuation Energy | Eric Davis / AAWSAP technical contributors | Often referenced in the same cluster of exotic-propulsion studies |
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
| `dird-15-vacuum-spacetime-engineering` | DIRD 15: Advanced Space Propulsion Based on Vacuum Spacetime Metric Engineering | `Hal Puthoff` | **Possibly contested.** Justin's table lists "Advanced Space Propulsion Based on Vacuum Fluctuation Energy" → Eric Davis / AAWSAP technical contributors. Titles are close but not identical (Vacuum *Spacetime Metric Engineering* vs. Vacuum *Fluctuation Energy*). | **Open.** Two possibilities: (a) Same DIRD, different working title — our `Hal Puthoff` may be wrong; (b) Different DIRDs entirely (Vacuum Fluctuation Energy might be DIRD 24 "Concepts for Extracting Energy from the Quantum Vacuum"). Needs PDF cover sheet check or further secondary-source check. |
| `dird-28-breakthrough-cockpits` | DIRD 28: Cockpits in the Era of Breakthrough Flight | `DIA / AAWSA Program` | **Unknown.** Not in the working table. | **Open.** Institutional fallback likely correct — this isn't a physics-heavy DIRD where Puthoff or Davis would be the natural author. |
| `emergent-quantization` | (non-DIRD) | (varies) | — | Out of scope for this research. |
| `quantum-gravity` | (non-DIRD) | (varies) | — | Out of scope. |
| `uap-field-map` | (non-DIRD) | (varies) | — | Out of scope. |
| `uapx-field-methods` | (non-DIRD) | (varies) | — | Out of scope. |

---

## Open questions for the future fix

1. **DIRD 15 attribution.** Is `Hal Puthoff` (current) correct, or is it actually Eric Davis / AAWSAP technical contributors per the working table? Title similarity suggests this needs grounded confirmation before any edit. Possible angles:
   - Check the DIRD 15 PDF inside-cover for any non-redacted attribution language.
   - Cross-reference Davis's published work (Davis has a substantial public catalog around vacuum propulsion; if he wrote DIRD 15, related papers under his name should exist).
   - Check FOIA-disclosed AAWSAP author lists if any have been published since.

2. **DIRDs 14 and 28 (the original deferred question).** Neither is in the working table. Decision tree:
   - If research surfaces a personal author → use it.
   - If research dead-ends → use `DIA / AAWSAP Program` (institutional, spelling-corrected) as the canonical fallback. Document in the schema spec that institutional values are valid for redacted-author DIRDs.

3. **`et al.` vs. specific naming on DIRD 13.** Current `Puthoff et al.` — is the "et al." sourced (i.e., we know there were co-authors), or was it a hedge? If unsourced, tighten to `Hal Puthoff` for consistency with DIRD 15.

4. **Eric Davis institutional affiliation.** If we attribute DIRDs to Davis, do we use just his name or "Eric Davis (EarthTech International)" parallel to the `Harold Puthoff (EarthTech International)` formatting we already use in `core/lab/upcoming.ts:35`? Pick a convention.

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
