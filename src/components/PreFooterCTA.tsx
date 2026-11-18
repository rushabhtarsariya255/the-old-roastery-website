import { MaskedHeading, SectionRule } from './MotionPrimitives';
import React from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';

export const PreFooterCTA: React.FC = () => {
  const reveal = useRevealMotion();
  return (
  <section aria-label="Visit or Contact Invitation" className="relative section-space border-y border-ivory-400 bg-ivory-200">
      <SectionRule />
    <motion.div {...reveal()} className="section-shell grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div><p className="eyebrow mb-5 text-espresso-600">A little invitation</p><MaskedHeading className="section-title text-espresso-950">Leave the rush outside.<br /><span className="italic text-espresso-500">We'll save the moment.</span></MaskedHeading></div>
      <div className="max-w-md lg:justify-self-end"><p className="editorial-copy text-espresso-700">Make time for your next coffee ritual in Vesu. Call for today's hours or find your way to a table at Vacanza Trade Center.</p><div className="mt-7 flex flex-wrap gap-3"><a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="action-solid"><Phone className="h-4 w-4" aria-hidden="true" />Call {BUSINESS_INFO.phone}</a><a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="action-outline">Get directions<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div></div>
    </motion.div>
  </section>
  );
};
