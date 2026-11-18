import { FilterItem, ImageReveal, MaskedHeading, SectionRule } from './MotionPrimitives';
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotionPreference, useRevealMotion } from './motion';
import { Coffee, Pizza, Cake, Sparkles, Search, X } from 'lucide-react';
import { PHOTOS, FEATURE_IMAGE_SIZES } from '../data/photography';
import { MENU_ITEMS, BUSINESS_INFO } from '../data/roasteryData';
import { MenuCategory } from '../types';

const categories = [
  { id: 'all', label: 'All Curated Selections', icon: Sparkles },
  { id: 'coffee', label: 'Coffee & Brews', icon: Coffee },
  { id: 'mains', label: 'Savory & Mains', icon: Pizza },
  { id: 'desserts', label: 'Sweets & Shakes', icon: Cake },
] as const;

export const Menu: React.FC = () => {
  const reveal = useRevealMotion();
  const reduced = useReducedMotionPreference();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const query = searchQuery.trim().toLowerCase();
  const filteredItems = MENU_ITEMS.filter((item) => (activeCategory === 'all' || item.category === activeCategory) && [item.name, item.description, ...item.tags].some((text) => text.toLowerCase().includes(query)));
  const activeLabel = categories.find((category) => category.id === activeCategory)?.label;

  const handleTabKey = (event: React.KeyboardEvent, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = categories.length - 1;
    else return;
    event.preventDefault();
    setActiveCategory(categories[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" aria-label="The Old Roastery Menu" className="relative section-space border-t border-ivory-300 bg-ivory-100">
      <SectionRule />
      <div className="section-shell">
        <motion.div {...reveal()} className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="eyebrow mb-5 text-espresso-600">02 / The menu</p><MaskedHeading className="section-title text-espresso-950">Find your usual.<br /><span className="italic text-espresso-500">Or something new.</span></MaskedHeading></div>
          <p className="max-w-xs text-sm leading-7 text-espresso-700">From the first sip to the last sweet bite. Explore our curated coffee, kitchen, and dessert selections.</p>
        </motion.div>
        <div className="mb-10 grid gap-6 sm:grid-cols-2" aria-label="Photographs from the café kitchen">
          {[{ photo: PHOTOS.menuPizza, caption: 'Plates to share' }, { photo: PHOTOS.menuSandwich, caption: 'From the café kitchen' }].map(({ photo, caption }) => <figure key={photo.src} className="m-0"><div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]"><ImageReveal className="absolute inset-0" imageClassName="object-[center_72%]" src={photo.src} srcSet={photo.srcSet} sizes={FEATURE_IMAGE_SIZES} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></div><figcaption className="mt-3 text-[10px] uppercase tracking-[0.15em] text-espresso-600">{caption}</figcaption></figure>)}
        </div>
        <div className="flex flex-col justify-between gap-5 border-y border-ivory-300 py-4 xl:flex-row xl:items-center">
          <div role="tablist" aria-label="Filter menu categories" className="flex flex-wrap gap-1">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const active = category.id === activeCategory;
              return <button key={category.id} ref={(element) => { tabRefs.current[index] = element; }} id={`menu-tab-${category.id}`} type="button" role="tab" aria-selected={active} aria-controls="menu-results" tabIndex={active ? 0 : -1} onClick={() => setActiveCategory(category.id)} onKeyDown={(event) => handleTabKey(event, index)} className={`filter-button relative inline-flex items-center gap-2 ${active ? 'border-transparent text-espresso-950' : 'border-transparent text-espresso-600 hover:border-ivory-400 hover:text-espresso-950'}`}><Icon className="h-3.5 w-3.5" aria-hidden="true" />{category.label}{active && <motion.span layoutId="menu-filter-line" aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-espresso-900" transition={{ type: reduced ? 'tween' : 'spring', duration: reduced ? 0 : undefined, stiffness: 350, damping: 32 }} />}</button>;
            })}
          </div>
          <div className="relative w-full xl:w-72 xl:shrink-0"><Search className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-espresso-600" aria-hidden="true" /><input ref={searchRef} type="search" aria-label="Search menu items" placeholder="Coffee, pizza, something sweet…" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-h-12 w-full border border-ivory-400 bg-ivory-50 py-3 pl-10 pr-12 text-xs text-espresso-950 placeholder:text-espresso-600" />{searchQuery && <button type="button" aria-label="Clear search" onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }} className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-espresso-600 hover:text-espresso-950"><X className="h-4 w-4" aria-hidden="true" /></button>}</div>
        </div>
        <p role="status" className="my-5 text-[11px] text-espresso-600">{filteredItems.length} selections · {activeLabel}</p>
        <div id="menu-results" role="tabpanel" aria-labelledby={`menu-tab-${activeCategory}`} tabIndex={0}>
          <div className="relative grid gap-x-8 gap-y-10 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => <FilterItem index={index} key={item.id} className="group motion-card border-b border-ivory-300 pb-6">
              <h3 className="mt-5 font-serif text-2xl font-normal tracking-tight text-espresso-950">{item.name}</h3>{item.isSignature && <span className="mt-2 inline-block text-[9px] uppercase tracking-[0.15em] text-antiqueGold-600">Roastery signature</span>}<p className="mt-3 text-sm leading-7 text-espresso-700">{item.description}</p><ul aria-label={`${item.name} notes`} className="mt-4 flex flex-wrap gap-x-3 gap-y-1">{item.tags.map((tag) => <li key={tag} className="text-[10px] leading-5 text-espresso-600">{tag}</li>)}</ul>
            </FilterItem>)}
            </AnimatePresence>
          </div>
          {filteredItems.length === 0 && <div className="border border-dashed border-ivory-400 px-5 py-16 text-center"><Coffee className="mx-auto mb-4 h-8 w-8 text-espresso-500" aria-hidden="true" /><h3 className="font-serif text-2xl text-espresso-950">No selections match your search</h3><p className="mt-3 text-sm text-espresso-700">Try another word or explore the full menu.</p><button type="button" onClick={() => { setActiveCategory('all'); setSearchQuery(''); tabRefs.current[0]?.focus(); }} className="action-solid mt-6">Reset Filters</button></div>}
        </div>
        <div className="mt-10 grid gap-3 border-t border-ivory-300 pt-5 text-xs leading-6 text-espresso-600 md:grid-cols-[1fr_auto]"><p><strong className="font-medium text-espresso-900">Note on Pricing & Availability:</strong> Individual prices are confirmed at the counter. Selections are subject to daily availability.</p><p>{BUSINESS_INFO.approximateCostForTwo}</p></div>
      </div>
    </section>
  );
};
