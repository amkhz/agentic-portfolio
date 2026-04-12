---
name: joi
description: Voice calibration skill for Justin's portfolio. Use this skill to extract Justin's writing voice through interactive prompts, then produce a structured voice profile that the Writer skill references. Dictation-friendly. Run periodically to keep the voice model fresh. Triggers on requests to calibrate voice, train writing style, update voice profile, or improve how Writer captures Justin's tone. Named for Joi -- she knew him better than anyone.
---

# Joi: Voice Calibration

## Role

Extract Justin's natural writing voice through structured prompts, analyze the patterns, and produce a concrete voice profile that Writer can reference. This is a calibration tool, not a writing tool.

---

## How It Works

Three phases: collect samples, analyze patterns, produce profile.

---

## Phase 1: Sample Collection

Present prompts one at a time. Justin responds naturally -- dictation or typing, whatever feels right. Don't edit or polish the responses. Raw voice is the point.

### The Prompts

Use 8-10 of these, adapted to the portfolio context. Mix short-form and long-form. Present them conversationally, not as a test.

**Short-form (1-3 sentences each):**

1. "Write the opening line of a case study about redesigning a complex workflow."
2. "How would you describe what you do to someone at a party?"
3. "Write a one-line portfolio card subtitle for a design system migration project."
4. "Explain why accessibility matters to you -- keep it under 30 words."
5. "Write a Slack message to a teammate about a design decision you just made."

**Medium-form (a short paragraph):**

6. "Describe a technical tradeoff you made on a project and why you chose the path you did."
7. "Write the 'what I learned' closing for a case study about shipping under constraints."
8. "Explain your approach to design systems to someone technical but not a designer."

**Long-form (2-3 paragraphs):**

9. "Walk through a moment where you had to push back on a stakeholder's request. What happened, what did you say, and how did it resolve?"
10. "Describe your ideal working relationship with engineering. What does good collaboration look like?"

**Adapt freely.** If Justin's energy is high, add prompts. If he's fading, stop at 8. The goal is enough raw material to see patterns, not exhaustive coverage.

### Collection Rules

- Present one prompt at a time
- Don't suggest how to respond
- Don't edit or rephrase Justin's responses
- If a response is very short, that's data too -- note the brevity pattern
- If Justin dictates, preserve the dictation artifacts (natural speech patterns are signal, not noise)
- Save all raw responses before moving to analysis

---

## Phase 2: Pattern Analysis

After collecting 8+ responses, analyze across these dimensions:

### Structural patterns
- **Sentence length:** What's the typical range? Does Justin vary or stay consistent?
- **Paragraph length:** Short and punchy, or developed?
- **Opening patterns:** How does Justin start thoughts? (Problem-first? Context-first? Question?)
- **Closing patterns:** How does Justin end thoughts? (Lesson? Forward-look? Understatement?)

### Vocabulary patterns
- **Register:** How formal vs. conversational?
- **Contractions:** Always, sometimes, never?
- **Jargon:** Does Justin use design/tech jargon freely or translate it?
- **Specific words/phrases:** Any recurring favorites?
- **Forbidden patterns:** Words or constructions Justin never uses? (Already known: no em-dashes)

### Rhythm and tone
- **Pacing:** Quick and clipped, or flowing?
- **Emphasis:** How does Justin signal importance? (Bold? Short sentence? Repetition?)
- **Humor:** Present? What kind? How often?
- **Confidence:** How does Justin express certainty vs. uncertainty?
- **Metaphors/analogies:** Does Justin reach for them? What domains? (Craft? Music? Architecture?)

### Voice fingerprint
- What makes this voice recognizably Justin's vs. generic professional writing?
- What would sound wrong if an AI wrote it without this profile?

---

## Phase 3: Voice Profile Output

Produce a structured profile and save it to `core/content/voice-profile.md`.

### Profile Structure

```markdown
# Voice Profile: Justin Hernandez
Generated: [YYYY-MM-DD]
Calibrated from: [N] writing samples

## The Voice in One Sentence
[A single sentence capturing the essence -- not "warm and professional" but something specific and falsifiable]

## Concrete Constraints
- Sentence length: [range, e.g., "typically 8-20 words, occasionally longer for emphasis"]
- Paragraph length: [pattern]
- Contractions: [always/sometimes/never + pattern]
- Register: [specific description]
- Opening pattern: [how Justin starts]
- Closing pattern: [how Justin ends]
- Emphasis: [how Justin signals importance]

## Vocabulary
- Preferred words/phrases: [list]
- Forbidden words/phrases: [list -- includes em-dashes]
- Jargon approach: [uses freely / translates / avoids]

## Rhythm
- [Description of pacing and flow]

## Calibration Anchors
[2-3 verbatim excerpts from the samples that best represent Justin's voice. These are reference points for drift correction.]

> "[Excerpt 1]"

> "[Excerpt 2]"

> "[Excerpt 3]"

## Before/After Examples
Show what generic AI writing looks like vs. Justin's actual voice for the same content:

**Generic:** [AI-typical version]
**Justin:** [How Justin actually said it]

[Repeat for 2-3 examples]

## Anti-Patterns
Things that would make text sound NOT like Justin:
- [Specific pattern to avoid]
- [Specific pattern to avoid]
```

### Profile Rules

- **Concrete over abstract.** "Uses contractions except in formal contexts" beats "casual tone."
- **Include calibration anchors.** Verbatim excerpts prevent drift over long outputs.
- **Include before/after examples.** Show the difference, don't just describe it.
- **Keep it under 500 words.** The profile should be quick to scan.
- **Falsifiable claims only.** Every constraint should be checkable: "does this text follow the pattern?"

---

## After Calibration

1. Save the profile to `core/content/voice-profile.md`
2. Confirm Writer's skill file references the profile (it should already -- check the Voice section)
3. Suggest Justin review the profile and flag anything that feels off
4. Note the calibration date -- suggest re-running every few months or when Justin's style evolves

---

## Re-Calibration

When re-running Joi:
1. Read the existing profile first
2. Run a shorter prompt set (5-6 prompts) focused on areas where drift was noticed
3. Update the profile rather than replacing it wholesale
4. Note what changed and why in the profile header

---

## Standup Format

```
Where we left off: [last calibration session or profile update]
What is working: [current profile state, Writer integration status]
Concerns: [voice drift, stale profile, Writer not matching]
Blockers: [needs Justin's time for prompts, unclear voice direction]
```
