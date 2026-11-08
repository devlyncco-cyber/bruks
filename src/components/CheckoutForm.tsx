import React, { useState } from 'react';
import { X, MessageCircle, Truck, Store, AlertCircle, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../hooks/useCart';
import { BRAND_CONFIG } from '../data/brand';
import { formatCurrency } from '../utils/currency';
import { buildWhatsAppMessage, getWhatsAppOrderUrl } from '../utils/whatsapp';
import { OrderConfirmationModal } from './OrderConfirmationModal';

export const CheckoutForm: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    deliveryFee,
    grandTotal,
    fulfilmentType,
    setFulfilmentType,
    openCart,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [confirmationData, setConfirmationData] = useState<{
    orderText: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isCheckoutOpen && !confirmationData) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Please enter your phone number.';
    } else if (phoneNumber.replace(/\D/g, '').length < 9) {
      errs.phoneNumber = 'Please enter a valid phone number (at least 9 digits).';
    }

    if (fulfilmentType === 'delivery' && !deliveryAddress.trim()) {
      errs.deliveryAddress = 'Please state your delivery location so the seller can calculate your delivery fee.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty. Please add drinks to proceed.');
      return;
    }

    if (!validate()) {
      return;
    }

    const orderParams = {
      customer: {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        fulfilmentType,
        deliveryAddress: fulfilmentType === 'delivery' ? deliveryAddress.trim() : undefined,
        orderNotes: orderNotes.trim() || undefined,
      },
      items,
      subtotal,
      deliveryFee,
      grandTotal,
    };

    const message = buildWhatsAppMessage(orderParams);
    const url = getWhatsAppOrderUrl(orderParams);

    // Celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4329', '#F2C7A9', '#512719', '#25D366'],
      });
    } catch {
      // Ignore if canvas-confetti is not available
    }

    // Open WhatsApp in new window
    window.open(url, '_blank');

    // Show Confirmation modal
    setConfirmationData({
      orderText: message,
      whatsappUrl: url,
    });
  };

  const isDelivery = fulfilmentType === 'delivery';

  return (
    <>
      {confirmationData && (
        <OrderConfirmationModal
          isOpen={true}
          onClose={() => {
            setConfirmationData(null);
            closeCheckout();
          }}
          orderText={confirmationData.orderText}
          whatsappUrl={confirmationData.whatsappUrl}
        />
      )}

      {isCheckoutOpen && !confirmationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#191513]/60 backdrop-blur-sm transition-opacity"
            onClick={closeCheckout}
          />

          {/* Modal Card */}
          <div className="relative bg-[#FFF8EF] border border-[#F2C7A9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F2C7A9]/60 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-[#512719]">
                    WhatsApp Checkout
                  </h3>
                  <span className="text-xs font-semibold text-[#EF4329]">
                    Direct order to {BRAND_CONFIG.displayPhone}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCheckout}
                className="p-2 rounded-full hover:bg-[#F5E9D9] text-[#512719] transition-colors focus:outline-none"
                aria-label="Close checkout form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Order Items Preview */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#F2C7A9]/70 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#512719] flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#EF4329]" />
                  Your Order ({items.length} items)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    openCart();
                  }}
                  className="text-xs font-bold text-[#EF4329] hover:underline"
                >
                  Edit Cart
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#512719]/80 divide-y divide-[#F2C7A9]/30">
                {items.map((item) => {
                  const opt = item.selectedOption || item.product.packagingOptions[0];
                  const lineTotal = opt.price * item.quantity;
                  return (
                    <div key={item.id} className="pt-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[#512719]">
                          {item.quantity}× {item.product.name}
                        </span>
                        <span className="block text-[11px] text-[#EF4329]">
                          {opt.name} • {opt.bottlesCount * item.quantity} bottles total
                        </span>
                      </div>
                      <span className="font-bold text-[#512719]">
                        {formatCurrency(lineTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Fee Notice in Box */}
              <div className="mt-3 pt-2.5 border-t border-[#F2C7A9]/60 flex justify-between items-center text-xs">
                <span className="text-[#512719]/80 font-medium">Delivery Fee:</span>
                {isDelivery ? (
                  <span className="font-bold text-[#EF4329] bg-[#FFF8EF] px-2 py-0.5 rounded border border-[#F2C7A9]">
                    Calculated by seller on WhatsApp
                  </span>
                ) : (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    GH₵ 0.00 (Pickup)
                  </span>
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-[#F2C7A9]/60 flex justify-between items-baseline font-heading font-black text-base text-[#512719]">
                <div>
                  <span>Drinks Total:</span>
                  {isDelivery && (
                    <span className="block text-[10px] font-normal text-[#512719]/70 font-sans">
                      + delivery fee confirmed on WhatsApp
                    </span>
                  )}
                </div>
                <span className="text-[#EF4329]">{formatCurrency(subtotal)}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#512719] mb-1">
                  Full Name <span className="text-[#EF4329]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ama Asante"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#512719] focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-[#F2C7A9] focus:ring-[#EF4329]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#512719] mb-1">
                  WhatsApp / Phone Number <span className="text-[#EF4329]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 024 319 1039"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#512719] focus:outline-none focus:ring-2 transition-all ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-[#F2C7A9] focus:ring-[#EF4329]'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>

              {/* Fulfilment Type */}
              <div>
                <label className="block text-xs font-bold text-[#512719] mb-1.5">
                  Fulfilment Type <span className="text-[#EF4329]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFulfilmentType('delivery');
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold border transition-all ${
                      fulfilmentType === 'delivery'
                        ? 'bg-[#EF4329] text-white border-[#EF4329] shadow-sm'
                        : 'bg-white text-[#512719] border-[#F2C7A9]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Delivery (Fee on WhatsApp)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFulfilmentType('pickup');
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold border transition-all ${
                      fulfilmentType === 'pickup'
                        ? 'bg-[#512719] text-white border-[#512719] shadow-sm'
                        : 'bg-white text-[#512719] border-[#F2C7A9]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Pickup (Free)</span>
                  </button>
                </div>
              </div>

              {/* Delivery Location / Address (only if delivery) */}
              {isDelivery && (
                <div className="animate-fadeIn space-y-1.5">
                  <label className="block text-xs font-bold text-[#512719]">
                    Your Delivery Location / Area in Ghana <span className="text-[#EF4329]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. East Legon, Accra / Tema Comm 25 / Spintex / Kumasi"
                    value={deliveryAddress}
                    onChange={(e) => {
                      setDeliveryAddress(e.target.value);
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#512719] focus:outline-none focus:ring-2 transition-all ${
                      errors.deliveryAddress
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-[#F2C7A9] focus:ring-[#EF4329]'
                    }`}
                  />
                  <p className="text-[11px] text-[#512719]/75 flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EF4329] shrink-0" />
                    <span>The seller will review this location and provide your delivery fee on WhatsApp.</span>
                  </p>
                  {errors.deliveryAddress && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.deliveryAddress}</span>
                    </p>
                  )}
                </div>
              )}

              {fulfilmentType === 'pickup' && (
                <div className="p-3 bg-[#FFF8EF] border border-[#F2C7A9] rounded-xl text-xs text-[#512719]">
                  <p className="font-bold flex items-center gap-1.5 text-[#512719]">
                    <Store className="w-3.5 h-3.5 text-[#EF4329]" />
                    Pickup Location:
                  </p>
                  <p className="mt-0.5 text-[#512719]/80 font-medium">
                    {BRAND_CONFIG.pickupLocation}. No delivery fee applies.
                  </p>
                </div>
              )}

              {/* Additional Order Notes */}
              <div>
                <label className="block text-xs font-bold text-[#512719] mb-1">
                  Additional Order Notes <span className="text-xs text-[#512719]/60 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please include extra ice packs, or deliver before 3 PM"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F2C7A9] text-sm text-[#512719] focus:outline-none focus:ring-2 focus:ring-[#EF4329] resize-none"
                />
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-[#512719]/70 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Seller confirms final delivery bill directly with you in WhatsApp chat.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-white shadow-lg shadow-[#EF4329]/25 hover:shadow-xl transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>
                  {isDelivery
                    ? `Send Order via WhatsApp (${formatCurrency(subtotal)} + Delivery)`
                    : `Send Order via WhatsApp (${formatCurrency(subtotal)})`}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
