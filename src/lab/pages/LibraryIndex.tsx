import { Helmet } from "react-helmet-async";
import { guides } from "@core/lab/guides";
import { territories } from "@core/lab/territories";
import { LibraryHeader } from "@lab/components/library/LibraryHeader";
import { TerritoryGrid } from "@lab/components/library/TerritoryGrid";

export function LibraryIndex() {
  return (
    <>
      <Helmet>
        <title>Frontier Lab — labs.justinh.design</title>
        <meta
          name="description"
          content="Deep-dive research guides on frontier physics, vacuum engineering, UAP detection, and consciousness as technology."
        />
        <meta property="og:title" content="Frontier Lab" />
        <meta
          property="og:description"
          content="A library of deep-dive research guides on frontier science."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mx-auto max-w-6xl px-6 pb-32 md:px-10">
        <LibraryHeader
          guideCount={guides.length}
          territoryCount={territories.length}
        />
        <TerritoryGrid guides={guides} />
      </div>
    </>
  );
}
