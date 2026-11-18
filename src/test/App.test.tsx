import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('The Old Roastery - App Component', () => {
  it('renders the brand name and main navigation', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/The Old Roastery/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders the independent redesign disclaimer banner', () => {
    render(<App />);
    const disclaimerBadges = screen.getAllByText(/Independent Redesign Concept/i);
    expect(disclaimerBadges.length).toBeGreaterThan(0);
  });

  it('renders all key sections', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: /Welcome to The Old Roastery/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /About The Old Roastery/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Featured Selections/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /The Old Roastery Menu/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /The Old Roastery Experiences/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Visual Gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Why Visit The Old Roastery/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Location and Contact Information/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo', { name: /Footer/i })).toBeInTheDocument();
  });
});
