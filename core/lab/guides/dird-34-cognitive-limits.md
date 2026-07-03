---
slug: dird-34-cognitive-limits
title: "DIRD 34: Cognitive Limits on Controlling Multiple Spacecraft"
kicker: "DIRD Guide Series"
order: 12
accent: "#c4a1f5"
accentLight: "#6b3fb8"
territory: T1
status: complete
description: How many spacecraft can one human mind fly at once? A 2010 DIA brief triangulates from air traffic control and drone research to a hard answer (16, 7, or 4, depending on complexity) and to the physiological instruments that can see overload coming.
source:
  authors: "Genik (attributed; author redacted in release)"
  year: 2010
  venue: "DIA / AAWSAP Program (DIA-08-1101-001)"
sectionIcons:
  big-picture: telescope
  workload-curve: activity
  measuring-minds: gauge
  atc-evidence: radar
  supervising-fleets: joystick
  the-numbers: binary
  design-implications: pencil-ruler
glossary:
  the big picture: "The pilot's internal mental representation of the identity, position, mission, and current direction of every object being tracked. The source's colloquial term for situational awareness; keeping all of it straight is the supervisory task's whole job."
  situational awareness: The formal term for the maintained mental model of all relevant objects in a supervisory task. The paper's central question is whether there is a hard cognitive ceiling on how many moving objects it can contain.
  mental workload: "The effort an operator actually expends to meet task demand. It is decoupled from performance: workload can swing widely across regions where performance stays flat, which is why performance alone cannot reveal an approaching overload."
  task demand: The gross level of neural activity a task requires. The source treats it as the independent variable that fixes the theoretical relationship between mental workload and task performance.
  multiple resource theory: "A model in which different cognitive resources (visual and auditory processing, for example) are independent pools, so demands on one do not tax the other. Performance holds while spare capacity exists in the pools a task draws on, and falls once it is exceeded."
  NASA-TLX: "The NASA Task Load Index, a standardized subjective workload questionnaire. Its overall score is a weighted average of six subscales: mental demands, physical demands, temporal demands, own performance, effort, and frustration."
  SWAT: "The Subjective Workload Assessment Technique, a two-step self-report method rating three factors (time load, mental effort load, and psychological stress load) to derive a 0-100 interval scale of workload."
  utilization: "The fraction of time an operator spends actively addressing issues rather than waiting or monitoring. Around 70 percent utilization, performance begins to degrade, making this the source's most designable single threshold."
  dual-task paradigm: A performance-measurement setup in which a subject performs a primary and a secondary task at once; because the secondary task is required, degraded primary-task performance indicates workload.
  reference task: A calibration task run before and after the primary task, used to track fatigue trends and to normalize an individual's capacity against day-to-day variation.
  autonomic nervous system: The division of the peripheral nervous system, with sympathetic (stress response) and parasympathetic (homeostasis) branches, that drives most of the physiological signals used to measure workload.
  inter-beat-interval: The time between successive R peaks in the cardiac signal, abbreviated IBI. More normally distributed than raw heart rate, which makes it a cleaner measurement channel.
  heart rate variability: A cardiac workload measure calculated by dividing the standard deviation of the inter-beat-interval by its average over a sample period. Its spectrum decomposes into low, mid, and high frequency bands.
  P300: "A well-studied event-related potential: a bump in the EEG signal appearing 200-400 milliseconds after an event, produced by tens of thousands of neurons firing coherently for a short time."
  skin conductance response: An electrodermal measure of sweat-gland activity driven by the autonomic nervous system, used to index stress and anxiety; one of the three channels that tracked aircraft count in live control-room data.
  TRACON: "Terminal Radar Approach Control, the facility handling departures, approaches, and flyovers within about a 50-mile radius of a US airport. The source calls it the most cognitively demanding function in the air traffic control chain."
  sector: "A zone of controlled airspace assigned to a specific controller or control center. Handoffs happen at sector boundaries, and handoff miscommunication is the most common air traffic control error."
  Method of Analysis of Relational Complexity: The objective complexity-ranking method (MARC) used to show that perceived complexity, not aircraft count, is the number one factor determining workload.
  post-completion errors: Errors that spike in the period immediately after a workload peak, when insufficient recovery time is allotted.
  losing the picture: "Air traffic control slang for loss of situational awareness under overload; the failure state the Brookings overload scenario was designed to induce."
  adaptive automation: "Rebalancing workload between computer and human in both directions: shedding tasks as overload approaches, and feeding the operator routine tasks and extra mission information at low demand to prevent disengagement."
  Traffic Load Index: Averty's refinement of count-based workload metrics. Each aircraft is weighted by its cognitive and emotional processing demand, with path-conflict aircraft weighted highest and isolated flyovers lowest.
  automation bias: "Over-trusting automated alerts. When an aid is right more than about 80 percent of the time, operators stop verifying it; the source's counterintuitive fix is keeping the false-alarm rate at 20-25 percent."
  working memory: "The mental scratchpad that holds items under active attention. Standard estimates put its capacity at three to five disparate objects, which is where the four-craft ceiling comes from."
  external working memory: "Physical or interface surfaces that hold information for quick visual retrieval so the brain does not have to: flight-strip blocks beside a radar scope, stored-instruction buttons, dual displays."
  neglect time: The period a supervised vehicle can follow its automated routine acceptably after an interaction, before performance degrades and it needs the pilot again.
  wait time: The queuing gap between a vehicle needing operator attention and the operator getting to it. Complex interfaces inflate wait times, cutting the controllable maximum to seven aircraft.
  interaction time: "The time an operator spends servicing one vehicle, bringing its degraded performance back to acceptable, before releasing it to autonomy again."
  management by consent: "The middle automation tier in Ruff's comparison: the automation proposes actions and the human approves them. It outperformed both manual control and management by exception, because automation carries its own error rate."
  management by exception: "The highest automation tier in Ruff's comparison: the automation acts on its own unless the human intervenes."
  target of opportunity: An unplanned target pilots search for between commanded targets; a secondary-task measure of spare capacity. Detection fell from 92 to 79 percent when operators went from one drone to two.
  human-automation consensus: Agreement between the operator and an automated re-planner, found to be the primary driver of system performance in multi-vehicle scheduling tasks.
  T1: "The lab's Consciousness and Spacetime territory, where cognition, physiological instrumentation, and exotic flight research meet."
---

## The Big Picture Problem {#big-picture}

How many spacecraft can one human mind fly at once? In 2010, the Defense Intelligence Agency's AAWSAP program commissioned a brief built around that deceptively simple question. The released copy (DIA-08-1101-001, December 2010) redacts its author under a privacy exemption, but public DIRD lists, plus an internal self-citation to earlier work on cognitive avionics, support the standard attribution to Dr. R. Genik of Wayne State University.

The framing scenario is a crewed deep-space mission roughly forty years out, staged not as one ship but as a small fleet: a trailing spacecraft of nuclear-powered electromagnets shielding the crew from solar radiation, "halo" spacecraft with powerful radars scouting for incoming objects, exploration and mining craft. The vehicles travel out of visual range of one another (hundreds of miles apart at any instant) and rejoin only for maintenance or fuel exchange. Most of the ancillary craft fly themselves. But they still need watching, so that an unseen system failure doesn't make one "just disappear one day during the mission like a Martian probe." And the economics only work if a single remote pilot on station at a time can supervise the whole fleet.

Here the paper hits a wall it's refreshingly honest about: at the time of writing, zero peer-reviewed articles on remote piloting of multiple spacecraft had appeared in major journals in thirty years. There was no direct literature to review. So the author triangulates from the two nearest bodies of research: air traffic control, with its decades of work on object supervision and tracking, and the then-emerging studies of single operators commanding multiple unmanned vehicles. The scope stays firmly human: "For the current treatise we will consider only traditional humans as pilots. Cyborg-enhanced astrobots are a topic for another tome."

The whole inquiry turns on one cognitive object. The pilot's supervisory task is maintaining |the big picture|.

> **the big picture**: The pilot's internal mental representation of the identity, position, mission, and current direction of every object being tracked. The source's colloquial term for situational awareness; keeping all of it straight is the supervisory task's whole job.

The formal name is |situational awareness|, and the primary research question is whether there's a cognitive limit on the number of moving objects it can hold. The secondary questions are the designer's questions: is the maximum set by interaction complexity? Can the limit be described? And is there a real-time, objective measure that flags when a pilot is approaching capacity, or has already crossed it?

> **situational awareness**: The formal term for the maintained mental model of all relevant objects in a supervisory task. The paper's central question is whether there is a hard cognitive ceiling on how many moving objects it can contain.

The Summary front-loads the answers, and they're numbers: 16 craft, 7 craft, 4 craft, depending on how much thinking each one demands. The rest of the paper is the evidence trail.

## The Workload Curve {#workload-curve}

Before any evidence, the paper lays down its theoretical spine: a one-dimensional curve relating |task demand|, |mental workload|, and performance.

> **task demand**: The gross level of neural activity a task requires. The source treats it as the independent variable that fixes the theoretical relationship between mental workload and task performance.

> **mental workload**: The effort an operator actually expends to meet task demand. It is decoupled from performance: workload can swing widely across regions where performance stays flat, which is why performance alone cannot reveal an approaching overload.

Read the curve left to right, from too little demand to too much. In region D, demand is so low the operator disengages entirely; the workload curve is barely defined there, because there's no task to speak of. In A1, demand is still low and the operator spends real effort just maintaining vigilance. A2 is the optimum: a trained operator holds set performance with minimal effort. In A3, demand is climbing and the operator pours in extra effort to keep performance flat. In B, degradation begins despite the effort. Region C is overload: performance has degraded past acceptable levels, though some low level persists as long as effort is maintained.

The shape that matters: performance is a flat line across all three A regions while workload traces a U: high at the vigilance end, low at the optimum, high again near the redline. The operator who looks fine and the operator who's one added craft from collapse produce identical output.

> **Design Hook**
>
> **Performance is a lagging indicator.** Across regions A1 through A3, performance stays perfectly flat while workload swings from vigilance-strain to optimal to near-redline. A supervisory interface that displays only task outcomes (tracks maintained, commands acknowledged) is instrumenting the one variable that won't warn you. The paper's answer is to sense the operator, not just the fleet: physiological workload channels that let the system shed or re-automate craft before region C, not after.

Note that region D is a failure mode too. Under-stimulation and overload both destroy the big picture, which is why the automation designs that come later in the paper work in both directions: they add routine work at the bottom of the curve as well as removing it at the top.

The chapter also introduces |multiple resource theory|, which will shadow the whole document.

> **multiple resource theory**: A model in which different cognitive resources (visual and auditory processing, for example) are independent pools, so demands on one do not tax the other. Performance holds while spare capacity exists in the pools a task draws on, and falls once it is exceeded.

## Measuring Minds {#measuring-minds}

If the limit is real, someone has to measure it. Chapter 2 is a toolkit chapter: three complementary approaches to measuring mental workload, each with a different blind spot.

Subjective measures ask the operator. Self-report gets inside the mind of the performer, but there's no absolute scale: one person's "fully occupied" isn't another's. The two standardized instruments are the |NASA-TLX|, a questionnaire whose overall score is a weighted average of six subscales (mental demands, physical demands, temporal demands, own performance, effort, and frustration), and |SWAT|, which rates time load, mental effort load, and psychological stress load in a two-step procedure yielding a 0-100 scale. A related approach uses an expert observer instead of the subject, and its workhorse metric is |utilization|.

> **utilization**: The fraction of time an operator spends actively addressing issues rather than waiting or monitoring. Around 70 percent utilization, performance begins to degrade, making this the source's most designable single threshold.

Utilization earns special praise in the source for its simplicity, objectivity, and quantitative scale: usable for threshold detection, prediction, and computer-assisted workload balancing. Hold onto the 70 percent figure; it returns in the drone research with independent support.

Performance measures watch the work. Reaction time and task-completion accuracy are the basics (an air traffic controller properly handing off a plane counts as a completed task). The subtler designs add a second task: in the |dual-task paradigm|, secondary performance is required, so any sag in the primary task indexes workload; in the inverse design, the primary task is protected and secondary performance measures spare capacity. And a |reference task| run before and after the session tracks fatigue and normalizes for the fact that the same person has different capacity on different days.

Physiological measures watch the body, on the assumption that rising workload raises anxiety and anxiety shows up in the |autonomic nervous system|. This is the channel the paper is most excited about, because physiology is continuous, real-time, and unobtrusive, though it gives no direct read of task performance. The menu: cardiac measures built on the |inter-beat-interval| and |heart rate variability|, with blood pressure tracked by a water-filled finger cuff; central nervous system measures from unobtrusive EEG (workload shows up in the theta and alpha bands, more recently beta and gamma) and event-related potentials like the |P300|; ocular measures (fixations, dwell time, pupil changes, blink rate); electrodermal measures like the |skin conductance response|; and serum hormones such as cortisol, which lag by about fifteen minutes and so only support baselines and post-incident analysis.

> **inter-beat-interval**: The time between successive R peaks in the cardiac signal, abbreviated IBI. More normally distributed than raw heart rate, which makes it a cleaner measurement channel.

Every channel on this menu returns later: the studies in the next two sections lean on exactly these instruments, and the lab has reasons of its own to care about them.

> **Territory Bridge**
>
> The physiological menu in this chapter (EEG bands, |heart rate variability|, ocular and electrodermal channels) is the same instrument set the consciousness-cockpit end of DIRD 28's spectrum needs. Within |T1|, the supervisory-control research and the lab's most speculative cockpit thread share hardware: the sensors that classify overload today are the ones a consciousness-coupled interface would listen to tomorrow.

## The Air Traffic Evidence {#atc-evidence}

Air traffic control is the paper's best terrestrial analogue for one human supervising many semi-autonomous vehicles, and within it, |TRACON| approach control is singled out as the most cognitively demanding job in the chain.

> **TRACON**: Terminal Radar Approach Control, the facility handling departures, approaches, and flyovers within about a 50-mile radius of a US airport. The source calls it the most cognitively demanding function in the air traffic control chain.

Two pieces of texture before the findings. First, most ATC errors are undramatic: the most common is miscommunication when an aircraft is handed off from one |sector| to the next, and the vast majority of errors produce procedural mistakes, not collisions or near-misses. Second, there is a hole in the literature with a date on it. In August 1981, nearly 13,000 controllers went on strike; two days later, the 11,345 who defied the return-to-work order were fired and banned for life from federal service. The research consequence: almost no 1980s studies on working control professionals. The field's subjects had just been fired, all at once.

The chapter's central finding repeats across studies: raw vehicle count is a weak predictor of workload. Complexity is what saturates the operator. Boag, using the |Method of Analysis of Relational Complexity|, found that a relatively small number of aircraft can greatly increase perceived workload and concluded that perceived complexity is the number one factor, with individual differences still shifting where overload lands. A 1997 National Academies study found controller errors at both ends of the curve, high workload and low, just as overload and disengagement predict. Di Nocera's work adds a wrinkle designers should keep: |post-completion errors| spike in the window right after a workload peak, and the conflict-detection aid in that study helped junior controllers while leaving seniors unaffected. Experience had already internalized the augmentation.

The physiological anchor is the Brookings simulated-TRACON study of 1996. Air Force controllers worked sessions that varied traffic volume (6, 12, 18 aircraft), varied complexity at constant volume, and ended in a deliberate overload scenario (15 aircraft in 5 minutes) while EEG, eye, respiration, and cardiac channels recorded. Performance degraded with complexity but not with volume. Subjective ratings, blink rate, respiration, and EEG power spectra all tracked task difficulty; heart rate, notably, showed no significant correlation. And here's the unnerving detail: only one of the eight controllers rated the overload run as a loss of situational awareness, as |losing the picture|. The other seven were overloaded and did not report it.

The machines could tell, though. Wilson's 2003 reanalysis fed the Brookings physiological data to a neural network and "successfully classified the overload condition consistently in more than 98% of the cases." And Collet's 2009 field study took the instruments out of the simulator entirely: 25 fully qualified controllers wearing sensors during real evening duty at Lyon's Saint Exupéry airport, each handling one to ten aircraft. Skin conductance and instantaneous heart rate correlated with aircraft count at r values of .93 and .98; skin blood flow tracked it just as tightly in the negative direction, at -.97. Overload isn't just a feeling; it's a measurable state, in the field, on working professionals.

Two more results round out the chapter. Kaber found primary-task performance was greatest when |adaptive automation| was added: the system rebalancing work in both directions to hold the operator in the productive band of the workload curve.

> **adaptive automation**: Rebalancing workload between computer and human in both directions: shedding tasks as overload approaches, and feeding the operator routine tasks and extra mission information at low demand to prevent disengagement.

And Wickens' dual-task study of student pilots produced the paper's strangest number: when an automated conflict-detection aid was correct more than about 80 percent of the time, performance dropped, because pilots stopped checking. That's |automation bias| by way of too much trust. A 20-25 percent false alarm rate was optimal when the pilot is meant to work alongside the automation rather than rely on it. The source's footnote reaches for a CB radio: set the squelch too high and you miss traffic; too low and all you hear is noise.

> **Design Hook**
>
> **Count is the wrong dashboard metric.** Every fleet interface defaults to showing how many vehicles an operator has, and this chapter says that number is nearly meaningless: complexity dominated count in the Boag and Brookings results, and Averty's |Traffic Load Index| responds by weighting each aircraft by its processing demand (path-conflict traffic highest, isolated flyovers lowest). A multi-spacecraft display should compute and surface a weighted load index, and staff its handoffs against that, not against a vehicle counter.

One more ATC finding matters most for spaceflight, and it is a negative one. Loft's work shows that a controller's primary relief valve is handing traffic to another local operator. The treatise's scenario is a single pilot in a space environment "where no room full of colleagues exists to take up the slack." The entire ATC evidence base rests on an escape hatch that deep space deletes. (In fairness to theory, Hancock points out that brain imaging shows cognitive resources are anatomically separated, so multiple resource theory shouldn't be abandoned even where its predictions struggle in ATC tasks.)

## Supervising Fleets {#supervising-fleets}

The second evidence base is closer to the mission profile: single operators commanding multiple unmanned vehicles, sometimes from the far side of the planet: Predator crews flying missions over Iraq and Afghanistan from the continental United States.

The starting point is humbling. The US Army's Hunter and Shadow surveillance drones each required a team of two operators: half a vehicle per person. Dixon's simulation asked whether augmentation could push that to two vehicles per pilot. Automated alerting dramatically cut the time to find system failures; an autopilot cut flightpath deviation and freed attention. But detection of a |target of opportunity|, the study's measure of spare capacity, still fell from 92 to 79 percent going from one aircraft to two. The suspected culprit was the interface itself: four screens per vehicle. The display sprawl was generating workload of its own.

Ruff compared three levels of authority (manual control, |management by consent|, and |management by exception|) and the middle level won, because the automation's own error rate makes unsupervised action costly. The same work delivers one of the paper's hardest numbers: the absolute maximum number of UAVs a person could control is four.

Cummings approached the ceiling through queuing theory, using in-flight cruise missile retargeting: minimal piloting, pure supervision. Her |utilization| result independently confirms the ATC chapter: operators busy about 70 percent of the time max out their ability to hold the big picture. The queuing model breaks each vehicle's life into |neglect time|, |interaction time|, and |wait time|, and shows that capacity is a scheduling property, not a headcount.

> **neglect time**: The period a supervised vehicle can follow its automated routine acceptably after an interaction, before performance degrades and it needs the pilot again.

> **wait time**: The queuing gap between a vehicle needing operator attention and the operator getting to it. Complex interfaces inflate wait times, cutting the controllable maximum to seven aircraft.

When vehicles are heterogeneous and interfaces complex, queuing delays cut the maximum to seven aircraft. And in re-planning tasks, a final study found that |human-automation consensus|, whether the operator and the automated scheduler agree, was the primary driver of system performance. The interaction model, not the algorithm, dominated outcomes.

The chapter closes with the one idea that changes the arithmetic entirely: swarms. A pilot commands the swarm; the swarm coordinates internally, triangulating a radio emitter, say. The number of swarms then takes the place of the number of vehicles in the cognitive-limit math, and swarm systems were already under development for space exploration when the paper was written.

> **Subguide queued**
>
> Swarms change the unit of cognition. The 16/7/4 ceiling doesn't cap vehicles; it caps independently attended things, and a swarm that reads as one object costs one slot no matter how many craft are in it. What makes a collective read as a single object to a supervising mind is a design question worth its own guide.

## The Numbers {#the-numbers}

The paper's governing image for the limit is a chess grandmaster playing a simultaneous exhibition, walking board to board, holding each game somewhere in mind between visits. The question: how many boards before the carryover fails and every arrival means re-deriving the position from scratch? Cold analysis, every time. The source's verdict: "The conclusion is 16, and it agrees with previous work on free flight ATC."

Sixteen is the outer wall. The Conclusions put the full ceiling in one tiered sentence: 16 craft for simple destination selection, 7 for moderately complex piloting and/or mission task completion, and 4 for complex heterogeneous craft. And the wall is genuinely a wall: no current evidence shows a complete mental picture maintained for more than about 16 objects at one time, "even with external working memory augmentation." Displays can't buy capacity the mind doesn't have.

The bottom tier has an explanation. Four complex craft is consistent with standard estimates of human |working memory| holding three to five disparate objects at a time.

> **working memory**: The mental scratchpad that holds items under active attention. Standard estimates put its capacity at three to five disparate objects, which is where the four-craft ceiling comes from.

Around the tiered ceiling, the supporting constants: performance begins to degrade around 70 percent utilization, in both the ATC and drone literatures independently. Alerting systems work best with a 20-25 percent false alarm rate when the human is supposed to stay engaged. Mild complexity hurt professional controllers at as little as six aircraft, though they routinely track up to ten. And the baseline the paper writes against is sobering in the other direction: Apollo required dozens of ground operators to monitor for system failures, and, as the author notes, "just a few years ago it required two soldiers to operate a simple reconnaissance drone (most of them still do)."

The paper closes with predictions, carefully worded. Spacecraft-specific simulator studies should reach major journals within five years. The Conclusions expect physiological classification of overload at near-perfect accuracy within five years of dedicated studies starting; the Summary extends this to prediction "and possibly prevention" of overload. And the puzzle of why multi-task performance defies multiple resource theory's predictions gets the long clock: forty years. "It is certain," the author writes, "that the field is just getting started."

## Design Implications {#design-implications}

The Discussion chapter hands designers its sharpest observation almost in passing: every augmentation that actually worked in the evidence base does the same job. The controller's physical flight-strip blocks, Dixon's stored-instruction "repeat" button, Cummings' dual displays: each one holds information for quick visual retrieval that the brain would otherwise burn |working memory| on. They are |external working memory| registers. The TRACON version is wonderfully concrete: a stack of physical blocks beside the radar scope, one per aircraft, so that as long as a block sits in the rack there should be a corresponding blip on the screen. An orphaned block is a lost aircraft made visible. The target of interface design, on this evidence, isn't more automation. It's more registers, and less sprawl to search through (recall the four-screens-per-drone problem).

Three hooks fall out of the numbers themselves.

> **Design Hook**
>
> **The alarm that is deliberately wrong.** A 20-25 percent false-alarm rate isn't a defect budget. It's the mechanism that keeps the supervisor verifying instead of trusting, because aids correct more than about 80 percent of the time breed |automation bias| and silent vigilance decay. Alert systems for exotic flight should be designed with calibrated imperfection and cheap, visible verification affordances, like squelch tuned to let a little noise through on purpose.

> **Design Hook**
>
> **The operator-state instrument.** Overload was classified from physiology in more than 98 percent of cases in the ATC data, and skin conductance, skin blood flow, and heart rate tracked live traffic load in the field. That makes the operator's own state a first-class cockpit channel: a real-time strip of blink rate, EEG spectra, and respiration sitting beside the fuel and comms gauges, feeding |adaptive automation| that rebalances the fleet before region B, not after region C. The system watches the watcher.

> **Design Hook**
>
> **Design to the 4, display to the 16.** Complex heterogeneous craft cap at 4; simple destination selection caps at 16; and a swarm counts as one. The interface's job is to move craft from the 4-class toward the 16-class (collapsing heterogeneous complexity into homogeneous abstractions, absorbing piloting nuance into automation, bundling collectives into single attendable objects) while never pretending the outer wall of 16 can be displayed away.

The honest limit of the source is worth stating: it's a 2010 triangulation, written because the direct literature didn't exist, and its numbers come from towers and drone trailers rather than from deep space. But that's exactly what makes it designable. The ceilings are measured, the instruments are named, and the escape hatch, a room full of colleagues to take up the slack, is precisely what the single-pilot fleet won't have.

> **Read Next**
>
> DIRD 28: Cockpits in the Era of Breakthrough Flight (dird-28-breakthrough-cockpits). This paper is the evidence base beneath that guide's pilot-as-mission-director and meaningful-work claims: adaptive automation holding the operator in-band is the literal mechanism, and the workload numbers here are the operating parameters for the cockpit imagined there.
