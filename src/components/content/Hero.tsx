import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { RegistrationMark } from "@/components/fieldnotebook";
import { HeroScrim } from "@/components/content/HeroScrim";
import { springSettle } from "@/components/effects/motionConfig";

// Hero settle — the home page's one ambitious moment. The type column rises
// and settles in sequence (kicker, headline, lede, action) over the
// atmospheric atrium on a cushioned spring. No overshoot; honors reduced-motion.
const settleContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const settleItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: springSettle },
};

/**
 * Home hero - "The Conservatory" register (ADR-013 / DESIGN.md).
 * Image-forward, asymmetric editorial composition over an atmospheric
 * biophilic atrium. Echoes the Field Notebook grammar: a mono kicker,
 * registration marks framing the type column, and a humus scrim that keeps
 * the copy anchored to the lower-left rather than centered.
 *
 * NOTE: the hero image is a Sprint 0 north-star placeholder
 * (mocks/recalibration-sprint0). Production finals (V4_QUALITY_48 at the
 * real crop) land in Plan A Phase 3.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const containerProps = reduced
    ? {}
    : { variants: settleContainer, initial: "hidden" as const, animate: "show" as const };
  const itemProps = reduced ? {} : { variants: settleItem };

  return (
    <section className="relative isolate flex min-h-[82vh] items-end overflow-hidden bg-bg-deep">
      {/* Atmospheric anchor - inhabited biophilic atrium */}
      <img
        src="/images/conservatory-hero.png"
        alt="A soaring biophilic atrium at night, mature trees rising through warm-lit architecture with people gathered below"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Warm scrim - legibility at lower-left, plus a top fade so the image
          blends under the sticky translucent header instead of meeting it with
          a hard seam (most visible in light mode). Token-only, re-tints per mode. */}
      <HeroScrim top bottom left />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-24 sm:pt-44">
        {/* Type column framed as an instrument plate - registration marks in
            the margin, no panel fill, so the atrium reads through. Generous
            inset keeps the marks framing the copy, not crowding it. */}
        <motion.div
          className="relative max-w-[60ch] py-8 pl-9 sm:py-12 sm:pl-14"
          {...containerProps}
        >
          <RegistrationMark corners={["tl", "bl"]} />

          <motion.p
            className="font-mono text-xs uppercase tracking-wider text-accent-primary"
            {...itemProps}
          >
            <span className="tabular-nums text-text-secondary">00</span>
            <span aria-hidden="true" className="mx-2 text-text-muted">
              /
            </span>
            Product design leadership
          </motion.p>
          <motion.h1
            className="mt-4 max-w-[20ch] font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl"
            {...itemProps}
          >
            Making complex things clear, useful, and human
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[54ch] font-body text-lg leading-normal text-text-secondary"
            {...itemProps}
          >
            Fifteen years turning complex systems into experiences people
            trust.
          </motion.p>
          <motion.div className="mt-10" {...itemProps}>
            <Button variant="primary" href="#work">
              View My Work
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
