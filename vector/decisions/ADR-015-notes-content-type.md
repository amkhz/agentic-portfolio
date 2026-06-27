# ADR-015: Notes content type — frontmatter + glob, reusing the case-study body grammar

**Date:** 2026-06-27
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell

## Context

The post-recalibration batch (`vector/missions/post-recalibration-batch.md`, task T3a) calls for a writing surface on the portfolio: short-form posts (a "design infrastructure, not just designs" manifesto, a "Five Ways I Work" piece, a 2026 retro) that are argument and reflection rather than case studies. The portfolio had no content type for this — no model, no route, no list or detail surface.

A near-twin already exists in the repo. The Perihelion Archive lab guide library (`core/lab/`) is a full posts-style system: `guide-types.ts` (model), `guides.ts` (`import.meta.glob` registry), `parse-guide.ts` (YAML-frontmatter parser with field validation and tests), eleven guide `.md` files. But it is scoped to `labs.justinh.design` and to a specific job — an academic research library with territories, source citations, glossary terms, and figure references. It is the wrong shape to reuse directly for portfolio notes, but the right pattern to copy.

The cost of not deciding was building T3a against an authoring model that the Writer (T3b) would have to fight every time a post is added or edited.

## Decision Drivers

- **Best authoring ergonomics.** Posts are written and revised by the Writer skill against Joi's voice profile. One self-contained file per post means one place to edit, no metadata drift between a TS array and a `.md` body.
- **Reuse proven structure over inventing new surfaces.** The lab already validates frontmatter + glob in production. The case-study side already validates a body grammar (`parseCaseStudyMarkdown`) and a renderer (`renderSection`) that handles text, images, callouts, quotes, metrics, and CTAs.
- **Shared body grammar with case studies.** A note and a case study section should read and render identically. Sharing the parser keeps one grammar to learn and one renderer to maintain.
- **Empty-state honesty.** The glob must produce a clean empty array when no posts exist, so the surface ships before any prose is written (T3a is infra; prose is T3b).
- **Layer discipline (ARCHITECTURE.md).** Model, parser, and registry are pure `core/`; routes and surfaces are `src/`; no styles or fetching leak across.

## Options Considered

### Option A: Lab-style frontmatter + glob (chosen)

Each post is one self-contained `.md` with YAML frontmatter (`title`, `date`, `summary`, `kicker`) and a Markdown body. Posts are auto-registered via `import.meta.glob`, frontmatter validated by a small parser (`parse-note.ts`, mirroring `parse-guide.ts` but far lighter — no territories, sources, glossary, or figures), and the body rendered through the existing `parseCaseStudyMarkdown` + `renderSection` pipeline.

**Pros:**
- One file per post; the Writer touches exactly one place.
- Closest to a pattern already proven in production (the lab).
- Body grammar and renderer shared with case studies — nothing new to learn or maintain.
- Slug derived from filename; ordering by `date` desc; empty directory yields an empty array.

**Cons:**
- A second frontmatter parser in the codebase (mitigated: it is small, tested, and deliberately not a generalization of the guide parser — coupling them would drag lab-specific concerns into the portfolio).

### Option B: Lightweight `posts.ts`

Metadata lives in a hand-written TS array (mirroring `case-studies.ts`); the body `.md` is parsed by the existing section parser.

**Pros:**
- Fastest to stand up; no new parser.
- Mirrors the already-familiar `case-studies.ts` shape.

**Cons:**
- Two-file authoring per post (the TS array entry plus the `.md` body); metadata and body drift.
- The Writer edits TypeScript to add a post, which is a worse authoring surface than a single Markdown file.

### Option C: Hold / rethink scope

Decide the lab already satisfies the writing itch, or that posts live on an existing surface rather than a new top-level `/notes`.

**Pros:**
- No new surface to build or maintain.

**Cons:**
- The lab is research, not practice reflection; the manifesto and retro do not belong there.
- The batch explicitly scopes three portfolio posts with source material already drafted in `port-sources/`. Holding leaves that work homeless.

## Decision

**We will build a Notes content type as self-contained frontmatter `.md` files auto-registered via `import.meta.glob`, with the body rendered through the existing case-study section pipeline (Option A).**

Implementation:
- `core/content/note-types.ts` — `NoteFrontmatter` (`title`, `date`, `summary`, `kicker?`, `draft?`) and `Note` (`slug`, `frontmatter`, `sections: CaseStudySection[]`).
- `core/content/parse-note.ts` — splits YAML frontmatter (via `js-yaml`, already a dependency) from body, validates required fields with field-level errors, runs the body through `parseCaseStudyMarkdown`. Tested in `parse-note.test.ts`.
- `core/content/notes.ts` — `import.meta.glob('./notes/*.md')` registry → `notes: Note[]` sorted by `date` descending, plus `notesBySlug`. Drafts excluded from the published list in production.
- `src/pages/NotesPage.tsx` (list + empty state) and `src/pages/NotePage.tsx` (detail), reusing `Container`, the Field Notebook dossier components, and `renderSection`.
- Routes `/notes` and `/notes/:slug` in `src/App.tsx`; a "Notes" link in the primary nav.

T3a ships infra and the empty state only. The three posts are T3b (Writer, Joi voice). The note body grammar is intentionally the same as case studies, so a post can use text, image, callout, quote, and CTA sections without any new parser work.

## Consequences

**Positive:**
- The portfolio gains a first-class writing surface with single-file authoring.
- Body grammar and renderer are shared with case studies — one grammar, one renderer.
- The empty state lets the surface ship now and fill in T3b without a second pass.
- The pattern is reusable for any future short-form content.

**Negative:**
- A second (small, tested) frontmatter parser exists alongside the guide parser. Accepted deliberately: the two surfaces have different frontmatter contracts, and coupling them would couple the portfolio to lab concerns.
- The Notes nav link grows the primary nav to five items (Home, Work, Notes, About, Resume). Acceptable; still within a comfortable count.
