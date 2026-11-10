import React from 'react';
import { MessageCircle, Phone, MapPin, ArrowUp, Snowflake, Heart } from 'lucide-react';
import { BRAND_CONFIG, SOCIAL_LINKS } from '../data/brand';
import { PRODUCTS } from '../data/products';
import { useCart } from '../hooks/useCart';
import { LobboLogo } from './LobboLogo';

export const Footer: React.FC = () => {
  const { openQuickView } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Products', href: '#products' },
    { label: 'Bulk & Retail', href: '#bulk' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Lobbo', href: '#why-lobbo' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact & Orders', href: '#contact' },
  ];

  return (
    <footer className="bg-[#191513] text-[#FFF8EF] pt-16 pb-12 border-t-4 border-[#EF4329] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#EF4329]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Identity Col with Authentic Bottle Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block bg-[#FFF8EF] p-2.5 px-3 rounded-2xl shadow-md border border-[#F2C7A9]/40">
              <LobboLogo className="h-12 w-auto" variant="color" />
            </div>

            <p className="text-xs sm:text-sm text-[#FFF8EF]/75 leading-relaxed max-w-sm">
              Artisanal home-brewed beverages crafted for pure refreshment. Bottled fresh in Ghana with our signature smooth Cous Cous and rich textured Bruks recipes.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F2C7A9]">
              <Snowflake className="w-4 h-4 text-[#EF4329]" />
              <span>{BRAND_CONFIG.tagline}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#FFF8EF]/70 hover:text-[#EF4329] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Our Drinks
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    type="button"
                    onClick={() => openQuickView(prod)}
                    className="text-left text-[#FFF8EF]/80 hover:text-[#EF4329] transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: prod.accentColor }}
                    />
                    <span>{prod.name} ({prod.size})</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#F2C7A9] block">
                Bottled with White & Black Seal Caps
              </span>
            </div>
          </div>

          {/* WhatsApp & Contact Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Ordering & WhatsApp
            </h4>

            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-extrabold shadow-md shadow-[#25D366]/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>

            <div className="space-y-2 text-xs text-[#FFF8EF]/80 pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#EF4329]" />
                <span>{BRAND_CONFIG.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EF4329]" />
                <span>{BRAND_CONFIG.pickupLocation}</span>
              </p>
            </div>

            {/* Social channels (configurable) */}
            <div className="pt-2 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#EF4329] text-[11px] font-bold text-[#FFF8EF] transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8EF]/60">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline flex items-center gap-1">
              Developed by <a href="https://devlync.unaux.com" target="_blank" className="text-[#FFF8EF]/70 hover:text-[#EF4329] transition-colors">Devlync</a>
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-[#FFF8EF]/80 hover:text-[#EF4329] p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
