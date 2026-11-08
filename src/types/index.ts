export type PurchaseType = 'retail' | 'bulk';

export interface PackagingOption {
  id: string; // 'single', 'pack-6', 'crate-12', 'crate-24'
  name: string; // e.g. 'Single Bottle', 'Half Pack (6 Bottles)', 'Full Crate (12 Bottles)', 'Event Crate (24 Bottles)'
  shortName: string; // e.g. '1 Bottle', '6-Pack', '12 Crate', '24 Crate'
  bottlesCount: number; // 1, 6, 12, 24
  type: PurchaseType; // 'retail' | 'bulk'
  price: number; // in GH₵
  regularPrice: number; // in GH₵ (e.g. 15 * 12 = 180)
  savings?: number; // regularPrice - price
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  size: string; // e.g., '250ml', '300ml'
  price: number; // single bottle retail price in GH₵
  packagingOptions: PackagingOption[];
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
  id: string; // Unique cart item ID: `${product.id}__${selectedOption.id}`
  product: Product;
  selectedOption: PackagingOption;
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
  totalBottles: number;
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
