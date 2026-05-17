## Design Context

### Users

Hiring managers, design leads, and potential collaborators evaluating Justin's design and technical capabilities. They scan portfolios quickly, judge craft quality within seconds, and look for evidence of systematic thinking alongside visual polish. The portfolio must earn trust through its own construction -- every detail is evidence.

### Brand Personality

**Crafted, atmospheric, confident.**

Voice is direct, warm, and witty -- like a skilled friend who builds amazing things. No hedging, no filler. Strong opinions stated plainly. The portfolio speaks through its materials and details, not through self-promotion.

**Emotional goals:** Within 5 seconds, visitors should feel respect ("this person knows what they're doing") and trust through craft recognition ("the details here tell me this person cares about quality at every level"). Curiosity follows -- they want to see more.

### Aesthetic Direction

**Visual tone:** "Blade Runner + William Gibson meets Finn Juhl" -- sci-fi atmosphere grounded in mid-century material honesty. Wabi-sabi sensibility: natural materials juxtaposed with effortless technology. Imperfection as authenticity. Warmth in darkness.

**Theme:** Dark mode primary. Warm blacks (never cold), aged brass and dusty magenta as dual accents. Light mode is warm parchment and linen -- Wallace's office before the blackout. Both modes use OKLCH color space with neutrals tinted toward the brand hue.

**References:** Danish mid-century furniture craft (Finn Juhl, Hans Wegner). Blade Runner / BR2049 production design. William Gibson's sense of lived-in technology. Wabi-sabi -- the beauty of imperfection, natural patina, honest wear.

**Anti-references (hard no):**

- Minimal template portfolios: white-space-heavy, Squarespace energy, no personality
- Dev-bro dark mode: neon gradients, terminal fonts, GitHub-profile-as-portfolio
- Agency showcase sites: parallax scroll-jacking, cinematic transitions, no substance
- Any design that could be mistaken for AI-generated default output

### Design Principles

1. **Materials over decoration.** Every visual element should feel like a real material -- brass, linen, warm glass, aged paper. No purely decorative flourishes. If it doesn't reinforce the material metaphor, remove it.
2. **Earned confidence.** The portfolio earns trust by doing, not claiming. Quality signals are in the craft details -- transitions, spacing, contrast, accessibility -- not in big hero statements about being a "visionary designer."
3. **Atmospheric depth.** Surfaces have texture, light behaves physically, space has temperature. The interface should feel like a place you're in, not a page you're reading.
4. **Intentional restraint.** Accents work because they're rare. Motion works because most things are still. Complexity is reserved for moments that earn it.
5. **Wabi-sabi craft.** Perfection is not the goal -- honest, considered work is. The grain texture, the warm-tinted blacks, the slightly imperfect material references all signal a human hand behind the technology.

---

## Perihelion Design Context

Perihelion at `labs.justinh.design` is a sibling surface to the portfolio, not a copy. Same hand, same standards, distinct register. The portfolio invites trust through craft signals. Perihelion invites curiosity into frontier science.

### Users (Perihelion)

Two audiences, held simultaneously:

1. **Designers who haven't yet considered frontier science.** People with strong design instincts and no physics background. No permission to think seriously about consciousness, vacuum engineering, or UAP detection. The lab exists to give them that permission.
2. **Justin himself.** The lab is also how he learns the territory. The design must serve a learner who is already serious about the material.

Adjacent audience: a scholarly community (Sol Foundation, Visible College, Hyperstition) whose work the lab cites. The lab does not address them as primary readers, but it must not embarrass itself in front of them.

### Brand Personality (Perihelion)

**Scholarly-adjacent. Warm, serious, quietly witty.** Reads like a reader's notebook from someone who takes both the science and the design seriously. Inviting, inspiring, exciting, and a place to learn. More measured than the portfolio's voice, with the same warmth underneath.

**Content posture vs. design posture.** The content carries a deliberate epistemic humility: "reader's notebook, prep not product." The writing acknowledges Justin is learning alongside the reader. The design does not share that humility. The design is product-grade craft, quiet and confident, holding the content with care.

**Mission test (load-bearing):** Every decision is checked against the question, *does this open the door for a designer who has never considered frontier science, or does this gatekeep?* This rules out copy that demands credentials, design moments that read as inside-baseball, and any move that elevates the lab over the reader.

### Aesthetic Direction (Perihelion)

**Visual tone:** Dark academic. Warm darkness, off-white paper for figures, per-guide accent system. Sibling to the portfolio's "Blade Runner + Gibson meets Finn Juhl" register, but quieter, more contemplative, less cinematic. Where the portfolio is a specific evening, the lab is the morning after.

**Theme:** Dark mode primary. Light mode planned but deferred to Workstream C. When it lands, expect warm cream paper and warm ink, not parchment and linen.

**Three-font lab stack (per ADR-009):** Podkova for headings (shared with portfolio), Georgia for body (a serif that signals long-form reading), JetBrains Mono for kickers and labels (epistemic honesty). The portfolio's stack is not used here.

**Per-guide accents:** Each guide carries a single accent color flowing through the surface via `--guide-accent`, tied to the guide's territory (T1 purple, T3 rose, T4 signal-green) and validated for WCAG contrast on the dark base.

### Anti-references (Perihelion hard no)

- Obscure-as-flex naming (Wunderkammer, Syzygy, Orrery) that rewards credentials over curiosity
- SaaS hero sections: stacked CTAs, "trusted by" logos, wave dividers, sign-up gradients
- Conventional "inspiring landing page" tropes: rotating taglines, parallax astronauts, generic "the future is here" hero copy
- Cold academic gatekeeping: copy that demands credentials or assumes prior reading
- Design moments that compete with the content for attention
- Design moments that announce themselves as design

### Design Principles (Perihelion)

These layer on top of the portfolio's five. They do not replace them.

1. **Open the door, never gatekeep.** The mission test, made operational. Every copy decision, every design moment, every interaction is checked against whether it invites a designer-without-physics-background in or pushes them out. When in doubt, invite.

2. **Subliminal craft.** The design is the plate; the content is the meal. A seasoned designer set the table. Visitors feel the touch without seeing the hand. A well-set table serves the meal. It does not compete with it.

3. **Wonder, in moments.** Shaders, motion, and small surprises are woven through the surface, never loud, never spectacle. Each moment of delight should amplify the awe the content is already generating. A warp drive guide can earn a moment that feels like motion through space. A consciousness piece can earn a moment that feels like attention itself. Visitors leave feeling inspired without being able to name why.

4. **Reader's notebook, prep not product.** The content posture, distinct from the design posture (which is product-grade). The writing acknowledges learning-in-progress. The design holds that honestly without feeling unfinished.

5. **Sibling, not copy.** Perihelion shares the portfolio's hand and standards but not its voice. Decisions that work for the portfolio do not automatically work for the lab. Each surface earns its own moves.

