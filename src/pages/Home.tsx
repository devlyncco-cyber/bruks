import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductSection } from '../components/ProductSection';
import { BulkSection } from '../components/BulkSection';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseLobbo } from '../components/WhyChooseLobbo';
import { PromoBanner } from '../components/PromoBanner';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutForm } from '../components/CheckoutForm';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { NotificationToast } from '../components/NotificationToast';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#512719] flex flex-col selection:bg-[#EF4329]/20 selection:text-[#EF4329]">
      {/* Sticky / Floating Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Product Catalogue */}
        <ProductSection />

        {/* Bulk Purchases & Retail Section */}
        <BulkSection />

        {/* About Lobbo Beverages */}
        <AboutSection />

        {/* Why Choose Lobbo? */}
        <WhyChooseLobbo />

        {/* Promotional / Call-to-Action Banner */}
        <PromoBanner />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & Orders Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Drawers */}
      <CartDrawer />
      <CheckoutForm />
      <ProductQuickViewModal />
      <FloatingCartButton />
      <NotificationToast />
    </div>
  );
};
