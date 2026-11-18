import { ImageReveal, MaskedHeading } from './MotionPrimitives';
import React from 'react';
import { PHOTOS, FEATURE_IMAGE_SIZES } from '../data/photography';
import { motion } from 'framer-motion';
import { useEntranceMotion } from './motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';

const cafePhoto = PHOTOS.hero;

export const Hero: React.FC = () => {
  const entrance = useEntranceMotion();
  return (
    <section id="top" aria-label="Welcome to The Old Roastery" className="scroll-mt-24 bg-ivory-100">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pb-12">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start justify-center py-4 sm:py-8 lg:py-12">
            <motion.div {...entrance()} className="mb-7 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-espresso-600 sm:mb-10"><span className="h-px w-8 bg-antiqueGold-600" aria-hidden="true" />Your little corner of Vesu</motion.div>
            <MaskedHeading as="h1" entrance className="font-serif text-[clamp(2.25rem,6vw,5.5rem)] font-normal leading-[1.04] tracking-[-0.055em] text-espresso-950">Good coffee.<br />Thoughtful plates.<br /><span className="italic text-espresso-500">Unhurried days.</span></MaskedHeading>
            <motion.p {...entrance(0.2)} className="mt-7 max-w-sm text-sm leading-7 text-espresso-700 sm:text-base sm:leading-8">A table for your everyday rituals. Discover specialty brews, comforting plates, and a moment to slow down at The Old Roastery.</motion.p>
            <motion.div {...entrance(0.3)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-10">
              <a href="#menu" className="action-solid group inline-flex min-h-12 items-center justify-center gap-5 bg-espresso-900 px-6 text-sm font-medium text-ivory-50 transition-colors hover:bg-espresso-700">Explore Menu<ArrowUpRight className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" /></a>
              <a href="#location" className="inline-flex min-h-12 items-center gap-3 border-b border-espresso-400 text-sm font-medium text-espresso-900 transition-colors hover:text-antiqueGold-600">Visit Us<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </motion.div>
            <motion.div {...entrance(0.35)} className="mt-7 space-y-2 text-sm leading-6 text-espresso-700"><p><strong className="font-medium text-espresso-950">Open daily · {BUSINESS_INFO.openingHours}</strong><span className="block text-sm">Closes at 1:00 AM the following day · IST</span></p><a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 underline underline-offset-4"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>{BUSINESS_INFO.address.line1}<br />Near BB Club Circle, Vesu, Surat</span></a></motion.div>
            <motion.a {...entrance(0.4)} href="#story" className="mt-10 inline-flex min-h-11 items-center gap-3 text-sm uppercase tracking-[0.18em] text-espresso-600 lg:mt-14"><ArrowDown className="h-4 w-4" aria-hidden="true" />A story worth slowing down for</motion.a>
          </div>
          <motion.figure {...entrance(0.15)} className="relative m-0 flex min-w-0 flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-espresso-900 sm:aspect-[5/4] lg:aspect-auto lg:min-h-[620px] lg:flex-1">
              <ImageReveal className="absolute inset-0" entrance parallax src={cafePhoto.src} srcSet={cafePhoto.srcSet} sizes={FEATURE_IMAGE_SIZES} alt={cafePhoto.alt} width={cafePhoto.width} height={cafePhoto.height} loading="eager" {...{ fetchpriority: 'high' }} imageClassName="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/75 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 border border-white/50 bg-espresso-950/35 px-3 py-2 text-sm uppercase tracking-[0.18em] text-white sm:left-7 sm:top-7">Independent redesign concept</span>
              <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between gap-4 border-t border-white/40 pt-5 text-ivory-50 sm:bottom-9 sm:left-8 sm:right-8">
                <div><span className="text-sm uppercase tracking-[0.22em] text-ivory-200">The Old Roastery / Vesu</span><p className="mt-2 font-serif text-3xl italic sm:text-4xl">Stay a little longer.</p></div>
                <span className="mb-1 text-sm tracking-widest" aria-hidden="true">VESU / SURAT</span>
              </div>
            </div>
            <figcaption className="mt-3 text-right text-sm leading-relaxed text-espresso-600">The Old Roastery dining space at Vacanza Trade Center, Vesu.</figcaption>
          </motion.figure>
        </div>
        <div className="mt-7 grid gap-5 border-y border-ivory-300 py-5 text-sm text-espresso-700 sm:grid-cols-2 lg:mt-10 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-antiqueGold-600" aria-hidden="true" /><span>Vacanza Trade Center <span className="text-espresso-400">/</span> Vesu, Surat</span></p>
          <p><span className="mr-3 text-sm uppercase tracking-[0.15em] text-espresso-500">A little perspective</span>{BUSINESS_INFO.approximateCostForTwo}</p>
          <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="inline-flex min-h-11 items-center gap-2 underline decoration-ivory-400 underline-offset-4 hover:text-espresso-950">Call the café<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
};

