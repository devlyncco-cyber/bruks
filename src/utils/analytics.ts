/**
 * Google Analytics 4 (GA4) Tracking Utility for Lobbo Beverages
 * Uses VITE_GA_MEASUREMENT_ID environment variable
 */

import { Product, PackagingOption, CartItem } from '../types';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let isInitialized = false;
let lastTrackedPath = '';

/**
 * Initializes Google Analytics 4 script tag dynamically
 */
export const initGA = (): void => {
  if (typeof window === 'undefined') return;
  if (!GA_ID || !GA_ID.startsWith('G-')) {
    // In development or when ID not provided, log politely in debug mode
    if (import.meta.env.DEV) {
      console.info('[Analytics] VITE_GA_MEASUREMENT_ID not configured; analytics tracking is in dry-run mode.');
    }
    return;
  }

  if (isInitialized) return;

  // Insert gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false, // Managed manually to prevent duplicate events in SPA
    anonymize_ip: true,
  });

  isInitialized = true;
};

/**
 * Track SPA Page View (prevents duplicate triggers)
 */
export const trackPageView = (url = window.location.pathname + window.location.hash, title = document.title): void => {
  if (typeof window === 'undefined') return;
  if (lastTrackedPath === url) return; // Prevent duplicate
  lastTrackedPath = url;

  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: url,
      page_title: title,
    });
  }
};

/**
 * Track E-commerce: Product view / Quick view
 */
export const trackViewItem = (product: Product, option?: PackagingOption): void => {
  if (typeof window === 'undefined') return;
  const opt = option || product.packagingOptions[0];

  if (window.gtag && GA_ID) {
    window.gtag('event', 'view_item', {
      currency: 'GHS',
      value: opt.price,
      items: [
        {
          item_id: `${product.id}__${opt.id}`,
          item_name: `${product.name} (${opt.name})`,
          item_category: 'Beverage',
          price: opt.price,
          quantity: 1,
        },
      ],
    });
  }
};

/**
 * Track E-commerce: Add To Cart
 */
export const trackAddToCart = (product: Product, quantity: number, option: PackagingOption): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA_ID) {
    window.gtag('event', 'add_to_cart', {
      currency: 'GHS',
      value: option.price * quantity,
      items: [
        {
          item_id: `${product.id}__${option.id}`,
          item_name: `${product.name} (${option.name})`,
          item_category: 'Beverage',
          price: option.price,
          quantity,
        },
      ],
    });
  }
};

/**
 * Track E-commerce: Begin Checkout
 */
export const trackBeginCheckout = (items: CartItem[], subtotal: number): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA_ID) {
    window.gtag('event', 'begin_checkout', {
      currency: 'GHS',
      value: subtotal,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: `${item.product.name} (${item.selectedOption.name})`,
        item_category: 'Beverage',
        price: item.selectedOption.price,
        quantity: item.quantity,
      })),
    });
  }
};

/**
 * Track Contact / WhatsApp Click / Lead Generation
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA_ID) {
    window.gtag('event', eventName, params);
  }
};

