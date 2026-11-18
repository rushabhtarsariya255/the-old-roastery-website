import React from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';
import { BrandLogo } from './BrandLogo';

const links = [
  { label: 'Our Story', href: '#story' }, { label: 'Best Sellers', href: '#favourites' },
  { label: 'Curated Menu', href: '#menu' }, { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' }, { label: 'Why Visit', href: '#why-visit' },
  { label: 'Location & Contact', href: '#location' },
];

export const Footer: React.FC = () => {
  const reveal = useRevealMotion();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <footer aria-label="Footer" className="bg-espresso-900 pb-24 pt-16 text-ivory-300 sm:pt-20">
      <div className="section-shell">
        <motion.div {...reveal()} className="flex flex-col justify-between gap-6 border-b border-espresso-600 pb-10 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4 text-antiqueGold-300">Coffee, company & a little pause</p><a href="#top" aria-label="The Old Roastery - Home" className="inline-flex rounded-full"><BrandLogo variant="footer" /></a></div><button type="button" onClick={scrollToTop} aria-label="Back to top of page" className="inline-flex min-h-11 items-center gap-4 self-start border-b border-espresso-500 text-xs text-ivory-200 transition-colors hover:text-antiqueGold-300 sm:self-auto">Back to top<ArrowUp className="h-4 w-4" aria-hidden="true" /></button></motion.div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-20">
          <div><p className="eyebrow mb-4 text-antiqueGold-300">A corner of Vesu</p><p className="max-w-xs text-sm leading-7">An independent editorial concept celebrating specialty coffee, thoughtful plates, and the everyday pleasure of slowing down.</p><p className="mt-5 text-xs leading-6">{BUSINESS_INFO.address.line1}<br />{BUSINESS_INFO.address.landmark}<br />Vesu, Surat, Gujarat 395007</p></div>
          <nav aria-label="Footer navigation"><p className="eyebrow mb-3 text-antiqueGold-300">Look around</p><ul className="grid grid-cols-2 gap-x-5">{links.map((link) => <li key={link.href}><a href={link.href} className="inline-flex min-h-11 items-center text-xs underline-offset-4 hover:text-white hover:underline">{link.label}</a></li>)}</ul></nav>
          <div><p className="eyebrow mb-4 text-antiqueGold-300">Keep in touch</p><a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center font-serif text-2xl text-ivory-50 hover:text-antiqueGold-300">{BUSINESS_INFO.phone}</a><p className="mt-1 text-xs leading-6">Call for hours & reservations inquiries.</p><a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-4 text-ivory-200">Open in Google Maps<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a><p className="mt-5 text-xs">{BUSINESS_INFO.approximateCostForTwo}</p></div>
        </div>
        <div className="border-y border-espresso-600 py-6 text-[11px] leading-6"><p className="mb-1 font-medium text-ivory-100">Independent redesign concept</p><p className="max-w-4xl">{BUSINESS_INFO.disclaimer} Photographs were supplied for this website and show café spaces, drinks, and plates. Trademarks belong to their respective owners.</p></div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] leading-5 sm:flex-row"><p>© {new Date().getFullYear()} The Old Roastery — Independent Editorial Concept. All rights reserved.</p><p>Designed for Vesu, Surat.</p></div>
      </div>
    </footer>
  );
};
