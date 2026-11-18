import { MaskedHeading, TransitionImage, SectionRule } from './MotionPrimitives';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight } from 'lucide-react';
import { FEATURE_IMAGE_SIZES } from '../data/photography';
import { CAFE_EXPERIENCES } from '../data/roasteryData';

export const Experiences: React.FC = () => {
  const reveal = useRevealMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const experience = CAFE_EXPERIENCES[activeIndex];
  return (
    <section id="experiences" aria-label="The Old Roastery Experiences" className="relative section-space bg-espresso-900 text-ivory-100">
      <SectionRule dark />
      <div className="section-shell">
        <motion.div {...reveal()} className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow mb-5 text-antiqueGold-300">03 / Everyday rituals</p><MaskedHeading className="section-title">More than a cup.<br /><span className="italic text-antiqueGold-300">A way to spend the day.</span></MaskedHeading></div><p className="max-w-sm self-end text-sm leading-7 text-ivory-300 lg:justify-self-end">Coffee, a comforting plate, and somewhere to settle in. Explore the little things that shape the Roastery experience.</p></motion.div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div role="group" aria-label="Choose a café experience" className="self-center border-t border-espresso-600">
            {CAFE_EXPERIENCES.map((item, index) => <button key={item.id} type="button" aria-pressed={index === activeIndex} aria-controls="experience-display" onClick={() => setActiveIndex(index)} className={`group flex w-full gap-5 border-b border-espresso-600 py-7 text-left transition-colors sm:gap-7 ${index === activeIndex ? 'text-ivory-50' : 'text-ivory-300 hover:bg-espresso-800'}`}><span className="pt-1 text-[11px] text-antiqueGold-300">0{index + 1}</span><span className="flex-1"><span className="block font-serif text-2xl sm:text-3xl">{item.title}</span><span className="mt-2 block text-[10px] uppercase tracking-[0.15em] text-antiqueGold-300">{item.tagline}</span><span className="mt-3 block text-sm leading-7 text-ivory-300">{item.description}</span></span><ArrowUpRight className={`mt-2 h-5 w-5 shrink-0 text-antiqueGold-300 transition-transform motion-reduce:transition-none ${index === activeIndex ? 'rotate-45' : ''}`} aria-hidden="true" /></button>)}
          </div>
          <motion.figure {...reveal(1)} id="experience-display" className="m-0 min-w-0"><div className="aspect-[5/6] overflow-hidden bg-espresso-800"><TransitionImage fill src={experience.image} srcSet={experience.imageSrcSet} sizes={FEATURE_IMAGE_SIZES} alt={experience.imageAlt ?? experience.title} width={experience.imageWidth} height={experience.imageHeight} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div><figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-[10px] text-ivory-300"><span aria-live="polite">{experience.title}</span><span>Café photography</span></figcaption></motion.figure>
        </div>
      </div>
    </section>
  );
};
