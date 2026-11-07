import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Zap, Eye, Snowflake, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openCheckout, openQuickView } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    openCheckout();
  };

  const isCousCous = product.id === 'lobbo-cous-cous';

  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-3xl border border-[#F2C7A9]/60 shadow-lg shadow-[#512719]/5 overflow-hidden card-hover-lift transition-all duration-300">
      {/* Product Image Stage */}
      <div className="relative bg-gradient-to-b from-[#191513] to-[#25201D] p-6 flex items-center justify-center min-h-[340px] overflow-hidden group">
        {/* Ambient Brand Glow */}
        <div
          className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${product.accentColor} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Labels / Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: product.accentColor }}
          >
            {product.size}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFF8EF]/90 text-[#512719] backdrop-blur-sm flex items-center gap-1 shadow-sm">
            <Snowflake className="w-3 h-3 text-[#EF4329]" />
            Chilled
          </span>
        </div>

        {/* Cap Color Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-[#FFF8EF] border border-white/20">
            {product.capColor} Cap
          </span>
        </div>

        {/* Bottle Photograph */}
        <div className="relative z-10 w-full h-72 flex items-center justify-center">
          <img
            src={product.image}
            alt={`${product.name} - ${product.bottleAppearance}`}
            className="h-full w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Quick View Button overlay on hover */}
        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8EF]/90 hover:bg-[#FFF8EF] text-[#512719] text-xs font-bold shadow-md opacity-90 hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#EF4329]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Header & Subtitle */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF4329]">
                {isCousCous ? 'Signature Cream' : 'Textured Special'}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#512719] tracking-tight">
                {product.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#512719]/60 font-semibold block">Price</span>
              <span className="font-heading font-black text-2xl text-[#EF4329]">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#512719]/80 leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>

          {/* Appearance & Notes Pill */}
          <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#F2C7A9]/60 mb-6">
            <p className="text-xs font-bold text-[#512719] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#EF4329]" />
              <span>Appearance & Character:</span>
            </p>
            <p className="text-xs text-[#512719]/80 font-medium">
              {product.bottleAppearance}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4 pt-2 border-t border-[#F2C7A9]/40">
          {/* Quantity Selector & Item Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#512719]">Quantity:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#FFF8EF] border border-[#F2C7A9] rounded-full p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9] transition-colors focus:outline-none disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-bold text-sm text-[#512719]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9] transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs font-bold text-[#512719]/70">
                = {formatCurrency(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-xs sm:text-sm border transition-all duration-200 shadow-sm active:scale-95 ${
                isAdding
                  ? 'bg-[#512719] text-[#FFF8EF] border-[#512719]'
                  : 'bg-[#FFF8EF] hover:bg-[#F5E9D9] text-[#512719] border-[#F2C7A9] hover:border-[#EF4329]'
              }`}
              aria-label={`Add ${quantity} of ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4 text-[#EF4329]" />
              <span>{isAdding ? 'Added!' : 'Add to Cart'}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full font-bold text-xs sm:text-sm bg-[#EF4329] hover:bg-[#D4341C] text-[#FFF8EF] shadow-md shadow-[#EF4329]/25 hover:shadow-lg transition-all duration-200 active:scale-95"
              aria-label={`Buy ${product.name} now`}
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

