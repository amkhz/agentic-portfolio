/**
 * GENERATED — do not edit by hand.
 * Source: scripts/generate-image-variants.ts (npm run generate:images)
 *
 * Maps each public/images source path to its intrinsic dimensions and the set
 * of responsive widths emitted as AVIF + WebP siblings. Consumed by the pure
 * srcset builder in core/images/responsive.ts.
 */

export interface ImageVariantEntry {
  /** Intrinsic width of the source image, in px. */
  width: number;
  /** Intrinsic height of the source image, in px. */
  height: number;
  /** Emitted variant widths, ascending. Each has an .avif and .webp sibling. */
  widths: number[];
}

export const imageManifest: Record<string, ImageVariantEntry> = {
  "/images/about.jpeg": { width: 1280, height: 1280, widths: [640, 960, 1280] },
  "/images/admin-page-tasks.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/ai-leadership-mark.png": { width: 643, height: 804, widths: [640, 643] },
  "/images/anyone-can-do-it.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/before-flow.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/big-flip.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/borrower-flow.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/brand-comparison.png": { width: 3030, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/conservatory-hero.png": { width: 1920, height: 1088, widths: [640, 960, 1280, 1920] },
  "/images/design-infrastructure-thumb.png": { width: 752, height: 752, widths: [640, 752] },
  "/images/design-infrastructure.png": { width: 1920, height: 1088, widths: [640, 960, 1280, 1920] },
  "/images/detail-mvp-work.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/detail-ops.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/diagram.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/doctrine-not-prompts-mark.png": { width: 641, height: 802, widths: [640, 641] },
  "/images/doctrine-reads-doctrine.png": { width: 3416, height: 1906, widths: [640, 960, 1280, 1920, 2560] },
  "/images/feature-flow.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/flight-deck-bench.png": { width: 3200, height: 1800, widths: [640, 960, 1280, 1920, 2560] },
  "/images/future-vision.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/idr-hero.png": { width: 3600, height: 2025, widths: [640, 960, 1280, 1920, 2560] },
  "/images/idr-hifi.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/instant-doc-review-mark.png": { width: 624, height: 780, widths: [624] },
  "/images/instant-doc-review-thumb.png": { width: 645, height: 645, widths: [640, 645] },
  "/images/instant-sow-mark.png": { width: 604, height: 755, widths: [604] },
  "/images/instant-sow-thumb.png": { width: 604, height: 604, widths: [604] },
  "/images/intro.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/key-agent-terminal.png": { width: 3180, height: 1628, widths: [640, 960, 1280, 1920, 2560] },
  "/images/kiavi-world-home.png": { width: 3058, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/legacy-sow.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/leverage-math.png": { width: 3050, height: 1732, widths: [640, 960, 1280, 1920, 2560] },
  "/images/meta-a11y.png": { width: 1400, height: 850, widths: [640, 960, 1280, 1400] },
  "/images/meta-content-separation.png": { width: 1400, height: 707, widths: [640, 960, 1280, 1400] },
  "/images/meta-context-file.png": { width: 1400, height: 803, widths: [640, 960, 1280, 1400] },
  "/images/meta-nextjs-structure.png": { width: 1400, height: 1050, widths: [640, 960, 1280, 1400] },
  "/images/meta-planning.png": { width: 1400, height: 911, widths: [640, 960, 1280, 1400] },
  "/images/meta-scaffold-styling.png": { width: 1400, height: 788, widths: [640, 960, 1280, 1400] },
  "/images/meta-tokens.png": { width: 1400, height: 1088, widths: [640, 960, 1280, 1400] },
  "/images/meta-vite-structure.png": { width: 1400, height: 1050, widths: [640, 960, 1280, 1400] },
  "/images/meta.png": { width: 2888, height: 1633, widths: [640, 960, 1280, 1920, 2560] },
  "/images/operations-ds-tokens.png": { width: 3030, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/outcomes.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/process.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-dashboard-action-required.png": { width: 3030, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-dashboard.png": { width: 2694, height: 1738, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-evidence-inspection-alt.png": { width: 3050, height: 1732, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-evidence-inspection.png": { width: 3030, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-property-asset-workspace.png": { width: 2694, height: 1212, widths: [640, 960, 1280, 1920, 2560] },
  "/images/snapshot-rule-provenance.png": { width: 2550, height: 1010, widths: [640, 960, 1280, 1920, 2550] },
  "/images/sow-draws.png": { width: 1952, height: 1150, widths: [640, 960, 1280, 1920, 1952] },
  "/images/sow-flow-diagram.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/sow-toolbox-hero.png": { width: 1420, height: 1065, widths: [640, 960, 1280, 1420] },
  "/images/sow-toolbox.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/talk-as-prototype.png": { width: 3030, height: 1736, widths: [640, 960, 1280, 1920, 2560] },
  "/images/tool-box.png": { width: 3840, height: 2160, widths: [640, 960, 1280, 1920, 2560] },
  "/images/wallace-atelier.png": { width: 1920, height: 1088, widths: [640, 960, 1280, 1920] },
  "/images/wallace-hero.png": { width: 1920, height: 1088, widths: [640, 960, 1280, 1920] },
  "/images/wallace-mark.png": { width: 557, height: 696, widths: [557] },
  "/images/wallace-thumb.png": { width: 557, height: 557, widths: [557] },
  "/images/work-hero.png": { width: 1920, height: 1088, widths: [640, 960, 1280, 1920] },
};
