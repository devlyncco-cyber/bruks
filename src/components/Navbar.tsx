import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { BRAND_CONFIG } from '../data/brand';
import { LobboLogo } from './LobboLogo';

export const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Products', href: '#products' },
    { label: 'Bulk & Retail', href: '#bulk' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Lobbo', href: '#why-lobbo' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8EF]/95 backdrop-blur-md shadow-sm border-b border-[#F2C7A9]/40 py-2.5 sm:py-3.5'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Authentic Brand Bottle Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center group focus:outline-none transition-transform duration-200 hover:scale-[1.03]"
              aria-label="Lobbo Beverages Home"
            >
              <LobboLogo className="h-9 sm:h-12 md:h-13 w-auto" variant="color" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-[#512719] hover:text-[#EF4329] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#EF4329] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Quick Link (Desktop xl) */}
              <a
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-2 text-xs font-bold text-[#512719] bg-[#F5E9D9] hover:bg-[#F2C7A9]/60 px-3.5 py-2 rounded-full transition-all border border-[#F2C7A9]/60"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>+233 24 319 1039</span>
              </a>

              {/* Shopping Cart Button with Live Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 text-[#512719] hover:text-[#EF4329] bg-[#FFF8EF] hover:bg-[#F5E9D9] border border-[#F2C7A9]/70 rounded-full transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EF4329]/50"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#512719]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#EF4329] text-[#FFF8EF] text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Primary "Order Now" Button */}
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, '#products')}
                className="hidden sm:inline-flex items-center gap-2 bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#EF4329]/25 hover:shadow-lg hover:shadow-[#EF4329]/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#512719] hover:text-[#EF4329] bg-[#FFF8EF] border border-[#F2C7A9]/70 rounded-xl transition-colors focus:outline-none"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Safe Height & Scroll */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#191513]/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-16 sm:top-20 inset-x-3 sm:inset-x-4 max-h-[calc(100vh-5rem)] overflow-y-auto bg-[#FFF8EF] border border-[#F2C7A9] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-scaleUp">
            {/* Bottle Logo in mobile drawer header */}
            <div className="flex items-center justify-center pb-2 border-b border-[#F2C7A9]/40">
              <LobboLogo className="h-11 w-auto" variant="color" />
            </div>

            <div className="flex flex-col gap-1 border-b border-[#F2C7A9]/60 pb-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-[#512719] hover:bg-[#F5E9D9] hover:text-[#EF4329] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, '#products')}
                className="w-full flex items-center justify-center gap-2 bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] text-sm font-bold py-3 rounded-full shadow-md shadow-[#EF4329]/25 transition-colors"
              >
                <span>Order Drinks Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#F5E9D9] text-[#512719] hover:bg-[#F2C7A9] text-xs sm:text-sm font-bold py-2.5 sm:py-3 rounded-full border border-[#F2C7A9] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp (+233 24 319 1039)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
