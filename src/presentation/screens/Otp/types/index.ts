/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from '@branding/types';

export type OtpType = 'email' | 'mobile';
export type OtpState = 'default' | 'selection' | 'success' | 'error' | 'loading';
export type OtpInputValue = {
  index: number;
  value: string;
  state: OtpState;
};

export type OtpScreenProps = {
  title: string;
  type: OtpType;
} & Pick<OtpInputTextFieldProps, 'timerInMillis'>;

export type OtpScreenEmailProps = OtpScreenProps & Pick<OtpDescriptionHeaderProps, 'emailAddress'>;
export type OtpScreenMobileProps = OtpScreenProps & Pick<OtpDescriptionHeaderProps, 'mobileNumber'>;

export type OtpScreenDefaultProps =
  | ({ type: 'email' } & OtpScreenEmailProps)
  | ({ type: 'mobile' } & OtpScreenMobileProps);

export type OtpScreenPropsWithType<T extends OtpType> = Extract<OtpScreenDefaultProps, { type: T }>;

export type OtpDescriptionHeaderProps = {
  title: string;
  emailAddress?: string;
  mobileNumber?: string;
  theme?: Theme;
};

export type OtpInputTextFieldProps = {
  otpState: OtpState;
  onUpdateOTPState: (otpState: OtpState) => void;
  onVerifyOTP?: (otp: string) => void;
  timerInMillis?: number;
  theme?: Theme;
};

export type OtpInputTextFieldValueProps = {
  value: OtpInputValue;
  theme?: Theme;
};
