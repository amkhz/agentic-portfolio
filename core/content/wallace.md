Most image models want a sentence. You type "moody designer's studio at night," you get whatever the model already believes that means. The control you have is the control a slot machine gives you: pull again. Wallace is the tool I built to stop pulling. It's a compiler that runs Ideogram 4 locally on my own machine and turns design intent into a structured spec the model has to honor, so the picture I get back is the picture I directed.

## The Problem

Raster models are powerful and dumb in the same breath. They render gorgeous surfaces, but they take a paragraph of prose and quietly fill in every gap with their own defaults. Composition drifts. Palette drifts. The thing you actually care about, where the headline sits, which chair grounds the frame, what color the light is, gets averaged into the model's idea of "nice." For a portfolio whose whole pitch is that I direct the work, "I described it and hoped" is the wrong story. I needed an instrument, not a vending machine.

There was a practical layer too. Hosted image tools meter you, train on you, and decide for you. The reference workflows here leaned on GPT Image 2, which costs money per render and ships your intent to someone else's server. I wanted the loop on my own hardware, free to iterate as many times as the work needed.

## What Wallace Actually Is

Ideogram 4 has a quiet detail in its docs: the model was trained on captions in one exact shape, a structured JSON schema with a style block, a palette, and a compositional breakdown where every element carries a bounding box. Feed it a plain sentence and you're sampling out of distribution. It runs, just worse. Feed it the schema and you're speaking the language it actually learned.

So Wallace is a compiler. It takes the way I already talk about design, composition, hierarchy, palette, mood, typography, and translates that into the schema the model honors. Background before elements. Palette as literal hex values, pulled straight from the design tokens when the work is for this repo. Every object placed with a normalized bounding box, origin top-left, y before x. The model's hosted "magic prompt" expander gets replaced by something grounded in my vocabulary and my tokens instead of a generic house style.

The judgment is in the constraints, not the cleverness. Lock the composition and vary only the palette. Lock the palette and vary only the light. Keep the seed fixed so a change shows you exactly what it changed. That's the difference between a design instrument and a dice roll: you can move one variable and read the result.

## The Caption Is the Spec

Every render Wallace produces saves its caption next to the image as a sidecar. The picture isn't the source of truth, the spec is. The palette hexes, the literal headline copy, the layout regions all live in a file the next step in the pipeline reads directly instead of reverse-engineering the pixels.

That matters because Wallace doesn't work alone. It sits inside my Impeccable design loop as the free local stand-in for the hosted tools: north-star mockups, brand plates, asset regeneration. One locked style block runs across a whole set so the images read as one designed system rather than a pile of pretty one-offs. The compiler enforces the thing a brand needs most and a raster model respects least: consistency.

## The Proof Is This Portfolio

I didn't build Wallace to talk about it. I built it to make a decision. When this portfolio needed a new visual direction, I used Wallace to render four full north-star directions, monograph, atelier, field notebook, and a tech-and-nature conservatory, as finished hero images rather than mood boards. Eight heroes, fixed seeds, captions saved per image, about seven minutes a render on the M5 Max.

Seeing the directions fully realized is what let me actually choose. The conservatory thesis got rejected in its first cut because the renders read as post-apocalyptic instead of inhabited, and I could see that precisely because the image was specific enough to be wrong. I re-cut the caption, demoted the green to a sage accent, brought the warmth up, put the instrument back in active use, and the direction landed. That whole conversation happened in the schema, one variable at a time. The renders fed straight into the visual-direction decision record. The tool authored the evidence the call was made on.

::: callout The shift
A raster model gives you surfaces. A compiler around it gives you direction. The win isn't that the images look good, it's that I can say why this one and not that one, and prove it with the spec that produced it.
:::

## Results

::: metrics What it changed
- 4 directions | Rendered as finished heroes, not mood boards | brass
- 1 variable | Changed per iteration, seed held fixed
- $0 | Per render, fully local on the M5 Max | magenta
- 1 spec | Caption saved beside every image as the source of truth
:::

The real outcome isn't a folder of renders. It's that I turned a model that wants a sentence into an instrument that takes direction. The portfolio you're reading made its visual call on evidence this tool produced, and every one of those renders can be reconstructed from the spec that made it. That's the move I care about: not generating images, but building the thing that lets a designer stay in charge of them.
