## Design Context

register: brand

### Users

Hiring managers, design leads, and potential collaborators evaluating Justin's design and technical capabilities. They scan portfolios quickly, judge craft quality within seconds, and look for evidence of systematic thinking alongside visual polish. The portfolio must earn trust through its own construction -- every detail is evidence.

### Brand Personality

**Crafted, atmospheric, confident.**

Voice is direct, warm, and witty -- like a skilled friend who builds amazing things. No hedging, no filler. Strong opinions stated plainly. The portfolio speaks through its materials and details, not through self-promotion.

**Emotional goals:** Within 5 seconds, visitors should feel respect ("this person knows what they're doing") and trust through craft recognition ("the details here tell me this person cares about quality at every level"). Curiosity follows -- they want to see more.

### Aesthetic Direction

**Visual tone:** "Blade Runner + William Gibson meets Finn Juhl, composed like a Pentagram monograph." Sci-fi atmosphere grounded in mid-century material honesty, executed with editorial discipline. Wabi-sabi sensibility: natural materials juxtaposed with effortless technology. The portfolio reads as an authored object -- a designer's monograph that happened to ship as a website -- not as a templated portfolio in dark mode. Imperfection as authenticity. Warmth in darkness. Boldness over blandness.

**Theme:** Dark mode primary. Warm blacks (never cold), aged brass and dusty magenta as dual accents. Light mode is warm parchment and linen -- Wallace's office before the blackout. Both modes use OKLCH color space with neutrals tinted toward the brand hue.

**Typographic system:** Three-face stack with full expressive range. The prior "Didact Gothic 400 only" constraint is superseded for the portfolio surface.

- **Display serif** for h1, h2, section openers, and hero moments. Editorial gravity, variable axes used intentionally. Candidates to validate live: GT Sectra, PP Editorial New, Tiempos Headline, Söhne Schmal, F37 Ginger Serif. Should feel *set*, not typed.
- **Body sans** for long-form prose, UI, and navigation. Personality across weights. Candidates: Söhne, GT America, ABC Diatype, PP Neue Montreal. Replaces Didact Gothic as the body voice. Didact may survive as a specific kicker/label voice if it earns it.
- **Mono kicker** for metadata, labels, captions, project numbering. Candidates: JetBrains Mono, Berkeley Mono, ABC Diatype Mono. Carries the epistemic-honesty voice.

Variable axes (weight, optical size, grade) are used for *fit*, not animation. Drop caps allowed on long-form essays and case studies, not on home cards. Pull quotes allowed sparingly with intentional kerning. Tabular numerals for metadata, proportional for prose. Body line length capped at 65–75ch.

**Composition:** Editorial spreads, bookish. Each surface is composed individually, not poured into a template grid. Variable column structures per page. Generous outside margins on long-form; kickers and metadata can live in those margins. Vertical rhythm varies per section. The grid is visible enough that breaks read composed, not accidental. Refuse the "every section is a 1200px max-width container" reflex. Canonical case study opener pattern: full-bleed cover panel left (50%, atmospheric Committed accent) + editorial type spread right (50%, kicker / chapter indicator / headline / body / pull quote / metadata footer). Canonical work index pattern: monograph table of contents with varying Fraunces scale by recency, brass numerals on left, year + accent swatch on right; not a card grid.

**Material posture:** Moderate. Hand at the seams, not painted on walls. Per-project bespoke marks (each case study earns its own ornament or chapter-opener treatment, signaling identity within the monograph). Textural moments at specific anchors only (hero, case-study covers, footer); never blanket, never glassmorphism-default. Light behaves physically: warm light, subsurface scattering on accents, brass refraction on hover for select moments. Color stays Restrained on most pages (≤10% accent coverage); case study covers go *Committed* with a single project-tied accent owning 30–60% of the cover. **Atmospheric, never flat.** Cover surfaces must use radial light, vertical gradient, grain overlay, or layered shader-feel treatments — never solid color panels (reads as Rosenfeld Media book series, rejected in Round 4 of the recalibration). The per-project accent system is currently magenta / brass / forest / oxblood; expand per project as the monograph grows.

**Motion:** Restrained but expressive, explicitly not bland. Ease-out exponential curves, no bounce, no elastic. Motion serves *arrival* and *focus*. Permitted: slow warm fades on section reveal, weight-shift on hover (variable axis play), subtle parallax on case study covers, deliberate page-transition choreography on case study entry. One ambitious motion moment per major surface, no more.

**References:** Danish mid-century furniture craft (Finn Juhl, Hans Wegner). Blade Runner / BR2049 production design. William Gibson's sense of lived-in technology. Wabi-sabi -- the beauty of imperfection, natural patina, honest wear. Editorial / craftsperson lane: Pentagram monograph pages, Bibliothèque, Build, Frank Chimero's long-form essays, Mark Boulton's compositional rigor, Apartamento and Real Review editorial spreads.

**Anti-references (hard no):**

- Minimal template portfolios: white-space-heavy, Squarespace energy, no personality
- Dev-bro dark mode: neon gradients, terminal fonts, GitHub-profile-as-portfolio
- Agency showcase sites: parallax scroll-jacking, cinematic transitions, no substance
- Twee / Tumblr-zine craftsperson: hand-drawn underlines, hand-lettered wordmark, precious illustrated icons, marginalia-as-personality
- Designer-as-influencer / performative motion: beat-synced micro-interactions, look-at-me transitions, scroll-jacking
- Quiet to the point of bland: restraint as alibi for indistinction; reads as "every other thoughtful-portfolio template"
- Any design that could be mistaken for AI-generated default output

### Design Principles

1. **Materials over decoration.** Every visual element should feel like a real material -- brass, linen, warm glass, aged paper. No purely decorative flourishes. If it doesn't reinforce the material metaphor, remove it.
2. **Earned confidence.** The portfolio earns trust by doing, not claiming. Quality signals are in the craft details -- transitions, spacing, contrast, accessibility -- not in big hero statements about being a "visionary designer."
3. **Atmospheric depth.** Surfaces have texture, light behaves physically, space has temperature. The interface should feel like a place you're in, not a page you're reading.
4. **Intentional restraint, refused blandness.** Accents work because they're rare. Motion works because most things are still. Complexity is reserved for moments that earn it. But restraint is never an alibi for blandness; every surface must distinguish itself or it has failed.
5. **Wabi-sabi craft.** Perfection is not the goal -- honest, considered work is. The grain texture, the warm-tinted blacks, the slightly imperfect material references all signal a human hand behind the technology -- expressed through composition and material, not through literal artisan tropes.
6. **Editorial composition.** The portfolio is composed like a monograph, not poured into a template. Surfaces use the column structures they deserve, margins do work, vertical rhythm varies per section. Each piece earns its own moves within a coherent meta-system.

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

