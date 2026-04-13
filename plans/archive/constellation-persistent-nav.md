# Feature: Persistent Constellation Navigation

> Dreamer plan. 2026-04-12. Extends meta-case-study-field.md.

---

## Summary

Reimagine the constellation page layout so the field stays visible during content reading and the constellation itself replaces the traditional hero section. The field becomes persistent spatial navigation on desktop (sticky sidebar) and a compact strip on mobile, so the reader never loses their position in the network.

## Context

The v1 constellation works but has a core UX gap: the field scrolls away when you're reading content. The critique identified this as the biggest design debt. The constellation promises non-linear spatial exploration, but the reading experience is still linear with escape hatches. This plan makes the constellation a true persistent navigation system.

This also addresses the hero reframe. The current hero (tags, title, metric, image) still frames the story as a "48-hour sprint." The constellation reframes it as a living system. The field itself should be the visual statement, not a section below a conventional hero.

---

## The Concept

### Three states of the constellation page

**1. Hero state (no node selected)**

The constellation IS the hero. First thing a visitor sees:

```
┌──────────────────────────────────────────────┐
│ ← All Work                                  │
│                                              │
│ Building This Portfolio                      │
│ A living case study that grows with          │
│ the project.                                 │
│                                              │
│         ● The Sound                          │
│        /                                     │
│   ●───● The Sprint ●───● The Structure      │
│   │    \           /                         │
│   │     ● The Material ●── The System        │
│   │                    /                      │
│   ●── The Process ──●                        │
│         \                                    │
│          ○ The Lab (planned)                 │
│                                              │
│ Tags: Design Systems · AI Workflow · Meta    │
│                                              │
│ [preamble text below the fold]               │
└──────────────────────────────────────────────┘
```

- No hero image. No hero metric. The constellation is the visual.
- Title + subtitle sit above the field, within the same viewport.
- Tags sit below the field.
- The "48 hours" metric moves to The Sprint node's inscription (already done).
- The preamble text sits below the fold, discovered by scrolling or clicking a node.
- The field fills available viewport height (minus header and title).
- First-time visitors land here. Returning visitors with a hash skip to reading state.

**2. Reading state: desktop (node selected, >= 1024px)**

Split-panel layout. Constellation becomes a sticky sidebar.

```
┌──────────────────────────────────────────────┐
│ ← All Work                                  │
├────────────┬─────────────────────────────────┤
│            │                                 │
│   ●        │  ← Return to the field          │
│  / \       │                                 │
│ ●   ●      │  The Sprint                     │
│ |   |      │  Tokens to production in 48h.   │
│ ●   ●      │                                 │
│  \ /       │  [content sections...]          │
│   ●        │                                 │
│            │  [connection peeks...]           │
│ [sticky]   │                                 │
│            │  Related: Material, Structure    │
│            │                                 │
├────────────┴─────────────────────────────────┤
│ ← Back to all work                          │
└──────────────────────────────────────────────┘
```

- The field compresses to a sidebar (~280-320px).
- The sidebar is `position: sticky; top: header-height`.
- The field adapts to the portrait aspect ratio (nodes reposition within the narrower container since coordinates are 0-1 normalized).
- Connection lines stay visible. Selected node glows. Connected nodes highlight.
- Clicking a node in the sidebar switches content without scrolling back up.
- The content panel scrolls independently.
- "Return to the field" deselects and scrolls back to hero state.

**3. Reading state: mobile (node selected, < 1024px)**

Compact strip replaces the full field.

```
┌──────────────────────────────────┐
│ ← All Work                      │
├──────────────────────────────────┤
│ ●──●──●──●──●──●──●  ○         │  ← sticky strip
│    ▲ The Sprint                  │
├──────────────────────────────────┤
│                                  │
│ ← Return to the field            │
│                                  │
│ The Sprint                       │
│ Tokens to production in 48h.     │
│                                  │
│ [content sections...]            │
│                                  │
│ Related: Material, Structure     │
│                                  │
│ ← Back to all work              │
└──────────────────────────────────┘
```

- A single-row horizontal strip of node dots, sticky below the header.
- Current node is highlighted (larger dot, brass accent, label visible).
- Connected nodes show subtle highlight.
- Planned nodes show as hollow circles.
- Tapping a dot navigates to that node.
- Node order in the strip follows a logical reading order (not spatial position): Sprint > Material > Structure > Process > Craft > Sound > System > Lab.
- The strip has a subtle background matching the header surface (bg-deep/80 + backdrop-blur).
- "Return to the field" scrolls back to the hero constellation and deselects.

---

## Transitions

### Hero to reading (node click)

**Desktop:**
1. The full-viewport field compresses horizontally to sidebar width.
2. Content panel slides in from the right.
3. The transition uses CSS Grid animation (`grid-template-columns` transition) for the compression. `motion/react` for spring physics if CSS-only feels stiff.
4. Duration: ~500ms. Reduced-motion: instant layout swap.

**Mobile:**
1. The full field compresses vertically to the strip height.
2. Content fades in below.
3. Simpler transition since the strip is a different component from the field.
4. Duration: ~400ms. Reduced-motion: instant swap.

### Reading to hero (return to field)

Reverse of above. The sidebar expands back to full viewport. Content panel fades out.

### Node to node (sidebar click or peek navigation)

Content panel cross-fades. Sidebar updates highlight immediately. No layout change. Quick and responsive.

### Reduced motion

All transitions become instant opacity/visibility swaps. No spatial animation. Layout changes still happen, just without animation.

---

## Layout Architecture

### CSS Grid approach

The core layout uses a CSS Grid that transitions between states:

```css
/* Hero state */
.constellation-layout {
  display: grid;
  grid-template-columns: 1fr;
}

/* Reading state (desktop) */
.constellation-layout[data-state="reading"] {
  grid-template-columns: 280px 1fr;
  gap: 0;
}

/* Reading state (mobile) -- single column, strip is separate sticky */
@media (max-width: 1023px) {
  .constellation-layout[data-state="reading"] {
    grid-template-columns: 1fr;
  }
}
```

The grid transition is the key animation. `grid-template-columns` can be transitioned in modern browsers (Chrome 107+, Safari 16.4+, Firefox 66+). For older browsers, the layout snaps without animation.

### Component hierarchy (revised)

```
ConstellationPage
├── Hero section (title, subtitle -- always visible)
├── ConstellationLayout (manages grid state)
│   ├── ConstellationSidebar (desktop sticky sidebar)
│   │   └── ConstellationField (reused, adapts to container)
│   ├── ConstellationStrip (mobile sticky strip, new component)
│   └── ConstellationContent (reused, fills main column)
└── Footer nav
```

### New components

| Component | File | Job |
|-----------|------|-----|
| `ConstellationLayout` | `src/components/content/ConstellationLayout.tsx` | Grid container. Manages hero vs reading state. Transitions between layouts. |
| `ConstellationSidebar` | `src/components/content/ConstellationSidebar.tsx` | Sticky wrapper for the field in sidebar mode. Handles the portrait aspect ratio. Desktop only. |
| `ConstellationStrip` | `src/components/content/ConstellationStrip.tsx` | Horizontal dot strip for mobile reading state. Sticky below header. Shows current node + connections. |

### Reused components (unchanged or minimal changes)

- `ConstellationField` -- Already uses normalized coordinates, naturally adapts to any container size. No changes needed for the field itself.
- `ConstellationNode` -- Works as-is in both field and sidebar contexts.
- `ConstellationContent` -- Unchanged. Fills the content column.
- `ConnectionPeek` -- Unchanged.

### ConstellationPage changes

The page template restructures from the current vertical stack to the grid layout:

- Hero section slims down: title + subtitle + tags only. No image, no metric.
- Preamble moves inside the content area (shown when no node is selected, or as an intro before the first node's content).
- The ConstellationLayout component manages the hero/reading state transition.
- Footer stays outside the grid.

---

## Mobile Strip Design

The strip is a single horizontal row of dots representing nodes:

```
●──●──●──●──●──●──●  ○
         ▲
    The Sprint
```

### Visual design
- Each dot is 8px, with 6px connection segments between connected dots.
- Selected node: 10px, brass fill, label visible below.
- Connected nodes: 8px, brass fill at 60% opacity.
- Other shipped nodes: 8px, border only.
- Planned nodes: 6px, dashed border, 50% opacity.
- Background: `bg-deep/80 backdrop-blur-md` matching the header.
- Border-bottom matching `border-border-subtle`.
- Total strip height: ~44px (enough for dot + label).

### Node ordering

The strip uses a predefined reading order, not spatial position:
1. The Sprint (center/origin)
2. The Material
3. The Structure
4. The Process
5. The Craft
6. The Sound
7. The System
8. The Lab (planned)

This order is defined in the data model as a `readingOrder` field or derived from the node definitions array order.

### Interaction
- Tap a dot to navigate to that node.
- Current node stays centered in the strip if the strip overflows (for future scalability with many nodes).
- The strip does not scroll horizontally with 8 nodes -- they all fit. But the design should handle future growth.

---

## Sidebar Field Behavior

### Portrait adaptation

The constellation field already uses normalized 0-1 coordinates. In the sidebar (~280px wide, ~100vh tall), the field naturally maps nodes into a portrait layout. Nodes will be more vertically spread and horizontally compressed.

The layout algorithm may need a small tweak: when the container aspect ratio is portrait (height > width), the radius should adjust so nodes don't cluster at the center of a tall thin space. Options:
- Scale the radius relative to the shorter dimension (width in portrait mode).
- Or add an `aspectRatio` parameter to `buildConstellationLayout` that adjusts the y-spread.

### Interaction in sidebar

- Hovering a node highlights its connections (same as current field).
- Clicking a node updates the content panel.
- The selected node glows (same as current).
- Labels are always visible for all nodes in sidebar mode (there's enough vertical space, and hover-to-discover doesn't work well in a persistent nav).
- Connection lines are visible but thinner (0.75px default) to avoid visual clutter in the tighter space.

---

## Layer Impact

- **design-system/**: New token for strip height (`--constellation-strip-height`). Sidebar width token (`--constellation-sidebar-width`).
- **core/**: Add `readingOrder` to constellation data or derive from array order. Possible `aspectRatio` parameter for layout algorithm.
- **services/**: None.
- **src/**: New components (ConstellationLayout, ConstellationSidebar, ConstellationStrip). Restructure ConstellationPage template. ConstellationField gets minor responsive tweaks.

---

## Implementation Steps

Follow architecture order: tokens > core > UI.

1. **Tokens**: Add `--constellation-strip-height`, `--constellation-sidebar-width` to `tokens.css`.
2. **Core**: Add aspect-aware layout option to `buildConstellationLayout`. Define reading order.
3. **ConstellationStrip**: Build the mobile strip component. Sticky positioning, dot rendering, tap navigation.
4. **ConstellationSidebar**: Build the desktop sidebar wrapper. Sticky positioning, portrait field container.
5. **ConstellationLayout**: Build the grid container managing hero/reading states and the CSS Grid transition.
6. **ConstellationPage**: Restructure the page template. Slim the hero. Move preamble. Wire the new layout.
7. **Transitions**: CSS Grid column animation (desktop), fade transitions (mobile). Reduced-motion handling.
8. **Polish**: Test both themes, both breakpoints, keyboard nav, screen reader flow.

---

## Accessibility Requirements

- The sidebar field must remain keyboard navigable (Tab through nodes).
- The mobile strip must have `role="navigation"` and node buttons with clear labels.
- The layout state change (hero to reading) must be communicated to screen readers (aria-live or focus management).
- The strip should not trap focus -- Tab should move through strip nodes then into content.
- Sticky elements (sidebar, strip) must not obscure content on zoom or text scaling.
- Grid transition respects `prefers-reduced-motion`.

---

## Resolved Questions

1. **Sidebar width**: 320px default, resizable down to 280px. Use CSS `min-width: 280px; width: 320px` or a resize handle if we want user control.
2. **Preamble placement**: Preamble shows in the content panel as the empty state when no node is selected. Once a node is clicked, preamble is replaced by node content. Returning to the field (hero state) with no node selected shows the preamble again. The preamble is the welcome mat, not the wallpaper.
3. **Strip on tablet (768-1023px)**: Strip for everything under 1024px. One breakpoint, one mobile pattern.
4. **Grid animation browser support**: Instant layout change as fallback. No polyfill.

---

## Pitch-Worthy Aspects

- **The navigation IS the artifact.** The constellation doesn't just navigate content -- it demonstrates information architecture, spatial design, and interaction design thinking in a single component. Hiring managers see the portfolio's structure as a design decision, not just a container.
- **Persistent spatial context.** The reader always knows where they are in the network. This is a UX pattern worth talking about in interviews: "I built a spatial navigation system that maintains context across content transitions."
- **Three-state responsive adaptation.** Hero > sidebar > strip shows thoughtful progressive enhancement. The same data model powers all three views without duplication.
- **Living system metaphor.** New nodes appear as new stars. The constellation grows with Justin's career. The sidebar makes this feel like a real-time map, not a static diagram.

---

## Risks

- **Sidebar vertical space**: In a portrait orientation, 8 nodes might cluster tightly. The layout algorithm needs to handle this gracefully. Mitigation: test with the current 8 nodes and verify spacing.
- **Grid animation performance**: Animating `grid-template-columns` reflows the layout. On low-end devices this could jank. Mitigation: use `will-change: grid-template-columns` and test. Fallback: instant snap.
- **Content scroll position**: When switching nodes in sidebar mode, the content panel should scroll to top. If it doesn't, the reader sees the middle of the previous node's content. Mitigation: explicit `scrollTo(0)` on node change.
- **Sticky z-index stacking**: Header is z-50, sidebar needs to sit below it. Strip needs to sit below header but above content. Verify stacking context with existing grain overlay and glow effects.
