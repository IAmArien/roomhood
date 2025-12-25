/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

export const isEmailAddressValid = (emailAddress: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(emailAddress);
};

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;

  const [username, domain] = email.split('@');

  if (username.length <= 1) {
    return `${username}@${domain}`;
  }

  const maskedUsername = username[0] + '*'.repeat(username.length - 1);

  return `${maskedUsername}@${domain}`;
};
