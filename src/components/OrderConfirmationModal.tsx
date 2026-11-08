import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';
import { useCart } from '../hooks/useCart';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderText: string;
  whatsappUrl: string;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  orderText,
  whatsappUrl,
}) => {
  const { clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDoneAndClear = () => {
    clearCart();
    onClose();
  };

  const handleKeepCart = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#191513]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#FFF8EF] border border-[#F2C7A9] rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl z-10 my-auto max-h-[90vh] overflow-y-auto">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#EBF9F1] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EF4329]">
            Order Formatted & Transferred
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#512719] mt-1 mb-2">
            Opening WhatsApp...
          </h3>
          <p className="text-xs sm:text-sm text-[#512719]/80 max-w-md mx-auto leading-relaxed">
            Your order details were sent to WhatsApp. Please tap <strong>"Send"</strong> in your WhatsApp chat window with <strong>{BRAND_CONFIG.name}</strong> to finalize your order.
          </p>
        </div>

        {/* Formatted Order Message Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-[#512719]">
              Message Sent to WhatsApp:
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#F5E9D9] hover:bg-[#F2C7A9] text-[#512719] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              title="Copy message to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#512719]" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white border border-[#F2C7A9]/80 rounded-2xl p-4 shadow-inner max-h-52 overflow-y-auto">
            <pre className="text-xs text-[#512719] font-mono whitespace-pre-wrap leading-relaxed">
              {orderText}
            </pre>
          </div>
        </div>

        {/* WhatsApp Link Redirection Re-trigger */}
        <div className="mb-6 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Didn't open automatically? Click here to reopen WhatsApp</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDoneAndClear}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm bg-[#EF4329] hover:bg-[#D4341C] text-white shadow-lg shadow-[#EF4329]/25 hover:shadow-xl transition-all"
          >
            <span>Done (Clear My Cart)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleKeepCart}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-xs bg-white text-[#512719] border border-[#F2C7A9] hover:bg-[#F5E9D9] transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#512719]/70" />
            <span>Keep Items in Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

