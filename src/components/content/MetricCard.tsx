import { cn } from "@core/utils";

interface MetricCardProps {
  value: string;
  label: string;
  accent?: "brass" | "magenta";
}

/**
 * A caption stops being a ledger label and starts being a sentence somewhere
 * in the 30-55 character band, and raw length alone does not find the line:
 * measured across every metric block in core/content, 45 leaves "Rendered as
 * finished heroes, not mood boards" (44) shouting while 30 demotes "Eligible
 * loans used SOW Recycle" (31), which was never shouting to begin with. What
 * separates them is the clause, and the comma is where the clause shows. So:
 * long, or shorter but jointed.
 *
 * Terse ledger labels ("Team AI tool adoption", "Target SOW completion time",
 * "Condition rate (down from 54%)") keep the mono register.
 */
const SENTENCE_LABEL_CHARS = 45;
const CLAUSE_LABEL_CHARS = 30;

function isSentenceLabel(label: string): boolean {
  if (label.length > SENTENCE_LABEL_CHARS) return true;
  return label.length > CLAUSE_LABEL_CHARS && label.includes(",");
}

function parseNumericValue(value: string): {
  numeric: number;
  prefix: string;
  suffix: string;
} | null {
  const match = value.match(/^([^0-9]*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2]);
  if (isNaN(num)) return null;
  return { prefix: match[1], numeric: num, suffix: match[3] };
}

export function MetricCard({ value, label, accent = "brass" }: MetricCardProps) {
  const parsed = parseNumericValue(value);
  const accentClass =
    accent === "magenta" ? "text-signal-primary" : "text-accent-primary";

  // A sentence-length caption is prose, whatever sits above it. Uppercase mono
  // is a label register: it is legible for two or three words and turns into
  // shouting the moment it carries a clause. Both branches below switch the
  // caption to body prose past the threshold; only the register changes, never
  // the words.
  const isSentence = isSentenceLabel(label);

  // Statement entry: when the value is a status phrase ("Real, today") rather
  // than a figure, and the label runs sentence-length, the ledger treatment
  // inverts wrong -- a phrase blown up huge over a full sentence. Flip it:
  // status becomes a small kicker tag, the sentence reads as body prose.
  const isStatement = !parsed && isSentence;

  if (isStatement) {
    return (
      <div className="border-t border-border-subtle pt-5">
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            accentClass
          )}
        >
          {value}
        </p>
        <p className="mt-3 font-body text-base leading-normal text-text-primary sm:text-lg">
          {label}
        </p>
      </div>
    );
  }

  // Ledger entry, not a card: a top hairline rule, a brass figure, a mono
  // label. No box, no shadow, so an odd last item reads as a readout line
  // rather than an orphaned card. Magenta is the rare signal flare; green is
  // never an emphasis color (atmosphere/material only).
  //
  // The figure is printed, not counted up. A count-up states a number that is
  // not true for as long as it runs, and these figures are claims about real
  // work on the surfaces where being believed is the entire product. It was
  // also getting them wrong outright: the parser takes the FIRST number in the
  // string, so "17 min -> <10 min" counted 0..17 while the rest of the line
  // sat frozen, and "1 spec / 4 directions" rendered "0 spec / 4 directions"
  // (R2a: four measured strikes). `parsed` stays, because deciding figure vs
  // statement still depends on whether the value is a number at all.
  return (
    <div className="border-t border-border-subtle pt-5">
      <p
        className={cn(
          "font-display text-4xl leading-none tracking-tight tabular-nums",
          accentClass
        )}
      >
        {value}
      </p>
      {/* R2a: lowering the statement threshold alone fixed none of the
          shouted captions, because every one of them sits under a value that
          parses as a figure ("4 directions", "50%") and so never reached the
          statement branch at all. The caption's register is what was wrong,
          not the branch it took. */}
      <p
        className={cn(
          "mt-2",
          isSentence
            ? "max-w-[42ch] font-body text-sm leading-normal text-text-secondary"
            : "font-mono text-xs uppercase tracking-wider text-text-secondary"
        )}
      >
        {label}
      </p>
    </div>
  );
}
