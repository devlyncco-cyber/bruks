// Test runner verifying the new seller delivery calculation on WhatsApp
const BRAND_CONFIG = {
  name: 'LOBBO BEVERAGES',
  tagline: 'Home-Brewed Excellence. Serve Chilled.',
  whatsappNumber: '233243191039',
  pickupLocation: 'Lobbo Hub (Accra / Koforidua)',
};

const PRODUCTS = [
  {
    id: 'lobbo-cous-cous',
    name: 'Lobbo Cous Cous',
    size: '250ml',
    price: 15.0,
    capColor: 'White',
  },
  {
    id: 'lobbo-bruks',
    name: 'Lobbo Bruks',
    size: '300ml',
    price: 18.0,
    capColor: 'Black',
  },
];

function formatCurrency(amount) {
  return `GH₵ ${amount.toFixed(2)}`;
}

function buildWhatsAppMessage({ customer, items, subtotal }) {
  const isDelivery = customer.fulfilmentType === 'delivery';
  const fulfilmentLabel = isDelivery ? 'Delivery' : 'Pickup';

  const itemsText = items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name} (${item.product.size})\n   Quantity: ${item.quantity}\n   Unit Price: ${formatCurrency(item.product.price)}\n   Total: ${formatCurrency(lineTotal)}`;
    })
    .join('\n\n');

  let customerDetailsBlock = `CUSTOMER DETAILS\nName: ${customer.fullName.trim()}\nPhone: ${customer.phoneNumber.trim()}\nFulfilment: ${fulfilmentLabel}`;
  if (isDelivery && customer.deliveryAddress?.trim()) {
    customerDetailsBlock += `\nDelivery Location: ${customer.deliveryAddress.trim()}`;
  } else if (!isDelivery) {
    customerDetailsBlock += `\nPickup Location: ${BRAND_CONFIG.pickupLocation}`;
  }

  let paymentSummaryBlock = `PAYMENT SUMMARY\nSubtotal: ${formatCurrency(subtotal)}`;
  if (isDelivery) {
    paymentSummaryBlock += `\nDelivery Fee: To be calculated by seller based on location\nGrand Total: ${formatCurrency(subtotal)} (+ Delivery Fee)`;
  } else {
    paymentSummaryBlock += `\nDelivery Fee: GH₵ 0.00 (Pickup)\nGrand Total: ${formatCurrency(subtotal)}`;
  }

  const notesText = customer.orderNotes?.trim() ? `\n\nAdditional Notes: ${customer.orderNotes.trim()}` : '';

  return (
    `Hello Lobbo Beverages!\n\n` +
    `I would like to place an order.\n\n` +
    `${customerDetailsBlock}\n\n` +
    `ORDER DETAILS\n\n` +
    `${itemsText}\n\n` +
    `${paymentSummaryBlock}` +
    `${notesText}\n\n` +
    `Thank you!`
  );
}

console.log('Testing WhatsApp Order with Seller Delivery Calculation...');

// 1. Delivery Test:
const deliveryMsg = buildWhatsAppMessage({
  customer: {
    fullName: 'Ama Serwaa',
    phoneNumber: '024 319 1039',
    fulfilmentType: 'delivery',
    deliveryAddress: 'East Legon, Accra',
    orderNotes: 'Please deliver cold',
  },
  items: [
    { product: PRODUCTS[0], quantity: 2 },
    { product: PRODUCTS[1], quantity: 1 },
  ],
  subtotal: 48,
});

console.log('--- DELIVERY MESSAGE ---');
console.log(deliveryMsg);
console.log('------------------------');

if (!deliveryMsg.includes('Delivery Location: East Legon, Accra')) {
  throw new Error('Missing stated customer location');
}
if (!deliveryMsg.includes('Delivery Fee: To be calculated by seller based on location')) {
  throw new Error('Missing seller delivery note');
}
if (!deliveryMsg.includes('Grand Total: GH₵ 48.00 (+ Delivery Fee)')) {
  throw new Error('Grand total should indicate + Delivery Fee');
}

// 2. Pickup Test:
const pickupMsg = buildWhatsAppMessage({
  customer: {
    fullName: 'Kofi Mensah',
    phoneNumber: '054 408 2161',
    fulfilmentType: 'pickup',
  },
  items: [
    { product: PRODUCTS[0], quantity: 1 },
  ],
  subtotal: 15,
});

console.log('--- PICKUP MESSAGE ---');
console.log(pickupMsg);
console.log('----------------------');

if (!pickupMsg.includes('Delivery Fee: GH₵ 0.00 (Pickup)')) {
  throw new Error('Missing pickup fee representation');
}
if (!pickupMsg.includes('Grand Total: GH₵ 15.00')) {
  throw new Error('Grand total mismatch for pickup');
}

console.log('\n✓ ALL SELLER-DELIVERY VERIFICATIONS PASSED 100%!');
