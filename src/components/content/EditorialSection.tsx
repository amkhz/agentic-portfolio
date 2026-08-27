import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

interface EditorialSectionProps {
  /** Zero-padded section index, e.g. "01". Mono, tabular, brass. */
  index: string;
  /** Terse running-head tag that lives in the margin (mono, uppercase). */
  label: string;
  /** Display heading for the body column. */
  heading: string;
  children: ReactNode;
  className?: string;
}

/**
 * EditorialSection — a long-form section in the Conservatory register
 * (DESIGN.md "Field Notebook grammar"): a mono index + running-head label
 * living in the outside margin, paired with a display heading and prose in
 * the body column. Composed like a monograph, not a uniform stack. Below lg
 * the margin does not exist, so the running head is dropped rather than
 * restacked above the heading as a kicker.
 */
export function EditorialSection({
  index,
  label,
  heading,
  children,
  className,
}: EditorialSectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className ?? ""}`}>
      <Container>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
          {/* The running head is a margin device. Below lg there is no margin
              to run in and the pair collapses to a kicker stacked above the
              heading, which is the recipe the craft floor bans -- so it is
              hidden there and the heading carries the section alone. */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm tabular-nums text-accent-primary">
                {index}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                {label}
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 lg:col-start-4">
            <h2 className="font-display text-2xl leading-snug tracking-tight text-text-primary sm:text-3xl">
              {heading}
            </h2>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
