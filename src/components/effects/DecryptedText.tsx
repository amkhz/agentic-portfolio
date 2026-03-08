import { useEffect, useRef, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  encryptedClassName = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const prefersReducedMotion = useRef(false);
  const prevTextRef = useRef(text);

  // Check prefers-reduced-motion once on mount
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Trigger scramble animation when text prop changes
  useEffect(() => {
    // Skip animation on initial render (prevTextRef starts as the initial text)
    if (prevTextRef.current === text && !isScrambling) {
      setDisplayText(text);
      return;
    }
    prevTextRef.current = text;

    // Reduced motion: just show the new text immediately
    if (prefersReducedMotion.current) {
      setDisplayText(text);
      return;
    }

    const availableChars = characters.split("");

    const shuffleText = (
      originalText: string,
      currentRevealed: Set<number>
    ): string => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    };

    setIsScrambling(true);
    setRevealedIndices(new Set());

    let currentIteration = 0;
    let revealed = new Set<number>();

    const interval = setInterval(() => {
      if (sequential) {
        if (revealed.size < text.length) {
          const nextIndex = revealed.size;
          revealed = new Set(revealed);
          revealed.add(nextIndex);
          setRevealedIndices(revealed);
          setDisplayText(shuffleText(text, revealed));
        } else {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      } else {
        currentIteration++;
        setDisplayText(shuffleText(text, revealed));
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- isScrambling intentionally excluded to avoid re-trigger loops
  }, [text, speed, maxIterations, sequential, characters]);

  return (
    <span className="inline-block whitespace-pre-wrap">
      {/* Accessible text for screen readers */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed =
            revealedIndices.has(index) || !isScrambling;

          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
