import type { Guide, Territory } from "@core/lab/guide-types";
import { territories } from "@core/lab/territories";
import { GuideCard } from "./GuideCard";

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

export function TerritoryGrid({ guides }: TerritoryGridProps) {
  const grouped = groupByTerritory(guides);

  return (
    <div className="mt-16 space-y-20">
      {territories.map((territory) => {
        const territoryGuides = grouped[territory.id];
        return (
          <section
            key={territory.id}
            aria-labelledby={`territory-${territory.id}-heading`}
          >
            <header className="flex flex-col gap-2 border-b border-lab-border-subtle pb-5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={
                    territory.id === "T1"
                      ? "h-3 w-3 rounded-full bg-lab-t1"
                      : territory.id === "T2"
                        ? "h-3 w-3 rounded-full bg-lab-t2"
                        : territory.id === "T3"
                          ? "h-3 w-3 rounded-full bg-lab-t3"
                          : "h-3 w-3 rounded-full bg-lab-t4"
                  }
                />
                <p className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
                  Territory {territory.id}
                </p>
              </div>
              <h2
                id={`territory-${territory.id}-heading`}
                className="font-lab-heading text-2xl font-semibold tracking-tight text-lab-text-primary md:text-3xl"
              >
                {territory.name}
              </h2>
              <p className="max-w-3xl font-lab-body text-base leading-relaxed text-lab-text-secondary md:text-lg">
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
