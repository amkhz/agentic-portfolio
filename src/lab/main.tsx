import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { Analytics, SpeedInsights } from "@services/analytics";
import { App } from "./App";

import "@fontsource/podkova/400.css";
import "@fontsource/podkova/500.css";
import "@fontsource/podkova/600.css";
import "@fontsource/podkova/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./styles/lab.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
