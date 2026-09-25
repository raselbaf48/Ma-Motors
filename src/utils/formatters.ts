/**
 * Formats a number to Bangladeshi/South Asian numbering (e.g., 3,85,000)
 * Strictly guarantees NO space before or after comma (,).
 */
export const formatNumber = (num: number): string => {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }
  const rounded = Math.round(num);
  const isNegative = rounded < 0;
  const absStr = Math.abs(rounded).toString();

  if (absStr.length <= 3) {
    return `${isNegative ? '-' : ''}${absStr}`;
  }

  const lastThree = absStr.slice(-3);
  const otherDigits = absStr.slice(0, -3);
  const formattedOthers = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  const result = `${formattedOthers},${lastThree}`;
  
  // Strictly remove all spaces before or after comma (including non-breaking & thin spaces)
  const cleanResult = result.replace(/[\s\u00A0\u200B\u202F]*,[\s\u00A0\u200B\u202F]*/g, ',');

  return `${isNegative ? '-' : ''}${cleanResult}`;
};

/**
 * Formats a number to Bangladeshi Taka currency format (e.g., ৳3,85,000)
 * Strictly guarantees NO space before or after comma (,).
 */
export const formatBDT = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '৳0';
  }
  return `৳${formatNumber(amount)}`;
};

/**
 * Parses raw text or numbers safely into BDT integer
 */
export const parseBDT = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const cleaned = value.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};
