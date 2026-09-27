/**
 * Input validation helpers to enforce strict numeric, strict text-only, and combined entry.
 *
 * Rules:
 * 1. Numeric-only fields: ONLY digits (0-9) allowed. Text/letters are completely blocked.
 * 2. Text-only fields: ONLY letters and spaces allowed. Numbers (0-9) are completely blocked.
 * 3. Combined fields: Letters, numbers, and symbols are all permitted.
 */

/**
 * Enforces numeric-only input on keyDown (blocks letters, symbols).
 * Allows Backspace, Delete, Tab, Arrow keys, Enter, and Copy/Paste/Cut shortcuts.
 */
export function handleNumericKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  // Allow navigation and control keys
  const allowedControlKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End'
  ];

  if (allowedControlKeys.includes(e.key)) {
    return;
  }

  // Allow Ctrl/Cmd + A, C, V, X, Z
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
    return;
  }

  // Block any non-digit key
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
}

/**
 * Filters any non-digit characters from a string.
 */
export function sanitizeNumeric(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

/**
 * Enforces text-only input on keyDown (blocks digits 0-9).
 * Allows letters, spaces, hyphens, and navigation/control keys.
 */
export function handleTextOnlyKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  // Allow navigation and control keys
  const allowedControlKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End'
  ];

  if (allowedControlKeys.includes(e.key)) {
    return;
  }

  // Allow Ctrl/Cmd + A, C, V, X, Z
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
    return;
  }

  // Block any digit 0-9
  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
}

/**
 * Filters any digits (0-9) from a text string.
 */
export function sanitizeTextOnly(value: string): string {
  return value.replace(/[0-9]/g, '');
}
