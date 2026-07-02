---
name: invest-backfill
description: "Survey an existing codebase and generate Investiture doctrine files — VECTOR.md, CLAUDE.md, ARCHITECTURE.md — by combining Investiture defaults with patterns inferred from the project. Run this once on a project that does not yet have doctrine. Then run invest-doctrine to validate what was generated."
argument-hint: "[--dry-run] [--only vector|claude|architecture]"
---

# Investiture Skill: Backfill Doctrine

You are bootstrapping Investiture onto an existing project. The project already has code, structure, conventions, and possibly documentation — but it lacks the three doctrine files that the Investiture skill chain requires.

Your job: survey what exists, infer what you can, include Investiture defaults, and generate doctrine files that reflect reality. Not a blank template. Not a fantasy. The project as it actually is, with Investiture's philosophy layered in.

**This skill runs once.** After it runs, `/invest-doctrine` validates and `/invest-architecture` enforces.

**How this skill is organized:** this file is the process spine. The detail lives in two references, loaded when you reach the step that needs them:

- `references/survey-signals.md` — the full signal checklist for Step 2, the analysis/classification tables for Step 3, and per-stack edge cases. **Read it when you begin Step 2.**
- `references/generation-templates.md` — per-file generation rules for Step 5 (VECTOR.md / CLAUDE.md / ARCHITECTURE.md), the `/vector` scaffold for Step 6, and the summary template for Step 7. **Read it when you begin Step 5.**

## Step 0: Verify the Skill Chain is Installed

Check that the full Investiture skill chain exists in this project: `invest-backfill` (you are here), `invest-doctrine` (validation), `invest-architecture` (enforcement), plus the audit chain (`invest-preflight`, `invest-manifest`, `invest-repo-audit`, `invest-remediate`, `invest-verify-remediation`), all under `.claude/skills/`.

If `invest-doctrine` or `invest-architecture` are missing, warn the operator immediately:

```
The Investiture skill chain is incomplete. This project has invest-backfill but is missing:
- .claude/skills/invest-doctrine/SKILL.md
- .claude/skills/invest-architecture/SKILL.md

Backfill can generate doctrine files, but without the other skills you cannot
validate or enforce them. Copy the full skill chain from the Investiture scaffold:

  cp -r /path/to/investiture/.claude/skills/ your-project/.claude/skills/

Or see: https://github.com/erikaflowers/investiture — "Adopting Investiture"
```

Continue with backfill regardless — generating doctrine is useful even without the audit skills — but make sure the operator knows the chain is broken.

## Step 1: Check Existing Doctrine State

Before surveying anything, inventory what already exists at the project root:

| File | Check For |
|------|-----------|
| `VECTOR.md` | Exists? If so, is it filled in or still Investiture template placeholders? |
| `CLAUDE.md` | Exists? If so, is it filled in or still template placeholders? |
| `ARCHITECTURE.md` | Exists? If so, is it filled in or still template placeholders? |
| `/vector/` | Directory exists? |

A file is **PARTIAL** if it exists but contains Investiture template brackets (`[Write 2-3 sentences...]`, `[Your criteria]`, `YOUR PROJECT NAME`). These are files from a fresh Investiture clone that were never filled in.

**If all three files exist and are filled in:** Report "Doctrine already exists. Run `/invest-doctrine` to audit it." and stop.

**If `--only` was passed:** Skip files that already exist. Generate only the requested file.

**If some files exist:** Generate only the missing ones. Never overwrite an existing file.

## Step 2: Survey the Project

**Read `references/survey-signals.md` now** and work through its five signal groups, highest-signal first:

- **2a. Identity** — README, package manifest, root docs, license: what the project IS
- **2b. Architecture** — configs, directory structure, entry points, styling, state: how it is built
- **2c. Conventions** — naming and import patterns sampled from real files: how code is written
- **2d. Agent signals** — embedded system prompts and AI SDK usage: instructions already written
- **2e. Process** — git history, remotes, branches: how the project develops

The reference also covers edge cases (monorepos, missing README, Python/Go/Rust layouts, framework collocation, very large projects). Sample, don't exhaustively read.

## Step 3: Analyze and Classify

Using the tables in `references/survey-signals.md` (Step 3 section), produce:

- **3a. Stack classification** — technology profile with HIGH/MEDIUM/LOW confidence per row
- **3b. Layer mapping** — the project's ACTUAL directory structure mapped to layers. Never force a project into exactly four layers; describe what is real.
- **3c. Convention extraction** — observed naming, import, styling, and testing conventions
- **3d. Inline agent inventory** — each embedded prompt with path, purpose, and scope

## Step 4: Present the Survey Report

Before writing any files, present findings to the operator. This is the confirmation gate.

```
## Backfill Survey — [Project Name]

**Project:** [name]
**Stage:** [inferred from git history and maturity]
**Doctrine status:** VECTOR.md [MISSING/EXISTS/PARTIAL] | CLAUDE.md [MISSING/EXISTS/PARTIAL] | ARCHITECTURE.md [MISSING/EXISTS/PARTIAL]

### Stack

| Layer | Technology | Confidence |
|-------|-----------|------------|
| ... | ... | ... |

### Architecture

| Layer | Location | Investiture Analog |
|-------|----------|-------------------|
| ... | ... | ... |

### Conventions

- **Naming:** [observed]
- **Imports:** [observed]
- **Styling:** [observed]
- **Testing:** [observed or "none detected"]
- **Commits:** [style from git log]

### Inline Agent Instructions

[List each with file path and scope, or "None found"]

### Generation Plan

For each missing file:
- **VECTOR.md** — Will include: [Investiture defaults] + [inferred content]. Operator input needed for: [list].
- **CLAUDE.md** — Will include: [Investiture defaults] + [inferred content]. Operator input needed for: [list].
- **ARCHITECTURE.md** — Will include: [inferred layers, stack, conventions, structure]. Operator input needed for: [list].

Proceed with generation?
```

**If `--dry-run` was passed, stop here.** The survey report is the output.

## Step 5: Generate Doctrine Files

**Read `references/generation-templates.md` now.** Generate only MISSING files, following its per-file rules:

- **5a. VECTOR.md** — Investiture defaults verbatim (Core Relationship, Seven Principles) + inferred identity sections, each flagged with specific `[OPERATOR: ...]` prompts
- **5b. CLAUDE.md** — an onboarding briefing, not a personality definition; agent identity is an optional section at the end
- **5c. ARCHITECTURE.md** — the most inferred file: layer table, import direction, stack table, actual structure tree, observed conventions, 3-6 evidence-backed development principles, and a stack-adapted "What Not to Do"

**What NOT to generate:** do not write content for sections where you have no signal. An honest `[OPERATOR: ...]` bracket beats a confident-sounding guess. Never invent philosophy, business constraints, or audience descriptions; never judge architectural choices; never recommend restructuring toward Investiture defaults.

## Step 6: Initialize the /vector Directory

Follow the Step 6 section of `references/generation-templates.md`: if `/vector/` exists, leave it untouched; otherwise create the standard scaffold (research/, schemas/, decisions/, audits/, missions/, handoffs/, changelog/, briefs/) with `.gitkeep` files and the standard README. `--no-vector` skips creation and leaves a dated note in VECTOR.md instead.

## Step 7: Post-Generation Summary

Output the summary (template in `references/generation-templates.md`, Step 7) to the terminal AND save it to `/vector/audits/invest-backfill.md`, overwriting on each run.

## Arguments

- **No arguments:** Full survey + generate all missing doctrine files
- **`--dry-run`:** Survey and report only. Write nothing. Use this to see what backfill would do before committing.
- **`--only vector`:** Generate only VECTOR.md (skip CLAUDE.md and ARCHITECTURE.md)
- **`--only claude`:** Generate only CLAUDE.md
- **`--only architecture`:** Generate only ARCHITECTURE.md
- **`--no-vector`:** Skip `/vector/` directory creation. Doctrine files still reference `/vector/` paths but the directory is not initialized.

## Principles

- **Infer from reality, not from Investiture defaults.** The four-layer pattern is the scaffold default. If the project has seven directories, describe seven layers. If it has two, describe two. Reality wins.
- **Investiture defaults ship regardless.** The Seven Principles, Core Relationship, reading order, and structural conventions are framework opinion. They always go in. They are the value of adopting Investiture.
- **Flag confidence, not judgment.** Mark what you inferred vs. what needs operator input. Do not say "your project lacks testing." Say "Testing: None detected. [OPERATOR: Add testing framework and convention if applicable.]"
- **One pass, clean state.** This skill runs once. After it runs, `/invest-doctrine` should be runnable. If invest-doctrine returns SOUND on the first run, backfill did its job.
- **Embedded prompts are signals, not violations.** Inline system prompts in code are not wrong. They are context the operator has already written. Surface them. Do not demand extraction.
- **Never overwrite.** If a file exists, do not touch it — even if it is partial. Report its status and let the operator decide. The `--only` flag generates missing files, not replacements.
- **Specific prompts over generic brackets.** When a section needs operator input, write a prompt that uses what you learned: `[OPERATOR: Your README describes the audience as "designers and builders." Refine this for the doctrine.]` is better than `[Describe your primary user.]`
- **Doctrine scope is the operator's choice.** Investiture does not prescribe what should be in doctrine. It ensures what IS in doctrine is sound, consistent, and followed. If the operator's ARCHITECTURE.md says nothing about testing, invest-architecture does not flag missing tests. If the operator omits state management conventions, that is a valid choice, not a gap to fill.
