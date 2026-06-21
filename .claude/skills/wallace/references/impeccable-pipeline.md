# Impeccable Pipeline: Ideogram 4 in place of GPT Image 2

How Wallace serves Impeccable's Visualize → Shape → Ship loop (the Neo Mirai
pattern). Three roles, in ascending difficulty. All captions here follow
`caption-schema.md` — read that first.

**The key idea:** every render ships with its caption as a sidecar file
(`{slug}.caption.json` next to `{slug}.png`). The caption is a machine-readable
spec — exact hexes, literal copy, normalized layout regions. When
`/impeccable craft` runs, point it at BOTH the image and the sidecar. The build
step gets ground truth instead of reverse-engineering pixels.

**Portfolio imagery register (agentic-portfolio):** the brand mood, palette, and
imagery direction come from `DESIGN.md` (binds ADR-013 "The Conservatory").
Two registers: (a) biophilic-architecture scenes for heroes/atmosphere at
moody-chiaroscuro realism; (b) modern technical-schematic "drafted fantastical
object" plates for per-project covers/marks. Imagery is a deliberate accent at
anchors, never wallpaper. North-stars + banked finals-render notes live in
`mocks/recalibration-sprint0/` and `plans/recalibration-sprint0-notes.md`.

---

## Role 1: Asset regeneration (easiest, do this first)

Regenerating image-native pieces from a mock: hero art, portraits, textures,
overlays, supporting illustrations.

Procedure:
1. Pull the brand palette hexes (from the brand plate's sidecar caption, or from
   Justin / the design tokens if no sidecar exists)
2. One caption per asset. Style block locked across all assets in the set —
   same `aesthetics`, `lighting`, and `color_palette` for visual kinship
3. Match each asset's aspect ratio to its layout slot (multiples of 16)
4. Draft at `V4_DEFAULT_20`, finals at `V4_QUALITY_48`, fixed seeds

Template — illustration asset:

```json
{
  "high_level_description": "[One sentence: what this asset is and where it sits on the page.]",
  "style_description": {
    "aesthetics": "[SHARED across the asset set]",
    "lighting": "[SHARED across the asset set]",
    "medium": "illustration",
    "art_style": "[SHARED across the asset set]",
    "color_palette": ["[BRAND HEXES, uppercase]"]
  },
  "compositional_deconstruction": {
    "background": "[Environment. If the asset needs to sit on a page color, name that hex here too.]",
    "elements": [
      {"type": "obj", "desc": "[The subject, exhaustively described.]"}
    ]
  }
}
```

For photographic assets (portraits): swap to the photo branch — `aesthetics`,
`lighting`, `photo`, `medium: "photograph"`, `color_palette` — and keep lens
language consistent across the portrait set (same focal length, same lighting
setup) so speakers look like they were shot in one session.

---

## Role 2: Brand toolkit plate

A single graphic_design composition with zoned panels. The bbox layout IS the
plate design.

Template — landscape plate, 1536×1024:

```json
{
  "high_level_description": "A brand identity toolkit plate for [BRAND], showing logo, color palette, typography specimen, and application mockups in a clean grid.",
  "style_description": {
    "aesthetics": "[brand mood], organized, editorial, presentation-grade",
    "lighting": "even, diffuse studio lighting",
    "medium": "graphic_design",
    "art_style": "brand guidelines plate, structured grid, generous whitespace, [brand-specific style language]",
    "color_palette": ["[FULL BRAND PALETTE incl. background hex]"]
  },
  "compositional_deconstruction": {
    "background": "A flat [hex] presentation board divided into clean rectangular panels with thin rules.",
    "elements": [
      {"type": "text", "bbox": [40, 40, 200, 500], "text": "[BRAND NAME]", "desc": "Large brand wordmark in the primary typeface, upper left panel."},
      {"type": "obj", "bbox": [40, 550, 460, 960], "desc": "Brand symbol/logomark rendered large, upper right panel.", "color_palette": ["[accent hexes]"]},
      {"type": "obj", "bbox": [260, 40, 460, 500], "desc": "A row of color palette swatches: [N] rounded rectangles in [name each hex], each with a small label beneath.", "color_palette": ["[the swatch hexes]"]},
      {"type": "text", "bbox": [520, 40, 740, 500], "text": "Aa Bb Cc 0123", "desc": "Typography specimen in the brand typeface, large glyphs upper line, [typeface character description]."},
      {"type": "obj", "bbox": [520, 550, 960, 960], "desc": "Application mockup: [poster/badge/screen] using the brand system.", "color_palette": ["[hexes]"]},
      {"type": "obj", "bbox": [780, 40, 960, 500], "desc": "Image-language sample: [the brand's photographic or illustrative style in one swatch]."}
    ]
  }
}
```

Notes:
- Swatch panels work best when the desc NAMES each hex and the element
  `color_palette` carries them (≤5 per element — split into two swatch rows if
  the palette is bigger)
- Small specimen text is the weak corner of any image model. Keep specimen
  strings short. If fine type renders badly after 2-3 iterations, simplify the
  panel rather than fighting it — the sidecar caption carries the real type
  intent anyway

---

## Role 3: Fold-by-fold north-star mock (hardest)

A full scrolling page exceeds the 2048px cap and one-shot dense-UI generation.
Don't fight it: generate the page as folds. Each fold is one render at a
page-width aspect ratio; the set shares one locked style block.

Procedure:
1. With Justin (or from an Impeccable `/shape` brief), name the folds and their
   rhythm — e.g. hero / agenda / manifesto band / grid / tickets
2. Write ONE style_description and reuse it verbatim in every fold caption
3. Each fold: one caption, 1536×1024 or 1920×1088, bboxes for the major
   UI regions, literal `text` elements for headlines, nav, CTAs
4. Render drafts, contact-sheet the folds stacked in page order, review rhythm
5. Promote to `V4_QUALITY_48` finals; stitch a tall preview if useful
   (`magick *.png -append page-preview.png`)

Template — hero fold:

```json
{
  "high_level_description": "The hero fold of a [genre] website for [PROJECT]: full-bleed [artwork description] with a large headline and navigation bar.",
  "style_description": { "[LOCKED SHARED STYLE BLOCK]": "..." },
  "compositional_deconstruction": {
    "background": "[The full-bleed hero artwork, exhaustively described — this is the fold's canvas.]",
    "elements": [
      {"type": "text", "bbox": [30, 40, 80, 300], "text": "[LOGO/WORDMARK]", "desc": "Small wordmark, top-left of the nav bar."},
      {"type": "text", "bbox": [30, 600, 80, 960], "text": "[NAV ITEM] [NAV ITEM] [NAV ITEM]", "desc": "Navigation links, top-right, small caps, evenly spaced."},
      {"type": "text", "bbox": [350, 60, 700, 940], "text": "[HEADLINE]", "desc": "Massive display headline dominating the center band, [type treatment]."},
      {"type": "text", "bbox": [780, 60, 860, 450], "text": "[SUBHEAD OR DATE/PLACE]", "desc": "Supporting line beneath the headline."},
      {"type": "obj", "bbox": [880, 60, 970, 320], "desc": "A primary CTA button reading area: [shape, treatment].", "color_palette": ["[accent hex]"]}
    ]
  }
}
```

Subsequent folds follow the same pattern with their own background + elements
(dark agenda block: background is the dark panel hex, elements are the schedule
rows as text; manifesto band: background is the accent hex, one big text
element; etc.).

Honest calibration: GPT Image 2 is stronger at one-shot full-page mocks.
Ideogram 4 + folds + bboxes closes most of the gap and adds palette/copy
determinism, but budget 2-4 iterations per fold for a north-star-quality
result. The trade is iteration time for zero marginal cost and a
machine-readable spec.

---

## Handoff convention to /impeccable craft

For every render that feeds an Impeccable build:

```
mocks/
  {project}/
    01-hero.png
    01-hero.caption.json      <- the exact serialized caption + seed + dims
    02-agenda.png
    02-agenda.caption.json
    brand-plate.png
    brand-plate.caption.json
```

When invoking craft, instruct it to read the sidecar captions: palette hexes
become tokens directly, `text` strings become real copy (no OCR-from-mock
errors), and bboxes describe the intended layout regions. The mock is the
vibe; the caption is the spec.
