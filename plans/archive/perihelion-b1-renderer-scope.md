# Perihelion B.1 — Renderer enhancement scope

> Locked 2026-05-17. Closes the renderer-scope and inline-definition-variant reminders in `plans/perihelion-next-steps.md`. Once Track A (DIRD frontmatter pass) lands, this is the next mission in the B.1 lane.

---

## Decision in one paragraph

`BlockquoteBlock` gets a `variant` discriminator field. Detection runs in the parser, not the renderer. Six variants cover the design space: four callouts (`design-hook`, `territory-bridge`, `read-next`, `subguide-queued`), one inline definition gloss (`definition`), and an explicit `plain` fallback. Definition glosses are first-class — they get distinct visual treatment, the term is extracted at parse time, and the separator is a colon, not an em-dash.

---

## Data model

```ts
// core/lab/guide-types.ts

export type BlockquoteVariant =
  | 'design-hook'
  | 'territory-bridge'
  | 'read-next'
  | 'subguide-queued'
  | 'definition'
  | 'plain';

export interface BlockquoteBlock {
  kind: 'blockquote';
  variant: BlockquoteVariant;
  paragraphs: Paragraph[];
  term?: string; // populated only for the 'definition' variant
}
```

### Why a discriminator, not a tagged union

A tagged union (`CalloutBlock | DefinitionBlock | PlainQuoteBlock`) is purer typing. But the only consumer is `GuideBlockquote.tsx` and the only producer is `parseBlockquote`. Spreading five new block kinds across the AST for one rendering surface is ceremony without payoff. A discriminator on a single block kind contains the surface area while still giving the renderer an exhaustive `switch` against `tsc --strict`.

If a second consumer ever appears (PDF export, RSS, search indexing), exhaustive matching on a single field stays ergonomic.

### Why detection in the parser

The parser already splits `> ` lines into paragraphs. Adding first-paragraph pattern detection is ~15 lines and keeps the renderer dumb — the renderer stays a pure function of the AST, not a re-parser. Parser tests can target detection logic directly, no React render required.

---

## Parser detection

`parseBlockquote` in `core/lab/parse-guide.ts` runs detection after the existing line-strip + paragraph-split step.

### Callout detection

Two-block pattern. The first paragraph contains only the bold label, separated from the body by a blank `>` line:

```
> **Design Hook**
>
> Body paragraph here.
```

Detection rules:

- `paragraphs.length >= 2`
- `paragraphs[0].nodes.length === 1`
- `paragraphs[0].nodes[0].kind === 'bold'`
- Bold value exact-matches one of: `Design Hook`, `Territory Bridge`, `Read Next`, `Subguide queued`

When matched: set `variant` to the corresponding kebab-case value and **drop the label paragraph** from `paragraphs[]`. The variant carries the label semantically; leaving it in the paragraph array would cause the renderer to emit it twice (once as a chip, once as body text).

### Definition detection

Single-paragraph blockquote whose body opens with a bold node immediately followed by `: ` (literal colon + space):

```
> **vacuum coherence**: The hypothesized property of the quantum vacuum...
```

Detection rules:

- `paragraphs.length === 1`
- `paragraphs[0].nodes[0].kind === 'bold'`
- `paragraphs[0].nodes[1].kind === 'text'` and the text value starts with `: ` (or `:` followed by whitespace)

When matched: set `variant = 'definition'`, populate `term` from the bold value, drop the leading bold node from `paragraphs[0].nodes`, and strip the leading `: ` from the text node that follows.

The gloss bold value is NOT required to match a frontmatter glossary key — orphan-term warnings already surface via the existing `|term|` rewrite pass, and a definition gloss whose bold doesn't appear in the glossary is still a definition. (A future check could warn on this, but it's not load-bearing for v1.)

### Separator choice

Colon, not em-dash. Reasoning: Justin's hard no-em-dash rule on repo content. Colon also reads like a dictionary entry (`vacuum coherence: ...`), is an unambiguous parser key, and avoids any prose-vs-typography ambiguity.

The upstream format spec at `~/projects/design-futures/guide-format-rules.md` currently shows the em-dash pattern. The portfolio-side mirror will diverge here; document it in the mirror's deviation notes. No guides have inline definition glosses today, so there's no migration debt.

### Plain fallback

Anything that doesn't match a callout or definition pattern gets `variant = 'plain'` and renders with the current generic treatment. This preserves the italic source-quote pattern in `uap-field-map.md` (e.g. `> *While the U.S. Air Force...*`), which renders today as a generic blockquote and should continue to.

### Emoji tolerance during transition

`uap-field-map.md` currently writes callouts with an emoji prefix in the bold-line position: `> 🔗 **Territory Bridge**`. C.2 will sweep these emojis out of guide source. Until then, the parser needs to tolerate them so the new variant detection works on the current production guide.

Approach: when checking the first paragraph's first node for callout detection, accept either a single bold node OR a text-node-then-bold-node sequence where the text is whitespace-padded non-ASCII (emoji). The emoji is discarded; only the bold value is matched against the callout label list.

Once C.2 lands and `uap-field-map.md` is emoji-free at source, the tolerance is harmless dead code, removable in a follow-up cleanup.

---

## Renderer

`GuideBlockquote.tsx` switches on `block.variant`.

| Variant            | Chip label         | Icon (placeholder, C.2 finalizes) | Border / accent treatment           | Body typography                            |
| ------------------ | ------------------ | --------------------------------- | ----------------------------------- | ------------------------------------------ |
| `design-hook`      | "Design Hook"      | Lucide `Target`                   | `border-l-2` + accent               | current body styling                       |
| `territory-bridge` | "Territory Bridge" | Lucide `Link2`                    | `border-l-2` + accent               | current body styling                       |
| `read-next`        | "Read Next"        | Lucide `ArrowRight`               | `border-l-2` + accent               | current body styling                       |
| `subguide-queued`  | "Subguide queued"  | Lucide `Bookmark`                 | `border-l-2` + accent               | current body styling                       |
| `definition`       | none               | none                              | tinted background or distinct edge  | term emphasized, body in standard prose    |
| `plain`            | none               | none                              | current generic treatment           | current body styling                       |

Icon picks are placeholders. C.2 (icon sweep + lab-component restyling) confirms the final set against the locked icon libraries (Lucide + Phosphor). For this scope, the renderer can ship with text-only chips if icon picks aren't ready, and C.2 wires up the icon slots.

Definition variant rendering: the renderer emits the term (in `--lab-term-accent` color or equivalent) followed by the gloss body. Visual relationship to `GuideTerm`'s click-reveal card should be legible without being heavy-handed.

---

## Test scope

Parser tests in `core/lab/parse-guide.test.ts` (or sibling file):

- Each of the four callout label patterns produces the right variant + drops the label paragraph
- Callout with emoji prefix in the bold line is detected correctly during transition tolerance
- Definition gloss pattern produces `variant: 'definition'` + extracted `term` + stripped `: ` separator
- Italic source quote (no leading bold) stays `'plain'`
- Multi-paragraph plain blockquote stays `'plain'`
- Callout with no body paragraph falls through to `'plain'` (defensive, e.g. a stray `> **Design Hook**` with nothing under it)
- Callout label match is exact and case-sensitive (`design hook` does not match)

Renderer tests in `src/lab/components/guide/GuideBlockquote.test.tsx`:

- Each variant produces the expected chip + icon slot
- Definition variant renders term + body without duplicating the term
- Plain variant matches the current rendering

Manual QA: render `uap-field-map.md` and confirm all 42 existing callouts render with the right variant.

---

## Mission scope

One branch: `feat/perihelion-b1-renderer-variants`.

Three commits, in order:

1. **Types + parser** — add `BlockquoteVariant`, extend `BlockquoteBlock`, implement detection + emoji tolerance in `parseBlockquote`, add parser tests.
2. **Renderer** — switch in `GuideBlockquote.tsx`, chip components, definition gloss layout, placeholder Lucide icons.
3. **Renderer tests + manual QA against `uap-field-map.md`.**

PR titled: `feat(perihelion): B.1 renderer enhancement — blockquote variants + definition glosses`.

Effort: 1 to 2 sessions per `perihelion-next-steps.md`. No file collision with C.1 (already shipped) or with the per-guide B.1 sweeps that will follow this mission.

---

## What this unblocks

- C.2 can begin in parallel (icon sweep + lab-component restyling + GuideCard hover debug) — file collision with renderer enhancement is cleared once this PR lands.
- Per-guide B.1 sweeps (callout retrofit + definition gloss injection) can begin per guide, with B.2 voice sweep pipelined behind.
- C.2 finalizes the icon picks for the four callout variants. Until then, this scope ships with placeholder Lucide icons. C.2 swaps in the final set.

---

## Open follow-ups (post-mission)

- If a new callout type arrives from upstream (e.g. "Caveat", "Method"), extend `BlockquoteVariant` and add the parser match. No structural change needed.
- Once C.2 is done sweeping emojis from `uap-field-map.md`, the parser's emoji-tolerance pass can be removed as dead code.
- The portfolio-side colon-separator convention should be carried back to the upstream format spec the next time the upstream sync rolls. (Bundle with the no-emoji sync if not yet landed.)
