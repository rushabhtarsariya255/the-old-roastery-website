import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Menu } from '../components/Menu';

describe('Menu Component', () => {
  it('uses distinct general kitchen photographs without mislabeling them as specific menu dishes', () => {
    render(<Menu />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.queryByRole('img', { name: 'Cappuccino' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cappuccino' })).toBeInTheDocument();
  });
  it('supports arrow-key selection and resets an empty combined search', async () => {
    const user = userEvent.setup();
    render(<Menu />);
    const all = screen.getByRole('tab', { name: 'All Curated Selections' });
    all.focus();
    await user.keyboard('{ArrowRight}');
    const coffee = screen.getByRole('tab', { name: 'Coffee & Brews' });
    expect(coffee).toHaveFocus();
    expect(coffee).toHaveAttribute('aria-selected', 'true');
    expect(all).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Coffee & Brews');
    await user.type(screen.getByRole('searchbox', { name: 'Search menu items' }), 'pizza');
    expect(screen.getByText('No selections match your search')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset Filters' }));
    expect(all).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(10);
    all.focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Sweets & Shakes' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(all).toHaveFocus();
  });
  it('renders curated menu items and pricing transparency notice', () => {
    render(<Menu />);
    expect(screen.getByText(/Cappuccino/i)).toBeInTheDocument();
    expect(screen.getByText(/Margherita Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/Biscoff Cheesecake/i)).toBeInTheDocument();
    expect(screen.getByText(/Note on Pricing & Availability:/i)).toBeInTheDocument();
  });

  it('filters by category when clicked', () => {
    render(<Menu />);
    
    // Switch to Coffee & Brews tab
    const coffeeTab = screen.getByRole('tab', { name: /Coffee & Brews/i });
    fireEvent.click(coffeeTab);

    expect(screen.getByText(/Cappuccino/i)).toBeInTheDocument();
    expect(screen.getByText(/Cranberry Cold Brew/i)).toBeInTheDocument();
    expect(screen.queryByText(/Margherita Pizza/i)).not.toBeInTheDocument();

    // Switch to Savory & Mains tab
    const mainsTab = screen.getByRole('tab', { name: /Savory & Mains/i });
    fireEvent.click(mainsTab);

    expect(screen.getByText(/Margherita Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/Avocado Truffle Pizza/i)).toBeInTheDocument();
    expect(screen.queryByText(/Cappuccino/i)).not.toBeInTheDocument();
  });

  it('filters items by search input', () => {
    render(<Menu />);
    const searchInput = screen.getByLabelText(/Search menu items/i);

    fireEvent.change(searchInput, { target: { value: 'Truffle' } });
    expect(screen.getByText(/Avocado Truffle Pizza/i)).toBeInTheDocument();
    expect(screen.queryByText(/Cappuccino/i)).not.toBeInTheDocument();
  });
});
