// Utility formatting helpers centralised for localisation
// -------------------------------------------------------
// NOTE: Do NOT import Node-only Intl APIs on the serverless functions side; this
// file is strictly for browser (React) usage.

/**
 * Format a number as Canadian Dollars (CAD) with no unnecessary decimal places.
 * Example: `formatCurrencyCAD(750000)` → `$750,000`
 */
export const formatCurrencyCAD = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generic helper that formats any amount in a given currency and locale.
 * Falls back to the browsers default locale if `locale` is not provided.
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = navigator.language
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}; 