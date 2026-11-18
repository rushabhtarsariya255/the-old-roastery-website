import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BestSellers } from '../components/BestSellers';

describe('Best Sellers selections', () => {
  it('features Cranberry Cold Brew first and keeps all five menu destinations', () => {
    render(<BestSellers />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(5);
    expect(within(cards[0]).getByRole('heading', { level: 3 })).toHaveTextContent('Cranberry Cold Brew');
    for (const card of cards) {
      expect(within(card).getByRole('link', { name: /Explore .* on the menu/ })).toHaveAttribute('href', '#menu');
    }
    expect(screen.getByText(/Individual prices & daily availability/)).toBeInTheDocument();
  });
});
