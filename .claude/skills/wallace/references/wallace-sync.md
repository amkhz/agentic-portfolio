# Wallace Sync: Drift Detection & Reference Refresh

A maintenance routine for keeping Wallace's reference docs aligned with upstream
MFLUX and Ideogram 4, which both change frequently. Run this when a render
behaves unexpectedly, when Justin mentions an upstream update, or periodically
(monthly is reasonable while both projects are young).

This is not a render skill. It changes the docs, never generates images.

---

## What drifts, and where the truth lives

| Wallace doc | Upstream source of truth | What to check |
|-------------|--------------------------|---------------|
| `caption-schema.md` | `ideogram-oss/ideogram4` → `docs/prompting.md` | key order, required fields, bbox convention, hex rules, new fields |
| `caption-schema.md` (render params) + `SKILL.md` Phase 4 | `filipstrand/mflux` → `src/mflux/models/ideogram4/README.md` | CLI name, flags, presets, what's supported vs. not |
| `SKILL.md` Phase 4 (runtime detection) | installed binary: `mflux-generate-ideogram4 --help` | actual flags on THIS machine's version |
| `runtime.local.md` | the machine itself | which runtime is installed, version, confirmed working command |

The pinned commit / version we last validated against is recorded at the bottom
of each reference file under a `<!-- SYNCED: ... -->` marker. Compare against it.

---

## Sync procedure

### Step 1 — Establish current local reality first

Before fetching anything, ask the machine what it actually has:

```bash
mflux-generate-ideogram4 --help 2>&1
pip show mflux 2>/dev/null | grep -i version || uv tool list | grep mflux
```

The local `--help` is the highest-authority source for flags, because it's the
version Justin is actually running. Upstream README may be ahead of or behind it.

### Step 2 — Fetch upstream and diff against our docs

Read, in order:
1. `https://github.com/filipstrand/mflux/blob/main/src/mflux/models/ideogram4/README.md`
   — CLI name, flags, presets, supported/unsupported list, disk size, gated-weight notes
2. `https://github.com/ideogram-oss/ideogram4/blob/main/docs/prompting.md`
   — schema structure, key-order tables, bbox spec, hex rules

For each, compare against the matching Wallace doc section by section. Note any
delta: renamed flag, new preset, changed key order, new schema field, changed
constraint.

### Step 3 — Reconcile conflicts

When local `--help` and upstream README disagree, **local wins** for flags
(Justin runs the installed version), but flag the gap to Justin — it usually
means an upgrade is available. When upstream prompting.md changes the schema,
that's authoritative for caption structure regardless of MFLUX version.

### Step 4 — Apply and re-pin

- Edit only the changed lines in the reference docs. Preserve structure.
- Update the `<!-- SYNCED: ... -->` marker with today's date and the upstream
  commit hash (visible in the GitHub URL or the page's `meta-release` value).
- If a flag or CLI name changed, grep the whole skill folder for the old string
  and fix every occurrence (SKILL.md, both references) — partial fixes are how
  the docs drift internally.

### Step 5 — Validate

Run one known-good caption through the updated command to confirm the docs still
produce a working render. Use the teapot caption from the MFLUX README as the
canonical smoke test — it's small and fast.

### Step 6 — Report

Give Justin a short changelog: what drifted, what changed in the docs, whether
an upgrade is recommended. If the change is architectural (new capability like
image-to-image landing, or a schema breaking change), flag it for an ADR via
`invest-adr` and note any new pitch-worthy capability for the Director.

---

## When NOT to run this

- Mid-render-session. Finish the creative work first; sync is separate.
- Just because a single render looked bad — that's usually a caption problem,
  not drift. Only sync when behavior suggests the *interface* changed (a flag
  errors, a preset name is rejected, the CLI isn't found).

---

## Standup Format

```
Last synced: [date + upstream commit]
Drift found: [flags/schema/none]
Docs updated: [which files, what changed]
Action for Justin: [upgrade recommended? ADR needed? none]
```
