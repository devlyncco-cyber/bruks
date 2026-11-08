import React, { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';

export const FloatingCartButton: React.FC = () => {
  const { totalItems, subtotal, openCart, isCartOpen, isCheckoutOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || totalItems === 0 || isCartOpen || isCheckoutOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Floating cart preview"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-slideUp"
    >
      <button
        type="button"
        onClick={openCart}
        className="flex items-center gap-3 bg-[#191513] hover:bg-[#2A2421] text-[#FFF8EF] pl-4 pr-5 py-3.5 rounded-full shadow-2xl border-2 border-[#EF4329] hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label={`View cart with ${totalItems} items`}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#EF4329] flex items-center justify-center text-white">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-white text-[#512719] text-[10px] font-black rounded-full flex items-center justify-center border border-[#EF4329]">
            {totalItems}
          </span>
        </div>

        <div className="text-left">
          <span className="text-[10px] font-bold text-[#F2C7A9] uppercase tracking-wider block">
            Cart Total
          </span>
          <span className="text-sm font-black text-white font-heading">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#EF4329] flex items-center justify-center text-white transition-colors ml-1">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </aside>
  );
};

