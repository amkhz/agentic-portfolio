import { useEffect, useRef } from "react";
import { cn } from "@core/utils";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * Full-screen image overlay. Click backdrop or press Escape to close.
 *
 * Accessibility: on open, focus moves to the close button and returns to the
 * triggering element on close; Tab is trapped between the close button and the
 * image; Escape closes; body scroll is locked. Mirrors the MobileMenu drawer.
 */
export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
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
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        "bg-bg-deep/90 backdrop-blur-sm",
        "motion-safe:animate-[fadeIn_200ms_var(--ease-settle)]"
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className={cn(
          "absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full",
          "bg-bg-elevated/80 text-text-secondary transition-colors duration-normal",
          "hover:bg-bg-elevated hover:text-text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        )}
        aria-label="Close image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
