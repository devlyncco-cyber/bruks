export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  size: string; // e.g., '250ml', '300ml'
  price: number; // in GH₵
  capColor: 'White' | 'Black';
  bottleAppearance: string;
  accentColor: string; // Hex color e.g., #EF4329 or #512719
  description: string;
  longDescription?: string;
  labels: string[]; // e.g., ['Home-Brewed', 'Serve Chilled', '250ml']
  image: string;
  featured?: boolean;
  tasteNotes?: string[];
  bestEnjoyed?: string;
  servingTemperature?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FulfilmentType = 'delivery' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  fulfilmentType: FulfilmentType;
  deliveryAddress?: string; // Location / Address stated by user for seller calculation
  orderNotes?: string;
}

export interface CheckoutFormData extends CustomerDetails {}

export interface OrderSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number | null; // null when calculated by seller on WhatsApp for delivery
  grandTotal: number;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  industry: string;
  market: string;
  currency: string;
  currencySymbol: string;
  whatsappNumber: string;
  whatsappUrl: string;
  displayPhone: string;
  displayPhoneAlt?: string;
  deliveryNote: string;
  pickupLocation: string;
}
