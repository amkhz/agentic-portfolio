# Backfill Generation Rules — Step 5, 6 & 7 Detail

Read this when you begin Step 5 of invest-backfill. Generate only MISSING files. For each, combine Investiture defaults with inferred content. Mark sections that need operator review with `[OPERATOR: ...]` prompts — these are more specific than generic Investiture template brackets because you have project context.

## 5a. Generate VECTOR.md

Use the Investiture VECTOR.md structure exactly.

**Frontmatter — fill from survey:**
- `project.name` — from package manifest or README
- `project.description` — from README first paragraph or package description
- `project.stage` — inferred: "development" if recent commits, "maintenance" if dormant, "discovery" if very early
- `project.started` — from first git commit date (`git log --reverse --format=%ai | head -1`)
- `project.repo` — from `git remote get-url origin`
- `owner.name` — from git log author if single-author, otherwise leave blank
- `knowledge.*` — use Investiture defaults (`./vector/research/`, etc.)

**Always include — Investiture defaults, verbatim from the Investiture VECTOR.md template:**
- The Core Relationship section (the contractor metaphor)
- The Seven Principles section (all seven, with non-negotiables)
- The "These are Investiture defaults" note

**Inferred content — fill from survey, flag confidence:**
- **Problem Statement** — Draft from README's description/purpose section. Wrap in: `[OPERATOR: Verify — inferred from README. "Your project..."]`
- **Target Audience** — Draft from README's audience/contribution section. Flag if inferred.
- **Core Value Proposition** — Draft from README. Always flag for review.
- **What This Is Not** — Leave as prompted bracket. Do not guess boundaries.

**Template content — specific prompts, not generic:**
- **Design Principles** — If README states principles or a philosophy, reference them: `[OPERATOR: Your README states principles including "[quoted principle]". Consider adapting these as design principles, or write new ones for the technical implementation.]` Otherwise, leave with standard Investiture brackets.
- **Constraints** — Fill what can be inferred: deployment platform, license type, serverless constraints, language requirements. Leave room for operator additions.
- **Quality Gates** — Leave as prompted brackets. These require human judgment.

**Research Status table:** Use Investiture default locations. They will point to directories that do not exist yet — that is expected (see Step 6).

## 5b. Generate CLAUDE.md

CLAUDE.md is an **onboarding briefing**, not a personality definition. It should be useful to any agent or human contributor who opens this project for the first time. It answers: "What do I need to know before I touch this code?"

Agent identity (name, pronouns, voice, persona) is optional — some operators define it here, some manage agent identities externally, some have multiple agents touching the same project. The generated CLAUDE.md should be functional without any personality section.

**Always include — these make the file useful on its own:**
- **Reading order:** VECTOR.md (project doctrine) → CLAUDE.md (this file) → ARCHITECTURE.md (technical spec)
- **Architecture reference:** "Read ARCHITECTURE.md and follow it." — the single technical authority
- **Stack summary:** The actual technologies in use, listed concisely so a new contributor knows what they're working with
- **Key context:** What a contributor needs to know that isn't obvious from the code — deployment model, content architecture, external services, anything that would cause someone to make a wrong assumption
- **What not to do:** The 2-3 most important prohibitions from ARCHITECTURE.md, surfaced here so they're seen early
- **Commit format:** `Co-Authored-By` template
- **Standup format:** Template for status reporting

**Inferred content:**
- `[project name]` — filled from package manifest
- **Stack summary** — list the actual stack detected: framework, build tool, styling approach, state management, backend, database
- **Key context** — anything notable from the survey: "All site content lives in `src/content/en.js` — do not put copy in components." "Serverless functions in `netlify/functions/` — no persistent server." Surface the non-obvious.

**Agent identity — optional, at the end:**

After the functional sections, include:

```
## Agent Identity (Optional)

[OPERATOR: If your agent has a defined persona (name, pronouns, voice,
working style), add it here. If your agents are managed externally,
or you want this file to serve any contributor regardless of whether
they are human or AI, the sections above are sufficient.]
```

**If inline agent prompts were found**, add a note:
```
[OPERATOR: Your project contains embedded agent instructions:
- [file path] — defines [what voice/persona]
Consider whether these should inform a persona definition here,
or remain function-specific.]
```

## 5c. Generate ARCHITECTURE.md

This is the most content-rich generated file. Almost everything is inferred.

**Always include — Investiture defaults:**
- Header with "Last Updated" set to today's date
- Opening line: "This file is the technical specification."
- Reference to VECTOR.md for philosophy
- "How to Add a Feature" section — adapted to the actual layer count and names
- "What Not to Do" section — adapted to the actual stack (see below)
- Flexible Preferences section
- Decisions section referencing `/vector/decisions/`

**Inferred content — the core of the file:**

- **Layer table** — From the Step 3b layer mapping. Each layer gets: name, location, and rule (inferred from directory contents). Not forced into four layers.

- **Import Direction** — Inferred from actual import patterns observed in Step 2c. If pages import from components but not vice versa, document that. Format as the explicit directional diagram. If import direction is unclear, document what you observed and mark: `[OPERATOR: Verify these import rules reflect your intent.]`

- **Stack table** — From Step 3a. Each row: layer, technology, and "Why" (inferred from config context, or `[OPERATOR: Why this choice?]` if unknown).

- **Project Structure tree** — Built from ACTUAL disk state. Walk the filesystem and produce the annotated tree with layer annotations. This is not the Investiture default tree — it is this project's actual structure.

- **Naming conventions** — From Step 3c. Only declare conventions that were actually observed. Do not invent conventions for file types that do not exist in the project.

- **State Management** — Describe the actual approach. If Context, say Context. If Zustand, say Zustand. If Redux, say Redux. No judgment. Document reality.

- **Styling** — Describe the actual approach. CSS variables, Tailwind, CSS modules, styled-components, SCSS — whatever is in use.

- **API/Backend Pattern** — Describe how the project communicates with external services. REST endpoints, GraphQL, serverless functions, direct SDK calls. Document what exists.

- **Testing** — If a test framework exists, describe the convention (framework, file patterns, location). If none:
  ```
  Testing: None detected.
  [OPERATOR: If your project has a testing strategy, declare it here
  (framework, file patterns, coverage expectations) and invest-architecture
  will audit against it. If testing is outside your doctrine scope,
  omit this section — Investiture audits what you declare, not what you don't.]
  ```

- **Development Principles** — Infer higher-order architectural principles from the patterns observed during the survey. These are the *why* behind the conventions — the beliefs about how the codebase works that a contributor needs to understand for good judgment on edge cases.

  **How to infer principles:**
  - Look for patterns that appear across multiple signals (at least 2) — directory structure, import patterns, naming conventions, content organization
  - State each as a short declarative sentence with a one-line explanation
  - Mark all with `[OPERATOR: Verify — inferred from observed patterns.]` since these are interpretations, not facts

  **Examples of pattern → principle inference:**

  | Observed Pattern | Inferred Principle |
  |-----------------|-------------------|
  | All text lives as JS objects in `src/content/`, pages import and render them | **Content is data, not markup.** Pages render content; they don't contain it. |
  | Single CSS file with domain-scoped prefixes (`zv-`, `ovl-`) | **One stylesheet, scoped by domain.** CSS is centralized but namespaced by product area. |
  | Some pages bypass the shared layout component and manage their own body styles | **Standalone pages own their world.** Sub-brands break out of shared layout and control their full rendering context. |
  | VECTOR.md → CLAUDE.md → ARCHITECTURE.md reading order enforced | **Doctrine before code.** Read before you write. |

  **Rules:**
  - Only infer principles with clear evidence (2+ signals from the survey)
  - Keep to 3-6 principles. More than that and you're inventing, not inferring.
  - If the project has no clear architectural opinions (everything in one directory, no discernible patterns), skip this section entirely rather than fabricating principles

**"What Not to Do" adaptation:**

The Investiture default has five prohibitions. Adapt them to the actual stack:

- If CSS variables are used: include "no hardcoded colors outside the token file"
- If Tailwind is used: do NOT include the hardcoded colors rule
- If serverless functions exist: include "no API keys in client-side code"
- Universal: keep "files over 200 lines — split them"
- For each layer identified: add a prohibition that matches the layer boundary (e.g., "no data fetching in components — use [whatever the service layer is called]")

## Step 6: Initialize the /vector Directory

The `/vector/` directory is the research artifact system — interviews, JTBD, personas, competitive analysis, assumptions, schemas, and architecture decision records. By default, backfill creates this structure so the doctrine files' references resolve immediately.

**If `/vector/` already exists:** Leave it as-is. Do not overwrite or restructure.

**If `/vector/` does not exist:** Create the following structure with `.gitkeep` files and a README:

```
/vector/
├── README.md
├── research/
│   ├── interviews/.gitkeep
│   ├── jtbd/.gitkeep
│   ├── personas/.gitkeep
│   ├── competitive/.gitkeep
│   └── assumptions/.gitkeep
├── schemas/.gitkeep
├── decisions/.gitkeep
├── audits/.gitkeep
├── missions/.gitkeep
├── handoffs/.gitkeep
├── changelog/.gitkeep
└── briefs/.gitkeep
```

**`/vector/README.md` contents:**

```markdown
# /vector — Knowledge Artifacts

This directory holds structured research and decision records for the project.
It is referenced by VECTOR.md and used by the Investiture skill chain.

## Structure

- **research/interviews/** — User interview transcripts, summaries, and discussion guides (`invest-interview`)
- **research/jtbd/** — Jobs to Be Done analysis
- **research/personas/** — User personas derived from research
- **research/competitive/** — Competitive analysis artifacts
- **research/assumptions/** — Documented assumptions with validation status and plans (`invest-validate`)
- **schemas/** — Zero-Vector schema definitions (zv-*.json)
- **decisions/** — Architecture Decision Records (`invest-adr`)
- **audits/** — Investiture skill chain audit reports (`invest-doctrine`, `invest-architecture`, `invest-synthesize`)
- **missions/** — Crew task manifests for multi-agent sprints (`invest-crew`)
- **handoffs/** — Role-specific onboarding snapshots (`invest-handoff`)
- **changelog/** — Versioned release notes (`invest-changelog`)
- **briefs/** — Design briefs from research and doctrine (`invest-brief`)

## Usage

These directories are empty until you begin structured research.
Fill them as you learn. The Investiture skill chain reads from these
locations — keeping artifacts here means your doctrine stays connected
to your evidence.
```

**If `--no-vector` is passed:** Skip directory creation. Write VECTOR.md with the standard `knowledge:` frontmatter pointing to `./vector/` paths and add a comment noting the directory does not exist yet:

```markdown
<!-- NOTE: The /vector directory was not created during backfill (--no-vector).
     Create it when you begin structured research, or run invest-backfill again
     without --no-vector to initialize the structure. -->
```

## Step 7: Post-Generation Summary

After writing files, **output the summary to the terminal AND save it to `/vector/audits/invest-backfill.md`.** Overwrite the file on each run. Create the `/vector/audits/` directory if it does not exist (it should have been created in Step 6, but handle the `--no-vector` case).

```
## Backfill Complete — [Project Name]

**Files generated:**
- VECTOR.md — [GENERATED / SKIPPED (already exists)]
- CLAUDE.md — [GENERATED / SKIPPED (already exists)]
- ARCHITECTURE.md — [GENERATED / SKIPPED (already exists)]

### Inferred (HIGH confidence)
- [List what was filled from project signals: stack, layers, naming, deployment, etc.]

### Needs Operator Review
- [List sections marked with [OPERATOR: ...] prompts, grouped by file]

### Inline Agent Instructions Found
- [List or "None found"]

### Next Steps
1. Run `/invest-doctrine` now — it will produce a punch list of every gap, placeholder, and `[OPERATOR: ...]` section that needs attention.
2. Fill in the gaps it flags. The audit tells you exactly which file and section to fix.
3. Run `/invest-doctrine` again to verify. When it returns SOUND, the chain is ready and `/invest-architecture` can run.
```
