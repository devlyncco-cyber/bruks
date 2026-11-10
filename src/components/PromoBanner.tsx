import React from 'react';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../data/brand';

export const PromoBanner: React.FC = () => {
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector('#products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFF8EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EF4329] via-[#E03A22] to-[#B32410] p-8 sm:p-12 md:p-16 text-white shadow-2xl">
          {/* Subtle decorative circles */}
          <div
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-black/15 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text side */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-[#FFF8EF] backdrop-blur-md mb-4">
                Freshly Brewed • Bottled Daily
              </span>

              {/* Exact headline from prompt */}
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#FFF8EF] tracking-tight leading-tight mb-4">
                Your Next Refreshing Moment Starts Here.
              </h2>

              {/* Exact supporting text from prompt */}
              <p className="text-base sm:text-xl text-[#FFF8EF]/90 font-normal max-w-2xl leading-relaxed mb-8">
                Discover your favourite Lobbo beverage and place your order today.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="#products"
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF8EF] hover:bg-[#F5E9D9] text-[#512719] font-extrabold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5 text-[#EF4329]" />
                  <span>Shop Lobbo Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={BRAND_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#191513]/40 hover:bg-[#191513]/60 text-[#FFF8EF] font-bold text-base px-7 py-4 rounded-full border border-white/25 backdrop-blur-md transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* Visual preview thumbnails of the two bottles */}
            <div className="lg:col-span-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-3 bg-[#191513]/50 p-4 rounded-3xl border border-white/20 backdrop-blur-md">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="text-center">
                    <div className="w-20 h-28 sm:w-24 sm:h-36 flex items-center justify-center">
                      <img
                        src={prod.image}
                        alt={`Lobbo ${prod.name} (${prod.size}) - Home-brewed drink bottle in Ghana`}
                        className="max-h-full w-auto object-contain drop-shadow-md hover:scale-110 transition-transform"
                        loading="lazy"
                        width={120}
                        height={180}
                      />
                    </div>
                    <span className="block text-[11px] font-bold text-[#FFF8EF] mt-1">
                      {prod.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

