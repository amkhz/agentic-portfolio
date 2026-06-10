---
slug: quantum-gravity
title: "Two Paths to Quantum Gravity"
kicker: "Synthesis Guide"
source:
  authors: "Sridhar et al. (ANU) / White et al. (Casimir, Inc.)"
  year: 2026
  venue: "Nature Communications / Physical Review Research"
  url: "https://www.nature.com/articles/s41467-026-69070-3"
  arxiv: "2502.12392"
  notes: "Synthesis of two papers; url and arxiv carry the lead ANU paper (Sridhar et al., Bell correlations between momentum-entangled pairs of helium-4 atoms). Second paper: White et al., Emergent quantization from a dynamic vacuum, Phys. Rev. Research 8, 013264, https://journals.aps.org/prresearch/abstract/10.1103/l8y7-r3rm. Renderer ignores this field; preserved per the PR #60 precedent."
accent: "#4ecdc4"
territory: T1
status: complete
order: 5
description: "A synthesis of two 2026 papers approaching quantum gravity from opposite ends: ANU's momentum-entanglement Bell test with massive atoms, and White's dynamic-vacuum derivation of hydrogen's spectrum from acoustic resonance. Why the gap between them matters for every speculative design in Territory 01."
glossary:
  quantum gravity: "The missing framework that would unify general relativity (gravity as curved spacetime) with quantum mechanics (matter as probability waves). Arguably the biggest open problem in physics. The two papers in this guide approach it from opposite ends."
  general relativity: "Einstein's theory of gravity: massive objects curve spacetime, and everything else follows those curves. Smooth, continuous, and deterministic. Stunningly accurate at planetary and cosmological scales."
  quantum mechanics: "The framework describing matter and energy at small scales through probability waves, superposition, and entanglement. Discrete and probabilistic. Stunningly accurate in its own domain, and fundamentally incompatible with general relativity as currently formulated."
  Bose-Einstein condensate: "A state of matter formed when a dilute gas of atoms is cooled to near absolute zero and the atoms collapse into a single shared quantum state. The cloud stops behaving like individual particles and acts as one quantum object."
  superposition: "The core quantum behavior where a system occupies multiple states or paths simultaneously until measured. In the ANU experiment, each scattered helium atom takes multiple paths at once."
  entanglement: "A quantum correlation between particles where measuring one instantly determines the corresponding property of the other, regardless of separation. Bell tests prove the correlation is genuinely quantum, not pre-arranged hidden information."
  Bell's inequality: "A mathematical bound that any theory based on local hidden information must obey. When an experiment violates the bound, the correlations cannot be explained by information the particles carried with them. Violation is the gold-standard proof of entanglement."
  Rarity-Tapster interferometer: "An interferometer configuration that recombines the paths of two entangled particles so their quantum correlations show up in the detection pattern. Originally designed for photons; the ANU team adapted it for helium atoms falling under gravity."
  locality loophole: "The escape hatch in a Bell test: if measurement events are close enough together, the particles could in principle coordinate through signals traveling at or below light speed. Closing it requires enough physical separation that no such signal could arrive in time."
  weak equivalence principle: "The foundational pillar of general relativity stating that all objects fall identically in a gravitational field regardless of their composition. Testing it with entangled isotopes would probe whether quantum systems obey gravity's most basic rule."
  quadratic dispersion: "The rule that a wave's frequency scales with the square of its wavenumber, so short waves travel faster than long ones. This is the single property White adds to the vacuum medium, and it is what makes the resulting standing waves match hydrogen's spectrum exactly."
  dispersion relation: "The mathematical rule connecting a wave's frequency to its wavenumber in a given medium. Different media have different rules, and the rule determines how waves propagate. It is the medium's personality for wave behavior."
  Madelung transformation: "The mathematical move of rewriting the Schrödinger equation as a pair of classical fluid equations (a continuity equation and an Euler-like momentum equation) plus one extra term, the quantum potential. Identical physics, fluid language."
  quantum potential: "The term that makes quantum mechanics quantum in the fluid picture. In the Madelung equations it behaves like a pressure that depends on the shape of the density field, and it generates the dispersive correction to ordinary sound propagation."
  stochastic electrodynamics: "A research program that derives quantum-like behavior from classical electrodynamics plus the zero-point fluctuations of the vacuum. Puthoff's hydrogen ground-state work in this tradition is the direct ancestor of White's dynamic vacuum model."
  zero-point fluctuations: "The irreducible jitter of fields in the vacuum that persists even at absolute zero temperature. In Puthoff's equilibrium picture, atoms continuously absorb energy from these fluctuations to balance what they radiate away."
  Casimir effect: "A real, measured force between two uncharged metal plates in vacuum, caused by zero-point fluctuations. Standing experimental proof that the vacuum has physical properties. Cited across the DIRDs as evidence that vacuum energy is real."
  isospectrality: "Two different physical problems producing identical spectra: the same eigenvalues and the same eigenfunctions. White's claim is precisely this. The acoustic problem and hydrogen's quantum problem are isospectral, with zero free parameters."
---

## The Problem Both Papers Are Circling {#problem}

Physics has two operating systems. General relativity covers gravity: massive objects warp the fabric of reality, and everything else follows those curves. Quantum mechanics covers the rest, describing matter and energy through probability waves, |superposition|, and |entanglement|. Both are stunningly accurate in their own domains. And they're fundamentally incompatible.

The incompatibility isn't subtle. General relativity treats spacetime as a smooth, continuous surface. Quantum mechanics says everything comes in discrete packets. Hand general relativity some initial conditions and it tells you exactly what happens. Quantum mechanics only gives you odds. We don't have a single framework that handles both. That missing framework is called |quantum gravity|, and it's arguably the biggest open problem in physics.

Two papers published in early 2026 attack this problem from opposite ends. The gap between them, and the chance they might converge, is where the physics of Territory 01 lives.

## Paper 1 (ANU): Momentum Entanglement of Helium Atoms {#anu}

**What they did.** Researchers at the Australian National University cooled helium atoms to near absolute zero until they formed a |Bose-Einstein condensate|, a state where atoms lose their individual identity and behave as a single quantum object. Then they collided two clouds of these ultra-cold atoms.

When the atoms scattered, they didn't bounce like billiard balls. Each atom took *multiple paths simultaneously*, the core quantum behavior called |superposition|. The atoms' momenta became entangled: measure the momentum of one atom and you've instantly determined the momentum of its partner.

As the atoms fell under gravity, they passed through a |Rarity-Tapster interferometer| and landed on a detector plate. The landing patterns violated |Bell's inequality|, the mathematical test that proves entanglement is real and not just hidden information the particles were carrying all along.

> **Rarity-Tapster interferometer**: An interferometer configuration that recombines the paths of two entangled particles so their quantum correlations show up in the detection pattern. Originally designed for photons; the ANU team adapted it for helium atoms falling under gravity.

**Why it matters.** Previous entanglement experiments used photons, which are massless, or internal properties like spin, which don't interact with gravity. **The ANU team entangled the physical motion of atoms that have mass.** Mass means they feel gravity. For the first time, experimentalists have a handle for probing how quantum entanglement behaves in a gravitational field.

The experiment works *within* the standard framework. Quantum mechanics and |general relativity| stay separate theories. The goal is to set up conditions where both matter at once, then watch what happens at the boundary. It's empirical to the bone: start with what we can measure and let the data guide theory.

**What's still missing.** To fully close the |locality loophole| (proving the atoms aren't secretly communicating slower than light), the entangled atoms need to be at least 30 cm apart. The current detector is only 8 cm wide. The team also wants to entangle different isotopes (He-3 and He-4) to test the |weak equivalence principle|, one of general relativity's foundational pillars, using quantum test masses. Both require serious scaling.

> **weak equivalence principle**: The foundational pillar of general relativity stating that all objects fall identically in a gravitational field regardless of their composition. Testing it with entangled isotopes would probe whether quantum systems obey gravity's most basic rule.

## Paper 2 (White et al.): Emergent Quantization from a Dynamic Vacuum {#white}

**What they did.** Harold "Sonny" White and collaborators at Casimir, Inc. published a paper in *Physical Review Research* (March 2026) showing that if you treat the vacuum of space as a physical medium, something like a compressible fluid, and give it one specific property (quadratic temporal dispersion), the entire hydrogen atom spectrum falls out of the math automatically.

Not approximately. **Exactly.** Every energy level, every spectral line, every orbital shape, all of it reproduced with zero free parameters beyond a single calibration to the known reduced mass of the electron-proton system.

**How the model works, in plain terms.** Picture the vacuum as a vast ocean. A proton sitting in this ocean creates a disturbance, a density profile that thins out as you move away from it. Because the medium's properties vary with position, waves traveling near the proton move at different speeds depending on how far out they are. Now add one rule: short waves travel faster than long waves (|quadratic dispersion|, like waves in a shallow canal). That's the whole recipe, a proton-shaped density variation plus one dispersion rule. The standing wave patterns that naturally form in this medium are *exactly* the orbitals of the hydrogen atom.

**The technical path.** White uses the |Madelung transformation|, which recasts the Schrödinger equation as a pair of fluid dynamics equations (a continuity equation and an Euler-like momentum equation). The |quantum potential|, the term that makes |quantum mechanics| quantum, becomes a pressure-like term in the fluid. Linearizing around a static equilibrium and assuming plane-wave perturbations yields a |dispersion relation| with both acoustic (k²) and quantum-pressure (k⁴) contributions. In the regime where the quantum-pressure term dominates, you get ω = Dq², where D = ℏ/(2m).

The proton imprints a radial density profile ρ(r) = γ/r⁴ on the vacuum medium. This makes the local speed of sound vary with distance, creating an effective potential that is mathematically identical to the Coulomb potential. The time-harmonic wave equation in this medium becomes the hydrogenic Coulomb equation. Angular momentum quantization isn't postulated. It emerges from the spherical symmetry of the medium, the same way modes emerge on a drumhead.

**The key move.** White doesn't reconcile quantum mechanics with gravity. **He proposes that quantization itself is an emergent property of the vacuum treated as a dispersive medium.** The quantum rules aren't fundamental. They're what you get when waves propagate through a medium with the right properties. If that's true, "quantum" and "gravitational" might not be separate regimes at all. They'd both be features of the same underlying medium.

**The Puthoff connection.** This paper extends a research thread that traces straight back to Hal Puthoff's earlier work on |stochastic electrodynamics|. Puthoff showed in the 1980s and 1990s that the ground state of hydrogen can be understood as an equilibrium: the electron radiates energy, as any accelerating charge should, but simultaneously absorbs compensating energy from |zero-point fluctuations| in the vacuum. The orbit where radiation and absorption balance is exactly the known ground state. He later generalized this: *all* quantum ground states are equilibria between radiation and vacuum absorption.

> **stochastic electrodynamics**: A research program that derives quantum-like behavior from classical electrodynamics plus the zero-point fluctuations of the vacuum. Puthoff's hydrogen ground-state work in this tradition is the direct ancestor of White's dynamic vacuum model.

White's dynamic vacuum model takes this further. Where Puthoff showed the vacuum sustains quantum states, White shows the vacuum's dispersive properties *generate* the quantized spectrum itself. The quantum potential isn't mysterious; it's a pressure term in a fluid. Quantization isn't axiomatic; it's acoustic resonance.

> **Read Next**
>
> Emergent Quantization from a Dynamic Vacuum is the deep-dive companion to this section. It walks White's math step by step, from the |Madelung transformation| to the full hydrogen spectrum. This guide is the synthesis view; that one is the engine room.

## The Conceptual Gap {#gap}

Here's the distinction that's easy to miss if you read these papers in isolation.

**ANU approach.** Accepts the standard framework. Quantum mechanics and general relativity are separate theories. The experiment creates conditions where both matter, so we can observe how they interact at the boundary. The goal: collect data that constrains future theories of quantum gravity.

**White approach.** Reframes the question entirely. Maybe there's no boundary to reconcile. Maybe quantum behavior is already a property of the vacuum medium, the same medium whose curvature *is* gravity. If quantization is emergent from the medium, the "quantum gravity problem" may be an artifact of treating quantum rules as fundamental when they're actually derived.

The ANU team is building a better telescope to look at the boundary between two countries. White is suggesting those two countries might actually be the same country, viewed from different altitudes.

This doesn't mean one is right and the other wrong. They're complementary. The ANU experiment produces *data*: hard measurements of what happens when entangled massive particles feel gravity. White's model provides a *theoretical framework* that, if valid, would predict specific outcomes for exactly those kinds of experiments. The ANU data could eventually test White's model.

**Why this matters for Territory 01.** If White's framework holds up, and quantization really is emergent from the vacuum medium, then the vacuum isn't just the backdrop. It's the thing. Engineering the vacuum's properties (its density, its dispersion, its constitutive profile) would mean engineering quantum behavior and gravitational behavior at the same time, from the same substrate. This is exactly what Puthoff's DIRD 15 (Vacuum Spacetime Engineering) proposes, what DIRD 13 (Warp Drive) requires, and what DIRD 19 (Antigravity) is premised on. White's paper gives those speculative engineering concepts their first rigorous mathematical foundation published in a mainstream peer-reviewed journal.

> **Read Next**
>
> DIRD 15 (Vacuum Spacetime Engineering) and DIRD 13 (Warp Drive, Dark Energy, and Extra Dimensions) are both in the library. They read differently after this guide: White's paper is the first mainstream peer-reviewed mathematics underneath the engineering concepts they propose.

## How the Pieces Connect {#connections}

**Research lineage.** Puthoff's stochastic electrodynamics work in the late twentieth century established that the vacuum sustains ground states of atoms through continuous energy exchange. White's 2026 paper extends this by showing the vacuum *generates* the quantized spectrum itself. In parallel, Puthoff's DIRD 19 work on gravity and inertia as vacuum-interaction effects echoes through White's broader framing: the vacuum medium's properties are equivalent to spacetime geometry. On the experimental side, Bell tests with photons across the 1990s and 2010s led directly to ANU's 2026 Bell test with massive, momentum-entangled atoms. And the long-established |Casimir effect|, cited in DIRDs 24 and 36 as evidence that vacuum energy is real, is now joined by White's claim that this energy has structure that produces physics.

> **Subguide queued**
>
> DIRD 19 (Antigravity) surfaces twice in this lineage: gravity and inertia as vacuum-interaction effects. It is not in the library yet. Flagged here so the thread isn't lost; it completes the vacuum-engineering line alongside DIRDs 13 and 15.

**Implications chain.** ANU proves that momentum entanglement persists in massive atoms, the first experimental demonstration that quantum correlations hold for particles that feel gravity. Scaling that experiment (closing the locality loophole with 30+ cm separation, entangling different isotopes) probes the gravity-entanglement interface directly. White's model then makes predictions about what those tests should find: if quantization is emergent from vacuum dispersion, entanglement in a gravitational field should follow from the medium's constitutive properties, not from axioms layered on top.

Validation would mean the vacuum is engineerable. Altering its density, dispersion, or constitutive profile would alter both quantum and gravitational behavior at once. That's the point at which DIRD 15 becomes a real engineering discipline rather than pure speculation. And *that* is when you need interfaces: for monitoring vacuum states, tuning constitutive profiles, visualizing local dispersion characteristics, keeping a crew aware inside engineered vacuum conditions. That's what Territory 01 designs for.

## What White's Paper Does NOT Claim {#scope}

It's worth being precise about scope, because this paper is conservative in its claims despite the radical implications.

The paper demonstrates mathematical |isospectrality|: the acoustic problem and the quantum problem produce identical eigenvalues and eigenfunctions. It doesn't claim to have unified quantum mechanics and general relativity. It doesn't claim the vacuum literally is a fluid. It doesn't make predictions that differ from standard quantum mechanics for hydrogen; the whole point is that it reproduces the standard results exactly.

What it does do: it shows that quantization can arise from classical-like continuum physics plus dispersion, without quantum axioms. That's a proof of concept for an alternative ontology, a different story about *why* quantum mechanics works even though the *predictions* are identical. So where would this framework give different answers than standard QM? In regimes where the vacuum's properties are extreme: near black holes, in strong gravitational fields, at cosmological scales. Those are exactly the regimes where quantum gravity is needed and where experiments like ANU's are heading.

## What This Means for the Lab {#implications}

The DIRD collection posed a question: what would a civilization need to master to exhibit the flight characteristics reported in UAP encounters? The answer, spread across 38 papers, pointed to vacuum engineering, negative energy, propellantless propulsion, and spacetime manipulation. Every one of them requires physics breakthroughs that "may never come."

> **Territory Bridge**
>
> The DIRD collection's framing question starts from Territory 04's observational ground: the flight characteristics reported in UAP encounters. The New Science of UAP maps that side of the program. This guide maps the physics side. Same research program, viewed from two ends.

White's paper, published in a mainstream peer-reviewed journal, provides the first rigorous mathematical demonstration that quantization *can* emerge from vacuum properties. It doesn't prove vacuum engineering is possible. But it moves the conversation from "pure fantasy" to "mathematical framework with no free parameters that exactly reproduces observed physics." That's a real shift in the plausibility landscape.

Combined with the ANU experiment providing the first tools to *test* quantum behavior in gravitational contexts with massive particles, the two papers together tighten the feedback loop between theory and experiment in exactly the domain our speculative design work lives in.

> **Design Hook**
>
> We're not designing for arbitrary sci-fi anymore. We're designing for a physics landscape where the vacuum is increasingly understood as a structured, active medium, not empty background. The interfaces we speculatively design for vacuum engineering, warp field monitoring, and spacetime manipulation now have a published mathematical framework to anchor them. The speculative becomes less speculative with each paper like these.
