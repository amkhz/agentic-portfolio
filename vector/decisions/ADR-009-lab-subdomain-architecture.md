# ADR-009: Lab subdomain architecture — two Vite builds, one repo

**Date:** 2026-04-20
**Status:** proposed
**Deciders:** Justin Hernandez, Dreamer (Tyrell to review before implementation)

## Context

Justin's Speculative Design Lab produces deep-dive research guides on frontier physics papers. The library has seven guides built or drafted, with six more expected this month and an open-ended cadence after. The lab has its own visual identity (dark-academic: `#0a1018` background, Georgia serif body, JetBrains Mono labels, per-guide accent colors), its own scholarly positioning, and its own audience (researchers, practitioners, UAP science community) — distinct from but adjacent to the portfolio's audience (hiring managers, design collaborators).

The decision in front of us: where and how does the lab live?

Three paths were considered before this ADR was written; Justin and Dreamer agreed on the direction before formalizing. This ADR documents the decision and its consequences.

## Decision Drivers

- **Two distinct visual languages** — Portfolio is "Blade Runner + Finn Juhl" (warm blacks, brass + dusty magenta, Didact Gothic). Lab is "academic preprint viewer" (cool near-black, serif body, per-guide accents). Jamming them together weakens both.
- **Publishing cadence** — 6 guides this month, open-ended after. Infrastructure must support ongoing content throughput, not a one-time launch.
- **Shared doctrine and tooling** — Agent crew (Tyrell, Roy, Writer, Dreamer, Joi) should work across both surfaces without context switching. Architecture enforcement (four layers, token colors, WCAG 2.2 AA) applies to both.
- **Migration posture** — Justin wants to eventually unify lab and portfolio visual systems, but not at launch. Architecture must make eventual integration a low-risk CSS variable swap, not a full rewrite.
- **Deploy simplicity** — Current portfolio deploys from `amkhz/portfolio` to `justinh.design` via Vercel. Lab should deploy through the same pipeline with minimal additional infrastructure.

## Options Considered

### Option A: Separate repository

Create `amkhz/speculative-design-lab` (or similar), its own Vite project, its own deploy target at `labs.justinh.design`. Portfolio stays at `amkhz/portfolio`, `justinh.design`.

**Pros:**
- Total isolation — no risk of lab changes affecting portfolio and vice versa
- Clean mental model — one repo per surface
- Independent deploy and CI pipelines
- Lab could use a different stack if ever useful

**Cons:**
- Agent crew context splits across two repos — Tyrell/Roy lose shared awareness
- Design system tokens duplicate or require a shared package (new infrastructure)
- Two CI/CD pipelines to maintain
- Cross-linking between portfolio and lab becomes friction
- Eventual visual integration requires cross-repo coordination

### Option B: Monorepo with shared package

Restructure `amkhz/portfolio` into a monorepo (`packages/portfolio`, `packages/lab`, `packages/design-system`) using pnpm workspaces or similar. Each package independently builds.

**Pros:**
- Total package isolation with shared dependencies
- Standard tooling (Turborepo, Nx) for complex monorepo orchestration
- Cleanest boundary between portfolio and lab code

**Cons:**
- Heavy refactor of a working project for a two-package case
- Monorepo tooling adds complexity well beyond what the scope warrants
- Current agent doctrine (four-layer architecture, ARCHITECTURE.md) assumes flat project structure — would need rewriting
- Overkill for two sibling applications sharing three layers

### Option C: Vite multi-entry in one repo

Keep `amkhz/portfolio` flat. Add a second HTML entry (`labs.html`) alongside `index.html`. Both entries build from the same Vite config into the same `dist/`. Each HTML bootstraps its own React app with its own React Router instance. Vercel routes by host header: `justinh.design` → `/index.html`, `labs.justinh.design` → `/labs.html`.

Shared code lives where it already does: `design-system/` for tokens, `core/` for logic and content (add `core/lab/` subtree for lab-specific data), `services/` for external I/O. Lab UI lives in `src/lab/` (a subtree of the existing UI layer, not a new layer).

**Pros:**
- Zero repo restructuring — existing four-layer architecture holds without modification
- One `vite build` command produces both apps
- Shared module graph — TypeScript, Tailwind, tokens tree-shake correctly across entries
- Agent crew keeps full context — one CLAUDE.md, one ARCHITECTURE.md, one VECTOR.md
- Eventual visual integration is a CSS variable change, not code migration
- Simple Vercel config: one project, two domains, host-based rewrite
- Lab code is trivially discoverable in the file tree (`src/lab/`, `core/lab/`)

**Cons:**
- Two React Router instances mean no shared client-side state (acceptable — there's nothing to share)
- Slightly more complex Vite config than single-entry (one extra `rollupOptions.input` section)
- Assets bundled together — if the lab later needs totally different build optimization, would require a config split

## Decision

**Option C: Vite multi-entry in one repo.**

Add `labs.html` at the repo root as a second Vite entry. Create `src/lab/` for the lab UI (a second application within the existing UI layer). Create `core/lab/` for lab-specific data models, parsers, content. Create `design-system/lab-tokens.css` for the lab's dark-academic palette. Update `vite.config.ts` to declare both entry points. Update `vercel.json` with a host-based rewrite for the lab subdomain.

### Architecture boundaries

The four-layer architecture is preserved. `src/lab/` is not a new layer — it's a second UI *application* within the existing UI layer. The rule "every file belongs to exactly one layer" continues to hold:

| File | Layer |
|------|-------|
| `design-system/lab-tokens.css` | design-system |
| `core/lab/parse-guide.ts` | core |
| `core/lab/guides/*.md` | core (content) |
| `src/lab/components/guide/GuideRenderer.tsx` | src (UI) |
| `src/main.tsx` | src (UI) |
| `src/lab/main.tsx` | src (UI) |

Import direction is unchanged: `src/lab/*` imports from `core/`, `core/lab/`, `services/`, `design-system/`. It never imports from `src/*` (portfolio UI) or vice versa. Cross-application UI sharing, if ever needed, would extract components to `core/ui-primitives/` or similar — not direct `src/` ↔ `src/lab/` dependencies.

### Per-guide accent handling

Guide frontmatter declares `accent: "#hex"`. The `GuideRenderer` component sets `--guide-accent: <hex>` as a React inline style on its root element. This is the ONE permitted inline style exception in the lab codebase — it sets a CSS custom property (data, not presentation), not a style value. All downstream styling references `var(--guide-accent)` through standard CSS. This complies with the "no raw colors outside design-system/" rule because the raw value originates in content (frontmatter), not in UI code.

### Deploy topology

- Vercel project: existing `amkhz/portfolio` project, no changes
- Domains attached: `justinh.design` (existing), `labs.justinh.design` (new, requires DNS CNAME and Vercel dashboard addition)
- `vercel.json` rewrites on host: lab subdomain → `/labs.html`, everything else → `/index.html`
- SPA routing: React Router handles client-side navigation within each app

## Consequences

**Positive:**
- One repo, one agent crew, one doctrine — no split-brain on conventions or architecture
- Adding the lab is additive, not disruptive — existing portfolio build, tests, deploy remain unchanged
- Shared design tokens enable staged visual migration via CSS variable swaps
- Lab and portfolio can cross-link freely (same Vercel project, same domain root)
- Build pipeline stays simple: `npm run build` produces both apps
- Future apps (e.g., a third surface for something else) follow the same pattern — add an HTML entry, add a `src/[name]/` subtree

**Negative:**
- `dist/` now contains two apps — slightly more cognitive load when inspecting build output
- Vite config has a `rollupOptions.input` block (one-time learning cost)
- If the lab ever outgrows this pattern (needs SSR, needs a backend, needs independent build optimization), splitting to its own repo becomes a migration rather than a clean break — mitigated by keeping `src/lab/` and `core/lab/` namespaced so extraction is mechanical

**Neutral:**
- Lab and portfolio share one Vercel Analytics namespace — separate reporting requires dashboard segmentation, not infrastructure changes
- Lab subdomain is explicitly scoped to `labs.justinh.design` (not `lab.`) — per Justin's stated preference

## Implementation

See `plans/feature-speculative-lab-library.md` for the full implementation plan (Phases 1–5). This ADR governs the architectural shape; the plan governs sequencing.

## Related Decisions

- `ADR-001: Migrate from Next.js to Vite` — Vite's multi-page entry support is what makes Option C clean
- `ADR-005: CSS-only texture system` — establishes the token-first pattern that per-guide accent handling extends
- `ADR-006: Systematic audit/polish pass` — lab launch will follow the same Impeccable audit discipline as portfolio features

## Revisit Criteria

Revisit this decision if any of the following become true:

- Lab needs server-rendered pages, backend API routes, or a database → separate repo likely warranted
- Lab bundle size causes portfolio initial-load regression → split builds into separate Vite configs or separate repos
- Agent crew starts duplicating conventions across apps → doctrine drift, time to reorganize
- A third major surface arrives that would push the repo toward monorepo tooling
