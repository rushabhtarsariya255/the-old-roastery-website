import { ImageReveal, MaskedHeading, SectionRule } from './MotionPrimitives';
import React from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/roasteryData';
import { MenuItem } from '../types';
import { PHOTOS, FEATURE_IMAGE_SIZES } from '../data/photography';

const bestSellerIds = ['cranberry-cold-brew', 'avocado-truffle-pizza', 'biscoff-cheesecake', 'espresso-tonic', 'pesto-vegetable-spaghetti'];
const bestSellerItems = bestSellerIds.flatMap((id) => {
  const item = MENU_ITEMS.find((selection) => selection.id === id);
  return item ? [item] : [];
});
const categoryLabels = { all: 'Curated selection', coffee: 'Coffee & brews', mains: 'From the kitchen', desserts: 'Something sweet' };

const SelectionCard: React.FC<{ item: MenuItem; index: number; featured?: boolean }> = ({ item, index, featured = false }) => {
  const photo = featured ? PHOTOS.bestSeller : undefined;
  return (
    <article className={`group motion-card flex h-full flex-col ${featured ? 'bg-espresso-900 text-ivory-50' : 'border border-ivory-300 bg-ivory-100 p-6 text-espresso-950'}`}>
      {photo && <a href={`#menu-${item.id}`} aria-label={`Explore ${item.name} on the menu`} className="relative block h-96 shrink-0 overflow-hidden bg-ivory-300 lg:h-[480px]">
        <ImageReveal className="absolute inset-0" src={photo.src} srcSet={photo.srcSet} sizes={FEATURE_IMAGE_SIZES} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" imageClassName="h-full w-full object-cover object-[center_75%] transition-transform duration-700 motion-safe:group-hover:scale-105" />
        <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ivory-100 text-sm text-espresso-900">0{index + 1}</span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory-100 text-espresso-900"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
      </a>}
      <div className={featured ? 'p-6 sm:p-8' : 'flex h-full flex-col'}>
        <p className={`mb-2 text-sm font-medium uppercase tracking-[0.18em] ${featured ? 'text-antiqueGold-300' : 'text-espresso-600'}`}>{!featured && `0${index + 1} / `}{categoryLabels[item.category]}</p>
        <h3 className={`font-serif font-normal leading-tight tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}><a href={`#menu-${item.id}`} className="underline-offset-4 hover:underline">{item.name}</a></h3>
        <p className={`mt-3 text-sm leading-6 ${featured ? 'max-w-sm text-ivory-300' : 'text-espresso-700'}`}>{item.description}</p>
        {!photo && <a href={`#menu-${item.id}`} aria-label={`Explore ${item.name} on the menu`} className="mt-auto inline-flex min-h-11 items-center gap-4 self-start pt-4 text-sm text-espresso-900">Explore menu<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
      </div>
    </article>
  );
};

export const BestSellers: React.FC = () => {
  const reveal = useRevealMotion();
  const [featured, ...selections] = bestSellerItems;
  return (
    <section id="favourites" aria-label="Featured Selections" className="relative scroll-mt-28 border-t border-ivory-300 bg-ivory-50 py-20 sm:py-24 lg:py-28">
      <SectionRule />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div {...reveal()} className="mb-10 flex flex-col justify-between gap-6 border-b border-ivory-300 pb-8 sm:mb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-espresso-600">The Roastery edit / 05 selections</p>
            <MaskedHeading className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-espresso-950 sm:text-5xl lg:text-6xl">A few good reasons<br />to <span className="italic text-espresso-500">come back.</span></MaskedHeading>
          </div>
          <div className="max-w-xs">
            <p className="text-sm leading-7 text-espresso-700">Meet our Featured Selections. A little bold, a little comforting, and always worth making room for.</p>
            <a href="#menu" className="mt-4 inline-flex min-h-11 items-center gap-5 border-b border-espresso-400 text-sm font-medium text-espresso-900 hover:text-antiqueGold-600">View the curated menu<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </motion.div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          {featured && <motion.div {...reveal()}><SelectionCard item={featured} index={0} featured /></motion.div>}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            {selections.map((item, index) => (
              <motion.div key={item.id} {...reveal(index + 1, 'scale')}><SelectionCard item={item} index={index + 1} /></motion.div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-ivory-300 pt-5 text-sm leading-5 text-espresso-600 sm:flex-row">
          <p>Individual prices & daily availability are confirmed at the café.</p><p>Café photography · Independent redesign concept</p>
        </div>
      </div>
    </section>
  );
};
