export type MenuCategory = 'all' | 'coffee' | 'mains' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image?: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'coffee' | 'plates' | 'ambience' | 'lifestyle';
  imageUrl: string;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface CafeExperience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  address: {
    line1: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    formatted: string;
  };
  phone: string;
  phoneRaw: string;
  approximateCostForTwo: string;
  openingHours: string;
  instagramUrl: string;
  mapEmbedUrl: string;
  mapsUrl: string;
  disclaimer: string;
  imageryDisclaimer: string;
}
