/**
 * Formats a number to Bangladeshi Taka currency format (e.g., ৳3,85,000)
 */
export const formatBDT = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '৳0';
  }
  // Format with standard South Asian or en-IN numbering: e.g. ৳3,85,000
  return `৳${Math.round(amount).toLocaleString('en-IN')}`;
};

/**
 * Parses raw text or numbers safely into BDT integer
 */
export const parseBDT = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const cleaned = value.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};
