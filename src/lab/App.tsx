import { lazy } from "react";
import { Routes, Route } from "react-router";
import { LabLayout } from "@lab/layouts/LabLayout";
import { LibraryIndex } from "@lab/pages/LibraryIndex";
import { NotFoundPage } from "@lab/pages/NotFoundPage";

// LibraryIndex (the lab landing) and NotFound stay eager; GuideView is the
// heavy guide reader and splits into its own chunk. Suspense lives in LabLayout
// around the Outlet.
const GuideView = lazy(() =>
  import("@lab/pages/GuideView").then((m) => ({ default: m.GuideView })),
);

export function App() {
  return (
    <Routes>
      <Route element={<LabLayout />}>
        <Route path="/" element={<LibraryIndex />} />
        <Route path="/g/:slug" element={<GuideView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
