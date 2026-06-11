# Perihelion C.2 — sectionIcons frontmatter spec

> Icon picks locked 2026-06-10 in a live Paper session with Justin. Three mock boards
> (in-context render, contested calls, full vocabulary) were built on the graphite floor
> with lab tokens and the real type stack; every contested call below records Justin's
> pick. This unblocks the C.2 sectionIcons build mission. The build itself (parser field,
> renderer, GuideSectionNav chips) is a separate mission per `perihelion-next-steps.md`.

## Mechanics (locked earlier, unchanged)

- New frontmatter field `sectionIcons:` mapping section anchors to icon names.
- Bare icon name = **Lucide** (`lucide-react`, already installed). `phosphor:` prefix =
  **Phosphor** (`@phosphor-icons/react`, new dependency the build adds; only three icons
  used, tree-shaken).
- Rendered in two places: at the `<h2>` (mocked at 26px, `--guide-accent`, inline-left of
  the heading, ~14px gap) and in the `GuideSectionNav` chip (14px, inherits chip text
  color, matching the PR #64 callout-chip icon size). Icons are decorative:
  `aria-hidden="true"`, no new accessible names.
- The type-only state since PR #71 stays the fallback: a guide (or an anchor) without a
  `sectionIcons` entry renders exactly as today. No icon is required anywhere.

## System decisions

- **Structural spine.** Anchors that recur across guides carry the same icon everywhere,
  so wayfinding compounds: `#big-picture` → `telescope` (5 guides), the
  design-implications family (`#design-implications` ×4, `#implications`, `#so-what`) →
  `pencil-ruler`, the connections family (`#connections` ×2) → `waypoints`,
  `#observables` → `eye` (dird-13, dird-15; uap-field-map is the blessed exception below).
- **One pictorial wink.** uap-field-map's `#observables` ("What are UAP?") takes
  `phosphor:flying-saucer` — Justin's call, the single playful exception in the library,
  on the one guide that can carry it. It is also the only filled (non-stroke) glyph
  besides the Phosphor numerals; that register break is accepted, not accidental.
- **Phosphor numerals.** `#ingredient-1` / `#ingredient-2` take
  `phosphor:number-circle-one` / `-two` — the headings literally say #1 and #2.
- **No callout-icon reuse.** `Target`, `Link2`, `ArrowRight`, `Bookmark` stay exclusive
  to the GuideBlockquote callout chips. Section and callout vocabularies never overlap.
- **Reuse is per-guide, not global.** Within a guide every icon is unique; across guides
  reuse is deliberate (`gauge` in dird-15/dird-28, `brain` in dird-15/dird-28,
  `scan-search` as the shared forensic register in uap-field-map/uapx-field-methods,
  `waves` as the vacuum identity in emergent-quantization/quantum-gravity and the
  transmedium boundary in uap-field-map).
- **Contested-call record.** telescope over map (#big-picture); waypoints over git-merge
  and route (connections family); orbit over circle-dot-dashed and rocket (#alcubierre);
  flying-saucer over eye (uap #observables); Phosphor numerals over Lucide glassware
  (ingredients); radar over layers (#instrument-stack); binary over lightbulb
  (#new-information, the section's own no-metaphors argument); circle-dot-dashed for
  quantum-gravity's #problem after orbit moved to #alcubierre (knock-on, Justin's pick).

## The mapping — 63 anchors, 8 guides

### dird-13-warp-drive

```yaml
sectionIcons:
  big-picture: telescope
  alcubierre: orbit
  negative-energy: circle-minus
  dark-energy: expand
  extra-dimensions: layers
  observables: eye
  energy-reduction: trending-down
  connections: waypoints
  design-implications: pencil-ruler
```

### dird-14-superconductors-gravity

```yaml
sectionIcons:
  big-picture: telescope
  superconductivity-basics: magnet
  podkletnov: disc-3
  tajmar: circle-gauge
  theoretical-models: square-function
  morningbird: activity
  design-implications: pencil-ruler
```

### dird-15-vacuum-spacetime-engineering

```yaml
sectionIcons:
  big-picture: telescope
  speed-of-light: gauge
  sakharov-gravity: arrow-down-to-line
  observables: eye
  lab-experiments: flask-conical
  white-paper: file-text
  consciousness: brain
  suppression: eye-off
  design-implications: pencil-ruler
```

### dird-28-breakthrough-cockpits

```yaml
sectionIcons:
  big-picture: telescope
  g-force-revolution: gauge
  new-information: binary
  control-paradigms: joystick
  sensory-void: circle-dashed
  consciousness-cockpit: brain
  design-implications: pencil-ruler
```

### emergent-quantization

```yaml
sectionIcons:
  big-picture: telescope
  vacuum: waves
  ingredient-1: "phosphor:number-circle-one"
  ingredient-2: "phosphor:number-circle-two"
  emergence: sprout
  so-what: pencil-ruler
  appendix: radical
```

### quantum-gravity

```yaml
sectionIcons:
  problem: circle-dot-dashed
  anu: atom
  white: waves
  gap: unfold-horizontal
  connections: waypoints
  scope: brackets
  implications: pencil-ruler
```

### uap-field-map

```yaml
sectionIcons:
  framing: compass
  framing-scientific-problem: microscope
  observables: "phosphor:flying-saucer"
  history-compressed: history
  evidence: scan-search
  transmedium: waves
  field-studies: binoculars
  orgs-and-stigma: building-2
  methodology: list-checks
```

### uapx-field-methods

```yaml
sectionIcons:
  forensic-problem: scan-search
  instrument-stack: radar
  c-tap: scan-eye
  radiation: radiation
  dark-spot: aperture
  statistical-framework: chart-scatter
  lessons-learned: notebook-pen
  future: door-open
```

### government-efforts-uap

> Added 2026-06-10 with the guide itself (order 9, the uap-field-map institutional-history
> subguide). All seven picks reuse the locked vocabulary — no new glyphs, no registry
> change. Reuse rationale per the system decisions above: `compass` extends the parent's
> framing register to the subguide's framing section; `history` deliberately links the
> parent's `#history-compressed` to the subguide that expands it; `eye-off` shares the
> suppression register with dird-15; `radar` shares the state-detection-network register
> with uapx `#instrument-stack`; `door-open` shares the opening/archives register with
> uapx `#future` (France as the open alternative); `sprout` shares the emergence register
> with emergent-quantization (the reawakening as re-emergence); `square-function` shares
> the formal-theory register with dird-14 `#theoretical-models` (Wendt-Duvall as the
> structural diagnosis). Provisional pending Justin's live review.

```yaml
sectionIcons:
  why: compass
  prehistory: history
  us-suppression: eye-off
  international: radar
  france: door-open
  reawakening: sprout
  wendt-duvall: square-function
```

## Build-mission scope (not this session)

1. `guide-types.ts`: `sectionIcons?: Record<string, string>` on the guide frontmatter
   type; resolved icon name carried on `GuideSection`.
2. `parse-guide.ts`: parse the field, warn on an anchor that matches no section and on a
   section anchor with no entry only if the guide declares the field (partial coverage is
   legal but probably a typo).
3. Icon registry module in `src/lab/` mapping spec names to components (static imports so
   tree-shaking holds; the `phosphor:` prefix routes to `@phosphor-icons/react`).
4. Render at `GuideSection` h2 and `GuideSectionNav` chip per the mock treatment; exact
   h2 size (24 vs 26px) locked live at build.
5. Add `@phosphor-icons/react`.
6. All eight guides get their `sectionIcons` block from this spec, verbatim.
7. Four gates, then live review against the type-only baseline — the standing question
   "does the icon pass beat the PR #71 interim?" gets its answer with real pages.
