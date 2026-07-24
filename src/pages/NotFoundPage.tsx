import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion, arc } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { springSettle } from "@/components/effects/motionConfig";

export function NotFoundPage() {
  const shouldReduce = useReducedMotion();

  // The "404" drifts in along a curved path and settles — the page copy says
  // it "drifted into the void," so the numeral arrives the same way. arc()
  // supplies the orbital bulge; springSettle (bounce 0) drives the x/y arrival
  // so it lands without overshoot. Reduced motion → static, no drift.
  const driftArc = useMemo(() => arc({ strength: 0.32, direction: "ccw" }), []);
  const numeralMotion = shouldReduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { x: 52, y: -34, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: {
          path: driftArc,
          ...springSettle,
          delay: 0.1,
          opacity: { duration: springSettle.duration, delay: 0.1 },
        },
      };

  return (
    <>
      <Helmet>
        <title>404 | Justin Hernandez</title>
        <meta
          name="description"
          content="This page drifted into the void. Whatever you were looking for isn't here, but the rest of the site is."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">

        <Container className="relative z-10 text-center">
          <motion.h1
            {...numeralMotion}
            className="font-display text-5xl tracking-tight text-text-primary sm:text-[6rem]"
          >
            404
          </motion.h1>

          <p className="mx-auto mt-4 max-w-md font-body text-lg text-text-secondary leading-normal">
            This page drifted into the void. Whatever you were looking for isn&apos;t here, but the rest of the site is.
          </p>

          <div className="mt-10">
            <Button href="/" variant="primary">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
