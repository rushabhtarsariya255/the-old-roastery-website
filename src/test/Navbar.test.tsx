import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from '../components/Navbar';

describe('Navigation interactions', () => {
  it('makes the closing dropdown inert immediately and supports reopening', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    const dropdown = document.getElementById(toggle.getAttribute('aria-controls')!);
    expect(dropdown).toHaveAttribute('inert');
    await user.click(toggle);
    expect(dropdown).not.toHaveAttribute('inert');
    expect(dropdown).toHaveAttribute('aria-hidden', 'false');
    await user.click(toggle);
    expect(dropdown).toHaveAttribute('inert');
    expect(dropdown).toHaveAttribute('aria-hidden', 'true');
    await user.click(toggle);
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    expect(dropdown).not.toHaveAttribute('inert');
  });
  it('opens with the keyboard and restores toggle focus after Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    toggle.focus();
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' });
    within(navigation).getByRole('link', { name: /Our Story/ }).focus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('closes after selecting a destination and preserves its anchor and callback', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Navbar onNavigate={onNavigate} />);
    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    const link = within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: /Best Sellers/ });
    expect(link).toHaveAttribute('href', '#favourites');
    await user.click(link);
    expect(onNavigate).toHaveBeenCalledWith('favourites');
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('dismisses the dropdown when clicking outside the header', async () => {
    const user = userEvent.setup();
    render(<><Navbar /><button>Outside content</button></>);
    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    await user.click(screen.getByRole('button', { name: 'Outside content' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });
});
