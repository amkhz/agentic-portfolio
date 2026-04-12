## The Craft

A portfolio that claims to value quality has to prove it. Not with words. With observable, measurable craft decisions.

The systematic audit came after weeks of building. Using the Impeccable design pipeline, we ran /audit across all 31 components and found 13 issues: 1 critical, 3 high, 5 medium, 4 low. The critical issue was a missing focus-visible style on a nav link. The high issues were contrast failures in the light mode palette that had not been tuned yet. Every issue got a severity, a location, and a fix.

The light mode itself was a craft project. Dark mode was the primary experience: warm blacks, brass and magenta accents, a circuit mesh texture that hums under the surface. Light mode could not just be "invert the colors." It needed its own material identity. The answer was Niander Wallace's office from Blade Runner 2049: warm parchment, natural linen, amber light. A translucent linen texture draped over aged wood grain, both built from pure CSS gradients. The materials are different, but the design language is the same.

Accessibility was never an afterthought. WCAG 2.2 AA compliance runs through every decision: heading hierarchy (one h1 per page, h2 to h3 in order, no skipped levels), focus rings on every interactive element, touch targets at 44px minimum, prefers-reduced-motion respected throughout, ARIA labels on icon-only buttons. The Lighthouse accessibility score targets 95+. But numbers are the floor, not the ceiling. The real accessibility work is in the judgment calls: making sure reading order makes sense, that nothing meaningful is conveyed through color alone, that the decorative effects (particles, glows, grain) never interfere with content.

::: peek the-material
The OKLCH color system makes accessibility verification structural, not subjective.
:::

The five design principles were the last thing formalized, but they guided everything from the start. Materials over decoration. Earned confidence. Atmospheric depth. Intentional restraint. Wabi-sabi craft. Each principle is a filter: when we evaluate whether a design decision is right, it has to pass through all five. A glow effect is not just "does it look cool." It is "does it reinforce the material metaphor, does it earn its presence, does it add atmospheric depth without breaking restraint?"

The portfolio is the proof. Every token, every component, every case study section went through a process with human judgment at the helm and specialized agents doing the heavy lifting within their lanes. The result is a codebase that runs clean, a design system that is internally consistent, and a body of work that shows the thinking, not just the output.

::: peek the-process
The agents that built this work within the same craft constraints that define it.
:::
