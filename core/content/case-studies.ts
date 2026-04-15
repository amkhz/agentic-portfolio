// ============================================
// CASE STUDY CONTENT — Types, metadata + Markdown loader
// Content lives in .md files alongside this file.
// Parser converts Markdown to typed sections.
// ============================================

// --- Case Study Metadata ---

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  template?: 'standard' | 'constellation';
  heroMetric?: {
    value: string;
    label: string;
  };
  heroImage: {
    src: string;
    alt: string;
    placeholder?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-leadership',
    title: 'Pioneering AI Adoption',
    subtitle: 'Strategy, tooling, and the future of design control.',
    tags: ['Strategy', 'AI/ML', 'Design Leadership', 'Organizational Change'],
    heroMetric: {
      value: '100%',
      label: 'team AI tool adoption',
    },
    heroImage: {
      src: '/images/intro.png',
      alt: 'AI workshop presentation showing the 6-step prototyping process',
      placeholder: 'Screenshot of "Building with AI Tools" presentation title slide, or a composite showing the Define→Scope→Plan→Build→Test→Iterate workflow',
    },
  },
  {
    slug: 'instant-sow',
    title: 'Instant Scope of Work',
    subtitle: 'AI-augmented scope of work for renovation projects.',
    tags: ['Product Design', 'GenAI', 'Efficiency', 'B2B'],
    heroMetric: {
      value: '50%',
      label: 'target reduction in SOW completion time',
    },
    heroImage: {
      src: '/images/sow-toolbox.png',
      alt: 'My SOW Toolbox interface showing Upload, Describe, and Recycle options',
      placeholder: 'High-fidelity mockup of the "My Scope of Work Toolbox" UI showing the three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW',
    },
  },
  {
    slug: 'instant-doc-review',
    title: 'Instant Document Review',
    subtitle: 'Transparent, auditable AI for loan document processing.',
    tags: ['Product Design', 'HITL', 'Enterprise', 'AI Ops'],
    heroMetric: {
      value: '75%',
      label: 'reduction in document review time',
    },
    heroImage: {
      src: '/images/idr-hifi.png',
      alt: 'Property Admin Page showing extracted data alongside original document viewer',
      placeholder: 'High-fidelity mockup of the Property Admin Page with document viewer panel, extracted data fields, and rule override controls',
    },
  },
];

export const metaCaseStudy: CaseStudy = {
  slug: 'building-this-portfolio',
  title: 'Building This Portfolio',
  subtitle: 'A living case study that grows with the project.',
  tags: ['Design Systems', 'AI Workflow', 'Meta', 'Process'],
  template: 'constellation',
  heroImage: {
    src: '/images/meta.png',
    alt: 'Composite preview of the portfolio build process and final UI',
    placeholder: 'Meta case study hero image showing process and outcome side by side',
  },
};

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
