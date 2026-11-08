import React from 'react';
import { Award, Droplets, Smile, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const AboutSection: React.FC = () => {
  const brandValues = [
    {
      icon: <Award className="w-5 h-5 text-[#EF4329]" />,
      title: 'Distinctive Quality',
      description:
        'Every recipe is carefully balanced to offer a signature mouthfeel and taste that stands out.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#EF4329]" />,
      title: 'Small-Batch Freshness',
      description:
        'Brewed fresh with continuous attention to flavour integrity and temperature control.',
    },
    {
      icon: <Smile className="w-5 h-5 text-[#EF4329]" />,
      title: 'Customer Satisfaction',
      description:
        'Fast and dependable WhatsApp ordering with prompt delivery across our service zones.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#EF4329]" />,
      title: 'Authentic Craft',
      description:
        'Rooted in home-brewing passion, dedicated to turning everyday moments into refreshing experiences.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5E9D9]/50 relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#F2C7A9]/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#EF4329]/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side: Side-by-side Bottles in Framed Composition */}
          <div className="lg:col-span-6 relative pb-4 sm:pb-6 lg:pb-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card Frame */}
              <div className="bg-[#191513] rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-[#FFF8EF] relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 bg-[radial-gradient(#EF4329_1px,transparent_1px)] [background-size:16px_16px]"
                  aria-hidden="true"
                />

                {/* Two bottles side by side */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10 items-end justify-center py-4">
                  {/* Cous Cous */}
                  <div className="flex flex-col items-center">
                    <div className="h-56 sm:h-72 flex items-center justify-center">
                      <img
                        src={PRODUCTS[0].image}
                        alt="Lobbo Cous Cous"
                        className="max-h-full w-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-black uppercase text-[#EF4329] tracking-wider text-center">
                      Cous Cous (250ml)
                    </span>
                  </div>

                  {/* Bruks */}
                  <div className="flex flex-col items-center">
                    <div className="h-56 sm:h-72 flex items-center justify-center">
                      <img
                        src={PRODUCTS[1].image}
                        alt="Lobbo Bruks"
                        className="max-h-full w-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-black uppercase text-[#F2C7A9] tracking-wider text-center">
                      Bruks (300ml)
                    </span>
                  </div>
                </div>

                {/* Bottom Card Ribbon */}
                <div className="mt-3 sm:mt-4 pt-3 border-t border-white/10 text-center">
                  <p className="text-[11px] sm:text-xs font-bold text-[#FFF8EF] uppercase tracking-widest">
                    Crafted in Ghana • Enjoy Chilled
                  </p>
                </div>
              </div>

              {/* Experience Badge - Responsive non-overlapping positioning */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-6 bg-[#FFF8EF] border border-[#F2C7A9] rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EF4329] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#EF4329]/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#512719]">Home-Brewed Perfection</p>
                  <p className="text-[11px] text-[#512719]/70">Signature recipes, authentic taste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EF] border border-[#F2C7A9] shadow-sm mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF4329]">
                About Lobbo Beverages
              </span>
            </div>

            {/* Heading specified in prompt */}
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight leading-tight mb-6">
              More Than a Drink.{' '}
              <span className="text-[#EF4329]">It's the Lobbo Experience.</span>
            </h2>

            {/* Exact Content from prompt */}
            <p className="text-base sm:text-lg text-[#512719]/85 font-normal leading-relaxed mb-6">
              Lobbo Beverages is dedicated to bringing refreshing home-brewed beverages to customers who
              appreciate distinctive taste and quality. Our drinks are crafted to make everyday moments more
              refreshing.
            </p>

            <p className="text-sm sm:text-base text-[#512719]/75 leading-relaxed mb-8">
              Whether you are reaching for the smooth, creamy delight of <strong>Lobbo Cous Cous</strong> or the rich, textured character of <strong>Lobbo Bruks</strong>, our beverages are brewed in carefully supervised small batches to guarantee freshness in every chilled sip.
            </p>

            {/* Brand Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {brandValues.map((val) => (
                <div
                  key={val.title}
                  className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/60 shadow-sm flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-[#F5E9D9] shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#512719] mb-1">{val.title}</h3>
                    <p className="text-xs text-[#512719]/75 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="flex flex-col sm:flex-row gap-4 text-xs font-bold text-[#512719]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF4329]" />
                <span>100% Home-Brewed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF4329]" />
                <span>No Artificial Imitations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EF4329]" />
                <span>Serve Chilled Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

