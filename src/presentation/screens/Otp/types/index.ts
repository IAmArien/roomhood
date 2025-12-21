/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

export type OtpScreenProps = {
  title: string;
  type: 'email' | 'mobile';
  emailAddress?: string;
  mobileNumber?: string;
  timerInMillis?: number;
};
