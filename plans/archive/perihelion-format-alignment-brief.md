> **Mirror — canonical source:** `~/projects/design-futures/guide-format-alignment-brief.md`
> **Snapshot synced:** 2026-05-03
> This brief was originally written for the portfolio agent at the time of JSX→MD conversion. It now serves as the **execution spec for Workstream B.1** in `plans/perihelion-next-steps.md`. Several open questions have been resolved on the portfolio side (see Locked decisions in the next-steps plan); resolutions are noted inline below.

---

# Guide Format Alignment Brief

For the agent maintaining the guide library on the portfolio site.

## What this is

Justin is about to do a content + voice pass on the existing guides. While he handles prose, you handle format. This brief tells you what's missing from the converted markdown files relative to the canonical format and how to add it.

**Your scope:** schema fields, inline blockquoted definitions, styled callouts.
**Not your scope:** prose, voice, section structure, glossary definitions themselves.

If a judgment call comes up that isn't covered here, flag it for Justin rather than guessing.

---

## The gap

The converted guide markdown files preserve the *content* of the originals — sections, glossary terms, design implications — but several format layers are missing or inconsistent:

1. **Schema differences** between the converted files and the canonical format
2. **Inline blockquoted definitions** are absent (frontmatter glossary alone is present)
3. **Styled callouts** (Design Hook, Territory Bridge, Read Next, Subguide queued) are missing or expressed as unstyled bold paragraphs
4. **Some metadata is wrong or empty** (year, venue, URL)

The renderer can probably display the guides as-is, but it loses the visual chips, click-to-reveal cards in the body, and structural emphasis the format is designed to produce.

---

## Open questions for Justin (resolve before the pass)

> **Status as of 2026-05-03:** all five resolved. Recorded here for context; see Locked decisions in `plans/perihelion-next-steps.md`.

1. **`id` vs `slug` for the slug field.** Canonical format uses `slug:`. Converted files use `id:`. ~~Justin to confirm~~ → **Standardized on `slug:`. Migrate the 8 existing guides + parser/types in B.1.**
2. **`territory:` and `status:` fields.** Converted files include both. Canonical format doesn't list them. ~~Justin to decide~~ → **Both formally adopted into the schema.**
3. **DIRD `source.year`.** Converted files show `2026`, which is wrong for AAWSAP-era DIRDs (most are 2009–2010). ~~Justin to confirm~~ → **Tyrell takes a mechanical pass on all four DIRDs (13/14/15/28); Justin spot-checks after.**
4. **DIRD `source.venue`.** Currently `Unknown`. Should probably be `DIA / AAWSAP Program` for all DIRDs. ~~Justin to confirm~~ → **Same pass: set venue to `DIA / AAWSAP Program` for all four DIRDs unless Justin's spot-check overrides per guide.**
5. **DIRD `source.url`.** No public URL exists for most DIRDs. ~~Confirm whether the field can be omitted~~ → **Field can be omitted for DIRD-source guides unless a stable URL becomes available.**

---

## Schema fixes (mechanical, do these everywhere)

Apply these to every guide in B.1:

```yaml
---
slug: dird-28-breakthrough-cockpits      # migrate from id:
title: "DIRD 28: Cockpits in the Era of Breakthrough Flight"
kicker: DIRD Guide Series                # or "Research Guide Series" for non-DIRD
source:
  authors: DIA / AAWSAP Program
  year: 2009                             # ← verify per guide
  venue: DIA / AAWSAP Program            # ← was "Unknown"
  # url: omitted for DIRDs unless one exists
  # arxiv: optional, e.g. "2502.06794v2" — portfolio-side addition
accent: "#4ecdc4"
territory: T1                            # formally adopted
status: draft                            # formally adopted (draft|complete)
order: 4
description: "..."
figures: []
glossary:
  ...
---
```

Don't reorder existing keys unless asked. Don't strip fields you don't recognize — flag them instead.

---

## Add: inline blockquoted definitions

The frontmatter glossary is the renderer's source of truth. The inline blockquoted definition is for human readability of the raw markdown — and gives the renderer an optional surface to style as a first-mention gloss.

**Pattern:**

```markdown
> **vacuum coherence** — The hypothesized property of the quantum vacuum in which zero-point fluctuations exhibit organized, large-scale structure rather than random noise.
```

**Where to put it:** the first time a term marked with `|term|` appears in a section, drop the blockquoted definition immediately after the paragraph that introduces it. Subsequent uses of the same term in the same guide do not need the blockquote — the click-to-reveal handles repeated mentions.

**Source:** copy the definition verbatim from the frontmatter `glossary:` entry. Don't paraphrase. If the frontmatter definition is too long for inline use (over ~3 sentences), use the first 1–2 sentences only and let the click-reveal show the full version.

**What not to do:**
- Don't add inline blockquotes for terms that aren't in the frontmatter glossary
- Don't change the term's wording to match the prose context — the marker `|term|` and the blockquote `**term**` must match the frontmatter key exactly
- Don't add inline blockquotes for every mention; first-in-section is enough

---

## Add: styled callouts

Callouts are styled blockquotes with a chip-styled label. They use a **two-block pattern** so the renderer can split label from body:

```markdown
> 🎯 **Design Hook**
>
> Body text goes here. One paragraph, full sentences, no nested bullets.
```

The blank `>` line between label and body is required — without it, the renderer can't split the chip from the content.

### The four callout types

| Emoji | Label | When to use |
|-------|-------|-------------|
| 🎯 | `**Design Hook**` | A concrete product, service, tool, or experience implication that falls out of the source material |
| 🔗 | `**Territory Bridge**` | A cross-territory connection (T1↔T4, T2↔T3, etc.) that ties a guide to the rest of the lab |
| 📖 | `**Read Next**` | Pointer to a related guide already in the library. Use sparingly — only when the link is genuinely load-bearing |
| 📎 | `**Subguide queued**` | Material flagged for its own future guide. Captures the scope hint inline so it doesn't get lost. Rarely needed during a retrofit pass |

### Judgment for where to add them

Most converted guides have **Design Hook content** but it's expressed as bold-led paragraphs in a "Design Implications" closing section. Convert these into proper Design Hook callouts. Keep the bold lead-in as the first sentence of the callout body if it works as a topic sentence, or move it into the body and drop the bold formatting.

**Add a Territory Bridge** wherever the prose explicitly draws a cross-territory connection. If the connection is implicit (e.g. a guide mentions consciousness in passing without making it the point), don't manufacture a callout for it — that's content work for Justin.

**Add a Read Next** at most twice per guide, near the close, pointing to the most directly related guides in the library. Reference by title and slug:

```markdown
> 📖 **Read Next**
>
> [DIRD 13: Warp Drive, Dark Energy, Extra Dimensions](dird-13-warp-drive) — the propulsion physics this cockpit is designed around.
```

If you're not sure whether a callout belongs, leave it out and flag it. Over-callouting is worse than under-callouting.

> **Portfolio-side coverage as of 2026-05-03:** `uap-field-map.md` already has 42 callouts (proves the pattern works in the renderer at the generic blockquote level). The other 7 guides have zero. B.1 retrofit covers those 7.

---

## What NOT to change

- **Prose, voice, tone, sentence structure.** Justin is doing this pass himself (Workstream B.2).
- **Section headers and `{#anchor}` IDs.** Anchors are stable links; renaming breaks the renderer's nav and any cross-guide deep links.
- **Glossary entry definitions.** Don't rewrite definitions to be shorter, clearer, or more consistent in tone — that's content work.
- **Section order or section count.** Structural changes are content work.
- **`|term|` markers in the body.** Don't add new ones, don't remove existing ones, don't change capitalization. If you spot an orphan (a `|term|` with no frontmatter entry), flag it rather than fixing it — the resolution requires a definition, which is content work. (Glossarian skill handles orphan resolution as a separate, dedicated pass.)
- **Existing figures or `figures:` entries.** Leave as-is.

If you encounter something that looks like a content issue (a contradiction, a typo, a stale reference), flag it for Justin in a notes file rather than fixing it inline.

---

## Worked example

Here's a before/after on one section of `dird-28-breakthrough-cockpits.md` to show the format pass in action.

### Before

```markdown
## 💫 The G-Force Revolution {#g-force-revolution}

The entire history of cockpit design is shaped by one constraint: the human body breaks under acceleration. Every seat, harness, display position, control layout, and emergency procedure is designed around the fact that pilots experience crushing forces during maneuvers. |Anti-G suits|, |reclined seating|, and flight envelope limits all exist because of this single physiological constraint.

Under spacetime engineering (DIRD 13), this constraint evaporates. Occupants inside a |warp bubble| experience freefall regardless of apparent external acceleration. A 1,000G turn from the outside perspective is a gentle drift from the inside. This isn't hypothetical mitigation — it's a fundamental change in physics. The occupants are not being protected from G-forces; the G-forces don't exist for them.

The design implications cascade. |Seating| doesn't need to resist G-forces — it's furniture, not survival equipment. The cockpit can be any orientation — there's no preferred axis defined by acceleration. |Emergency procedures| change fundamentally: the primary risk is no longer G-induced loss of consciousness but rather field failure (what happens if the warp bubble collapses?) and spatial disorientation (how do you maintain awareness in the absence of all kinesthetic cues?).
```

### After

```markdown
## 💫 The G-Force Revolution {#g-force-revolution}

The entire history of cockpit design is shaped by one constraint: the human body breaks under acceleration. Every seat, harness, display position, control layout, and emergency procedure is designed around the fact that pilots experience crushing forces during maneuvers. |Anti-G suits|, |reclined seating|, and flight envelope limits all exist because of this single physiological constraint.

> **Anti-G suits** — Pressurized garments that squeeze the legs and abdomen during high-G maneuvers, preventing blood from pooling in the lower body and maintaining brain blood flow.

Under spacetime engineering (DIRD 13), this constraint evaporates. Occupants inside a |warp bubble| experience freefall regardless of apparent external acceleration. A 1,000G turn from the outside perspective is a gentle drift from the inside. This isn't hypothetical mitigation — it's a fundamental change in physics. The occupants are not being protected from G-forces; the G-forces don't exist for them.

> **warp bubble** — The region of flat spacetime inside the curved spacetime shell that enables propulsion. Inside the bubble, normal rules apply — you float, stand, walk.

> 🔗 **Territory Bridge**
>
> The G-force revolution is the most visible payoff of the vacuum spacetime engineering thread that runs through DIRD 13, DIRD 15, and the Puthoff SED framework. The cockpit is where exotic physics first becomes a human experience.

The design implications cascade. |Seating| doesn't need to resist G-forces — it's furniture, not survival equipment. The cockpit can be any orientation — there's no preferred axis defined by acceleration. |Emergency procedures| change fundamentally: the primary risk is no longer G-induced loss of consciousness but rather field failure (what happens if the warp bubble collapses?) and spatial disorientation (how do you maintain awareness in the absence of all kinesthetic cues?).

> 🎯 **Design Hook**
>
> A field-integrity-first cockpit interface where the primary safety instrument shows warp bubble health, not airframe stress. Engine gauges become field gauges; the visual prominence stays the same, the underlying physics is entirely different.
```

Notes on the change:
- Added two inline blockquoted definitions for `|Anti-G suits|` and `|warp bubble|` (first-mention rule). Did not add one for `|reclined seating|` because the surrounding prose defines it adequately.
- Did not add a definition for `|Seating|` or `|Emergency procedures|` because those are first-mentioned later in the section and the prose carries them; would add at first-mention if they appear earlier in another section.
- Added a Territory Bridge callout where the section explicitly draws a connection across DIRD 13, DIRD 15, and the SED framework.
- Added a Design Hook callout that surfaces an implication present in the prose but not previously called out structurally. This Design Hook is also restated in the closing "Design Implications" section — that's fine; the closing section can be either left alone or converted entirely to callouts depending on Justin's preference.

---

## Pass workflow suggestion

For each guide:

1. Read the file end-to-end first — don't start editing until you have the full shape in your head
2. Apply schema fixes (mechanical)
3. Walk section by section, adding inline blockquoted definitions at first-mention of each `|term|`
4. Walk section by section again, adding callouts where appropriate per the judgment guidance above
5. Convert any "Design Implications"-style closing section into proper Design Hook callouts, or leave it intact if Justin prefers
6. Note any orphan `|term|` markers, content issues, or judgment calls in a per-guide notes file for Justin to review
7. Hand the updated file back

Don't batch all eight guides in one shot — do one, get Justin's feedback on the result, then apply the same approach to the rest.

---

## Renderer enhancement (portfolio-side, paired with B.1)

The current renderer (`src/lab/components/guide/GuideBlockquote.tsx`, `core/lab/parse-guide.ts`, `core/lab/guide-types.ts`) treats every `> ...` block as a single generic `BlockquoteBlock`. To deliver the chip-styled callouts and distinct definition glosses described above:

1. Extend `BlockquoteBlock` (or split into a tagged union) to carry a `variant` field: `definition` | `design-hook` | `territory-bridge` | `read-next` | `subguide-queued` | `plain`.
2. Update `parseBlockquote` in `parse-guide.ts` to detect the first-line label pattern (`> 🎯 **Design Hook**` etc.) and the first-mention definition pattern (`> **term** — ...`) and tag the block accordingly.
3. Update `GuideBlockquote.tsx` to render a per-variant chip and accent treatment.

Confirm scope with Justin before touching the parser — see reminders in `plans/perihelion-next-steps.md`.

---

## Questions back to Justin

Anything in this brief that's ambiguous, drop a question. The goal is for the format pass to be mechanical and judgment-light wherever possible, with clear flag points for content-side decisions.
