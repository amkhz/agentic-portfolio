# Ideogram 4 Caption Schema Reference

Source of truth: `docs/prompting.md` in ideogram-oss/ideogram4 (as of June 2026).
If upstream updates the schema, update this file — do not let it drift silently.

The model accepts any string, but it was trained *exclusively* on captions in
this exact shape. Deviating means sampling out-of-distribution: it'll run, just
worse. Treat everything below as binding.

---

## Top level

```
{
  "high_level_description": <string>,        // optional, strongly recommended. 1-2 sentence summary.
  "style_description": { ... },              // optional object
  "compositional_deconstruction": { ... }    // REQUIRED object
}
```

---

## style_description

Contains **exactly one** of `photo` or `art_style`:

- `photo` → photographic captions, paired with `"medium": "photograph"`
- `art_style` → everything else (illustration, painting, 3d_render, graphic_design, ...)

`aesthetics`, `lighting`, and `medium` are required whenever `style_description`
is present. `color_palette` is optional but must be last if present.

**Key order is strict and branch-dependent:**

| Branch    | Order                                                          |
|-----------|----------------------------------------------------------------|
| Photo     | `aesthetics`, `lighting`, `photo`, `medium`, `color_palette`   |
| Non-photo | `aesthetics`, `lighting`, `medium`, `art_style`, `color_palette` |

Note `medium` sits in a different position in each branch.

Fields:

| Field           | Type      | Notes                                                          |
|-----------------|-----------|----------------------------------------------------------------|
| `aesthetics`    | string    | mood/aesthetic keywords ("moody, cinematic, desaturated")      |
| `lighting`      | string    | ("golden hour, rim light, dramatic shadows")                   |
| `photo`         | string    | camera/lens language ("35mm, f/1.4, bokeh"). XOR with art_style |
| `medium`        | string    | "photograph", "illustration", "3d_render", "painting", "graphic_design", ... |
| `art_style`     | string    | ("flat vector illustration, bold outlines"). XOR with photo    |
| `color_palette` | list[str] | up to 16 uppercase #RRGGBB hexes                               |

---

## compositional_deconstruction

REQUIRED. Both fields required; `background` must precede `elements`.

| Field        | Type       | Notes                                          |
|--------------|------------|------------------------------------------------|
| `background` | string     | environment description — be generous with detail |
| `elements`   | list[dict] | subjects, objects, and in-image text           |

### Elements

Two types, each with fixed key order. `bbox` and `color_palette` are optional
but must occupy the positions shown:

| Type     | Key order                                       |
|----------|--------------------------------------------------|
| `"obj"`  | `type`, `bbox`, `desc`, `color_palette`          |
| `"text"` | `type`, `bbox`, `text`, `desc`, `color_palette`  |

| Field           | Type      | Notes                                                       |
|-----------------|-----------|--------------------------------------------------------------|
| `type`          | string    | "obj" or "text"                                              |
| `bbox`          | list[int] | `[y_min, x_min, y_max, x_max]` — **Y FIRST** — normalized 0–1000, origin top-left |
| `desc`          | string    | detailed: material, pose, lighting interaction, position     |
| `text`          | string    | the LITERAL string to render (text elements only). Never paraphrase. |
| `color_palette` | list[str] | up to 5 uppercase #RRGGBB hexes per element                  |

### bbox conversion crib

For a target canvas of W×H pixels, a region at pixel rect (x, y, w, h):

```
y_min = round(1000 * y / H)
x_min = round(1000 * x / W)
y_max = round(1000 * (y + h) / H)
x_max = round(1000 * (x + w) / W)
bbox  = [y_min, x_min, y_max, x_max]
```

Common layout zones (any aspect ratio, since coords are normalized):

| Zone           | bbox                    |
|----------------|--------------------------|
| Full bleed     | [0, 0, 1000, 1000]       |
| Upper third    | [0, 0, 333, 1000]        |
| Lower third    | [667, 0, 1000, 1000]     |
| Center square  | [250, 250, 750, 750]     |
| Left half      | [0, 0, 1000, 500]        |
| Bottom-right corner | [750, 750, 1000, 1000] |

---

## Color rules

- Uppercase `#RRGGBB` only. `#1B1B2F` ✓ — `#1b1b2f` ✗ — `#fff` ✗
- Include the background color in the style-level palette if you care about it
- Include both highlight and shadow hexes for controlled lighting ("contrast pairs")
- Style level: ≤16 entries. Element level: ≤5 entries.

---

## Text rendering notes (empirical)

Observed on the Neo Mirai proof-out (ideogram-4-fp8, mflux 0.18.0), but the
behavior is the model's, not the runtime's:

- **Long single-word headings garble reproducibly.** Short and multi-word
  headings render cleanly at display size (`AGENDA`, `TICKETS`, `NEO MIRAI` all
  perfect). A long single word does NOT: `INSTALLATIONS` (13 letters) rendered
  as `ANSTALLATIONS` across two different seeds, both `V4_DEFAULT_20` and
  `V4_QUALITY_48`, and even with the `desc` explicitly stating the spelling
  letter-by-letter. This is systematic, not seed noise — more steps and new
  seeds do NOT fix it. Mitigation: prefer **mixed-case** (`Installations`) or
  break long labels into shorter strings for large display text. Mixed-case
  short strings (card titles like `Harmonic Flux`) render reliably.
- **More steps fixes ordinary fine text, not the above.** A long single clean
  line over open space renders well even small (the hero subhead
  `The AI Design Conference · Tokyo · 2026` came through clean at 48). Dense
  small text in tight columns is where step count helps most.
- **Repeated-row hallucination.** A vertical stack of near-identical short text
  rows (a schedule) can render one row too many / duplicate a line. Treat exact
  row counts in dense lists as unreliable; the sidecar carries the true copy.
- **CJK works.** Vertical tategaki (`未来を描く`) and kanji signage render
  convincingly via the Qwen3-VL encoder — usable as real identity elements, not
  just texture.
- **`¥` and other non-ASCII render correctly** when serialized with
  `ensure_ascii=False` (see below). Do not escape them.

## Serialization

```python
json.dumps(caption, separators=(",", ":"), ensure_ascii=False)
```

The CaptionVerifier warns on `\uXXXX` escapes. Compact separators, real UTF-8.

---

## Render parameters (MFLUX)

- Use the DEDICATED CLI `mflux-generate-ideogram4` (NOT `mflux-generate --model ideogram4`, which routes through FLUX's dual-encoder loader and crashes on a missing `text_encoder_2`). Ideogram 4 uses a SINGLE text encoder — Qwen3-VL — with dual transformers and a VAE shared with FLUX.2 Klein; that single-encoder architecture is why the generic loader fails.
- Pass the caption via `--prompt-file <file>.json`
- Resolution: `--width`/`--height`, both in [256, 2048], multiples of 16, aspect up to 6:1 / 1:6
- **Presets, not steps:** `--preset V4_DEFAULT_20` (balanced), `V4_QUALITY_48` (finals), `V4_TURBO_12` (sweeps). `--steps` and `--guidance` are ignored on this CLI.
- `--seed <int>` always, for reproducible iteration
- `--strict-caption-validation` to fail on schema warnings (leave off while iterating)
- `--metadata` writes a run-params sidecar JSON next to the PNG
- `--low-ram` if memory-constrained. FP8 checkpoint ~28 GB on disk.

---

## Pre-render checklist (when CaptionVerifier isn't available)

- [ ] `compositional_deconstruction` present with `background` then `elements`
- [ ] Exactly one of `photo` / `art_style` in style_description
- [ ] Key order matches the branch table above (check `medium` position!)
- [ ] Every bbox is [y, x, y, x] order, ints, 0–1000, min < max on both axes
- [ ] Every hex is uppercase #RRGGBB
- [ ] ≤16 style palette entries, ≤5 per element
- [ ] `color_palette` is the final key wherever present
- [ ] Text elements carry the literal string, verbatim
- [ ] No unknown keys anywhere
- [ ] Serialized compact with ensure_ascii=False

---

<!-- SYNCED: 2026-06-29 — ideogram-oss/ideogram4 docs/prompting.md. Re-validated, zero drift since 2026-06-13. Top-level, style_description branches, compositional_deconstruction, element key orders, bbox [y,x,y,x] 0-1000, hex rules, serialization all confirmed identical to upstream. -->
<!-- SYNCED: 2026-06-29 — filipstrand/mflux ideogram4 README (v0.18.0 installed). Re-validated, zero drift since 2026-06-13. Validated CLI surface: --prompt-file, --width, --height, --seed, --preset, --lora-paths (experimental), --strict-caption-validation. --steps/--guidance ignored (preset-driven). image-to-image still NOT supported for ideogram4 (mflux's new edit/kontext/i2i CLIs target other models). Other --help flags are MFLUX shared argparse, not validated for ideogram4. -->

