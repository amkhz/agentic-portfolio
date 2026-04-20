import { Helmet } from "react-helmet-async";

// STUB — Session B (T6) replaces this with the real library index page.
export function LibraryIndex() {
  return (
    <>
      <Helmet>
        <title>Speculative Design Lab — labs.justinh.design</title>
      </Helmet>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <p className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
          Library index placeholder. Real page lands in T6.
        </p>
      </div>
    </>
  );
}
