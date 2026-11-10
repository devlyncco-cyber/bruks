import { BrandConfig } from '../types';

export const BRAND_CONFIG: BrandConfig = {
  name: 'LOBBO BEVERAGES',
  tagline: 'Home-Brewed Excellence. Serve Chilled.',
  industry: 'Beverage / Food & Drinks',
  market: 'Ghana',
  currency: 'GHS',
  currencySymbol: 'GH₵',
  whatsappNumber: '233243191039',
  whatsappUrl: 'https://wa.me/233243191039',
  displayPhone: '+233 24 319 1039',
  displayPhoneAlt: '+233 26 110 2751',
  deliveryNote: 'How much is the delivery to my place please?',
  pickupLocation: 'Accra / Koforidua',
  websiteUrl: 'https://lobbodrinks.com',
  domain: 'lobbodrinks.com',
  seoTitle: 'Lobbo Beverages | Refreshing Drinks in Ghana',
  seoDescription:
    'Discover Lobbo Beverages and explore our refreshing drinks. Experience quality, great taste and convenient ordering in Ghana.',
  ogImage: 'https://lobbodrinks.com/og-image.jpg',
};

export interface SocialLink {
  name: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'WhatsApp', href: 'https://wa.me/233243191039'},
];
