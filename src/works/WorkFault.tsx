import { Link } from "react-router";
import { worksCopy } from "@core/works/copy";

interface WorkFaultProps {
  onRestart: () => void;
}

/**
 * The considered fault, sibling of the deck's considered decline: when a
 * piece throws at runtime the visitor gets a card and two ways forward,
 * never the blank page React leaves when nothing catches.
 *
 * Deliberately built on lab tokens, not deck tokens. A fault can be the
 * work's chunk failing to load at all, in which case that chunk's CSS
 * never applied and every --deck-* variable is undefined; the lab entry's
 * own tokens are the only ones guaranteed to be there.
 */
export function WorkFault({ onRestart }: WorkFaultProps) {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-16">
      <div className="max-w-md">
        <h1 className="font-lab-heading text-3xl text-lab-text-primary">
          {worksCopy.fault.heading}
        </h1>
        <p className="mt-4 font-lab-body text-base leading-relaxed text-lab-text-secondary">
          {worksCopy.fault.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button
            type="button"
            tabIndex={0}
            onClick={onRestart}
            className="min-h-11 font-lab-mono text-sm uppercase tracking-[0.2em] text-lab-text-primary underline decoration-lab-border-strong underline-offset-8 hover:decoration-lab-text-primary"
          >
            {worksCopy.fault.restart}
          </button>
          <Link
            to="/"
            tabIndex={0}
            className="inline-flex min-h-11 items-center font-lab-mono text-sm uppercase tracking-[0.2em] text-lab-text-muted hover:text-lab-text-primary"
          >
            {worksCopy.fault.exit}
          </Link>
        </div>
      </div>
    </main>
  );
}
