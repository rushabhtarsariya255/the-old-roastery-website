import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Footer } from '../components/Footer';

afterEach(() => vi.restoreAllMocks());

describe('Supporting section interactions', () => {
  it('dismisses the compact concept notice', async () => {
    const user = userEvent.setup();
    render(<DisclaimerBanner />);
    expect(screen.getByRole('complementary', { name: 'Independent Project Disclaimer' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss disclaimer banner' }));
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('avoids animated back-to-top scrolling when reduced motion is requested', async () => {
    const user = userEvent.setup();
    const originalMatchMedia = window.matchMedia;
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ ...originalMatchMedia(query), matches: query === '(prefers-reduced-motion: reduce)' }));
    const scroll = vi.spyOn(window, 'scrollTo');
    render(<Footer />);
    await user.click(screen.getByRole('button', { name: 'Back to top of page' }));
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});
