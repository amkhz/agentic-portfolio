---
id: emergent-quantization
title: Emergent Quantization from a Dynamic Vacuum
kicker: Research Guide Series
source:
  authors: White, Vera, Sylvester & Dudzinski
  year: 2026
  venue: Physical Review Research
accent: "#f0a050"
territory: T1
status: draft
order: 1
description: "A walk through the Madelung-hydrodynamics derivation of hydrogen's energy levels, treating the vacuum as a physical medium shaped by the proton."
figures: []
glossary:
  Casimir effect: "A real, measured force between two very close metal plates caused by vacuum fluctuations. It proves the vacuum has physical properties. White's company is literally named \"Casimir, Inc.\" — this is central to his research program."
  density: "In this context, not mass per volume in the normal sense. It's the vacuum's effective \"inertia\" — how much it resists being disturbed. The paper models this as ρ(r) = γ/r⁴, meaning the vacuum gets dramatically denser close to the proton."
  elasticity: "How \"springy\" the medium is — how strongly it pushes back when compressed. In the paper, this is captured by the bulk modulus B(r). Together with density, it determines the local speed of sound."
  imprints: "The proton's presence physically alters the vacuum's properties around it. Like how a heavy ball on a trampoline deforms the fabric, creating a \"landscape\" that other objects respond to."
  speed of sound: "Just as sound travels at different speeds through different materials (faster in steel, slower in air), acoustic disturbances in this vacuum model travel at different speeds depending on position. Near the proton, the medium is denser and has different elastic properties, so the effective sound speed changes — and it's this variation that creates the atomic structure."
  dispersion relation: "The mathematical rule connecting a wave's frequency (how fast it oscillates in time) to its wavenumber (how tightly packed it is in space). Different media have different rules, and this changes how waves propagate. It's like the medium's \"personality\" for wave behavior."
  wavenumber: "A measure of spatial frequency — how many wave cycles fit into a given distance. High wavenumber = short wavelength = tightly packed waves. Labeled 'q' or 'k' in the paper. Think of it as the spatial equivalent of frequency."
  quadratic dispersion: "The rule ω = Dq², where frequency scales with the SQUARE of the wavenumber. This is what converts the spatially quantized modes into the 1/n² energy spacing we observe in hydrogen. Without this specific relationship, you'd get resonances, but not the right ones."
  Schrödinger equation: The foundational equation of quantum mechanics that describes how quantum states evolve. It has a kinetic energy term proportional to k² (the Laplacian), which is exactly where the quadratic dispersion comes from in the Madelung picture.
  Madelung hydrodynamics: "In 1927, Erwin Madelung showed you can rewrite the Schrödinger equation as two fluid dynamics equations — a continuity equation (conservation of mass) and an Euler equation (Newton's law for fluids) — plus an extra term called the quantum potential. It's mathematically identical to QM, just a different language. White uses this to motivate treating the vacuum as an actual fluid."
  reduced Planck constant: "Written as ℏ (\"h-bar\"), it's Planck's constant h divided by 2π. It's the fundamental quantum of action — it sets the scale at which quantum effects become important. Its value is incredibly tiny: ~1.055 × 10⁻³⁴ J·s."
  reduced mass: "When two bodies orbit each other (like an electron and proton), you can simplify the math by replacing them with one body of \"reduced mass\" μ = (m₁·m₂)/(m₁+m₂). For hydrogen, μ ≈ 0.99946 × mₑ — almost the electron mass, since the proton is ~1836 times heavier."
  constitutive profile: "A description of a material's physical properties at each point in space. Think of it like a map: at every distance r from the proton, this tells you the density and elasticity of the vacuum medium. The specific profile chosen here is designed to produce a 1/r potential, matching the Coulomb force."
  1/r term: "A quantity that gets larger as you get closer to the proton (as r shrinks). This is the same mathematical form as the Coulomb electric potential (V = ke²/r) and gravitational potential. It's what makes hydrogen hydrogen — it's the signature of a single point charge."
  Coulomb problem: "The quantum mechanical problem of an electron bound to a proton by the 1/r electric force. Solving it gives you the hydrogen atom's energy levels, orbital shapes, and spectral lines. It's one of the few exactly solvable problems in QM."
  evanescent: "A wave that decays exponentially instead of propagating. Think of light hitting a surface at total internal reflection — there's a \"ghost\" wave that penetrates a tiny distance but dies off rapidly. In this model, bound states are evanescent in the far field (A < 0), which is what traps them near the proton."
  electrostatic energy density: The energy stored in the electric field per unit volume. Around a point charge, the field goes as 1/r², so the energy density (proportional to field²) goes as 1/r⁴. This is what motivates the density profile ρ(r) = γ/r⁴.
  bulk modulus: "A measure of a material's resistance to uniform compression. High bulk modulus = hard to squeeze. In the paper, B(r) varies with position (B∞ + β_B/r³), and together with the density, determines the local sound speed c² = B/ρ."
  Helmholtz equation: "The time-independent wave equation. If you have a wave oscillating at a single frequency, this equation describes its spatial pattern. It's the same equation that governs resonant modes in acoustic cavities, electromagnetic waveguides, and — here — the dynamic vacuum around a proton."
  spherically symmetric: The same in every direction from the center. A proton by itself has no preferred direction, so the vacuum profile it creates depends only on distance r, not on angles. This symmetry is what allows the separation of variables trick.
  single-valued: A function that gives exactly one answer for each input. If you walk all the way around a circle in the φ direction, you must return to the same value — otherwise the solution would be discontinuous and physically meaningless. This 2π-periodicity requirement is what forces m to be an integer.
  spherical harmonics: "The unique set of smooth, single-valued functions on a sphere. They're nature's \"basis set\" for angular patterns — any smooth function on a sphere can be built from them. They show up everywhere: atomic orbitals, gravitational fields, antenna patterns, even computer graphics lighting. Each one is labeled by ℓ (total angular structure) and m (orientation)."
  Laguerre polynomials: A family of mathematical functions that appear as the radial part of hydrogen wavefunctions. Each one is labeled by n (which shell) and ℓ (orbital shape). They determine how the electron probability density varies with distance — things like how many radial nodes an orbital has.
  Rydberg formula: "The empirical formula discovered by Johannes Rydberg in 1888 that predicts all hydrogen spectral lines: 1/λ = R(1/n₁² − 1/n₂²). It was one of the great mysteries of 19th-century physics — why does this simple pattern exist? Standard QM explains it through the Schrödinger equation; this paper explains it through acoustic resonance."
  reduced-mass Rydberg constant: "The Rydberg constant R_H, adjusted for the fact that the proton isn't infinitely heavy. The electron and proton both orbit their common center of mass, which slightly shifts all the energy levels. R_H = R_∞ × (μ/mₑ), where R_∞ is the infinite-mass Rydberg constant."
  Casimir, Inc.: "Harold White's company in Houston, focused on \"dynamic vacuum engineering.\" White previously led NASA's Eagleworks lab, where he worked on advanced propulsion concepts including warp drive feasibility. The company's name references the Casimir effect, and their research program treats the quantum vacuum as an engineerable medium."
  pilot-wave: "Also called de Broglie-Bohm theory. A deterministic interpretation of QM where particles are real objects guided by a \"pilot wave.\" The wave is described by the Schrödinger equation, but the particle has a definite position at all times. This paper's acoustic framework has strong conceptual parallels — the vacuum medium plays a role similar to the pilot wave."
  stochastic electrodynamics: "A research program (SED) that tries to derive quantum behavior from classical electrodynamics plus zero-point fluctuations of the electromagnetic field. The idea is that the vacuum's electromagnetic noise is what causes quantum-like behavior. This paper's approach is in a similar spirit but uses acoustic/hydrodynamic analogies instead."
  relativistic corrections: "Adjustments to the hydrogen energy levels that arise from Einstein's special relativity. Electrons in hydrogen move at roughly 1% the speed of light, fast enough that relativistic effects create small but measurable shifts in the spectrum. Any complete theory of hydrogen must account for these."
  fine structure: "The small splitting of hydrogen's energy levels caused by relativistic corrections and spin-orbit coupling. It's on the order of α² ≈ 1/137² times the main energy levels. Standard QM predicts it precisely via the Dirac equation."
  spin-orbit coupling: "The interaction between an electron's spin (intrinsic angular momentum) and its orbital angular momentum. This paper deals with a scalar (spinless) acoustic field, so incorporating spin would require extending the framework significantly — possibly the biggest open challenge."
  Madelung transformation: "The trick of writing a quantum wavefunction in polar form: ψ = √ρ · e^(iS/ℏ), where ρ is interpreted as fluid density and S defines a velocity field v = ∇S/m. This converts the Schrödinger equation into classical-looking fluid dynamics equations plus one extra term: the quantum potential."
  continuity equation: "∂ρ/∂t + ∇·(ρv) = 0. It says mass is conserved — fluid doesn't appear or disappear, it only flows. This is one of the two Madelung equations and is completely classical in form."
  Euler equation: "The fluid dynamics version of F = ma. It says the acceleration of a fluid element equals the forces acting on it (pressure gradients, external forces, etc.). In the Madelung version, there's an extra force from the quantum potential."
  quantum potential: "The term Q = −(ℏ²/2μ)·∇²√ρ/√ρ that appears in the Madelung picture. It's bizarre because it depends on the curvature of the density field — a fluid element \"knows\" about the shape of the density around it, not just the local value. This nonlocal character is what produces quantum behavior in the hydrodynamic picture. In the paper, it's what generates the k⁴ (dispersive) correction to normal sound propagation."
  Bose-Einstein condensates: A state of matter formed when a dilute gas of bosons is cooled to near absolute zero, causing them to occupy the same quantum state. BECs exhibit macroscopic quantum behavior — superfluid flow, quantized vortices — and their excitations follow the Bogoliubov dispersion relation, which has the same k² + k⁴ form derived in this paper.
  Bogoliubov dispersion: "The dispersion relation for excitations in a superfluid or BEC: ω² = c²k² + (ℏ²/4m²)k⁴. At low k, excitations are sound-like (phonons). At high k, they become particle-like with quadratic dispersion. This dual character is a key feature of quantum fluids, and the paper leverages the high-k limit."
  gradient-elastic: "Materials whose elastic energy depends not just on strain but on strain gradients (spatial derivatives of deformation). This introduces length-scale-dependent effects and k⁴ terms in the dispersion — the same mathematical structure as the quantum potential. It's a classical analogue that shows quadratic dispersion isn't exclusively quantum."
---

## 🎯 The Big Picture {#big-picture}

This paper is asking a deceptively simple question: **Why does the hydrogen atom only allow certain energy levels?** In standard quantum mechanics, we just accept this as a rule — energy is quantized, end of story. White and his team are proposing something different: what if quantization isn't a fundamental law, but an emergent consequence of the medium that waves travel through?

Think about a guitar string. Nobody programs it to vibrate at specific frequencies — the length, tension, and boundary conditions (where it's fixed at each end) naturally select which vibrations can exist. All others destructively interfere and die out. The paper argues hydrogen works the same way: the vacuum itself is a physical medium, and the proton shapes that medium so only certain "standing wave" patterns can survive.

## 🌊 What is the "Dynamic Vacuum"? {#vacuum}

In everyday language, "vacuum" means empty space. But in modern physics, the vacuum is anything but empty — it has energy, it has fluctuations, and it can exert forces (like the |Casimir effect|). This paper takes that idea further and treats the vacuum like a literal physical medium — like air or water — that has measurable properties like |density| and |elasticity|.

The word "dynamic" is key — this vacuum responds to what's in it. A proton doesn't just sit passively in empty space. It |imprints| a structure onto the vacuum, creating a radially varying medium where the |speed of sound| changes depending on how far you are from the proton.

## 📐 Ingredient #1: Quadratic Dispersion {#ingredient-1}

A |dispersion relation| tells you how waves behave in a medium. In normal air, sound has a linear dispersion: double the |wavenumber| (make the wave more tightly packed), and the frequency doubles. Simple.

But this vacuum model has |quadratic dispersion|: ω = Dq². If you double the wavenumber, the frequency *quadruples*. This specific relationship is not arbitrary — it's the same mathematical form as the kinetic energy term in the |Schrödinger equation| (E = ℏ²k²/2m). The paper derives this from |Madelung hydrodynamics|, which is a way of rewriting quantum mechanics as fluid dynamics.

The key constant is D = ℏ/(2m_eff), where ℏ is the |reduced Planck constant| and m_eff is an effective mass. When they calibrate to real hydrogen data, m_eff turns out to be exactly the |reduced mass| of the electron-proton system. No tuning needed.

## 🧲 Ingredient #2: The Coulombic Profile {#ingredient-2}

The second ingredient is how the proton shapes the vacuum around it. The paper models this with a specific |constitutive profile| — a recipe for how the vacuum's properties vary with distance from the proton.

The effective inverse sound speed takes the form: 1/c²(r) = A(ω) + C(ω)/r. That |1/r term| is the critical piece — it makes the wave equation mathematically identical to the |Coulomb problem|. The constant A(ω) controls whether modes can propagate or are |evanescent| (trapped).

The density is modeled as ρ(r) = γ/r⁴, inspired by the |electrostatic energy density| around a point charge. Combined with a specific |bulk modulus| profile, this produces the required Coulombic sound-speed variation.

## ✨ How Quantization Emerges {#emergence}

With both ingredients in place, the paper writes the |Helmholtz equation|: (∇² + k²_eff)p = 0. This is just the wave equation for a single frequency — an acoustic resonance equation. Because the problem is |spherically symmetric|, they can separate it into an angular part and a radial part.

**Angular part:** The requirement that solutions be |single-valued| and well-behaved on a sphere automatically produces the |spherical harmonics| Y_ℓm(θ,φ). These are the familiar orbital shapes — s orbitals (ℓ=0, spherical), p orbitals (ℓ=1, dumbbell), d orbitals (ℓ=2, clover), and so on. The quantum numbers ℓ and m aren't postulated; they're forced by geometry.

**Radial part:** The 1/r term from the sound-speed profile makes the radial equation identical to the hydrogenic radial equation. Requiring solutions that are finite at r = 0 and decay to zero at infinity forces only specific values of the spatial scale parameter κₙ. The solutions are |Laguerre polynomials| — exactly the textbook hydrogen wavefunctions.

**Scale → frequency:** Finally, the quadratic dispersion converts each allowed spatial mode into a frequency: ωₙ = ω*/n². This is the |Rydberg formula| — the exact pattern of hydrogen's spectral lines, discovered experimentally in the 1880s. The paper reproduces it with zero free parameters after one calibration to the |reduced-mass Rydberg constant|.

## 💡 So What? Why Does This Matter? {#so-what}

The standard interpretation of QM says quantization is a fundamental axiom — energy comes in discrete chunks, period. This paper offers an alternative reading: quantization is *emergent*. It arises from the physical properties of a medium (the vacuum), just as discrete resonant frequencies arise in any bounded acoustic system.

This matters for several reasons. First, if the vacuum is a real medium with tunable properties, that opens the door to engineering applications — modifying vacuum properties could, in principle, affect fundamental physics. This connects to White's broader work at |Casimir, Inc.| on dynamic vacuum engineering. Second, it fits into a long tradition of |pilot-wave| and |stochastic electrodynamics| theories that try to find a physical mechanism underlying quantum behavior, rather than treating it as irreducibly probabilistic.

**Important caveat:** The paper reproduces hydrogen's spectrum exactly, but partly by design — the constitutive profile is *chosen* to produce Coulombic structure. The real test will be whether this framework can handle multi-electron atoms, predict new phenomena, or connect to |relativistic corrections| like |fine structure| and |spin-orbit coupling|. That said, as a mathematical demonstration, it's clean and rigorous.

## 📎 The Appendix: Where the Dispersion Comes From {#appendix}

The appendix derives the quadratic dispersion from first principles using the |Madelung transformation|. You start with the Schrödinger equation, write the wavefunction as ψ = √ρ · e^(iS/ℏ), and out fall two fluid equations: a |continuity equation| (conservation of mass) and an |Euler equation| (Newton's second law for fluids).

The crucial extra ingredient is the |quantum potential| Q = −(ℏ²/2μ)·∇²√ρ/√ρ. This term has no classical analogue — it's a force that depends on the *shape* of the density distribution, not just its value. When you linearize (consider small perturbations) and look for plane-wave solutions, you get the dispersion relation ω² = c²_L k² + D²k⁴.

At long wavelengths (small k), the k² term dominates and you get ordinary sound waves. At short wavelengths (large k), the k⁴ term takes over and you enter the quadratic regime ω ≈ Dk². This is the regime relevant for atomic-scale physics, and it's where the hydrogen spectrum emerges. This same dispersion also appears in |Bose-Einstein condensates| (the |Bogoliubov dispersion|) and certain |gradient-elastic| materials.
