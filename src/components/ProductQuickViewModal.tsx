import React, { useState, useEffect } from 'react';
import { X, Snowflake, Sparkles, ShoppingBag, Zap, Minus, Plus, Check, Tag, Layers } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';
import { PackagingOption } from '../types';

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openCheckout } = useCart();
  const [selectedOption, setSelectedOption] = useState<PackagingOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedOption(quickViewProduct.packagingOptions[0]);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedOption) return null;

  const product = quickViewProduct;
  const perBottlePrice = selectedOption.price / selectedOption.bottlesCount;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedOption);
    closeQuickView();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#191513]/60 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Card */}
      <div className="relative bg-[#FFF8EF] border border-[#F2C7A9] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F5E9D9] hover:bg-[#F2C7A9] text-[#512719] transition-colors focus:outline-none"
          aria-label="Close product details modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Product Image Stage */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#191513] to-[#25201D] rounded-2xl p-6 flex items-center justify-center min-h-[300px] relative overflow-hidden border border-[#512719]/20">
            {/* Ambient Glow */}
            <div
              className="absolute inset-0 opacity-40 blur-xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${product.accentColor} 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 max-h-72 w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Product Details */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase text-white"
                  style={{ backgroundColor: product.accentColor }}
                >
                  {product.size}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5E9D9] text-[#512719] border border-[#F2C7A9]">
                  {product.capColor} Cap
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF8EF] text-[#EF4329] border border-[#EF4329]/30 flex items-center gap-1">
                  <Snowflake className="w-3 h-3" />
                  Serve Chilled
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Retail & Bulk
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#512719] mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-semibold text-[#EF4329] mb-3">
                {product.subtitle || 'Signature Home-Brewed Beverage'}
              </p>

              {/* Price display with savings */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-heading font-black text-3xl text-[#512719]">
                  {formatCurrency(selectedOption.price)}
                </span>
                {selectedOption.savings && selectedOption.savings > 0 && (
                  <>
                    <span className="text-sm text-[#512719]/40 line-through">
                      {formatCurrency(selectedOption.regularPrice)}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Save {formatCurrency(selectedOption.savings)}
                    </span>
                  </>
                )}
                {selectedOption.bottlesCount > 1 && (
                  <span className="text-xs text-[#512719]/70 font-semibold">
                    (~{formatCurrency(perBottlePrice)} / bottle)
                  </span>
                )}
              </div>

              {/* Packaging selector inside modal */}
              <div className="mb-4 p-3 bg-white rounded-2xl border border-[#F2C7A9]/70 shadow-sm">
                <span className="text-xs font-bold text-[#512719] flex items-center gap-1.5 mb-2">
                  <Layers className="w-3.5 h-3.5 text-[#EF4329]" />
                  Choose Packaging (Retail or Bulk Crate):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {product.packagingOptions.map((opt) => {
                    const isSel = selectedOption.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                          isSel
                            ? 'bg-[#EF4329] text-white border-[#EF4329] shadow-sm'
                            : 'bg-[#FFF8EF] text-[#512719] border-[#F2C7A9] hover:bg-[#F5E9D9]'
                        }`}
                      >
                        <div>{opt.shortName}</div>
                        <div className={`text-[10px] mt-0.5 ${isSel ? 'text-white' : 'text-[#EF4329]'}`}>
                          {formatCurrency(opt.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#512719]/85 leading-relaxed mb-4">
                {product.longDescription || product.description}
              </p>

              {/* Taste notes */}
              {product.tasteNotes && (
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#512719] block mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EF4329]" />
                    Tasting Profile
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tasteNotes.map((note) => (
                      <span
                        key={note}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F5E9D9] text-[#512719] border border-[#F2C7A9]/60"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="pt-4 border-t border-[#F2C7A9]/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#512719]">
                  Quantity ({selectedOption.shortName}):
                </span>
                <div className="flex items-center bg-white border border-[#F2C7A9] rounded-full p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9] disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#512719]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-sm bg-white hover:bg-[#F5E9D9] text-[#512719] border border-[#F2C7A9] hover:border-[#EF4329] transition-all shadow-sm"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#EF4329]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-white shadow-md shadow-[#EF4329]/25 hover:shadow-lg transition-all"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
