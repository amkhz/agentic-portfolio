# Perihelion C.3 — Light-mode activation scope

> Scope lock for wiring the lab's dormant light palette to a user-facing theme. Written 2026-06-10 after the content-leftovers batch (PR #115) closed Workstream B's tail. Decisions below were made by Justin in the scoping session; this document is the build mission's contract, per the PR #52 scope-lock precedent.

**Status:** locked, ready to build.
**Effort:** S-M. One mission, single agent, no worktree required.
**Review path:** touches components, so the build goes through Roy before merge.

---

## What exists already (C.1, PR #47)

`design-system/lab-tokens.css` carries a complete `[data-theme="light"]` block: cream paper backgrounds (bg-deep at ~L 0.965, hue 80), warm ink text (~14:1 / ~7.5:1 / ~4.7:1 against bg-deep), light-tuned territory accents (hues preserved, L pulled to 0.46-0.49, chroma lifted), upcoming-status pills, a figure container deliberately held constant across themes (scanned clippings read as paper in both), and a retuned watermark ruling. Every pairing was AA-verified in isolation when the block landed. The activation contract is documented in the file itself: `[data-theme="light"]` on a parent element flips the palette; components inherit through the custom-property cascade.

`src/lab/styles/lab.css` imports both `tokens.css` and `lab-tokens.css`, so the light block's `--guide-accent: var(--theme-accent-primary)` fallback resolves in the labs entry. Verified 2026-06-10.

## What is missing

1. **Nothing sets the attribute.** `labs.html` has no `data-theme`, no early-paint script, and `src/lab/main.tsx` mounts no theme provider. The light block is dead CSS.
2. **No toggle UI** anywhere in the lab.
3. **Per-guide accents are dark-tuned and theme-agnostic.** `GuideRenderer.tsx:36` and `GuideCard.tsx:27` set `--guide-accent` inline from the guide's hex frontmatter, which defeats the light token fallback in all cases. The eight shipped accents were verified against graphite only; the worst case (`#e4e4e7`) lands near 1.1:1 on cream.
4. **The parser's contrast warning is dark-only.** `parse-guide.ts` checks `accent` against `LAB_BG_HEX` (`#0e0f13`) and nothing else.
5. **No live verification.** The light tokens were verified as isolated pairs; no component has ever been rendered against cream.

---

## Locked decisions (2026-06-10)

| Decision | Call |
|---|---|
| Per-guide accents in light mode | **Curated `accentLight:` frontmatter field**, optional. Components publish both values as inline vars; CSS resolves per theme. No parse-time auto-darkening, no territory-fallback-only path. |
| Toggle placement | **In-flow per surface.** Right slot of the GuideView top bar (alongside the back link), and a slim mono utility row above the library masthead. Final treatment refined live during the build. |
| First visit with no stored preference | **Honor `prefers-color-scheme`**, mirroring the portfolio. Cookie takes over once the user toggles. Cookies are domain-scoped, so the lab keeps its own preference independent of justinh.design. The graphite register stays the default when the system expresses no preference. |

---

## Build scope

### 1. Theme plumbing (mirror the portfolio, reuse its code)

- **`labs.html`:** add the early inline script from `index.html` (cookie match, `prefers-color-scheme` fallback, set `data-theme` + `data-no-transition` before first paint). Byte-for-byte the same logic; no FOUC.
- **`src/lab/main.tsx`:** wrap `App` in the existing `ThemeProvider` from `src/providers/ThemeProvider.tsx`. Zero new provider code; the cookie write, system-preference listener, and `data-no-transition` removal all come along. The lab already imports portfolio primitives (`tokens.css`), so this crosses no layer boundary.

### 2. Toggle UI

- Reuse or lightly adapt `src/components/interactive/ThemeToggle.tsx` (the portfolio's control) for the lab's mono register.
- **GuideView:** right-aligned in the existing top bar, opposite the back link. Minimum 44px target, matching the bar's existing affordances.
- **Library index:** a slim mono utility row above the `LibraryHeader` masthead. Keep it quiet; the masthead's editorial composition leads.
- Treatment (icon pair, label, hover) iterated live with `/impeccable live` or equivalent during the build, not specced here.

### 3. Per-guide light accents (the design crux)

- **Schema:** optional `accentLight:` on guide frontmatter, same 6-digit hex validation as `accent`. Types (`guide-types.ts`), parser (`parse-guide.ts`), and the format-rules mirror (`plans/perihelion-format-rules.md`) all learn the field. Upstream `~/projects/design-futures/guide-format-rules.md` sync rides the standing Track-B follow-up list (the dir is not a repo; one-shot edit in a design-futures session).
- **Mechanism:** `GuideRenderer` and `GuideCard` stop setting `--guide-accent` directly. They publish `--guide-accent-dark` (from `accent`) and, when present, `--guide-accent-light` (from `accentLight`). `lab-tokens.css` resolves: dark scope sets `--guide-accent: var(--guide-accent-dark)`; the light block sets `--guide-accent: var(--guide-accent-light, var(--theme-accent-primary))`. Pure cascade, no JS re-render on toggle, and a guide without `accentLight` degrades to the brass fallback rather than an illegible dark-tuned hex.
- **Curation:** Justin picks the eight `accentLight` values during the build, validated live. Recipe proven by the C.1 territory tuning: hold the hue, pull L into the 0.45-0.52 band, lift chroma to taste. Hex-in-frontmatter is the established content-data exception to the OKLCH-only rule (it is guide data, not a stylesheet value); the rule's spirit holds because every value is curated, never computed.
- **Parser:** add `LAB_BG_LIGHT_HEX` (compute the exact sRGB hex of `oklch(0.965 0.014 80)` during the build and pin it with a comment, the `LAB_BG_HEX` pattern). Warn when `accentLight` is present and lands below 4.5:1 against it; warn when `accentLight` is absent (once per guide, library-parse level) so coverage gaps stay visible without failing builds.

### 4. Live verification pass

Both themes, desktop and ~375px:

- **Library index:** GuideCard (including the 10px/18px accent glow on hover, which was tuned for graphite and may need a light-side check), TerritoryBadge pulse ranges, upcoming placeholder cards, the welcome triptych, PerihelionSigil (brass gradient + glow against cream), LibraryHeader colophon.
- **One guide per territory:** all four callout variants, definition cards and term markers, section icons (26px h2 + 14px nav chips, 3:1 graphical-object minimum against cream), figures (the held-constant container against cream), tab bar, prev/next, footer.
- **Theme switch behavior:** no transition flash on first paint, clean flip both directions, preference survives reload, system-preference change respected while unstored.

### 5. Gates, tests, review

- The four gates (`lint` / `build` / `test` / `audit:orphans`) before the PR.
- New tests: parser `accentLight` validation (hex shape, light-contrast warning, absent-field warning), and the dual-var publication in `GuideRenderer` / `GuideCard` (assert both custom properties land on the element).
- Roy review before merge; component changes stay in review per the house rule.

## Out of scope

- Workstream D. The sigil and any future logotype get *checked* against cream here, not redesigned.
- Portfolio light mode (live since before ADR-011) and anything portfolio-side.
- Light-mode-specific imagery or figure re-mattes; the figure container's held-constant posture is deliberate.
- Nested definitions (Workstream E).

## Sequencing

C.3 lands before Workstream D so the mark work is designed against both palettes from the start. No file collisions with anything currently in flight; `main` is clean.
