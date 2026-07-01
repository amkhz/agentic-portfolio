# /impeccable critique — Perihelion "The Reading Room" (both modes)
Date: 2026-07-01 · Scope: lab reading experience (library index + guide reader)

## Score: 8.0 / 10
Up from the 7.5 at the #150 library-refresh stage — the reader rail, the motion convergence, and the Bricolage/Newsreader pairing tightened it. A strong, distinctive, genuinely un-template reading system. The one soft spot is metadata density on the register row.

| Dimension | Score | Note |
|---|---|---|
| AI-slop / distinctiveness | 9 | Ledger, not cards; type-led, not glowy; real provenance. Reads hand-built. |
| Typography | 9 | Three-face contrast (Bricolage sans display vs Newsreader serif body vs JetBrains mono) does real hierarchical work; per-mode weight is craft. |
| Visual hierarchy | 8 | Title-led and correct; register-row metadata is the pressure point. |
| Information architecture | 8 | Register + territory grouping + margin rail + guide/glossary tabs all legible. |
| Emotional resonance | 8 | Library is warm (manifesto + sigil + "pull up a chair"); the guide reader entry is cooler. |
| Cognitive load | 7 | The register row carries ~9 elements; watch the gutter stack. |

## Anti-patterns verdict: PASS
No card grid (the library is an accession ledger), no gradient text, no glassmorphism, no hero-metric layout, no generic fonts. The type-led no-cover direction genuinely earns its restraint — the three-face system creates the hierarchy that imagery would otherwise carry. If shown this and told "AI made it," nobody would believe you.

## What's genuinely strong
1. **The Accession Register is the star.** Call-number gutter + full horizontal title + Newsreader dek + authorship + venue *hung in the outer margin* is a real archival/editorial voice, not a portfolio trope. `RegisterShelf.tsx` — the metaphor is committed and consistent (pipeline guides render in the same grammar, muted + un-accessioned). This is the distinctiveness the recalibration was chasing.
2. **Invitational tone, no gatekeeping.** "Written for designers who haven't found a reason to look here yet, but might. Pull up a chair." (`LibraryHeader.tsx:15`) — meets the audience where they are; clean against the permission-framing ban.
3. **Provenance-forward without clutter-feel.** Year, status, authorship, venue, peer-review count all present — signals scholarly seriousness, which is exactly this surface's job.

## Priority improvements (highest leverage first)

**1. Register-row metadata density.** — `RegisterShelf.tsx:65-105` · code-structural + pixel-check
Each row stacks ~9 text elements, most muted-mono: gutter has call-number + accent tab + year + status-dot+label (4 items), entry field has kicker + title + dek + authorship (4), plus the hung venue. Hierarchy resolves correctly (title → dek → muted rest), but the **gutter's 4-item mono stack** is where it risks reading busy, especially with many rows. *Fix options:* combine year into the status line, or drop the accent tab's redundancy with the call-number color. **Needs your live eye** — the `gap-y` rhythm may already carry it; this is the one thing I'd watch on a full shelf. `/distill` or `/arrange` if it reads dense.

**2. Kicker on register rows may be one label too many.** — `RegisterShelf.tsx:86-88` · design-judgment
Each row already has two labeling systems (the call-number gutter + the status), and then a third mono kicker sits above the title. Three metadata registers around one title can over-label. The kicker earns its place on the *guide-detail* header; on the shelf it may be redundant. Consider dropping it from the row. Your call. `/distill`.

**3. The guide-detail entry runs austere.** — `GuideHeader.tsx` · design-judgment, restraint-safe
Kicker → h1 → dek → source line → prose, with no visual anchor. The type-led restraint is deliberate and correct (this is the flip side of the T5-defer), but it's the coolest moment in the house. One *quiet* house cue — territory marker, reading-time, or a small sigil echo — could warm the entry without becoming a "cover." Explicitly optional; the calm is defensible. `/delight` at most a whisper.

## Minor observations
- The register title (h3, `text-2xl` semibold Bricolage) → dek (`text-base` Newsreader) → authorship (`text-xs` mono) is a clean three-step scale. Good.
- Status encoding uses a filled/hollow dot **plus** a text label — not color-only, so it survives colorblindness. Good.
- The masthead h1 (`text-6xl`) to register-title (`text-2xl`) jump is large but correct: the h1 is the room's title, the rows are the scannable layer.

## Questions to consider
- On a shelf of 15+ guides, does the gutter's mono stack become texture-noise or does it read as an ordered ledger? (The metaphor wants "ordered"; verify at scale.)
- Does the guide reader want *any* of the library's warmth at its entry, or is the clean masthead the correct "you're reading now, settle in" signal? (I lean: keep it calm.)

## Verdict
Ship-worthy design. No blockers. The improvements are refinements, not corrections — #1 (register density) is the only one I'd look at live before calling it finished; #2–#3 are taste calls that are yours to make.
