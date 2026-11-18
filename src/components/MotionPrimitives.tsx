import React, { Children, isValidElement, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform, useIsPresent } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useDesktopParallax, useReducedMotionPreference, useRevealMotion } from './motion';
import { BrandLogo } from './BrandLogo';

const ease = [0.22, 1, 0.36, 1] as const;

interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
  entrance?: boolean;
}

export function MaskedHeading({ children, className, as = 'h2', entrance = false }: MaskedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotionPreference();
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(canObserve && !reduced ? ref : { current: null }, { once: true, amount: 0.25 });
  const visible = reduced || entrance || inView || !canObserve;
  const lines: React.ReactNode[][] = [[]];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'br') lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  const Heading = as;
  return (
    <Heading ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="heading-mask">
          <motion.span className="heading-line" initial={reduced || !canObserve ? false : { y: '112%', rotate: 2 }} animate={visible ? { y: '0%', rotate: 0 } : { y: '112%', rotate: 2 }} transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : (entrance ? 0.18 : 0) + index * 0.16, ease }}>
            {line}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
}

function ParallaxLayer({ target, children }: { target: React.RefObject<HTMLDivElement>; children: React.ReactNode }) {
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const offset = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const y = useSpring(offset, { stiffness: 80, damping: 25, restDelta: 0.1 });
  return <motion.div className="absolute -inset-y-8 inset-x-0" style={{ y }}>{children}</motion.div>;
}

type ImageRevealProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
  className?: string;
  imageClassName?: string;
  direction?: 'up' | 'right';
  parallax?: boolean;
  entrance?: boolean;
};

// Reveal only when the image is available and in view; the frame always reserves space.
export function ImageReveal({ className = '', imageClassName = '', direction = 'up', parallax = false, entrance = false, onLoad, onError, ...imageProps }: ImageRevealProps) {
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotionPreference();
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(canObserve && !reduced ? frame : { current: null }, { once: true, amount: 0.15 });
  const desktop = useDesktopParallax();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    setReady(Boolean(image.current?.complete && image.current.naturalWidth));
  }, [imageProps.src]);
  const revealed = reduced || ((entrance || inView || typeof IntersectionObserver === 'undefined') && ready);
  const photo = (
    <motion.div className="h-full w-full" initial={false} animate={{ scale: reduced ? 1 : revealed ? 1 : 1.13, y: reduced || revealed ? 0 : 24 }} transition={{ duration: reduced ? 0 : 1.45, ease }}>
      <img {...imageProps} ref={image} className={`h-full w-full object-cover ${imageClassName}`} onLoad={(event) => { setReady(true); onLoad?.(event); }} onError={(event) => { setFailed(true); onError?.(event); }} />
    </motion.div>
  );
  return (
    <div ref={frame} className={twMerge('image-reveal relative overflow-hidden bg-ivory-300', className)} data-image-ready={ready} aria-busy={!ready && !failed}>
      {!failed && (parallax && desktop && !reduced ? <ParallaxLayer target={frame}>{photo}</ParallaxLayer> : photo)}
      {!ready && !failed && <div className="image-loading absolute inset-0" aria-hidden="true" />}
      {failed && <div role="img" aria-label={`Photograph unavailable: ${imageProps.alt ?? 'café photograph'}`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ivory-200 p-5 text-center text-espresso-600"><BrandLogo variant="placeholder" decorative /><span className="text-sm uppercase tracking-widest">Photograph unavailable</span></div>}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-ivory-200" style={{ transformOrigin: direction === 'right' ? 'right center' : 'center top' }} initial={false} animate={direction === 'right' ? { scaleX: revealed || failed ? 0 : 1 } : { scaleY: revealed || failed ? 0 : 1 }} transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : 0.08, ease }} />
    </div>
  );
}

interface FilterItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  as?: 'article' | 'figure';
}

// Forward the actual element so AnimatePresence can remove departing cards from layout.
export const FilterItem = React.forwardRef<HTMLElement, FilterItemProps>(function FilterItem({ children, className, index, as = 'article' }, ref) {
  const present = useIsPresent();
  const reduced = useReducedMotionPreference();
  const reveal = useRevealMotion();
  const Component = as === 'figure' ? motion.figure : motion.article;
  return <Component ref={ref} {...reveal(index, 'scale')} layout={reduced ? false : 'position'} exit={{ opacity: 0, scale: reduced ? 1 : 0.94, transition: { duration: reduced ? 0 : 0.22, delay: 0 } }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : (index % 3) * 0.1, layout: { duration: reduced ? 0 : 0.5, ease } }} aria-hidden={!present || undefined} {...{ inert: present ? undefined : '' }} style={{ pointerEvents: present ? 'auto' : 'none' }} className={className}>{children}</Component>;
});

interface TransitionImageProps extends React.ImgHTMLAttributes<HTMLImageElement> { direction?: number; fill?: boolean; }

function TransitionFrame({ direction = 1, fill = false, onLoad, onError, ...props }: TransitionImageProps) {
  const present = useIsPresent();
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth) setReady(true); }, []);
  return (
    <motion.div aria-hidden={!present || undefined} className={`${fill ? 'absolute inset-0' : 'relative col-start-1 row-start-1 min-h-32'} flex min-w-0 items-center justify-center overflow-hidden`} initial={reduced ? false : { opacity: 0, x: direction * 32, scale: 1.03 }} animate={{ opacity: 1, x: 0, scale: 1 }} variants={{ exit: (exitDirection: number) => ({ opacity: 0, x: reduced ? 0 : exitDirection * -24, scale: reduced ? 1 : 0.98 }) }} exit="exit" transition={{ duration: reduced ? 0 : 0.55, ease }}>
      {!ready && !failed && <div className="image-loading absolute inset-0" aria-hidden="true" />}
      {failed ? <p role="status" className="p-8 text-center text-sm">This photograph could not load. Try another image.</p> : <img {...props} ref={ref} style={{ ...props.style, opacity: ready ? 1 : 0 }} onLoad={(event) => { setReady(true); onLoad?.(event); }} onError={(event) => { setFailed(true); onError?.(event); }} />}
    </motion.div>
  );
}

export function TransitionImage(props: TransitionImageProps) {
  return <div className={`relative h-full min-w-0 overflow-hidden ${props.fill ? 'w-full' : 'grid items-center justify-items-center'}`}><AnimatePresence initial={false} custom={props.direction ?? 1}><TransitionFrame key={props.src} {...props} /></AnimatePresence></div>;
}

export function SectionRule({ dark = false }: { dark?: boolean }) {
  const reduced = useReducedMotionPreference();
  return <motion.div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-px ${dark ? 'bg-antiqueGold-500/40' : 'bg-ivory-400'}`} initial={false} animate={reduced ? { scaleX: 1 } : undefined} whileInView={reduced ? undefined : { scaleX: [0, 1] }} viewport={{ once: true }} style={{ transformOrigin: 'left center' }} transition={{ duration: reduced ? 0 : 1.3, ease }} />;
}
