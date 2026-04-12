# ADR-007: Constellation spatial navigation for meta case study

**Date:** 2026-04-12
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (Builder), Dreamer

## Context

The meta case study ("Building This Portfolio") outgrew its original linear format. What started as a 48-hour sprint narrative expanded over six weeks to include color migrations, framework changes, agentic workflow maturation, design system documentation, music integration, and audit passes. The chronological chapter structure no longer reflected how the work actually connects. Topics like Material and System are conceptually adjacent but were separated by time. Readers had to scroll through everything in order with no way to jump between related topics.

The Codex v1 approach (accordion spine with expandable chapters) was prototyped and shelved. It improved navigation but was still chronological and uniform. The content needed thematic organization and visible relationships.

## Decision Drivers

- **Non-linear content relationships** -- topics connect by theme, not time. Material links to System and Craft. Process links to Structure and Sprint. A linear layout hides these connections.
- **Scalability** -- new work should be addable as a new node without restructuring the page. The speculative lab, music integration, and design system documentation are all incoming.
- **Portfolio as artifact** -- the navigation pattern itself should demonstrate information architecture and interaction design thinking. "The structure IS the artifact."
- **Audience behavior** -- hiring managers scan quickly. They need to find what interests them without reading everything in order.
- **Accessibility** -- WCAG 2.2 AA. DOM-based layout (not canvas), keyboard navigation, screen reader support.

## Options Considered

### Option A: Codex (accordion spine)

Vertical spine with expandable chapter nodes. Click a chapter to expand its content. Related chapters linked via connection tags at the bottom.

**Pros:**
- Familiar accordion pattern, low learning curve
- Works well on mobile
- Chronological ordering is clear

**Cons:**
- Still linear. Position implies sequence.
- All chapters look the same (uniform nodes). No way to signal importance or status.
- Doesn't visualize connections between topics.
- Doesn't scale elegantly beyond ~10 chapters.

### Option B: Constellation (spatial field)

2D field of topic nodes connected by visible threads. Each node is a self-contained story. Nodes have visual states (shipped, active, planned) and spatial positions that reflect conceptual proximity.

**Pros:**
- Non-linear navigation that surfaces relationships
- Visual states show project evolution (what's shipped, what's next)
- Scales indefinitely (new work = new star)
- The navigation pattern itself is a portfolio artifact
- Spatial proximity communicates conceptual relationships

**Cons:**
- Higher interaction complexity than a list or accordion
- Spatial layout needs hand-tuning to communicate meaning (random positions are worse than a list)
- Mobile adaptation requires a different pattern (strip fallback)
- More components and state management

### Option C: Card grid with filters

Standard grid of topic cards with tag-based filtering. Click a card to read the full content.

**Pros:**
- Familiar pattern, minimal learning curve
- Easy to filter by theme

**Cons:**
- Generic. Looks like every other portfolio.
- No visible connections between topics.
- Doesn't communicate project status or evolution.
- Filtering hides content rather than revealing relationships.

## Decision

**Option B: Constellation.** The spatial navigation model best serves both the content structure (thematic, interconnected) and the portfolio thesis (the structure demonstrates design thinking). The mobile strip fallback addresses the interaction complexity concern. Hand-tuned positions address the spatial meaning concern.

## Architecture

### Data model (core/)

`ConstellationNode` defines each topic with id, title, inscription, size, status, connections, and optional hand-tuned position. The `buildConstellationLayout` function positions nodes using fixed coordinates when provided, falling back to a seeded radial algorithm for future nodes. A `readingOrder` export defines the logical sequence for the mobile strip.

Content is split by `<!-- node:id -->` delimiters in the markdown. Standalone node files (craft, sound, system) are parsed separately. A `PeekSection` type enables inline connection previews within content.

### Three-state responsive layout (src/)

1. **Hero state** (no node selected): Constellation fills the viewport below title/subtitle. Tags below the field. Preamble text as empty-state content.

2. **Desktop reading** (node selected, >= 1024px): CSS Grid with `320px 1fr` columns. Constellation compresses to a sticky sidebar with compact markers and always-visible labels. Content fills the main column with images breaking out of the 65ch text constraint. Grid column transition animates at 1200ms with spring easing.

3. **Mobile reading** (node selected, < 1024px): Compact strip of labeled dots sticky below the header. Content fills below. Strip shows all nodes with truncated titles, selected node highlighted.

### Components

| Component | Purpose |
|-----------|---------|
| ConstellationPage | Page template managing three-state layout |
| ConstellationField | Spatial node field with SVG connections, compact mode for sidebar |
| ConstellationNode | Individual node with status styles, compact mode |
| ConstellationContent | Content renderer with inline peeks and related nodes footer |
| ConstellationStrip | Mobile dot strip navigation |
| ConnectionPeek | Inline navigation element within content |
| ImageLightbox | Full-screen image overlay (portaled to body) |

### Tokens (design-system/)

14 constellation-specific CSS variables for node sizes, line colors, glows, peek styling, sidebar width, and strip height. Both dark and light mode variants.

## Consequences

**Positive:**
- Content organized by theme, not time. Readers navigate by interest.
- Visible connections between topics via SVG lines and inline peeks.
- Node status (shipped/active/planned) shows the project as a living system.
- Persistent sidebar on desktop maintains spatial context during reading.
- The pattern itself is pitch-worthy: "I built a spatial navigation system."

**Negative:**
- More components to maintain (7 new, vs 1 for linear layout).
- Node positions need hand-tuning when adding new content. Algorithmic fallback exists but doesn't communicate meaning.
- Mobile strip is a compromise. The spatial metaphor is weaker on small screens.

**Risks mitigated:**
- Accessibility: DOM-based nodes (buttons with ARIA), decorative SVG lines, keyboard navigation, reduced-motion support.
- Performance: No canvas or WebGL. SVG connections are lightweight. Layout algorithm is pure/memoized.
- Scalability: Adding a node is one data object + one markdown file.

## Related

- ADR-001: Vite migration (enabled the four-layer architecture the constellation relies on)
- ADR-005: CSS texture system (constellation surfaces inherit the circuit mesh / linen textures)
- ADR-006: Audit/polish pass (informed the quality standards the constellation components follow)
- `plans/meta-case-study-field.md`: Original Dreamer plan
- `plans/constellation-persistent-nav.md`: Persistent navigation Dreamer plan
