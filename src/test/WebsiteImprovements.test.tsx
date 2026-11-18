import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { BUSINESS_INFO, MENU_ITEMS } from '../data/roasteryData';

afterEach(() => { history.replaceState(null, '', '/'); vi.restoreAllMocks(); });

describe('Website information and item navigation', () => {
  it('provides skip navigation, confirmed hours, Instagram and the precise map', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(within(screen.getByRole('region', { name: 'Welcome to The Old Roastery' })).getByText(/Open daily/)).toHaveTextContent(BUSINESS_INFO.openingHours);
    expect(screen.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', BUSINESS_INFO.instagramUrl);
    expect(screen.getByTitle('The Old Roastery Vacanza Trade Center location map')).toHaveAttribute('src', BUSINESS_INFO.mapEmbedUrl);
    expect(MENU_ITEMS.some(item => /signature|barista favorite|botanicals|ristretto|wafer/i.test(item.description + item.tags.join(' ')))).toBe(false);
  });

  it('reveals and focuses an exact item despite filters and supports repeat links', async () => {
    const scroll = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scroll });
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: 'Coffee & Brews' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'espresso' } });
    const link = screen.getByRole('link', { name: 'Explore Biscoff Cheesecake on the menu' });
    fireEvent.click(link);
    await waitFor(() => expect(document.getElementById('menu-biscoff-cheesecake')).toHaveFocus());
    expect(document.getElementById('menu-biscoff-cheesecake')).toHaveTextContent('Biscoff Cheesecake');
    expect(screen.getByRole('searchbox')).toHaveValue('');
    fireEvent.click(screen.getByRole('tab', { name: 'Coffee & Brews' }));
    fireEvent.click(link);
    await waitFor(() => expect(document.getElementById('menu-biscoff-cheesecake')).toHaveFocus());
    expect(scroll).toHaveBeenCalled();
  });

  it('opens a direct item hash with its destination focusable', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() });
    history.replaceState(null, '', '/#menu-avocado-truffle-pizza');
    await act(async () => { render(<App />); });
    await waitFor(() => expect(document.getElementById('menu-avocado-truffle-pizza')).toHaveFocus());
  });
});
