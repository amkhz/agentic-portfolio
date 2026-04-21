// ============================================
// SPECULATIVE DESIGN LAB — Territory Metadata
// Four research territories from roadmap v5.1.
// Accent colors reference lab tokens (see design-system/lab-tokens.css),
// not raw hex — territory palette lives in the design-system layer.
// ============================================

import type { Territory } from './guide-types';

export interface TerritoryMeta {
  id: Territory;
  name: string;
  premise: string;
  accent: string;
  order: number;
}

// Order reflects the library's active-first display rhythm (T4 active,
// T1 extending, T3 queued, T2 queued) — LibraryIndex sorts by this field.
export const territoryMeta: Record<Territory, TerritoryMeta> = {
  T4: {
    id: 'T4',
    name: 'UAP Detection',
    premise:
      'Instrumented UAP science from first principles. Peer-reviewed methodology for anomalous-phenomena research.',
    accent: 'var(--lab-territory-t4)',
    order: 1,
  },
  T1: {
    id: 'T1',
    name: 'Consciousness & Spacetime',
    premise:
      'Consciousness as technology. Unified-field physics, ontological shock, and the substrate that ties them together.',
    accent: 'var(--lab-territory-t1)',
    order: 2,
  },
  T3: {
    id: 'T3',
    name: 'Materials & Sensing',
    premise:
      'Materials and instrumentation for the frontier. Superconductors, exotic alloys, sensor arrays.',
    accent: 'var(--lab-territory-t3)',
    order: 3,
  },
  T2: {
    id: 'T2',
    name: 'Space Manufacturing',
    premise:
      'Orbital-scale industry. Crystal growth, semiconductor fabrication, and power systems beyond the gravity well.',
    accent: 'var(--lab-territory-t2)',
    order: 4,
  },
};

export const territories: TerritoryMeta[] = Object.values(territoryMeta).sort(
  (a, b) => a.order - b.order,
);

// Lab-wide corpus stats. Hand-maintained — bump these when new source
// material is ingested. Numbers seed the library-hero meta line.
// Rationale: N guides is derived from the manifest at render time;
// peer-reviewed + DIRD counts describe the source material the guides
// draw from, not the guides themselves, so they can't be auto-counted.
export interface LabStats {
  peerReviewedPapersCited: number;
  dirdBriefsWalked: number;
}

export const labStats: LabStats = {
  peerReviewedPapersCited: 6,
  dirdBriefsWalked: 11,
};
