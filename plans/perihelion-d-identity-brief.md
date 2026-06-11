# Design Brief: Perihelion Identity (Workstream D)

**Status:** Confirmed 2026-06-10 (shaping session, Dreamer lane, /shape discovery interview)
**Owner:** Justin, with Tyrell building once exploration locks a candidate
**Predecessor:** C.3 light-mode activation (PR #117, Roy post-merge review SHIP WITH NOTES)
**Doctrine:** ADR-009 (multi-entry architecture), ADR-010 (rename and IA), PRODUCT.md Perihelion section

---

## 1. Feature summary

A house identity for Perihelion: a sigil derived from the existing orbital prototype
(`src/lab/components/library/PerihelionSigil.tsx`) and a logotype in Podkova set with
intent, composed into a masthead lockup, a favicon, and OG share-card anchors. The mark
identifies the house; Archive and the reserved Works arm get descriptor lockups in the
mono face. One geometry, many renderings: the manifesto ornament re-derives from the
final mark as its large animated register.

## 2. Primary read

Quiet wonder. A designer with no physics background notices something celestial happened
in the masthead and feels the place is serious without being closed. The mark carries the
"wonder, in moments" principle itself. It must never read as insignia.

## 3. Decisions locked in discovery

| Question | Answer |
|---|---|
| Scope | House mark + arm lockups. One sigil and logotype for Perihelion; arms get mono-face descriptor lockups. Works inherits identity on day one without resolving Q6. |
| Jobs | Masthead lockup, favicon/app icon, OG/social images. The in-content ornament is not a primary job; it becomes a derived rendering. |
| First read | Quiet wonder. |
| Logotype | Podkova, set with intent: locked kerning, chosen weight and optical size, deliberate relationship to the sigil. No letterform surgery, no fourth face. |
| Manifesto ornament | Kept, re-derived from the new mark as its animated large-scale register. One identity, many renderings. |
| Exploration vehicle | Paper first, then live. Static candidates in Paper, survivor iterates via /impeccable live, candidates scored via /critique. |
| Drawing register | Dual register: emission on graphite, ink on cream. |
| Color | Restrained, context-aware periapsis (see section 4). |
| Biggest anti-goal | Space-agency cosplay. |

## 4. Design direction

### Dual drawing register

On graphite the mark emits: gradient stroke, halo, the prototype's existing character.
On cream it is inked: solid stroke, zero halo, press-stamp weight, the engraving lane.
One geometry, two intentional materializations, switched by theme scope.

This formalizes what the prototype does accidentally. Measured on the live surface
(2026-06-10): the dark rendering passes cleanly (brass dot 7.25:1, orbit at its brightest
4.11:1 against `--lab-bg-deep`); the cream rendering also passes numerically (dot 4.34:1
via the portfolio light brass, orbit 3.70:1) but the bloom filters tuned for emission
render as ink bleed on paper. The cream rendering must become a decision, not a
degradation.

### Color: Restrained, context-aware periapsis

The orbit draws in theme ink (lab text tones). Only the periapsis dot takes color:

- House surfaces (masthead, favicon, house OG): brass via the theme-resolved accent.
- Per-guide OG cards: the guide's own accent (`accent` / `accentLight` per card background).

Every dot/background pairing requires a recorded 3:1 minimum check as a graphical object.
The C.3 mission log's accentLight table is the precedent for how to record the matrix.

### Scene sentences (theme)

- Graphite: a reader at night, the mark is the one instrument light on the desk.
- Cream: the same desk the morning after, the mark is the press device stamped on the preprint.

### Anchors

- University-press colophon / instrument-maker's stamp (overall posture)
- Kepler-plate diagram precision (informs the ink register)
- The holographic-instrument read of the current prototype (informs the emission register)

### Anti-goals

1. **Space-agency cosplay** (the named biggest risk): no badges, no rings-as-containment,
   no mission-patch symmetry, no insignia energy. Reads as fandom, not scholarship, and
   gatekeeps through aesthetics.
2. Generic orbit-logo gravity: atom marks, React, space startups. The construction stays
   specifically perihelial: eccentric orbit, asymmetric weight toward the close-approach
   point.
3. Over-branding the notebook: the mark is a press device, not a startup rebrand.
4. Precious / twee drift: no hand-drawn wobble, no illustrated-zine charm.

## 5. Scope

- **Fidelity:** production-ready identity at the end of the workstream.
- **This session produced the brief only.** No build until a candidate survives exploration.
- **Exploration:** 3 to 4 sigil constructions in Paper, each shown on both palettes plus a
  16px favicon row and a masthead lockup; survivor iterates on the real surface via
  /impeccable live; candidates scored via /critique before the build is specced.
- **Build:** feature branch, four gates (lint, build, test, audit:orphans), Roy before
  merge. No exceptions this cycle.

## 6. Layout strategy

The lockup replaces the text-only wordmark in the house bar: sigil at left, Podkova
"Perihelion" with locked kerning, arm descriptor ("ARCHIVE") in JetBrains Mono as the
subordinate line. The existing tagline line stays as-is. Clearspace and a minimum-size
floor are defined during exploration and recorded here, not improvised per surface.

The favicon is a re-derived construction, not a scaled-down sigil. The current 64x36
ellipse with a 3px dot cannot survive 16px. Expect dot-plus-arc-fragment geometry that
keeps the eccentric character.

## 7. Key states

- Masthead: static or once-per-mount draw-in (decide in exploration).
- Manifesto ornament: full draw-in animation; reduced motion renders complete and static.
- Favicon: against arbitrary browser chrome, light and dark.
- House OG card; per-guide OG cards with per-guide accent dot.
- Theme flip mid-session: emission-to-ink swap must not flash or animate oddly.
- Print / no-CSS fallback: out of scope.

## 8. Content requirements

- Logotype text: "Perihelion".
- Arm descriptors: "Archive" (live), "Works" (reserved).
- Tagline "closest approach to the frontier" stays where it is. Q6 (tagline when Works
  ships) stays open; nothing in the lockup construction may hard-bind the tagline to the
  house mark.

## 9. Constraints

- OKLCH tokens only; no literal colors outside tokens.css / lab-tokens.css. The sigil
  references tokens via var() (the prototype already does this; keep it).
- WCAG 2.2 AA; 3:1 minimum for the mark as a graphical object on both `--lab-bg-deep`
  registers.
- No emoji, no em-dashes anywhere.
- Lab type stack (Podkova / Georgia / JetBrains Mono) is theme-agnostic and unchanged.

## 10. Riders

- **LabThemeToggle glyph contrast (Roy C.3 flag, confirmed by measurement 2026-06-10):**
  in dark mode no stroke is full opacity at rest; the dimmed strokes land at 1.81 to
  2.50:1 against `--lab-bg-raised`, all below the 3:1 non-text minimum. Light mode candle
  body passes at 4.42:1 (only decorative sun rays dip). Fix by lifting the resting color
  toward `--lab-text-secondary` or raising the dark-mode opacity floor to roughly 0.75.
  Lands with D's first build PR or as a standalone fix.

## 11. Open questions

- Exact favicon geometry (resolve in Paper exploration).
- Whether the masthead sigil animates at all.
- Whether the emission register's SVG filters (blur/halo) survive the satori OG pipeline;
  verify before locking the OG rendering.
- Per-accent dot contrast matrix (record alongside the OG work).
- ADR after exploration validates the direction (likely ADR-012, via /invest-adr).
