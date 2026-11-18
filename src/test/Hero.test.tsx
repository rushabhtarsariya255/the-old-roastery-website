import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Hero } from '../components/Hero';

afterEach(() => vi.restoreAllMocks());

describe('Hero entrance regression', () => {
  it('animates the headline on first render instead of skipping its entrance', async () => {
    render(<Hero />);
    const headline = screen.getByRole('heading', { level: 1 });
    const lines = headline.querySelectorAll<HTMLElement>('.heading-line');
    expect(lines).toHaveLength(3);
    expect(lines[0].style.transform).toContain('112%');
    await waitFor(() => expect(lines[2].style.transform).toBe('none'), { timeout: 3000 });
    expect(headline).toBeVisible();
  });

  it('shows the final headline immediately when reduced motion is requested', () => {
    const original = window.matchMedia;
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ ...original(query), matches: true }));
    render(<Hero />);
    const headline = screen.getByRole('heading', { level: 1 });
    for (const line of headline.querySelectorAll<HTMLElement>('.heading-line')) {
      expect(line.style.transform).not.toContain('112%');
    }
    expect(screen.getByRole('link', { name: 'Explore Menu' })).toHaveAttribute('href', '#menu');
  });
});
