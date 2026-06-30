# Wallace Runtime (Local)

Machine-specific runtime facts for Ideogram 4 generation. Source of truth is
**this machine** — detected, not assumed. Regenerate whenever the runtime,
version, or weights change (see `wallace-sync.md`).

> This file is local reality. SKILL.md Phase 4 is the doctrine; where the two
> disagree, the installed binary wins for flags. Notable deltas from doctrine
> are flagged below under **Drift vs. SKILL.md**.

---

## Detected runtime

| Fact | Value |
|------|-------|
| Primary runtime | **MFLUX** (MLX-native) |
| Package version | `mflux v0.18.0` (installed via `uv tool`) |
| Dedicated CLI | `mflux-generate-ideogram4` |
| CLI path | `/Users/300mhz/.local/bin/mflux-generate-ideogram4` |
| Generic CLI present | `mflux-generate` also installed — **do not use for Ideogram 4** (routes through FLUX dual-encoder init, fails on missing `text_encoder_2`) |
| System Python | 3.9.6, arm64 (the tool ships its own env via uv; system Python is irrelevant) |

## Hardware

| Fact | Value |
|------|-------|
| Machine | MacBook Pro, Apple **M5 Max** |
| Unified memory | **64 GB** |
| Power | On AC at detection (battery cutoff defaults to halt at 5%) |

64 GB handles the fp8 pipeline. Headroom shrinks with LM Studio / ComfyUI
resident — reach for `--low-ram` or `--mlx-cache-limit-gb` if memory tightens.

**Overnight / long batches: prevent sleep-throttle.** Even on AC, when the Mac
idles or the lid closes, GPU compute throttles to a crawl (observed ~10x
slowdown: a 14-min Q48 fold stretched to 3-4 hours overnight) and the
conversation socket drops. The render survives (it's detached) but limps. Wrap
long unattended jobs in `caffeinate -i <render-chain>` (or `-ims`) so the
machine stays awake. Confirmed 2026-06-14 on the Neo Mirai overnight batch.

## Weights & gate

| Fact | Value |
|------|-------|
| Checkpoint | `ideogram-ai/ideogram-4-fp8` |
| Cache path | `~/.cache/huggingface/hub/models--ideogram-ai--ideogram-4-fp8` |
| On-disk size | **26 GB** (fully pulled) |
| Components present | `transformer`, `unconditional_transformer`, `vae`, `text_encoder`, `tokenizer`, `scheduler`, `model_index.json` |
| HF token | present on disk at `~/.cache/huggingface/token` (37 bytes); `HF_TOKEN` env var NOT set, but the on-disk token covers the gate |

Gate is satisfied — weights are downloaded and complete. No `GatedRepoError`
risk on this machine unless the cache is cleared.

---

## Confirmed command shape

Assembled from the live `--help` on this machine (highest-authority source per
`wallace-sync.md`). **Smoke test PASSED 2026-06-13:** teapot caption rendered
clean at 1024×1024, `V4_TURBO_12`, seed 42 — 12 steps in ~61s (~5.1s/step),
peak MLX memory 30.64 GB, valid 1024×1024 RGB PNG, output faithful to caption.
Pipeline confirmed end-to-end (caption → CLI → weights → PNG + metadata sidecar).

```bash
mflux-generate-ideogram4 \
  --prompt-file <slug>.caption.json \
  --width <W, multiple of 16, 256-2048> \
  --height <H, multiple of 16, 256-2048> \
  --seed <int> \
  --preset <V4_TURBO_12 | V4_DEFAULT_20 | V4_QUALITY_48> \
  --metadata \
  --output <slug>--s<seed>.png
```

Presets (authoritative over `--steps`/`--guidance` on this CLI):
- `V4_TURBO_12` — fast sweeps / contact sheets
- `V4_DEFAULT_20` — balanced (CLI default)
- `V4_QUALITY_48` — finals

Memory / iteration flags confirmed present: `--low-ram`,
`--mlx-cache-limit-gb <N>`, `--seed <int> [int ...]` (multi-seed),
`--auto-seeds <N>`, `--strict-caption-validation` (leave OFF while iterating),
`--metadata`, `--config-from-metadata <file>`.

---

## Validated surface vs. inherited flags

Reconciled against the dedicated MFLUX ideogram4 README during the 2026-06-13
sync. `--help` on this machine lists MFLUX's full SHARED argparse, but only a
subset is *validated for Ideogram 4*. Don't conflate "appears in `--help`" with
"works on this model."

**Validated for Ideogram 4** (README-confirmed): `--prompt-file`, `--width`,
`--height`, `--seed`, `--preset`, `--lora-paths` (experimental), and
`--strict-caption-validation`. Plus universally-safe runtime knobs `--metadata`,
`--low-ram`, `--mlx-cache-limit-gb`, `--battery-percentage-stop-limit`.

**Multi-seed confirmed useful:** `--seed 11 22 33` (1+ seeds) and
`--auto-seeds <N>` both work for one-invocation variant sweeps. This is a real
upgrade over the singular `--seed` the docs assumed.

**Present in `--help` but NOT validated for Ideogram 4 — treat as untested:**
- `--lora-style {couple,font,home,identity,illustration,portrait,ppt,sandstorm,sparklers,storyboard}`
  / `--lora-scales`. These named styles are MFLUX's **FLUX LoRA library** — FLUX
  LoRAs, not Ideogram-native. The README marks all LoRA support as "not yet
  validated against published Ideogram LoRAs." **LoRA on Ideogram 4 is a spike,
  not a shipping capability** — verify output before relying on it.
- `--negative-prompt` — undocumented for ideogram4, likely a no-op. Push
  "what to avoid" into the structured caption instead.
- `--quantize {3,4,5,6,8}` — moot; checkpoint is already fp8 and non-fp8 layouts
  are unsupported.
- `--scheduler` (linear only) and `--stepwise-image-output-dir` (experimental).

## Architecture (from MFLUX README)

Single text encoder **Qwen3-VL**, dual transformers, FP8 linear stack, VAE
shared with FLUX.2 Klein. The single-encoder design is exactly why the generic
`mflux-generate` crashes on a missing `text_encoder_2` — always use the
dedicated CLI.

---

<!-- SYNCED: 2026-06-29 — re-validated, zero drift since 2026-06-13. mflux STILL v0.18.0 (uv tool), ideogram-ai/ideogram-4-fp8 (26 GB cached, gate satisfied via on-disk token), M5 Max / 64 GB. Live `--help` reconciled flag-for-flag against this doc — identical. No interface change, so no re-smoke-render needed; prior smoke render PASSED (teapot, turbo-12, ~61s, peak 30.64 GB) remains valid. -->
