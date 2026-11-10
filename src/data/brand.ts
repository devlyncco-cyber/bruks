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

export const SEO_KEYWORDS: string[] = [
  'Lobbo Beverages',
  'Beverages in Ghana',
  'Drinks in Ghana',
  'Buy beverages in Ghana',
  'Refreshing drinks',
  'Quality beverages in Ghana',
  'Affordable drinks in Ghana',
  'Cous Cous drink',
  'Bruks beverage',
  'Drinks supplier in Ghana',
  'Beverage brand in Ghana',
  'Home brewed drinks Accra',
  'Chilled drinks Ghana',
  'Artisanal drinks Ghana',
  'Locally brewed beverages',
  'Bottled drinks Ghana',
  'Drinks delivery Accra',
  'Drinks delivery East Legon',
  'Drinks delivery Spintex',
  'Drinks delivery Tema',
  'Drinks delivery Koforidua',
  'Drinks for weddings Ghana',
  'Wedding drinks supplier Accra',
  'Party drinks crates Ghana',
  'Bulk drinks for events Accra',
  'Wholesale beverage supplier Ghana',
  'Order drinks on WhatsApp Ghana',
  'Best chilled drinks Accra',
  'Corporate drinks supply Ghana',
];
