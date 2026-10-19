## Selecta

I'm learning to DJ. The living room kind, not the festival kind, at least for now. And I came into it with a strange inheritance: over 20 years of scrobbles tracking everything I've listened to since 2005, a digital library north of 20,000 tracks, and a beginner's hands on the decks. The library knew more than I did. I wanted a way to build real, playable sets out of my own history, without pretending I already speak the language.

Enter Selecta. In sound-system culture, the selecta is the one who chooses the records; the deejay works the mic. That division of labor is the whole design. My agents select. I play.

The planning happened in one sitting, and it didn't look like a spec doc. My crew brought me decision boards: clickable options, a recommendation with reasoning attached, and honest costs on every path. Name, architecture, how candidates get matched against tracks I actually own, how I hand it a brief, where the math stops and taste begins. Every board ended the same way: my pick wins. Some of my picks were the recommendation. The best ones weren't.

::: callout The Elegant Move
Last.fm knows what I've loved for 20 years, but it has no idea what key anything is in. My DJ software knows the BPM and key of every analyzed track, but nothing about my history. Selecta bridges them: it mines two decades of listening for candidates, then cross-references my real library so every track arrives playable, with its actual tempo and key. The set list it hands me isn't a fantasy playlist. It's a crate.
:::

Then the build, which is the part I care about professionally. I didn't write this code. I directed it. The plan was decomposed into territories, and parallel agents built in separate worktrees with explicit boundaries: this task does not touch that file, deviations get reported with reasons, never made silently. Three waves of agents, nine pull requests, merged the same day, zero collisions. My job was reading their reports, catching the seams, and making the calls only I could make.

And those calls are where it got good. The system improved every time I interrupted it. I admitted I don't really talk like a DJ yet, and the intake became a guided conversation that teaches the lingo as it goes. I described tracks the way I actually describe them, funky Mizell grooves, nighttime bangers, Zamrock, fuzzy guitars, liquid drum and bass, and the vibe lexicon grew exemplars: I can point at five tracks, say "this is what I mean by jungle riddims," and it learns my language instead of making me learn its own. I asked to start sets by hand, picking the opening tracks myself, and it turned out the slot-and-lock design already supported that for free. I mentioned I'm a visual guy, and every set gained a board: a single local page with the energy arc drawn as a curve, the slots laid out like a cue sheet, and every transition scored and explained.

Halfway through the build I recounted my library and realized I'd underestimated it by more than three times. One message to an agent mid-flight, and the matching engine got rebuilt around candidate blocking before the mistake could ship. The performance test it wrote caught its own first attempt degenerating into a full-library scan. It fixed itself, and it showed the receipts.

::: callout Taste Stays in Charge
The sequencing math ships as code: the Camelot wheel, tempo compatibility, an energy arc validator. But none of it writes the running order. The agent sequences for tension and release, and the code referees the result, scoring every transition and explaining itself in plain language. Rule breaks are allowed. They just have to be named. That's the deal I want with every tool I use: it keeps me honest, and I keep the wheel.
:::

My favorite moment came at the end. Reviewing the finished board, I hit a wall every beginner hits: I didn't know what "a step on the wheel" meant. So I asked for a glossary. The agent that built the board picked the work back up, read the teaching guide another agent had written earlier that day, matched its voice, and shipped a collapsible glossary that defines every term the board uses. The tool I built to teach me DJing taught itself to explain its own vocabulary. That was clutch.

::: metrics One Day, Directed
- 1 day | From locked plan to merged system
- 9 PRs | Built by parallel agents, zero collisions
- ~10,800 | Lines shipped across 81 files
- 366 | Tests passing at the final merge
:::

The last piece isn't code. It's a session: my first real set, built in conversation, exported straight into my DJ software, with the board open in a tab and the notes teaching me why each transition works. The system is done. Now it starts learning what I mean.

::: peek the-sound
Selecta grows directly out of The Sound: the same 20 years of listening data, now cross-referenced against the library I play from.
:::
