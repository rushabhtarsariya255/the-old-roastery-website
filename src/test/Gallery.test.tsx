import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Gallery } from '../components/Gallery';

describe('Gallery Component', () => {
  it('opens from the keyboard, traps focus, wraps images, and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const opener = screen.getByRole('button', { name: 'Enlarge Pour-Over Ritual' });
    opener.focus();
    await user.keyboard('{Enter}');
    const close = screen.getByRole('button', { name: 'Close image preview' });
    expect(close).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    expect(opener.closest('[inert]')).not.toBeNull();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Next image' })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Enlarged image: Iced Coffee');
    expect(close).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Enlarged image: Pour-Over Ritual');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(opener.closest('[inert]')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('exposes the selected filter and browses only photographs in that category', async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const coffeeFilter = screen.getByRole('button', { name: 'Coffee & Rituals' });
    await user.click(coffeeFilter);
    expect(coffeeFilter).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('Golden Croissant')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Enlarge Pour-Over Ritual' }));
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Enlarged image: Iced Coffee');
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Enlarged image: Pour-Over Ritual');
    await user.click(screen.getByRole('button', { name: 'Close image preview' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('disables previous and next for a single-photo category', async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    await user.click(screen.getByRole('button', { name: 'Ambience' }));
    await user.click(screen.getByRole('button', { name: 'Enlarge The Roastery Entrance' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('button', { name: 'Next image' })).toBeDisabled();
    expect(within(dialog).getByRole('button', { name: 'Previous image' })).toBeDisabled();
    await user.tab();
    expect(within(dialog).getByRole('button', { name: 'Close image preview' })).toHaveFocus();
  });
});
