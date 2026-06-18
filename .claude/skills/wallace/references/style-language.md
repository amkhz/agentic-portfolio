# Prompt Style Language: Illustrated / Editorial Captions

Reusable vocabulary for steering Ideogram 4 toward hand-made illustrated and
editorial styles, and away from generic "made-by-AI" output. Learned on the Neo
Mirai proof-out (2026-06-13); the levers generalize beyond that project.

The core lesson: **Ideogram's default reflex is smooth, semi-realistic digital
rendering.** Distinctive illustration only happens when the caption forces a
specific *made-by-hand idiom* and, for figures, explicitly negates the realistic
reflex. "Illustration" alone is not enough — name the technique, the texture,
and the linework.

---

## Vocabulary by axis

| Axis | Say this | Avoid (reads as AI slop) |
|------|----------|--------------------------|
| **Technique** | woodblock print, ukiyo-e, shin-hanga, screenprint, risograph, linocut, lithograph | "digital illustration", "vector art" |
| **Texture** | heavy carving marks, ink absorbed into paper, hand-printed grain, risograph misregistration, halftone, tactile printmaking | "flat", "clean", "smooth", "polished" |
| **Linework** | fine pen-and-ink linework, etched cross-hatching, drypoint, engraving detail, sketchy hand-drawn contours, confident brush strokes | (omitting linework entirely yields smooth gradient fills) |
| **Faces / figures** | hand-drawn ink portrait, comic/manga linework, bold brush contours, flat cel shading, graphic-novel figure, shin-hanga portrait | "portrait" alone -> generic realistic render |
| **Palette** | name the dominant ground + accents; "selective / restrained / not drenched" when you want air | over-saturating a "warm" cue into full orange drench |
| **Composition** | editorial/magazine layout, asymmetric grid, generous negative space, overlapping circle motifs, thin rules, margins do work | centered icon-title-subtitle stacks |
| **Edges** | illustration dissolves/fades into the ground, ink bleeding into paper, no hard rectangular edge | hard-cropped rectangular image panels |
| **Era anchors** | name a movement + designer lane (e.g. 1960s Japanese graphic design, Expo '70 poster era, Pentagram/Kit Hinrichs editorial) | generic "modern" / "futuristic" |
| **Mood** | optimistic, contemplative, lived-in, humane | leaving mood unstated invites the category cliche |

The two phrases that did the most work on Neo Mirai: the **style fusion**
(woodblock + mid-century-modernist graphic design) and the **made-by-hand
texture** (carving marks + ink absorbed into paper).

---

## The biggest slop-tell: faces

Faces are where "made by AI" shows hardest. A caption that says "illustrated
portrait" gets a smooth semi-realistic digital painting every time. To get
genuine drawn/comic character quality:

1. **Force the drawing idiom:** "hand-drawn ink portrait, bold comic/manga
   linework, confident brush contours, flat cel shading, screenprinted character
   illustration."
2. **Add explicit negatives** (Ideogram respects these inside the `desc`):
   "not photorealistic, not a digital painting, not a 3d render, not airbrushed."
3. **Name a lane:** "shin-hanga portrait", "graphic-novel ink portrait",
   "mid-century illustrated poster figure."

Skipping step 2 is the single most common cause of a portrait reading as AI slop.

---

## Ideogram caption-craft rules (learned the hard way)

1. **Long single words garble reproducibly, and the fixes are weak.**
   `INSTALLATIONS` (13 letters) rendered as `ANSTALLATIONS` across multiple
   seeds, both `V4_DEFAULT_20` and `V4_QUALITY_48`, with letter-by-letter
   spelling in the `desc`, AND in mixed case (`Installations` -> `Anstallations`).
   Mixed case did NOT fix it. Short and multi-word headings render fine.
   **Reliable mitigations: split the word into two short tokens, swap to a
   shorter synonym, or (best) leave long display words to live HTML text in the
   build rather than baking them into the render.** (See also caption-schema.md
   "Text rendering notes.")
2. **Vertical tategaki needs a real string.** An `art_style` cue like "vertical
   kana accents" *without* a corresponding `text` element makes the model invent
   gibberish characters scattered in the corners. Always supply the actual
   characters as a `text` element, or drop the cue for that render.
3. **Explicit negatives work** for faces and anywhere the realistic-render
   reflex creeps in.
4. **CJK and `¥` / non-ASCII render reliably** when serialized with
   `ensure_ascii=False`.
5. **More steps (48) improves texture and fine text**, but does NOT fix the
   long-word bug or a weak idiom — those are caption problems, not step-count
   problems.

---

## Worked example: the Neo Mirai master sentence

> A retro-futurist Japanese editorial illustration fusing ukiyo-e woodblock with
> 1960s mid-century-modernist graphic design, hand-printed with visible carving
> texture and ink absorbed into paper, finished with fine pen-and-ink linework
> and cross-hatching. Warm cream-dominant ground with terracotta, amber, and
> ink; overlapping rising-sun circles; vertical kana margins; high-contrast
> display serif. Optimistic, lived-in, hand-made.

Palette anchors used: cream `#F2ECDD` (dominant ground), ink `#2B2B2B`,
terracotta `#C8552F`, amber `#E3A23A`, sienna `#A8704A`, clay `#D98E5A`.

---

<!-- Captured 2026-06-13 from the Neo Mirai GPT-Image-2 reference recreation. -->
