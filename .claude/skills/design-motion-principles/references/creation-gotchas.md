# Creation Gotchas

Where Claude typically fails when **writing** motion (as opposed to auditing it). Self-check generated code against every item before presenting.

---

## Motion that shouldn't exist

- **Don't animate just because you can.** Decorative motion added "for polish" is the default failure mode. Every animation needs a purpose — feedback, orientation, or continuity. If you can't name the purpose, remove it.
- **Don't animate high-frequency interactions.** If the user triggers it dozens of times a session, motion becomes friction. Instant is correct.
- **Don't animate keyboard-initiated actions.** Keyboard shortcuts should never animate — the user wants speed, not a show.
- **Don't add looping attention-seeking motion.** No pulsing dots, glowing status rings, breathing CTAs, throbbing indicators, or any looped scale/opacity pulse to draw the eye. They age badly, harm accessibility, and rarely serve the user. Use a static treatment unless the user explicitly asks for a pulse.

## Wrong defaults

- **Don't start from `scale(0)`.** It produces unnatural motion. Start from `scale(0.9)` or higher.
- **Don't use bare `ease` or `ease-in-out`.** Built-in curves lack strength. Use a custom `cubic-bezier` or a spring.
- **Don't give enter and exit equal weight.** Exits should be subtler — smaller translate, the user's attention is already moving on.
- **Don't use one duration for everything.** Smaller elements animate faster. Match duration to element size and context.
- **Don't ignore `transform-origin`.** Dropdowns, popovers, and tooltips should expand from their trigger, not from center.

## Performance failures

- **Don't animate layout properties.** `width`, `height`, `top`, `left`, `margin`, `padding` trigger reflow. Use `transform` and `opacity`.
- **Don't sprinkle `will-change` everywhere.** It's a targeted hint for elements about to animate, not a global fix.
- **Don't use keyframes for interruptible animations.** Keyframes can't retarget mid-flight. Use state-driven CSS transitions for anything the user can re-trigger rapidly.

## Accessibility omissions

- **Don't ship motion without `prefers-reduced-motion`.** Every animation you generate needs a reduced-motion path. This is not optional and not a follow-up — include it in the same code.
- **Don't use vestibular triggers casually.** Large-scale zoom, spin, and parallax can cause genuine discomfort. Avoid unless the design explicitly calls for it, and gate them behind reduced-motion.

## Context blindness

- **Don't apply one designer's rules universally.** Emil's sub-300ms restraint is wrong for a kids' app; Jhey's elastic playfulness is wrong for a banking dashboard. Confirm the weighting before generating.
- **Don't ignore the existing codebase.** If the project already animates with 500ms springs, a new 150ms ease-out component will feel foreign. Match established conventions unless they are the thing being fixed.

## Portfolio-specific (this repo)

- **Don't invent durations or beziers in the Portfolio zone.** Use the tokens in `motion-cookbook.md` §0 (`--ease-settle`, `--ease-organic`, `--ease-spring`, `--duration-reveal`, …). A fresh `cubic-bezier()` or a bare ms value is the tell you skipped the system.
- **Don't overshoot on arrival.** Section reveals / page transitions / parallax are critically damped (`bounce: 0`). Small overshoot is allowed ONLY on hover/focus/tap.
- **Don't reach for glow.** No accent glow, glowing borders, or glow-pulse on interactive elements — interaction is brass weight-shift + ink. The one exception: slow ambient "glow-from-within" on tech-in-material accents (a material treatment, not interaction feedback).
- **Don't stack ambitious motion.** One ambitious motion moment per major surface, max. Most things stay still.
- **Match the house reduced-motion pattern.** Reuse the `effects/` approach (global CSS zeroing + JS mount-check → still state); don't hand-roll a new guard.
- **Lab zone is exempt.** In `src/lab/**` / Perihelion / spikes these relax — that's the creative-license lane. Confirm the zone before applying portfolio rules.
