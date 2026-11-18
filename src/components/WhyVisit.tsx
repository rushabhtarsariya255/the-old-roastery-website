import { MaskedHeading, SectionRule } from './MotionPrimitives';
import React from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight } from 'lucide-react';
import { WHY_VISIT_POINTS, BUSINESS_INFO } from '../data/roasteryData';

export const WhyVisit: React.FC = () => {
  const reveal = useRevealMotion();
  return (
  <section id="why-visit" aria-label="Why Visit The Old Roastery" className="relative section-space bg-ivory-200/50">
      <SectionRule />
    <div className="section-shell grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <div className="lg:sticky lg:top-32"><p className="eyebrow mb-5 text-espresso-600">05 / A place to return to</p><MaskedHeading className="section-title text-espresso-950">Come for coffee.<br /><span className="italic text-espresso-500">Stay for the feeling.</span></MaskedHeading><p className="editorial-copy mt-7 max-w-sm text-espresso-700">A familiar corner, a thoughtful menu, and good company. Sometimes the best plans are the simple ones.</p><a href="#location" className="text-link mt-6 text-espresso-900">Make it your next stop<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a><p className="mt-7 text-xs leading-6 text-espresso-600">Listed approximate cost: {BUSINESS_INFO.approximateCostForTwo}. Call ahead for current hours.</p></div>
      <ol className="border-t border-ivory-400">{WHY_VISIT_POINTS.map((point, index) => <motion.li {...reveal(index, 'right')} key={point.title} className="flex gap-5 border-b border-ivory-400 py-8 sm:gap-8"><span className="pt-1 text-xs text-espresso-500" aria-hidden="true">0{index + 1}</span><div><h3 className="font-serif text-2xl font-normal text-espresso-950 sm:text-3xl">{point.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-espresso-700">{point.description}</p></div></motion.li>)}</ol>
    </div>
  </section>
  );
};
