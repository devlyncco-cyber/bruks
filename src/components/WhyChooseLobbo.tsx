import React from 'react';
import { ChefHat, Sparkles, Package, Flame, Snowflake, CheckCircle } from 'lucide-react';

export const WhyChooseLobbo: React.FC = () => {
  const sellingPoints = [
    {
      step: '01',
      icon: <ChefHat className="w-6 h-6 text-[#EF4329]" />,
      title: 'Home-Brewed Goodness',
      description:
        'Crafted with genuine passion in artisanal batches, preserving the rich, wholesome essence of traditional home-brewed beverages.',
    },
    {
      step: '02',
      icon: <Sparkles className="w-6 h-6 text-[#EF4329]" />,
      title: 'Distinctive Beverage Flavours',
      description:
        'From the ultra-smooth Cous Cous to the textured, spiced character of Bruks, our profiles are uniquely recognizable and unforgettable.',
    },
    {
      step: '03',
      icon: <Package className="w-6 h-6 text-[#EF4329]" />,
      title: 'Convenient Bottle Packaging',
      description:
        'Sealed in ergonomic 250ml and 300ml bottles designed for quick chilling, easy portability, and spill-free enjoyment on the move.',
    },
    {
      step: '04',
      icon: <Flame className="w-6 h-6 text-[#EF4329]" />,
      title: 'Refreshing Taste',
      description:
        'Formulated to quench your thirst and invigorate your day, providing instant gratification whenever you need a lift.',
    },
    {
      step: '05',
      icon: <Snowflake className="w-6 h-6 text-[#EF4329]" />,
      title: 'Best Served Chilled',
      description:
        'Designed to be experienced cold. Keep in your refrigerator or icebox for an explosion of crisp, full-bodied refreshment.',
    },
  ];

  return (
    <section id="why-lobbo" className="py-20 md:py-28 bg-[#FFF8EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E9D9] border border-[#F2C7A9] shadow-sm mb-4">
            <CheckCircle className="w-4 h-4 text-[#EF4329]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#512719]">
              The Lobbo Difference
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#512719] tracking-tight mb-4">
            Why Choose Lobbo?
          </h2>

          <p className="text-base sm:text-lg text-[#512719]/80 font-normal leading-relaxed">
            Every bottle reflects our commitment to uncompromised flavour, authentic home brewing, and peak chilled satisfaction.
          </p>
        </div>

        {/* 5 Selling Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sellingPoints.map((point, index) => {
            const isLast = index === sellingPoints.length - 1;
            return (
              <div
                key={point.title}
                className={`bg-[#FFFFFF] border border-[#F2C7A9]/70 rounded-3xl p-7 shadow-md shadow-[#512719]/5 card-hover-lift flex flex-col justify-between relative overflow-hidden group ${
                  isLast ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-white via-white to-[#F5E9D9]/40' : ''
                }`}
              >
                {/* Step Watermark */}
                <span className="absolute top-4 right-5 text-4xl font-black font-heading text-[#F2C7A9]/40 select-none group-hover:text-[#EF4329]/20 transition-colors">
                  {point.step}
                </span>

                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#EF4329] group-hover:text-white transition-colors duration-300">
                    <div className="group-hover:text-white transition-colors">
                      {point.icon}
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[#512719] mb-3 group-hover:text-[#EF4329] transition-colors">
                    {point.title}
                  </h3>

                  <p className="text-sm text-[#512719]/80 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2C7A9]/40 flex items-center gap-2 text-xs font-bold text-[#EF4329]">
                  <span>Premium Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4329]" />
                  <span className="text-[#512719]/70 font-semibold">Serve Chilled</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

