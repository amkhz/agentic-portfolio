import { cn } from "@core/utils";

interface MetricCardProps {
  value: string;
  label: string;
  accent?: "brass" | "magenta";
}

export function MetricCard({ value, label, accent = "brass" }: MetricCardProps) {
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
        {value}
      </p>
      <p className="mt-2 font-heading text-sm uppercase tracking-wide text-text-secondary">
        {label}
      </p>
    </div>
  );
}
