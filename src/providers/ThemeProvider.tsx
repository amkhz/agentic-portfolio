import { useEffect, useState, useCallback } from "react";
import { ThemeContext } from "@/lib/useTheme";

type Theme = "dark" | "light";

function getStoredTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)/);
  return match ? (match[1] as Theme) : null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return getStoredTheme() ?? getSystemTheme();
}

function setThemeCookie(theme: Theme) {
  document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme());

  useEffect(() => {
    const resolved = resolveTheme();
    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    // [data-no-transition] is set inline in <head> so the resolved theme
    // lands without animating; it comes off one frame later, once that
    // paint is done. The timer is not belt-and-braces: a tab that loads
    // in the background gets no animation frames at all, so on rAF alone
    // the attribute would survive the whole session and every transition
    // on the site would stay pinned at 0ms.
    let cleared = false;
    const clear = () => {
      if (cleared) return;
      cleared = true;
      document.documentElement.removeAttribute("data-no-transition");
    };
    const frame = requestAnimationFrame(clear);
    const timer = window.setTimeout(clear, 100);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    function handleChange(e: MediaQueryListEvent) {
      if (!getStoredTheme()) {
        const next = e.matches ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
      }
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setThemeCookie(next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
