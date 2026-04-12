# Blade Runner / Gibson Crew Rename

> Parked idea. Come back when ready. ~206 occurrences across ~35 files.

---

## Proposed Crew

| Role | Current | Proposed | Source | Why |
|------|---------|----------|--------|-----|
| Persona (CLAUDE.md) | Tyrell | **Tyrell** (stays) | BR | The architect of the whole system |
| Builder | Builder | **Case** | Neuromancer | The console cowboy. Jacks in, does the work, lives in the code. |
| Director | Director | **Wintermute** | Neuromancer | The AI that orchestrates everything. Coordinates agents toward a unified goal. |
| Dreamer | Dreamer | **Neuromancer** | Neuromancer | The imagination half. Wintermute plans, Neuromancer dreams. |
| Writer | Writer | **Stelline** | BR 2049 | Ana Stelline designs memories that feel real. That's what case studies do. |
| Reviewer | Roy | **Roy** (stays) | BR | Sees things you people wouldn't believe. |
| Voice | Joi | **Joi** (stays) | BR 2049 | She knew him better than anyone. |

---

## Why These Names

**The Wintermute / Neuromancer pairing is the gem.** In Gibson's Neuromancer, they're two halves of one super-AI. Wintermute handles strategy and coordination. Neuromancer handles personality and creativity. That maps perfectly to Director/Dreamer.

**Case** is the canonical Gibson protagonist. The console cowboy who jacks into cyberspace and does the real work. Builder's job in a word.

**Stelline** creates memories for replicants in BR 2049. She makes experiences that feel authentic, lived-in, real. That's exactly what writing case studies is: taking raw project experience and shaping it into narrative that resonates.

---

## Candidates Considered

### Builder

| Candidate | Source | Why it fits | Why it might not |
|-----------|--------|------------|-----------------|
| **Case** | Neuromancer | Console cowboy. Jacks in, does the work. | More hacker than craftsman |
| **Luv** | BR 2049 | Precise, relentless executor. | Antagonist, name is on the nose |
| **Pris** | BR | Resourceful, hands-on, improvises under constraints. | Doesn't read as "builder" |
| **Sebastian** | BR | J.F. Sebastian literally builds things. Toymaker, creator. | Maybe too literal |

### Director

| Candidate | Source | Why it fits | Why it might not |
|-----------|--------|------------|-----------------|
| **Wintermute** | Neuromancer | Orchestrates everything. Coordinates agents, sees the whole board. | Might feel too "mastermind" |
| **Gaff** | BR | The watcher. Sees everything, leaves origami clues. Quiet authority. | Subtle, might not land |
| **Armitage** | Neuromancer | The front man, runs the team. | He's a puppet in the book |
| **Bigend** | Pattern Recognition | Hubertus Bigend. Visionary, sees patterns, sets direction. | Deep cut, most won't recognize |

### Dreamer

| Candidate | Source | Why it fits | Why it might not |
|-----------|--------|------------|-----------------|
| **Neuromancer** | Neuromancer | The AI of personality and dreams. Paired with Wintermute = perfect. | Name is long |
| **Stelline** | BR 2049 | Designs memories. Literally creates dreams that feel real. | Could also be Writer |
| **Rachael** | BR | Questions assumptions, explores what's possible. | More self-discovery than planning |
| **Bobby** | Count Zero | Bobby Newmark. Young explorer, discovers new worlds. | Too junior for the role |

### Writer

| Candidate | Source | Why it fits | Why it might not |
|-----------|--------|------------|-----------------|
| **Stelline** | BR 2049 | Creates memories that feel authentic. Perfect for case studies. | |
| **Marly** | Count Zero | Art dealer, spots the real thing. Curates and evaluates quality. | More curator than creator |
| **Cayce** | Pattern Recognition | Cayce Pollard. Finds authentic signals in noise. Physical reaction to fake branding. | Deep Gibson cut |

---

## Blast Radius

| Role | Occurrences | Files |
|------|------------|-------|
| Builder | 70 | 19 |
| Director | 59 | 21 |
| Dreamer | 38 | 13 |
| Writer | 39 | 11 |
| **Total** | **~206** | **~35 unique** |

### Where the hits are
- Skill files (the skills themselves + cross-references)
- plans/ (plan files, handoffs, roadmap, build plans)
- vector/ (missions, ADRs)
- core/content/ (meta case study mentions the crew by name)
- ARCHITECTURE.md (project structure tree)
- .cursor/skills/ and .claude/skills/ (Impeccable skill copies)

### False positive risks
- "Director" appears in resume content ("Director-level product designer")
- "Builder" could appear in generic coding contexts
- Each rename needs human eyes on the diff, not blind replace-all

### What would need to happen
1. Directory renames: .agents/skills/builder/ > .agents/skills/case/, etc.
2. SKILL.md name fields and headers updated
3. Cross-references in all skill files
4. Plans, missions, handoffs, ADRs
5. Case study content (building-this-portfolio.md)
6. ARCHITECTURE.md project structure tree
7. CLAUDE.md if crew is mentioned there
8. Review every change for false positives
