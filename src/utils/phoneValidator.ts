/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

export const toPHMobileNumber = (input: string): string => {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('63')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);
  let formatted = '(+63)';
  if (digits.length > 0) {
    formatted += ` ${digits.slice(0, 3)}`;
  }
  if (digits.length > 3) {
    formatted += ` ${digits.slice(3, 6)}`;
  }
  if (digits.length > 6) {
    formatted += ` ${digits.slice(6, 10)}`;
  }
  return formatted;
};

export const isValidFormattedPHMobile = (value: string): boolean => {
  const regex = /^\(\+63\) 9\d{2} \d{3} \d{4}$/;
  return regex.test(value);
};

export const maskPHPhoneNumber = (phone: string): string => {
  if (!phone) return phone;

  const digits = phone.replace(/\D/g, '');

  let normalized = '';

  if (digits.startsWith('09') && digits.length === 11) {
    normalized = digits.slice(1);
  } else if (digits.startsWith('639') && digits.length === 12) {
    normalized = digits.slice(2);
  } else {
    return phone;
  }

  return `(+63) ${normalized[0]}** *** **${normalized.slice(-2)}`;
};
