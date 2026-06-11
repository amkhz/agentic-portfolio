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
    source: 'DIA / AAWSAP Program',
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

  // T3 — Materials & Sensing
  {
    id: 'dird-22-metamaterials',
    title: 'DIRD 22: Metamaterials',
    source: 'DIA / AAWSAP Program',
    territory: 'T3',
    status: 'planned',
  },
  {
    id: 'dird-31-20-sensing',
    title: 'DIRD 31 + 20: Sensing (combined)',
    source: 'DIA / AAWSAP Program',
    territory: 'T3',
    status: 'planned',
  },

  // T4 — UAP Observables & Field Science
  {
    id: 'wendt-duvall-sovereignty',
    title: 'Sovereignty and the UFO — Wendt & Duvall',
    source: 'Political Theory (2008)',
    territory: 'T4',
    status: 'planned',
    note: 'The political-theory companion to the government-efforts guide.',
  },
  {
    id: 'galileo-project-methods',
    title: 'The Galileo Project: Instrumented UAP Science at Scale',
    source: 'Galileo Project (Harvard / Avi Loeb)',
    territory: 'T4',
    status: 'planned',
    note: 'The ground-observatory counterpart to the UAPx field-methods guide.',
  },
];
