# Codex v1 Build Plan

> Implementation plan for the meta case study's expandable spine rendering path.
> Drafted 2026-03-07. Builder executes, Director tracks.

---

## Concept

Same URL (`/work/building-this-portfolio`), different rendering path. A `template: 'codex'` flag in case study metadata switches from linear sections to a vertical spine with expandable chapter nodes.

---

## Core Layer

- **New type:** `CodexEntry` in `core/content/codex.ts` wrapping existing `CaseStudySection[]` with id, title, inscription, glyph, tags, connections
- **New parser:** `parseCodexMarkdown` in `core/content/parse-codex.ts` splits on `##` headings, looks for optional `:::codex` metadata fences, delegates section parsing to existing parser
- **Backwards-compatible:** If no `:::codex` blocks exist, auto-generates entries from headings + first sentences
- **Metadata:** Add optional `template?: 'standard' | 'codex'` to `CaseStudy` interface in `core/tokens/index.ts`

---

## UI Layer

| Component | Location | Job |
|-----------|----------|-----|
| `CodexPageTemplate` | `src/components/content/CodexPage.tsx` | Hero + spine (replaces linear section list) |
| `CodexSpine` | `src/components/content/CodexSpine.tsx` | Vertical timeline, manages expand state as `Set<string>` |
| `CodexNode` | `src/components/content/CodexNode.tsx` | Glyph + title + inscription, expand trigger |
| `CodexChapter` | `src/components/content/CodexChapter.tsx` | Maps sections through shared `renderSection`, shows connection hints |
| `renderSection` | `src/components/content/renderSection.tsx` | Extracted from CaseStudyPage for reuse (zero behavior change) |

---

## Key Decisions

- **Multi-open** (not accordion): only ~7 chapters, accordion would feel restrictive
- **grid-template-rows** collapse: same pattern as NowPlaying, no backdrop-blur needed so overflow-hidden is fine
- **Connections are text-only in v1:** "Related entries" tags at chapter bottom, subtle glow on connected spine nodes
- **No SVG lines or constellation diagram until v2**
- **Mobile:** spine collapses to left-edge line with full-width chapters

---

## Implementation Order

1. Tokens: codex-specific CSS variables in `design-system/tokens.css`
2. Core types: `CodexEntry` type
3. Core parser: `parseCodexMarkdown`
4. Core integration: `codexContent` export, `template` field on metadata
5. UI refactor: extract `renderSection` to shared module
6. UI components: CodexSpine, CodexNode, CodexChapter (bottom-up)
7. UI page: CodexPageTemplate, wire into CaseStudyPage.tsx
8. Content: add `:::codex` metadata blocks to building-this-portfolio.md
9. Quality gate: lint, build, a11y audit

---

## Risks

- **Large chapter expand:** mitigated by RevealOnScroll staggering inside sections
- **Mobile spine layout:** responsive Tailwind classes, no special components needed
- **Markdown backwards compatibility:** parser falls back gracefully without `:::codex` blocks
