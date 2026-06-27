import { Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { PageTransition } from "@/components/effects/PageTransition";
import { Analytics, SpeedInsights } from "@services/analytics";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <GrainOverlay />
      <Header />
      <main id="main" tabIndex={-1} className="min-h-screen outline-none">
        {/* Suspense sits below the chrome so the Header/Footer/grain persist
            while a lazily-loaded route chunk streams in. The min-h-screen on
            <main> reserves height, so a chunk fetch causes no layout shift. */}
        <PageTransition>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
