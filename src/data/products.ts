import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lobbo-cous-cous',
    name: 'Lobbo Cous Cous',
    subtitle: 'Signature Smooth & Creamy Refreshment',
    size: '250ml',
    price: 15.0,
    capColor: 'White',
    bottleAppearance: 'Smooth, creamy, off-white beverage',
    accentColor: '#EF4329', // Lobbo Orange-Red
    description:
      'Enjoy the distinctive taste of Lobbo Cous Cous, a signature home-brewed beverage prepared for a smooth and refreshing experience. Best served chilled.',
    longDescription:
      'Crafted with artisanal dedication, Lobbo Cous Cous delivers a velvety, satisfying mouthfeel that revives and quenches. Every single bottle is small-batch brewed, bottled fresh with a white cap seal, and strictly enjoyed ice-cold.',
    labels: ['Home-Brewed', 'Serve Chilled', '250ml'],
    image: '/images/lobbo-cous-cous.jpg',
    featured: true,
    tasteNotes: ['Silky Smooth', 'Creamy Vanilla Accent', 'Natural Sweetness', 'Clean Finish'],
    bestEnjoyed: 'Straight from the cooler at afternoon gatherings, celebrations, or daily refreshment.',
    servingTemperature: 'Serve Ice Cold (2°C - 5°C)',
  },
  {
    id: 'lobbo-bruks',
    name: 'Lobbo Bruks',
    subtitle: 'Rich Textured Artisanal Brew',
    size: '300ml',
    price: 18.0,
    capColor: 'Black',
    bottleAppearance: 'Creamy beverage with distinctive textured/spiced flakes',
    accentColor: '#512719', // Deep Chocolate Brown
    description:
      'Experience Lobbo Bruks, a rich and distinctive home-brewed beverage with a unique textured character. Perfect for those who appreciate something different. Best served chilled.',
    longDescription:
      'A true standout creation, Lobbo Bruks is formulated for the adventurous palate. Featuring visible textured artisanal flakes folded into an indulgent creamy base and topped with a sleek black cap, Bruks brings an authentic homemade richness you will not find anywhere else.',
    labels: ['Home-Brewed', 'Serve Chilled', '300ml'],
    image: '/images/lobbo-bruks.jpg',
    featured: true,
    tasteNotes: ['Textured Spiced Flakes', 'Full Bodied Creaminess', 'Subtle Earthy Spices', 'Satisfying Crunch Notes'],
    bestEnjoyed: 'Chilled after a hard day, paired with savoury snacks, or shared with friends.',
    servingTemperature: 'Serve Ice Cold (2°C - 5°C)',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find((p) => p.id === id);
};

