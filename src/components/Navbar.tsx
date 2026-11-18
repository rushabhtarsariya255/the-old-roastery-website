import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from './motion';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps { onNavigate?: (id: string) => void; }
const navLinks = [
  { label: 'Our Story', href: '#story' }, { label: 'Featured Selections', href: '#favourites' },
  { label: 'Menu', href: '#menu' }, { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' }, { label: 'Why Visit', href: '#why-visit' },
  { label: 'Visit Us', href: '#location' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotionPreference();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let previous: boolean | undefined;
    const handleScroll = () => {
      const next = window.scrollY > 40;
      if (next !== previous) { previous = next; setIsScrolled(next); }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMobileMenuOpen(false);
    };
    const desktopQuery = window.matchMedia('(min-width: 1280px)');
    const handleDesktop = () => { if (desktopQuery.matches) setMobileMenuOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutsideClick);
    desktopQuery.addEventListener('change', handleDesktop);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutsideClick);
      desktopQuery.removeEventListener('change', handleDesktop);
    };
  }, [mobileMenuOpen]);

  const handleNavigate = (href: string) => {
    if (mobileMenuOpen) menuButtonRef.current?.focus();
    setMobileMenuOpen(false);
    onNavigate?.(href.slice(1));
  };

  return (
    <motion.header initial={reduceMotion ? false : { y: -28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} ref={headerRef} className={`site-header sticky top-0 z-40 border-b ${isScrolled ? 'is-scrolled border-ivory-300 bg-ivory-100/95 shadow-sm' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-5 sm:h-24 sm:px-8 lg:px-12">
        <a href="#top" aria-label="The Old Roastery - Home" className="flex shrink-0 items-center gap-3 text-espresso-950" onClick={() => handleNavigate('#top')}>
          <BrandLogo />
          <span className="whitespace-nowrap font-serif text-base font-normal leading-tight tracking-tight text-espresso-950 sm:text-xl">The Old Roastery</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => handleNavigate(link.href)} className="py-3 text-sm font-medium tracking-wide text-espresso-700 decoration-antiqueGold-500 underline-offset-8 transition-colors hover:text-espresso-950 hover:underline">{link.label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hidden min-h-11 items-center gap-2 border border-espresso-900 px-5 text-sm font-medium text-espresso-900 transition-colors hover:bg-espresso-900 hover:text-ivory-50 sm:inline-flex"><Phone className="h-3.5 w-3.5" aria-hidden="true" />Call Café</a>
          <button ref={menuButtonRef} type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="mobile-navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center text-espresso-900 transition-colors hover:bg-ivory-200 xl:hidden">
            <motion.span animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>{mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}</motion.span>
          </button>
        </div>
      </div>
        <motion.nav id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!mobileMenuOpen} {...{ inert: mobileMenuOpen ? undefined : '' }} initial={false} animate={mobileMenuOpen ? 'open' : 'closed'} variants={{ open: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.4, staggerChildren: reduceMotion ? 0 : 0.045 } }, closed: { opacity: 0, y: reduceMotion ? 0 : -20, transition: { duration: reduceMotion ? 0 : 0.25 } } }} style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }} onBlur={(event) => {
          if (event.relatedTarget instanceof Node && !headerRef.current?.contains(event.relatedTarget)) setMobileMenuOpen(false);
        }} className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto border-b border-ivory-300 bg-ivory-100 px-6 py-6 shadow-lg sm:px-8 xl:hidden">
          <p className="mb-4 text-sm uppercase tracking-[0.22em] text-espresso-600">A little look around</p>
          {navLinks.map((link, index) => <motion.a key={link.href} variants={{ open: { x: 0, opacity: 1 }, closed: { x: reduceMotion ? 0 : 20, opacity: 0 } }} transition={{ duration: reduceMotion ? 0 : 0.35 }} href={link.href} onClick={() => handleNavigate(link.href)} className="flex min-h-12 items-center justify-between gap-4 border-b border-ivory-300 py-3 font-serif text-xl text-espresso-900 hover:text-antiqueGold-600"><span><span className="mr-4 font-sans text-sm text-espresso-500">0{index + 1}</span>{link.label}</span><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></motion.a>)}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center gap-2 bg-espresso-900 px-5 text-sm text-ivory-50"><Phone className="h-4 w-4" aria-hidden="true" />{BUSINESS_INFO.phone}</a>
            <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-ivory-400 px-5 text-sm text-espresso-900">Get directions<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </motion.nav>
    </motion.header>
  );
};
