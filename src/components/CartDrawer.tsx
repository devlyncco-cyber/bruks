import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Store, Snowflake, MapPin, Package } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    totalBottles,
    fulfilmentType,
    setFulfilmentType,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#191513]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFF8EF] border-l border-[#F2C7A9] shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#F2C7A9]/60 flex items-center justify-between bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EF4329] text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-black text-base sm:text-lg text-[#512719] leading-tight truncate">
                  Your Refreshment Cart
                </h3>
                <span className="text-xs font-bold text-[#EF4329]">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} • {totalBottles} bottles total
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-[#512719]/60 hover:text-[#EF4329] px-2 py-1 transition-colors"
                  title="Clear all items from cart"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[#F5E9D9] text-[#512719] transition-colors focus:outline-none"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-[#F5E9D9] border-2 border-dashed border-[#F2C7A9] flex items-center justify-center text-[#512719]/50 mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#EF4329]/60" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#512719] mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs sm:text-sm text-[#512719]/70 max-w-xs mb-6">
                  Ready to refresh your day? Choose from our handcrafted Lobbo Cous Cous or Lobbo Bruks in retail bottles or bulk crates.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EF4329] hover:bg-[#D4341C] text-white font-bold text-xs shadow-md shadow-[#EF4329]/20 transition-all"
                >
                  <span>Explore Drinks & Crates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              items.map((item) => {
                const opt = item.selectedOption || item.product.packagingOptions[0];
                const unitPrice = opt.price;
                const lineTotal = unitPrice * item.quantity;
                const isBulk = opt.type === 'bulk';

                return (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 rounded-2xl bg-white border border-[#F2C7A9]/70 shadow-sm flex gap-3 sm:gap-4 items-center"
                  >
                    {/* Bottle thumbnail */}
                    <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl bg-[#191513] p-1.5 flex items-center justify-center shrink-0 border border-black/10 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full w-auto object-contain"
                      />
                      {isBulk && (
                        <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#EF4329] text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                          <Package className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {/* Meta & quantity controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="min-w-0">
                          <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#512719] truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] font-bold text-[#EF4329] block truncate">
                            {opt.name}
                          </span>
                          <span className="text-[10px] text-[#512719]/60 font-semibold block">
                            {opt.bottlesCount * item.quantity} bottles total ({item.product.size} each)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#512719]/40 hover:text-red-500 p-1 transition-colors shrink-0"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
                        {/* Quantity selector */}
                        <div className="flex items-center bg-[#FFF8EF] border border-[#F2C7A9] rounded-full p-0.5 focus-within:ring-1 focus-within:ring-[#EF4329]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val) {
                                const parsed = Math.min(999, Math.max(1, parseInt(val, 10)));
                                updateQuantity(item.id, parsed);
                              }
                            }}
                            className="w-7 text-center font-bold text-xs text-[#512719] bg-transparent focus:outline-none focus:bg-white rounded py-0.5"
                            aria-label={`Quantity of ${item.product.name}`}
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#512719] hover:bg-[#F5E9D9]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <span className="font-heading font-extrabold text-xs sm:text-sm text-[#512719]">
                            {formatCurrency(lineTotal)}
                          </span>
                          <span className="block text-[10px] text-[#512719]/60">
                            {formatCurrency(unitPrice)} each
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#F2C7A9]/80 space-y-3.5 sm:space-y-4 shadow-lg">
              {/* Fulfilment Selector */}
              <div>
                <span className="block text-xs font-bold text-[#512719] mb-1.5">
                  Fulfilment Method
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfilmentType('delivery')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      fulfilmentType === 'delivery'
                        ? 'bg-[#EF4329] text-white border-[#EF4329] shadow-sm'
                        : 'bg-[#FFF8EF] text-[#512719] border-[#F2C7A9]'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfilmentType('pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      fulfilmentType === 'pickup'
                        ? 'bg-[#512719] text-white border-[#512719] shadow-sm'
                        : 'bg-[#FFF8EF] text-[#512719] border-[#F2C7A9]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Pickup (Free)</span>
                  </button>
                </div>
              </div>

              {/* Order breakdown */}
              <div className="space-y-2 text-xs text-[#512719]/80 pt-2 border-t border-[#F2C7A9]/40">
                <div className="flex justify-between items-center">
                  <span>
                    Drinks Subtotal ({totalBottles} {totalBottles === 1 ? 'bottle' : 'bottles'})
                  </span>
                  <span className="font-bold text-[#512719]">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  {fulfilmentType === 'delivery' ? (
                    <span className="font-bold text-[#EF4329] bg-[#FFF8EF] px-2 py-0.5 rounded-md border border-[#F2C7A9] text-[11px]">
                      Calculated on WhatsApp
                    </span>
                  ) : (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                      GH₵ 0.00 (Free Pickup)
                    </span>
                  )}
                </div>

                {fulfilmentType === 'delivery' && (
                  <div className="p-2.5 rounded-xl bg-[#FFF8EF] border border-[#F2C7A9]/70 text-[11px] text-[#512719]/85 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#EF4329] shrink-0 mt-0.5" />
                    <span>State your location at checkout; the seller will confirm your delivery fee directly on WhatsApp.</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline text-base font-black font-heading text-[#512719] pt-2 border-t border-[#F2C7A9]/60">
                  <div>
                    <span>Total</span>
                    {fulfilmentType === 'delivery' && (
                      <span className="block text-[10px] font-normal text-[#512719]/70">
                        + delivery fee confirmed on WhatsApp
                      </span>
                    )}
                  </div>
                  <span className="text-[#EF4329]">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              {/* Chilled Notice */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#512719]/70 bg-[#FFF8EF] p-2 rounded-xl border border-[#F2C7A9]/60">
                <Snowflake className="w-3.5 h-3.5 text-[#EF4329]" />
                <span>Retail bottles & bulk crates are packed ice-cold</span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={openCheckout}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-white shadow-lg shadow-[#EF4329]/25 hover:shadow-xl transition-all duration-200 active:scale-98"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
