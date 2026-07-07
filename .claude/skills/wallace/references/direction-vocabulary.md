# Direction Vocabulary — Justin's words → Wallace's caption mechanics

A living translation table. Each entry maps something Justin actually said while
art-directing a render to the specific caption move that produces it, with a
real before/after from our own work. The point is not to make Justin talk like a
spec sheet — his vivid sensory directions ("light flowing through the surface,
not on top") translate *better* than jargon. The point is shared shorthand: the
faster we both know which knob a phrase turns, the fewer rounds to the image in
his head.

**Grow this doc after every session.** When a plain-language direction lands (or
misses and we figure out why), add an entry: what he said, what it means in
caption terms, the mechanic, and the file proof.

---

## The mental model: four buckets = four parts of the caption

Almost every direction lands in one of four buckets, and each bucket is carried
by a specific part of the caption schema. Learning which bucket a phrase belongs
to tells you which field to edit.

| Bucket | What it controls | Where it lives in the caption |
|--------|------------------|-------------------------------|
| **Material & light transport** | how surfaces are lit, how light moves through/off them | element `desc` (obj) + `style.lighting` |
| **Typographic craft** | how the type itself is shaped and integrated | the `text` element's `desc` (craft only) |
| **Camera & optics** | where the viewer stands, lens, focus | `style.photo` |
| **Composition & palette** | framing, what surrounds the subject, color | `background`, env `obj` elements, `color_palette` |

A useful tell: if a direction is about *the type*, it's the text `desc`. If it's
about *the stuff the type sits on*, it's an obj `desc` or `lighting`. Keep those
separate — that separation is the whole typographic-craft doctrine (SKILL §6).

---

## Entries

### 1. "Light flowing through the surface, not on top"
**Bucket:** Material & light transport.
**What it means:** the surface is *translucent and backlit* — luminance
originates behind it and is transmitted through the material. The opposite (the
miss) is a dark surface with the type lit from the front, which always reads as
ink/sticker sitting on top.
**The mechanic:**
- In the screen's `obj` desc, model the material as backlit/translucent:
  *"a pale translucent membrane lit evenly from behind so it glows, content
  transmitted through the material rather than printed on its face."*
- In the text `desc`, describe the glyph as *light behavior*, not a surface
  mark. Two flavors, depending on contrast:
  - **Integrated (light panel):** dark glyphs transmitted through a glowing
    membrane, soft-edged where the backlight blooms. Reads as part of the
    surface. (This is the live homepage hero's treatment.)
  - **Luminous (dark panel):** glyphs are bright cut-out apertures emitting
    light through a dark panel, like backlit signage at night. Needs a *dark*
    panel — a near-white title on a near-white panel has no contrast and the
    model defaults it to dark ink (that's exactly why the luminous title missed
    on the first lightbox try).
- Avoid "etched / inlay / rim-light" — they still read as on-top.
**Proof:** `mocks/conservatory-screens/` — `env-glass-stone--final` (dark glass,
type-on-top, the miss) → `verify-lightbox` (pale backlit membrane, integrated) →
`verify-lightbox-glow` (dark panel, luminous transmitted type).

### 2. "Like I'm standing three or four feet away"
**Bucket:** Camera & optics.
**What it means:** a first-person, eye-level point of view at human distance —
not a flat product shot of the object filling the frame.
**The mechanic:** put it all in `style.photo`: focal length (35mm reads
natural/handheld), aperture (f/2.8 for shallow depth), the literal POV
("eye-level, standing about one meter from the screen"), and how much of the
frame the subject fills, plus what frames the foreground.
**Proof:** the flat `conservatory-screen` product shots vs. the `env-*` POV
shots — same screen content, completely different photograph. The fix was the
`photo` field + environment objects, never the content.

### 3. "Make the text feel intentional / not generic AI"
**Bucket:** Typographic craft.
**What it means:** the type should carry real craft and distinct registers, not
collapse into one default rounded sans.
**The mechanic:** the text `desc` describes *type craft only* — weight, optical
size, kerning, tracking, how the glyph integrates — and **never** mood. Mood
lives in `style.aesthetics`/`lighting`. Smearing mood into the text desc is what
flattens type. (Full rule: SKILL §6 + caption-schema "Typographic craft".)
**Proof:** the fixed-seed A/B — `conservatory-screen--A` (mood-smeared descs →
one generic sans, no UI chrome) vs. `--B-final` (craft-only descs → display
serif + mono kicker + mono telemetry, and the model even rendered the pill
containers).

### 4. "The exact green and sandstone from my hero"
**Bucket:** Composition & palette.
**What it means:** match a real existing asset's colors, don't invent
on-brand-ish ones.
**The mechanic:** sample the hexes straight off the source image and put them in
`color_palette`. Crop *tight* on the target region — a loose average over thin
linework + background browns out (learned this sampling the hero panel). The
schema needs `#RRGGBB`; convert OKLCH tokens or sample pixels.
**Proof:** invented Conservatory-token greens (missed the hero vibe) → sampled
`#C2BC9B` cream / `#9BA07A` sage / `#0E0D0B` labels off `public/images/
conservatory-hero.png` (`verify-lightbox`, much closer).

### 5. "The organic frames look good"
**Bucket:** Composition.
**What it means:** the subject is wrapped by natural environment elements
(ferns, stone, moss, haze) that frame it and sell the "I'm in this place" depth.
**The mechanic:** add environment `obj` elements around the subject —
a foreground frond intruding from a corner (closest, most out of focus), a stone
edge, an atrium-bokeh strip behind. These are separate objects, not part of the
screen, so they read as the room the subject lives in.
**Proof:** every `env-*` render — the fern/stone framing is what makes the
screen feel embedded rather than pasted.

### 6. "Soft McIntosh-like glow on the gear"
**Bucket:** Material & light transport (element-level, not style-level).
**What it means:** vintage-amplifier meter faces backlit in soft pale blue —
the audiophile cool-counterpoint against a warm tungsten room. Brand named as
shorthand for the light quality; never bake marks or logos.
**The mechanic:** keep it OUT of the shared `style.lighting` (it would tint
everything). Put it in the gear element's `desc` ("large round analog meter
faces backlit in soft pale blue, needles at rest, glass catching faint
reflections") with a cool hex (`#4A7A9B`) in that element's palette, plus the
same hex once in the style palette so it's sanctioned globally. For continuity
across a set, echo it dim and out-of-focus on background gear in other frames.
**Proof:** kissa probe pass 2026-07-06 — `kissa-altar--s47` (blue meters
against ember tubes, the frame's thesis) and `kissa-counter--s11` (dim
back-shelf echo). Element-level placement kept every non-gear frame clean.

### 7. "A figure made of glyphs / text / ASCII"
**Bucket:** Composition (the figure element's `desc`).
**What it means:** a human presence whose body is a volume of typographic
characters — translucent, luminous, sitting inside a photographic scene.
**The mechanic:** two clauses are load-bearing, and the model omits the head
without them:
1. **Name the anatomy explicitly** — "a clearly defined round head and sloped
   shoulders of densely packed glyphs above the torso." Without it the figure
   renders as a headless glyph cloud (both first-pass seeds; 48 steps did NOT
   fix it — this is caption-level, not step-count).
2. **Give the glyphs a scale hierarchy** — "larger bold characters forming the
   dense core of the head and torso, progressively smaller fine glyphs along
   the limbs, sparse tiny marks scattering at the silhouette edges." Scale
   variation is what makes the body read as having mass and bones; uniform
   glyph size reads as a flat texture fill.
   Keep luminosity restrained in the same desc ("dim enough that the warm room
   stays dominant") so the being reads as phosphorescence, not neon.
**Proof:** `kissa-glyph-regular-v2--s11` and `--s29` (resolved profile, massed
torso, feathered extremities) vs v1 both seeds + v1 q48 (headless V-shaped
cloud). Same seed, same room, one element rewritten.

### 8. "Well broken in leather jacket, never tattered — still wabi-sabi tho"
**Bucket:** Material & light transport (element `desc`).
**What it means:** patina without damage. Wabi-sabi in Justin's register is
*history and care* — burnished, supple, hand-polished by decades of use — never
neglect. "Cracked," "tattered," "torn," "frayed" pull renders toward visible
damage (tears, split seams, exposed stuffing), which reads as a failing
business, not a loved room.
**The mechanic:** in leather/fabric element descs, replace damage words with
care words: *"deep broken-in patina, supple and burnished by years of use,
hand-polished sheen on the wear points, cared-for."* Keep the wabi-sabi
carriers that don't imply damage: patina, sheen variation, softened edges,
faded dye, wear points. This applies at doctrine level too — the kissa
material spec now reads "broken-in oxblood leather," not "cracked."
**Proof:** `mocks/nibiru-postcard/nibiru-postcard--s11` (the miss: "cracked
patina leather" desc rendered the stool with an actual split and exposed
batting) → corrected desc in the same caption, same seed (the fix).

---

## How to read a render that "feels off"

Tonight's meta-lesson, worth keeping at the top of mind: when a render feels
flat or wrong, diagnose by bucket before rewriting anything.
- Feels like a flat catalog shot? → **Camera** (`photo`).
- Type looks generic/sticker-like? → **Typographic craft** (text `desc`) or
  **Material** (is the surface lit right?).
- Wrong mood/colors? → **Palette** (sample real assets) + `style` fields.
- Subject feels pasted-in? → **Composition** (env objects framing it).

Nine times out of ten the gap is camera + material, not content. The content
was usually right the first time.
