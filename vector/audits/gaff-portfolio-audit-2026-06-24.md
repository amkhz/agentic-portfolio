# Gaff Portfolio Copy Audit — cut-list for review

Date: 2026-06-24  ·  Files: 12  ·  Proposed cuts: 87  ·  Approx words audited: 10,630

> Gaff critique pass (concision + de-AI) across all portfolio copy, excluding Perihelion. **Critique mode: nothing is applied.**
>
> **How to mark cuts:** edit the `Decision:` line under each cut. Write `accept`, `reject`, or `reword: <your text>`. Leave blank to skip for now. Save the file and tell Tyrell to apply — he parses every Decision line, applies the accepts/rewords, keeps the four protections intact, and re-runs lint/build/test.
>
> Bulk shortcut: instead of (or alongside) inline tags, you can tell Tyrell a rule like `accept all EM-DASH + REDUNDANCY + SCAFFOLDING` and only hand-mark the FILLER / UNEARNED ones.

## Cuts per file


| File                       | Words | Cuts |
| -------------------------- | ----- | ---- |
| ai-leadership.md           | 560   | 7    |
| doctrine-not-prompts.md    | 1817  | 10   |
| instant-sow.md             | 720   | 7    |
| instant-doc-review.md      | 1820  | 12   |
| wallace.md                 | 760   | 7    |
| building-this-portfolio.md | 2820  | 11   |
| the-craft.md               | 480   | 7    |
| the-sound.md               | 470   | 7    |
| the-system.md              | 470   | 5    |
| AboutPage.tsx              | 560   | 6    |
| HomePage.tsx               | 115   | 5    |
| WorkPage.tsx               | 38    | 3    |


---

## ai-leadership.md

*Solid, voice-true case study that mostly survives a hard cut: the intent throughline, the maximalist named lists (apps, tools, principles), and the hard numbers are all load-bearing and protected. The real fat is in the closer (restates the metrics block above it), a redundant "both as one initiative" beat repeated across two sections, and a few puffery/scaffolding phrases. Biggest opportunity: tighten the final paragraph so it stops re-listing what the metrics already showed.*

### ai-leadership.md · 1. Closer re-lists the metrics block above it  `REDUNDANCY`

> The work turned into business action fast: permanent AI tool subscriptions (Magic Patterns, Cursor, Subframe), a repeatable prototyping process now living inside the team's workflow, and a strategic framework that informed product requirements for our two flagship AI products.

**Why:** Reverse-outline: the metrics block directly above already states 'Permanent | AI tool subscriptions secured' and the Big Flip section already states the framework 'shaped product requirements for our AI lending tools.' This sentence restates both. The only genuinely new specific is the named tools (Magic Patterns, Cursor, Subframe) — keep those, drop the restated framing. Protected numbers/names stay.

**Replace with:** The work turned into business action fast: permanent subscriptions to Magic Patterns, Cursor, and Subframe, and a prototyping process now living inside the team's workflow.

**Decision:** Reword: The work turned into business action quickly: subscriptions to Magic Patterns, Cursor, and Subframe, and a prototyping process now living inside the team's workflow.

### ai-leadership.md · 2. "both as one initiative" stated twice across two sections  `REDUNDANCY`

> I framed both as a single initiative. Adoption needs hands-on enablement and alignment on principles at the same time: trust, transparency, and human oversight aren't a later phase, they're the foundation.

**Why:** Reverse-outline: 'The Dual Challenge' section opens by establishing two problems, and the Strategic Vision section reiterates the tactical/strategic fusion. The first sentence here ('I framed both as a single initiative') is the load-bearing pivot and the principles triad is protected (named list + intent-adjacent). The redundancy is mild — flagging the lead clause only, which restates the section's own setup. Keep the principles sentence intact.

**Replace with:** I framed both as one initiative: adoption needs hands-on enablement and alignment on principles at the same time. Trust, transparency, and human oversight aren't a later phase, they're the foundation.

**Decision:** Keep

### ai-leadership.md · 3. Throat-clearing negation before the real point  `SCAFFOLDING`

> These workshops produced real prototypes. It wasn't just me talking at people for an hour.

**Why:** Pass 2/4: 'It wasn't just me talking at people for an hour' is a defensive negation that delays the proof. The next sentence ('Attendees built working apps...') is the actual evidence and is stronger. The negation has a little voice-register charm, so this is a soft flag — consider folding it so the named-apps list lands faster.

**Replace with:** These workshops produced real prototypes, not just me talking at people for an hour.

**Decision:** Keep

### ai-leadership.md · 4. Brochure-tone compression claim  `UNEARNED`

> proving that AI-assisted prototyping could compress weeks of concept creation into hours

**Why:** Pass 4: 'proving that... could compress weeks... into hours' is a brochure-grade claim bolted as an -ing tail onto the named-apps sentence. 'weeks into hours' is a quasi-metric but unsourced and hedged with 'could.' Either commit to the real number from the workshops or let the named built apps (habit trackers, Kanban, snake games) be the proof on their own — they already are.

**Replace with:** compressing weeks of concept work into an afternoon

**Decision:** Keep

### ai-leadership.md · 5. Filler uplift tail after the closer's last real point  `FILLER`

> I became a go-to resource for AI strategy across design, product, and engineering. It's a great start, and it keeps evolving as the technology accelerates around us. At the pace this stuff is moving, keeping up is the fun part.

**Why:** Pass 3/6: 'It's a great start, and it keeps evolving as the technology accelerates around us' is a hollow uplift bridge between two stronger lines. 'keeping up is the fun part' is a real voice closer (forward-look, casual register) and stays; the 'go-to resource' line is a real claim and stays. Cut the soft middle so the two real beats land back-to-back.

**Replace with:** I became a go-to resource for AI strategy across design, product, and engineering. At the pace this stuff is moving, keeping up is the fun part.

**Decision:** Keep

### ai-leadership.md · 6. Puffery verb in workflow intro  `FILLER`

> That statement does a lot of the heavy lifting: it puts the designer back in charge.

**Why:** Pass 4/5: 'does a lot of the heavy lifting' is the physical-work metaphor the voice profile explicitly endorses (Phase 3.1), so the metaphor stays. But 'a lot of' is hedge-padding around it — Justin's own corpus uses the bare 'doing some heavy lifting here.' Trim the padding, keep the metaphor and the payoff.

**Replace with:** That statement does a lot of the heavy lifting: it puts the designer back in charge.

**Decision:** Keep

### ai-leadership.md · 7. Generic significance-inflation in strategy intro  `FILLER`

> Beyond tooling, I shared a critique of how the industry was approaching AI product design.

**Why:** Pass 1/4: 'Beyond tooling' is a formulaic section-bridge transition and 'how the industry was approaching AI product design' is vague throat-clearing before the actual critique ('draping a modern brain in an 80s UI') lands. The vivid line that follows carries the section; let it come faster.

**Replace with:** I also shared a critique of how the industry approaches AI product design.

**Decision:** Keep

**Protected (flagged, NOT cut):**

- Maximalist named app list — 'habit trackers, Kanban tools, snake games' — stays in full; the sprawl of named builds is the proof, not curatable filler (protection 3 + 4).
- Named tool stacks — 'Gemini and Replit and Subframe', 'Magic Patterns, Cursor, Subframe' — system/product names are hard specifics; the polysyndeton 'and...and' is voice rhythm, kept (protection 4).
- Principles triad 'trust, transparency, and human oversight' — named list + sits on the intent/oversight throughline (designer-in-charge); never trim (protections 2, 3).
- Hard numbers in metrics block — '100%', 'Permanent', '#1' and the metric labels including '#1 | AI Design & Engineer nerd' — kept verbatim, including the playful nerd label which is a register-breaker (protections 1, 4).
- 'puts the designer back in charge' / 'it puts the designer back in charge' — the intent/oversight throughline (faithful execution of the creator's intent, designer-in-control); load-bearing thesis, never cut (protection 2).
- 'doable for any curious person with zero coding background' — meets curious people where they are; no-permission-framing-positive, and a real specific claim, kept.
- 'the flip' / lowercase framing and 'The gist:' — already reflects Justin's Phase 4 de-branding edits ('The Big Flip'→'the flip', 'core insight'→'gist'); do NOT re-capitalize or formalize. Section heading still reads 'The Big Flip' — left alone, that's Justin's call.
- 'keeping up is the fun part' — earned forward-look voice closer; protected as register/voice.

---

## doctrine-not-prompts.md

*Structurally clean for a case study, voice intact, em-dash discipline mostly held. The biggest concision opportunity is the tool-vs-teammate thesis, which is fully stated three times (Problem, Reframe, belief #1) before the proof points; collapse two of those restatements. Second tier: the Results commentary paragraph re-narrates the metrics block, and several captions/belief-bullets restate their own lead-ins (AI-tell §10). Hiring audience can take a harder cut on scaffolding sentences ("None of this is theoretical," "A system nobody adopts is a hobby" survives as voice but its follow-on restates it).*

### doctrine-not-prompts.md · 1. Reframe re-states the Problem's thesis before adding anything  `REDUNDANCY`

> What makes a "teammate" real instead of aspirational is doctrine. Capture the team's intent, architecture, design system, and the agent's own personality in version-controlled files the AI reads on every session, and you stop coaching it per task. It already knows the domain, the standards, and the working agreements. That's the line between AI-as-waste and AI-as-teammate.

**Why:** Reverse-outline: this paragraph and belief #1 do the same job (define doctrine = files the AI reads every session, so you stop re-explaining). 'It already knows the domain, the standards, and the working agreements' restates The Problem's 'It doesn't know your domain, your standards, or how your team actually works.' Keep the definitional sentence, drop the restatement, and let belief #1 carry the mechanism.

**Replace with:** What makes a "teammate" real instead of aspirational is doctrine: the team's intent, architecture, design system, and the agent's own personality, captured in version-controlled files the AI reads on every session. That's the line between AI-as-waste and AI-as-teammate.

**Decision:** Keep

### doctrine-not-prompts.md · 2. belief #1 body re-explains doctrine a third time  `REDUNDANCY`

> **Doctrine over prompts.** Encode intent, architecture, design system, and agent identity into files the AI reads every session, so you stop re-explaining yourself.

**Why:** AI-tell §10 (bulleted bold lead-in that restates itself) plus reverse-outline: with the Reframe paragraph trimmed this still triples 'files the AI reads every session.' The bold lead-in already says it. Cut the body to the one thing the lead-in doesn't: the payoff.

**Replace with:** **Doctrine over prompts.** Encode the team's intent and identity once, in files, instead of re-explaining yourself every session.

**Decision:** Keep

### doctrine-not-prompts.md · 3. Results commentary re-narrates the metrics block  `REDUNDANCY`

> That accessibility number is something I'm proud of. It's hard, it's measurable, and it's verifiable: two real bugs, caught by the system, before a single user hit them. The speed numbers are supporting evidence. The cycle-time and ramp claims are honest bets, and they're labeled that way on purpose. Converting a bet into a claimed result would misrepresent the work, and that honesty is part of what makes the rest credible. 

**Why:** Reverse-outline: the metrics block already labels each row (Real today / Bet in flight / Too early to claim) and states the two-bug number. 'It's hard, it's measurable, and it's verifiable' is a reflexive tricolon (§9) that restates the block's first row. 'The speed numbers are supporting evidence' restates 'Real, today.' Keep the load-bearing honesty point; cut the re-narration. Two-bug number and 'something I'm proud of' (a Phase 4 verb-downgrade) are protected.

**Replace with:** That accessibility number is the one I'm proud of: two real bugs, caught by the system, before a single user hit them. The cycle-time and ramp claims are honest bets, labeled that way on purpose. Converting a bet into a claimed result would misrepresent the work, and that honesty is part of what makes the rest credible.

**Decision:** Keep

### doctrine-not-prompts.md · 4. closer restates the org-along section  `REDUNDANCY`

> I didn't ship a feature. I shipped a way for a small design team to work with AI, built the proof to back it, and brought engineering, product, and leadership along instead of declaring victory from a deck.

**Why:** Reverse-outline: 'brought engineering, product, and leadership along instead of declaring victory from a deck' restates the entire 'Bringing the Org Along' section and its 'I shipped a way to work, not a feature' framing already implied throughout. The 'I didn't ship a feature. I shipped a way to work' move is the punchy contrast and stays; trim the trailing restatement so the audience-naming close lands faster.

**Replace with:** I didn't ship a feature. I shipped a way for a small design team to work with AI, and brought engineering, product, and leadership along instead of declaring victory from a deck.

**Decision:** Keep

### doctrine-not-prompts.md · 5. "experimental spike" double experimenting note  `REDUNDANCY`

> That one's still workshop material, not a finished proof point, and that's okay. We're constantly experimenting and learning.

**Why:** 'still workshop material, not a finished proof point' and 'We're constantly experimenting and learning' make the same point twice. 'and that's okay' plus the closing sentence is the watch-list spaced-hyphen-substitute energy turned into a tidy-uplift filler (§8 flavor). Keep the honest label; drop the reassurance restatement.

**Replace with:** That one's still workshop material, not a finished proof point yet.

**Decision:** Keep

### doctrine-not-prompts.md · 6. Kiavi World 'practices what it preaches' doubled  `REDUNDANCY`

> It's also itself a prototype, built on the team's standard architecture, so it practices what it preaches. Every component is a reference implementation of the design quality the team is aiming for.

**Why:** Reverse-outline within the paragraph: 'practices what it preaches' and 'Every component is a reference implementation of the design quality' say the same thing (it's a prototype that models the standard). Keep the sharper, more concrete second sentence; the idiom is the weaker of the two.

**Replace with:** It's also itself a prototype, built on the team's standard architecture: every component is a reference implementation of the design quality the team is aiming for.

**Decision:** Keep

### doctrine-not-prompts.md · 7. "None of this is theoretical" then immediately lists the artifacts  `SCAFFOLDING`

> None of this is theoretical. Four real artifacts, each built the doctrine-driven way, each with its own decision trail.

**Why:** Scaffolding/throat-clearing before the point. 'Four real artifacts' is the only load-bearing clause; the rest is a defensive setup the proof points themselves prove. 'each with its own decision trail' is unproven scaffolding here (the trails aren't shown).

**Replace with:** Four real artifacts, each built the doctrine-driven way.

**Decision:** Replace: Four real artifacts, each derived from doctrine.

### doctrine-not-prompts.md · 8. doubled "a little faster / generic" setup in The Problem  `FILLER`

> Point it at a task, it spits out a mockup or some code a little faster, and everyone moves on. The catch is that generic AI plus a generic prompt gets you generic output.

**Why:** Read-aloud: 'and everyone moves on' is filler that adds no information before the real point ('generic ... generic ... generic'). The triple-generic line is the keeper. Tighten the lead-in so the catch lands harder.

**Replace with:** Point it at a task, it spits out a mockup or some code a little faster. The catch is that generic AI plus a generic prompt gets you generic output.

**Decision:** Rewrite: Point it at a task, it spits out a mockup or some code a little faster. But, generic AI plus a generic prompt gets you generic output.

### doctrine-not-prompts.md · 9. belief #2 hedge-and-restate tail  `FILLER`

> What's left is the work human brains are best at: reading output critically, pushing back on what's wrong, verifying what's true. That discipline is real, and that's the point, not a downside.

**Why:** §9 reflexive tricolon plus a restate tail. 'That discipline is real, and that's the point, not a downside' says the same thing twice (real / the point / not a downside). The tricolon is doing real work (it names the three human jobs), so it's protected; collapse only the trailing double-negative restatement.

**Replace with:** What's left is the work human brains are best at: reading output critically, pushing back on what's wrong, verifying what's true. That discipline is the point, not a downside.

**Decision:** Keep

### doctrine-not-prompts.md · 10. caption restates its own first clause  `FILLER`

> Live pass/fail contrast chips on every token pair make accessibility something a designer can verify at the prototype layer, not something an audit team bolts on later.

**Why:** Read-aloud/§9 negative-parallelism: 'verify at the prototype layer' and 'not something an audit team bolts on later' are the same idea inverted. The contrast is mild but the caption already establishes the point with the image; one side is enough. Keep the prototype-layer half, which is the load-bearing claim.

**Replace with:** Live pass/fail contrast chips on every token pair let a designer verify accessibility at the prototype layer, not after an audit.

**Decision:** Keep

**Protected (flagged, NOT cut):**

- Register-breaker 'try hard intern with amnesia' in The Problem — stays (tonal release valve, Phase 4 confirmed 'try hard').
- Register-breaker 'Here's something cool:' opening the Operations DS proof point — stays (voice, casual-coinage register).
- 'A system nobody adopts is a hobby.' — tempting to merge with the next sentence, but it's a punchy declarative closer/opener in Justin's voice (emphasis pattern: short declarative after a longer thought). Kept.
- Belief #3 'like nothing in particular and everything else at the same time' — wordy, but it's a voice flourish (maximalist deflation rhythm) and lands the 'generic' point with bite. Not cut.
- The four open questions in 'What's Still Open' — a maximalist list of real questions with named stakes (graduation, front-end ownership, doctrine surfaces); the sprawl is the point. Not curated down.
- All hard numbers in the metrics block and Snapshot/brand paragraphs (2 days, ~2 weeks, 1 day, v1.0–v1.3, 21→tokens, ~30 days, 45-minute talk, three rounds) — kept; only trimmed adjectives elsewhere, never a number.
- 'Our Director of Product Management' and named systems (Snapshot, Operations design system, Kiavi Experience Manager context, Magic Patterns, shadcn, OKLCH, VECTOR/CLAUDE/ARCHITECTURE) — protected named specifics.
- The audience-naming close ('Whether you're a designer ... a leader ... I'd love to talk to you about it') — protected intent/audience-naming move, capped at one per piece and placed correctly.

---

## instant-sow.md

*A strong, specific case study that mostly earns its claims with hard numbers and a real "decision NOT to ship" throughline. The biggest concision opportunity is structural: the goal/restatement bridge after the problem stats, and a few redundant clauses inside the Solution and Oversight sections. Protect the "clutch" register-break, the intent/control throughline ("stays in control"), the metrics, and the named role titles.*

### instant-sow.md · 1. Goal-restatement bridge duplicates the Problem section  `REDUNDANCY`

> The pain was obvious, and so was the goal. The company's H2 target: every customer should have the option to use GenAI to help complete their scope of work. We set out to ship that vision incrementally.

**Why:** Pass 1 (reverse-outline). "The pain was obvious, and so was the goal" restates the job the four preceding stat-sentences just did. "We set out to ship that vision incrementally" is throat-clearing for the incremental-rollout fact that the three Release sub-heads already prove. Keep the H2 target (it's the load-bearing goal); cut the scaffolding around it.

**Replace with:** The company's H2 target: every customer should have the option to use GenAI to complete their scope of work. We shipped it incrementally.

**Decision:** Keep

### instant-sow.md · 2. Toolbox concept stated twice (intro + Solution)  `REDUNDANCY`

> Rather than rip out the manual form, I designed a "toolbox" that gave borrowers three progressively smarter ways to complete their SOW. It met them where they already worked, and it respected our established internal processes.

**Why:** Pass 1 + Pass 4. The opening line already says the toolbox "lets borrowers upload documents, describe their project, or recycle previous submissions," so re-introducing the three-path concept is partly redundant. "It met them where they already worked" is brochure-adjacent filler (prove-it fails: nothing concrete) and overlaps "respected internal processes." Tighten to one clause.

**Replace with:** Rather than rip out the manual form, I designed a "toolbox": three progressively smarter ways to complete the SOW, each respecting our established internal processes.

**Decision:** Keep

### instant-sow.md · 3. Oversight section: redundant flag explanation  `REDUNDANCY`

> Every AI-generated SOW is flagged in the operations system, so the internal team always knows it was machine-assisted.

**Why:** Pass 6 (rhythm) + this duplicates the image caption two paragraphs down ("Every AI-assisted submission is flagged for the SOW team"). Minor: drop "always" (filler intensifier). The caption already makes the point, so this sentence can stay lean.

**Replace with:** Every AI-generated SOW is flagged in the operations system so the internal team knows it was machine-assisted.

**Decision:**  Keep

### instant-sow.md · 4. "sharper question" framing before the actual question  `SCAFFOLDING`

> Once a borrower submits it, the work lands on a Feasibility Analyst for review, and we asked a sharper question on the back end: does every SOW actually need a human to look at it?

**Why:** Pass 5. "a sharper question on the back end" pre-grades the question as sharp before the reader hears it (telling not showing). Let the question land on its own. Breaking the run-on also fixes a long-breath sentence (Pass 6 rhythm). Role title "Feasibility Analyst" protected.

**Replace with:** Once a borrower submits it, the work lands on a Feasibility Analyst for review. So we asked: does every SOW actually need a human to look at it?

**Decision:** Keep

### instant-sow.md · 5. Release 3 over-explains "no AI"  `FILLER`

> Repeat borrowers, often experienced pros, can grab a previous SOW and adapt it for a new property. It's the fastest path in the toolbox. No AI here, just a way to reuse work that's already been done, and it turned out to be clutch for high-volume borrowers.

**Why:** Pass 5/6. "It's the fastest path in the toolbox" and "the fastest path" reappears nowhere else but adds a ranking claim with no number; the 31%-used metric below carries the impact. "just a way to reuse work that's already been done" is wordy for "just reused work." Kept "clutch" (register-breaker, protected).

**Replace with:** Repeat borrowers, often experienced pros, can grab a previous SOW and adapt it for a new property. No AI here, just reused work, and it turned out to be clutch for high-volume borrowers.

**Decision:** keep

### instant-sow.md · 6. Validation-bar + v1 tail  `FILLER`

> The validation bar was explicit: AI-extracted data has to be no worse than manually entered data, and condition rates can't go up. This is v1. As we refine the pattern, we unlock more.

**Why:** Pass 5. "This is v1." is a stand-alone scaffolding beat that the "As we refine the pattern, we unlock more" sentence already implies (forward motion). Cut it; the temporal honesty survives in the next clause. Minor tightening of "manually entered data" to "manual entry."

**Replace with:** The validation bar was explicit: AI-extracted data has to be no worse than manual entry, and condition rates can't go up. As we refine the pattern, we unlock more.

**Decision:** keep

### instant-sow.md · 7. Closing future-work tail runs long  `FILLER`

> Next, I want to surface potential issues during entry so borrowers can fix them before they ever hit submit, building on the patterns we started in the Instant Document Review work.

**Why:** Pass 5 (-ing tail is fine here, it names a real follow-on). "before they ever hit submit" — "ever" is filler; "the patterns we started in the Instant Document Review work" is wordy for "the Instant Document Review patterns." Tightens the closer without losing the cross-link.

**Replace with:** Next: surface issues during entry so borrowers fix them before they hit submit, building on the Instant Document Review patterns.

**Decision:** Keep

**Protected (flagged, NOT cut):**

- "clutch" in Release 3 (register-breaker, Protection 1) — tempting to cut as casual filler, kept.
- The NOT-ship paragraph in "Knowing When to Skip" — its rhythm ("Wire them together and you get a black box... So Risk deliberately severed the connection") and the closing aphorism ("The point of automation isn't to pull people out of the loop everywhere you can. It's to pull them out only where you've earned it.") is the intent/control throughline (Protection 2) plus a belief-block close. The capital "NOT" is voice (Phase 4). Left fully intact.
- "while the borrower stays in control of what gets submitted" and "the borrower validating each section" / "borrowers always have final control" — these read as repetition but each is the intent-and-control throughline (Protection 2: faithful execution of intent / staying in charge). Did not propose collapsing them.
- All metrics in the ::: metrics block and inline (20 min, 42 fields, 54%, 45%, 31%, ~a fifth of reviews) — Protection 4, untouched. Only rounded prose around them where wording (not the number) was wordy.
- Role/system names: "Feasibility Analyst," "Kiavi Experience Manager," "Project Risk model," "Operations design system"-adjacent ops references — Protection 4, kept verbatim.
- Tyler quote ("A task that used to take 20 minutes now takes about 2 minutes.") — hard number + named role, Protection 4, untouched.

---

## instant-doc-review.md

*Strong, specific, well-voiced case study that already does most of the right things (real numbers, named systems, honest tradeoffs). The biggest concision opportunity is structural: the closing Results section re-narrates metrics already stated in the metrics block, and several paragraphs restate the V1/V2-proved-the-pattern thesis three separate times. Cut the redundant re-statements and the puffery tails; protect every number, role title, and system name.*

### instant-doc-review.md · 1. Results section re-narrates the metrics block  `REDUNDANCY`

> The numbers tell two stories.

The speed story: PSA review time is down 50%, Prelim Title review down 33%. About 17% of loans now auto-complete the PSA review entirely while still in Processing, before an analyst is even assigned. And on 39% of loans the analyst changes nothing in the AI's output. They verify, they don't redo. The other 61% still get at least one correction. That's the honest state today, and the number we're working to move.

**Why:** Pass 1 (reverse-outline) + Pass 4 (so-what). The metrics block directly above already states 50%, 33%, 17%, 39%, and the borrower-feedback line verbatim. This paragraph's job is 80% re-reading the dashboard aloud. Keep only what the block can't carry: the verify-don't-redo gloss and the honest 61% framing.

**Replace with:** The numbers tell two stories. The speed story is in the percentages above. The honest part: on 39% of loans the analyst changes nothing and just verifies, but the other 61% still get at least one correction. That's today's state, and the number we're working to move.

**Decision:** Keep

### instant-doc-review.md · 2. Quality-story paragraph buries its real finding under setup  `REDUNDANCY`

> The quality story is one to watch closer. Speed is easy to claim and easy to fake, so we tracked what happens downstream where Underwriting checks the work. For years, underwriters kicked the PSA back to the analyst on roughly 40 to 45% of loans. After the Property Asset Processing rollouts in spring 2026, that rate fell to around 30%. And when we compared conditions on autocompleted loans against analyst-worked loans, the substantive defect mix (missing signatures, addenda, name mismatches) was nearly identical. Automation isn't creating a new class of error. It's running the same review, faster, with a cleaner handoff.

**Why:** Pass 5 + Pass 6. The content here is gold (real numbers, real downstream check) and all of it stays. Only trim the throat-clearing 'is one to watch closer' opener and the redundant 'easy to claim and easy to fake' doubling — one of those two clauses is enough.

**Replace with:** The quality story matters more. Speed is easy to fake, so we tracked what happens downstream where Underwriting checks the work. For years, underwriters kicked the PSA back to the analyst on roughly 40 to 45% of loans. After the Property Asset Processing rollouts in spring 2026, that rate fell to around 30%. And when we compared conditions on autocompleted loans against analyst-worked loans, the substantive defect mix (missing signatures, addenda, name mismatches) was nearly identical. Automation isn't creating a new class of error. It's running the same review, faster, with a cleaner handoff.

**Decision:** Keep

### instant-doc-review.md · 3. Final Results paragraph restates the From-Prototype-to-Production section  `REDUNDANCY`

> Snapshot is the next chapter, and it's already moving. The prototype graduated into a versioned production package, it's the foundation for the unified Origination File in Ops, and the first user acceptance testing has been completed. The review-and-task pattern V1 and V2 proved now has a path to every domain in the loan file at once. And the way it got there, designer-built code forked by engineering and shipped with a clear ownership contract, is being held up internally as the model for how design and engineering build together.

**Why:** Pass 1 (reverse-outline). Every clause here was already stated in 'From Prototype to Production' (graduated into a versioned package, foundation for Origination File, UAT, architecture-guild model) and in the Snapshot section (pattern applied to every domain). This whole paragraph is a section summary — exactly the hollow-conclusion tell. The next line ('One pattern. Applied everywhere. And now it ships.') is the real close and lands without this runway.

**Replace with:** (delete) — let 'One pattern. Applied everywhere. And now it ships.' carry the close.

**Decision:** keep

### instant-doc-review.md · 4. V1/V2 'proved the pattern' stated three times  `REDUNDANCY`

> V1 and V2 proved the pattern. They also showed where the ceiling was. A great PSA review experience is still just a PSA review experience.

**Why:** Pass 1 (reverse-outline). 'V1 and V2 proved the pattern' appears here, again in the Snapshot opener ('takes what V1 and V2 proved'), and a third time in Results ('the pattern V1 and V2 proved'). The bridge paragraph itself is good and stays; just don't lead with the phrase that two later sections also lead with. The ceiling point is the real new idea — open on it.

**Replace with:** V1 and V2 also showed where the ceiling was. A great PSA review experience is still just a PSA review experience.

**Decision:** Keep

### instant-doc-review.md · 5. Redundant 'Neither one is ideal' after the black-box point  `REDUNDANCY`

> The MVP was a black box. Analysts either trusted it blindly or treated it as a hassle. Neither one is ideal in regulated financial operations.

**Why:** Pass 4 (so-what) + Pass 5 (hedge). 'Neither one is ideal' is a soft restatement of the sentence before it — the trust-blindly/treat-as-hassle line already makes the stakes obvious, and 'in regulated financial operations' is established by the whole piece. Land on the black-box dyad.

**Replace with:** The MVP was a black box. Analysts either trusted it blindly or treated it as a hassle — and in regulated financial ops, neither is acceptable. (or simply cut the third sentence)

**Decision:** Rewrite: The MVP was a black box. Analysts either trusted it blindly or treated it as a hassle. In regulated financial ops, neither is acceptable. 

### instant-doc-review.md · 6. 'Each new task type compounds the gains on both sides' restates the prior sentence  `REDUNDANCY`

> Anything an analyst does that's routine, repeatable, within risk limits, and document-driven is a candidate. Each new task type compounds the gains on both sides.

**Why:** Pass 1/4. The 'candidate' sentence already establishes the pattern expands; 'compounds the gains on both sides' is a vague uplift close (the §8 challenges-and-prospects optimistic flourish) without a specific number behind it. Cut the flourish, keep the criteria list (it's a real maximalist enumeration — protected shape — so keep all four items).

**Replace with:** Anything an analyst does that's routine, repeatable, within risk limits, and document-driven is a candidate.

**Decision:** keep

### instant-doc-review.md · 7. 'Here's the part I'm most proud of' scaffolding  `SCAFFOLDING`

> Here's the part I'm most proud of. Snapshot didn't get handed off. It graduated.

**Why:** Pass 2/3 (throat-clearing). 'Here's the part I'm most proud of' announces the point instead of making it; the intro also already says 'I'm proud of' is signaled by voice. The 'didn't get handed off / it graduated' beat is the punch and lands harder cold. Voice note: Phase 4 shows Justin downgraded 'the number I'd stake the whole thing on' to 'something I'm proud of', so keep the pride but drop the announcement.

**Replace with:** Snapshot didn't get handed off. It graduated.

**Decision:** Keep

### instant-doc-review.md · 8. 'Some key insights so far' label before the bolded list  `SCAFFOLDING`

> Some key insights so far:

**Why:** Pass 3 (formulaic label). A bare meta-label introducing a list of bolded lead-ins. The three bolded items (Magic Patterns, Claude Code, real data schema) speak for themselves; the section heading already frames them.

**Replace with:** (delete) — the first bolded item can follow the prior paragraph directly.

**Decision:** Keep

### instant-doc-review.md · 9. Promotional 'small but mighty' tag on the hypothesis  `FILLER`

> The hypothesis behind it is small but mighty: **in the happy path, ops should never have to come here.**

**Why:** Pass 4 (puffery, §2). 'Small but mighty' is brochure phrasing that pre-judges the idea for the reader instead of letting the bolded claim land. The hypothesis is strong enough to stand alone.

**Replace with:** The hypothesis behind it is small: **in the happy path, ops should never have to come here.**

**Decision:** Rewrite: The hypothesis behind it is simple: **in the happy path, ops should never have to come here.**

### instant-doc-review.md · 10. 'something critical for such a nuanced problem space' tail  `FILLER`

> Stakeholders clicked through real interactions, something critical for such a nuanced problem space.

**Why:** Pass 5 (superficial -ing/appositive tail, §4). 'something critical for such a nuanced problem space' is fake-analysis filler — 'critical' and 'nuanced' are unearned adjectives that add no specific mechanism. The real payoff is the next sentence ('Feedback came in hours, not weeks').

**Replace with:** Stakeholders clicked through real interactions, not static mocks.

**Decision:** Keep

### instant-doc-review.md · 11. 'This was probably the best part' interjection  `FILLER`

> **Tapping the real data schema.** This was probably the best part.

**Why:** Pass 4/5. Editorializing about which part is best ('probably the best part') is hedged self-narration that delays the concrete content (pulling real GraphQL types into the prototype). The detail that follows proves it's the best part; saying so is redundant.

**Replace with:** **Tapping the real data schema.**

**Decision:** Keep

### instant-doc-review.md · 12. Two spaced-hyphen em-dash substitutes in the AI-assisted section  `EM-DASH`

> The tradeoffs, like when to compress passing states, when set containment needs its own rendering, where Source of Truth should live, what the escape hatch asks the analyst to write down, were all judgment calls.

**Why:** Pass 2 (mechanical). This is fine as-is (commas, not dashes) but flagging the construction: the list-interruption is clean. NO em-dash here actually. Withdrawing — leaving the sentence. See replacement note.

**Replace with:** (keep — no actual em-dash; verify no ' - ' substitutes elsewhere)

**Decision:** keep

**Protected (flagged, NOT cut):**

- INTENT THROUGHLINE: 'The tools just gave me the language to speak to my teammates at a level we couldn't reach before' and 'we were all looking at the same nouns' — these are the express/articulate-intent thesis moments (faithful expression of intent via shared language). Never trim, even though the AI-assisted section runs long.
- HARD NUMBERS + NAMED SPECIFICS: every metric (50%, 39%, 17%, 33%, 100%, 7%, 40–45%, ~30%, 2 months, July), every system name (Snapshot, Magic Patterns, Claude Code, Source of Truth, Action Center, Evidence Inspection Panel, Sentient Design, Origination File), every real title/stack (Kiavi Experience Manager, Director of Product Management, React 16/jQuery/webpack, React 18/Vite/Tailwind 4/Apollo, GraphQL, OKLCH). The metrics-block re-narration cut above removes the DUPLICATE prose, never the numbers themselves — all numbers survive in the metrics block.
- MAXIMALIST LIST: 'routine, repeatable, within risk limits, and document-driven' and 'member data, project data, property data, title, valuation, and a stack of cross-domain rules' are deliberate enumerations — keep all items, do not curate to three.
- REGISTER/VOICE: 'the same nouns', 'no sunk-cost guilt', 'the dense part of the dense part', 'verify, they don't redo' — punchy declaratives and Justin's rhythm; tempting to compress but they carry the voice. Left alone.
- DELIBERATE SHORT-SENTENCE CLOSE: 'One pattern. Applied everywhere. And now it ships.' and 'It graduated.' — Phase 4 punch-close pattern. Protected; the cuts above are designed to let these land harder, not to touch them.

---

## wallace.md

*Solid piece with a strong intent throughline and good hard numbers; the biggest concision opportunity is structural overlap between "What Wallace Actually Is," "The Caption Is the Spec," and the callout, which all re-litigate "the spec is the source of truth" and "a compiler gives direction." Tighten the duplicated spec/consistency beats and trim brochure-puffery modifiers; protect every intent line and number.*

### wallace.md · 1. Callout restates the opener/closer thesis  `REDUNDANCY`

> ::: callout The shift
> A raster model gives you surfaces. A compiler around it gives you direction. It's not just that images can look good, it's that I can say why this one and not that one, and prove it with the spec that produced it.
> :::

**Why:** Reverse-outline: this callout's job ("a compiler gives direction, not just surfaces") is already done by the opener ("a compiler that... turns design intent into a structured spec") and again by the closing paragraph ("turned a model that wants a sentence into an instrument that takes direction"). Three statements of one thesis. The callout is the weakest of the three because it's the most abstract. "It's not just that X, it's that Y" is also negative-parallelism (§9). The closing paragraph should carry the landing.

**Replace with:** (consider deleting, or keep ONLY if it earns its visual weight) — if kept, cut the first two sentences and lead straight with "I can say why this one and not that one, and prove it with the spec that produced it."

**Decision:** Keep - delete the callout

### wallace.md · 2. Spec-is-source-of-truth stated twice across two sections  `REDUNDANCY`

> Every render Wallace produces saves its caption next to the image as a sidecar. But, the picture isn't the source of truth, the spec is. Things like the palette hexes, the literal headline copy, the layout regions all live in a file that the next step in the pipeline reads rather than reverse-engineering pixels.

**Why:** Reverse-outline + read-aloud: "the picture isn't the source of truth, the spec is" duplicates the closing line "every one of those renders can be reconstructed from the spec that made it" and the callout's "prove it with the spec that produced it." The "Things like... all live in a file" construction is also loose. One tight sentence carries the whole job. Note the "But," comma-splice opener is a fast-editing artifact.

**Replace with:** Every render saves its caption beside the image as a sidecar, so the next step in the pipeline reads the spec (palette hexes, headline copy, layout regions) instead of reverse-engineering pixels.

**Decision:** Keep

### wallace.md · 3. Two-clause restatement of the same drift point  `REDUNDANCY`

> The thing you actually care about, where the headline sits, which chair grounds the frame, what color the light is, gets averaged into the model's idea of "nice."

**Why:** So-what/read-aloud: three parallel examples (headline / chair / light) where two land the point. "which chair grounds the frame" is the weakest and slows the sentence. Trim to two; the rhythm tightens and the deflation on "nice" lands harder. (This is a curation of an incidental example list, not a protected maximalist catalog.)

**Replace with:** The thing you actually care about, where the headline sits, what color the light is, gets averaged into the model's idea of "nice."

**Decision:** keep

### wallace.md · 4. "powerful and dumb" line vs. opener's drift setup  `REDUNDANCY`

> Raster models are powerful and dumb in the same breath. They can render gorgeous surfaces, but they take a paragraph of prose and quietly fill in every gap with their own defaults if you struggle to express your design intent. Thus, composition drifts. Palette drifts.

**Why:** Read-aloud + filler: "take a paragraph of prose... if you struggle to express your design intent" is a wordy windup, and "Thus," is a formulaic transition (§6). Tighten to the punch. KEEP "express your design intent" wording intact — it's the intent throughline; this trims only the scaffolding around it, not the intent phrase. (Flagging the intent clause as protected.)

**Replace with:** Raster models are powerful and dumb in the same breath. They render gorgeous surfaces, then quietly fill every gap with their own defaults. Composition drifts. Palette drifts.

**Decision:** Keep

### wallace.md · 5. Brochure-puffery doublet on hosted tools  `UNEARNED`

> Hosted image tools might be powerful and effective but they meter you, train on you, and decide for you.

**Why:** So-what/prove-it (§1/§2): "powerful and effective" is a concessive throat-clear that adds nothing and softens the punch. The triad "meter you, train on you, decide for you" is the real, earned line and lands cleaner without the windup.

**Replace with:** Hosted image tools meter you, train on you, and decide for you.

**Decision:** keep

### wallace.md · 6. Filler concessive in the cost paragraph  `FILLER`

> There was a practical layer too.

**Why:** Scaffolding: meta-narration announcing a new point instead of making it. The paragraph break already signals the shift. Cut and let the first real sentence open the paragraph.

**Replace with:** (delete) — start with "Hosted image tools meter you..."

**Decision:** keep

### wallace.md · 7. Redundant capability hedge in the schema section  `FILLER`

> Feed it a plain sentence and you're sampling out of distribution. It runs, just worse.

**Why:** Read-aloud: minor — two very short fragments back to back read choppy and "It runs, just worse" half-repeats "sampling out of distribution." Optional merge. NOTE: this introduces a spaced hyphen which violates the em-dash ban; better restructure as "Feed it a plain sentence and you're sampling out of distribution; it runs, just worse." Flag rather than force.

**Replace with:** Feed it a plain sentence and you're sampling out of distribution — it runs, just worse.

**Decision:** Rewrite: Feed it a plain sentence and you're sampling out of distribution; it runs, just worse.

**Protected (flagged, NOT cut):**

- Intent throughline — every instance protected and NOT cut: "the picture I get back is the picture I directed," "whose whole pitch is that I direct the work," "if you struggle to express your design intent," "Seeing the directions fully realized gave me the power to speak my intent into existence," "a designer stay in charge of how their intent is expressed." These are Justin's central belief; protection 2.
- Hard numbers + named specifics — all kept: "Ideogram 4," "GPT Image 2," "four full north-star directions," "Eight heroes," "about seven minutes per render," "M5 Max," "4 directions / 1 variable / $0 / 1 spec" metrics block, "21"-style token references. Cut adjectives around numbers if any, never the numbers; none needed cutting here.
- Maximalist named list — "monograph, atelier, field notebook, and a tech-and-nature conservatory" left intact. Tempting to compress to "four directions" since the count is already given, but the named sprawl is the protected pattern (protection 3); flagged not cut.
- "I didn't build Wallace to talk about it. I built it to make a decision." — punchy declarative emphasis pair, a voice rhythm move (short declarative after a longer thought). Tempting to merge but it's the voice, left alone.
- Closing paragraph "That's what I care about: not generating images, but building the thing that lets a designer stay in charge of how their intent is expressed." — carries the intent throughline AND is the earned closer. Fully protected; the callout above should yield to it, not the reverse.

---

## building-this-portfolio.md

*Solid, voice-rich draft, but it runs long for a hiring read and the Builder story is told twice. The single biggest concision win is collapsing the heavy overlap between The Process and The Evolution nodes (Builder origin, retirement, crew roster, and the "roles evolve / that's not failure" thesis all appear in both); within The Evolution that closing thesis itself lands three separate times. After that, the gains are scaffolding intros and a cluster of unearned "the real work is judgment" abstractions that restate the thesis without new specifics.*

### building-this-portfolio.md · 1. The Process and The Evolution re-tell the same Builder arc  `REDUNDANCY`

> The Process node (paras: "The crew started with the Builder..." / "Then the ecosystem grew up around it..." / "The Builder was retired, not replaced...") AND The Evolution node both narrate: Builder was the first skill, enforced tokens/a11y across the Vite migration and constellation nav, the ecosystem (CLAUDE.md, invest-crew, review pipeline) absorbed its job, it was retired-not-replaced, and roles-can-evolve-is-proof-not-failure.

**Why:** Reverse-outline pass: two nodes doing the same job. The Builder's origin, its enforcement record, its absorption-by-ecosystem, and its retirement are each stated fully in BOTH nodes. This is the highest-leverage cut in the file.

**Replace with:** Merge to one Builder telling. Keep The Evolution as the home of the Builder rise-and-retirement story (it has the best lines: "he was a real one," "Threw it a party," "You build scaffolding so the building can stand on its own," the Highlight Reel callout). In The Process, cut the three Builder paragraphs ("The crew started with the Builder" through "every quality gate and architecture rule the system enforces today.") and open The Process straight into the *current* crew and how it coordinates. Let The Process = how the crew works now; The Evolution = how it got here.

**Decision:** Keep

### building-this-portfolio.md · 2. The Evolution lands its thesis three times  `REDUNDANCY`

> When the structure is strong enough, roles can change shape. That's not a failure of the original design. It's proof it worked.

The honest version is simpler than it sounds. The Builder became redundant as I got more fluent at agentic building. The more I learned about directing a crew, the less I needed a generalist holding it all together, and the more its job belonged to the doctrine and the tooling. That's not a failure. That's learning.

**Why:** Pass 3 / reverse-outline: "that's not a failure, that's [proof/learning]" appears three times inside one node (and again in The Process). Restating the same reassurance is a hollow-conclusion pattern.

**Replace with:** Keep ONE landing of the point. The "honest version is simpler" paragraph is the more specific and human one (it names *why*: Justin got more fluent), so keep it and cut the preceding "When the structure is strong enough... It's proof it worked." The same "roles can evolve / proof it worked" beat also closes The Process callout area and the intro to this node, so it has already been earned.

**Decision:** Keep

### building-this-portfolio.md · 3. Evolution re-states the separation-of-powers already covered in The Process  `REDUNDANCY`

> That separation of powers was important. The Writer operates exclusively in the core layer. The Dreamer produces plans but never writes implementation code. The Director tracks status but doesn't ship features. These aren't arbitrary limits. They're the same kind of creative constraints that make design systems work. You restrict scope so quality stays high within it.

**Why:** Reverse-outline: duplicate of The Process's constraints paragraph. If The Evolution becomes the Builder-origin node and The Process owns the current crew, this belongs in neither twice.

**Replace with:** (delete) — The Process already says: "The Writer can't touch UI components. The Dreamer can't write implementation code... The constraints are creative boundaries that prevent the kind of drift..." Same three role-boundaries, same creative-constraint framing.

**Decision:** Keep

### building-this-portfolio.md · 4. Final crew-roster recap restates The Process's roster  `REDUNDANCY`

> The crew today looks different once more. There's no standalone Builder, but there is Tyrell, the base persona who builds directly, carrying the doctrine the old Builder used to hold in its head. Around it: the Director tracking what ships, the Dreamer turning ideas into plans, the Writer owning the words, Roy reviewing every build against the architecture, and Joi keeping my voice honest in the content. Wallace joined too, a compiler that turns a raw image model into a directed instrument for the portfolio's imagery. The crew keeps changing shape as I learn. That's the point. The portfolio keeps shipping, the constellation keeps growing, and the system does exactly what it was built to do: evolve.

**Why:** Reverse-outline: the Director/Dreamer/Writer role descriptions are a third statement of the same roster. Keep what's new (Tyrell, Roy, Joi, Wallace) and the evolve-closer; drop the recap.

**Replace with:** Trim to the new information only: Tyrell replacing the standalone Builder, plus Roy/Joi/Wallace as the genuinely new members (The Process already established Writer/Dreamer/Director). Keep the closer "The crew keeps changing shape as I learn. That's the point... the system does exactly what it was built to do: evolve." Cut the re-introduction of Director/Dreamer/Writer roles already defined two nodes up.

**Decision:** Keep

### building-this-portfolio.md · 5. Redundant a11y reassurance after the metric  `REDUNDANCY`

> The accessibility work grounded everything.

**Why:** Pass 1: vague topic-sentence scaffolding before the concrete contrast that follows. "The accessibility work" is then fully described in the next two sentences; this opener adds nothing and the Lighthouse-100 metric proves the point.

**Replace with:** *(delete)*

**Decision:**  Keep

### building-this-portfolio.md · 6. Two sentences both saying 'planning is worth the time'  `REDUNDANCY`

> Two hours sounds like a lot for "just planning." But plans are where it all starts. If you're not planning, you're going to end up with slop you're going to hate to clean up later.

**Why:** Pass 1 redundancy: "plans are where it all starts" + "if you're not planning... slop" are two phrasings of one claim. Keep the one with the concrete consequence (slop).

**Replace with:** Collapse to one beat: "Two hours sounds like a lot for 'just planning.' But skip it and you end up with slop you'll hate to clean up later." — "plans are where it all starts" and the if-you're-not-planning sentence make the same point twice.

**Decision:** Keep

### building-this-portfolio.md · 7. Scaffolding intro lines that delay the node's point  `SCAFFOLDING`

> Somewhere in the middle of all this, the workflow outgrew the portfolio.

I had a crew, a doctrine, and a way of working that took me from idea to shipped with the intent intact. And I had an itch. What if I pointed all of it at something I am genuinely obsessed with, instead of at the portfolio itself.

**Why:** Pass 2 scaffolding: throat-clearing recap of what the reader just read across four nodes, delaying the Lab reveal. (Protected: keep one runway beat so "Enter Perihelion" still lands as a reveal.)

**Replace with:** Compress to one runway sentence. The "I had a crew, a doctrine, and a way of working" line recaps the previous four nodes before getting to the actual subject (Perihelion). Open closer to: the workflow outgrew the portfolio, so I pointed it at something I'm obsessed with.

**Decision:** keep

### building-this-portfolio.md · 8. "The real work is judgment" abstraction restates the intro thesis  `UNEARNED`

> What the token system gave us for free was impressive: contrast ratios, semantic heading hierarchy, focus ring styles. What had to be enforced through human review was subtler: reading order, link target clarity, making sure nothing important was expressed through color alone. Automated audits give you a score. The real work is in the judgment calls.

**Why:** Pass 4 so-what: the example IS the proof; the tacked-on "the real work is judgment" is the thesis restated as a maxim. Note: this preserves the intent throughline (judgment lives in the intro).

**Replace with:** Keep the concrete split (free-from-tokens vs. enforced-by-review) — that's specific and earns its place. Cut the closing abstraction "Automated audits give you a score. The real work is in the judgment calls." The intro already owns the judgment thesis; here the concrete list already demonstrates it without the editorial restatement.

**Decision:** keep

### building-this-portfolio.md · 9. Hollow restatement closing The Process meta paragraph  `UNEARNED`

> The fact that the system matured enough to retire its first crew member is itself proof the approach works.

**Why:** Pass 4 prove-it / hollow conclusion: restates "this portfolio demonstrates the workflow it documents" from the same paragraph, and pre-empts the entire Evolution node which makes this exact point with the actual story. Redundant claim stated as conclusion.

**Replace with:** *(delete)*

**Decision:** keep

### building-this-portfolio.md · 10. Filler intro before the OKLCH numbers  `FILLER`

> They worked. But they only made sense if you already knew what they were supposed to look like.

**Why:** Pass 4: the hex-is-opaque claim is asserted here and then proven by the numbers below. Mild — flag rather than force; the assertion-then-proof is close enough to justify keeping if Justin wants the setup.

**Replace with:** Keep "They worked." as the punch; the second sentence is fine but the same idea is then *shown* by the OKLCH numbers two paragraphs down ("The relationship is visible in the numbers"). Consider cutting "But they only made sense..." since the demonstration that follows earns it.

**Decision:** Rewrite: They did the job.

### building-this-portfolio.md · 11. Generic transition restating the prior node  `FILLER`

> This is what makes this all more than a prompting strategy.

**Why:** Pass 3 formulaic transition: a connective topic-sentence that announces significance instead of stating it. The concrete constraint examples that follow do the work.

**Replace with:** (delete) — the sentences around it ("The Writer can't touch UI... constraints prevent drift") carry the point.

**Decision:** keep

**Protected (flagged, NOT cut):**

- Intro thesis throughline — "keep the intent, and the judgment behind it, unmistakably mine" and "The job is judgment" are the central intent/judgment belief (protection 2). Never cut; the judgment maxims elsewhere defer to this one.
- "the whole shebang" (The Structure), "all willy nilly" (The Process), "get lost in the sauce" (The Evolution), "aha moment" (The Structure), "the big one" (The Sprint), "cross your fingers" (The Process), "he was a real one" (The Evolution) — register-breakers, protection 1. Tempting to trim in a concision pass; off the table.
- "So we retired it. Not replaced. Retired. Threw it a party and everything." and "You build scaffolding so the building can stand on its own." — Phase 4 calibration anchors; the staccato repetition is deliberate voice, not redundancy. Keep intact even though it repeats 'retired.'
- "Next.js was a 3 star Michelin kitchen and I was making toast." — named-specific + deflation image; protection 4 (the '3 star Michelin' specificity is a deliberate Phase 4 upgrade). Keep.
- All metric blocks and hard numbers (48 hrs, 21 tokens, 4 layers, Lighthouse 100/above 96, the OKLCH coordinate values, hex values) — protection 4. Cut adjectives around them if any, never the numbers. The OKLCH coordinates are load-bearing proof for The Material, not filler.
- "Is it really what I intended to make." / "It wasn't good enough for what I wanted to convey." / "speak my intent into existence"-adjacent lines / "the intent intact" / "keeping my voice honest" — intent throughline, protection 2. These are exactly the thesis moments Phase 4 says to protect.
- "Enter the Field Notebook" / "Enter Perihelion" — Phase 4 'Enter X.' reveal openers; load-bearing, used sparingly across the piece as designed. Do not flatten even when trimming the runway before them.
- The named anti-reference list in The Material ("no template portfolios, no dev-bro dark mode, no agency scroll-jacking") and the Conservatory enumeration ("wabi-sabi and Danish mid-century craft, warm and lived-in instead of chrome and cold") — maximalist named lists, protection 3. Do not curate down.

---

## the-craft.md

*Solid, claim-dense page that mostly earns its keep on hard numbers and the light-mode story. The biggest concision wins are structural: the closing paragraph restates the opening thesis, and the accessibility paragraph front-loads a long spec checklist before reaching its actual point. Strip the puffery ("hums under the surface," "never an afterthought") and one "-ing"/parallelism tell and the page tightens without touching the voice.*

### the-craft.md · 1. Closing restates the opening thesis  `REDUNDANCY`

> The portfolio is the proof. Every token, every component, every case study section went through a process with human judgment at the helm and specialized agents doing the heavy lifting within their lanes. The result is a codebase that runs clean, a design system that is internally consistent, and a body of work that shows the thinking, not just the output.

**Why:** Reverse-outline pass: P1 already states 'a portfolio that claims to value quality has to prove it... with observable, measurable craft decisions.' P6 reopens with 'The portfolio is the proof' and re-summarizes the same claim. The middle 'human judgment at the helm and specialized agents doing the heavy lifting' is also covered by the the-process peek that immediately follows. Keep one concrete sentence, cut the thesis-echo and the brochure tricolon. Note: 'doing the heavy lifting' is a protected physical-work metaphor in the voice profile, so it stays in whatever survives.

**Replace with:** Every token, every component, every case study section went through a process with human judgment at the helm and specialized agents doing the heavy lifting within their lanes.

**Decision:** keep

### the-craft.md · 2. redundant materials/language sentence  `REDUNDANCY`

> A translucent linen texture draped over aged wood grain, both built from pure CSS gradients. The materials are different, but the design language is the same.

**Why:** Reverse-outline pass: the paragraph already says light mode 'needed its own material identity' and then names the Wallace-office materials. 'The materials are different, but the design language is the same' is a tidy It's-not-X-it's-Y parallelism (§9) restating the point the whole paragraph just made. The CSS-gradients fact is concrete and load-bearing; keep it, drop the closing aphorism.

**Replace with:** A translucent linen texture draped over aged wood grain, both built from pure CSS gradients.

**Decision:** keep

### the-craft.md · 3. Accessibility spec list buries its own point  `SCAFFOLDING`

> WCAG 2.2 AA compliance runs through every decision: heading hierarchy (one h1 per page, h2 to h3 in order, no skipped levels), focus rings on every interactive element, touch targets at 44px minimum, prefers-reduced-motion respected throughout, ARIA labels on icon-only buttons. The Lighthouse accessibility score targets 95+. But numbers are the bare minimum, not the ceiling.

**Why:** Reverse-outline / so-what pass: the paragraph's real point is the next sentence (the judgment calls), but it spends five spec items and a Lighthouse target getting there. For a hiring audience the table-stakes checklist (focus rings, 44px, reduced-motion, ARIA) is assumed; trim it to the load-bearing claim and let the judgment point land faster. Protected numbers (WCAG 2.2 AA, 44px, 95+) all stay — only the list sprawl gets compressed.

**Replace with:** WCAG 2.2 AA runs through every decision: heading hierarchy, focus rings, 44px touch targets, prefers-reduced-motion, ARIA on icon-only buttons. The Lighthouse target is 95+. But numbers are the bare minimum, not the ceiling.

**Decision:** keep

### the-craft.md · 4. "the answer was" framing scaffold  `SCAFFOLDING`

> It needed its own material identity. The answer was Niander Wallace's office from Blade Runner 2049: warm parchment, natural linen, amber light.

**Why:** Pass 2/6: 'The answer was' is throat-clearing between the question and the reveal. The colon already does the reveal work. Drop the connective and let the reference land directly. The Blade Runner reference and the material list are specifics — they stay.

**Replace with:** It needed its own material identity: Niander Wallace's office from Blade Runner 2049 — warm parchment, natural linen, amber light.

**Decision:** kep

### the-craft.md · 5. "never an afterthought" puffery opener  `FILLER`

> Accessibility was never an afterthought.

**Why:** So-what/prove-it pass: 'never an afterthought' is the accessibility version of brochure tone (§2) — every portfolio says it, it proves nothing, and the paragraph immediately proves the real claim with specifics. Cut it and open on the substance.

**Replace with:** *(delete)*

**Decision:** keep

### the-craft.md · 6. "hums under the surface" mood-copy  `FILLER`

> a circuit mesh texture that hums under the surface

**Why:** Read-aloud / brochure pass: 'hums under the surface' is atmosphere-copy describing the old dark mode, which is just setup for the light-mode point. The texture name carries the fact; the personification is decoration. Cut to 'a circuit mesh texture.'

**Replace with:** a circuit mesh texture

**Decision:** keep

### the-craft.md · 7. "-ing" tail with vague decorative list  `AI-TELL`

> that the decorative effects (particles, glows, grain) never interfered with content

**Why:** Pass 5 (-ing tails / read-aloud): this is the third item in a 'making sure... that... that...' run and the weakest — it asserts effects 'never interfered' with no specific. The first two judgment-call items (reading order, color-alone) are concrete; this one is filler riding the parallelism. Tighten or cut.

**Replace with:** that the decorative effects never compete with content

**Decision:** keep

**Protected (flagged, NOT cut):**

- P5 maximalist principle list ('Materials over decoration. Earned confidence. Atmospheric depth. Intentional restraint. Wabi-sabi craft.') — five named items where a tidier three would be tempting, but this is a protected maximalist named catalog. Leave the sprawl.
- P2 audit numbers ('31 components,' '13 issues: 1 critical, 3 high, 5 medium, 4 low,' 'missing focus-visible style on a nav link') — hard numbers + named specifics. The full severity breakdown reads long but every number is protected; cut none of them.
- 'specialized agents doing the heavy lifting within their lanes' — 'doing the heavy lifting' is the protected physical-work metaphor from Phase 3.1. Even where I compress the surrounding closing paragraph, this phrase survives.
- P1 thesis 'A portfolio that claims to value quality has to prove it. Not with words. With observable, measurable craft decisions.' — short-sentence emphasis rhythm and the central prove-it claim. Tempting to merge the fragments, but the metronome-break ('Not with words.') is deliberate voice. Keep.
- Lighthouse '95+', 'WCAG 2.2 AA', '44px' — numbers stay; I only cut adjectives/list-sprawl around them, per the protection.

---

## the-sound.md

*Solid voice and real specifics, but it runs long for a hiring read because of one redundant paragraph (P4 restates P3 + the callout) and a chain of three short scaffolding sentences in P3/P4 that read as a feature checklist rather than prose. Biggest opportunity: delete or fold P4, then tighten the "X is read-only, rate-limited, and free" / token-colors lines that already live elsewhere. The intent throughline is light here, so protect the music-as-material thesis and the register-breakers; everything else is fair game.*

### the-sound.md · 1. Delete P4 — it restates P3 and the callout  `REDUNDANCY`

> The widget is small but it touches every layer of the architecture. The API key is exposed client-side (read-only, low risk, documented in ADR-004). The polling is visibility-aware to avoid wasting requests. The design uses token colors exclusively. The frosted glass effect matches the header's existing backdrop-blur.

**Why:** Reverse-outline: this paragraph's job is already done. "Touches every layer" = P3's whole point. "Polling is visibility-aware" = P3's "polling hook... pausing when the browser tab is hidden." "Frosted glass matches the header" = P3's "frosted glass backdrop that matches the header surface." The only net-new fact is the client-side API key (ADR-004). Keep that one sentence, drop the rest.

**Replace with:** Keep only the load-bearing new fact, folded into P3: "The API key is exposed client-side (read-only, low risk, documented in ADR-004)."

**Decision:** keep

### the-sound.md · 2. Fold the three-sentence API spec into one line  `REDUNDANCY`

> Last.fm scrobbles every track across Apple Music, Sonos, and most other places I listen to music. The API is read-only, rate-limited, and free. A natural fit for a lightweight integration.

**Why:** So-what + rhythm: "read-only, rate-limited, and free" is a reflexive tricolon (tells §9) and "A natural fit for a lightweight integration" is a hollow restatement that adds nothing the prior sentence didn't earn. The scrobble-coverage fact (Apple Music, Sonos) is real and stays; the spec line can collapse.

**Replace with:** "Last.fm scrobbles every track across Apple Music, Sonos, and most other places I listen. The API is read-only and free, which makes it an easy fit."

**Decision:** keep

### the-sound.md · 3. Vision paragraph runs as a feature list  `REDUNDANCY`

> Listening history visualizations: genre maps, time-of-day patterns. DJ playlist mining that surfaces patterns across tempos and moods. A Last.fm MCP server that lets agents query "what has Justin been listening to this week?" and use the answer as creative context.

**Why:** Read-aloud: three fragment-sentences in a row, each a roadmap item, then the closer restates them as "the first node in a larger constellation." The list is fine as forward-look, but the metronome of identical fragments plus the abstract closer is one beat too many. Note: the named catalog here (genre maps, time-of-day, tempos, moods, MCP server) is borderline-maximalist and could be a protection; flagged rather than cut aggressively.

**Replace with:** Tighten to two beats and let the closer do the lift, or cut the closer (see next item). No hard delete of the named items.

**Decision:** reject

### the-sound.md · 4. Abstract closer restates the vision list  `FILLER`

> The widget is the first node in a larger constellation of music-as-material thinking.

**Why:** Pass 4 so-what: "first node in a larger constellation" is significance inflation (tells §1) and it restates the vision paragraph it follows. But the-material peek below makes the music-as-material thesis explicit, so this line is doing the same job twice. The peek lands it harder; this sentence can go.

**Replace with:** (delete) — let the-material peek carry the music-as-material thesis.

**Decision:** keep

### the-sound.md · 5. Filler intensifier on the origin clause  `FILLER`

> Visualizing the listening data is like giving the musical side of my life a more real presence.

**Why:** Pass 5: "a more real presence" is soft and abstract; the sentence is the thesis of P1 but the phrasing hedges it. Tighten to a concrete claim. Not a register-breaker, not protected.

**Replace with:** "Visualizing the listening data gives the musical side of my life a real, visible presence."

**Decision:** keep

### the-sound.md · 6. Spaced-hyphen em-dash substitute (x3)  `EM-DASH`

> I love all sorts of music - and finding new music is still something I love to do.

**Why:** Pass 2: `-` with spaces is an em-dash in disguise; the no-em-dash rule wants the sentence restructured, not the dash respelled. Three of these in P1 alone ("music - and finding", "world" clause, "20 years of memories and history - something I wanted to share").

**Replace with:** "I love all sorts of music, and finding new stuff is still one of my favorite things."

**Decision:** keep

### the-sound.md · 7. Spaced-hyphen em-dash substitute in P1 close  `EM-DASH`

> That's over 20 years of memories and history - something I wanted to share and use for my own wild ideas.

**Why:** Pass 2: same spaced-hyphen em-dash substitute. Restructure with a period or comma. "20 years" is a protected hard number; keep it, fix only the dash.

**Replace with:** "That's over 20 years of memories and history. I wanted to share it and use it for my own wild ideas."

**Decision:** keep

**Protected (flagged, NOT cut):**

- Register-breaker 'Xanga, anyone?' in P2 — a tonal release valve, the kind of mid-paragraph register-break that is the voice, not the fat. Never cut for length.
- 'over 20 years' and 'since 2005' / 'since 2010'-style hard numbers and dates in P1 — protected numbers. Cut the dash around them, never the number.
- Named system specifics: Last.fm, Apple Music, Sonos, ADR-004, M5 Max-style real names, the DecryptedText effect, prefers-reduced-motion, OKLCH — protected named specifics; they prove the craft to a hiring audience.
- The maximalist vision catalog (genre maps, time-of-day patterns, tempos, moods, MCP server query) — borderline maximalist-list territory; I proposed tightening the rhythm but did NOT cut any named item. The sprawl may be the point.
- the-material peek ('make the invisible structure visible') — this is the closest thing to the intent/expression throughline in the piece (music-as-material, structure made visible). Protected as the thesis close; my P4-closer cut routes the weight here on purpose.

---

## the-system.md

*Solid, concrete copy that mostly earns its claims through real mechanisms (L-channel math, token tracing, zero asset count). The biggest concision opportunity is the opening paragraph, which states its thesis three times before moving. Secondary: a few brochure-tone summary lines ("protects craft at scale," "owns every surface") that restate the mechanism just shown. No em-dash artifacts, no formulaic transitions. The intent throughline in the final paragraphs is load-bearing and protected.*

### the-system.md · 1. Opening paragraph restates thesis three times  `REDUNDANCY`

> It's a set of decisions that compound. Every token, every constraint, every naming convention is a decision that makes the next thousand decisions easier or harder. This system was built to make the hard decisions once and let everything else follow.

**Why:** Pass 1 reverse-outline: three consecutive sentences do the same job (decisions compound). The middle sentence's 'is a decision that' and the third sentence both restate the compounding thesis. Collapse the middle into the maximalist list it already contains (keep the 'every token, every constraint, every naming convention' triplet — that's the voice) and drop the redundant 'is a decision that makes' framing so the list lands directly on the consequence.

**Replace with:** It's a set of decisions that compound. Every token, every constraint, every naming convention makes the next thousand decisions easier or harder. This one was built to make the hard decisions once and let everything else follow.

**Decision:** keep

### the-system.md · 2. Summary line restating the zero-asset point  `REDUNDANCY`

> Zero external assets. The system owns every surface.

**Why:** Pass 1 / Pass 4. 'The system owns every surface' restates 'Zero external assets' (the textures lived in the token layer, no external files). The short declarative 'Zero external assets.' is the punch; the follow-on softens it into a slogan. Let the number-flavored fact land alone.

**Replace with:** Zero external assets.

**Decision:** keep

### the-system.md · 3. Meta-narration about the document being a snapshot  `SCAFFOLDING`

> The design system has evolved from when this was first written but it's preserved as a point in time reminder of how we started.

**Why:** Pass 2/3. This is the Phase-4 'temporal/evolution honesty' move Justin adds deliberately when copy describes a living system, so it is NOT a clean cut. BUT it sits awkwardly tacked onto the end of the thesis paragraph, interrupting the run into the concrete '21 tokens' open. If anything, relocate it to lead paragraph 2 or sit it as its own line; do not delete. Lower-confidence — listed so Justin can weigh placement.

**Replace with:** (keep — flagged only, see note)

**Decision:** Keep: give it its own line

### the-system.md · 4. Brochure summary line restating the mechanism  `UNEARNED`

> The system protects craft at scale.

**Why:** Pass 4 so-what/prove-it. The three sentences before it already prove the point concretely (audit checks tokens, Builder reaches for token classes, light mode changed only the token layer with zero component modifications). This closer adds no new idea and reaches for brochure abstraction ('at scale'). The 'Zero component modifications.' before it is the real landing. End on it.

**Replace with:** *(delete)*

**Decision:** keep

### the-system.md · 5. Filler adverb pair  `FILLER`

> The original three-font system was similarly constrained.

**Why:** Pass 5/6. 'similarly' is a slightly stiff connective doing transition work; 'the same way' reads in Justin's conversational-professional register and removes the faint textbook tone. Minor — meaning is identical.

**Replace with:** The original three-font system was constrained the same way.

**Decision:** keep

**Protected (flagged, NOT cut):**

- Intent throughline — final paragraph: 'It's the documented intent behind every visual decision' and 'the documented intent.' This is Justin's central design belief (faithful execution of intent) and the thesis landing of the whole page. Protected absolutely; tempting to trim the last two paragraphs for length, did not.
- Maximalist list — 'Every token, every constraint, every naming convention' and the anti-references catalog ('no template portfolios, no dev-bro dark mode, no agency scroll-jacking') and the five-item visual-decision sprawl (spacing 4px base, shadows sm-xl, border radii six values, textures). The named sprawl is the voice; did not curate to three.
- Hard numbers + named specifics — '21 OKLCH color tokens,' 'weight 400 only,' 'six values,' '4px base,' and the real font names (Podkova, Space Grotesk, Didact Gothic). Cut adjectives around them, never the numbers. 'a serif with personality, used sparingly' is a filler-ish gloss but it sits on a protected named specific, so left it.
- Register / declarative emphasis — short landing sentences 'That's not a preference.' and 'The math does the work.' and 'Zero component modifications.' These are Justin's stakes-landing declaratives (short sentence after a longer thought). Protected as rhythm; the read-aloud pass confirms they break the metronome on purpose.
- 'The math does the work.' — tempting as a slogan-y line under Pass 4, but it's a concrete payoff to the immediately-preceding mechanism (compare L-channel values / adjust the L channel) and a Justin-style declarative closer. Earned. Not cut.

---

## AboutPage.tsx

*This page is mostly load-bearing voice (two identity stacks, the hobby catalog + "And of course, Porsches," the three belief blocks, the "But NOT Skynet" close) — almost all of it is protected and should stay. The real concision lives in one paragraph: the AI-adoption block (para 3) is the only place with genuine redundancy and an abstract "when the interface starts thinking for itself" tail. A handful of filler modifiers and one puffery phrase in the meta description round it out. Biggest opportunity: tighten para 3 from two overlapping claims into one with the concrete mechanism kept.*

### AboutPage.tsx · 1. AI-adoption paragraph restates itself  `REDUNDANCY`

> I helped lead the AI adoption initiative across our design and product organization, building the training, the prototyping workflow, and the strategic framework for how design operates when the interface starts thinking for itself. The work I’ve been doing at Kiavi reflects that: embedding principles like decision versioning, human-in-the-loop review, and auditable AI directly into our products.

**Why:** Reverse-outline: two sentences doing one job. Sentence 1 says “I led AI adoption (training, workflow, framework)” and sentence 2 says “the work reflects that: embedding decision versioning, HITL, auditable AI.” The “reflects that” hinge is scaffolding — the second sentence IS the work, not a reflection of it. “when the interface starts thinking for itself” is a superficial atmospheric tail (§4) that adds mood, not information. Hard-cut audience wants the concrete framework + the three named principles, not the connective restating.

**Replace with:** I helped lead AI adoption across our design and product org — the training, the prototyping workflow, and the framework for how design operates around AI — embedding decision versioning, human-in-the-loop review, and auditable AI directly into our products. (restructure to drop the em-dashes: “I helped lead AI adoption across our design and product org: the training, the prototyping workflow, and the framework for how design operates around AI. That meant embedding decision versioning, human-in-the-loop review, and auditable AI directly into our products.”) Keep the three named principles — they’re hard specifics.

**Decision:** keep

### AboutPage.tsx · 2. “which is an interesting challenge in an equally challenging industry”  `FILLER`

> which is an interesting challenge in an equally challenging industry

**Why:** So-what/prove-it: a self-rated “interesting/challenging” clause names no specific challenge. The very next sentence (“a bad interaction isn’t just frustrating, it’s a compliance risk or a delayed closing” — a protected stakes-escalation) already proves the industry is hard, concretely. This clause front-runs the real proof with adjectives.

**Replace with:** (delete) — land on “We make complex things efficient and satisfying to use.” then go straight to the stakes-escalation sentence.

**Decision:** keep

### AboutPage.tsx · 3. “growing” / “deep-dive” stacked modifiers on the Archive  `FILLER`

> The Archive is a growing library of deep-dive research guides on frontier physics, UAP detection, and consciousness as technology.

**Why:** §5 over-modifying. “growing,” “deep-dive,” and “research” are three softening modifiers stacked on “library…guides.” The named topics (frontier physics, UAP detection, consciousness as technology) are the protected specifics and do all the work; the adjectives just pad. Cut one or two; “library of guides on …” is tighter and the topic list still lands.

**Replace with:** The Archive is a library of research guides on frontier physics, UAP detection, and consciousness as technology.

**Decision:** keep

### AboutPage.tsx · 4. “keep finding new projects to work on together” redundancy  `FILLER`

> which makes it easier to keep finding new projects to work on together. Right now we’re renovating the house and cultivating our backyard

**Why:** Read-aloud: “keep finding new projects to work on together” is an abstract promise that the very next sentence makes concrete (renovating, cultivating the backyard). Mild redundancy — the specifics are the projects. Lightest of the cuts; could collapse the abstract framing into the concrete. Flagged, not insisted; the warm rhythm here has voice value.

**Replace with:** which makes it easier to take on projects together. Right now we’re renovating the house and cultivating our backyard

**Decision:** keep

### AboutPage.tsx · 5. “seamlessly” in Perihelion description  `AI-TELL`

> a world seamlessly integrating technology, privacy, and nature

**Why:** §2 brochure tone — “seamlessly” is on the slop list (seamless/streamlined/elevate). It adds no information to “integrating technology, privacy, and nature”; the integration claim already implies it works. Note: the LIST itself (technology, privacy, nature) is protected maximalist voice and the “But NOT Skynet” close is protected — only the adverb goes.

**Replace with:** a world that integrates technology, privacy, and nature

**Decision:** keep

### AboutPage.tsx · 6. meta description puffery  `AI-TELL`

> Product design leader specializing in complex, human-centered systems. Currently focused on AI.

**Why:** §1/§2: “specializing in complex, human-centered systems” is generic LinkedIn-headline puffery — every design leader claims human-centered. So-what/prove-it: it names no domain or effect. This is meta description (SEO-facing, not on-page voice), so it’s fair game for a concrete-noun rewrite.

**Replace with:** Design leader at Kiavi working on AI-augmented lending tools. Lead of AI adoption across design and product.

**Decision:** keep

**Protected (flagged, NOT cut):**

- Identity stack #1 (“product and service designer, researcher, force multiplier, and collaborator”) + the six-industry list + “Lots of enterprise, tons of complexity, always tons to learn” — protected maximalist list + identity-stack voice. Tempting to trim the industry list to three; the sprawl is the point.
- The stakes-escalation sentence “the kind of products where a bad interaction isn’t just frustrating, it’s a compliance risk or a delayed closing” — protected stakes-escalation construction AND it carries the concrete proof for the paragraph. Off the table.
- “But NOT Skynet. Far out, right? Maybe, but maybe not.” — protected comic-deflation close + register, and sits at the future-vision (intent-adjacent) thesis. Never cut.
- Verb stack “I love to observe and listen, to question and hypothesize, to learn, and to iterate.” — protected verb-stack voice. Reads slightly catalog-y after a dense paragraph but it’s a signature shape; leave it.
- Identity stack #2 (“music and technology nerd, living room DJ, motorsports enthusiast…”) + “And of course, Porsches.” — protected identity stack + comic-deflation close.
- The full hobby catalog (“Talk to me about product design, art, music… or even cryptozoology. And probably a lot of other stuff too.”) — protected maximalist hobby catalog + deflation. Do not curate to a tidy list; the sprawl IS the move.
- All three belief blocks (bold aphorism + unpacking + true-reason close), including “The best AI tools make us work smarter, not harder. The worst ones make everyone equally sloppy.” and “design that excludes people isn’t design.” — protected belief-block template; the contrast closes are earned, not mechanical rule-of-three.
- “decision versioning, human-in-the-loop review, and auditable AI” — named system principles, hard specifics. Kept inside the para-3 rewrite; only the connective scaffolding around them is cut.
- “Carlos / Pistachio / Larry” named pets and “1950s ranch house” — named specifics; the warmth is the point. Not cut.

---

## HomePage.tsx

*The home page's prose lives mostly in three components (Hero, AboutSnippet, and the inline "Selected work" block); HomePage.tsx itself only owns the "Selected work" strings. The biggest concision opportunity is the hero stack: the kicker, H1, and subtitle all circle "product design leader / complex," and "blending human judgment with AI" is repeated verbatim in the hero and the meta description. The hero subtitle is the one piece carrying brochure tone that fails prove-it.*

### HomePage.tsx · 1. Hero kicker restates the subtitle's opening words  `REDUNDANCY`

> Product design leadership

**Why:** Pass 1 (reverse-outline). src/components/content/Hero.tsx: the mono kicker says "Product design leadership" and the subtitle three lines down opens "Product design leader turning...". Same job, two lines apart. The kicker already labels the role; the subtitle shouldn't re-announce it.

**Replace with:** (keep the kicker, but cut "Product design leader" from the subtitle below it -- see next cut)

**Decision:** keep

### HomePage.tsx · 2. "blending human judgment with AI" duplicated hero + meta  `REDUNDANCY`

> Blending human judgment with AI.

**Why:** Pass 1. The exact clause sits in the hero subtitle (Hero.tsx) and the Helmet meta description (HomePage.tsx line 37). A human reading source, or a crawler reading the snippet, hits the same phrase twice. Meta can keep it; the hero should earn its own words.

**Replace with:** (keep in the meta description for SEO; vary the hero phrasing so the page doesn't say the same clause twice)

**Decision:** keep

### HomePage.tsx · 3. "Selected work" intro second sentence is UX-obvious scaffolding  `SCAFFOLDING`

> Each entry opens the full spread.

**Why:** Pass 2/3 (scaffolding). HomePage.tsx lines 68-69. This tells the reader a list of links is clickable -- the affordance is obvious. Drop it and let "A short ledger of recent case files." stand alone.

**Replace with:** *(delete)*

**Decision:** keep

### HomePage.tsx · 4. Hero subtitle: brochure arc + duplicated kicker + repeated AI tagline  `UNEARNED`

> Product design leader turning complex problems into trusted experiences, blending human judgment with AI.

**Why:** Pass 4 (so-what/prove-it) + Pass 1. "Product design leader" duplicates the kicker. "turning complex problems into trusted experiences" is brochure tone (tells section 2) and is exactly the generic thoughtful-portfolio line the doctrine warns against -- it names no specific effect. "blending human judgment with AI" also appears verbatim in the meta description below, so it reads twice on one page. At minimum drop the leading "Product design leader".

**Replace with:** Turning complex problems into experiences people trust, blending human judgment with AI.  (or, more concrete: "Fifteen years turning complex systems into experiences people trust.")

**Decision:** Keep: Fifteen years turning complex systems into experiences people trust.

### HomePage.tsx · 5. H1 tricolon: middle term is the weakest (flag, low-confidence)  `FILLER`

> Making complex things clear, useful, and human

**Why:** Pass 5/6 (rhythm) + tells section 9 (rule of three). "useful" is the softest of the three and the most generic. Flagged because a reflexive tricolon is a mild AI tell, but the line is the page's one declarative display anchor and the three-beat rhythm carries it -- low-confidence cut.

**Replace with:** Optional: "Making complex things clear and human" -- but the triad is doing real rhythmic work, so this is a flag, not a strong cut. Keep if it sounds right read aloud.

**Decision:** 

**Protected (flagged, NOT cut):**

- Hero H1 "Making complex things clear, useful, and human" -- tempting to trim the tricolon to two beats (tells section 9), but it's the page's single load-bearing display line and the three-beat rhythm carries it; left as a flag only, not a hard cut.
- AboutSnippet maximalist industry list "healthcare, fintech, e-commerce, and enterprise tools" -- protection 3 (maximalist lists). Tempting to compress to "several industries," but Justin names every item by design; the sprawl is the voice. Not cut.
- AboutSnippet identity stack "product designer, researcher, and force multiplier" and H2 "Designer, technologist, builder" -- identity-stack structural template, the voice's self-introduction shape, not fat. Not cut.
- AboutSnippet "automation and human judgment have to coexist" -- touches the intent/judgment throughline (protection 2) and names a concrete tension rather than puffery. Not cut.
- Hard specifics "15 years" / "For the past 15 years" (AboutSnippet) -- protection 4 (hard numbers). Number stays; there are no surrounding adjectives to trim anyway.

---

## WorkPage.tsx

*This page carries very little prose and it's already lean — a kicker, an h1, a two-sentence intro, two dossier labels, and an SEO description. The only real concision opportunity is the intro paragraph's second sentence, which restates what a clickable index self-evidently does, plus a "case files" repetition between the intro and the section label just below it.*

### WorkPage.tsx · 1. "case files" repeats across intro and section label  `REDUNDANCY`

> A working index of case files spanning AI strategy, enterprise UX, and
>         design systems.

**Why:** Reverse-outline/redundancy pass. "case files" appears in the intro and again in the "Selected case files" dossier label a few lines below; the kicker is already "Field notebook." The conceit is signaled three times. Dropping it from the intro keeps the framing intact and tightens the line. Note: "working index" is doing real work (it's the field-notebook register), so keep it.

**Replace with:** A working index spanning AI strategy, enterprise UX, and design systems.

**Decision:** keep

### WorkPage.tsx · 2. Intro sentence 2 restates the obvious affordance  `SCAFFOLDING`

> Each entry opens to the full study.

**Why:** So-what/prove-it pass (HARD). A list of links to case studies self-evidently opens to the case studies; this is UX scaffolding narrating the interaction, not a claim a hiring reader needs. The first sentence already does the page's whole job. End on the last real point.

**Replace with:** *(delete)*

**Decision:** keep

### WorkPage.tsx · 3. "powered" is a filler modifier in the SEO description  `FILLER`

> Case studies in AI-powered enterprise product design.

**Why:** Filler/brochure pass. "AI-powered" is a near-cliché marketing compound. Low stakes since it's a meta description, not visible body copy — flagging it as optional. "AI-driven" or simply "AI in enterprise product design" reads less like a landing page. Minor; reject if the SEO phrasing is deliberate.

**Replace with:** Case studies in AI-driven enterprise product design.

**Decision:** keep

**Protected (flagged, NOT cut):**

- "Field notebook" kicker and "working index" — register-setting language for the Conservatory/Field Notebook composition, not fat. Left intact.
- "Featured case file" / "Selected case files" dossier kickers — these are the structural labels of the field-notebook conceit (DossierFrame kickers); the file-card metaphor is load-bearing, not redundancy to strip. Only flagged the one duplicate token in the intro, not the labels themselves.
- Case-study titles, subtitles, and heroMetric values — these render from core/content/case-studies (data, not prose authored in this file) and include hard numbers/named specifics; out of scope and protected regardless.

---

