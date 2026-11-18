import { useCallback, useSyncExternalStore } from 'react';
import type { MotionProps } from 'framer-motion';

const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getMotionPreference() {
  return typeof window === 'undefined' || !window.matchMedia
    ? true
    : window.matchMedia(motionQuery).matches;
}

// This installed Framer Motion version only reads the preference on mount.
// Subscribe directly so changing the OS setting also stops existing motion.
export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, () => true);
}

export function useDesktopParallax() {
  const query = '(min-width: 1024px) and (pointer: fine)';
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {};
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return useSyncExternalStore(subscribe, () => typeof window !== 'undefined' && Boolean(window.matchMedia?.(query).matches), () => false);
}

export function useEntranceMotion() {
  const reduceMotion = useReducedMotionPreference();

  return (delay = 0): MotionProps => ({
    initial: reduceMotion ? false : { opacity: 0.2, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.655,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });
}

// Set the reveal origin before observation so entering never flashes visible, then dim.
export function useRevealMotion() {
  const reduceMotion = useReducedMotionPreference();

  return (index = 0, direction: 'up' | 'left' | 'right' | 'scale' = 'up'): MotionProps => ({
    initial: reduceMotion || typeof IntersectionObserver === 'undefined' ? false : { opacity: 0, ...(direction === 'up' ? { y: 24 } : direction === 'scale' ? { y: 16 } : { x: direction === 'left' ? -20 : 20 }) },
    animate: reduceMotion || typeof IntersectionObserver === 'undefined' ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined,
    whileInView: reduceMotion ? undefined : {
      opacity: 1, x: 0, y: 0,
    },
    viewport: { once: true, amount: 0.12, margin: '0px 0px 48px 0px' },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      delay: reduceMotion ? 0 : (index % 3) * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  });
}
