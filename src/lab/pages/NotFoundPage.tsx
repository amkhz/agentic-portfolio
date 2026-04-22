import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Not found — Perihelion</title>
      </Helmet>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center md:px-10">
        <p className="font-lab-mono text-xs tracking-wider text-lab-text-muted">
          404 — off the map
        </p>
        <h1 className="mt-4 font-lab-heading text-3xl font-semibold tracking-tight text-lab-text-primary md:text-4xl">
          This page isn&apos;t in the archive
        </h1>
        <p className="mt-6 font-lab-body text-lg leading-relaxed text-lab-text-secondary">
          The guide you&apos;re looking for may have been renamed or hasn&apos;t been published yet.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block font-lab-body text-base text-guide-accent hover:underline"
        >
          Return to the archive
        </Link>
      </div>
    </>
  );
}
