## The System

A design system is not a component library. It's a set of decisions that compound. Every token, every constraint, every naming convention is a decision that makes the next thousand decisions easier or harder. This system was built to make the hard decisions once and let everything else follow.

The foundation is 21 OKLCH color tokens in a single CSS file. Every color in the UI traces back to `design-system/tokens.css`. No default Tailwind palette, no raw hex values, no exceptions. That's not a preference. It's a constraint that makes theme changes trivial and accessibility verification structural. Want to check contrast? Compare L-channel values. Want a new theme? Adjust the L channel. The math does the work.

The three-font system is similarly constrained. Podkova for display headings, a serif with personality, used sparingly. Space Grotesk for section heads, navigation, and metadata. Didact Gothic for body copy at weight 400 only. No bold, no italic, just clear and warm. Adding a font or a weight requires a conscious decision, not a lazy reach for variety.

::: peek the-material
The OKLCH migration turned the color system from a bag of magic numbers into a system you can reason about.
:::

Beyond color and type, every visual decision has a token. Spacing on a 4px base. Shadows from sm through xl with brass and magenta glow variants. Border radii constrained to six values. The textures (circuit mesh in dark mode, linen-over-wood in light) live in the token layer as CSS custom properties. Zero external assets. The system owns every surface.

::: callout What The System Enables
When the design pipeline runs an audit, it checks against these tokens. When the Builder implements a feature, it reaches for token classes, not raw values. When light mode was crafted, only the token layer changed. Zero component modifications. The system protects craft at scale.
:::

The design context formalization was the capstone. The aesthetic direction, the wabi-sabi sensibility, the anti-references (no template portfolios, no dev-bro dark mode, no agency scroll-jacking), and the five design principles. All written down so every agent reads from the same brief. The system is not just tokens and components. It's the documented intent behind every visual decision.

::: peek the-craft
The system enables craft. The craft validates the system. They are the same loop.
:::
