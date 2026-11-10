import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What beverages does Lobbo Beverages produce in Ghana?',
    answer:
      'Lobbo Beverages crafts two signature home-brewed beverages: Lobbo Cous Cous (a smooth, creamy off-white drink with a white cap seal) and Lobbo Bruks (a rich, artisanal beverage with a distinctive textured spiced character and black cap seal). Both drinks are packaged in 350ml bottles and crafted for refreshing moments.',
  },
  {
    question: 'How much do Lobbo Cous Cous and Lobbo Bruks cost?',
    answer:
      'Both signature drinks are priced at GH₵ 20.00 for a single 350ml retail bottle. We also provide cost-saving crate bundles: a 6-Bottle Pack for GH₵ 110.00 (Save GH₵ 10), a Full 12-Bottle Crate for GH₵ 215.00 (Save GH₵ 25), and a 24-Bottle Event Crate for GH₵ 420.00 (Save GH₵ 60).',
  },
  {
    question: 'How do I place an order for delivery or pickup?',
    answer:
      'Ordering is fast and convenient: choose your retail bottles or crates directly on our website, click "Proceed to WhatsApp Checkout", and provide your name, phone number, and location. Your order details are automatically transferred to our WhatsApp ordering desk (+233 24 319 1039) where our team confirms your order.',
  },
  {
    question: 'How is the delivery fee calculated in Ghana?',
    answer:
      'To provide the fairest delivery rates, we do not add a generic automated fee. Instead, you state your delivery location (e.g. East Legon, Spintex, Tema, Kumasi, or surrounding areas) and our team provides your exact delivery bill on WhatsApp before dispatch. Free pickup is also available in Accra / Koforidua.',
  },
  {
    question: 'Can I order Lobbo drinks in bulk for weddings, corporate meetings, and events?',
    answer:
      'Yes! We specialize in event catering and bulk crate supply for weddings, family gatherings, office refreshments, and local retailers. You can choose full 12-bottle crates or 24-bottle event crates with custom proportions of Cous Cous and Bruks, packed ice-cold for maximum chill retention.',
  },
  {
    question: 'What is the recommended storage and serving temperature?',
    answer:
      'Lobbo beverages are home-brewed without unnecessary artificial additives and must be strictly kept chilled below 5°C. For the best flavour, store them in your refrigerator or icebox and serve ice-cold.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FFF8EF] relative overflow-hidden">
      {/* Decorative Glow */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 bg-[#EF4329]/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E9D9] border border-[#F2C7A9] shadow-sm mb-4">
            <HelpCircle className="w-4 h-4 text-[#EF4329]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#512719]">
              Got Questions?
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[#512719]/80 font-normal leading-relaxed">
            Everything you need to know about ordering Lobbo beverages, crate pricing, delivery in Ghana, and enjoying our home-brewed drinks.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white border border-[#F2C7A9]/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4329]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-extrabold text-base sm:text-lg text-[#512719] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#EF4329] text-white rotate-180' : 'bg-[#FFF8EF] text-[#512719] border border-[#F2C7A9]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#512719]/85 leading-relaxed border-t border-[#F2C7A9]/40 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#F5E9D9]/70 border border-[#F2C7A9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#512719]">
              Still have a question about Lobbo?
            </h3>
            <p className="text-xs sm:text-sm text-[#512719]/75 mt-0.5">
              Chat directly with our team on WhatsApp for quick assistance.
            </p>
          </div>

          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EF4329] hover:bg-[#D4341C] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

