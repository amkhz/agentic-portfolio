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
  template?: 'standard' | 'constellation' | 'hub';
  heroMetric?: {
    value: string;
    label: string;
  };
  /** Cross-link to a paired study (origin <-> evolution). Renders as an
   *  end-of-study banner. `kicker` names the relationship direction. */
  relatedStudy?: {
    slug: string;
    kicker: string;
    direction: 'forward' | 'back';
  };
  /** Folds this study behind a hub page. Studies with a parentHub are
   *  reached through the hub (and each other's banner), not the work index. */
  parentHub?: string;
  /** Hub-page content (template: 'hub'): an opinionated thesis and the
   *  doors into the studies it introduces. */
  hub?: {
    headline: string;
    body: string;
    doors: { slug: string; label: string; line: string }[];
    /** The breadth layer below the doors: the rest of the body of work.
     *  Items with a `slug` link to a deep dive; items without stand as
     *  stated scope (work without its own study yet). */
    bodyOfWork?: {
      heading: string;
      intro?: string;
      items: { label: string; line: string; slug?: string }[];
    };
  };
  heroImage: {
    src: string;
    alt: string;
    placeholder?: string;
  };
  /** Per-project drafted-object mark (ADR-013 / DESIGN.md): a modern
   *  technical-schematic specimen of a fantastical instrument. `src` is the
   *  4:5 plate (DraftedObjectMark on the case-study shell); `thumb` is the
   *  square work-index crop. Hub studies may carry only a `thumb`. */
  mark?: {
    src?: string;
    thumb?: string;
    alt: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'design-infrastructure',
    title: 'Design Infrastructure',
    subtitle: 'Where an AI-native way of working started, and where it is now.',
    tags: ['Design Leadership', 'AI Workflow', 'Operating Model'],
    template: 'hub',
    heroImage: {
      src: '/images/design-infrastructure.png',
      alt: 'Design Infrastructure: the origin and the current state of an AI-native design practice',
      placeholder: 'Design Infrastructure hub cover (Wallace render pending)',
    },
    mark: {
      thumb: '/images/design-infrastructure-thumb.png',
      alt: 'Drafted technical schematic of a modular lattice substrate with instruments docked into its nodes',
    },
    hub: {
      headline: 'I build design infrastructure, not just designs.',
      body: 'I saw an opportunity, and taught myself and an organization the tools to chase it. Then we made it operational and built something a private-lending company actually runs in production. Not a faster way to make mockups, but something a team works in every day.',
      doors: [
        {
          slug: 'ai-leadership',
          label: 'The origin story',
          line: 'Workshops, a 6-step playbook, and 100% tool adoption across a skeptical org.',
        },
        {
          slug: 'doctrine-not-prompts',
          label: 'The story today',
          line: 'An AI-as-teammate operating model: version-controlled doctrine, four proof points, shipped.',
        },
      ],
      bodyOfWork: {
        heading: 'Beyond Workshops',
        intro:
          'The two stories above are the roots. The rest grew around them: the operating system a private-lending design team reaches for every day.',
        items: [
          {
            label: 'Design tokens as a pipeline',
            line: 'CSS holds the direction of truth, a shipped exporter pushes tokens downstream, and several brands coexist, each governed by its own profile. Design tools remain for tangible iteration, not as the source of truth.',
          },
          {
            label: 'Brand voice as executable doctrine',
            line: 'A voice guide turned into a skill that both writes copy and checks it, with the legal and attestation strings locked down. Language as a system automatically applied while you work.',
          },
          {
            label: 'CI for a design repo',
            line: 'A drift-check gate, scoped dependency updates, and a branch-protection strategy. DevOps hygiene applied to design work, set up early so adoption felt safe.',
          },
          {
            label: 'Fleets, not single sessions',
            line: 'Parallel agent sprints that landed two architecture decisions at once, plus a repeatable way to break a feature into scoped agent tasks, each with its own branch and commit prefix.',
          },
          {
            label: 'Production impact, not just prototypes',
            line: "The first live-production app to carry the team's brand, handed cleanly to engineering. Real flows, real borrowers.",
            slug: 'instant-doc-review',
          },
          {
            label: 'Bringing the team along',
            line: 'Growth plans, getting-started docs, and a dual-track prototyping workflow, so the team can step into the system at their own pace.',
          },
        ],
      },
    },
  },
  {
    slug: 'ai-leadership',
    title: 'Pioneering AI Adoption',
    subtitle: 'Strategy, tooling, and the future of design control.',
    tags: ['Strategy', 'AI/ML', 'Design Leadership', 'Organizational Change'],
    parentHub: 'design-infrastructure',
    heroMetric: {
      value: '100%',
      label: 'team AI tool adoption',
    },
    relatedStudy: {
      slug: 'doctrine-not-prompts',
      kicker: 'Where this went',
      direction: 'forward',
    },
    heroImage: {
      src: '/images/intro.png',
      alt: 'AI workshop presentation showing the 6-step prototyping process',
      placeholder: 'Screenshot of "Building with AI Tools" presentation title slide, or a composite showing the Define→Scope→Plan→Build→Test→Iterate workflow',
    },
    mark: {
      src: '/images/ai-leadership-mark.png',
      alt: 'Drafted technical schematic of a first-light apparatus, a single spark igniting a ring of small lamps',
    },
  },
  {
    slug: 'doctrine-not-prompts',
    title: 'Doctrine, Not Prompts',
    subtitle: 'An AI-as-teammate operating model for a small design team.',
    tags: ['Design Leadership', 'AI Workflow', 'Operating Model', 'Org Change'],
    parentHub: 'design-infrastructure',
    heroMetric: {
      value: '2 days',
      label: 'brand refresh, doctrine to shipped',
    },
    relatedStudy: {
      slug: 'ai-leadership',
      kicker: 'The origin',
      direction: 'back',
    },
    heroImage: {
      src: '/images/doctrine-reads-doctrine.png',
      alt: 'Team agent answering a project-specific question by reading version-controlled doctrine files',
      placeholder: 'Split view: a prompt to the team agent on the left, its project-specific answer on the right, with VECTOR.md, CLAUDE.md, and ARCHITECTURE.md labeled as the doctrine it read',
    },
    mark: {
      src: '/images/doctrine-not-prompts-mark.png',
      alt: 'Drafted technical schematic of a governing core directing a calm orbit of small satellite forms',
    },
  },
  {
    slug: 'instant-sow',
    title: 'Instant Scope of Work',
    subtitle: 'AI-augmented scope of work for renovation projects.',
    tags: ['Product Design', 'GenAI', 'Efficiency', 'B2B'],
    heroMetric: {
      value: '20 → 2 min',
      label: 'per SOW, observed',
    },
    heroImage: {
      src: '/images/sow-toolbox-hero.png',
      alt: 'My SOW Toolbox interface showing Upload, Describe, and Recycle options',
      placeholder: 'High-fidelity mockup of the "My Scope of Work Toolbox" UI showing the three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW',
    },
    mark: {
      src: '/images/instant-sow-mark.png',
      thumb: '/images/instant-sow-thumb.png',
      alt: 'Drafted technical schematic of a modular scoping armature, a jointed arm assembling measured parts on a base',
    },
  },
  {
    slug: 'instant-doc-review',
    title: 'Instant Document Review',
    subtitle: 'A shipped AI review product, with hard metrics and a way of working.',
    tags: ['Design Leadership', 'AI Ops', 'Prototype to Production', 'Metrics'],
    heroMetric: {
      value: '50%',
      label: 'less PSA review time per loan',
    },
    heroImage: {
      src: '/images/idr-hero.png',
      alt: 'Property Asset review page with an Action Required panel flagging six failed rules, each with a remark and rationale, above a pass/fail rules table',
      placeholder: 'High-fidelity mockup of the Property Admin Page with document viewer panel, extracted data fields, and rule override controls',
    },
    mark: {
      src: '/images/instant-doc-review-mark.png',
      thumb: '/images/instant-doc-review-thumb.png',
      alt: 'Drafted technical schematic of a reading-and-extraction instrument lifting ordered points off a flat plane',
    },
  },
  {
    slug: 'wallace',
    title: 'Wallace',
    subtitle: 'A compiler that turns a raw image model into a directed design instrument.',
    tags: ['AI Tooling', 'Design Systems', 'Creative Direction', 'GenAI'],
    heroMetric: {
      value: '1 spec',
      label: 'behind every render',
    },
    heroImage: {
      src: '/images/wallace-hero.png',
      alt: 'Cinematic north-star render: a designer atelier at night in warm brass light with a Finn Juhl chair silhouette',
      placeholder: 'Wallace north-star hero: dark atmospheric atelier interior, volumetric warm-brass light through haze, a Finn Juhl lounge chair in shadow, a single dusty-magenta glow, with the structured JSON caption that produced it shown alongside',
    },
    mark: {
      src: '/images/wallace-mark.png',
      thumb: '/images/wallace-thumb.png',
      alt: 'Drafted technical schematic of an optical compiler instrument resolving structured rays into one plane of light',
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

/** An external call-to-action: a clickable link out of the portfolio
 *  (e.g. to the Perihelion lab). Brass owns the interaction. */
export type CtaSection = {
  type: 'cta';
  kicker?: string;
  href: string;
  action: string;
  body: string;
};

/** An ordered or unordered list. Items retain inline markdown (bold/italic/
 *  links) for the renderer to parse. Authored in markdown as consecutive
 *  `1. ...` / `- ...` lines. */
export type ListSection = {
  type: 'list';
  ordered: boolean;
  items: string[];
};

export type CaseStudySection =
  | TextSection
  | ImageSection
  | MetricsSection
  | ComparisonSection
  | QuoteSection
  | CalloutSection
  | PeekSection
  | CtaSection
  | ListSection;

// --- Markdown file imports ---

import aiLeadershipMd from './ai-leadership.md?raw';
import doctrineNotPromptsMd from './doctrine-not-prompts.md?raw';
import instantSowMd from './instant-sow.md?raw';
import instantDocReviewMd from './instant-doc-review.md?raw';
import wallaceMd from './wallace.md?raw';
import buildingThisPortfolioMd from './building-this-portfolio.md?raw';
import theCraftMd from './the-craft.md?raw';
import theSoundMd from './the-sound.md?raw';
import theSystemMd from './the-system.md?raw';
import { parseCaseStudyMarkdown, parseConstellationContent } from './parse-case-study';

// --- Content by slug ---

export const caseStudyContent: Record<string, CaseStudySection[]> = {
  'ai-leadership': parseCaseStudyMarkdown(aiLeadershipMd),
  'doctrine-not-prompts': parseCaseStudyMarkdown(doctrineNotPromptsMd),
  'instant-sow': parseCaseStudyMarkdown(instantSowMd),
  'instant-doc-review': parseCaseStudyMarkdown(instantDocReviewMd),
  'wallace': parseCaseStudyMarkdown(wallaceMd),
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
