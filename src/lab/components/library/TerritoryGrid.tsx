import { motion, useReducedMotion } from "motion/react";
import { springSoft } from "@/components/effects/motionConfig";
import type { Guide, Territory } from "@core/lab/guide-types";
import { territories } from "@core/lab/territories";
import type { UpcomingGuide } from "@core/lab/upcoming";
import { upcomingGuides } from "@core/lab/upcoming";
import { RegisterShelf, RegisterUpcomingShelf } from "./RegisterShelf";
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

function groupUpcomingByTerritory(
  upcoming: UpcomingGuide[],
): Record<Territory, UpcomingGuide[]> {
  const out: Record<Territory, UpcomingGuide[]> = {
    T1: [],
    T2: [],
    T3: [],
    T4: [],
  };
  for (const u of upcoming) {
    out[u.territory].push(u);
  }
  return out;
}

// The roadmap assigns a lifecycle state to each territory based on
// its order. The label reads Active / Extending / Queued; queued
// sections visually dim so the eye lands on live work first.
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
  const groupedUpcoming = groupUpcomingByTerritory(upcomingGuides);
  const shouldReduce = useReducedMotion();

  const sectionMotion = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: springSoft,
      };

  return (
    <div className="mt-20 space-y-20 md:mt-28">
      {territories.map((territory) => {
        const territoryGuides = grouped[territory.id];
        const territoryUpcoming = groupedUpcoming[territory.id];
        const hasBuilt = territoryGuides.length > 0;
        const hasUpcoming = territoryUpcoming.length > 0;
        const lifecycle = lifecycleFor(territory.order);
        const isQueued = lifecycle === "queued";

        return (
          <motion.section
            key={territory.id}
            aria-labelledby={`territory-${territory.id}-heading`}
            className={`lab-territory-${territory.id.toLowerCase()}`}
            {...sectionMotion}
          >
            <header
              className={
                isQueued
                  ? "flex flex-col gap-3 border-b border-lab-border-subtle pb-6 opacity-70"
                  : "flex flex-col gap-3 border-b border-lab-border-subtle pb-6"
              }
            >
              <div className="flex items-center gap-4">
                <TerritoryBadge id={territory.id} />
                <span className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
                  {LIFECYCLE_LABEL[lifecycle]}
                </span>
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

            {!hasBuilt && !hasUpcoming ? (
              <p className="mt-8 font-lab-mono text-xs tracking-wide text-lab-text-muted">
                No guides in this territory yet.
              </p>
            ) : (
              <>
                {hasBuilt ? (
                  <RegisterShelf guides={territoryGuides} />
                ) : null}

                {hasUpcoming ? (
                  <>
                    <div
                      className={
                        hasBuilt
                          ? "mt-14 flex items-center gap-3"
                          : "mt-8 flex items-center gap-3"
                      }
                    >
                      <span className="font-lab-mono text-[0.65rem] uppercase tracking-[0.18em] text-lab-text-muted">
                        In the pipeline
                      </span>
                      <span
                        aria-hidden
                        className="h-px flex-1 bg-lab-border-subtle"
                      />
                    </div>
                    <RegisterUpcomingShelf guides={territoryUpcoming} />
                  </>
                ) : null}
              </>
            )}
          </motion.section>
        );
      })}
    </div>
  );
}
