# Work Pitch Notes

> Spun off from post-launch-plan.md (2026-03-05). This content relates to Justin's internal team presentation on AI-augmented design workflows. Maintained separately so it can sync with work machine/Claude instance.

---

## What Justin walks in with

- A live portfolio site built on a real token-driven component system
- 100 mobile accessibility Lighthouse score with AI-generated components
- A documented workflow: token definition -> AI code generation -> component library -> deploy
- A friction log showing exactly where AI helps and where human judgment is essential
- The meta case study as a shareable, referenceable artifact
- A completed OKLCH migration and light/dark theme toggle

## Key points for the pitch

- **Christopher's constraint model validated:** The token system IS the constraint.
- **Clinton's concern addressed:** Works even without a fully mature existing design system.
- **A11y as a standard, not an afterthought:** Token system enforces contrast ratios by design.
- **The pipeline works end-to-end:** Figma (design) -> tokens (source of truth) -> AI generation (Cursor) -> code (Vite) -> deploy.

## Pitch-worthy items

- OKLCH L-channel theming shipped -- light and dark palettes are mathematically related via perceptually uniform color space
- Zero-dependency theme system -- React context + cookie + inline script, ~150 lines of purpose-built code
- Filament toggle icon -- custom sci-fi-inspired incandescent filament icon
- Anti-FOWT pattern -- inline script prevents flash of wrong theme on page load
- OKLCH color space migration shipped -- entire color system migrated from hex/rgba to OKLCH
- Meta case study shipped -- full "Building This Portfolio" case study live
- CalloutSection pattern -- new content block type shows the component model is extensible
- Agent skills as cross-tool infrastructure -- skills usable across Claude Code, Cursor, and Codex
- Token-driven a11y by default -- contrast ratios, heading hierarchy, focus rings
- Vite migration -- moved from Next.js App Router to Vite + React Router for faster builds and simpler deployment
