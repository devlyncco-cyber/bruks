import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { CartItem, Product, PackagingOption, FulfilmentType } from '../types';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, option?: PackagingOption) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalBottles: number;
  subtotal: number;
  fulfilmentType: FulfilmentType;
  setFulfilmentType: (type: FulfilmentType) => void;
  deliveryFee: number | null; // null for delivery (calculated by seller on WhatsApp)
  isDeliveryFeeOnWhatsApp: boolean;
  grandTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toasts: ToastInfo[];
  removeToast: (id: string) => void;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lobbo_cart_items_v2';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        // Ensure each item has selectedOption and id
        return parsed.map((item) => {
          const opt = item.selectedOption || item.product.packagingOptions[0];
          return {
            ...item,
            id: item.id || `${item.product.id}__${opt.id}`,
            selectedOption: opt,
          };
        });
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [fulfilmentType, setFulfilmentType] = useState<FulfilmentType>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persist items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const showToast = (message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type: 'success' }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, option?: PackagingOption) => {
    if (quantity <= 0) return;
    const selectedOption = option || product.packagingOptions[0];
    const cartItemId = `${product.id}__${selectedOption.id}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedOption, quantity }];
    });

    const tierDesc = selectedOption.bottlesCount > 1 ? ` (${selectedOption.shortName})` : '';
    showToast(`Added ${quantity}× ${product.name}${tierDesc} to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId && item.product.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalBottles = useMemo(() => {
    return items.reduce((sum, item) => {
      const count = item.selectedOption?.bottlesCount || 1;
      return sum + count * item.quantity;
    }, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const unitPrice = item.selectedOption?.price ?? item.product.price;
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [items]);

  // Delivery fee is calculated by seller on WhatsApp based on location
  const isDeliveryFeeOnWhatsApp = fulfilmentType === 'delivery';

  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0;
    if (fulfilmentType === 'pickup') return 0;
    return null; // Calculated by seller on WhatsApp
  }, [items.length, fulfilmentType]);

  const grandTotal = useMemo(() => {
    return subtotal;
  }, [subtotal]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalBottles,
        subtotal,
        fulfilmentType,
        setFulfilmentType,
        deliveryFee,
        isDeliveryFeeOnWhatsApp,
        grandTotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        removeToast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
