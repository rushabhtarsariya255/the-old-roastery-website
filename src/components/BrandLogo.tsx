import { useState } from 'react';

export const BRAND_LOGO_SRC = '/brand/old-roastery-logo.webp';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'placeholder';
  decorative?: boolean;
}

const sizes = {
  header: 'h-14 w-14 sm:h-16 sm:w-16',
  footer: 'h-28 w-28 sm:h-36 sm:w-36',
  placeholder: 'h-12 w-12',
};

export function BrandLogo({ variant = 'header', decorative = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span aria-hidden={decorative || undefined} className="font-serif text-sm">The Old Roastery</span>;
  }

  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={decorative ? '' : 'The Old Roastery logo'}
      width={700}
      height={700}
      loading={variant === 'footer' ? 'lazy' : 'eager'}
      decoding="async"
      onError={() => setFailed(true)}
      data-brand-logo={variant}
      className={`block shrink-0 rounded-full bg-white object-contain ${sizes[variant]}`}
    />
  );
}
