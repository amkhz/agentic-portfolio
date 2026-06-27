---
title: Five ways I work
date: 2026-06-26
kicker: Field note
summary: People ask how building with AI changed the way I work. The tools changed; the principles underneath just got sharper. Here are five that hold up.
---

So how has all this AI stuff changed how I work? Honestly, the principles underneath didn't change much. But they did get sharper. When making gets cheap, the way you decide what to make becomes a whole lot more important than before. Here's five things that matter to me today.

## 1. Treat the agent like a teammate, not a vending machine

A vending machine takes a prompt and hands back output. A teammate co-creates the plan, thinks out loud, and pushes back when you're wrong. I work the second way for a reason. Our agent has a name, a voice, and a written working agreement, and the agreement literally says to treat the human as a collaborator, not a customer. Not everyone likes to humanize their AI agents but I do. I think it helps me express my creativity in a way that I've never quite had before. I tell it to push back when my ideas are weak, and I argue right back when its ideas are. It helps me reframe thinking when I'm stuck in my head. Maybe that's a waste of tokens but I'm happy with my results so far.

I still talk to my human teammates too, don't get me wrong. But when it's just me and a side project, it's been a real force multiplier.

## 2. Research first, then go bold

The sequence I trust for any redesign is brief, then bold. Ground the move in evidence first: what's the real problem, who has it, what's already there. Then make a strong and opinionated choice. Bold without the research is just vibes, and vibes don't survive contact with a real user. Research without the bold move is a report nobody remembers. You need both, in that order.

## 3. Write the decision down

The moment a decision has consequences, I reach for a decision record. Not a doc nobody reads, a short dated note: what we chose, what we considered, why. A growing stack of them now governs a design repo, which is not where most people expect to find architecture decision records. They turn "why did we build it this way?" from a Slack thread into a handy link to a markdown file. Future-you is the main beneficiary, and so is everyone who inherits the repo.

## 4. Extend before you invent

Before building something new, I look hard at what's already there. Existing chrome over a net-new card. Native CSS over a new library. When there's a real gap, it gets documented in a decision record instead of papering over it. Inventing feels productive and quietly doubles what you have to maintain. Most of the time the better move is to extend what's already earning its keep.

## 5. Build the workflow, then run it

When a task repeats, like screen polish, a brand application, a doctrine audit, I stop doing it by hand and encode it into a reusable harness so it runs the same way every time. A recent example: instead of polishing twenty-one mission critical borrower screens one at a time and hoping for consistency, I built a paste-able workflow that audits, sketches every state, checks the copy at sketch time, and flags what needs backend or legal check-ins before anything ships. A backend freeze didn't stall the work, because the harness let me build every state inert and keep shipping PRs for the parts that were ready. Build the machine once, run it many times.

None of this is really about the tools. The tools just made the principles matter more.
