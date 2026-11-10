import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { initGA, trackPageView } from './utils/analytics';

export default function App() {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

  return (
    <CartProvider>
      <Home />
      <Analytics />
    </CartProvider>
  );
}
