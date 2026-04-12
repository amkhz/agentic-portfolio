# ADR-006: Systematic audit and polish pass using Impeccable skill pipeline

**Date:** 2026-04-11
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (Builder)

## Context

The portfolio had shipped iteratively over several weeks: music integration, animation layer, meta case study chapters, framework updates. Each feature passed lint and build gates, but no comprehensive cross-cutting quality review had been performed. Accumulated issues -- broken token references, inconsistent focus styles, flat page composition, heading hierarchy bugs, missing reduced-motion handling -- were invisible to per-feature quality gates.

The question: how should we systematically identify and resolve quality issues across the entire shipped codebase?

## Decision Drivers

- **WCAG 2.2 AA compliance** -- VECTOR.md hard constraint, non-negotiable
- **"Every detail signals rigor"** -- VECTOR.md core value proposition means invisible bugs undermine the portfolio's thesis
- **30-second scan** -- hiring managers judge craft quality within seconds (VECTOR.md target audience)
- **Four-layer architecture** -- fixes must respect layer boundaries (design-system > core > services > src)
- **Lint and build must pass** -- VECTOR.md quality gate, enforced after every change

## Options Considered

### Option A: Ad-hoc fixing as issues are noticed

Fix bugs when they surface during development or user testing.

**Pros:**
- No dedicated time investment
- Issues fixed in context of active work

**Cons:**
- Systemic patterns (e.g., all focus styles inconsistent) never surface
- Cross-cutting concerns (a11y, performance, theming) fall through per-feature gates
- Quality debt compounds invisibly

### Option B: Structured audit/critique pipeline using Impeccable skills

Run `/audit` (technical sweep: a11y, performance, theming, responsive, anti-patterns) followed by `/critique` (design evaluation: hierarchy, composition, emotional resonance, typography), then fix by priority.

**Pros:**
- Systematic -- checks every dimension, not just what's top of mind
- Prioritized -- severity ratings (C/H/M/L) create a clear fix order
- Repeatable -- can run again after major changes to catch regressions
- Documents findings -- the audit report serves as a quality baseline

**Cons:**
- Time investment (~2 hours for full audit + critique + fixes)
- Requires reading the entire codebase before starting

### Option C: Automated tooling only (Lighthouse, axe, etc.)

Run automated accessibility and performance scanners.

**Pros:**
- Fast, repeatable
- Catches mechanical issues (contrast ratios, missing alt text)

**Cons:**
- Cannot evaluate composition, pacing, emotional resonance, or design intent
- Misses architectural issues (broken token references that resolve to transparent)
- Cannot assess whether light mode feels "equally crafted" as dark mode

## Decision

**We will use structured audit/critique pipeline (Option B) as a recurring quality practice.**

The first pass on 2026-04-11 identified 13 issues across 31 components (1 critical, 3 high, 5 medium, 4 low). All 13 were resolved in three commits. The critique identified 5 priority design issues and multiple minor observations. All priority items were addressed.

The pipeline runs as: `/audit` (document issues) > `/critique` (evaluate design) > prioritized fix pass > second `/audit` + `/critique` to verify.

## Findings and Resolutions (First Pass)

### Accessibility
- **C1:** Broken `accent-secondary` token in CalloutBlock -- fixed to `secondary-primary`
- **H1:** Case study headings (chapters 2-7 all h3) -- fixed to all h2 peers
- **H3:** Button component missing `target="_blank"` on external links -- added detection
- **M2:** TextBlock inline links used `:focus` not `:focus-visible` -- fixed
- **M4:** RevealOnScroll started content invisible for reduced-motion users -- now skips hidden state entirely
- **L2:** NowPlaying profile link touch target 28px -- bumped to 44px minimum
- **L4:** No `aria-current="page"` on nav -- switched to NavLink

### Performance
- **M1:** Global `*` transition selector -- scoped to semantic HTML elements
- **M3:** Fast-refresh warnings from co-exported hooks/utils -- extracted `parseInline` to core/utils, `useTheme` to src/lib
- **H2:** No route-level code splitting (464KB bundle) -- deferred, documented

### Design/Composition
- Home page composition overhauled: featured meta case study card, "View all" link, atmospheric accent break
- Work page: hero-scale meta card with images, 3-column grid below
- Case study pacing: chapter break separators, images break wider, metrics get background band
- Footer: full nav, brass accent line, colophon with personality
- Typeset: TextBlock bumped to sm:text-lg, paragraph spacing increased, CalloutBlock and QuoteBlock given more visual weight

### Theming
- Light mode overhauled: warm parchment surfaces (H=55-66), wood grain + linen CSS texture, multiply-blended grain, physical shadows
- Dark mode: circuit mesh texture added (see ADR-005)
- Button press feedback bumped from scale-97 to scale-95
- Canonical URLs made absolute across all pages

## Consequences

**Positive:**
- Lint passes with 0 errors, 0 warnings (previously 2 warnings)
- All WCAG 2.2 AA issues identified and resolved
- Both theme modes now have intentional texture and material quality
- Home and Work pages have clear content hierarchy with the meta case study featured
- The audit/critique pattern is now a documented, repeatable practice

**Negative:**
- The audit pass consumed a full session -- significant time investment
- Some critique items are taste-level and may need further iteration (e.g., home page card grid variation, atmospheric break visibility)
- The 464KB bundle (H2) remains unaddressed -- code splitting is deferred to a future session

**Neutral:**
- The resume loading skeleton uses `animate-pulse` which adds a small amount of CSS animation cost during the brief loading state
- The `--texture-linen` token name applies to both modes despite holding different texture types (linen in light, circuit mesh in dark)

## Related Decisions

- `ADR-005: CSS texture system` -- the texture work was a direct output of the audit/critique identifying light mode as "an afterthought"
- `ADR-003: React Bits adoption` -- animation components (RevealOnScroll, SpotlightCard) were evaluated during the audit for reduced-motion compliance
