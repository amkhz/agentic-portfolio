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

  // Ledger entry, not a card: a top hairline rule, a brass figure, a mono
  // label. No box, no shadow, so an odd last item reads as a readout line
  // rather than an orphaned card. Magenta is the rare signal flare; green is
  // never an emphasis color (atmosphere/material only).
  return (
    <div className="border-t border-border-subtle pt-5">
      <p
        className={cn(
          "font-display text-4xl leading-none tracking-tight tabular-nums",
          accent === "magenta" ? "text-signal-primary" : "text-accent-primary"
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
