---
slug: dird-36-quantum-tomography
title: "DIRD 36: Quantum Tomography of Negative Energy States"
kicker: "DIRD Guide Series"
order: 11
accent: "#9d84e8"
accentLight: "#5b3fa8"
territory: T1
status: draft
description: "The DIRD series' measurement program: before anyone produces or controls negative energy, this DIA reference document asks whether we can measure it, and proposes the instrument that could settle the question."
source:
  authors: "Author redacted"
  year: 2011
  venue: DIA / AAWSAP Program
sectionIcons:
  big-picture: telescope
  negative-energy: circle-minus
  two-lab-doors: waves
  wigner-tomography: scan-eye
  balanced-homodyne: aperture
  two-experiments: flask-conical
  connections: waypoints
  design-implications: pencil-ruler
glossary:
  negative energy: "Energy density below the quantum vacuum's zero-point baseline, literally less than 'nothing.' The document prefers the term sub-vacuum energy: field fluctuations suppressed beneath the vacuum's own floor. Quantum field theory proved in 1965 that states with negative energy density are inevitable."
  exotic matter: "Matter with negative energy density or negative outward stress-tension, the ingredient every FTL spacetime requires. The document calls it 'a very misunderstood and misapplied term': it's not antimatter, and it's not forbidden by physics."
  energy conditions: "Four auxiliary hypotheses (Weak, Null, Dominant, Strong) formalized by Hawking and Ellis in 1973 that assume energy density can never go negative. They're not part of general relativity itself, and the document argues lab evidence had already falsified them 25 years before their formulation."
  mode: "A wave pattern of the electromagnetic field, chosen by the observer, obeying Maxwell's equations. Each mode behaves as an independent quantum harmonic oscillator; choosing one singles out a single quantum object from the rest of the world."
  vacuum state: "The quantum state of a mode containing no light. Not an evacuated chamber: the document means simply 'no light,' and this nothing still carries zero-point fluctuations that cause significant physical effects."
  quadrature: "One of two components of a light mode's amplitude, the in-phase and out-of-phase parts of the electric field. They behave like position and momentum: conjugate variables whose uncertainties can't both shrink at once."
  zero-point energy: "The irreducible half-quantum of energy (one half ħω) that every mode carries even in the vacuum state. Planck added it to his radiation law in 1912, and Mulliken confirmed it spectroscopically in 1924, months before Heisenberg derived it. Summed over all modes it forms a universal sea of zero-point energy."
  squeezed light: "Light whose quantum noise has been redistributed by nonlinear optics: one quadrature's fluctuations pressed below the zero-point level at the expense of its conjugate. The noise budget is relocated, never reduced."
  squeezed vacuum: "A squeezed state built from the vacuum itself: a traveling wave whose energy density oscillates between negative and positive every cycle, with a positive time average. Pfenning showed the dips below zero happen for any nonzero amount of squeezing."
  coherent state: "The quantum state of ideal laser light. In phase space it's 'just a displaced vacuum': the same round Gaussian noise profile as the vacuum, shifted away from the origin."
  Heisenberg Uncertainty Principle: "The intrinsic fuzziness of conjugate quantum variables: the product of the two quadrature uncertainties can't drop below ħ/2. It's a mathematical fact about waves, not a flaw in our instruments."
  Casimir effect: "The attractive force between two neutral, parallel conducting plates in vacuum, caused by a minute imbalance in zero-point energy density between the inside and outside of the cavity. Predicted in 1948, well measured since, and per the document by far the easiest way to generate static negative energy in a lab."
  Casimir cavity: "The region between the plates of a Casimir apparatus, where the vacuum is stressed below its normal zero-point level. The energy density scales as the inverse fourth power of the plate separation: halve the gap, sixteen times the density."
  degenerate parametric amplification: "The bench technique that makes squeezed light: a nonlinear crystal (KTP or lithium niobate) pumped at exactly twice the signal frequency converts pump photons into signal photon pairs, amplifying one quadrature's fluctuations and de-amplifying the other."
  Wigner function: "Wigner's quantum analog of a classical phase-space distribution, written W(q,p). It predicts every statistical quantity of a quantum state, but it can dip negative, which makes it a quasiprobability distribution and makes its negativity the signature of genuinely nonclassical light."
  quasiprobability distribution: "A phase-space distribution that behaves like a probability distribution except that it can go negative. The negative regions have no classical interpretation; they're where the quantum behavior lives."
  homodyne tomography: "Reconstructing a quantum state from its 'shadows': measure quadrature distributions at many phase angles with a homodyne detector, then apply the mathematics of computerized tomography to recover the Wigner function."
  Schrödinger-cat state: "A superposition of two coherent states, the optical version of Schrödinger's 1935 alive-and-dead cat. Its Wigner function shows two peaks with oscillating negative interference between them; the farther apart the peaks, the faster the oscillation."
  single-photon state: "A mode containing exactly one photon. Its reconstructed Wigner function is a crater: negative quasiprobability near the phase-space origin, dipping to roughly minus 0.3 in measured data."
  dynamical Casimir effect: "Negative energy generated by a rapidly moving mirror. The document dismisses it as a laboratory path because the effect is 'exceedingly small.'"
  beam splitter: "A glass cube or plate that splits light, and always a four-port device: two inputs, two outputs, no exceptions. It stands in for interferometers, mirrors, fiber couplers, and polarizers, and it's the standard tool for demonstrating the quantum nature of light."
  fictitious beam splitter: "A modeling device: any loss or absorption in an optical system behaves exactly like a beam splitter that passes a fraction of the light while vacuum fluctuations enter the unused port. Losses always come with fluctuations."
  photodiode: "A semiconductor light detector with linear response. Real photodiodes can't resolve single photons; they need around 100 photons per microsecond just to register above their own noise."
  balanced homodyne detector: "The instrument at the center of this document. The faint signal and a strong local oscillator meet at a 50:50 beam splitter, two photodiodes read the outputs, and their currents are subtracted. The difference current reads out one quadrature of the signal field."
  local oscillator: "The intense reference laser beam in a homodyne detector. It amplifies the faint signal into measurability, defines which mode in space and time gets measured, and sets the measurement phase via a piezo-mounted mirror."
  time-domain balanced homodyne detection: "A homodyne variant that reads each laser pulse individually in real time, one quadrature value per pulse, instead of monitoring a single sideband frequency. It's what lets the instrument follow energy density pulse by pulse."
  spectral density: "The frequency-resolved strength of a field's fluctuations. Marecki's Casimir-cavity detector outputs the field's two-point function, whose Fourier transform gives the spectral density at the detector's position."
  two-point function: "The correlation of the quantum field with itself at two points. It's the quantity Marecki's detector measures directly, and it encodes how the cavity's ground-state fluctuations are distributed in space and frequency."
  TE1 mode: "The lowest transverse-electric standing-wave mode of a Casimir cavity. Marecki's design uses the electric field of this mode as the local oscillator, so the instrument's reference beam lives inside the very thing being measured."
  Quantum Inequalities: "Ford and Roman's theorem rationing negative energy: the deeper a sub-vacuum dip, the briefer it can last and the more positive energy must follow it. The document notes it has only been verified for single-mode squeezed light, and that Marecki found Casimir-cavity negative energy regions violate it."
  T1: "Territory 1, Consciousness and Spacetime: the lab's territory covering vacuum engineering, spacetime metric engineering, and the physics the DIRD series explores."
  T4: "Territory 4, UAP Detection: the lab's territory covering citizen science and field instrumentation pointed at anomalous aerospace phenomena."
---

## The Big Picture {#big-picture}

Every exotic-propulsion concept in the DIRD collection runs on the same fuel. This document opens the way most of them do, imagining future vehicles that use "negative quantum vacuum energy to modify the spacetime geometry" for faster-than-light travel "via traversable wormholes or warp drives, or even levitation via antigravity." Standard DIRD opening. What's different is what comes next.

This is a DIA reference document (DIA-08-1102-007, dated 11 January 2011, author redacted) from the AAWSA program. It asks the practical question under all that ambition. Before you can produce |negative energy|, before you can control it, can you even measure it? The thesis lands in one sentence: "we will first need to know how to measure and spatially map negative energy in order to properly control it after producing it. This is the motivation for this report."

> **negative energy** — Energy density below the quantum vacuum's zero-point baseline, literally less than "nothing." The document's preferred name is sub-vacuum energy: field fluctuations suppressed beneath the vacuum's own floor.

That reframe makes this one of the most grounded papers in the series. DIRDs 13, 15, 18, 19, and 29 all walk through the same gateway, a supply of negative energy, and mostly wave at it on the way past. This one stops at the gate and proposes the experimental test. A measurement program, with hardware.

The acknowledgments thank two working physicists, Ulf Leonhardt and Piotr Marecki, for lecture notes, references, and experimental data, and the document reads like it: half quantum-optics textbook, half experiment proposal.

## Negative Energy Is Real {#negative-energy}

First the document clears the air around |exotic matter|, "a very misunderstood and misapplied term": matter with negative energy density or negative outward stress-tension. The FTL spacetimes that need it don't violate general relativity. They violate the |energy conditions|, four auxiliary assumptions (Weak, Null, Dominant, Strong) that Hawking and Ellis formalized in 1973, all variations on one hunch: energy density never goes negative.

That hunch was dead on arrival. Quantum field theory discovered in 1965, via a proof by Epstein, Glaser, and Jaffe, that negative energy is unavoidable: "Even for a quantum scalar field in the flat Minkowski spacetime, it can be proved that the existence of quantum states with negative energy density is inevitable." The chronology twists the knife: the conditions were "experimentally shown to be false – 25 years before their formulation." Casimir, 1948. Hawking and Ellis, 1973. The document also quotes Visser's verdict that "all (generic) spacetime geometries violate all the energy conditions." Negative energy isn't fringe. It's textbook physics that the propulsion literature keeps treating like a rumor.

What does "negative" mean here? A sub-vacuum state: fluctuations pushed below the |zero-point energy| level. Energy below "nothing." Here's why that's not a contradiction. Light decomposes into |mode|s, wave patterns the observer chooses, each one a tiny quantum harmonic oscillator. A mode with no light sits in the |vacuum state|; by vacuum the document means simply "no light," "not an evacuated system," and yet "this 'nothing' can indeed cause significant physical effects." Every mode keeps an irreducible half-quantum of energy, ħω/2. Planck penciled that in by 1912, and Mulliken confirmed it in boron monoxide spectra in 1924, "several months before Heisenberg first derived the ZPE." Summed over every mode, it's a "universal sea of zero-point energy."

The document catalogs five places negative energy occurs naturally, then cuts the list to two "due to their ready applicability and technical maturity": squeezed light and Casimir. The stakes it attaches are the full DIRD wishlist: FTL, traversable wormholes, "violations of the second law of thermodynamics," time machines. The claims are the document's; the quarry's existence is settled physics.

## Two Lab Doors {#two-lab-doors}

Door one: squeezing. The |Heisenberg Uncertainty Principle| says a mode's two |quadrature|s, the in-phase and out-of-phase parts of its field, can't both be quiet at once. Nonlinear optics can't shrink that noise budget, but it can relocate it: you can "extract energy from one place in the ordinary vacuum at the expense of accumulating excess energy elsewhere." That's |squeezed light|, the vacuum's circular noise profile deformed into an ellipse, one quadrature quieter than the vacuum itself and its conjugate louder.

Squeeze the vacuum itself and negative energy appears: "A squeezed vacuum state consists of a traveling electromagnetic wave that oscillates back and forth between negative energy density and positive energy density, but has positive time-averaged energy density." On the bench, a |squeezed vacuum| comes from |degenerate parametric amplification|: a KTP or lithium niobate crystal pumped at exactly twice the signal frequency, turning pump photons into pairs of signal photons. The document's analogy is a playground swing: the crystal is an "electromagnetic swing," the pump wobbles it at twice its natural frequency, in-phase fluctuations get amplified, out-of-phase ones get squeezed. Pfenning made the payoff exact: the renormalized energy density dips below zero once every cycle "for every nonzero value of ξ." Every squeezed vacuum carries negative-energy pulses. The document even floats superposing photonic-crystal sources that emit exactly one, two, or three photons to "theoretically produce bursts of intense negative energy."

Door two is static. The |Casimir effect| is "By far the easiest and most well known way to generate (static) negative energy in the lab." Two neutral parallel plates restrict which vacuum modes fit between them, so the zero-point density inside drops below the density outside. The plates feel a real, well-measured attraction, and the |Casimir cavity| between them holds a stressed vacuum whose energy density goes as minus Aħc/d⁴, with A equal to π²/720 in four-dimensional spacetime. That inverse fourth power is the design lever: halve the gap, sixteen times the density.

## Seeing Quantum States {#wigner-tomography}

So why not just point a camera at a quantum state? Heisenberg. The document is blunt: "the true nature of an individual quantum system is hidden." Then it names the loophole: "no principal obstacle exists to observing all complementary aspects in a series of distinct experiments on identically prepared quantum objects." You can't interrogate one photon from every angle. You can interrogate a million identical ones.

That's tomography. "Tomography, from the Greek word for slice, is a method to infer the shape of a hidden object from its shadows (or projections) under various angles." A CT scanner uses X-ray shadows of your body. Quantum optics uses statistics: "The observable 'quantum shadows' are the quadrature distributions and are measured using homodyne detection." That's |homodyne tomography|.

> **homodyne tomography** — Reconstructing a quantum state from its shadows: measure quadrature distributions at many phase angles, then run the math of computerized tomography to recover the state.

What gets reconstructed is the |Wigner function|, W(q,p), the quantum stand-in for a classical phase-space distribution. It predicts every statistical quantity of the state. One catch: it isn't always positive.

> **Wigner function** — The quantum analog of a classical phase-space distribution. It can dip negative, which makes it a quasiprobability distribution, and the negative patches are the signature of nonclassical light.

That makes it a |quasiprobability distribution|, and the negativity is the fingerprint the whole program hunts for: the exact place classical physics gives up. The document walks a gallery of experimentally reconstructed states. The vacuum: a smooth Gaussian hill. A |coherent state|, ideal laser light, is "just a displaced vacuum," the same hill shifted off-center. A squeezed vacuum: the hill deformed, its raw quadrature trace visibly breathing between quieter-than-vacuum and louder. A |single-photon state| is the showstopper, a crater: "Negative 'probabilities' are clearly visible near the origin of the phase space," dipping to about minus 0.3. And |Schrödinger-cat state|s, superpositions of two coherent states named for Schrödinger's 1935 thought experiment, show two peaks with negative interference oscillating between them, faster as the peaks separate. The cat data came from A. Furusawa and H. Yonezawa at the University of Tokyo.

There was a rival proposal. Davies and Ottewill suggested a switched particle detector: negative energy should de-excite it, cooling it down, "the opposite of our experience with detectors." They hedged it heavily. The document can't resist a jab: "It is curious that Davies and Ottewill did not consider using quantum optical homodyne tomography as a tool to test their hypothesis, because this is already a mature experimental discipline." It also waves off the |dynamical Casimir effect|, negative energy from a moving mirror, as "exceedingly small." The mature instrument wins.

## The Instrument {#balanced-homodyne}

Start with the humblest part in optics. A |beam splitter| is a glass cube that splits light, and the document insists on one structural fact: it's always a four-port device, "a 'black box' with two input and two output ports," even when you only feed it one beam. So what enters the other port? The document italicizes the answer: "nothing means a vacuum state." Vacuum fluctuations pour in through the open port whether you like it or not. Sit with that: the instrument built to measure vacuum fluctuations is permeated by its own subject, and the formalism requires it.

Loss works the same way. The document models any absorption as a |fictitious beam splitter| that passes a fraction of the light while vacuum enters the unused port. Losses always come with fluctuations; you can't attenuate quietly. And the detectors are humble too: a real |photodiode| can't see single photons. It needs around 100 photons per microsecond to clear its own noise.

So how do you measure single-photon signals with photon-blind diodes? Interference. The |balanced homodyne detector| sends the faint signal and an intense reference laser, the |local oscillator|, into a 50:50 beam splitter, puts a photodiode on each output, and subtracts the two currents. The difference current reads out one quadrature of the signal field.

> **balanced homodyne detector** — Signal plus a strong local oscillator at a 50:50 splitter, two photodiodes, currents subtracted. The difference current reads out one quadrature of the faint signal field.

The local oscillator does three jobs at once. It amplifies: "The homodyne detector is an interferometer that can be measurably imbalanced by a single photon in the signal mode because the reference field is very intense." It selects: "The observer defines via the LO the frame in space and time that is subject to the field-quadrature measurement." And it sets the measurement phase θ with nothing fancier than a piezo-mounted mirror. Every imperfection in the chain collapses into one effective fictitious beam splitter, so the measured shadow is a slightly smoothed ideal one. Sweep θ, collect shadows from every angle, and the Wigner function falls out.

> **Design Hook**
>
> Seeing by subtraction is a reusable sensing pattern: when the signal is too faint for any detector you own, interfere it with a strong reference you control and read the difference. That's how the BHD gets single-photon sensitivity from photon-blind diodes. Worth stealing for any product that needs to sense below its sensors' floor.

## Two Experiments {#two-experiments}

The program rests on two experiments. One's built. One's waiting.

The built one is |time-domain balanced homodyne detection|. Conventional homodyne watches a single sideband, usually parked at 5 to 10 MHz where technical noise is quietest. The time-domain version reads each laser pulse individually: one quadrature value per pulse, a complete spatial-temporal state matched to the local oscillator's mode. Hansen and colleagues built it in 2001. The numbers: better than 85 dB common-mode suppression, electronic noise of 730 electrons per pulse, 14 dB signal-to-noise on single-pulse quantum noise at up to 1 MHz repetition, 99.5% fidelity reconstructing a coherent state, 91% quantum efficiency. Squeezed states measured this way are "darker than vacuum." Slusher's group observed sub-vacuum regions first; Schneider's group pushed a parametric amplifier (MgO-doped lithium niobate, pumped at 532 nm by a frequency-doubled Nd:YAG, seeded at 1064 nm, 380 mW of pump) to 6.5 dB of noise reduction, holding 6.2 dB averaged over 14 minutes. Figure 14 shows measured valleys dipping below the vacuum line: "sub-vacuum regions with sub-vacuum (negative) energy density." Real negative energy, already on a bench. The catch: Hansen's instrument "was not designed to directly measure the energy density of the individual pulses." The document recommends modifying it, then moving to "develop and commercialize a portable time-domain BHD device."

The unbuilt one is stranger and better. "What has not been experimentally measured yet are the sub-vacuum fluctuations and their corresponding sub-vacuum (negative) energy density inside a Casimir cavity." Marecki's 2008 proposal puts the detector inside the stressed vacuum: a Casimir cavity with plates one micrometer apart, photodiodes of submicrometer width slipped between them ("photodiodes of several nanometers in size have already been constructed"). There's no room for a reference laser, so the cavity's own |TE1 mode| serves as the local oscillator. Then the signature move: "by subtracting the outputs of balanced photodiodes, it is possible to quantify the fluctuations of the quantum field (even in the vacuum!)," which directly answers Davies and Ottewill. The subtracted output measures the field's |two-point function|, and its Fourier transform gives the |spectral density| of the cavity's ground state. Scan the photodiode's position and the frequency, and the procedure "amounts to a tomography of the ground state of the Casimir cavity."

Marecki's predictions are sharp enough to falsify: spectral density vanishing below the cavity's cutoff at πc/a, discontinuities at each multiple of it, and in some regions "suppression of vacuum fluctuations by at least 3 dB." A static patch of sub-vacuum, just sitting there.

> **Quantum Inequalities** — Ford and Roman's rationing theorem for negative energy: the deeper the sub-vacuum dip, the briefer it can last and the more positive energy must follow. Verified so far only for single-mode squeezed light.

That last prediction is the document's most consequential claim, because static sub-vacuum persistence is "allegedly forbidden" by the |Quantum Inequalities|, a theorem that "has only been verified for single-mode squeezed light." Marecki discovered that the sub-vacuum regions inside a Casimir cavity violate the theorem, and the document reports several investigators have strong arguments it's simply in error for these cases. Testing that is explicitly part of the program: "We hope that experimental attempts to verify his predictions will follow."

> **Subguide queued**
>
> The Quantum Inequalities theorem deserves its own guide. Ford and Roman's rationing rule is the universal antagonist across the negative-energy DIRDs. DIRD 36's claim that Casimir-cavity negative energy already violates it is the most consequential single assertion in the series, and it's testable.

## Connections {#connections}

Here's the gateway logic. Warp drives (DIRD 13), vacuum spacetime engineering (DIRD 15), wormholes and antigravity (DIRDs 18, 19, 29): every one spends negative energy, and the Quantum Inequalities are the rationing law that decides whether the budget closes. Most of the series argues with that theorem on paper. This document is the only one proposing a near-term laboratory test. If the inequalities hold in Casimir geometries, the gateway narrows. If Marecki is right, it opens.

> **Read Next**
>
> DIRD 13 (Warp Drive, Dark Energy, and Extra Dimensions) and DIRD 15 (Vacuum Spacetime Engineering) are the negative-energy spenders this document would put to the test. Read either one and the stakes of a 3 dB suppression measurement get very concrete.

The document is also honest about scale: "Because the Casimir effect and its associated negative energy are incredibly feeble, such putative propulsion systems will not involve the use of Casimir cavities to produce a free-space distribution of negative energy surrounding the platform." The cavity is the measurement testbed, not the engine. Nobody is flying on a micrometer gap.

Then the conclusion makes its strangest pivot. After recommending commercialization, a portable time-domain BHD for the "AC" case of pulsed negative energy and a modified-Marecki device for the "DC" static case, it suggests, twice and nearly verbatim, that these sensors "could also be assembled in a sensor array for surveillance and detection of any anomalous aerospace platforms that might use engineered spacetime effects for propulsion." A negative-energy burglar alarm, pointed at the sky.

> **Territory Bridge**
>
> That sensor-array kicker bridges |T1| to |T4|. The lab's UAP-detection territory already catalogs instruments pointed at anomalous aerospace platforms (see uapx-field-methods); DIRD 36 imagines the same posture from the physics side: a detector array listening for spacetime-engineering signatures instead of optical or radar ones. Two territories, one instrument stance.

## Design Implications {#design-implications}

Four patterns fall out of this document. None needs a warp drive to be useful.

The instrument that participates in what it measures. The beam splitter's open port fills with vacuum; Marecki's detector borrows the cavity's own mode as its reference beam. The instrument is soaked in its subject, and the design works because of that. Plenty of products measure systems they're embedded in (analytics inside the app, sensors inside the body) and pretend otherwise. Better posture: model your instrument's entanglement with the subject, then subtract it.

Seeing by subtraction. The faint thing becomes visible when you interfere it with a strong thing you control and read only the difference. The reference defines the frame; the difference carries the meaning.

Seeing by slices. When the object can't be observed whole, in principle, not just in practice, design the projection set instead. Pick the angles, collect the shadows, reconstruct. Research works the same way: no single study sees the user whole. The craft is in choosing the slices.

The sensor that normalizes the impossible. A warp-drive detector that never triggers still does cultural work: it asserts, in hardware, that warp drives are detectable things. The document's array would move engineered spacetime from speculation to a monitorable category, the way a smoke detector makes fire an ordinary event worth waiting for.

> **Design Hook**
>
> The document ends with what amounts to a product roadmap: modify Hansen's proven instrument, productize a portable "AC" negative-energy sensor, develop Marecki's "DC" counterpart, then network them into a surveillance array. It's an instrument-design brief for a quantity mainstream theory says can't sit still. The field kit, the calibration ritual, and the alert semantics are a complete speculative-design project sitting inside a real DIA document.

The physics here is unusually solid: squeezed light exists, sub-vacuum dips have been measured, the instrument runs at 91% efficiency. What's untested is whether negative energy can hold still, and a one-micrometer cavity with nanoscale photodiodes could answer that. The detector is buildable. Are we ready to design what it's for?
