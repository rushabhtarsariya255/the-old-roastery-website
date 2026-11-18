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
  openingHours: '11:30 AM – 1:00 AM',
  instagramUrl: 'https://www.instagram.com/theoldroastery_srt/',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.1407724%2C72.77336',
  mapEmbedUrl: 'https://maps.google.com/maps?q=21.1407724,72.77336&z=18&output=embed',
  disclaimer: 'Independent Redesign Concept: This website is an independent digital redesign concept created for portfolio demonstration and is not an official, endorsed, or authorized website of The Old Roastery.',
  imageryDisclaimer: 'Café photography supplied for this website. Captions describe visible subjects; confirm menu availability and exact preparations with the café.',
};

export const MENU_ITEMS: MenuItem[] = [
  // Coffee & Cold Brews
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    description: 'Espresso with hot milk and foam.',
    tags: ["Espresso","Milk"],
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'coffee',
    description: 'Flat White, listed on the hot beverage menu in a 170 ml serving.',
    tags: ["Hot beverage","170 ml"],
  },
  {
    id: 'espresso-tonic',
    name: 'Espresso Tonic',
    category: 'coffee',
    description: 'Espresso with tonic water.',
    tags: ["Espresso","Tonic water"],
  },
  {
    id: 'vietnamese-coffee',
    name: 'Vietnamese Coffee',
    category: 'coffee',
    description: 'Vietnamese coffee from the iced beverage menu. Ask the café about its preparation.',
    tags: ["Iced beverage"],
  },
  {
    id: 'cranberry-cold-brew',
    name: 'Cranberry Cold Brew',
    category: 'coffee',
    description: 'Cold brew with cranberry and lemon.',
    tags: ["Cold brew","Cranberry","Lemon"],
  },

  // Savory & Mains
  {
    id: 'pesto-vegetable-spaghetti',
    name: 'Pesto Vegetable Spaghetti',
    category: 'mains',
    description: 'Spaghetti with Genovese pesto, capers, broccoli, beans, snow peas and extra virgin olive oil.',
    tags: ["Pesto","Spaghetti","Vegetables"],
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'mains',
    description: 'Pizza with Neapolitan sauce, fresh basil and mozzarella.',
    tags: ["Basil","Mozzarella"],
  },
  {
    id: 'avocado-truffle-pizza',
    name: 'Avocado Truffle Pizza',
    category: 'mains',
    description: 'Pizza with pesto sauce, Hass avocado, sun-dried tomatoes, truffle, hot honey and chilli.',
    tags: ["Avocado","Truffle","Hot honey"],
  },

  // Sweets & Shakes
  {
    id: 'biscoff-cheesecake',
    name: 'Biscoff Cheesecake',
    category: 'desserts',
    description: 'Cheesecake with Biscoff spread.',
    tags: ["Cheesecake","Biscoff"],
  },
  {
    id: 'nutella-shake',
    name: 'Nutella Shake',
    category: 'desserts',
    description: 'Nutella Shake from the shakes menu. Ask the café about ingredients and customisations.',
    tags: ["Shake"],
  },
];

export const CAFE_EXPERIENCES: CafeExperience[] = [
  {
    id: 'roastery-craft',
    title: 'Coffee at the Roastery',
    tagline: 'Espresso, Cold Brew & Manual Brewing',
    description: 'Explore espresso drinks, cold brews and manual brewing options from the café menu.',
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
    tagline: 'Pizza, Pasta & More',
    description: 'Explore pizzas, pasta, bowls, open toasts and other selections from the café kitchen.',
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
  { id: 'g-6', title: 'Iced Coffee', subtitle: 'Coffee, ice & a branded Roastery straw', category: 'coffee', imageUrl: PHOTOS.galleryIcedCoffee.src, imageSrcSet: PHOTOS.galleryIcedCoffee.srcSet, imageWidth: PHOTOS.galleryIcedCoffee.width, imageHeight: PHOTOS.galleryIcedCoffee.height, alt: PHOTOS.galleryIcedCoffee.alt, aspectRatio: 'square' },
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
