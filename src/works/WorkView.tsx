import {
  lazy,
  Suspense,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router";
import { getWork } from "@core/works/works";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { WorkFault } from "./WorkFault";

// Each work is its own lazy chunk (ADR-017 D1/D5): deck code never enters
// the shared labs bundle. The registry key must match a manifest slug.
const workComponents: Record<string, LazyExoticComponent<ComponentType>> = {
  "flight-deck": lazy(() =>
    import("./flight-deck/FlightDeck").then((m) => ({ default: m.FlightDeck })),
  ),
};

export function WorkView() {
  const { slug } = useParams();
  const work = slug ? getWork(slug) : undefined;
  const Work = work ? workComponents[work.slug] : undefined;
  // Bumped by the fault card's restart so the piece remounts genuinely
  // fresh: clearing the boundary alone would rebuild the same subtree,
  // and a work that keeps imperative state (WebGL hosts, timelines,
  // audio graphs) has to be built from nothing to recover.
  const [attempt, setAttempt] = useState(0);

  if (!work || !Work) return <Navigate to="/" replace />;

  return (
    <>
      {/* The deck owns its <title> (FlightDeck sets document.title with the
          Works "·" separator); WorkView only supplies the description the
          deck chunk never carries. */}
      <Helmet>
        <meta name="description" content={work.thesisLine} />
      </Helmet>
      {/* Works are the heaviest imperative surfaces on the site and they
          render standalone, so nothing above them can catch: without this
          boundary a single throw inside a piece unmounts the whole entry
          to a blank page (R2a P0 1). */}
      <ErrorBoundary
        key={attempt}
        fallback={<WorkFault onRestart={() => setAttempt((n) => n + 1)} />}
      >
        <Suspense fallback={null}>
          <Work />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
