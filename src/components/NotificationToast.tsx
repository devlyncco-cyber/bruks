import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notification alerts"
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#191513] text-[#FFF8EF] border border-[#F2C7A9]/40 rounded-2xl p-3.5 shadow-xl flex items-center justify-between gap-3 animate-slideUp"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
            <p className="text-xs font-bold text-[#FFF8EF]">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-[#FFF8EF]/50 hover:text-white p-1 transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

