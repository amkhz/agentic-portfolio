import { cn } from "@core/utils";
import { CountUp } from "@/components/effects/CountUp";

interface MetricCardProps {
  value: string;
  label: string;
  accent?: "brass" | "magenta";
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

  // Statement entry: when the value is a status phrase ("Real, today") rather
  // than a figure, and the label runs sentence-length, the ledger treatment
  // inverts wrong -- a phrase blown up huge over a full sentence shouted in
  // mono caps. Flip it: status becomes a small kicker tag, the sentence reads
  // as body prose. Only non-numeric values with long labels take this path, so
  // every numeric metric block keeps the ledger figure untouched.
  const isStatement = !parsed && label.length > 72;

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
  return (
    <div className="border-t border-border-subtle pt-5">
      <p
        className={cn(
          "font-display text-4xl leading-none tracking-tight tabular-nums",
          accentClass
        )}
      >
        {parsed ? (
          <CountUp
            to={parsed.numeric}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            duration={2.5}
          />
        ) : (
          value
        )}
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-text-secondary">
        {label}
      </p>
    </div>
  );
}
