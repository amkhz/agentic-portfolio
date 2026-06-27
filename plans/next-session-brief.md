# Pickup Brief — M3 DONE (notes infra + prose + case-study verification); M4 motion + gates next

Updated 2026-06-27. Integration branch is **`feat/conservatory-tokens`** (all M3 work merged + committed here; latest `e812941`). Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest).

## Where we left off (this session)

### M2 imagery — Justin's screenshots integrated ✅
Justin dropped 15 screenshots (`port-sources/SCREeN/`). Triaged and wired them all into the build (commit `ce13c13` on `feat/conservatory-tokens`; lint + build green):

- **10 punch-list slots filled** — `kiavi-world-home`, `brand-comparison`, `doctrine-reads-doctrine` (the hero), the four Snapshot views (`snapshot-dashboard`, `snapshot-dashboard-action-required`, `snapshot-property-asset-workspace`, `snapshot-evidence-inspection`, `snapshot-rule-provenance`), `operations-ds-tokens`, `talk-as-prototype`.
- **2 new image blocks woven into `doctrine-not-prompts.md`** (via Writer, Joi voice): `key-agent-terminal.png` (the real CLI counterpart, sitting beside the doctrine-reads-doctrine hero) + `leverage-math.png` (the Learn view, in the Kiavi World section).
- **1 staged backup** — `snapshot-evidence-inspection-alt.png` (Prelim Title shot), in the repo, unwired, ready if we want variety.
- **IDR hero re-cropped** — old `idr-hero.png` was an off-center crop (asymmetric ~390L/700R trim sliced the file header mid-word). Re-derived from the pristine `admin-page-tasks.png` source as a balanced 16:9 (3600×2025), full header intact, card column centered.
- **`image-punchlist.md` deleted** — missing-image set closed. `wallace-hero.png` + `design-infrastructure.png` already exist from earlier Wallace renders.
- **Meta low-res re-shoots DESCOPED** — Justin's call: he no longer cares about the ~1400px `meta-*` set ("a point in time when we were just starting out"). T2b's 8 hi-res replacements are dropped.

Net M2: **T2a ✅, T2b ✅ (meta descoped), T2c ✅, T2e ✅, T2f ✅.** Only **T2d** (formal WCAG alt-text audit) remains, and it's largely satisfied — every new image already has descriptive alt text. A dedicated audit pass is optional.

### M3 Notes/Posts (T3a) — SHIPPED ✅
Decision landed: **Option 1, frontmatter + glob** (recorded in **ADR-015**). Built on `feat/notes-content-type`:
- `core/content/note-types.ts` — `Note` + `NoteFrontmatter` (title/date/summary/kicker?/draft?).
- `core/content/parse-note.ts` (+ `parse-note.test.ts`, 8 tests) — YAML frontmatter parser, field-level validation, body via the shared `parseCaseStudyMarkdown`. **Gotcha solved:** loads with `yaml.JSON_SCHEMA` so an unquoted `date: 2026-06-27` stays a string instead of becoming a JS `Date`.
- `core/content/notes.ts` — `import.meta.glob('./notes/*.md')` registry, reverse-chron by date, drafts hidden in prod / reachable by slug in dev. Empty dir → empty array → index empty state.
- `core/utils/format.ts` — `formatNoteDate` (timezone-safe long-form).
- `src/pages/NotesPage.tsx` (list + empty state) + `NotePage.tsx` (single-column reading register, reuses `renderSection`). Routes `/notes` + `/notes/:slug`; Notes link in Header + Footer; sitemap entry.

**Body grammar = case-study grammar.** A post can use text / image / callout / quote / metrics / cta sections with zero new parser work. Author one `.md` in `core/content/notes/`; it auto-registers.

**Two open follow-ups (non-blocking):**
- NotesPage hero reuses `/images/work-hero.png` at 40% as atmosphere (aria-hidden). Fine as interim; consider a dedicated notes hero or going type-only later.
- Sitemap generator (`scripts/generate-sitemap.ts`) is broken under Node 25 (`ERR_UNKNOWN_FILE_EXTENSION` on the `.md?raw` imports) — pre-existing, not T3a. `/notes` was added by hand. Worth a real fix (vite-node) before relying on it for note slugs.

## M3 — DONE ✅
- **T3a** ✅ notes infra (ADR-015): frontmatter + glob, shared case-study body grammar, `/notes` + `/notes/:slug`, empty-state, nav. Merged to integration branch.
- **T3b** ✅ **two** posts live in `core/content/notes/` (Joi voice, Gaff-passed, no em-dashes, coworkers anonymized, no internal numbers):
  - `design-infrastructure-not-just-designs.md` — the manifesto (argument form, ADR-014).
  - `five-ways-i-work.md` — practice principles (Justin rewrote + owns the personal Way-1 voice).
  - **Retro CUT** (`from-one-prototype-to-a-workshop.md` deleted) — too redundant with the doctrine-not-prompts case study. wins.md material stays a receipts source, not a post.
- **T3f** ✅ Justin's call: **no PR/ADR citations** in the external case studies (decided against; internal IDs mean nothing to readers + leak structure on a public repo). Only two factual fixes landed (`e812941`): designer ramp reconciled to "inside 2 months" across both studies; "ship by July" → "ship by the end of July". All IDR metrics verified accurate by Justin, unchanged. Worksheet archived at `scratchpad/t3f-verification-worksheet.md` (gitignored).

## Next — the tail, then gates
- **T2d** (optional) — formal alt-text audit pass on the new imagery. Largely satisfied already; a dedicated pass is optional.

## Then the rest of the batch
- **M4 Motion** (fast-follow, LAST) — T4a tokens → T4b choreography (interface-craft Storyboard + DialKit) → T4c critique. **T4d** Paper Shaders spike (`plans/paper-shaders-reference.md`). Hold until surfaces settle.
- **Gates:** Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` → **Roy final review** → merge `feat/conservatory-tokens` → `main`.

## Critical path
surfaces ✅ → M2 imagery ✅ → M3 notes + prose + verification ✅ → **M4 motion** → Impeccable critique+polish → Roy → merge to main.

## Open items / notes
- **Post source material** lives in `port-sources/`: `practice.md`, `wins.md`, `ai-assisted-design-at-kiavi.md`, plus the manifesto drafts.
- `port-sources/SCREeN/` still holds the original screenshots (copied, not moved) — safe to clean up whenever.
- **`case-studies.ts` collision chain** still applies (manifest flag #2): T3a → T3b/T3f → T2f (done) → T2d. No parallel worktrees on `case-studies.ts` + case-study `.md`.
</content>
</invoke>
