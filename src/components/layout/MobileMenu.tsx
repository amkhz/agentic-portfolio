import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { springSoft } from "@/components/effects/motionConfig";

interface NavItem {
  to: string;
  label: string;
}

/**
 * Mobile navigation drawer. Below `sm` the inline nav collapses to a hamburger
 * that opens an anchored panel of the same links. Desktop never renders the
 * panel (the button is `sm:hidden`).
 *
 * Accessibility: the trigger carries aria-expanded / aria-controls / aria-haspopup,
 * Escape closes, an outside/backdrop click closes, focus moves into the panel on
 * open and returns to the trigger on close, Tab is trapped within the panel while
 * open, and body scroll is locked under the overlay. The panel auto-closes on
 * route change. Honors prefers-reduced-motion (instant show/hide, no transform).
 */
export function MobileMenu({ navLinks }: { navLinks: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Auto-close on navigation. No focus return here — focus should follow the
  // newly routed page, not snap back to the (now stale) trigger.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape to close, trap Tab inside the panel, lock body scroll,
  // and move focus into the panel. Everything is torn down on close.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to the first link once the panel has mounted.
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const panelMotion = reduced
    ? {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: springSoft,
      };

  const backdropMotion = reduced
    ? {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: springSoft,
      };

  return (
    <div className="relative sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        className="relative z-[70] inline-flex h-[44px] w-[44px] items-center justify-center rounded-md text-text-secondary hover:bg-bg-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="3.5" y1="7" x2="20.5" y2="7" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="17" x2="20.5" y2="17" />
            </>
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={close}
              className="fixed inset-0 top-16 z-[55] bg-bg-deep/60 backdrop-blur-sm"
              {...backdropMotion}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id={panelId}
              className="absolute right-0 top-full z-[60] mt-3 w-56 origin-top-right overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated shadow-lg"
              {...panelMotion}
            >
              <nav aria-label="Mobile navigation" className="p-2">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={close}
                        className={({ isActive }) =>
                          `flex min-h-[44px] items-center rounded-lg px-4 font-heading text-base font-medium tracking-wide transition-colors duration-normal hover:bg-bg-subtle hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated ${isActive ? "text-accent-primary" : "text-text-secondary"}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
