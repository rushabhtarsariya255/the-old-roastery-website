import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo, BRAND_LOGO_SRC } from '../components/BrandLogo';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

 describe('Brand logo', () => {
  it('uses the same local square artwork in header and footer home links', () => {
    render(<><Navbar /><Footer /></>);
    const homeLinks = screen.getAllByRole('link', { name: 'The Old Roastery - Home' });
    expect(homeLinks).toHaveLength(2);
    for (const link of homeLinks) {
      expect(link).toHaveAttribute('href', '#top');
      const logo = within(link).getByRole('img', { name: 'The Old Roastery logo' });
      expect(logo).toHaveAttribute('src', BRAND_LOGO_SRC);
      expect(logo).toHaveAttribute('width', '700');
      expect(logo).toHaveAttribute('height', '700');
      expect(logo).toHaveClass('object-contain');
    }
  });

  it('keeps a decorative fallback logo out of accessible image names', () => {
    render(<BrandLogo variant="placeholder" decorative />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('keeps the brand readable if the local logo fails to load', () => {
    render(<BrandLogo />);
    fireEvent.error(screen.getByRole('img', { name: 'The Old Roastery logo' }));
    expect(screen.getByText('The Old Roastery')).toBeVisible();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
