import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { guides } from "@core/lab/guides";
import { territories } from "@core/lab/territories";
import type { ShelfLayout } from "@lab/components/library/guideShelfCommon";
import { LibraryHeader } from "@lab/components/library/LibraryHeader";
import { LibraryWelcome } from "@lab/components/library/LibraryWelcome";
import { ShelfLayoutToggle } from "@lab/components/library/ShelfLayoutToggle";
import { TerritoryGrid } from "@lab/components/library/TerritoryGrid";

export function LibraryIndex() {
  // Temporary T3 prototype: pick the shelf layout to validate live. Defaults to
  // the Accession Register (recommended). Remove with ShelfLayoutToggle once a
  // direction is chosen.
  const [layout, setLayout] = useState<ShelfLayout>("register");

  return (
    <>
      <Helmet>
        <title>Perihelion Archive — labs.justinh.design</title>
        <meta
          name="description"
          content="Deep-dive research guides on frontier physics, vacuum engineering, UAP detection, and consciousness as technology. The research arm of Perihelion."
        />
        <meta property="og:title" content="Perihelion Archive" />
        <meta
          property="og:description"
          content="Research guides at closest approach to the frontier."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mx-auto max-w-6xl px-6 pb-32 md:px-10">
        <LibraryHeader
          guideCount={guides.length}
          territoryCount={territories.length}
        />
        <LibraryWelcome />
        <ShelfLayoutToggle value={layout} onChange={setLayout} />
        <TerritoryGrid guides={guides} layout={layout} />
      </div>
    </>
  );
}
