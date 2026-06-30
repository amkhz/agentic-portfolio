Most image models start with a sentence. You type "moody designer's studio at night," you get whatever the model believes that means. The control you have is trying to stitch together the idea in your head by writing some convoluted prompt. Wallace is the tool I built to visualize my imagination. He's a compiler that runs Ideogram 4 locally on my own machine and turns design intent into a structured spec the model has to honor, so the picture I get back is the picture I directed.

## The Problem

Raster models are powerful and dumb at the same time. They render gorgeous surfaces, then quietly fill every gap with their own defaults. Composition drifts. Palette drifts. The things you actually care about, how a scene feels, what color the light is, is up to what the model thinks "nice" means. My whole pitch with this portfolio is that I direct the work, so "I described it and crossed my fingers" is not the story to tell. I needed a finely tuned instrument, not just an image generator.

Hosted image tools meter you, train on you, and decide for you. They cost money per render and ship your design intent off to someone else's server. I wanted to run the loop on my own hardware, free to iterate as many times as the idea needed, with nothing leaving the room.

## Where Wallace Came From

I'll be honest: for a long time I felt kinda weird about AI-generated images. Most of what I'd seen was slop, average and soulless, and at its worst, a direct copy of someone else's work. So image generation was never really on my radar. If I was ever going to make images, I wanted to actually direct them, not gamble on them.

I also wanted to learn how to run local models on my own machine. I've wanted that for a while, to run all sorts of models, and I'd been hunting for an excuse to put the full weight of my M5 Max to work and learn how this stuff runs for real.

Then a few things lined up. I read a [case study from Impeccable](https://impeccable.style/designing/), the design-skill suite I love to build with, and its Neo Mirai example: a whole fictional design conference conjured out of a structured workflow. I thought it was really close to what I'd always wanted. The catch was it leaned on a hosted image tool I'd have to pay for, and I already pay for Claude. I'm not about to pay for a second model if I don't have to. Right around then, by chance, I read that Ideogram had opened the weights to Ideogram 4. Free, local, and genuinely good. There was my excuse.

Underneath the practical stuff was the real reason. I've always dreamed about being able to fully express the things in my head, to get what I see in there out into the world intact. If I could get one of these models to translate what I imagined, faithfully, I'd be a little closer to that. And it'd be even better if I could drop it straight into the Impeccable workflow I'd already built into this portfolio.

So I built him. I told Tyrell, my builder agent, what I wanted, and we worked it into a skill together. I even asked Tyrell which character from the Blade Runner universe should lend the name. Enter Wallace.

Our first project together was rebuilding that same Neo Mirai conference, the thing that set this off. It wasn't exactly one to one. But it was good enough, and for the first time I'd spoken my stuff into existence on my own machine. From there we set out to redesign this whole portfolio together, and another replicant joined the crew.

## What Wallace Actually Is

Ideogram 4 has a quiet detail in its docs: the model was trained on captions in one exact shape, a structured JSON schema with a style block, a palette, and a compositional breakdown where every element carries a bounding box. Feed it a plain sentence and you're sampling out of distribution; it runs, just worse. Feed it the schema and you're speaking the language it actually learned.

So Wallace is a compiler. He takes the way I already talk about design, composition, hierarchy, palette, mood, typography, and translates that into the schema the model expects. Background before elements. Palette as literal hex values, pulled straight from the design tokens when the work is for this repo. Every object is placed with a normalized bounding box, origin top-left, y before x. The model's hosted "magic prompt" expander gets replaced by something grounded in my vocabulary and my tokens instead of a generic house style.

The judgment is in the constraints, not the cleverness of a prompt. Lock the composition and vary only the palette. Lock the palette and vary only the light. Keep the seed fixed so a change shows you exactly what it changed. Now we're playing with a design instrument and not a dice roll: you can move one variable and see the result.

::: callout The engine underneath
The compiler is the part I had to think about a little longer. Something still has to run the weights on my own machine, and that part is [MFLUX](https://github.com/filipstrand/mflux), an MLX-native engine that drives the model straight on my Mac's GPU. Wiring it into the skill was its own small job. Ideogram 4 only runs on one exact path. The model ships a single text encoder where the usual setup expects two, so the default command just crashes. The skill reads the live runtime instead of trusting the docs, so the only flags it reaches for are the ones that actually work on this machine.
:::

I wrote Wallace so I could move him to my Windows machine and run him on CUDA if I ever wanted to, and I built scripts that sync upstream so my compiler and pipeline stay current as the model shifts underneath them. He's built to outlive any one machine or any single version of the model.

## The Caption Is the Spec

Every render saves its caption beside the image as a sidecar, so the next step in the pipeline reads the spec (palette hexes, headline copy, layout regions) instead of reverse-engineering pixels.

That's important because Wallace doesn't work alone. He sits inside my Impeccable design loop as the free local stand-in for the hosted tools: north-star mockups, brand plates, asset regeneration. One locked style block runs across a whole set so the images read as one designed system rather than a pile of pretty one-offs. The compiler enforces the thing a brand needs most and a raster model respects least: consistency.

## The Proof Is This Portfolio

I didn't build Wallace to talk about him. I built him to make a decision. When this portfolio needed a new visual direction, I used Wallace to render four full north-star directions, monograph, atelier, field notebook, and a tech-and-nature conservatory, as finished hero images rather than mood boards. Eight heroes, fixed seeds, captions saved per image, about seven minutes per render on my M5 Max. Dropping a direction I didn't like cost nothing but render time, no sunk money to talk me out of it.

![A designer's atelier at night within a biophilic habitat, warm brass light over a workbench of optical instruments, one of the four north-star directions Wallace rendered](/images/wallace-atelier.png)
*The atelier direction, rendered by Wallace as a finished hero rather than a mood board. The instrument on the bench is the kind of object the schematic marks across this site abstract.*

Seeing the directions fully realized gave me the power to speak my intent into existence. The conservatory thesis got rejected in its first cut because the renders read as post-apocalyptic instead of inhabited, and I could see that precisely because the image was specific enough to be wrong and I understood what I needed to change. I re-cut the caption, demoted the green to a sage accent, brought the warmth up, put the instrument back in active use, and the direction landed. That whole conversation happened in the schema, one variable at a time. Renders fed straight into the visual-direction decision record. My tools authored the evidence the call was made on.

::: callout The proof kept going
The four north-stars settled the direction, but Wallace didn't stop there. He went on to render the imagery this site actually ships: the schematic marks and thumbnails on the case study cards, the section and hub heroes, and even his own self-portrait for this page. Every one saved its caption beside it, so each can be rebuilt from the spec that made it.
:::

## Results

::: metrics What it changed
- 4 directions | Rendered as finished heroes, not mood boards | brass
- 1 variable | Changed per iteration, seed held fixed
- $0 | Per render, fully local on the M5 Max | magenta
- 1 spec | Caption saved beside every image as the source of truth
:::

The real outcome isn't a folder of renders. It's that I turned a model that wants a sentence into an instrument that takes direction. The portfolio you're reading made its visual call on evidence this tool produced, and every one of those renders can be reconstructed from the spec that made it. That's what I care about: not generating images, but building the thing that lets a designer stay in charge of how their intent is expressed.
