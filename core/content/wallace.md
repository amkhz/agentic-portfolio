Most image models key off a sentence. You type "moody designer's studio at night," you get whatever the model believes that means. The control you have is a slot machine pull. Wallace is the tool I built to stop pulling. It's a compiler that runs Ideogram 4 locally on my own machine and turns design intent into a structured spec the model has to honor, so the picture I get back is the picture I directed.

## The Problem

Raster models are powerful and dumb in the same breath. They render gorgeous surfaces, then quietly fill every gap with their own defaults. Composition drifts. Palette drifts. The things you actually care about, where the headline sits, what color the light is, is up to what the model thinks "nice" means. My whole pitch with this portfolio is that I direct the work, so "I described it and crossed my fingers" is not the story to tell. I needed a finely tuned instrument, not just an image generator.

Hosted image tools meter you, train on you, and decide for you. The reference workflows from Impeccable leaned on GPT Image 2, which costs money per render and ships design intent to someone else's server. I wanted to test the loop on my own hardware, free to iterate as many times as the work needed.

## What Wallace Actually Is

Ideogram 4 has a quiet detail in its docs: the model was trained on captions in one exact shape, a structured JSON schema with a style block, a palette, and a compositional breakdown where every element carries a bounding box. Feed it a plain sentence and you're sampling out of distribution; it runs, just worse. Feed it the schema and you're speaking the language it actually learned.

So Wallace is a compiler. It takes the way I already talk about design, composition, hierarchy, palette, mood, typography, and translates that into the schema the model expects. Background before elements. Palette as literal hex values, pulled straight from the design tokens when the work is for this repo. Every object is placed with a normalized bounding box, origin top-left, y before x. The model's hosted "magic prompt" expander gets replaced by something grounded in my vocabulary and my tokens instead of a generic house style.

The judgment is in the constraints, not the cleverness. Lock the composition and vary only the palette. Lock the palette and vary only the light. Keep the seed fixed so a change shows you exactly what it changed. Now we're playing with a design instrument and not a dice roll: you can move one variable and read the result.

## The Caption Is the Spec

Every render saves its caption beside the image as a sidecar, so the next step in the pipeline reads the spec (palette hexes, headline copy, layout regions) instead of reverse-engineering pixels.

That's important because Wallace doesn't work alone. It sits inside my Impeccable design loop as the free local stand-in for the hosted tools: north-star mockups, brand plates, asset regeneration. One locked style block runs across a whole set so the images read as one designed system rather than a pile of pretty one-offs. The compiler enforces the thing a brand needs most and a raster model respects least: consistency.

## The Proof Is This Portfolio

I didn't build Wallace to talk about it. I built it to make a decision. When this portfolio needed a new visual direction, I used Wallace to render four full north-star directions, monograph, atelier, field notebook, and a tech-and-nature conservatory, as finished hero images rather than mood boards. Eight heroes, fixed seeds, captions saved per image, about seven minutes per render on my M5 Max.

![A designer's atelier at night within a biophilic habitat, warm brass light over a workbench of optical instruments, one of the four north-star directions Wallace rendered](/images/wallace-atelier.png)
*The atelier direction, rendered by Wallace as a finished hero rather than a mood board. The instrument on the bench is the kind of object the schematic marks across this site abstract.*

Seeing the directions fully realized gave me the power to speak my intent into existence. The conservatory thesis got rejected in its first cut because the renders read as post-apocalyptic instead of inhabited, and I could see that precisely because the image was specific enough to be wrong and I understood what I needed to change. I re-cut the caption, demoted the green to a sage accent, brought the warmth up, put the instrument back in active use, and the direction landed. That whole conversation happened in the schema, one variable at a time. Renders fed straight into the visual-direction decision record. My tools authored the evidence the call was made on.

## Results

::: metrics What it changed
- 4 directions | Rendered as finished heroes, not mood boards | brass
- 1 variable | Changed per iteration, seed held fixed
- $0 | Per render, fully local on the M5 Max | magenta
- 1 spec | Caption saved beside every image as the source of truth
:::

The real outcome isn't a folder of renders. It's that I turned a model that wants a sentence into an instrument that takes direction. The portfolio you're reading made its visual call on evidence this tool produced, and every one of those renders can be reconstructed from the spec that made it. That's what I care about: not generating images, but building the thing that lets a designer stay in charge of how their intent is expressed.
