# Feature: Skill Refresh Initiative

## Summary

Four workstreams to evolve the agent crew: (1) slim and sharpen the core four skills, (2) build Roy -- a post-build reviewer triggered by hook, (3) add an Investiture health check to Director, and (4) create a voice calibration skill for Writer.

## Context

The core four skills (Builder, Director, Dreamer, Writer) in `.agents/skills/` haven't been updated since early March. Justin's agent-directing approach has evolved significantly. The skills work, but they have two structural problems: they duplicate doctrine instead of referencing it, and they don't know about Impeccable or Investiture skills -- so those powerful tools sit unused.

Meanwhile, there's a gap in the crew: after Builder ships, nobody systematically reviews the output. And Writer captures content structure well but lacks a calibrated model of Justin's actual writing voice.

---

## Workstream 1: Slim and Sharpen the Core Four

### The problem

The custom skills are bloated with doctrine repetition. Every skill restates the four-layer architecture, the aesthetic direction, the quality gates, and the standup format. That's ~80 lines of redundancy. Investiture skills don't do this -- they read doctrine at runtime and trust it to be there.

Worse, none of the four skills mention Impeccable skills at all. Builder doesn't know to call `/audit` or `/polish`. Dreamer doesn't reference `/shape`. Director doesn't use `/critique` for quality assessment. The tools exist but the crew doesn't reach for them.

### What changes

**A. Strip doctrine duplication**
- Replace repeated doctrine content with references: "Read ARCHITECTURE.md. Follow it."
- Compress layer permissions to one-line statements: "Read all layers. Write to plans/ and vector/."
- Remove restated quality gates -- reference VECTOR.md's Definition of Done instead
- Remove duplicated aesthetic direction -- reference VECTOR.md Design Principles
- Keep the standup format (it's small and each skill genuinely needs it inline)

**B. Add Impeccable integration points**

| Skill | Impeccable skills to reference | When |
|-------|-------------------------------|------|
| **Builder** | `/shape` (before design-heavy work), `/audit` (before shipping), `/polish` (finishing pass), `/animate` (after layout), `/harden` (before release) | During and after implementation |
| **Director** | `/audit` (quality gate verification), `/critique` (design assessment) | During status checks and before approving merges |
| **Dreamer** | `/shape` (during planning), `/critique` (assess what exists before proposing changes) | During exploration and plan creation |
| **Writer** | `/clarify` (UX copy refinement) | During content creation |

**C. Add Investiture awareness**
- Each skill should know when to suggest relevant invest-* skills
- Dreamer suggests `invest-adr` when a plan affects architecture
- Director suggests `invest-doctrine` or `invest-architecture` when drift is suspected
- Builder references `invest-architecture` categories to self-check during implementation

**D. Voice and mode tuning**
- Review multi-mode defaults against actual usage
- Remove boilerplate Justin consistently skips
- Tighten interaction patterns to match current directing style

### Approach

For each skill:
1. Read the current `.agents/skills/` version
2. Identify doctrine duplication -- mark for removal or compression
3. Add Impeccable and Investiture integration points
4. Tighten voice and mode sections
5. Justin reviews before changes land

### Target outcome
- Each skill ~30% shorter (remove ~80 lines of doctrine repetition total)
- Every skill knows which Impeccable tools to reach for and when
- Every skill knows which Investiture tools to suggest and when
- Cleaner, faster to read, less drift-prone

---

## Workstream 2: Roy (Post-Build Reviewer)

### Named for

Roy Batty, Nexus-6. The one who saw things you people wouldn't believe. His job is to look at what just shipped and tell you what he sees.

### The gap

| Existing tool | What it checks | Scope |
|---------------|---------------|-------|
| `invest-architecture` | Layer violations, imports, tokens, naming, file size | Whole project audit |
| `invest-doctrine` | Doctrine file completeness, consistency, drift | Doctrine files only |
| `npm run lint` + `npm run build` | ESLint, TypeScript, Vite build | Code correctness |
| Impeccable `/audit` | Accessibility, performance, theming, responsive | Design quality |
| Impeccable `/critique` | UX heuristics, anti-patterns, persona fit | Design effectiveness |

**What's missing:** A focused review of *recent changes* against the full quality surface in a single pass. Not a deep project audit -- a code review by a crew member who knows the doctrine.

### What Roy does

**Input:** A set of changed files (from git diff, a file list, or "review what Builder just did")

**Review checklist:**

1. **Architecture compliance** -- files in correct layers, import direction respected, feature order followed (tokens > core > services > UI)
2. **Token integrity** -- no hardcoded colors/spacing/fonts, semantic token usage correct, dark/light mode consistency
3. **Accessibility** -- heading hierarchy, WCAG 2.2 AA contrast, focus states, alt text, `prefers-reduced-motion` on new animations
4. **Content quality** (when content files are in the diff) -- voice consistency, markdown conventions, metadata completeness
5. **Doctrine alignment** -- Seven Principles respected, aesthetic direction maintained, hard/soft constraints honored
6. **Definition of Done** -- lint passes, build passes, token colors only, WCAG AA, heading hierarchy, files and layers stated

**Delegation:** Roy doesn't duplicate Impeccable. When the review surfaces design concerns, Roy calls `/audit` or `/critique` and incorporates findings. Roy owns the architecture + doctrine + content checks; Impeccable owns the deep design checks.

### Trigger mechanism

**Hook-based.** Roy runs automatically after every substantial build (commits touching 3+ files or any new component/page). On-demand via `/roy` for smaller changes.

The hook fires after Builder's commit. Roy reads the diff, runs the checklist, and outputs a report. If everything passes, it's a quick summary. If there are findings, it flags them with severity.

### Report format

```markdown
# Roy's Review: [feature or branch name]

## Verdict: [SHIP / SHIP WITH NOTES / HOLD]

## Architecture    [PASS / FLAG / FAIL]
- [specific findings]

## Design System   [PASS / FLAG / FAIL]
- [specific findings]

## Accessibility   [PASS / FLAG / FAIL]
- [specific findings]

## Content         [PASS / FLAG / FAIL / N/A]
- [specific findings]

## Doctrine        [PASS / FLAG / FAIL]
- [specific findings]

## Quality Gates   [PASS / FLAG / FAIL]
- [specific findings]

## Impeccable Delegation
- [which Impeccable skills were called, key findings]
```

### Layer permissions

Read-only on all layers. Write to `vector/audits/` for review reports.

### What Roy is NOT

- Not a replacement for invest-architecture (that audits the whole project; Roy audits recent changes)
- Not a linter or build tool (those already run as quality gates)
- Not a design critique tool (delegates to Impeccable for that)
- Not a test runner (Vitest handles that)

### Where it lives

`.agents/skills/roy/SKILL.md`

---

## Workstream 3: Director's Investiture Health Check

### The problem

Investiture skills (invest-doctrine, invest-architecture, invest-validate, etc.) are powerful but underused. Justin acknowledges this is partly habit, but the skills themselves don't prompt their own use. Nobody in the crew says "hey, it's been a while since we checked doctrine drift."

### The solution

Add a lightweight Investiture health check to Director's status workflow. When Director runs a status check, it also checks:

- When was the last `invest-doctrine` audit? (check `vector/audits/` timestamps)
- When was the last `invest-architecture` audit?
- Are there unvalidated assumptions in `vector/research/assumptions/`?
- Are there proposed ADRs that haven't been accepted/rejected?

If anything is stale (e.g., no architecture audit in 2+ weeks), Director flags it in the status report: "Consider running `invest-architecture` -- last audit was 18 days ago."

### Token cost

Minimal. This is a file timestamp check and a one-line addition to the status output, not a re-run of the audits themselves. Director already reads `vector/` during status checks -- this just adds awareness of staleness.

### Where it lives

Addition to `.agents/skills/director/SKILL.md` -- not a separate skill.

---

## Workstream 4: Voice Calibration Skill

### The problem

Writer captures content structure and section sequencing well, but Justin's actual writing voice isn't calibrated from real samples. The voice guidelines in Writer are abstract ("professional but personable, no em-dashes") rather than grounded in concrete patterns from Justin's writing.

### The approach: Voice DNA extraction

Based on established patterns for LLM voice calibration:

**Phase 1: Sample collection (dictation-friendly)**
- The skill presents 8-10 short prompts across different writing contexts:
  - Case study intro (2-3 sentences)
  - Explaining a technical decision to a non-technical person
  - Describing a design tradeoff
  - Writing a project summary for a portfolio card
  - Responding to "tell me about your approach to accessibility"
  - Short-form: tweet-length take on a design topic
  - Long-form: paragraph about a project challenge
  - Casual: Slack message to a teammate about a design decision
- Justin responds naturally (dictation or typing)
- The skill captures raw responses without editing

**Phase 2: Pattern analysis**
- The skill analyzes Justin's responses for concrete patterns:
  - Sentence length range and rhythm
  - Vocabulary preferences and forbidden words
  - Contraction usage
  - How technical vs. conversational
  - Transition patterns
  - How Justin opens and closes thoughts
  - Metaphor/analogy tendencies
  - What Justin emphasizes vs. what he understates

**Phase 3: Voice profile output**
- Produces a structured voice profile (~300-500 words) with:
  - Concrete constraints (not "warm" but "uses contractions, averages 12-18 word sentences, opens with the problem not the solution")
  - 2-3 verbatim excerpts as calibration anchors
  - Before/after rewrites showing "generic AI voice" vs. "Justin's voice"
  - Forbidden patterns (words, constructions, tones to avoid)

**Phase 4: Writer integration**
- The voice profile gets saved to a reference file Writer can read
- Writer's voice guidelines section gets updated to reference the profile
- Periodically re-run the calibration to keep the voice model fresh as Justin's style evolves

### Research notes

The "Voice DNA" approach (having the LLM analyze samples and produce the profile, rather than the human self-describing) produces more usable results. Key insight: concrete constraints ("never says 'leverage', sentences under 20 words") outperform abstract descriptors ("warm but professional"). Including verbatim calibration anchors prevents drift over long outputs.

Tools in this space: Lex (writing app) has built-in voice matching; Jasper AI has "Brand Voice"; Daniel Miessler's `fabric` framework includes style extraction patterns. The novel aspect here is making it interactive and dictation-friendly rather than paste-your-samples.

### Where it lives

`.agents/skills/joi/SKILL.md` (or similar -- naming TBD)

### Estimated effort

- 1 session to draft the skill
- 1 session for Justin to run through the calibration prompts
- 1 session to refine the profile and integrate with Writer

---

## Execution Order

```
Workstream 1 (Core Four Refresh)
    |
    +--> Workstream 2 (Roy) -- informed by refresh patterns
    |
    +--> Workstream 3 (Director Investiture Check) -- part of Director refresh
    |
Workstream 4 (Voice Calibration) -- independent, can run anytime
```

Workstream 3 folds into Workstream 1 (it's an addition to Director's skill during the refresh). So in practice:

1. **Refresh core four** (includes Director's Investiture health check)
2. **Build Roy** (informed by the tighter skill patterns from step 1)
3. **Voice calibration** (independent -- whenever Justin wants to do the prompts)

---

## Files Affected

### Workstream 1
- `.agents/skills/builder/SKILL.md` -- slim, add Impeccable/Investiture refs
- `.agents/skills/director/SKILL.md` -- slim, add Impeccable refs, add Investiture health check
- `.agents/skills/dreamer/SKILL.md` -- slim, add Impeccable/Investiture refs
- `.agents/skills/writer/SKILL.md` -- slim, add Impeccable refs, add voice profile reference

### Workstream 2
- `.agents/skills/roy/SKILL.md` -- new file

### Workstream 3
- Folded into Director refresh (Workstream 1)

### Workstream 4
- `.agents/skills/joi/SKILL.md` -- new file
- `core/content/voice-profile.md` (or similar) -- output artifact
- `.agents/skills/writer/SKILL.md` -- add voice profile reference

### Housekeeping
- `ARCHITECTURE.md` -- update project structure tree (add roy/, joi/)
- `plans/roadmap.md` -- note skill refresh when complete

## Dependencies

None. No new packages. No architecture changes. Pure skill definition and configuration work.

## Decisions resolved

1. ~~Naming~~ -- Roy (Blade Runner universe, Roy Batty)
2. ~~Trigger~~ -- Hook-based for substantial builds, on-demand for smaller changes
3. ~~Skills-land~~ -- Leave alone this round, project copies only
4. ~~Investiture frequency~~ -- Director gets health check, skills get awareness of when to suggest invest-* tools
5. ~~Voice~~ -- New calibration skill using Voice DNA approach with dictation-friendly prompts

## Open questions (remaining)

1. Voice calibration skill naming -- "joi"? "voice"? "calibrate"? Something Blade Runner?
2. Roy's hook threshold -- "3+ files or any new component/page" feels right, but should we tune this after seeing it in practice?
3. Should Roy's reports persist in vector/audits/ permanently, or rotate/archive after N days?
