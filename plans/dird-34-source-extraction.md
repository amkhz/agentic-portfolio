# DIRD 34 Source Extraction

> Extracted 2026-07-02 from the Black Vault FOIA copy (full text, OCR layer). Companion to `plans/dird-34-prework.md`.
>
> **Canonical home:** design-futures, alongside `guide-library-tracker.md`. The portfolio copy is a snapshot mirror (format-rules convention) so the Flight Deck build can read the final section without leaving its repo.
>
> **Role in the guide-builder pipeline:** independent replication, not reader input. Produced by an outside session over the FOIA OCR copy — Phase 3 chunk readers work the clean local PDF *blind* to this file; a dedicated verification reader takes the OCR diff notes below as its chunk; the Phase 4 assembler receives this file as a labeled secondary input and reconciles. Divergence between this extraction and the blind digests is signal, not error.
>
> **Cross-repo contract:** the Flight Deck (Works 01) colophon depends on the three Design Hooks below surviving into the delivered guide in some form.

---

## Provenance & document facts

- **Title:** Cognitive Limits on Simultaneous Control of Multiple Unmanned Spacecraft
- **Dates:** 15 December 2010; ICOD 8 September 2010. Document ID `DIA-08-1101-001`. FY2010 AAWSAP series.
- **Author:** redacted in the release under (b)(6). Public DIRD lists attribute Dr. R. Genik (Wayne State). **Corroboration inside the document:** reference 12 is a Genik self-citation ("see Genik for a prognosis on generation-after-next technologies including NIRS, PET, fMRI, and MEG" — Genik et al., *Aviat Space Environ Med* 76, 2005, on cognitive avionics). The attribution holds. Worth a `source.notes` line since the release itself redacts authorship.
- **Structure:** Summary; Ch.1 Introduction; Ch.2 Measurement of Mental Workload (subjective / performance / physiological); Ch.3 ATC studies + modeling; Ch.4 Multiple semi-automated vehicle command; Ch.5 Discussion; Ch.6 Conclusions; 52 references.
- **Framing scenario:** a crewed deep-space fleet ~40 years out — trailing nuclear-powered electromagnet craft for radiation shielding, halo radar scouts, exploration/mining craft — supervised by **one remote pilot on station at a time**. Zero peer-reviewed literature existed on remote piloting of multiple spacecraft, so the paper triangulates from ATC research and multi-UAV supervision.

## OCR diff notes (for comparison against the local copy)

Classification banners are garbled throughout (expected — strike-through FOUO markings defeat OCR). Substantive OCR artifacts worth verifying against the clean copy:

- "inter-beat-interval (ISI)" — should almost certainly read **IBI** (the table later uses IBI-consistent definitions)
- "5WAT" → **SWAT** (Subjective Workload Assessment Technique)
- "Landsdown" in body vs. **Lansdown** in ref 43 — check which the print copy uses
- "paints out" → "points out" (Hancock paragraph)
- Figure 4 y-axis label fragments; Table 2 significance markers partially mangled — verify the correlation values (NA×TLX .98, NA×IHR .98, NA×SBF −.97) against the print table
- Ref 50 (Kornguth) attaches to the Cummings heterogeneity sentence — verify the citation mapping; it reads like a possible off-by-one against ref 51

## Findings ledger (the numbers)

These are the load-bearing quantitative claims; every one is designable:

1. **16 / 7 / 4.** Cognitive ceiling on simultaneously controlled craft: **16** for simple destination selection, **7** for moderately complex piloting/mission tasks, **4** for complex heterogeneous craft. No evidence a complete mental picture holds beyond ~16 objects even with external working-memory augmentation. The 4 aligns with working-memory capacity (3–5 disparate objects).
2. **~70% utilization ceiling.** From queuing-theory supervision work (Cummings): operators occupied ~70% of the time max out big-picture retention; performance degrades beyond it. Utilization = fraction of time actively addressing issues vs. monitoring.
3. **20–25% false-alarm rate is *optimal*.** The Wickens dual-task result: when automated alerts are correct more than ~80% of the time, pilots stop verifying (automation bias) and stop cross-checking the display for missed conflicts. Deliberate imperfection keeps the human working *alongside* the automation. The paper's CB-radio squelch analogy: too high and you miss traffic, too low and it's all noise.
4. **The workload–performance curve** (Figure 1): regions **D** (disengaged, demand too low) → **A1** (effort spent maintaining vigilance) → **A2** (optimal — trained operator, minimal effort, stable performance) → **A3** (effort keeps pace with rising demand) → **B** (degradation onset) → **C** (overload). Performance is flat across A1–A3; the operator's *effort* is what varies. This is a complete, renderable model.
5. **Overload is physiologically classifiable at >98%.** Wilson's neural-net reanalysis of the Brookings ATC data classified operational vs. overloaded states from psychophysiology (EEG spectra, blink rate, respiration) in >98% of cases. The paper predicts near-perfect real-time overload prediction within five years of dedicated study. Notable negative result: heart rate and HRV did *not* correlate in Brookings; the Collet in-situ study found skin conductance, skin blood flow, and instantaneous HR correlating with aircraft count (NA×TLX r=.98).
6. **Complexity, not count, drives workload.** Boag/MARC: a small number of aircraft in conflict outweighs many in clean flow. Brookings: complexity modulation degraded performance at even 6 aircraft; volume alone didn't trend the same way.
7. **Augmentation = external working memory.** The through-line across ATC memory blocks, stored-instruction "repeat" buttons (Dixon), and dual displays (Cummings): effective augmentation holds information for quick visual retrieval that the brain would otherwise burn working-memory registers on.
8. **Adaptive automation keeps the operator in-band.** AA rebalances workload between computer and human in both directions — including *adding* routine tasks and non-critical mission information at low demand to prevent disengagement (region D). Kaber: primary-task performance was highest with AA active. This is the literal mechanism behind DIRD 28's "meaningful work" claim.
9. **Wait time / neglect time / interaction time** (Cummings queuing model): each supervised vehicle cycles through autonomous operation (neglect time), degradation below threshold, waiting (wait time), and operator servicing (interaction time). Interface complexity inflates interaction time and drops the ceiling from 16 toward 7.
10. **Human–automation consensus** drives system performance in re-planning tasks — operators split into distinct response groups to automated suggestions; the interaction model, not the algorithm, dominated outcomes.

## Candidate guide structure (6–9 sections, per format rules)

1. `{#big-picture}` — the fleet scenario, why zero literature exists, ATC + UAV as the two analogue bodies
2. `{#workload-curve}` — the D→C model; effort vs. performance; "losing the picture"
3. `{#measuring-minds}` — the workload-measurement toolkit: TLX/SWAT, utilization, secondary-task paradigms, the physiological menu (EEG bands, IBI/HRV, ocular, electrodermal, cortisol)
4. `{#atc-evidence}` — Brookings, Boag/MARC, Collet in-situ; complexity beats count; the 1981 PATCO strike as the research gap footnote
5. `{#supervising-fleets}` — UAV studies: Dixon, Ruff's four-craft max, Cummings utilization/fan-out, swarms-as-units, wait-time queuing
6. `{#the-numbers}` — 16/7/4, 70%, 20–25%; the chess-grandmaster framing (how many boards before every glance is cold analysis?)
7. `{#design-implications}` — see hooks below

## Callout candidates

> **Design Hook** — *The alarm that is deliberately wrong.* A 20–25% false-alarm rate is not a defect budget; it's the mechanism that keeps the supervisor verifying instead of trusting. Alert systems for exotic flight should be designed with calibrated imperfection and visible verification affordances.

> **Design Hook** — *The operator-state instrument.* Overload is classifiable from physiology at >98% accuracy in ATC data. A supervisory cockpit can carry a real-time operator-state channel (blink rate, EEG spectra, respiration) as a first-class instrument — the system watching the watcher, rebalancing via adaptive automation before region B.

> **Design Hook** — *Design to the 4, display to the 16.* Complex heterogeneous craft cap at 4; simple destination-tracking caps at 16. A fleet interface should collapse heterogeneous complexity into homogeneous abstractions (swarms count as one) to climb the ceiling — the interface's job is moving craft from the 4-class to the 16-class.

> **Territory Bridge** — the physiological-monitoring menu here (Ch.2) is the same instrument set the consciousness-cockpit end of DIRD 28's spectrum needs (EEG coherence, HRV as coherence proxies) — T1's supervisory research and its most speculative design thread share hardware.

> **Read Next** — DIRD 28 (in library): this paper is the evidence base behind its pilot-as-mission-director and meaningful-work claims.

## Glossary candidates (first pass, ~20)

situational awareness ("the big picture"), mental workload, multiple resource theory, task demand, utilization, NASA-TLX, SWAT, adaptive automation, automation bias, vigilance decrement, working memory, TRACON, sector, transition, MARC (relational complexity), P300 / event-related potential, heart rate variability (IBI), skin conductance response, neglect time / wait time / interaction time, management by consent / by exception, fan-out, human–automation consensus

## Figure watchlist

- **Figure 1** (workload–performance curve, D→C) — the keeper. Simple 1-D curve; redraw candidate rather than crop.
- **Figure 5** (Hendy time–intensity–effort loop) — second candidate; the OCR suggests the source render is rough.
- Figure 3 (TRACON photos) and Figure 6 (UAV lineup) — period photos, likely skip (the doc itself carries a photo-dissemination warning).

## Voice notes

- "Cyborg-enhanced astrobots are a topic for another tome." — the paper has actual wit; the guide's register can honor it.
- The chess-grandmaster passage and the CB-squelch analogy are the two most teachable images in the document (paraphrase, don't quote at length).
- Footnote texture worth keeping: most ATC errors are procedural, not near-misses; the PATCO strike hollowed out 1980s ATC research.

---

## What this changes for the Flight Deck (movement 3 upgrade)

The prework dossier assumed DIRD 34 would supply qualitative support. It supplies **operating parameters**:

1. **The translation layer gets a utilization budget.** Its proposal cadence should hold the operator near the A2 band — visibly. A small utilization meter (time-busy fraction trending toward 70%) makes the meaningful-work argument *legible in the interface* instead of asserted in the colophon.
2. **The drill's alert system embraces calibrated imperfection.** One advisory in the drill sequence should be a verifiable false alarm the operator checks and dismisses — demonstrating the 20–25% principle. This is a braver, better-grounded design move than a perfectly clairvoyant alert system, and it gives movement 4 a second beat.
3. **The operator-state strip is now evidence-based, not speculative.** A slim physiological channel (blink/respiration/EEG-style traces) can live on the deck in *instrumented* mode already — then the paradigm slider doesn't introduce biometrics at the consciousness end, it *promotes* them from monitoring channel to control channel. That's a cleaner narrative arc: the slider reweights an instrument that was there all along.
4. **The workload curve is chartable.** The D→C model could appear in the deck's colophon or as a diegetic training display — it's the theory of the whole piece in one curve.
5. **Colophon citation upgrades immediately.** Movement 3 can now cite DIRD 34 directly (FOIA copy, stable Black Vault URL) rather than through DIRD 28's summary. The "guide forthcoming" note still applies, but the source line is primary.

Feed items 1–3 into `/shape` as interaction-model inputs; they change key states, not just copy.
