# Mission: Perihelion C.1 Light-Mode Tokens

**Feature:** Add a light-mode variable set to `design-system/lab-tokens.css` so the lab subdomain has a parallel cream-paper-and-warm-ink palette ready for the C.2 component sweep. No component touches in this branch; the lab still ships dark-only until C.2 wires the data-attribute through.
**Date:** 2026-05-17
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md, `.impeccable.md`
**Plan:** `plans/perihelion-next-steps.md` (Workstream C, C.1 sub-split)
**Locked decision:** "start from portfolio light-mode tokens with justified modifications" (Locked, 2026-04-21)
**Branch:** `feat/perihelion-light-mode-tokens`
**ADRs referenced:** ADR-009 (subdomain architecture), ADR-010 (Perihelion rename)
**Mission test:** *Same scanned paper in both modes; warm cream page, warm ink text; no collisions with portfolio tokens.*

---

## Scope

**In scope:**

- Append a `[data-theme="light"]` block to `design-system/lab-tokens.css` covering every `--lab-*` and `--guide-*` variable currently declared in the dark-mode block.
- Mirror the portfolio's activation mechanism (data-attribute selector inside `@layer theme`).
- Preserve the lab's scoping discipline: every variable stays prefixed `--lab-*` or `--guide-*` so portfolio tokens at `:root` are untouched.
- Hold WCAG 2.2 AA across every text-on-background pairing; document approximate ratios inline the way the dark set does.

**Out of scope (carried into C.2):**

- Any change inside `src/lab/` (icon sweep, GuideCard hover refinement carried from T6.4, lab-component restyling).
- Wiring the `data-theme` attribute through the lab entry shell or any theme toggle UI.
- Touching `design-system/tokens.css`. Read for reference only.
- Touching the existing dark-mode `--lab-*` block; the dark set must remain the default register.

**Explicit non-collision property of this branch:** the diff is contained to `design-system/lab-tokens.css` plus this mission log. No file inside `src/lab/` is touched, which is what lets C.1 land in parallel with the rest of Workstream B without competing on any of the same component files (especially the renderer surfaces that B.1 owns).

---

## Constraint Check

**VECTOR.md constraints applied:**

- **WCAG 2.2 AA:** every text-on-bg pairing verified against the lightest background (`--lab-bg-deep` at ~L 0.965). Comments call out approximate ratios mirroring the dark-set discipline.
- **Token colors only / OKLCH:** no raw hex. Every value is OKLCH like the existing tokens.
- **No em-dashes in copy:** new comment prose uses periods, semicolons, and restructured sentences. Existing em-dashes in unchanged dark-mode comments were not touched.
- **Files under 200 lines:** `design-system/lab-tokens.css` grows from 106 to 222 lines. Slightly over the 200-line guideline; acceptable for a token surface that is logically one declaration. Splitting into a second file would obscure the symmetry between dark and light blocks. Flagging for Roy review.

**Architecture compliance:**

- File belongs to `design-system/` layer. No core, services, or src changes.
- No component imports affected; existing components inherit through the CSS custom-property cascade once the data-attribute flips.

---

## Activation mechanism

Mirrors `design-system/tokens.css` exactly: a `[data-theme="light"]` selector inside the same `@layer theme` rule as the dark `:root` block. The portfolio uses the same pattern, so the lab inherits the same parent-attribute contract. When C.2 wires the lab entry shell (or a future theme toggle) to set `data-theme="light"` on `<html>` or a wrapper, all `--lab-*` variables flip in place without per-component changes.

Why not `prefers-color-scheme`? The portfolio runs explicit user choice via data-attribute (the body component sets the attribute based on a stored preference). The lab should inherit the same UX contract so a user's light-mode preference applies consistently across both surfaces. The OS preference can drive the default value of the toggle in C.2, but the actual flip is driven by the attribute.

---

## Contrast tuning per variable group

| Variable group | Dark posture | Light posture | Notes |
|---|---|---|---|
| `--lab-bg-deep / surface / raised` | Cool near-black (L 0.08-0.165, hue 270) | Warm cream paper (L 0.925-0.965, hue 76-80) | Hue 80 keeps cream warm without yellowing. Layering is preserved: page is deepest cream, surface is paper, raised is card-on-desk. |
| `--lab-border-subtle / strong` | Cool near-black ruling (L 0.26-0.36) | Warm pencil-line ruling (L 0.70-0.84) | Strong border drops to L 0.70 so it reads clearly against L 0.965 page. |
| `--lab-text-primary / secondary / muted` | Warm off-whites on cool blacks | Warm ink on warm cream | Primary ~14:1, secondary ~7.5:1, muted ~4.7:1 against `--lab-bg-deep`. All clear WCAG 2.2 AA at body sizes. |
| `--lab-figure-bg / border / text` | Warm off-white paper (constant) | **Held constant** (border shifts to L 0.76) | Per the spec: figure containers should look like the same scanned paper in both modes. Only the border tightens so the figure still separates from the cream page background without losing the scanned-paper feel. |
| `--lab-territory-t1..t4` | L 0.72-0.82, hue preserved | L 0.46-0.49, chroma lifted, hue preserved | Dark values (high L for legibility on cool blacks) would wash out against L 0.965 paper. Pulled L down ~0.25 and lifted chroma ~0.02 to maintain WCAG AA at 14px body. T1 violet (295), T2 blue (240), T3 rose (15), T4 signal green (145). |
| `--lab-upcoming-drafting / researching` | Dimmer companions to territories | Dimmer companions, retuned for cream | Drafting L 0.52 (signal-green dimmed), Researching L 0.54 (brass dimmed). Verified against `--lab-bg-surface` (L ~0.945) at small mono type. |
| `--guide-accent` (default) | `var(--theme-accent-primary)` | `var(--theme-accent-primary)` | Unchanged. Resolves to the portfolio's light-mode accent automatically when `[data-theme="light"]` is active on a shared ancestor, because tokens.css is loaded before lab-tokens.css. GuideRenderer's runtime override per ADR-009 remains theme-agnostic. |
| `--lab-heading/body/mono-font` | Podkova / Georgia / JetBrains Mono | Identical | Three-font lab stack is theme-agnostic. |
| `--lab-texture` | Cool slate ruling at ~0.02-0.03 alpha | Warm darker tone at ~0.04-0.05 alpha | Pattern geometry (28px horizontal, 128px vertical) preserved across themes so the rhythm matches. Alpha lifts because cool slate over cream would read green; warm tone keeps the paper register. |

---

## Departures from a direct port of portfolio light tokens

The locked decision said "start from portfolio light-mode tokens with justified modifications." Where the lab diverges:

- **Page surface hue.** Portfolio light backgrounds sit at hue 55-66 (parchment warming toward wood). Lab light sits at hue 76-80 (cream paper, closer to vellum). The lab's brief is "warm cream paper" specifically, and the portfolio's parchment/linen/wood metaphor (Wallace's office) is its own register. Adopting it directly would erase the academic-preprint distinction.
- **Saturation profile.** Portfolio cream is chroma 0.028-0.038. Lab cream sits at 0.014-0.022, lower-chroma so the paper reads as "preprint stock" rather than "warm parchment." The lab's whole posture is quieter and more contemplative than the portfolio's specific-evening warmth.
- **Territory accents.** Portfolio light-mode accents (brass, magenta) sit at L 0.52-0.56 and target a hue-restricted dual-accent system. Lab territory accents need four distinct hues to hold against each other in the library grid. Pulled L to 0.46-0.49 and lifted chroma so all four hues differentiate cleanly against cream paper.
- **Texture.** Portfolio's `--texture-linen` is a multi-layer "linen draped over wood" composition. Lab's `--lab-texture` is a graph-paper-under-ink ruling, preserved from the dark set in pattern but retuned in tone for cream paper. Different material metaphors; the lab one is load-bearing for the academic-preprint register.

---

## Verification

- `npm run lint`: passes (one pre-existing warning in `src/components/content/renderSection.tsx`, unrelated to this change).
- `npm run build`: passes. Lab CSS bundle grows slightly (light-mode declarations are static and tiny).
- Token surface coverage: every variable declared in the dark `:root` block has a counterpart in the new `[data-theme="light"]` block.
- Scoping discipline: no new variables introduced outside the `--lab-*` / `--guide-*` namespaces.
- Backwards compatibility: dark mode is still the default register. Nothing about the existing visuals changes until something sets `data-theme="light"` on an ancestor, which is C.2 work.

---

## Carry-overs to C.2

- **Theme toggle / attribute wiring.** The lab entry shell needs `data-theme` plumbing (initial value from `prefers-color-scheme`, persisted to storage, UI toggle if Justin wants one).
- **Icon sweep.** Emoji-to-icon pass using Lucide and Phosphor (per locked decision in the plan).
- **GuideCard hover refinement.** Carried from T6.4. Debug the three-shift cascade and find a treatment that reads polished rather than over-keyed; lives more comfortably in this design-system block than as a one-off polish task.
- **Per-component verification.** Spot-check every lab component against light mode: TerritoryGrid badges, LibraryHeader, GuideCard, GuideBlockquote (post-B.1 renderer enhancement), GuideTerm / GuideDefinitionCard, figures.
- **Per-guide accent verification.** GuideRenderer continues to set `--guide-accent` inline from frontmatter; confirm those accent hues hold against the cream page when wired.

---

## Reminders / pending confirmations

- **200-line file budget.** `design-system/lab-tokens.css` is now 222 lines. Splitting into `lab-tokens.dark.css` + `lab-tokens.light.css` is one option; keeping them in one file preserves the symmetry and the visible diff between modes. Flagging for Roy review.
- **Figure-container constancy.** Figure tokens are held to the same warm off-white in both modes per the brief. If user feedback shows the figure card vanishes into a similarly-warm cream page, the border can tighten further (currently at L 0.76) without changing the figure surface.
- **Texture alpha lift.** Cream paper tolerates a slightly stronger watermark than cool blacks. If the ruling reads too present in real C.2 testing, drop alpha back toward 0.03 / 0.022.
