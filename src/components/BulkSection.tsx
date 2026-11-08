import React from 'react';
import { Package, ShoppingCart, Users, Sparkles, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Building2, PartyPopper } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../data/brand';
import { formatCurrency } from '../utils/currency';
import { buildBulkInquiryUrl } from '../utils/whatsapp';

export const BulkSection: React.FC = () => {
  const bulkUseCases = [
    {
      icon: <PartyPopper className="w-6 h-6 text-[#EF4329]" />,
      title: 'Events & Celebrations',
      desc: 'Weddings, birthday parties, anniversaries, and family get-togethers. Chilled crates delivered right before your guests arrive.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#EF4329]" />,
      title: 'Corporate & Offices',
      desc: 'Weekly team refreshments, executive meetings, Friday wind-downs, and corporate gift hampers with genuine local flavor.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#EF4329]" />,
      title: 'Retailers & Stockists',
      desc: 'Cafés, neighborhood marts, and campus distributors. Enjoy reliable wholesale pricing with scheduled restock batches.',
    },
  ];

  return (
    <section id="bulk" className="py-20 md:py-28 bg-gradient-to-b from-[#FFF8EF] via-[#F5E9D9]/50 to-[#FFF8EF] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EF4329]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-80 h-80 bg-[#512719]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8EF] border border-[#F2C7A9] shadow-sm mb-4">
            <Package className="w-4 h-4 text-[#EF4329]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#512719]">
              Flexible Purchasing Options
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight mb-4">
            Retail Bottles & Bulk Crates
          </h2>

          <p className="text-base sm:text-lg text-[#512719]/80 font-normal leading-relaxed">
            Whether you want a single chilled bottle for yourself, a 6-pack for the weekend, or full wholesale crates for large events and stores, Lobbo has you covered.
          </p>
        </div>

        {/* 2 Main Channels: Retail vs Bulk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 1. Retail Channel */}
          <div className="bg-white rounded-3xl p-8 border border-[#F2C7A9]/80 shadow-lg shadow-[#512719]/5 flex flex-col justify-between card-hover-lift">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9] flex items-center justify-center text-[#EF4329]">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFF8EF] text-[#EF4329] border border-[#EF4329]/30">
                  Daily Refreshment
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-[#512719] mb-2">
                Retail Orders (1 – 6 Bottles)
              </h3>
              <p className="text-sm text-[#512719]/80 leading-relaxed mb-6">
                Satisfy your craving on demand. Order single bottles or 6-packs delivered ice-cold straight to your home, office, or school campus.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#512719]/85 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No minimum order requirement (order from 1 bottle)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bottled fresh, sealed with tamper-proof cap</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Save on 6-pack bundles (GH₵ 110 per 6-pack)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Convenient doorstep delivery or pickup</span>
                </li>
              </ul>
            </div>

            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-[#FFF8EF] hover:bg-[#F5E9D9] text-[#512719] border border-[#F2C7A9] hover:border-[#EF4329] transition-all"
            >
              <span>Shop Retail Bottles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Bulk & Wholesale Channel */}
          <div className="bg-gradient-to-br from-[#191513] to-[#2A2421] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between card-hover-lift relative overflow-hidden border-2 border-[#EF4329]">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#EF4329]">
                  <Package className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#EF4329] text-white shadow-md">
                  Save Up To GH₵ 60
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-[#FFF8EF] mb-2">
                Bulk & Wholesale Crates (12, 24 & 50+ Bottles)
              </h3>
              <p className="text-sm text-[#FFF8EF]/80 leading-relaxed mb-6">
                Specialized bulk pricing for wedding planners, parties, family celebrations, cafeterias, and shop stockists looking for high-demand artisanal beverages.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#FFF8EF]/90 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Substantial crate discounts (Full 12-bottle and 24-bottle crates)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Mix & Match: Custom proportions of Cous Cous & Bruks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Event schedule guarantee: packed with ice chill retention</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Wholesale delivery arrangements across Accra & Koforidua</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
              <a
                href={buildBulkInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-white shadow-lg shadow-[#EF4329]/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Custom Bulk Inquiry</span>
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-[#FFF8EF] border border-white/20 transition-all"
              >
                <span>Order Crates in Cart</span>
              </a>
            </div>
          </div>
        </div>

        {/* Transparent Pricing Matrix Table */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#F2C7A9]/80 shadow-md mb-14">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF4329] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EF4329]" />
                Transparent Pricing
              </span>
              <h3 className="font-heading font-black text-2xl text-[#512719]">
                Retail vs Bulk Pricing Guide
              </h3>
            </div>
            <span className="text-xs text-[#512719]/70 font-semibold bg-[#F5E9D9] px-3 py-1.5 rounded-full">
              Currency: Ghana Cedis ({BRAND_CONFIG.currencySymbol})
            </span>
          </div>

          <p className="text-[11px] text-[#512719]/60 sm:hidden mb-2">
            Scroll horizontally to view all packaging tiers &rarr;
          </p>

          <div className="overflow-x-auto -mx-1 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
              <thead>
                <tr className="border-b border-[#F2C7A9] text-[#512719] font-heading font-extrabold">
                  <th className="pb-3 px-3">Beverage</th>
                  <th className="pb-3 px-3">Single Bottle (Retail)</th>
                  <th className="pb-3 px-3">6-Pack (Bundle)</th>
                  <th className="pb-3 px-3">Full Crate (12 Bottles)</th>
                  <th className="pb-3 px-3">Event Crate (24 Bottles)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2C7A9]/40 text-[#512719]/85">
                {PRODUCTS.map((prod) => {
                  const single = prod.packagingOptions.find((o) => o.id === 'single');
                  const p6 = prod.packagingOptions.find((o) => o.id === 'pack-6');
                  const c12 = prod.packagingOptions.find((o) => o.id === 'crate-12');
                  const c24 = prod.packagingOptions.find((o) => o.id === 'crate-24');

                  return (
                    <tr key={prod.id} className="hover:bg-[#FFF8EF]/50 transition-colors">
                      <td className="py-4 px-3 font-bold text-[#512719] flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: prod.accentColor }}
                        />
                        <span>{prod.name} ({prod.size})</span>
                      </td>
                      <td className="py-4 px-3 font-extrabold text-[#512719]">
                        {single ? formatCurrency(single.price) : '-'}
                      </td>
                      <td className="py-4 px-3">
                        <div className="font-extrabold text-[#512719]">
                          {p6 ? formatCurrency(p6.price) : '-'}
                        </div>
                        {p6?.savings ? (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            Save {formatCurrency(p6.savings)}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-4 px-3 bg-[#F5E9D9]/30 rounded-xl">
                        <div className="font-black text-[#EF4329]">
                          {c12 ? formatCurrency(c12.price) : '-'}
                        </div>
                        {c12?.savings ? (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            Save {formatCurrency(c12.savings)} (~{formatCurrency(c12.price / 12)}/ea)
                          </span>
                        ) : null}
                      </td>
                      <td className="py-4 px-3">
                        <div className="font-black text-[#512719]">
                          {c24 ? formatCurrency(c24.price) : '-'}
                        </div>
                        {c24?.savings ? (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            Save {formatCurrency(c24.savings)} (~{formatCurrency(c24.price / 24)}/ea)
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Use-cases: Events, Corporate, Retailers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bulkUseCases.map((uc) => (
            <div
              key={uc.title}
              className="p-6 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/70 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#F2C7A9] flex items-center justify-center mb-4 shadow-sm">
                  {uc.icon}
                </div>
                <h4 className="font-heading font-extrabold text-lg text-[#512719] mb-2">
                  {uc.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#512719]/80 leading-relaxed">
                  {uc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F2C7A9]/40 flex items-center gap-1.5 text-xs font-bold text-[#EF4329]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Small-batch brewed freshness guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

