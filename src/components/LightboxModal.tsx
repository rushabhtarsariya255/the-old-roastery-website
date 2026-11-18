import { TransitionImage } from './MotionPrimitives';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from './motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
  direction?: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ isOpen, item, onClose, onPrev, onNext, currentIndex, totalItems, direction = 1 }) => {
  const reduceMotion = useReducedMotionPreference();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const callbacks = useRef({ onClose, onPrev, onNext });
  useEffect(() => { callbacks.current = { onClose, onPrev, onNext }; }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children).filter((element) => element !== dialogRef.current);
    const originalInert = background.map((element) => element.hasAttribute('inert'));
    background.forEach((element) => element.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); callbacks.current.onClose(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); callbacks.current.onPrev(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); callbacks.current.onNext(); }
      else if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const keepFocusInside = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) closeRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', keepFocusInside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', keepFocusInside);
      document.body.style.overflow = originalOverflow;
      background.forEach((element, index) => { if (!originalInert[index]) element.removeAttribute('inert'); });
      if (opener?.isConnected) opener.focus();
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;
  return createPortal(
    <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Enlarged image: ${item.title}`} className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso-950/95 p-3 sm:p-8" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div initial={reduceMotion ? false : { y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: reduceMotion ? 0 : 8 }} transition={{ duration: reduceMotion ? 0 : 0.4 }} className="flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-y-auto border border-espresso-600 bg-espresso-900 text-ivory-100">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-espresso-600 px-4 py-2 sm:px-6"><p className="text-sm uppercase tracking-[0.18em] text-antiqueGold-300" aria-live="polite">Image {currentIndex + 1} of {totalItems} / {item.category}</p><button ref={closeRef} type="button" onClick={onClose} aria-label="Close image preview" className="flex h-11 w-11 items-center justify-center hover:bg-espresso-700"><X className="h-5 w-5" aria-hidden="true" /></button></div>
        <div className="relative flex h-[55dvh] min-h-32 shrink-0 items-center justify-center bg-espresso-950 px-12 py-4 sm:px-16">
          <TransitionImage fill src={item.imageUrl} alt={item.alt} width={item.imageWidth} height={item.imageHeight} direction={direction} className="h-full w-full object-contain" />
          <button type="button" onClick={onPrev} aria-label="Previous image" disabled={totalItems < 2} className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-espresso-600 bg-espresso-900 hover:bg-espresso-700 disabled:opacity-30 sm:left-3"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={onNext} aria-label="Next image" disabled={totalItems < 2} className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-espresso-600 bg-espresso-900 hover:bg-espresso-700 disabled:opacity-30 sm:right-3"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
        </div>
        <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-espresso-600 p-5 sm:flex-row sm:p-6"><motion.div key={item.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 }}><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-2 text-sm text-ivory-300">{item.subtitle}</p></motion.div><p className="max-w-xs text-sm leading-5 text-ivory-300">Café photography supplied for this website.<span className="mt-1 block">Use arrow keys to browse. Escape to close.</span></p></div>
      </motion.div>
    </motion.div>, document.body,
  );
};
