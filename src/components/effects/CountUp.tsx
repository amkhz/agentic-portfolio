import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  prefix?: string;
  suffix?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  prefix = '',
  suffix = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) return decimals.length;
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
        maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0
      };
      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
      const num = separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
      return `${prefix}${num}${suffix}`;
    },
    [maxDecimals, separator, prefix, suffix]
  );

  // Reduced motion: show final value immediately, skip all animation
  useEffect(() => {
    if (prefersReducedMotion && ref.current) {
      ref.current.textContent = formatValue(to);
    }
  }, [prefersReducedMotion, to, formatValue]);

  // Set initial display value (animated path only)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue, prefersReducedMotion]);

  // Trigger animation when in view
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isInView && startWhen) {
      onStart?.();
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);
      const durationTimeoutId = setTimeout(
        () => {
          onEnd?.();
        },
        delay * 1000 + duration * 1000
      );
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
    prefersReducedMotion
  ]);

  // Subscribe to spring value changes for live updates
  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsubscribe();
  }, [springValue, formatValue, prefersReducedMotion]);

  return <span className={className} ref={ref} />;
}
