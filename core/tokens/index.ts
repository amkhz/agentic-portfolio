// ============================================
// DESIGN TOKENS — Source of Truth
// Portfolio: Justin Hernandez
// Visual direction: Danish mid-century × sci-fi
// Reference: Duck and Cover, Copenhagen
// ============================================

export const colors = {
  // Backgrounds — warm blacks, never pure #000
  bg: {
    deep:      'oklch(0.1452 0.0021 286.13)',   // #0A0A0B — deepest bg, page-level
    base:      'oklch(0.1831 0.0040 285.99)',   // #121214 — primary surface
    elevated:  'oklch(0.2195 0.0077 285.74)',   // #1A1A1E — cards, elevated surfaces
    subtle:    'oklch(0.2545 0.0112 285.58)',   // #222228 — hover states, subtle distinction
  },

  // Text — warm whites, never pure #FFF
  text: {
    primary:   'oklch(0.9470 0.0074 80.72)',    // #F0EDE8 — headings, primary body — warm parchment
    secondary: 'oklch(0.7657 0.0156 80.70)',    // #B8B2A8 — supporting text — aged linen
    muted:     'oklch(0.5824 0.0141 75.29)',    // #807A72 — captions, metadata — a11y safe for large text/UI only
    inverse:   'oklch(0.1452 0.0021 286.13)',   // #0A0A0B — text on light/accent surfaces
  },

  // Primary accent — aged brass (warm, material, mid-century)
  accent: {
    primary:   'oklch(0.7087 0.0845 60.96)',    // #C8956A — primary actions, links, key highlights
    hover:     'oklch(0.7610 0.0801 67.39)',    // #D4A87A — hover/focus state
    muted:     'oklch(0.7087 0.0845 60.96 / 0.2)',  // #C8956A33 — 20% — subtle backgrounds, borders
    glow:      'oklch(0.7087 0.0845 60.96 / 0.1)',  // #C8956A1A — 10% — ambient glow effects
  },

  // Secondary accent — dusty magenta (atmospheric, sci-fi warmth)
  secondary: {
    primary:   'oklch(0.6634 0.1052 346.74)',   // #C278A0 — interactive states, tech elements, highlights
    hover:     'oklch(0.7179 0.0975 344.91)',   // #D08BB2 — hover/focus state
    muted:     'oklch(0.6634 0.1052 346.74 / 0.2)',  // #C278A033 — 20% — subtle backgrounds
    glow:      'oklch(0.6634 0.1052 346.74 / 0.1)',  // #C278A01A — 10% — ambient glow effects
  },

  // Borders
  border: {
    subtle:    'oklch(0.2875 0.0109 285.70)',   // #2A2A30 — card edges, dividers
    strong:    'oklch(0.3516 0.0138 285.67)',   // #3A3A42 — emphasized borders
  },

  // Semantic
  success:     'oklch(0.7243 0.1091 144.35)',   // #7AB87A
  warning:     'oklch(0.7541 0.1223 83.74)',    // #D4A84A
  error:       'oklch(0.6591 0.1012 32.36)',    // #C87A6A
} as const;

export const typography = {
  fontFamily: {
    display: "'Podkova', serif",          // hero, big statements
    heading: "'Space Grotesk', sans-serif", // section heads, nav
    body:    "'Didact Gothic', sans-serif",  // body, descriptions
  },

  fontSize: {
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    base: '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.375rem',   // 22px
    '2xl': '1.75rem',   // 28px
    '3xl': '2.5rem',    // 40px
    '4xl': '3.5rem',    // 56px
    '5xl': '5rem',      // 80px
  },

  fontWeight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },

  lineHeight: {
    tight:  '1.1',
    snug:   '1.3',
    normal: '1.65',
    loose:  '1.8',
  },

  letterSpacing: {
    tight:  '-0.02em',   // display type
    normal: '0',         // body
    wide:   '0.05em',    // labels, metadata
    wider:  '0.1em',     // uppercase tags
  },
} as const;

export const spacing = {
  0:   '0',
  1:   '0.25rem',    // 4px
  2:   '0.5rem',     // 8px
  3:   '0.75rem',    // 12px
  4:   '1rem',       // 16px
  5:   '1.25rem',    // 20px
  6:   '1.5rem',     // 24px
  8:   '2rem',       // 32px
  10:  '2.5rem',     // 40px
  12:  '3rem',       // 48px
  16:  '4rem',       // 64px
  20:  '5rem',       // 80px
  24:  '6rem',       // 96px
  32:  '8rem',       // 128px
} as const;

export const radius = {
  none: '0',
  sm:   '4px',
  md:   '8px',
  lg:   '16px',
  xl:   '24px',
  full: '9999px',
} as const;

export const motion = {
  duration: {
    fast:    '100ms',
    normal:  '200ms',
    slow:    '400ms',
    slower:  '600ms',
    ambient: '1200ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in:      'cubic-bezier(0.4, 0, 1, 1)',
    out:     'cubic-bezier(0, 0, 0.2, 1)',
    bounce:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

// ============================================
// LIGHT MODE COLORS — L-channel adjusted, same C and H
// Flat parallel export: same shape as `colors`
// ============================================

export const lightColors = {
  // Backgrounds — warm cream/paper, not pure white
  bg: {
    deep:      'oklch(0.9750 0.0040 80.72)',    // warm paper
    base:      'oklch(0.9550 0.0055 80.70)',    // primary surface
    elevated:  'oklch(0.9900 0.0025 80.72)',    // cards, elevated surfaces (brighter)
    subtle:    'oklch(0.9300 0.0070 80.70)',    // hover states, subtle distinction
  },

  // Text — warm darks
  text: {
    primary:   'oklch(0.1800 0.0074 80.72)',    // headings, primary body
    secondary: 'oklch(0.3800 0.0156 80.70)',    // supporting text
    muted:     'oklch(0.4800 0.0141 75.29)',    // captions, metadata
    inverse:   'oklch(0.9750 0.0040 80.72)',    // text on dark/accent surfaces
  },

  // Primary accent — aged brass (darker on light bg for contrast)
  accent: {
    primary:   'oklch(0.5800 0.1000 60.96)',    // primary actions, links
    hover:     'oklch(0.5300 0.0950 67.39)',    // hover/focus state
    muted:     'oklch(0.5800 0.1000 60.96 / 0.15)',  // subtle backgrounds
    glow:      'oklch(0.5800 0.1000 60.96 / 0.08)',   // ambient glow
  },

  // Secondary accent — dusty magenta (darker on light bg)
  secondary: {
    primary:   'oklch(0.5400 0.1200 346.74)',   // interactive states
    hover:     'oklch(0.4900 0.1100 344.91)',   // hover/focus state
    muted:     'oklch(0.5400 0.1200 346.74 / 0.15)',  // subtle backgrounds
    glow:      'oklch(0.5400 0.1200 346.74 / 0.08)',   // ambient glow
  },

  // Borders — warm light grays
  border: {
    subtle:    'oklch(0.8800 0.0050 80.70)',    // card edges, dividers
    strong:    'oklch(0.8200 0.0070 80.70)',    // emphasized borders
  },

  // Semantic — darker for readability on light bg
  success:     'oklch(0.4800 0.1091 144.35)',
  warning:     'oklch(0.5200 0.1223 83.74)',
  error:       'oklch(0.5000 0.1012 32.36)',
} as const;

export const shadows = {
  sm:   '0 1px 2px oklch(0.1452 0.0021 286.13 / 0.3)',      // rgba(10, 10, 11, 0.3)
  md:   '0 4px 12px oklch(0.1452 0.0021 286.13 / 0.4)',     // rgba(10, 10, 11, 0.4)
  lg:   '0 8px 24px oklch(0.1452 0.0021 286.13 / 0.5)',     // rgba(10, 10, 11, 0.5)
  xl:   '0 16px 48px oklch(0.1452 0.0021 286.13 / 0.6)',    // rgba(10, 10, 11, 0.6)
  glow: {
    brass:   '0 0 24px oklch(0.7087 0.0845 60.96 / 0.15)',  // rgba(200, 149, 106, 0.15)
    magenta: '0 0 24px oklch(0.6634 0.1052 346.74 / 0.15)', // rgba(194, 120, 160, 0.15)
  },
} as const;

export const lightShadows = {
  sm:   '0 1px 2px oklch(0.5000 0.0021 80.70 / 0.08)',
  md:   '0 4px 12px oklch(0.5000 0.0021 80.70 / 0.10)',
  lg:   '0 8px 24px oklch(0.5000 0.0021 80.70 / 0.12)',
  xl:   '0 16px 48px oklch(0.5000 0.0021 80.70 / 0.15)',
  glow: {
    brass:   '0 2px 12px oklch(0.5800 0.1000 60.96 / 0.20)',
    magenta: '0 2px 12px oklch(0.5400 0.1200 346.74 / 0.20)',
  },
} as const;

// ============================================
// CASE STUDY DATA TYPES
// ============================================

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;          // one-line description
  tags: string[];             // skills, tools, themes
  heroMetric?: {
    value: string;            // e.g., "56%"
    label: string;            // e.g., "reduction in manual work"
  };
  heroImage: {
    src: string;              // image path or placeholder
    alt: string;              // descriptive alt text
    placeholder?: string;     // description of what image should be (for placeholders)
  };
  // Metadata only. Section content is sourced from src/lib/case-study-content.ts.
  sections?: CaseStudySection[];
}

export interface CaseStudySection {
  type: 'text' | 'image' | 'metric' | 'comparison' | 'process-step';
  content: Record<string, unknown>;
}

// ============================================
// PLACEHOLDER CASE STUDY DATA
// ============================================

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
    sections: [],
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
    sections: [],
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
    sections: [],
  },
];

// Meta case study — will be populated during/after sprint
export const metaCaseStudy: CaseStudy = {
  slug: 'building-this-portfolio',
  title: 'Building This Portfolio',
  subtitle: 'Design system to deployed site in 48 hours using AI-powered workflows.',
  tags: ['Design Systems', 'AI Workflow', 'Meta', 'Process'],
  heroMetric: {
    value: '48 hours',
    label: 'tokens to production',
  },
  heroImage: {
    src: '/images/meta.png',
    alt: 'Composite preview of the portfolio build process and final UI',
    placeholder: 'Meta case study hero image showing process and outcome side by side',
  },
  sections: [],
};
