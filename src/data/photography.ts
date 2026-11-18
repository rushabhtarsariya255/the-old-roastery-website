export interface PhotoAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

const retainedOriginals: Record<string, string> = {
  interior: 'the-old-roastery-interior-seating.jpg',
  cranberry: 'the-old-roastery-cranberry-cold-brew.jpg',
  'pizza-pair': 'the-old-roastery-neapolitan-pizzas.jpg',
  sandwiches: 'the-old-roastery-artisanal-sandwich.jpg',
  'layered-coffee': 'the-old-roastery-specialty-coffee.jpg',
  'table-setting': 'the-old-roastery-table-ambience.jpg',
  'pizza-drink': 'the-old-roastery-artisan-pizza-drink.jpg',
  exterior: 'the-old-roastery-exterior.jpg',
};

function photo(key: string, width: number, height: number, alt: string): PhotoAsset {
  const src = retainedOriginals[key] ? `/images/${retainedOriginals[key]}` : `/images/curated/${key}.webp`;
  return { src, srcSet: `${src} ${width}w`, width, height, alt };
}

// One distinct photograph per placement. The gallery lightbox enlarges its own image.
export const PHOTOS = {
  hero: photo('interior', 1360, 907, 'Sunlit café seating with wooden chairs, framed artwork, and a tripod spotlight'),
  story: photo('coffee-counter', 680, 1020, 'Coffee and tea packages on the café counter in front of two coffee grinders'),
  bestSeller: photo('cranberry', 680, 1020, 'Layered iced drink garnished with rosemary on a sunlit wooden table'),
  menuPizza: photo('pizza-pair', 816, 1020, 'Two café pizzas with vegetable toppings on wooden serving boards'),
  menuSandwich: photo('sandwiches', 681, 1020, 'Grilled sandwiches with grated cheese and dipping sauces on wooden boards'),
  experienceCoffee: photo('layered-coffee', 680, 1020, 'Layered coffee drink on a coaster in front of an espresso machine'),
  experienceKitchen: photo('plated-dish', 816, 1020, 'Golden filled pastries arranged over sauce in a black bowl, with pizza in the background'),
  experienceSpace: photo('table-setting', 680, 1020, 'Wooden café table and chairs beneath framed artwork with a copper table lamp'),
  galleryPourOver: photo('pour-over', 680, 1020, 'Pour-over coffee dripper and glass server on a scale beside a gooseneck kettle'),
  galleryPizza: photo('pizza-drink', 680, 1020, 'Pizza on a wooden board beside a red drink and copper lamp'),
  galleryExterior: photo('exterior', 680, 1020, 'The Old Roastery entrance and sign framed by leafy plants'),
  galleryCitrus: photo('citrus-drink', 680, 1020, 'Citrus-garnished layered drink with a rosemary sprig on a wooden table'),
  galleryCroissant: photo('croissant', 680, 1020, 'Golden croissant on a ceramic plate in warm sunlight'),
  galleryIcedCoffee: photo('iced-coffee', 816, 1020, 'Close-up of an iced coffee with ice cubes and a branded green straw'),
} satisfies Record<string, PhotoAsset>;

export const CARD_IMAGE_SIZES = '(min-width: 1400px) 420px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw';
export const FEATURE_IMAGE_SIZES = '(min-width: 1400px) 628px, (min-width: 1024px) 46vw, 90vw';
