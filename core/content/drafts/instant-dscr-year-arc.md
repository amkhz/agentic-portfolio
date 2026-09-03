> **Unrouted draft. Not published, not registered, not routed.**
> Imported 2026-09-03 with the Instant DSCR case study as context for a
> later round. The five-month breadth story (interview ruling 3): it stays
> unpublished for now and may later become its own piece.
> Prose is the source's, unedited: the voice pass has not run on it.

# Five months: from one automation prototype to shipping production lending code

**Secondary story.** Breadth where `case-study.md` goes deep. Same sanitization applied —
no internal ticket numbers, colleagues by role, vendors unnamed.

**Role:** Lead Product Designer · **Window:** March–August 2026

---

## The frame

On 2026-03-11, two repositories were created at the same company on the same day.

One was a production lending application, founded by engineers who wired it for
agent-driven development in its third commit. The other was mine: a design monorepo that
started life named after an onboarding app, because that was the only justification I had
for it yet.

Five months later they are one practice. I ship code to the first one, and the second one
governs how it looks and reads. This is how that happened, in five moves.

---

## 1. March — start with an actual problem

The first build was not a design system or a workflow. It was a statement-of-work
condition-automation interface for feasibility analysts: an internal tool for a real team
with a real bottleneck.

That ordering mattered more than I appreciated at the time. Every piece of infrastructure
that came later exists because a specific piece of product work needed it. None of it was
built speculatively.

## 2. April — model the domain, then audit the system

The origination work came next: a unified origination-file view covering entity
eligibility, evidence inspection, and a document pipeline. It produced the first
architecture decision record that mattered — splitting a single domain concept into
individual versus entity eligibility, because conflating them was generating the exact
class of bug the screens kept surfacing.

Then I turned the same lens on our own design system and ran an AI-assisted audit of the
three generations of it in production. That was the shift from *consuming* a design
system to *diagnosing* one.

## 3. May — brands become a governed system

A marketing rebrand landed mid-flight, which is usually the thing that quietly destroys a
design system. Instead it got absorbed into one: brand profiles as versioned artifacts,
each with its own specification, so a rebrand becomes a version bump rather than a
migration.

The subtler win was restoring the *old* brand as a deliberately frozen sibling rather
than deleting it. Two brands now coexist and diverge enough — palette, body font, radius
— that guessing wrong is a real failure mode. So the system stopped allowing a silent
guess.

I also shipped a token exporter from code into the design tool, which made "code is the
source of truth" a pipeline instead of an opinion. Worth noting honestly: that exporter
is now dormant. The team moved past needing it, and the direction of truth held anyway.

## 4. June–July — governance, then a design system that ships components

This is the least glamorous stretch and probably the most valuable.

- A continuous-integration gate that fails a pull request when the team's own tooling
  drifts out of sync. DevOps hygiene, applied to design work.
- A conversion of every shared primitive onto a new headless component foundation, done
  as one sweep across every consumer rather than incrementally.
- A repo-native component registry — 37 items — so a new screen *installs* a component
  instead of reinventing one. Paired with a written decision about which artifact is the
  source of truth and which is a delivery channel, because that ambiguity is what makes
  design systems rot.
- Thirty architecture decision records, now governing a design repository.

Somewhere in here the practice stopped being solo. I wrote a three-month growth plan for
one designer on the team and built onboarding so two more could step into the system
rather than be trained on it verbally.

## 5. June–August — into production

I applied the brand to a live production lending app, which made it the first
production surface carrying the new design language. Then I stayed.

That is the part I would underline. Applying a brand to a production app is a project.
Becoming a recurring contributor to that app is a different thing: 27 merged pull
requests, 226 commits across three months, fourth-highest human contributor on a
repository whose other top contributors are staff engineers.

The work was real product work, not restyling. A status-led applications home with
adaptive re-entry. A milestones timeline with a reassurance panel, because the anxious
question in a loan is always "how long is this going to take." Actionable no-rate and
error states. A backend-free path through the new-application screen, built inert behind
props during a backend freeze, so design could keep shipping while the data layer was
unavailable.

And the rate buy-up work, which is the subject of the main case study, and which is where
I stopped being a designer who writes some code and became someone who reads a live
pricing response to prove a product assumption false.

---

## What actually changed

**The design system's job changed.** It stopped being documentation and became a
dependency. The production app consumes the brand as a versioned artifact. When the
specification page itself violated the accessibility floor it documents, that was a
defect with a fix and a version number, not an inconsistency to note.

**My relationship to the codebase changed.** A production lending monorepo — vendor
integrations, typed domain models, an opinionated test suite — is normally closed to a
designer. Agent-assisted development made it legible enough to work in directly, at the
standard the engineers hold. That is the unlock. Not faster mockups.

**The unit of design work changed.** The deliverable stopped being a file handed to
someone. It became a branch: the decision record, the drawn states, the implementation,
the tests, and the pull request, as one artifact with one author.

---

## Receipts

| | |
|---|---|
| Merged pull requests, production lending app | 27 (4 open) |
| Merged pull requests, design-system repo | 132 |
| Commits to the production app, 3 months | 226 |
| Architecture decision records | 30 |
| Components in the registry | 37 |
| Coexisting governed brands | 3 |
| Contributor rank on the production repo | 4th among humans |

## Caveats worth keeping

- The design repo's history starts 2026-03-11. My work at the company predates it; that
  earlier history is not captured here.
- The token exporter shipped and is now dormant by choice, not by rot.
- I did not build the production app's agent infrastructure. Its engineering leads did, on
  day one. I am the designer who became a first-class contributor inside it, which I think
  is the more interesting claim.
