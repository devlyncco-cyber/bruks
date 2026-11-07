/**
 * Formats an amount into Ghana Cedis currency string
 * e.g., 15 -> "GH₵ 15.00"
 */
export function formatCurrency(amount: number): string {
  return `GH₵ ${amount.toFixed(2)}`;
}

