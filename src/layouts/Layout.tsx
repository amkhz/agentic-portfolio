import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { Analytics, SpeedInsights } from "@services/analytics";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <GrainOverlay />
      <Header />
      <main id="main" tabIndex={-1} className="min-h-screen outline-none">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
