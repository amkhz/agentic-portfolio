# Accessibility

**This is not optional.** Motion can cause discomfort, nausea, or distraction for many users.

---

## Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**What this does**: Effectively disables animations while preserving final states (so layouts don't break).

---

## Functional vs. Decorative Motion

| Type | Purpose | Reduced Motion Behavior |
|------|---------|------------------------|
| **Functional** | Indicates state changes, spatial relationships, orientation | May need alternative (instant state change, no transition) |
| **Decorative** | Pure delight, visual interest | Can be fully removed |

**The test**: Does removing this animation break the user's ability to understand what happened? If yes, it's functional.

---

## Motion Sensitivity Considerations

- Avoid large-scale motion (full-screen transitions, parallax)
- Avoid continuous or looping animations that can't be paused
- Provide pause controls for any ambient animation
- Be especially careful with vestibular triggers: zooming, spinning, parallax

---

## Implementation Checklist

- [ ] Tested with `prefers-reduced-motion: reduce` enabled
- [ ] No vestibular triggers (excessive zoom, spin, parallax)
- [ ] Looping animations can be paused
- [ ] Functional animations have non-motion alternatives
- [ ] Users can complete all tasks with animations disabled

---

## House pattern (agentic-portfolio)

This repo already ships the reduced-motion posture — match it, don't reinvent:
- **Global CSS** — `@media (prefers-reduced-motion: reduce)` zeroes `transition-duration` / `animation-duration` and caps iteration to 1 (`src/styles/globals.css`).
- **JS-driven effects** — render the final or still state when reduced motion is on, via one of two house patterns: the reactive `useReducedMotion()` hook (PageTransition, ParallaxImage in `src/components/effects/`; PerihelionMark in `src/lab/components/`, PerihelionSigil in `src/lab/components/library/` — the sigil freezes to static positions) or a one-time query check on mount (RevealOnScroll, DecryptedText). Prefer the hook for new work; it tracks preference changes live.
- **Doctrine** (`DESIGN.md`) — "the ambitious moments degrade to instant or to a still state."
