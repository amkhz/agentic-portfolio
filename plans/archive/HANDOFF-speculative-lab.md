# Handoff: Speculative Design Lab — Context from Claude.ai Session

**Date:** 2026-03-20
**Source:** Claude.ai conversation with Justin
**Purpose:** Transfer full context into Claude Code so Tyrell can continue this work with access to the actual codebase, plans, and project files.

---

## What happened in this session

Justin and I (Claude, in Claude.ai) spent a long session exploring how to level up his agentic workflow across Cursor, Claude Code, and cmux. The conversation evolved through several stages:

1. **Started with a Perplexity-generated guide** about Claude + cmux + Cursor orchestration. It was overengineered for Justin's situation — it assumed a developer building custom TypeScript orchestration services.

2. **Reframed around Justin's actual operating model.** Justin is not a developer who codes. He is a product designer and design director who uses AI agents to write all code. His skill is intent clarity, design judgment, and directing — not implementation. This changes everything about how the tools should be used.

3. **Explored the agentic-portfolio codebase.** I read the repo structure, CLAUDE.md (Tyrell's identity), VECTOR.md (project doctrine), ARCHITECTURE.md (4-layer system), and the README. I could not access the tree views of .agents/skills/, .cursor/skills/, src/, or plans/ due to GitHub robots.txt restrictions.

4. **Justin shared the full skills inventory** (listed below). This revealed a far more sophisticated setup than expected — not just coding helpers, but a full design ops framework with research, briefing, decomposition, and governance skills.

5. **Landed on the real project:** A speculative design lab that serves three purposes simultaneously:
   - **Build:** Speculative design explorations imagining interfaces for frontier technologies
   - **Learn:** Internalize the Investiture framework by running a real project through the full skill pipeline
   - **Share:** Produce portfolio content + a meta case study about AI-augmented design practice

---

## Justin's operating model

- **Role:** Design director. Decides what gets built, how it should feel, whether output meets the bar.
- **Relationship to code:** Reads it, makes small edits, reviews to the best of his ability. Does not write code from scratch.
- **Strength:** Intent clarity, design judgment, human factors training, creative direction.
- **How he works:** Writes briefs/prompts → agents execute → he reviews output in the browser → redirects or approves.
- **Self-description:** "A really decent product designer and human factors trained guy who is a tech nerd — a director of brilliant agents."

### Directing principles we established

1. Lead with constraints, not features
2. Describe the experience, not the implementation
3. Reference project docs (ARCHITECTURE.md, VECTOR.md, CLAUDE.md) in every prompt
4. Write skills for recurring patterns (already done extensively)
5. Review by: checking file list + layers, checking the browser, letting lint/build/tests gate quality, asking for plain-language explanations when something feels off

---

## Skills inventory (as shared by Justin)

### Project skills (.agents/skills/ — symlinked to .cursor/skills/ and .claude/skills/)

- **Builder** — Engineering expert. Implements features, fixes bugs, writes code, refactors, enforces 4-layer architecture with lint/build quality gates.
- **Director** — Portfolio maintainer and project coordinator. Tracks status in plans/, maintains roadmap, logs pitch-worthy items, reviews ADRs, routes work to the right skill.
- **Dreamer** — Idea refiner and planner. Takes rough ideas through research, produces plan files in plans/ and ADRs in vector/decisions/, hands off to Builder.
- **Writer** — Case study builder and content refiner. Creates/edits case study content in core/content/, maintains metadata, writes in Justin's voice.

**Coordination flow:** Idea → Dreamer → Builder or Writer → Director

### Investiture framework skills (.claude/skills/ only)

- **invest-doctrine** — Audits VECTOR.md, CLAUDE.md, ARCHITECTURE.md for completeness and drift
- **invest-architecture** — Audits codebase against ARCHITECTURE.md rules
- **invest-backfill** — Generates Investiture doctrine files for new projects
- **invest-adr** — Generates Architecture Decision Records
- **invest-brief** — Generates design briefs from research, personas, JTBD, VECTOR.md principles
- **invest-crew** — Decomposes features into scoped agent tasks (branch names, commit prefixes, scope boundaries)
- **invest-handoff** — Generates condensed onboarding docs for specific roles
- **invest-interview** — Generates structured user research discussion guides
- **invest-synthesize** — Extracts insights from raw research, proposes VECTOR.md patches
- **invest-validate** — Prioritizes unvalidated assumptions by risk, generates validation plans
- **invest-changelog** — Reads git log, writes plain-language changelog

---

## The speculative design lab concept

### What it is

A /lab route in the portfolio where speculative design explorations live. Each exploration imagines interfaces and experiences for frontier technologies that don't fully exist yet. The frame is: "If this technology existed, what would we design for the people using it?"

### Where it lives

Starts inside agentic-portfolio. Will spin out to its own repo when it outgrows the portfolio.

### Design territories identified

1. **Space manufacturing ops** — Factory operator dashboards in microgravity. Remote control with signal delay. Thermal expansion communication. The interaction design problem: *remote control and latency*.

2. **Metamaterial interfaces** — Design tools for programming physical properties of matter (stiffness, conductivity, light behavior). Preview material response before fabrication. The interaction design problem: *authoring physical properties* — "Figma for physics."

3. **Quantum navigation** — Wayfinding when position is probabilistic. What replaces the map? Communicating uncertainty to passengers who need to feel safe. The interaction design problem: *communicating uncertainty*.

4. **Spacetime interaction design** — Monitoring warp fields (Harold White direction). Crew interfaces for spacetime geometry manipulation. What does "status normal" look like when physics is being bent? The interaction design problem: *monitoring the incomprehensible*.

### Form

Everything is on the table: interactive prototypes, design fiction narratives, generative art, functional tools, written scenarios. Mixed media. The expression serves the exploration.

### Why it works as portfolio content

Speculative design is a recognized discipline (Dunne & Raby, Near Future Laboratory, MIT Media Lab). Positions Justin as a designer who thinks about the future. Evidence of systems thinking, first-principles reasoning, creative range.

---

## The learning-by-building roadmap

Each project teaches more of the framework:

### Project 1: One speculative exploration
- Uses: Dreamer → invest-brief → invest-adr → Builder → Writer → Director
- Sequential, one agent at a time
- Teaches: the full skill pipeline end-to-end
- Produces: first speculative piece + /lab route

### Project 2: Second territory + invest-crew
- Uses invest-crew to decompose work into parallel tasks
- Runs 2 Claude Code sessions (cmux) — one on content/core, one on UI
- Teaches: invest-crew, parallel directing, cmux

### Project 3: The meta case study
- Writer documents the whole process as a case study
- invest-changelog pulls the receipts
- invest-doctrine audits docs for drift
- Produces: "building with agents" case study grounded in real shipped work

### Project 4+: Scale and spin out
- Agent Teams for coordinated sprints
- Generative visuals with ComfyUI
- invest-backfill to bootstrap a new repo if spinning out

---

## What to do next

**Justin wants Tyrell to:**

1. Read this handoff document for context
2. Read all existing plan files in plans/ to understand what other projects are in flight
3. Read existing content and project state to understand the full breadth of work done so far
4. Help Justin make an informed decision about which speculative territory to start with, considering everything already in progress
5. When ready, run the first project through the full skill pipeline: Dreamer → invest-brief → invest-adr → Builder → Writer → Director

**Key context Tyrell should surface:**
- What plans already exist in plans/?
- What case studies or content is already in progress in core/content/?
- What ADRs already exist in vector/decisions/?
- Any other projects or ideas already captured that relate to the speculative lab concept?

---

## Guide artifacts created

Two interactive HTML guides were built during this session. The second one (director model) is the definitive version. It was saved as an artifact: `director-model-agentic-guide.html`. Justin may want to reference or evolve it.
