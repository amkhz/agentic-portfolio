# AI Writing Tells

A working checklist distilled from Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) (WikiProject AI Cleanup), adapted for portfolio copy. Companion to `voice-profile.md`. The voice profile says what Justin's writing *is*; this says what to strip out when AI drafting leaks in.

## Read this first (the caveat that matters)

The source page is **descriptive, not prescriptive**. It's a field guide of patterns, not a rulebook. None of these tells prove AI authorship on their own. LLMs trained on human writing, plenty of humans write this way (especially inexperienced or corporate writers), and human and machine prose are converging as people absorb LLM habits.

So the goal isn't a clean detector score. It's that these patterns almost always signal *thin thinking dressed up as polish* (vague claims, borrowed authority, structure standing in for substance). Cut them because they make writing worse, not because a tool might flag them. Don't over-correct either: sanding off every one of these can flatten genuinely good writing into nervous, hedge-free mush. Use judgment.

A reference checklist like this one legitimately uses lists and headings. That's fit-for-purpose. The "lists where prose belongs" tell below is about *prose* dressed as bullets, not reference docs.

---

## 1. Significance inflation (puffery)

Inflating importance to sound profound without adding substance. The single most common tell.

Tells: "stands as a testament to", "plays a vital / pivotal / crucial role", "underscores the importance of", "a watershed moment", "leaves a lasting impact", "rich (cultural) heritage / tapestry", "deeply rooted".

Fix: state what the thing did, concretely. If you can't name the specific effect, the sentence is filler. Cut it.

## 2. Promotional / brochure tone

Reads like travel copy or a landing page, not a record of what happened.

Tells: "breathtaking", "must-visit", "stunning", "nestled in the heart of", "captivates users and stakeholders alike", "seamless", "streamlined", "elevate".

Fix: neutral, specific verbs. "Reduced review cycles by 40%" beats "streamlined the experience."

## 3. Borrowed authority (weasel attribution)

Citing an opinion to nobody in particular. Manufactures the look of sourcing with nothing behind it.

Tells: "some critics argue", "observers have noted", "industry reports suggest", "it is widely regarded".

Fix: name the source or drop the claim. If it's your own view, own it in first person.

## 4. Superficial "-ing" tails

A clause bolted onto the end of a sentence to add fake analysis. Usually starts with a participle.

Tells: "...highlighting the region's growth", "...reflecting a broader shift", "...underscoring its significance", "...emphasizing the need for".

Fix: delete the tail, or replace it with the actual mechanism or consequence.

## 5. Over-hedging

Every claim softened so nothing is ever wrong. Reads as risk-averse, never committed. (Already flagged in the voice profile; here for completeness.)

Tells: stacked "may / could / often considered / generally / tends to", "results may vary".

Fix: make the claim, or cut it. One qualifier where it's true, not three out of habit.

## 6. Formulaic transitions

Formal connectives used as crutches, applied to every register regardless of whether the logic needs them. They appear at several times the human rate.

Tells: "Moreover," "Furthermore," "Additionally," "Consequently," "That said," "On the other hand," opening consecutive sentences or paragraphs.

Fix: delete most of them. Use "and," "but," "so," or just start the sentence. Let the ideas carry the connection.

## 7. Hollow conclusions / section summaries

Essay-style wrap-ups that restate what you just read and add nothing.

Tells: "In conclusion," "In summary," "Overall," "At the end of the day," "Ultimately".

Fix: end on the last real point. If the closer doesn't add a new idea, it's not a closer.

## 8. The "Challenges and Future Prospects" template

A rigid section that opens "Despite its strengths, X faces challenges..." and closes on a vague optimistic flourish. The tell is the *formula*, not the mention of challenges.

Fix: write the specific tradeoff and the specific next step. Skip the symmetrical setup-and-uplift scaffold.

## 9. Negative parallelism & rule of three

Contrast and triads used mechanically for rhythm rather than meaning.

Tells: "It's not X, it's Y", "not only... but also", and reflexive tricolons ("clear, concise, and actionable", "identify, evaluate, and recommend").

Fix: keep them only where the contrast or the three items are real. One per page, not one per paragraph.

## 10. Formatting tells

- **Em-dash frequency and placement.** Used more than in comparable human writing, often where a comma, colon, or parenthesis fits better. (Voice profile already bans these.)
- **Bulleted bolded lead-ins that restate themselves.** "**Scalability:** the system scales easily." The body just repeats the bold term. Near-nonexistent in natural writing.
- **Excessive boldface.** Bolding key terms everywhere like a textbook. Bold sparingly, for genuine emphasis.
- **Title Case In Headings.** Prefer sentence case ("Key considerations for adoption").
- **Emoji as bullets or in headers.** 🚀 🧠 ✅ Cut entirely for portfolio copy.
- **Curly "smart" quotes** where straight quotes are expected, sometimes mid-markdown.
- **Lists where prose belongs.** Narrative chopped into bullets to look organized. If it's an argument, write the paragraph.
- **Metronome rhythm.** Uniform medium-length sentences, evenly spaced. Vary length deliberately; let a short one land.

## 11. Leftover artifacts (the most damning, and easiest to catch)

Dead giveaways that text came straight from a chat window unedited.

Tells: "Certainly!", "I hope this helps", "Sure, here's...", "let me know if", knowledge-cutoff disclaimers ("as of my last update", "while specific details are limited"), stray markdown asterisks, and unfilled placeholders or fill-in-the-blank prompt instructions.

Fix: read the whole thing top to bottom before it ships. These never survive an actual proofread.

## 12. Citation and fact integrity

Less relevant to portfolio prose, but worth a glance whenever a piece cites anything.

Tells: fabricated references, dead links, fake DOIs, ISBNs that fail checksum, confident specific claims with no verifiable source.

Fix: verify every external reference. Polished, confident prose is exactly where invented facts hide.

---

## One-pass edit order

When cleaning an AI-assisted draft, fastest path:

1. Search-and-kill leftover artifacts (§11) and em-dashes (§10).
2. Delete formulaic transitions and hollow conclusions (§6, §7).
3. Hunt puffery and brochure tone (§1, §2), replace with concrete specifics.
4. Find every vague attribution and "-ing" tail (§3, §4), name it or cut it.
5. Read aloud once. Where it sounds like a textbook, it probably is.
