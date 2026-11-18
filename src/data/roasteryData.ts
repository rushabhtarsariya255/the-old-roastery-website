import { PHOTOS } from './photography';
import { BusinessInfo, CafeExperience, GalleryItem, MenuItem } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'The Old Roastery',
  tagline: 'A Contemporary-Vintage Café in Vesu, Surat',
  address: {
    line1: 'Shop 20–21–22, Vacanza Trade Center',
    landmark: 'Near BB Club Circle',
    area: 'Vesu',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395007',
    country: 'India',
    formatted: 'Shop 20–21–22, Vacanza Trade Center, Near BB Club Circle, Vesu, Surat, Gujarat 395007, India',
  },
  phone: '+91 75750 29779',
  phoneRaw: '+917575029779',
  approximateCostForTwo: '₹800 for two (approx.)',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Old+Roastery+Vacanza+Trade+Center+Vesu+Surat',
  disclaimer: 'Independent Redesign Concept: This website is an independent digital redesign concept created for portfolio demonstration and is not an official, endorsed, or authorized website of The Old Roastery.',
  imageryDisclaimer: 'Café photography supplied for this website. Captions describe visible subjects; confirm menu availability and exact preparations with the café.',
};

export const MENU_ITEMS: MenuItem[] = [
  // Coffee & Cold Brews
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    description: 'Rich espresso balanced with velvety steamed milk and a dense crown of micro-foam.',
    tags: ['Classic Brew', 'Velvety Foam', 'Hot Beverage'],
    isSignature: true,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'coffee',
    description: 'Expertly pulled double ristretto gently folded into silky micro-textured whole milk.',
    tags: ['Double Shot', 'Silky Microfoam', 'Barista Favorite'],
  },
  {
    id: 'espresso-tonic',
    name: 'Espresso Tonic',
    category: 'coffee',
    description: 'Chilled effervescent tonic water poured over ice and crowned with a crisp espresso shot.',
    tags: ['Sparkling', 'Chilled', 'Citrus Undertones'],
    isSignature: true,
  },
  {
    id: 'vietnamese-coffee',
    name: 'Vietnamese Coffee',
    category: 'coffee',
    description: 'Traditional slow-dripped bold roast stirred through creamy condensed milk over cracked ice.',
    tags: ['Rich & Sweet', 'Condensed Milk', 'Iced'],
  },
  {
    id: 'cranberry-cold-brew',
    name: 'Cranberry Cold Brew',
    category: 'coffee',
    description: 'Slow-steeped cold brew infusion layered with tart cranberry nectar and delicate botanicals.',
    tags: ['Cold Brew', 'Fruity & Tart', 'Refreshing'],
    isSignature: true,
  },

  // Savory & Mains
  {
    id: 'pesto-vegetable-spaghetti',
    name: 'Pesto Vegetable Spaghetti',
    category: 'mains',
    description: 'Al dente pasta tossed in aromatic sweet basil pesto, tossed garden vegetables, and parmesan shavings.',
    tags: ['Basil Pesto', 'Vegetarian', 'Handcrafted Pasta'],
    isSignature: true,
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'mains',
    description: 'Classic artisanal crust topped with crushed sun-ripened tomatoes, fresh mozzarella, and aromatic basil.',
    tags: ['Classic Italian', 'Fresh Mozzarella', 'Vegetarian'],
  },
  {
    id: 'avocado-truffle-pizza',
    name: 'Avocado Truffle Pizza',
    category: 'mains',
    description: 'Crisp hand-stretched base topped with ripe avocado slices, creamy fior di latte, and aromatic truffle oil drizzle.',
    tags: ['Chef Signature', 'Truffle Essence', 'Vegetarian'],
    isSignature: true,
  },

  // Sweets & Shakes
  {
    id: 'biscoff-cheesecake',
    name: 'Biscoff Cheesecake',
    category: 'desserts',
    description: 'Silky cream cheese filling on a spiced speculoos cookie crust, finished with warm Lotus Biscoff glaze.',
    tags: ['Speculoos', 'Decadent Slice', 'Dessert Specialty'],
    isSignature: true,
  },
  {
    id: 'nutella-shake',
    name: 'Nutella Shake',
    category: 'desserts',
    description: 'Thick hazelnut cocoa shake blended with dairy cream, crowned with chocolate drizzle and wafer crisps.',
    tags: ['Hazelnut Cocoa', 'Thick Shake', 'Sweet Indulgence'],
  },
];

export const CAFE_EXPERIENCES: CafeExperience[] = [
  {
    id: 'roastery-craft',
    title: 'The Art of the Roast',
    tagline: 'Precision Brews & Bold Aromas',
    description: 'From warm morning espressos to chilled botanical infusions, each cup celebrates nuanced flavor profiles and meticulous craft.',
    iconName: 'Coffee',
    image: PHOTOS.experienceCoffee.src,
    imageSrcSet: PHOTOS.experienceCoffee.srcSet,
    imageWidth: PHOTOS.experienceCoffee.width,
    imageHeight: PHOTOS.experienceCoffee.height,
    imageAlt: PHOTOS.experienceCoffee.alt,
  },
  {
    id: 'culinary-kitchen',
    title: 'Contemporary Café Plates',
    tagline: 'Freshly Baked & Thoughtfully Prepared',
    description: 'Pairing comforting Italian and Mediterranean-inspired staples with fresh seasonal ingredients — from handcrafted mezze platters to artisanal pizzas and sourdough melts.',
    iconName: 'UtensilsCrossed',
    image: PHOTOS.experienceKitchen.src,
    imageSrcSet: PHOTOS.experienceKitchen.srcSet,
    imageWidth: PHOTOS.experienceKitchen.width,
    imageHeight: PHOTOS.experienceKitchen.height,
    imageAlt: PHOTOS.experienceKitchen.alt,
  },
  {
    id: 'vesu-gathering',
    title: 'Spacious Vesu Sanctuary',
    tagline: 'Warm Timber, Soft Light & Good Company',
    description: 'Spanning shops 20–22 in Vacanza Trade Center, offering a welcoming atmosphere for casual work, quiet reads, or leisurely weekend conversations.',
    iconName: 'Compass',
    image: PHOTOS.experienceSpace.src,
    imageSrcSet: PHOTOS.experienceSpace.srcSet,
    imageWidth: PHOTOS.experienceSpace.width,
    imageHeight: PHOTOS.experienceSpace.height,
    imageAlt: PHOTOS.experienceSpace.alt,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g-1', title: 'Pour-Over Ritual', subtitle: 'Dripper, kettle & a slower coffee ritual', category: 'coffee', imageUrl: PHOTOS.galleryPourOver.src, imageSrcSet: PHOTOS.galleryPourOver.srcSet, imageWidth: PHOTOS.galleryPourOver.width, imageHeight: PHOTOS.galleryPourOver.height, alt: PHOTOS.galleryPourOver.alt, aspectRatio: 'tall' },
  { id: 'g-2', title: 'Pizza & Company', subtitle: 'A café pizza, a cool drink & warm light', category: 'plates', imageUrl: PHOTOS.galleryPizza.src, imageSrcSet: PHOTOS.galleryPizza.srcSet, imageWidth: PHOTOS.galleryPizza.width, imageHeight: PHOTOS.galleryPizza.height, alt: PHOTOS.galleryPizza.alt, aspectRatio: 'tall' },
  { id: 'g-3', title: 'The Roastery Entrance', subtitle: 'Our familiar sign, framed by greenery', category: 'ambience', imageUrl: PHOTOS.galleryExterior.src, imageSrcSet: PHOTOS.galleryExterior.srcSet, imageWidth: PHOTOS.galleryExterior.width, imageHeight: PHOTOS.galleryExterior.height, alt: PHOTOS.galleryExterior.alt, aspectRatio: 'tall' },
  { id: 'g-4', title: 'Citrus & Rosemary', subtitle: 'Layered colour with citrus & a rosemary sprig', category: 'lifestyle', imageUrl: PHOTOS.galleryCitrus.src, imageSrcSet: PHOTOS.galleryCitrus.srcSet, imageWidth: PHOTOS.galleryCitrus.width, imageHeight: PHOTOS.galleryCitrus.height, alt: PHOTOS.galleryCitrus.alt, aspectRatio: 'square' },
  { id: 'g-5', title: 'Golden Croissant', subtitle: 'A flaky pastry in the afternoon light', category: 'plates', imageUrl: PHOTOS.galleryCroissant.src, imageSrcSet: PHOTOS.galleryCroissant.srcSet, imageWidth: PHOTOS.galleryCroissant.width, imageHeight: PHOTOS.galleryCroissant.height, alt: PHOTOS.galleryCroissant.alt, aspectRatio: 'tall' },
  { id: 'g-6', title: 'Iced Coffee', subtitle: 'Coffee, ice & the Roastery signature straw', category: 'coffee', imageUrl: PHOTOS.galleryIcedCoffee.src, imageSrcSet: PHOTOS.galleryIcedCoffee.srcSet, imageWidth: PHOTOS.galleryIcedCoffee.width, imageHeight: PHOTOS.galleryIcedCoffee.height, alt: PHOTOS.galleryIcedCoffee.alt, aspectRatio: 'square' },
];

export const WHY_VISIT_POINTS = [
  {
    title: 'Prime Vesu Destination',
    description: 'Conveniently situated at Vacanza Trade Center near BB Club Circle, making it an easy rendezvous point in Surat.',
  },
  {
    title: 'Curated Brews & Plates',
    description: 'From invigorating Cranberry Cold Brews to Avocado Truffle Pizza, experience an inspired cafe lineup.',
  },
  {
    title: 'Spacious Multi-Shop Footprint',
    description: 'Encompassing shops 20, 21, and 22 for comfortable seating whether you are catching up with friends or solo relaxing.',
  },
  {
    title: 'Honest Value',
    description: 'Approx. ₹800 for two, offering a high-taste café experience with relaxed contemporary-vintage appeal.',
  },
];
