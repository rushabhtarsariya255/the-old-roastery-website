import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { LocationContact } from '../components/LocationContact';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
const setClipboard = (value: unknown) => Object.defineProperty(navigator, 'clipboard', { configurable: true, value });
afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

describe('LocationContact Component', () => {
  it('renders the address, phone, approximate cost, and maps destination', () => {
    render(<LocationContact />);
    expect(screen.getByText('Shop 20–21–22, Vacanza Trade Center')).toBeInTheDocument();
    expect(screen.getByText('Vesu, Surat')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '+91 75750 29779' })).toHaveAttribute('href', 'tel:+917575029779');
    expect(screen.getByText('₹800 for two (approx.)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open in Google Maps/ })).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
  });

  it('waits for clipboard success before reporting a copied address', async () => {
    let finishCopy!: () => void;
    const writeText = vi.fn().mockReturnValue(new Promise<void>((resolve) => { finishCopy = resolve; }));
    setClipboard({ writeText });
    render(<LocationContact />);
    const button = screen.getByRole('button', { name: 'Copy address to clipboard' });
    fireEvent.click(button);
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Vacanza Trade Center'));
    expect(button).toBeDisabled();
    expect(screen.queryByText('Address copied to clipboard.')).not.toBeInTheDocument();
    await act(async () => { finishCopy(); });
    expect(screen.getByText('Address copied to clipboard.')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('copies the phone number after a successful clipboard write', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<LocationContact />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy phone number to clipboard' }));
    expect(writeText).toHaveBeenCalledWith('+91 75750 29779');
    expect(await screen.findByText('Phone number copied to clipboard.')).toBeInTheDocument();
  });

  it('reports denied clipboard access and allows retrying', async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error('Permission denied')).mockResolvedValueOnce(undefined);
    setClipboard({ writeText });
    render(<LocationContact />);
    const button = screen.getByRole('button', { name: 'Copy address to clipboard' });
    fireEvent.click(button);
    expect(await screen.findByText(/Could not copy the address/)).toBeInTheDocument();
    expect(screen.queryByText('Address copied to clipboard.')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByText('Address copied to clipboard.')).toBeInTheDocument();
    expect(screen.queryByText(/Could not copy the address/)).not.toBeInTheDocument();
  });

  it('provides manual copying guidance when the Clipboard API is unavailable', async () => {
    setClipboard(undefined);
    render(<LocationContact />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy phone number to clipboard' }));
    expect(await screen.findByText(/Could not copy the phone number.*manually/)).toBeInTheDocument();
  });
});
