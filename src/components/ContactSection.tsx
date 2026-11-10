import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';
import { trackEvent } from '../utils/analytics';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    // Build contact message for WhatsApp
    const text =
      `Hello Lobbo Beverages!\n\n` +
      `CUSTOMER INQUIRY\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    trackEvent('contact_inquiry', {
      subject: formData.subject,
      method: 'whatsapp',
    });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5E9D9]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8EF] border border-[#F2C7A9] shadow-sm mb-4">
            <MessageCircle className="w-4 h-4 text-[#EF4329]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#512719]">
              Get In Touch
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight mb-4">
            Connect With Lobbo
          </h2>

          <p className="text-base sm:text-lg text-[#512719]/80 font-normal leading-relaxed">
            Have questions about bulk orders, event catering, or want to order directly? We are always ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 max-w-5xl mx-auto items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white border border-[#F2C7A9]/80 rounded-3xl p-5 sm:p-8 shadow-lg shadow-[#512719]/5 space-y-5 sm:space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF4329]">
                Direct Lines
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#512719] mt-1 mb-2">
                Order & Support
              </h3>
              <p className="text-sm text-[#512719]/80 leading-relaxed">
                Connect directly with our brew team for instant order status or custom requests.
              </p>
            </div>

            {/* Direct WhatsApp Pill Card */}
            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#EBF9F1] border border-[#25D366]/30 hover:border-[#25D366] transition-all group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/20">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#128C7E] uppercase tracking-wider block">
                  Fastest Response
                </span>
                <p className="text-base font-extrabold text-[#191513] truncate">WhatsApp Ordering</p>
                <p className="text-xs text-[#191513]/70 font-semibold">{BRAND_CONFIG.displayPhone}</p>
              </div>
            </a>

            {/* Phone numbers */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/60">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F5E9D9] text-[#512719] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#EF4329]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#EF4329] uppercase tracking-wider block">
                  Call Line
                </span>
                <p className="text-sm font-bold text-[#512719] truncate">{BRAND_CONFIG.displayPhone}</p>
                {BRAND_CONFIG.displayPhoneAlt && (
                  <p className="text-sm font-bold text-[#512719] truncate">{BRAND_CONFIG.displayPhoneAlt}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/60">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F5E9D9] text-[#512719] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#EF4329]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#EF4329] uppercase tracking-wider block">
                  Operating Location
                </span>
                <p className="text-sm font-bold text-[#512719]">{BRAND_CONFIG.pickupLocation}</p>
                <p className="text-xs text-[#512719]/70">Delivery & Pickups available across Ghana</p>
              </div>
            </div>
          </div>

          {/* Contact & Inquiries Form */}
          <div className="lg:col-span-7 bg-white border border-[#F2C7A9]/80 rounded-3xl p-5 sm:p-8 shadow-lg shadow-[#512719]/5">
            <h3 className="font-heading font-extrabold text-2xl text-[#512719] mb-2">
              Send an Instant Inquiry
            </h3>
            <p className="text-sm text-[#512719]/75 mb-6">
              Fill in the form below and it will seamlessly generate a direct WhatsApp message to our team.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#EBF9F1] border border-[#25D366]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#191513]">Message Ready!</h4>
                <p className="text-xs text-[#191513]/80 max-w-sm mx-auto">
                  Your message has been transferred to WhatsApp. If the app did not open automatically, you can message us directly at{' '}
                  <strong>{BRAND_CONFIG.displayPhone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#EF4329] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#512719] mb-1.5">
                      Your Full Name <span className="text-[#EF4329]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8EF] border border-[#F2C7A9] text-[#512719] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4329] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#512719] mb-1.5">
                      Phone Number <span className="text-[#EF4329]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 024 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8EF] border border-[#F2C7A9] text-[#512719] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4329] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#512719] mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8EF] border border-[#F2C7A9] text-[#512719] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4329] transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Event Catering & Bulk Orders">Event Catering & Bulk Orders</option>
                    <option value="Retail & Stockist Inquiry">Retail & Stockist Inquiry</option>
                    <option value="Feedback on Taste">Feedback on Taste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#512719] mb-1.5">
                    Your Message <span className="text-[#EF4329]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how many bottles you need or ask any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8EF] border border-[#F2C7A9] text-[#512719] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4329] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#EF4329] hover:bg-[#D4341C] text-white font-bold text-sm py-4 rounded-full shadow-lg shadow-[#EF4329]/25 hover:shadow-xl transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

