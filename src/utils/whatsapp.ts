import { BRAND_CONFIG } from '../data/brand';
import { CartItem, CustomerDetails } from '../types';
import { formatCurrency } from './currency';

export interface GenerateWhatsAppOrderParams {
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number | null;
  grandTotal: number;
}

/**
 * Builds the formatted WhatsApp order message where the seller calculates
 * the delivery fee on WhatsApp based on the customer's stated location.
 */
export function buildWhatsAppMessage({
  customer,
  items,
  subtotal,
}: GenerateWhatsAppOrderParams): string {
  const isDelivery = customer.fulfilmentType === 'delivery';
  const fulfilmentLabel = isDelivery ? 'Delivery' : 'Pickup';

  // Format the items list
  const itemsText = items
    .map((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name} (${item.product.size})\n   Quantity: ${item.quantity}\n   Unit Price: ${formatCurrency(item.product.price)}\n   Total: ${formatCurrency(lineTotal)}`;
    })
    .join('\n\n');

  // Customer details block with user-stated location for seller calculation
  let customerDetailsBlock = `CUSTOMER DETAILS\nName: ${customer.fullName.trim()}\nPhone: ${customer.phoneNumber.trim()}\nFulfilment: ${fulfilmentLabel}`;
  if (isDelivery && customer.deliveryAddress?.trim()) {
    customerDetailsBlock += `\nDelivery Location: ${customer.deliveryAddress.trim()}`;
  } else if (!isDelivery) {
    customerDetailsBlock += `\nPickup Location: ${BRAND_CONFIG.pickupLocation}`;
  }

  // Payment summary block: seller provides delivery fee on WhatsApp
  let paymentSummaryBlock = `PAYMENT SUMMARY\nSubtotal: ${formatCurrency(subtotal)}`;
  if (isDelivery) {
    paymentSummaryBlock += `\nDelivery Fee: To be calculated by seller based on location\nGrand Total: ${formatCurrency(subtotal)} (+ Delivery Fee)`;
  } else {
    paymentSummaryBlock += `\nDelivery Fee: GH₵ 0.00 (Pickup)\nGrand Total: ${formatCurrency(subtotal)}`;
  }

  // Notes block
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

/**
 * Generates the full WhatsApp URL with encoded message
 */
export function getWhatsAppOrderUrl(params: GenerateWhatsAppOrderParams): string {
  const rawMessage = buildWhatsAppMessage(params);
  const encoded = encodeURIComponent(rawMessage);
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`;
}
