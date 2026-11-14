import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Zap, Eye, Snowflake, Sparkles, Tag, Layers, Package, ShoppingCart } from 'lucide-react';
import { Product, PackagingOption } from '../types';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';
import { trackAddToCart, trackViewItem } from '../utils/analytics';

interface ProductCardProps {
  product: Product;
  initialType?: 'retail' | 'bulk';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, initialType }) => {
  const { addToCart, openCheckout, openQuickView } = useCart();

  const defaultOption =
    (initialType && product.packagingOptions.find((o) => o.type === initialType)) ||
    product.packagingOptions[0];

  const [selectedOption, setSelectedOption] = useState<PackagingOption>(defaultOption);
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState('1');
  const [isAdding, setIsAdding] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      const next = quantity - 1;
      setQuantity(next);
      setQuantityInput(String(next));
    }
  };

  const handleIncrease = () => {
    const next = quantity + 1;
    setQuantity(next);
    setQuantityInput(String(next));
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // digits only
    setQuantityInput(val);
    if (val !== '') {
      const parsed = parseInt(val, 10);
      if (parsed > 0) {
        setQuantity(Math.min(999, parsed));
      }
    }
  };

  const handleQuantityInputBlur = () => {
    if (!quantityInput || parseInt(quantityInput, 10) < 1) {
      setQuantity(1);
      setQuantityInput('1');
    } else {
      const parsed = Math.min(999, parseInt(quantityInput, 10));
      setQuantity(parsed);
      setQuantityInput(String(parsed));
    }
  };

  const handleAddToCart = () => {
    const finalQty = Math.max(1, quantity || 1);
    setIsAdding(true);
    addToCart(product, finalQty, selectedOption);
    trackAddToCart(product, finalQty, selectedOption);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    const finalQty = Math.max(1, quantity || 1);
    addToCart(product, finalQty, selectedOption);
    trackAddToCart(product, finalQty, selectedOption);
    openCheckout();
  };

  const handleOpenQuickView = () => {
    trackViewItem(product, selectedOption);
    openQuickView(product);
  };

  const isCousCous = product.id === 'lobbo-cous-cous';
  const perBottlePrice = selectedOption.price / selectedOption.bottlesCount;
  const isBulk = selectedOption.type === 'bulk';

  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-3xl border border-[#F2C7A9]/60 shadow-lg shadow-[#512719]/5 overflow-hidden card-hover-lift transition-all duration-300">
      {/* Product Image Stage */}
      <div className="relative bg-gradient-to-b from-[#191513] to-[#25201D] p-5 sm:p-6 flex items-center justify-center min-h-[300px] sm:min-h-[340px] overflow-hidden group">
        {/* Ambient Brand Glow */}
        <div
          className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${product.accentColor} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Labels / Badges - Non-overlapping Responsive Header */}
        <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-10 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto max-w-[70%]">
            <span
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: product.accentColor }}
            >
              {product.size}
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#FFF8EF]/90 text-[#512719] backdrop-blur-sm flex items-center gap-1 shadow-sm">
              <Snowflake className="w-3 h-3 text-[#EF4329]" />
              Chilled
            </span>
            {isBulk && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                Bulk
              </span>
            )}
          </div>

          <div className="pointer-events-auto shrink-0">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/20 backdrop-blur-md text-[#FFF8EF] border border-white/20">
              {product.capColor} Cap
            </span>
          </div>
        </div>

        {/* Bottle Photograph */}
        <div className="relative z-10 w-full h-64 sm:h-72 flex items-center justify-center mt-3 sm:mt-1">
          <img
            src={product.image}
            alt={`Lobbo ${product.name} (${product.size}) - ${product.bottleAppearance} home-brewed in Ghana`}
            className="h-full w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={300}
            height={380}
          />
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={handleOpenQuickView}
          className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8EF]/90 hover:bg-[#FFF8EF] text-[#512719] text-xs font-bold shadow-md opacity-90 hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#EF4329]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-5 sm:p-7 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Header & Subtitle & Price (Non-overlapping Flex Wrap) */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF4329]">
                  {isCousCous ? 'Signature Cream' : 'Textured Special'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5E9D9] text-[#512719]">
                  Retail & Bulk
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#512719] tracking-tight">
                {product.name}
              </h3>
            </div>

            {/* Price Box */}
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-[#512719]/60 font-semibold block">
                {selectedOption.bottlesCount === 1 ? 'Retail Price' : `${selectedOption.bottlesCount} Bottles Pack`}
              </span>
              <div className="flex items-baseline sm:justify-end gap-1.5">
                {selectedOption.savings && selectedOption.savings > 0 && (
                  <span className="text-xs text-[#512719]/40 line-through">
                    {formatCurrency(selectedOption.regularPrice)}
                  </span>
                )}
                <span className="font-heading font-black text-2xl text-[#EF4329]">
                  {formatCurrency(selectedOption.price)}
                </span>
              </div>
              {selectedOption.bottlesCount > 1 && (
                <span className="text-[10px] font-bold text-emerald-700 block">
                  ~{formatCurrency(perBottlePrice)} / bottle
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#512719]/80 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* PACKAGING / TIER SELECTOR: RETAIL vs BULK (2x2 Grid fits all screens cleanly) */}
          <div className="mb-5 p-3 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#512719] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#EF4329]" />
                Select Packaging:
              </span>
              {selectedOption.savings && selectedOption.savings > 0 && (
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  Save {formatCurrency(selectedOption.savings)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.packagingOptions.map((opt) => {
                const isSelected = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`relative p-2.5 rounded-xl text-center border transition-all text-xs font-bold flex flex-col items-center justify-center ${isSelected
                        ? 'bg-[#EF4329] text-white border-[#EF4329] shadow-sm'
                        : 'bg-white text-[#512719] border-[#F2C7A9]/80 hover:bg-[#F5E9D9]'
                      }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-1.5 right-1.5 px-1.5 py-0.2 text-[8px] font-black uppercase rounded-full bg-[#512719] text-[#FFF8EF] shadow-sm">
                        Popular
                      </span>
                    )}
                    <span className="leading-tight">{opt.shortName}</span>
                    <span className={`text-[10px] mt-0.5 font-bold ${isSelected ? 'text-white/90' : 'text-[#EF4329]'}`}>
                      {formatCurrency(opt.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 text-[11px] text-[#512719]/75 flex items-center justify-between flex-wrap gap-1">
              <span className="truncate">{selectedOption.name}</span>
              <span className="font-semibold text-[#512719] flex items-center gap-1 shrink-0">
                {selectedOption.type === 'bulk' ? (
                  <>
                    <Package className="w-3.5 h-3.5 text-[#EF4329]" />
                    <span>Bulk / Crate Tier</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5 text-[#EF4329]" />
                    <span>Retail Tier</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Appearance & Notes Pill */}
          <div className="p-2.5 rounded-xl bg-[#F5E9D9]/40 border border-[#F2C7A9]/50 mb-5">
            <p className="text-xs text-[#512719]/80 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EF4329] shrink-0" />
              <span className="truncate">{product.bottleAppearance}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4 pt-2 border-t border-[#F2C7A9]/40">
          {/* Quantity Selector & Item Subtotal */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-[#512719] block">
                Quantity ({selectedOption.shortName}):
              </span>
              <span className="text-[10px] text-[#512719]/60 block">

              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-[#FFF8EF] border border-[#F2C7A9] rounded-full p-1 shadow-sm focus-within:ring-2 focus-within:ring-[#EF4329]/40 focus-within:border-[#EF4329] transition-all">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9] transition-colors focus:outline-none disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantityInput}
                  onChange={handleQuantityInputChange}
                  onBlur={handleQuantityInputBlur}
                  className="w-10 sm:w-12 text-center font-bold text-xs sm:text-sm text-[#512719] bg-transparent focus:outline-none focus:bg-white rounded py-0.5 transition-colors"
                  aria-label={`Enter quantity of ${selectedOption.shortName}`}
                  title="Type quantity"
                />
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9] transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs font-bold text-[#512719]/80 whitespace-nowrap">
                = {formatCurrency(selectedOption.price * (quantity || 1))}
              </span>
            </div>
          </div>

          {/* Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm border transition-all duration-200 shadow-sm active:scale-95 ${isAdding
                  ? 'bg-[#512719] text-[#FFF8EF] border-[#512719]'
                  : 'bg-[#FFF8EF] hover:bg-[#F5E9D9] text-[#512719] border-[#F2C7A9] hover:border-[#EF4329]'
                }`}
              aria-label={`Add ${quantity} of ${product.name} (${selectedOption.name}) to cart`}
            >
              <ShoppingBag className="w-4 h-4 text-[#EF4329] shrink-0" />
              <span>{isAdding ? 'Added!' : 'Add to Cart'}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 py-3 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] shadow-md shadow-[#EF4329]/25 hover:shadow-lg transition-all duration-200 active:scale-95"
              aria-label={`Buy ${product.name} now`}
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
