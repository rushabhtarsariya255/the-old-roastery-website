import { MaskedHeading, SectionRule } from './MotionPrimitives';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRevealMotion } from './motion';
import { ArrowUpRight, Copy, Check, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roasteryData';

type CopyTarget = 'address' | 'phone';
type CopyState = 'idle' | 'copying' | 'copied' | 'error';

export const LocationContact: React.FC = () => {
  const reveal = useRevealMotion();
  const [copyStates, setCopyStates] = useState<Record<CopyTarget, CopyState>>({ address: 'idle', phone: 'idle' });
  const handleCopy = async (target: CopyTarget) => {
    setCopyStates((states) => ({ ...states, [target]: 'copying' }));
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(target === 'address' ? BUSINESS_INFO.address.formatted : BUSINESS_INFO.phone);
      setCopyStates((states) => ({ ...states, [target]: 'copied' }));
    } catch {
      setCopyStates((states) => ({ ...states, [target]: 'error' }));
    }
  };
  const copyButton = (target: CopyTarget) => <button type="button" onClick={() => void handleCopy(target)} disabled={copyStates[target] === 'copying'} aria-label={target === 'address' ? 'Copy address to clipboard' : 'Copy phone number to clipboard'} className="inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-ivory-400 text-sm text-espresso-700 transition-colors hover:text-espresso-950 disabled:cursor-wait disabled:opacity-60">{copyStates[target] === 'copied' ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}{copyStates[target] === 'copying' ? 'Copying…' : copyStates[target] === 'copied' ? 'Copied' : target === 'address' ? 'Copy address' : 'Copy'}</button>;
  const copyFeedback = (target: CopyTarget) => <p role="status" className={`min-h-5 text-sm leading-5 ${copyStates[target] === 'error' ? 'text-red-800' : 'text-olive-800'}`}>{copyStates[target] === 'error' ? `Could not copy ${target === 'address' ? 'the address' : 'the phone number'}. Select the text above and copy it manually.` : copyStates[target] === 'copied' ? `${target === 'address' ? 'Address' : 'Phone number'} copied to clipboard.` : ''}</p>;
  return (
    <section id="location" aria-label="Location and Contact Information" className="relative section-space border-t border-ivory-300 bg-ivory-100">
      <SectionRule />
      <div className="section-shell">
        <motion.div {...reveal()} className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-5 text-espresso-600">06 / Find us in Vesu</p><MaskedHeading className="section-title text-espresso-950">Your next coffee stop.<br /><span className="italic text-espresso-500">Closer than you think.</span></MaskedHeading></div><p className="max-w-xs text-sm leading-7 text-espresso-700">A cup, a meal, a catch-up. Find us near BB Club Circle at Vacanza Trade Center.</p></motion.div>
        <motion.div {...reveal(1, 'scale')} className="grid border border-ivory-300 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col bg-ivory-50 p-6 sm:p-10 lg:p-12">
            <p className="eyebrow text-espresso-600">The address</p><h3 className="mb-5 mt-4 font-serif text-3xl text-espresso-950">{BUSINESS_INFO.name}</h3>
            <address className="not-italic text-sm leading-7 text-espresso-700"><p className="font-medium text-espresso-950">{BUSINESS_INFO.address.line1}</p><p>{BUSINESS_INFO.address.landmark}</p><p>{BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city}</p><p>{BUSINESS_INFO.address.state} {BUSINESS_INFO.address.pincode}, {BUSINESS_INFO.address.country}</p></address>
            <div className="mb-1 mt-2 self-start">{copyButton('address')}</div>{copyFeedback('address')}
            <div className="mt-6 border-y border-ivory-300 py-5"><p className="eyebrow mb-2 text-espresso-600">A direct line</p><div className="flex flex-wrap items-center justify-between gap-3"><a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-serif text-2xl text-espresso-950 hover:text-antiqueGold-600">{BUSINESS_INFO.phone}</a>{copyButton('phone')}</div>{copyFeedback('phone')}</div>
            <div className="my-6 flex items-start gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-antiqueGold-600" aria-hidden="true" /><div><h4 className="text-sm font-medium text-espresso-950">Opening hours</h4><p className="mt-2 text-sm leading-6 text-espresso-700">Open daily · {BUSINESS_INFO.openingHours} (IST). Closing is at 1:00 AM the following day. Call for holiday hours, kitchen timings and reservations.</p></div></div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ivory-300 pt-6"><p className="text-sm text-espresso-600">{BUSINESS_INFO.approximateCostForTwo}</p><a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="action-solid">Open in Google Maps<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div>
          </div>
          <div className="relative min-h-[360px] border-t border-ivory-300 bg-ivory-200 lg:min-h-[560px] lg:border-l lg:border-t-0"><iframe src={BUSINESS_INFO.mapEmbedUrl} title="The Old Roastery Vacanza Trade Center location map" loading="lazy" className="absolute inset-0 h-full w-full border-0" /><div className="pointer-events-none absolute bottom-5 left-5 right-5 border border-ivory-300 bg-ivory-100 p-4"><p className="eyebrow text-espresso-600">The neighbourhood</p><p className="mt-2 font-serif text-xl text-espresso-950">Vacanza Trade Center / Vesu</p><p className="mt-1 text-sm leading-5 text-espresso-700">Near BB Club Circle · Shops 20–22</p></div></div>
        </motion.div>
      </div>
    </section>
  );
};
