import { Routes, Route } from "react-router";
import { LabLayout } from "@lab/layouts/LabLayout";
import { LibraryIndex } from "@lab/pages/LibraryIndex";
import { GuideView } from "@lab/pages/GuideView";
import { NotFoundPage } from "@lab/pages/NotFoundPage";

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
