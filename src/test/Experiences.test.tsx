import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Experiences } from '../components/Experiences';
import { PHOTOS } from '../data/photography';

describe('Experience selectors', () => {
  it('changes the image with a keyboard-operable selection and exposes its state', async () => {
    const user = userEvent.setup();
    render(<Experiences />);
    const kitchen = screen.getByRole('button', { name: /Contemporary Caf\u00e9 Plates/ });
    kitchen.focus();
    await user.keyboard('{Enter}');
    expect(kitchen).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /Coffee at the Roastery/ })).toHaveAttribute('aria-pressed', 'false');
    fireEvent.load(document.querySelector('[data-pending-image]')!);
    await waitFor(() => expect(screen.getByRole('img')).toHaveAccessibleName(PHOTOS.experienceKitchen.alt));
  });
});
