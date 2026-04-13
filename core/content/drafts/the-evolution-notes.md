# The Evolution: Writer Notes

## Voice Choices
- First person, Justin's voice: conversational-professional, contractions, short punchy closers after longer thoughts
- Problem-first opening ("didn't start as a crew") rather than leading with "I"
- No em-dashes anywhere
- Avoided corporate language, hedging, and neat lesson-wrapping
- Used rhetorical questions sparingly to match Justin's natural rhythm

## Structure Choices
- Opens with the Builder as origin story, which gives the node narrative momentum
- Callout block for the Builder's highlight reel: honors its contributions without breaking flow
- Middle section covers the retirement mechanism (ecosystem absorbing the role)
- Closes with the meta-insight: this is about organizational design, not just prompting
- Two peek connections to the-process and the-structure

## Suggested Peek Connections
- **the-process** (required): the crew coordination story, which this node extends
- **the-structure**: the four-layer architecture that enabled role separation
- Optional: **the-craft** could peek back to this node ("Quality gates that enforce themselves")

## Suggested Constellation Position
- Thematically closest to the-process but represents a meta-layer above it
- Suggested fixedPosition: `{ x: 0.65, y: 0.70 }` -- between the-process and the-craft, slightly left
- Positions it as a bridge between how the crew works (Process) and what quality looks like (Craft)
- Size: `md` (matches other shipped narrative nodes)
- Status: `shipped` once integrated

## Suggested Node Definition
```ts
{
  id: 'the-evolution',
  title: 'The Evolution',
  inscription: 'The crew that built itself out of a job.',
  size: 'md',
  status: 'shipped',
  connections: ['the-process', 'the-structure', 'the-craft'],
  fixedPosition: { x: 0.65, y: 0.70 },
}
```

## Integration Steps (for Tyrell)
1. Add the node content block to `core/content/building-this-portfolio.md`
2. Add the node definition to `core/content/constellation.ts`
3. Update the-process peek connections to include the-evolution
4. Consider adding a peek from the-craft back to the-evolution
5. Run lint + build to verify
