# Feature: Constellation Field -- Meta Case Study Reimagined

> Dreamer plan. 2026-04-11. Replaces codex-v1-build-plan.md.

---

## Summary

Rebuild the meta case study as a spatial constellation -- a 2D field of topic nodes connected by glowing threads. Each node is a self-contained story (the sprint, OKLCH, Investiture, the crew, etc.) that you can enter, explore, and follow connections through. The constellation IS the navigation. Clicking a node transitions to its full content, which surfaces peeks into connected nodes woven into the narrative. New topics appear as new stars. The structure scales indefinitely and leans into the portfolio's sci-fi/nature aesthetic.

## Context

The meta case study has outgrown its original "48-hour sprint" framing. It now spans 6 weeks of evolution: color migrations, framework changes, agentic workflow maturation, audit passes, texture systems, and speculative design work incoming. Linear scroll doesn't work. The codex v1 (accordion spine) felt constricting because it was still chronological and uniform. The Field concept organizes by theme and relationship, not time. It reflects how the work actually connects.

---

## The Concept

### What the reader sees

A starfield of labeled nodes floating in space. The sprint is the brightest node near the center. Surrounding it: Material, Structure, Process, Craft, and future nodes for speculative work, music integration, etc. Thin connection lines glow between related nodes. The whole field has a quiet ambient pulse -- alive but not distracting.

### How it works

1. **The Field**: The constellation is a DOM-based layout (not canvas) for accessibility. Nodes are positioned using normalized coordinates defined in the data model. SVG connection lines draw between related nodes. On desktop, the field fills the viewport below the hero. On mobile, the field compresses to a tighter cluster but keeps the spatial metaphor.

2. **Node selection**: Click a node. The field fades/scales back and the node's content takes over the full page. Transition is smooth -- the node marker can anchor the transition (scale up from its position). Back button or an explicit "return to field" link restores the constellation.

3. **Connection peeks**: Within a node's content, at natural breakpoints, related nodes surface as visual elements -- a node marker, title, inscription, and a one-line tease. These are woven into the reading flow, not relegated to a footer. Clicking a peek transitions directly to that node's content without returning to the field.

4. **Node states**: Nodes have visual states: `shipped` (solid, glowing), `active` (pulsing, in-progress), `planned` (dimmer, dashed outline). This lets the constellation show the project's living status.

### How it scales

New work = new node in the data model. Define its position, connections, content, and status. The field renders it. No structural changes to components. The speculative lab work becomes a cluster of nodes in its own region of the field. Music integration gets its own node. The system grows organically.

---

## Story Restructure

The current 6 chronological chapters become thematic nodes. Some current chapters combine, some split, and there's room for new ones.

### Core Nodes (v1)

| Node | Content source | Connections |
|------|---------------|-------------|
| **The Sprint** | Setup + Build + Friction chapters (combined, tightened) | Material, Structure, Process |
| **The Material** | Color Migration + Texture System (ADR-005) + Design Context | The Sprint, Structure, Craft |
| **The Structure** | Framework Migration + Investiture adoption + ADR-001 | The Sprint, Material, Process |
| **The Process** | Agentic Workflow (expanded with skills ecosystem, invest-* pipeline) | The Sprint, Structure, Craft |
| **The Craft** | Audit/polish pass (ADR-006) + Accessibility + Wabi-sabi philosophy | Material, Process |

### Planned Nodes (v2+)

| Node | Status | Notes |
|------|--------|-------|
| **The Lab** | planned | Speculative design explorations |
| **The Sound** | planned | Music integration, listening data |
| **The System** | planned | Design system documentation, token page |

### Content principles

- Each node is **self-contained**: you can read it without reading others
- Each node is **~500-800 words**: tighter than current chapters, focused on one transformation
- Connection peeks provide **context bridges**: "this decision made the color migration possible" with a peek to The Material
- The Sprint node is the **longest** (~1000 words): it's the origin story and earns the space
- New content types: **ADR citations** (inline references to decisions), **timeline markers** (when things happened, subtle)

---

## Data Model

### Core layer: `core/content/constellation.ts`

```typescript
export interface ConstellationNode {
  id: string;                          // kebab-case slug
  title: string;                       // display name
  inscription: string;                 // one-line subtitle
  position: { x: number; y: number };  // normalized 0-1 coordinates
  size: 'sm' | 'md' | 'lg';           // visual weight
  status: 'shipped' | 'active' | 'planned';
  connections: string[];               // related node ids
  sections: CaseStudySection[];        // content (reuses existing type)
}

export interface ConnectionPeek {
  targetId: string;                    // node this peek links to
  tease: string;                       // one-line hook ("this made the color migration possible")
}

export interface ConstellationData {
  nodes: ConstellationNode[];
}
```

Positions are normalized 0-1 so the field layout can scale to any container size. The renderer maps these to actual pixel positions.

### Connection peeks in content

Connection peeks are embedded in the markdown content using a new directive:

```markdown
::: peek the-material
This decision made the color migration possible.
:::
```

The parser converts these to `ConnectionPeek` objects that the renderer displays as interactive elements inline with the content.

---

## Design Tokens

Add to `design-system/tokens.css`:

```css
/* Constellation field */
--constellation-node-size-sm: 1.5rem;
--constellation-node-size-md: 2rem;
--constellation-node-size-lg: 2.75rem;
--constellation-line-color: var(--theme-border-subtle);
--constellation-line-active: var(--theme-accent-primary);
--constellation-line-width: 1px;
--constellation-glow-shipped: var(--theme-accent-glow);
--constellation-glow-active: var(--theme-secondary-glow);
--constellation-node-bg: var(--theme-bg-elevated);
--constellation-node-border: var(--theme-border-strong);
--constellation-node-active-border: var(--theme-accent-primary);
```

Light mode overrides follow the same pattern -- stronger contrast, muted glow.

---

## UI Components

| Component | File | Job |
|-----------|------|-----|
| `ConstellationField` | `src/components/content/ConstellationField.tsx` | The field container. Renders nodes at their positions, SVG connections between them. Handles hover highlighting (glow connections for hovered node). |
| `ConstellationNode` | `src/components/content/ConstellationNode.tsx` | Individual node marker. Shows title, inscription on hover/focus. Visual states for shipped/active/planned. Clickable. |
| `ConstellationContent` | `src/components/content/ConstellationContent.tsx` | Full-page content view for a selected node. Renders sections via existing renderSection. Includes connection peeks inline. Back-to-field navigation. |
| `ConnectionPeek` | `src/components/content/ConnectionPeek.tsx` | Inline peek element within content. Shows connected node's marker, title, inscription, tease text. Clickable to transition to that node. |
| `ConstellationPage` | `src/components/content/ConstellationPage.tsx` | Page template. Hero (same as current) + field or content view depending on selected node. Manages selected state and transitions. |

### Component hierarchy

```
ConstellationPage
├── Hero (inline, same as current case study hero)
├── ConstellationField (when no node selected)
│   ├── SVG connections layer
│   ├── ConstellationNode (the-sprint)
│   ├── ConstellationNode (the-material)
│   └── ...
└── ConstellationContent (when a node is selected)
    ├── Back-to-field nav
    ├── Node title + inscription
    ├── Sections (via renderSection)
    │   ├── TextBlock, ImageBlock, etc.
    │   └── ConnectionPeek (inline, at natural breakpoints)
    └── Related nodes footer (secondary navigation)
```

### Transitions

- **Field to content**: The selected node scales up and the field fades out. Content fades in. Use `motion/react` for the spring transition. Duration ~500ms.
- **Content to content** (via peek): Cross-fade between node contents. The peek element can anchor the transition.
- **Content to field**: Reverse of field-to-content. The node marker scales back down to its position.
- **Reduced motion**: All transitions become instant opacity swaps.

### Mobile constellation

The field compresses to a tighter cluster. Nodes stack more densely but remain tappable (44px minimum touch targets). Connection lines simplify or hide. The spatial metaphor is preserved -- nodes aren't in a list, they're in a compressed spatial arrangement. Think of it as the constellation viewed from further away.

If the compressed field proves too cramped on very small screens (<375px), fall back to a styled list that keeps node markers, inscriptions, and connection indicators.

---

## Accessibility

- Each `ConstellationNode` is a `<button>` or `<a>` with clear accessible name
- Connection lines are decorative (`aria-hidden="true"`)
- Keyboard navigation: Tab through nodes in a logical order (defined by DOM order, which can differ from visual position)
- When content is open: focus moves to the content area. Back button is first focusable element.
- `role="navigation"` on the field, `aria-label="Case study topics"`
- Connection peeks are links with descriptive text
- `prefers-reduced-motion`: no scale/fade transitions, instant state changes
- Screen reader experience: the constellation reads as a navigation menu with grouped links

---

## Routing

Two approaches, recommend option A:

**Option A: Hash-based (simpler)**
- `/work/building-this-portfolio` shows the constellation
- `/work/building-this-portfolio#the-sprint` shows that node's content
- Hash changes are handled by the ConstellationPage component
- No new routes needed

**Option B: Nested routes**
- `/work/building-this-portfolio` shows the constellation
- `/work/building-this-portfolio/the-sprint` shows content
- Requires new route config in App.tsx
- Better for SEO and sharing specific sections

Recommend **Option A** for v1 (simpler, no routing changes). Migrate to Option B later if SEO matters for individual nodes.

---

## Layer Impact

- **design-system/**: New constellation tokens in tokens.css + light mode overrides
- **core/**: New `constellation.ts` with data model, node definitions, peek parser. Content files restructured from chronological to thematic.
- **services/**: None
- **src/**: New components (5), template switch in CaseStudyPage, potential updates to renderSection for peek support

---

## Implementation Order

Follow the architecture: tokens > core > UI.

1. **Tokens**: Constellation CSS variables in `design-system/tokens.css`
2. **Core data model**: `ConstellationNode` interface, `ConnectionPeek` type, node definitions with positions and connections
3. **Core content**: Restructure building-this-portfolio.md into per-node content files (or sections within one file, grouped by node)
4. **Core parser**: Extend case study parser to handle `:::peek` directives
5. **UI components**: Build bottom-up: ConnectionPeek > ConstellationNode > ConstellationContent > ConstellationField > ConstellationPage
6. **UI wiring**: Template switch (reuse existing `template` field on CaseStudy, new value: `'constellation'`)
7. **Transitions**: motion/react spring transitions between states
8. **Mobile**: Compressed constellation layout
9. **Quality gate**: lint, build, a11y, visual review in both themes

---

## Content Restructure Plan

The Writer skill will restructure the existing 3,100 words into thematic nodes:

### The Sprint (~1000 words)
Combines: The Setup + The Build + The Friction + "What Came Next"
The origin story. Planning, building, friction, resolution. Tightened from the current ~1800 words.

### The Material (~600 words)
Combines: The Color Migration + texture system work + design context
The visual foundation story. OKLCH, L-channel principle, circuit mesh, linen+wood, wabi-sabi.

### The Structure (~600 words)
Combines: The Framework Migration + Investiture adoption
The architecture story. Why Vite, why four layers, what it enables.

### The Process (~700 words)
Expands: The Agentic Workflow
The crew story. Skills, layer permissions, coordination flow, invest-* pipeline. How the director model works.

### The Craft (~500 words)
New: Audit/polish pass, accessibility rigor, design principles
The quality story. What "earned confidence" looks like in practice.

Total: ~3400 words across 5 nodes (vs. 3100 in 6 chapters currently). Slightly longer but more focused per-node.

---

## Resolved Questions

1. **Node positions**: Algorithmic base layout with randomness, plus tunable knobs (per-node offset overrides in the data model) for hand-tuning the fine details. Best of both worlds.

2. **Peek density**: 1-2 per node, 3 max. Keep the reading flow clean.

3. **The Sprint as entry point**: Yes. Auto-open The Sprint for first-time visitors (no hash in URL). Returning visitors with a hash go directly to that node.

4. **Hero treatment**: "48 hours" becomes The Sprint node's inscription, not the page hero. The hero reframes around the living system concept -- this is a sentient case study that grows with the project.

5. **Content format**: Hybrid. One markdown file for the first four nodes (Sprint, Material, Structure, Process) using node delimiters. Separate files from The Craft onward, as new nodes are created independently.

---

## Pitch-Worthy Aspects

- **The constellation IS the portfolio artifact**: The navigation pattern itself demonstrates information architecture, spatial design, and interaction design thinking
- **Scales indefinitely**: New work = new star. The speculative lab becomes a cluster. Music becomes a node. The system grows with Justin's career.
- **Sci-fi meets function**: The constellation isn't decorative. It's the most efficient way to navigate a complex, interconnected body of work. Form follows function, but the form is beautiful.
- **Connection peeks as design pattern**: Inline navigation that surfaces related content without breaking reading flow. This is a UX innovation worth highlighting.
- **Living system visualization**: Node states (shipped/active/planned) make the constellation a real-time map of the project's evolution. Hiring managers see not just what was built but what's being built.

---

## Risks

- **2D layout accessibility**: Mitigated by DOM-based nodes (not canvas), keyboard navigation, and ARIA. The constellation reads as a navigation menu to assistive technology.
- **Mobile compression**: Mitigated by progressive enhancement -- tighter cluster first, list fallback for very small screens.
- **Content restructure scope**: The Writer needs to reorganize ~3100 words into thematic nodes. This is content work, not just code work. Budget time for it.
- **Transition performance**: motion/react handles this well, but test on low-end devices. Fallback: CSS transitions only.
- **Scope creep**: The constellation is visually ambitious. v1 should be static positions, simple SVG lines, clean transitions. Save physics-based layout, particle effects, and animated connections for v2.
