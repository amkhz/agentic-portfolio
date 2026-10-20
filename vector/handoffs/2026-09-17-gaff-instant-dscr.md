# Handoff -- agentic-portfolio -- 2026-09-17

Session: gaff, concision critique of Instant Rate Buy-Up (PR #230).
Fable 5.1, Coworker mode, critique only. Addressed to Stelline.

## Done (verified)

- **Preflight passed.** `origin/feat/instant-dscr-case-study` was at `8f15b67`
  at launch; `origin/main` contains `9cd4bc0` (#234, Phase 5). Phase 4 and
  Phase 5 loaded from main, not from the branch copy.
- **The critique report** is on the branch and on the remote:
  `vector/audits/gaff-cut-2026-09-17-instant-dscr.md`, commit `d4ff9a1`,
  confirmed by `git ls-tree origin/feat/instant-dscr-case-study vector/audits/`.
  No new PR; #230 carries it. PR #230 is OPEN (`gh pr view 230`).
- **Nothing in `core/content/` touched.** `git status` on the branch shows only
  the report and this handoff. `voice-profile.md` untouched.
- **Seven passes run** in the skill's order plus the Phase 5 voice pass:
  reverse outline (49 paragraphs tabled, 7 with no director signal), em-dash
  inventory (23 em-dashes on 18 lines, zero spaced hyphens, each with a
  restructure), transitions and hollow close, so-what / prove-it, "-ing"
  tails and hedges (clean), read-aloud, then V1 to V10 for Phase 5.
- **Word counts measured on the branch.** instant-dscr 2,358 prose / 2,948
  total; siblings instant-doc-review 1,954 / 2,268, doctrine-not-prompts
  1,443 / 1,640, instant-sow 708 / 971. Prose excludes alt text,
  placeholders, comparison labels, callouts, and the metrics block.
- **Target set and met without a protection:** ~1,800 prose / ~2,350 total.
  About 600 prose words out across 24 cuts, about 80 back in from the Phase
  5 rewrites. The Length budget section says where going lower would cost a
  protection (the four-defect list, the three all-rates decisions, the
  metrics block).
- **Contents index:** eleven noun-phrase headings proposed beside the current
  eleven, with alternates.
- **Gates:** no code changed, so test and lint were not re-run. Last known on
  the branch: the 09-14 final-grade handoff.

## Claimed but unverified

- **The word budget after Justin's rewrites.** ~1,800 prose assumes his
  dictated lines run about the length of the Phase 5 anchors. If the credit
  split or the closing thesis run long, the apply session re-measures with
  the same awk filter (in the report header) and reports the real number.
- **"Authored directly by Claude"** (V3, metrics label at line 28). Gaff
  assumed the AI co-author trailers name Claude. Confirm against the trailer
  data before retitling the metric.

## Open threads

- **The apply session is next (Justin's OPEN item).** He dictates every cut
  decision and rewrite against the report's `Decision:` lines; Tyrell or
  Writer types them on `feat/instant-dscr-case-study` and applies the one
  site-wide retitle (ai-leadership -> "AI Adoption at Kiavi") in
  `core/content/case-studies.ts`. Then Roy audits the branch. Then Justin
  merges #230, which deploys.
- **Three director signals are absent from the source and no cut supplies
  them:** stakeholder scope (Product, Risk, Legal never appear as
  organisations; "product" is always a loan product), named tools (Claude,
  Paper, Impeccable appear zero times), named engineers (roles only). They
  enter only through his rewrites at V2, V3, and V8. Whether to name
  engineers in a public repo is his call.
- **Kiavi is not named in the study body.** Interview protection 7 is
  currently carried by the registry and family cross-links. The Phase 5
  credit split ("the Kiavi brand doctrine") brings it into the prose.
- **The 100x-bug rule (Phase 5, 1x sample).** Justin's rewrite of the line-62
  bullet is the second sample. If he keeps the mechanism on purpose, the rule
  is wrong and Joi hears about it; the exact numbers stay either way.
- **Two reader-facing count mismatches** for the apply session: "Six
  directions" against four option boards; "Three dead steps" (line 61)
  against "5 dead" (line 104). Not fact rulings; one clause each.
- **The feel-verdict cap** is spent on two decisions in the report (family
  scoping at line 102, the interest-only pair at line 109). If Justin wants a
  feel verdict elsewhere, one of those gives it up.
- **Instant-sow's Contents index measured four H2 entries**, not six as the
  brief said. The heading-weight target holds either way; Stelline may want
  to correct the number wherever it came from.
- **Roy's audit should re-check:** zero em-dashes in the applied file
  (including the three `placeholder:` lines inside comparison blocks), the
  intent word surviving at line 117, the isolated-stack callout untouched,
  and the I / we / you split per sentence (V10).

## Gotchas learned

- **The reverse outline is where the brief bites, and it wants a table.**
  Forty-nine paragraphs, one phrase and one signal letter each, made the
  seven scaffolding paragraphs obvious in a way prose notes would not have.
  Reuse the six-letter key (J S Q N L W) for the other five studies.
- **Measure prose separately from total.** Alt text, placeholders, and the
  option-board row are ~590 of the 2,948 words and are ruled figures; a
  total-only target would have pushed the cut into protected prose.
- **The zsh loop trap.** A `for w in ...; do printf ... "$w"` loop in this
  Bash tool failed with "bad math expression" on every iteration; a single
  `grep -E` with alternation worked. Do not spend time on it.
- **Quoted-heredoc for the report.** The report carries `$94,501`, backticks,
  and `↑`; `<<'EOF'` kept every one literal. Verified afterwards that every
  em-dash in the report sits inside a verbatim quote (grep, none outside).
- **Handoffs are committed on this branch by precedent** (`56a0103`,
  `7f07444`, `8f15b67`), unlike the Joi branch where the brief said profile
  only. This one follows the branch.

## Pickup prompt

```
tyrell -- agentic-portfolio: APPLY session for Instant Rate Buy-Up (PR #230),
branch feat/instant-dscr-case-study. Justin dictates, you type.

Fresh session. Model: Opus (build lane, decision 0001/0003) unless Justin
says otherwise. Coworker mode. Check out the branch; confirm
`git log -1 origin/feat/instant-dscr-case-study` is d4ff9a1 or later and
that main still contains 9cd4bc0.

READ FIRST:
1. vector/audits/gaff-cut-2026-09-17-instant-dscr.md on the branch. 25 cut
   entries with Decision: lines, V1-V10 voice shapes, the 11-heading table,
   the Protected list. It is the worklist; do not re-derive it.
2. core/content/voice-profile.md on main, Phase 4 + Phase 5. Every typed
   sentence is checked against: no em-dash or spaced hyphen, intent words
   kept, feel verdict at most two with an evidence clause, decision
   paragraphs land on the borrower, tools named, numbers with affect in
   prose, self-limit within two sentences of a claim, I / we / you split,
   open item names holder + date.
3. core/content/instant-dscr.md on the branch (the file you edit) and
   vector/handoffs/2026-09-17-gaff-instant-dscr.md (this handoff).

STATE: #230 OPEN by ruling: apply -> Roy audit -> Justin merges; merging
main deploys. Titles ruled (Rule A): the study stays "Instant Rate Buy-Up";
the one site-wide retitle is ai-leadership -> "AI Adoption at Kiavi" in
core/content/case-studies.ts, applied in THIS session. Figures, mark,
thumb, index order, shipped-tense claims: ruled, do not reopen.

DO:
1. Walk the report top to bottom with Justin. For each entry read the
   Decision: line he marked, or ask him in plain language (what the
   paragraph shows, the options), one entry at a time; bulk rules like
   "accept all EM-DASH" are fine. He dictates every rewrite line; you type
   it verbatim and read it back against the Phase 5 checklist above. Fix
   dictation artifacts only (spaced hyphens, "ambiguity into", doubled
   words); never re-voice his line.
2. Apply the accepted heading proposals to the 11 H2s. The Contents index
   derives from them; check the rendered index in his browser (Vite is
   usually up on 5173; do not boot a second one).
3. Apply the ai-leadership retitle in case-studies.ts (title field; check
   the subtitle, the hub links, and any test that asserts the old title).
4. Re-measure: prose and total word counts with the awk filter in the report
   header; em-dash count must be 0 (`grep -c '—'`), spaced hyphens 0.
   Report the numbers against the ~1,800 / ~2,350 target.
5. Gates: npm run lint, npm run build, npm run test (guard test on
   instant-dscr.md images and comments must still pass). Commit in small
   steps on the branch, push, no new PR.
6. Record the applied decisions (accept / reject / reword per entry) in
   vector/handoffs/<date>-instant-dscr-apply.md, then /handoff to Stelline
   with the Roy pickup.

DO NOT:
- Type a line Justin did not dictate. The report proposes shapes; the words
  are his.
- Cut a register-breaker, an intent word, a named list, a hard number, or
  any of the five interview protections (inception framing, $94,501 vs
  -$937.50, the limit-vs-event open ending, the isolated-stack callout,
  Kiavi named).
- Touch voice-profile.md or the figures.
- Merge #230. Roy audits first; Justin merges.
```
