// ============================================
// CASE STUDY CONTENT — Types + Markdown loader
// Content lives in .md files alongside this file.
// Parser converts Markdown to typed sections.
// ============================================

// --- Section Types ---

export type TextSection = {
  type: 'text';
  heading?: string;
  body: string;
};

export type ImageSection = {
  type: 'image';
  src: string;
  alt: string;
  placeholder: string;
  caption?: string;
  aspect?: '16:9' | '4:3' | 'auto';
};

export type MetricsSection = {
  type: 'metrics';
  heading?: string;
  items: { value: string; label: string; accent?: 'brass' | 'magenta' }[];
};

export type ComparisonSection = {
  type: 'comparison';
  heading?: string;
  before: {
    label: string;
    image: { src: string; alt: string; placeholder: string };
    description?: string;
  };
  after: {
    label: string;
    image: { src: string; alt: string; placeholder: string };
    description?: string;
  };
};

export type QuoteSection = {
  type: 'quote';
  text: string;
  attribution: string;
  role?: string;
};

export type CalloutSection = {
  type: 'callout';
  label?: string;
  body: string;
};

export type PeekSection = {
  type: 'peek';
  targetId: string;
  tease: string;
};

export type CaseStudySection =
  | TextSection
  | ImageSection
  | MetricsSection
  | ComparisonSection
  | QuoteSection
  | CalloutSection
  | PeekSection;

// --- Markdown file imports ---

import aiLeadershipMd from './ai-leadership.md?raw';
import instantSowMd from './instant-sow.md?raw';
import instantDocReviewMd from './instant-doc-review.md?raw';
import buildingThisPortfolioMd from './building-this-portfolio.md?raw';
import theCraftMd from './the-craft.md?raw';
import theSoundMd from './the-sound.md?raw';
import theSystemMd from './the-system.md?raw';
import { parseCaseStudyMarkdown, parseConstellationContent } from './parse-case-study';

// --- Content by slug ---

export const caseStudyContent: Record<string, CaseStudySection[]> = {
  'ai-leadership': parseCaseStudyMarkdown(aiLeadershipMd),
  'instant-sow': parseCaseStudyMarkdown(instantSowMd),
  'instant-doc-review': parseCaseStudyMarkdown(instantDocReviewMd),
  'building-this-portfolio': parseCaseStudyMarkdown(buildingThisPortfolioMd),
};

// --- Constellation content (meta case study only) ---

const constellationBase = parseConstellationContent(buildingThisPortfolioMd);

export const constellationContent: {
  preamble: CaseStudySection[];
  nodes: Record<string, CaseStudySection[]>;
} = {
  preamble: constellationBase.preamble,
  nodes: {
    ...constellationBase.nodes,
    'the-craft': parseCaseStudyMarkdown(theCraftMd),
    'the-sound': parseCaseStudyMarkdown(theSoundMd),
    'the-system': parseCaseStudyMarkdown(theSystemMd),
  },
};
