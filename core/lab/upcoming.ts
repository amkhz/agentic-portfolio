// ============================================
// SPECULATIVE DESIGN LAB — Upcoming Guides
// Lightweight metadata for in-flight or planned guides that
// surface as placeholder cards in the library grid. Pure data,
// no body. Parser / renderer do not touch this file — the
// TerritoryGrid renders UpcomingCard directly from this list.
// ============================================

import type { Territory } from './guide-types';

export type UpcomingStatus = 'drafting' | 'planned' | 'researching';

export interface UpcomingGuide {
  id: string;
  title: string;
  source: string;
  territory: Territory;
  status: UpcomingStatus;
  note?: string;
}

export const upcomingGuides: UpcomingGuide[] = [
  // T1 — Consciousness & Spacetime
  {
    id: 'dird-36-quantum-tomography',
    title: 'DIRD 36: Quantum Tomography of Negative Energy States',
    source: 'DIA / AAWSA Program',
    territory: 'T1',
    status: 'planned',
    note: 'The experimental test for the exotic propulsion cluster.',
  },
  {
    id: 'puthoff-sed-synthesis',
    title: 'Puthoff SED Framework — Synthesis',
    source: 'Harold Puthoff (EarthTech International)',
    territory: 'T1',
    status: 'researching',
  },

  // T4 — UAP Detection
  {
    id: 'knuth-2025-new-science',
    title: 'Knuth et al. (2025): The New Science of UAP',
    source: 'Submitted to Progress in Aerospace Sciences',
    territory: 'T4',
    status: 'planned',
    note: 'Landscape review of the international detection ecosystem.',
  },

  // T3 — Materials & Sensing
  {
    id: 'dird-22-metamaterials',
    title: 'DIRD 22: Metamaterials',
    source: 'DIA / AAWSA Program',
    territory: 'T3',
    status: 'planned',
  },
  {
    id: 'dird-31-20-sensing',
    title: 'DIRD 31 + 20: Sensing (combined)',
    source: 'DIA / AAWSA Program',
    territory: 'T3',
    status: 'planned',
  },
];
