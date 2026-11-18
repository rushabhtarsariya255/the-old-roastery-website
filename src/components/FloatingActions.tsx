import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';

export const FloatingActions: React.FC = () => (
  <aside aria-label="Quick contact actions" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 flex overflow-hidden rounded-full border border-ivory-400 bg-ivory-100 shadow-md">
    <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open The Old Roastery in Google Maps" title="Get directions" className="flex h-12 w-12 items-center justify-center text-espresso-900 transition-colors hover:bg-ivory-200"><MapPin className="h-4 w-4" aria-hidden="true" /></a>
    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} aria-label={`Call The Old Roastery at ${BUSINESS_INFO.phone}`} title={`Call ${BUSINESS_INFO.phone}`} className="flex h-12 w-12 items-center justify-center border-l border-ivory-400 bg-espresso-900 text-ivory-100 transition-colors hover:bg-espresso-700"><Phone className="h-4 w-4" aria-hidden="true" /></a>
  </aside>
);
