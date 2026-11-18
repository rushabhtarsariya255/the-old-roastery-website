import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useReducedMotionPreference } from '../components/motion';

const PreferenceDisplay = () => <p>{useReducedMotionPreference() ? 'Motion reduced' : 'Motion allowed'}</p>;
afterEach(() => vi.restoreAllMocks());

describe('Motion preference', () => {
  it('responds to preference changes during a visit and removes its listener on unmount', () => {
    let reduced = false;
    const listeners = new Set<() => void>();
    const removeEventListener = vi.fn((_event: string, listener: () => void) => listeners.delete(listener));
    vi.spyOn(window, 'matchMedia').mockImplementation((media) => ({
      get matches() { return reduced; }, media, onchange: null,
      addEventListener: (_event: string, listener: EventListenerOrEventListenerObject) => listeners.add(listener as () => void),
      removeEventListener, addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => true,
    }));
    const { unmount } = render(<PreferenceDisplay />);
    expect(screen.getByText('Motion allowed')).toBeInTheDocument();
    act(() => { reduced = true; listeners.forEach((listener) => listener()); });
    expect(screen.getByText('Motion reduced')).toBeInTheDocument();
    act(() => { reduced = false; listeners.forEach((listener) => listener()); });
    expect(screen.getByText('Motion allowed')).toBeInTheDocument();
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
    expect(listeners.size).toBe(0);
  });
});
