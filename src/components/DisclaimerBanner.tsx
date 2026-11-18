import React, { useState } from 'react';
import { X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <aside aria-label="Independent Project Disclaimer" className="bg-espresso-900 text-ivory-200">
      <div className="section-shell flex min-h-11 items-center justify-between gap-4 py-1">
        <p className="text-sm leading-5"><span className="font-medium text-antiqueGold-300">Independent redesign concept.</span><span className="hidden sm:inline"> Unofficial portfolio showcase · Café photography</span><span className="sm:hidden"> Unofficial · Café imagery</span><span className="sr-only">. Not endorsed or authorized by The Old Roastery.</span></p>
        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss disclaimer banner" className="flex h-11 w-11 shrink-0 items-center justify-center text-ivory-200 transition-colors hover:bg-espresso-700 hover:text-white"><X className="h-4 w-4" aria-hidden="true" /></button>
      </div>
    </aside>
  );
};
