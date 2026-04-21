import type { Guide, Territory } from "@core/lab/guide-types";
import { territories } from "@core/lab/territories";
import { GuideCard } from "./GuideCard";
import { TerritoryBadge } from "./TerritoryBadge";

interface TerritoryGridProps {
  guides: Guide[];
}

function groupByTerritory(guides: Guide[]): Record<Territory, Guide[]> {
  const out: Record<Territory, Guide[]> = { T1: [], T2: [], T3: [], T4: [] };
  for (const guide of guides) {
    out[guide.frontmatter.territory].push(guide);
  }
  return out;
}

// The roadmap assigns a lifecycle state to each territory based on
// its order. Active gets the pulsing badge; extending reads normal;
// queued visually dims so the eye lands on live work first.
type Lifecycle = "active" | "extending" | "queued";
function lifecycleFor(order: number): Lifecycle {
  if (order === 1) return "active";
  if (order === 2) return "extending";
  return "queued";
}

const LIFECYCLE_LABEL: Record<Lifecycle, string> = {
  active: "Active",
  extending: "Extending",
  queued: "Queued",
};

export function TerritoryGrid({ guides }: TerritoryGridProps) {
  const grouped = groupByTerritory(guides);

  return (
    <div className="mt-16 space-y-20">
      {territories.map((territory) => {
        const territoryGuides = grouped[territory.id];
        const lifecycle = lifecycleFor(territory.order);
        const isQueued = lifecycle === "queued";

        return (
          <section
            key={territory.id}
            aria-labelledby={`territory-${territory.id}-heading`}
            className={`lab-territory-${territory.id.toLowerCase()}`}
          >
            <header
              className={
                isQueued
                  ? "flex flex-col gap-3 border-b border-lab-border-subtle pb-6 opacity-70"
                  : "flex flex-col gap-3 border-b border-lab-border-subtle pb-6"
              }
            >
              <div className="flex items-center gap-4">
                <TerritoryBadge
                  id={territory.id}
                  isActive={lifecycle === "active"}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
                    Territory
                  </span>
                  <span className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
                    {LIFECYCLE_LABEL[lifecycle]}
                  </span>
                </div>
              </div>
              <h2
                id={`territory-${territory.id}-heading`}
                className="font-lab-heading text-2xl font-semibold tracking-tight text-lab-text-primary md:text-3xl"
              >
                {territory.name}
              </h2>
              <p className="max-w-3xl font-lab-body text-base italic leading-relaxed text-lab-text-secondary md:text-lg">
                {territory.premise}
              </p>
            </header>

            {territoryGuides.length === 0 ? (
              <p className="mt-8 font-lab-mono text-xs tracking-wide text-lab-text-muted">
                No guides in this territory yet.
              </p>
            ) : (
              <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {territoryGuides.map((guide) => (
                  <li key={guide.slug}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
