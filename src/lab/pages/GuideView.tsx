import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

// STUB — Session B (T9) replaces this with the real guide viewer page.
export function GuideView() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
      <Helmet>
        <title>Guide — Speculative Design Lab</title>
      </Helmet>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <p className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
          Guide viewer placeholder for slug: {slug ?? "(none)"}. Real page lands in T9.
        </p>
      </div>
    </>
  );
}
