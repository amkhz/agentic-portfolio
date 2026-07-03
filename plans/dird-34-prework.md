# DIRD 34 Prework Dossier

> Companion to `plans/works-01-the-flight-deck.md`. Prepared 2026-07-02. Purpose: clear the supervisory-control debt that Flight Deck movement 3 (intent-and-destination control) leans on, without blocking the build. Three tracks: source acquisition (done), upstream handoff (drafted below), and interim grounding (the deck can cite honestly today).

---

## 1. Source acquisition — resolved

**DIRD 34: Cognitive Limits on Simultaneous Control of Multiple Unmanned Spacecraft**
Dr. R. Genik, Wayne State University. ~30 pages. Released in the DIA's March 2022 FOIA production of 37 DIRDs.

- Primary: The Black Vault direct PDF —
  `https://documents2.theblackvault.com/documents/dia/AAWSAP-DIRDs/DIRD_34-DIRD_Cognitive_Limits_on_Simultaneous_Control_of_Multiple_Unmanned_Spacecraft.pdf`
- Mirror: Internet Archive, `archive.org/details/defence-intelligence-reference-documents_DIRDs` (full DIRD set, multiple formats)

**Numbering note for the frontmatter:** early public DIRD lists (2018–2019) number this paper 28 or 29 depending on the list; the released file is `DIRD_34`, and the library already follows release-file numbering (dird-36 precedent). Keep `dird-34`. Worth a `source.notes` line, matching the dird-14 convention for date/numbering discrepancies.

Genik also authored DIRDs on brain-machine interfaces and non-limb device control — adjacent threads for the consciousness end of the paradigm slider. Flag for the upstream instance's source library, not for this guide.

## 2. Upcoming-shelf entry — ready to paste

Add to `core/lab/upcoming.ts` (T1 block):

```ts
{
  id: 'dird-34-supervisory-control',
  title: 'DIRD 34: Cognitive Limits on Supervisory Control',
  source: 'R. Genik (Wayne State) / DIA AAWSAP Program',
  territory: 'T1',
  status: 'planned',
  note: 'The supervisory-control research behind the Flight Deck\u2019s mission-director model. Queued by DIRD 28.',
},
```

(Title compressed for the card; full paper title lives in the guide frontmatter when authored. Adjust `status` to `'researching'` once the upstream instance picks it up.)

## 3. Upstream handoff — for the design-futures authoring instance

What the Flight Deck needs this guide to surface (its design hooks, in priority order):

1. **The meaningful-work problem.** The core claim DIRD 28 borrows: a supervisor with nothing to do loses the mental model and can't respond when it matters. The guide should give this its full treatment — vigilance decrement, out-of-the-loop performance, complacency — because it's the design justification for movement 3's entire interaction model.
2. **Fan-out and attention economics.** How many autonomous systems can one human meaningfully supervise, and what does "meaningfully" cost? Even though the deck supervises one craft, the attention-budget framing shapes how much the translation layer is allowed to ask of the operator.
3. **Delegation interfaces.** The open literature around this DIRD includes delegation-type interfaces (Miller's Playbook; Parasuraman's RoboFlag studies showing flexible delegation improves supervision). The deck's "approve the translation layer's proposals" pattern is a delegation interface; the guide naming that lineage strengthens the colophon.
4. **Levels of automation.** Sheridan's supervisory-control framing and automation-level taxonomies — the scholarly spine under DIRD 28's control-paradigm spectrum, and therefore under the paradigm slider.

Suggested literature seeds beyond the DIRD itself: Sheridan (supervisory control), Cummings (human supervision of multiple UAVs, fan-out), Parasuraman (adaptive automation; RoboFlag delegation studies), Miller & Funk (Playbook mixed-initiative interface), Wickens (attention/task switching). A 2016 ARL survey of multi-robot control research (arXiv 1606.01288) is a useful citation map.

## 4. Interim grounding for movement 3 — unblocks the build

The deck ships before the guide. Three claims movement 3 currently leans on, each safely citable today:

- **Meaningful engagement maintains situational awareness** — DIRD 28's own text summarizes DIRD 34 on this point, so the colophon can cite DIRD 28 §Control Paradigms directly, which is already in the library.
- **Out-of-the-loop supervisors respond poorly to failures** — independently well-established in the open human-factors literature (vigilance/complacency research); not dependent on DIRD 34's release.
- **Pilot-as-mission-director requires genuine cognitive work, not busywork** — DIRD 28's framing; the drill (movement 4) is the demonstration.

Colophon posture until the guide ships: link movement 3's source line to the DIRD 28 guide with a "DIRD 34 guide forthcoming" note — honest, and it turns the debt into a visible roadmap beat, which fits the reader's-notebook register.

## 5. Sequencing

- `upcoming.ts` entry: any time, independent PR, two minutes.
- Upstream handoff: paste §3 into `~/projects/design-futures/` triage on the next authoring session.
- Guide authoring: after Flight Deck phase 4 at the earliest — nothing in the build blocks on it.
- When the guide lands: swap the colophon's interim citation, flip the upcoming entry to a real card, and add the DIRD 28 ↔ 34 cross-links (Read Next both directions).
