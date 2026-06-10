// ============================================
// SPECULATIVE DESIGN LAB — Section Icon Registry
// Maps sectionIcons spec names (C.2, plans/perihelion-c2-section-
// icons-spec.md) to components. Bare name = lucide-react; 'phosphor:'
// prefix = @phosphor-icons/react. Static imports only, so the three
// Phosphor glyphs tree-shake instead of dragging the whole set in.
// Icons are decorative by contract: aria-hidden, no accessible name.
// The callout chip vocabulary (Target, Link2, ArrowRight, Bookmark)
// is exclusive to GuideBlockquote and never appears here.
// ============================================

import {
  Activity,
  Aperture,
  ArrowDownToLine,
  Atom,
  Binary,
  Binoculars,
  Brackets,
  Brain,
  Building2,
  ChartScatter,
  CircleDashed,
  CircleDotDashed,
  CircleGauge,
  CircleMinus,
  Compass,
  Disc3,
  DoorOpen,
  Expand,
  Eye,
  EyeOff,
  FileText,
  FlaskConical,
  Gauge,
  History,
  Joystick,
  Layers,
  ListChecks,
  Magnet,
  Microscope,
  NotebookPen,
  Orbit,
  PencilRuler,
  Radar,
  Radiation,
  Radical,
  ScanEye,
  ScanSearch,
  Sprout,
  SquareFunction,
  Telescope,
  TrendingDown,
  UnfoldHorizontal,
  Waves,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FlyingSaucer,
  NumberCircleOne,
  NumberCircleTwo,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  aperture: Aperture,
  "arrow-down-to-line": ArrowDownToLine,
  atom: Atom,
  binary: Binary,
  binoculars: Binoculars,
  brackets: Brackets,
  brain: Brain,
  "building-2": Building2,
  "chart-scatter": ChartScatter,
  "circle-dashed": CircleDashed,
  "circle-dot-dashed": CircleDotDashed,
  "circle-gauge": CircleGauge,
  "circle-minus": CircleMinus,
  compass: Compass,
  "disc-3": Disc3,
  "door-open": DoorOpen,
  expand: Expand,
  eye: Eye,
  "eye-off": EyeOff,
  "file-text": FileText,
  "flask-conical": FlaskConical,
  gauge: Gauge,
  history: History,
  joystick: Joystick,
  layers: Layers,
  "list-checks": ListChecks,
  magnet: Magnet,
  microscope: Microscope,
  "notebook-pen": NotebookPen,
  orbit: Orbit,
  "pencil-ruler": PencilRuler,
  radar: Radar,
  radiation: Radiation,
  radical: Radical,
  "scan-eye": ScanEye,
  "scan-search": ScanSearch,
  sprout: Sprout,
  "square-function": SquareFunction,
  telescope: Telescope,
  "trending-down": TrendingDown,
  "unfold-horizontal": UnfoldHorizontal,
  waves: Waves,
  waypoints: Waypoints,
};

// Rendered weight="fill" — the saucer wink and the numerals are the
// library's only filled glyphs, an accepted register break per spec.
const PHOSPHOR_ICONS: Record<string, PhosphorIcon> = {
  "flying-saucer": FlyingSaucer,
  "number-circle-one": NumberCircleOne,
  "number-circle-two": NumberCircleTwo,
};

const PHOSPHOR_PREFIX = "phosphor:";

const warnedUnknownNames = new Set<string>();

function warnUnknownOnce(name: string): void {
  if (warnedUnknownNames.has(name)) return;
  warnedUnknownNames.add(name);
  console.warn(`SectionIcon: unknown icon name '${name}'; rendering nothing`);
}

interface SectionIconProps {
  name: string;
  size: number;
  className?: string;
}

export function SectionIcon({ name, size, className }: SectionIconProps) {
  if (name.startsWith(PHOSPHOR_PREFIX)) {
    const Icon = PHOSPHOR_ICONS[name.slice(PHOSPHOR_PREFIX.length)];
    if (!Icon) {
      warnUnknownOnce(name);
      return null;
    }
    return (
      <Icon aria-hidden="true" weight="fill" size={size} className={className} />
    );
  }
  const Icon = LUCIDE_ICONS[name];
  if (!Icon) {
    warnUnknownOnce(name);
    return null;
  }
  return (
    <Icon aria-hidden="true" strokeWidth={2} size={size} className={className} />
  );
}
