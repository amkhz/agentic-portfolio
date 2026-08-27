# Handoff -- agentic-portfolio -- 2026-08-26

**Round:** craft arc R2b, housekeeping addendum. Not a craft round.
**Seat/model:** Tyrell on Opus.
**Branch:** `claude/laughing-mahavira-978815` @ `4e2ea0c`, three commits ahead
of main, **unmerged and unpushed**.
**Companion:** `vector/handoffs/2026-08-26-r2b-fix-round.md`, now merged onto
this branch. That file is still the substantive record of the round; this one
only closes its housekeeping item and corrects it.

---

## Done (verified)

**The "stale worktree" does not exist.** The prior handoff logged a stale
worktree at `.claude/worktrees/priceless-aryabhata-0495e3`, detached at
`f329592`, carrying a second copy of `src/`. Checked directly:

```
/Users/300mhz/projects/agentic-portfolio/.claude/worktrees/priceless-aryabhata-0495e3  cd79327 [claude/laughing-mahavira-978815]
```

It is on a branch, clean, at `cd79327`, and it is the **live worktree this
session ran in** (`git rev-parse --show-toplevel` resolves to it). Removing it
would have deleted the session's own working directory mid-task. The directory
name is a stale label only: the harness reused the `priceless-aryabhata-0495e3`
directory for a later session on a differently-named branch.

Both of the prior handoff's implied checks come back clean anyway. `f329592`
exists and **is** an ancestor of main (the PR #209 merge, 2026-07-17). The
branch `claude/priceless-aryabhata-0495e3` pointed at that same commit and was
fully merged; it has since been deleted with the sweep below.

**The duplicate lint warning had a different cause.** The symptom was real and
reproduced at 2 problems from the main checkout, but staleness was not why.
`eslint.config.js` ignored only `dist`, and ESLint flat config does not read
`.gitignore` -- so *any* worktree under `.claude/worktrees/` gets linted
alongside the main tree and every finding is reported twice. Deleting one
worktree would have fixed it until the next session created another.

Fixed at the cause in `5ee6a52`: `{ ignores: ['dist', '.claude/worktrees'] }`.
Verified by applying it temporarily in the main checkout and running from there
-- **2 problems to 1** -- then reverting that checkout to pristine so the change
lives only on this branch.

**24 merged branches deleted.** 30 local branches, not the 28 logged. 25 were
fully merged into main; `claude/laughing-mahavira-978815` is one of them but is
checked out by this worktree, leaving 24. Deleted with `git branch -d` (never
`-D`), exit 0, no refusals. Six remain: `main`,
`claude/laughing-mahavira-978815`, and the four with unmerged commits.

**`docs/r2b-handoff` merged in** at `4e2ea0c`, bringing
`vector/handoffs/2026-08-26-r2b-fix-round.md` (217 lines, one file, no
conflicts).

**Gates on this branch:** lint **0 errors, 1 warning** (was 2), build clean,
**397/397 tests**. The surviving warning is the genuine one,
`src/components/content/renderSection.tsx:16`, react-refresh, pre-existing and
untouched.

---

## Claimed but unverified

**None from this session.** Everything above was checked against the tree or the
command's own output.

The R2b round's one open claim is unchanged and still owed: **"every completed
session ends in a dead white screen"** (R2a P0 1), which needs one manual pass
through a *completed* Flight Deck session in a real browser. See the companion
handoff for why the automation harness cannot drive it.

---

## Open threads

**PR #223 is open on `docs/r2b-handoff`** and is now a subset of this branch.
Merging the branch locally did not close it. Justin's call, and it wants
deciding before either lands:
- open a PR for `claude/laughing-mahavira-978815` (handoffs + lint fix
  together) and close #223 as superseded, or
- push the lint fix onto `docs/r2b-handoff` and let #223 carry everything.

Nothing is pushed yet, so either is still cheap.

**The five decisions owed by Justin** are unchanged and carried in the companion
handoff: `/notes` hero `opacity-40`, case-study cover crop, dual-mode assets
(P0 7), `MetricCard.isStatement` threshold, Flight Deck at 1280x800.

**`docs/r2b-handoff` the branch** can be deleted once #223 is resolved.

**Stale drafts, untouched:** PRs #205 and #152, open before this round and not
R2b's. Their branches were deliberately excluded from the sweep, as was
`spike/paper-shaders`.

**Kit / upstream feedback** to the detector thread is still owed. See the
companion handoff for the two confirmed false-positive classes.

---

## Gotchas learned

**A worktree directory name is not its branch.** The harness reuses worktree
directories across sessions, so `.claude/worktrees/<name>` can be checked out on
a branch with an entirely unrelated name. Read `git worktree list` before
believing any claim about what a worktree holds, and check whether the path is
your own `pwd` before running `git worktree remove` on it.

**ESLint flat config does not read `.gitignore`.** `.claude/worktrees/` is
gitignored and was still being linted. Anything that must be invisible to
ESLint needs an explicit entry in the `ignores` array. This generalizes: the
same trap applies to any tool given a bare `.` and assumed to respect git's
ignore rules.

**A duplicated lint finding is a scope symptom, not a code symptom.** The same
file at two paths means the linter's root is wider than intended. Deleting one
copy treats the instance; the ignore entry treats the class.

**Verify a housekeeping ticket before executing it.** This one was written in
good faith at the end of a long round and was wrong in three particulars
(detached vs on-branch, stale vs live, 28 vs 30). The destructive step it
prescribed would have removed the running session's working directory.

---

## Pickup prompt

> Craft arc R2b step 3 -- agentic-portfolio: the eyebrow round.
>
> Fresh session, Tyrell, pinned to **Opus** (`claude --model claude-opus-5`),
> run from `~/projects/agentic-portfolio`. Justin grades in the browser, one
> surface at a time.
>
> **READ FIRST:**
> 1. `vector/handoffs/2026-08-26-r2b-fix-round.md` -- the round's substantive
>    record. The three corrected R2a findings matter: do not re-fix what was
>    never broken.
> 2. `vector/handoffs/2026-08-26-repo-housekeeping.md` -- this file, for the
>    branch state and the open PR #223 question only.
> 3. `.impeccable/r2a-sweep-report.md` -- the AI-tell verdict section and the
>    per-surface kicker counts.
> 4. `~/projects/plans/2026-07-30-portfolio-craft-arc.md` -- decisions 4 and 5
>    bind, and decisions 6-15 are Justin's ten rulings.
> 5. Per-surface detail: `.impeccable/critique/*.md` (18 v4 snapshots;
>    `/impeccable polish` reads them as its backlog).
>
> **STATE:** main @ `cd79327` -- R1 (#219), R2b step 1 (#221), R2b step 2 (#222)
> all merged and live in production. **Both handoffs and the ESLint fix are NOT
> on main**: they sit on `claude/laughing-mahavira-978815` @ `4e2ea0c`, unmerged
> and unpushed, with PR #223 open on the subset branch `docs/r2b-handoff`.
> Resolve that before branching, or branch from main and let it land separately.
> Gates on the housekeeping branch: lint 0 errors / **1 warning**, build clean,
> 397/397 tests. The lint baseline is 1 warning now, not 2 -- if you see 2, you
> are linting from a tree without the ignore fix. Verify against ORIGIN before
> branching, not the local checkout. No portfolio dev server will be running;
> start your own and confirm page identity by `<title>`, never by status code.
>
> **THE WORK.** 31 hits of the identical mono-kicker recipe across 17 components
> in the main app; 41 occurrences across 22 files including notes. Per surface:
> constellation 29, doctrine-not-prompts 27, instant-doc-review 24, instant-sow
> 17, wallace 15, home 14, ai-leadership 13, /work 11, about 10, resume 10, lab
> index 11-of-12 rows, hub 8. The Flight Deck's ~14 avionics labels are
> legitimate instrument labels, not kickers; only ~6 are true eyebrows.
>
> This is **not** a find-and-delete. v4's craft floor bans the eyebrow flat, and
> removing one is a small design change per section header: the heading has to
> carry the weight the label was doing. The in-house counter-example already
> exists -- the design-infrastructure note renders exactly one true eyebrow and
> is better for it.
>
> **Reconcile DESIGN.md by hand in the same PR.** Its locked type stack still
> legitimizes the mono kicker that the craft floor bans; for this arc
> `kicker-above-heading` is a true positive by ruling, and the DESIGN.md
> conflict is itself the finding. Never run `/impeccable document`, never rename
> the `## Color` heading (arc decision 5 -- the parser trap is tested and
> recorded).
>
> **Two carried threads that belong to this round:** `MetricCard.isStatement`
> fires at label length > 72 while the captions that trip `all-caps-body` run
> 31-55 chars (~45 catches them all), and the sentence-length uppercase mono
> label is the same family as the eyebrow. Ask Justin before changing the
> threshold; it is visible on several surfaces.
>
> **DO NOT:** touch `core/content/*.md` (prose is R3, Justin's hands only); run
> `/impeccable document` or rename DESIGN.md headings; re-fix the three
> corrected R2a findings; write into `~/projects` coordination files; delete
> `spike/paper-shaders`, `feat/lab-archival-paper`, or
> `feat/selecta-case-study-draft`.
>
> **GATES:** feature branch, PR, Justin merges. lint + build + test green. When
> the surfaces are done, re-run `/impeccable critique` on the changed ones and
> check the FIRST output line every run -- a run that prints degraded is not a
> run.
>
> **OPEN (Justin):** PR #223 vs the housekeeping branch; browser grades per
> surface; the five decisions listed in the companion handoff; PR merge. Also
> still owed: one manual pass through a *completed* Flight Deck session to close
> the last unverified R2a claim.
