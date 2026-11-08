import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, Snowflake, PackageCheck, Zap, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';

export const ProductSection: React.FC = () => {
  const { addToCart, openCheckout } = useCart();
  const [filterType, setFilterType] = useState<'all' | 'retail' | 'bulk'>('all');

  const handleAddTastingDuo = () => {
    PRODUCTS.forEach((p) => {
      // Add single bottle of each
      addToCart(p, 1, p.packagingOptions[0]);
    });
    openCheckout();
  };

  const duoPrice = PRODUCTS.reduce((sum, p) => sum + p.price, 0);

  return (
    <section id="products" className="py-20 md:py-28 bg-[#FFF8EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E9D9] border border-[#F2C7A9] shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#EF4329]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#512719]">
              Handcrafted Artisanal Selection
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight mb-4">
            Our Signature Beverages
          </h2>

          <p className="text-base sm:text-lg text-[#512719]/80 font-normal leading-relaxed">
            Two distinctive home-brewed recipes. Available in individual retail bottles or money-saving crates for events, offices, and celebrations.
          </p>
        </div>

        {/* Retail vs Bulk Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              filterType === 'all'
                ? 'bg-[#512719] text-white shadow-md'
                : 'bg-white text-[#512719] border border-[#F2C7A9] hover:bg-[#F5E9D9]'
            }`}
          >
            All Packaging Options
          </button>

          <button
            type="button"
            onClick={() => setFilterType('retail')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              filterType === 'retail'
                ? 'bg-[#EF4329] text-white shadow-md'
                : 'bg-white text-[#512719] border border-[#F2C7A9] hover:bg-[#F5E9D9]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Retail (1 & 6 Bottles)</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('bulk')}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              filterType === 'bulk'
                ? 'bg-[#EF4329] text-white shadow-md'
                : 'bg-white text-[#512719] border border-[#F2C7A9] hover:bg-[#F5E9D9]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Bulk Crates (12 & 24 Bottles)</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={`${product.id}-${filterType}`}
              product={product}
              initialType={filterType === 'bulk' ? 'bulk' : 'retail'}
            />
          ))}
        </div>

        {/* Tasting Duo Banner / High-Conversion Bundle */}
        <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-r from-[#F5E9D9] via-[#F2C7A9]/40 to-[#F5E9D9] rounded-3xl p-6 sm:p-8 border border-[#F2C7A9] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#EF4329] text-[#FFF8EF] flex items-center justify-center shrink-0 shadow-md shadow-[#EF4329]/20">
              <PackageCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EF4329]">
                  Can't decide? Try Both!
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EF4329] text-white">
                  Retail Duo
                </span>
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#512719] mt-0.5">
                The Lobbo Refreshment Duo (1x Cous Cous + 1x Bruks)
              </h3>
              <p className="text-xs sm:text-sm text-[#512719]/80 mt-1">
                Experience both smooth creaminess and rich textured spiced character in one chilled order.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="text-center sm:text-right">
              <span className="text-xs text-[#512719]/60 font-medium block">Bundle Price</span>
              <span className="font-heading font-black text-2xl text-[#EF4329]">
                {formatCurrency(duoPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddTastingDuo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] shadow-md shadow-[#EF4329]/25 hover:shadow-lg transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Order Duo Bundle</span>
            </button>
          </div>
        </div>

        {/* Serve Chilled & Bulk Prompt Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[#512719]/75 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Snowflake className="w-4 h-4 text-[#EF4329]" />
            <span>Store below 5°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#EF4329]" />
            <a href="#bulk" className="text-[#EF4329] hover:underline">
              Planning a party or event? Check our bulk crate rates &rarr;
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4329]" />
            <span>Prepared fresh in small batches</span>
          </div>
        </div>
      </div>
    </section>
  );
};
