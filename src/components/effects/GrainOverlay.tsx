export function GrainOverlay() {
  return (
    <>
      {/* Global SVG filter defs -- available to any element via filter: url(#...) */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="paper-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              seed="15"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="desaturated"
            />
            <feComponentTransfer in="desaturated" result="paper">
              <feFuncA type="linear" slope="0.03" intercept="0" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="paper" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Full-screen grain overlay. Gated to >=sm: the fixed mix-blend-mode
          layer repaints on every scroll frame, a real cost on mobile where INP
          is the bottleneck. Desktop keeps the grain; the #paper-texture defs
          above stay available to all viewports. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 hidden sm:block"
      >
        <svg
          className="h-full w-full"
          style={{
            opacity: "var(--grain-opacity)",
            mixBlendMode: "var(--grain-blend, normal)" as unknown as React.CSSProperties["mixBlendMode"],
          }}
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </>
  );
}
