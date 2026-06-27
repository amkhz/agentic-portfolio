# Pickup Brief — M2 imagery fully integrated; M3 Notes/Posts (T3a) ADR decision pending

Updated 2026-06-27. Integration branch is **`feat/conservatory-tokens`**. Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest). Latest commit: **`ce13c13`** (screenshot integration + IDR hero crop).

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

### M3 Notes/Posts (T3a) — ADR decision pending, NOT yet built
Started T3a (notes/posts content-type infra). Mapped the routing + content architecture. **Key discovery (Justin flagged it): we already built a near-twin.** The Perihelion Archive **lab guide library** at `core/lab/` is a full posts-style system — `guide-types.ts` (model), `guides.ts` (`import.meta.glob` registry), `parse-guide.ts` (parser + tests), 11 guide `.md`s, glossary/figures. But it's scoped to `labs.justinh.design` (a research library: territories, academic source citations). The portfolio still has **no** notes/posts type (no `posts.ts`, no `/notes` route, no list/detail page).

**The open ADR decision — pick this BEFORE building:**
1. **Lab-style frontmatter + glob** — each post = one self-contained `.md` (YAML frontmatter: title/date/summary/kicker + body), auto-registered via `import.meta.glob`, body rendered through the existing case-study section renderer (`renderSection` / `parseCaseStudyMarkdown`). Cleanest authoring (Writer touches one file), closest to what already works in the lab.
2. **Lightweight `posts.ts`** — metadata in a hand-written TS array (mirrors `case-studies.ts`), body `.md` parsed by the existing section parser. Fastest to stand up; Writer edits two places per post.
3. **Hold / rethink scope** — maybe the lab already covers the writing itch, or posts live on an existing surface instead of a new top-level `/notes`.

**Tyrell's lean: Option 1** (frontmatter + glob, reuse the section renderer) — best authoring ergonomics, proven pattern, keeps body grammar shared with case studies. Justin paused to think; **decide first thing next session.**

## Next — M3, then the tail
- **T3a** (Tyrell, infra) — once the ADR lands: spin a quick `invest-adr` (ADR-015), then build the type (parser/registry, `/notes` + `/notes/:slug` routes, list + detail surfaces, Notes nav link). Branch `feat/notes-content-type`. Infra + empty-state only; prose is T3b.
- **T3b** (Writer, after T3a) — the three posts: "Design infrastructure, not just designs" manifesto (the *argument* form per ADR-014); "Five Ways I Work" (from `port-sources/practice.md`); 2026 retro (from `port-sources/wins.md`). Joi voice, no em-dashes, anonymize internal names. More source material in `port-sources/ai-assisted-design-at-kiavi.md`.
- **T3f** (Writer) — verified PR/ADR citations into `doctrine-not-prompts.md` + `instant-doc-review.md`. **Justin verifies the numbers before publish.**
- **T2d** (optional) — formal alt-text audit pass on the new imagery.

## Then the rest of the batch
- **M4 Motion** (fast-follow, LAST) — T4a tokens → T4b choreography (interface-craft Storyboard + DialKit) → T4c critique. **T4d** Paper Shaders spike (`plans/paper-shaders-reference.md`). Hold until surfaces settle.
- **Gates:** Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` → **Roy final review** → merge `feat/conservatory-tokens` → `main`.

## Critical path
surfaces ✅ → M2 imagery ✅ → **M3 notes (T3a ADR → build → T3b prose)** → motion → Impeccable critique+polish → Roy → main.

## Open items / notes
- **Post source material** lives in `port-sources/`: `practice.md`, `wins.md`, `ai-assisted-design-at-kiavi.md`, plus the manifesto drafts.
- `port-sources/SCREeN/` still holds the original screenshots (copied, not moved) — safe to clean up whenever.
- **`case-studies.ts` collision chain** still applies (manifest flag #2): T3a → T3b/T3f → T2f (done) → T2d. No parallel worktrees on `case-studies.ts` + case-study `.md`.
</content>
</invoke>
