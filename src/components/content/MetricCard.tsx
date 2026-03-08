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

  return (
    <div
      className={cn(
        "rounded-lg border border-border-subtle bg-bg-elevated p-6",
        accent === "brass" && "shadow-glow-brass",
        accent === "magenta" && "shadow-glow-magenta"
      )}
    >
      <p
        className={cn(
          "font-display text-4xl leading-tight",
          accent === "brass" && "text-accent-primary",
          accent === "magenta" && "text-secondary-primary"
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
      <p className="mt-2 font-heading text-sm uppercase tracking-wide text-text-secondary">
        {label}
      </p>
    </div>
  );
}
