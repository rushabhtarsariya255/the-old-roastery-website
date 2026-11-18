import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImageReveal, MaskedHeading, TransitionImage } from '../components/MotionPrimitives';

afterEach(() => vi.unstubAllGlobals());

describe('Motion image and heading boundaries', () => {
  it('respects absolute positioning instead of collapsing the image frame with a conflicting relative class', () => {
    const { rerender } = render(<ImageReveal className="absolute inset-0" src="/coffee.jpg" alt="Coffee" />);
    const frame = screen.getByRole('img', { name: 'Coffee' }).closest('.image-reveal');
    expect(frame).toHaveClass('absolute', 'inset-0');
    expect(frame).not.toHaveClass('relative');
    rerender(<ImageReveal className="h-full w-full" src="/coffee.jpg" alt="Coffee" />);
    expect(frame).toHaveClass('relative', 'h-full', 'w-full');
    expect(frame).not.toHaveClass('absolute');
  });

  it('waits for the real image load and reports readiness without removing its alternative text', () => {
    const onLoad = vi.fn();
    render(<ImageReveal entrance src="/coffee.jpg" alt="A cup of coffee" onLoad={onLoad} />);
    const image = screen.getByRole('img', { name: 'A cup of coffee' });
    const frame = image.closest('[aria-busy]');
    expect(frame).toHaveAttribute('aria-busy', 'true');
    fireEvent.load(image);
    expect(frame).toHaveAttribute('aria-busy', 'false');
    expect(onLoad).toHaveBeenCalledOnce();
    expect(image).toHaveAttribute('alt', 'A cup of coffee');
  });

  it('provides a readable image failure state and can load a replacement source', () => {
    const { rerender } = render(<ImageReveal src="/missing.jpg" alt="Coffee" />);
    fireEvent.error(screen.getByRole('img', { name: 'Coffee' }));
    expect(screen.getByRole('img', { name: 'Photograph unavailable: Coffee' })).toBeInTheDocument();
    rerender(<ImageReveal src="/replacement.jpg" alt="Coffee" />);
    const replacement = screen.getByRole('img', { name: 'Coffee' });
    fireEvent.load(replacement);
    expect(replacement.closest('[aria-busy]')).toHaveAttribute('aria-busy', 'false');
  });

  it('keeps masked headings readable when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<MaskedHeading>Good coffee.<br />Thoughtful plates.</MaskedHeading>);
    const heading = screen.getByRole('heading', { name: 'Good coffee. Thoughtful plates.' });
    for (const line of heading.querySelectorAll<HTMLElement>('.heading-line')) {
      expect(line.style.transform).not.toContain('112%');
    }
  });
  it('retains the visible image until a replacement loads, and ignores obsolete requests', async () => {
    const { rerender, container } = render(<TransitionImage src="/first.jpg" alt="First" />);
    rerender(<TransitionImage src="/second.jpg" alt="Second" />);
    expect(screen.getByRole('img', { name: 'First' })).toBeInTheDocument();
    const obsolete = container.querySelector('[data-pending-image]')!;
    rerender(<TransitionImage src="/third.jpg" alt="Third" />);
    fireEvent.load(obsolete);
    expect(screen.queryByRole('img', { name: 'Second' })).not.toBeInTheDocument();
    fireEvent.load(container.querySelector('[data-pending-image]')!);
    await waitFor(() => expect(screen.getByRole('img', { name: 'Third' })).toBeInTheDocument());
  });

});
