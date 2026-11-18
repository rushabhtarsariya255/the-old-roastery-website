import { FilterItem, ImageReveal, MaskedHeading, SectionRule } from './MotionPrimitives';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotionPreference, useRevealMotion } from './motion';
import { Maximize2 } from 'lucide-react';
import { CARD_IMAGE_SIZES } from '../data/photography';
import { GALLERY_ITEMS } from '../data/roasteryData';
import { LightboxModal } from './LightboxModal';

type GalleryFilter = 'all' | 'coffee' | 'plates' | 'ambience' | 'lifestyle';
const filters: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All Imagery' }, { id: 'coffee', label: 'Coffee & Rituals' },
  { id: 'plates', label: 'Plates & Pastries' }, { id: 'ambience', label: 'Ambience' },
  { id: 'lifestyle', label: 'Lifestyle' },
];
const ratios = { tall: 'aspect-[4/5]', wide: 'aspect-[3/2]', square: 'aspect-square' };

export const Gallery: React.FC = () => {
  const reveal = useRevealMotion();
  const reduced = useReducedMotionPreference();
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const visibleItems = activeFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  return (
    <section id="gallery" aria-label="Visual Gallery" className="relative section-space border-b border-ivory-300 bg-ivory-100">
      <SectionRule />
      <div className="section-shell">
        <motion.div {...reveal()} className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-5 text-espresso-600">04 / The visual journal</p><MaskedHeading className="section-title text-espresso-950">Small moments.<br /><span className="italic text-espresso-500">A lasting impression.</span></MaskedHeading></div><p className="max-w-xs text-sm leading-7 text-espresso-700">A visual moodboard of coffee rituals, shared plates, and slow afternoons. Open a photograph for a closer look.</p></motion.div>
        <div role="group" aria-label="Filter gallery images" className="mb-8 flex flex-wrap gap-1 border-y border-ivory-300 py-2">{filters.map((filter) => <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => { setSelectedIndex(null); setActiveFilter(filter.id); }} className={`filter-button relative ${activeFilter === filter.id ? 'border-transparent text-espresso-950' : 'border-transparent text-espresso-600 hover:border-ivory-400 hover:text-espresso-950'}`}>{filter.label}{activeFilter === filter.id && <motion.span layoutId="gallery-filter-line" aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-espresso-900" transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }} />}</button>)}</div>
        <p role="status" className="mb-6 text-[11px] text-espresso-600">{visibleItems.length} photographs</p>
        <div className="relative grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => <FilterItem as="figure" index={index} key={item.id} className="m-0">
            <button type="button" aria-label={`Enlarge ${item.title}`} onClick={(event) => { event.currentTarget.focus(); setSelectedIndex(visibleItems.indexOf(item)); }} className={`group relative block w-full cursor-pointer overflow-hidden bg-ivory-300 text-left ${ratios[item.aspectRatio ?? 'square']}`}>
              <ImageReveal className="absolute inset-0"  src={item.imageUrl} srcSet={item.imageSrcSet} sizes={CARD_IMAGE_SIZES} alt={item.alt} width={item.imageWidth} height={item.imageHeight} loading="lazy" decoding="async" imageClassName="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
              <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory-100 text-espresso-900 transition-colors group-hover:bg-antiqueGold-200"><Maximize2 className="h-4 w-4" aria-hidden="true" /></span>
            </button>
            <figcaption className="flex items-start justify-between gap-3 pb-5 pt-4"><div><h3 className="font-serif text-xl text-espresso-950">{item.title}</h3><p className="mt-1 text-xs leading-6 text-espresso-600">{item.subtitle}</p></div><span className="pt-1 text-[10px] text-espresso-600">{item.id.replace('g-', '0')}</span></figcaption>
          </FilterItem>)}
          </AnimatePresence>
        </div>
        <p className="mt-8 border-t border-ivory-300 pt-5 text-[11px] leading-6 text-espresso-600">Café photographs supplied for this website. Captions describe the subjects shown.</p>
      </div>
      <AnimatePresence>
        {selectedIndex !== null && <LightboxModal key="gallery-lightbox" isOpen direction={direction} item={visibleItems[selectedIndex]} onClose={() => setSelectedIndex(null)} onPrev={() => { setDirection(-1); setSelectedIndex((index) => index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length); }} onNext={() => { setDirection(1); setSelectedIndex((index) => index === null ? null : (index + 1) % visibleItems.length); }} currentIndex={selectedIndex} totalItems={visibleItems.length} />}
      </AnimatePresence>
    </section>
  );
};
