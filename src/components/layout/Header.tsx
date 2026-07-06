import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/interactive/ThemeToggle";
import { NowPlaying } from "@/components/interactive/NowPlaying";
import { SITE_TAB } from "@/lib/tabOrder";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/notes", label: "Notes" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-50 border-b border-border-subtle bg-bg-deep/80 backdrop-blur-md">
      <a
        tabIndex={SITE_TAB}
        href="#main"
        className="absolute left-4 top-3 z-[60] -translate-y-16 rounded-md bg-accent-primary px-4 py-2 font-heading text-sm font-semibold text-text-inverse transition-transform duration-normal focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      >
        Skip to main content
      </a>

      <Container>
        <nav
          aria-label="Primary navigation"
          className="flex h-16 items-center justify-between"
        >
          <Link
            tabIndex={SITE_TAB}
            to="/"
            className="font-display text-xl leading-none tracking-tight text-text-primary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            aria-label="Justin Hernandez - Home"
          >
            <span className="hidden sm:inline">Justin Hernandez</span>
            <span className="sm:hidden">JH</span>
          </Link>

          <ul className="hidden items-center gap-4 sm:flex sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  tabIndex={SITE_TAB}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `inline-flex min-h-[44px] items-center font-heading text-sm font-medium tracking-wide transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep ${isActive ? "text-accent-primary" : "text-text-secondary"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <MobileMenu navLinks={navLinks} onOpenChange={setMenuOpen} />
            <ThemeToggle />
          </div>
        </nav>
      </Container>

      {/* Kept mounted (poll stays warm); hidden while the drawer covers the
          screen so the centered tab doesn't sit under the overlay. */}
      <NowPlaying className={menuOpen ? "hidden" : undefined} />
    </header>
  );
}
