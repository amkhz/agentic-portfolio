interface MetricGridProps {
  children: React.ReactNode;
}

export function MetricGrid({ children }: MetricGridProps) {
  // Two columns: balanced rows, editorial room for each figure, and an odd
  // last entry reads as a ledger line under its own rule rather than a lone
  // orphaned card.
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
      {children}
    </div>
  );
}
