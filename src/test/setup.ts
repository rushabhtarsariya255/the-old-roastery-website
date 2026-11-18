import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import * as framerMotion from 'framer-motion';

// Mock AnimatePresence to immediately unmount exiting children in tests without animation lag
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof framerMotion>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

// Polyfill window.matchMedia if needed in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill IntersectionObserver in jsdom for Framer Motion whileInView
class IntersectionObserverMock {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Polyfill scrollTo
window.scrollTo = (() => {}) as any;
