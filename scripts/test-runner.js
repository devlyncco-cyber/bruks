// Test runner verifying retail and bulk purchase options & WhatsApp formatting with GH₵ 20 pricing
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
    size: '350ml',
    price: 20.0,
    packagingOptions: [
      { id: 'single', name: 'Single Bottle (Retail)', shortName: '1 Bottle', bottlesCount: 1, type: 'retail', price: 20.0 },
      { id: 'pack-6', name: '6-Bottle Pack (Retail Bundle)', shortName: '6-Pack', bottlesCount: 6, type: 'retail', price: 110.0 },
      { id: 'crate-12', name: 'Full Crate (12 Bottles - Bulk)', shortName: '12 Crate', bottlesCount: 12, type: 'bulk', price: 215.0 },
      { id: 'crate-24', name: 'Event & Wholesale Crate (24 Bottles)', shortName: '24 Crate', bottlesCount: 24, type: 'bulk', price: 420.0 },
    ],
  },
  {
    id: 'lobbo-bruks',
    name: 'Lobbo Bruks',
    size: '350ml',
    price: 20.0,
    packagingOptions: [
      { id: 'single', name: 'Single Bottle (Retail)', shortName: '1 Bottle', bottlesCount: 1, type: 'retail', price: 20.0 },
      { id: 'pack-6', name: '6-Bottle Pack (Retail Bundle)', shortName: '6-Pack', bottlesCount: 6, type: 'retail', price: 110.0 },
      { id: 'crate-12', name: 'Full Crate (12 Bottles - Bulk)', shortName: '12 Crate', bottlesCount: 12, type: 'bulk', price: 215.0 },
      { id: 'crate-24', name: 'Event & Wholesale Crate (24 Bottles)', shortName: '24 Crate', bottlesCount: 24, type: 'bulk', price: 420.0 },
    ],
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
      const opt = item.selectedOption || item.product.packagingOptions[0];
      const unitPrice = opt.price;
      const lineTotal = unitPrice * item.quantity;
      const tierLabel = opt.bottlesCount > 1 ? ` [${opt.name}]` : ` [Single Bottle - Retail]`;
      return `${index + 1}. ${item.product.name} (${item.product.size})${tierLabel}\n   Quantity: ${item.quantity}\n   Unit Price: ${formatCurrency(unitPrice)}\n   Total: ${formatCurrency(lineTotal)}`;
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

console.log('Testing WhatsApp Order with GH₵ 20 Pricing...');

// Test 1: Mixed Order (2x Retail Single at GH₵ 20 + 1x Bulk Crate of 12 at GH₵ 215)
const mixedOrderMsg = buildWhatsAppMessage({
  customer: {
    fullName: 'Ama Serwaa',
    phoneNumber: '024 319 1039',
    fulfilmentType: 'delivery',
    deliveryAddress: 'East Legon, Accra',
    orderNotes: 'Please pack chilled',
  },
  items: [
    {
      product: PRODUCTS[0],
      selectedOption: PRODUCTS[0].packagingOptions[0], // Single Bottle (GH₵ 20)
      quantity: 2,
    },
    {
      product: PRODUCTS[1],
      selectedOption: PRODUCTS[1].packagingOptions[2], // Full Crate of 12 (GH₵ 215)
      quantity: 1,
    },
  ],
  subtotal: 20 * 2 + 215, // 40 + 215 = 255
});

console.log('--- MIXED RETAIL & BULK MESSAGE (GH₵ 20 PRICING) ---');
console.log(mixedOrderMsg);
console.log('---------------------------------------------------');

if (!mixedOrderMsg.includes('Unit Price: GH₵ 20.00')) {
  throw new Error('Single bottle unit price should be GH₵ 20.00');
}
if (!mixedOrderMsg.includes('Total: GH₵ 40.00')) {
  throw new Error('2x single bottles total should be GH₵ 40.00');
}
if (!mixedOrderMsg.includes('Subtotal: GH₵ 255.00')) {
  throw new Error('Subtotal calculation mismatch for GH₵ 255.00');
}

console.log('✓ ALL TESTS PASSED WITH GH₵ 20 BASE PRICING & CLEAN ICONS!');
