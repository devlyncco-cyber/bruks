import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Snowflake, HeartHandshake, Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../hooks/useCart';
import { BRAND_CONFIG } from '../data/brand';
import { formatCurrency } from '../utils/currency';

export const Hero: React.FC = () => {
  const { addToCart } = useCart();
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const activeProduct = PRODUCTS[activeProductIndex];

  const handleHeroAdd = (product: typeof activeProduct) => {
    addToCart(product, 1);
    setJustAdded(product.id);
    setTimeout(() => {
      setJustAdded(null);
    }, 1800);
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-14 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#FFF8EF] via-[#FFF8EF] to-[#F5E9D9]/50"
    >
      {/* Decorative Warm Ambient Glows */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] md:w-[900px] h-[350px] md:h-[450px] bg-gradient-to-tr from-[#EF4329]/10 via-[#F2C7A9]/20 to-[#512719]/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-24 w-80 h-80 bg-[#EF4329]/10 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#F5E9D9] border border-[#F2C7A9] shadow-sm mb-5 sm:mb-6 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#EF4329] shrink-0 animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#512719] truncate">
                Home-Brewed Excellence • Serve Chilled
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-[#512719] tracking-tight leading-[1.12] mb-5 sm:mb-6">
              Refresh Your Day.{' '}
              <span className="relative inline-block text-[#EF4329]">
                Experience Lobbo.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#EF4329]/30 -z-10"
                  height="8"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00024 6.99998C48.0002 2.49998 152 -1.50002 198 6.99998"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-[#512719]/85 font-normal max-w-xl leading-relaxed mb-7 sm:mb-8">
              Discover the goodness of home-brewed beverages, crafted for refreshing moments and best enjoyed chilled.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-[#EF4329]/25 hover:shadow-xl hover:shadow-[#EF4329]/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Explore Our Drinks</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFF8EF] hover:bg-[#F5E9D9] text-[#512719] font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-[#F2C7A9] shadow-sm hover:shadow transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust / Value Badges (Responsive layout prevents squished text) */}
            <div className="pt-6 border-t border-[#F2C7A9]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
              <div className="flex items-center gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#F5E9D9] flex items-center justify-center text-[#EF4329] shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#512719]">Ice Cold</p>
                  <p className="text-[11px] text-[#512719]/70">Best Chilled</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#F5E9D9] flex items-center justify-center text-[#EF4329] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#512719]">Home-Brewed</p>
                  <p className="text-[11px] text-[#512719]/70">Small Batches</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#F5E9D9] flex items-center justify-center text-[#EF4329] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#512719]">Local Pride</p>
                  <p className="text-[11px] text-[#512719]/70">Made in Ghana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase (Responsive, non-overlapping) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <div className="relative w-full max-w-md mx-auto">
              {/* Product Card Container with Luxury Podium Look */}
              <div className="relative bg-gradient-to-b from-[#191513] to-[#28221F] rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-[#FFF8EF] overflow-hidden group">
                {/* Floating Top Badges - Uses Flex to Guarantee NO OVERLAP */}
                <div className="absolute top-3.5 inset-x-3.5 sm:top-4 sm:inset-x-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
                  <span
                    className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wide text-white uppercase shadow-sm pointer-events-auto truncate max-w-[65%]"
                    style={{ backgroundColor: activeProduct.accentColor }}
                  >
                    {activeProduct.size} • {activeProduct.capColor} Cap
                  </span>

                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-white/20 backdrop-blur-md text-[#FFF8EF] border border-white/20 pointer-events-auto shrink-0">
                    {formatCurrency(activeProduct.price)}
                  </span>
                </div>

                {/* Soft ambient backlight behind the bottle */}
                <div
                  className="absolute inset-0 opacity-40 blur-2xl transition-all duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${activeProduct.accentColor} 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Actual Product Photo */}
                <div className="relative z-10 w-full h-72 sm:h-96 flex items-center justify-center py-2 mt-4 sm:mt-2">
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.name} - ${activeProduct.bottleAppearance}`}
                    className="max-h-full w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                </div>

                {/* Card Bottom Meta & Quick Add */}
                <div className="relative z-10 mt-2 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[#FFF8EF] gap-2">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-heading truncate">
                      {activeProduct.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-[#FFF8EF]/75 font-medium truncate">
                      {activeProduct.bottleAppearance}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHeroAdd(activeProduct)}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] transition-all shadow-md active:scale-95 shrink-0"
                    aria-label={`Add ${activeProduct.name} to cart`}
                  >
                    {justAdded === activeProduct.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add GH₵ {activeProduct.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Switcher Tabs: 2 Equal Columns to Prevent Overflow */}
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3 w-full">
                {PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setActiveProductIndex(idx)}
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:px-3 sm:py-2.5 rounded-2xl transition-all duration-200 border text-left min-w-0 ${
                      activeProductIndex === idx
                        ? 'bg-[#FFF8EF] border-[#EF4329] shadow-md ring-2 ring-[#EF4329]/20'
                        : 'bg-[#F5E9D9]/70 border-[#F2C7A9] hover:bg-[#FFF8EF] text-[#512719]/70'
                    }`}
                  >
                    <div className="w-7 sm:w-8 h-9 sm:h-10 rounded bg-[#191513] overflow-hidden flex items-center justify-center shrink-0 border border-white/20">
                      <img src={prod.image} alt={prod.name} className="h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#512719] leading-tight truncate">{prod.name}</p>
                      <p className="text-[11px] text-[#EF4329] font-bold">{formatCurrency(prod.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
