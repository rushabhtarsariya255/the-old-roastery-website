import { ImageReveal, MaskedHeading, SectionRule } from './MotionPrimitives';
import React from 'react';
import { PHOTOS, FEATURE_IMAGE_SIZES } from '../data/photography';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';

export const About: React.FC = () => {
  const reveal = useRevealMotion();
  return (
  <section id="story" aria-label="About The Old Roastery" className="relative section-space border-t border-ivory-300 bg-ivory-200/50">
      <SectionRule />
    <div className="section-shell">
      <div className="mb-10 flex items-center justify-between border-b border-ivory-400 pb-5"><p className="eyebrow text-espresso-600">01 / Our story</p><span className="hidden text-sm text-espresso-600 sm:block">Rooted in Vesu. Made for your everyday.</span></div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <motion.figure {...reveal(0, 'left')} className="m-0">
          <div className="aspect-[5/6] overflow-hidden bg-ivory-300 sm:aspect-[6/5] lg:aspect-[5/6]"><ImageReveal className="h-full w-full" parallax direction="right" src={PHOTOS.story.src} srcSet={PHOTOS.story.srcSet} sizes={FEATURE_IMAGE_SIZES} alt={PHOTOS.story.alt} width={PHOTOS.story.width} height={PHOTOS.story.height} loading="lazy" decoding="async" imageClassName="h-full w-full object-cover" /></div>
          <figcaption className="mt-4 flex justify-between gap-4 text-sm text-espresso-600"><span>COFFEE / COMPANY / CRAFT</span><span>Coffee counter & daily rituals</span></figcaption>
        </motion.figure>
        <div>
          <p className="eyebrow mb-5 text-espresso-600">Three shops. One shared table.</p>
          <MaskedHeading className="section-title text-espresso-950">A slower tempo.<br /><span className="italic text-espresso-500">A warmer welcome.</span></MaskedHeading>
          <div className="editorial-copy mt-7 space-y-5 text-espresso-700"><p>In the energetic heart of Vesu, Surat, The Old Roastery offers a little room to pause. Specialty coffee meets comforting, Italian-inspired plates at Vacanza Trade Center, near BB Club Circle.</p><p>Drop in for an Espresso Tonic, linger over Avocado Truffle Pizza, or make time for Biscoff Cheesecake. Across shops 20, 21, and 22, there is space for quiet reads and shared conversations.</p></div>
          <dl className="my-8 grid grid-cols-2 gap-6 border-y border-ivory-400 py-6"><div><dt className="eyebrow text-espresso-600">The setting</dt><dd className="mt-3 font-serif text-2xl text-espresso-950">Shops 20–22</dd><dd className="mt-1 text-sm text-espresso-700">Vacanza Trade Center, Vesu</dd></div><div><dt className="eyebrow text-espresso-600">Listed value</dt><dd className="mt-3 font-serif text-2xl text-espresso-950">{BUSINESS_INFO.approximateCostForTwo}</dd></div></dl>
          <a href="#location" className="text-link text-espresso-900">Find your way here<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          <p className="mt-6 text-sm leading-6 text-espresso-600">An independent design concept. For holiday hours or reservations, <a className="underline underline-offset-4" href={`tel:${BUSINESS_INFO.phoneRaw}`}>call the café directly</a>.</p>
        </div>
      </div>
    </div>
  </section>
  );
};
