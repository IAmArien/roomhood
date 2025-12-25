/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { useCountdown } from '@presentation/hooks';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { OtpInputTextFieldProps, OtpInputValue, OtpState } from '../types';
import { OtpInputTextFieldValue } from './OtpInputTextFieldValue';

const DEFAULT_OTP_VALUES: OtpInputValue[] = [
  {
    index: 0,
    value: '',
    state: 'default',
  },
  {
    index: 1,
    value: '',
    state: 'default',
  },
  {
    index: 2,
    value: '',
    state: 'default',
  },
  {
    index: 3,
    value: '',
    state: 'default',
  },
  {
    index: 4,
    value: '',
    state: 'default',
  },
  {
    index: 5,
    value: '',
    state: 'default',
  },
];

export const OtpInputTextField: React.FC<OtpInputTextFieldProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { timerInMillis = 300, onVerifyOTP, otpState, onUpdateOTPState } = props;

  const otpTextInputRef = useRef<TextInput | null>(null);

  const [otp, setOtp] = useState<OtpInputValue[]>(DEFAULT_OTP_VALUES);

  const [otpValue, setOtpValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { seconds, reset, isFinished } = useCountdown(timerInMillis);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  };

  const getOtpTextBoxState = (value: string, isFocused: boolean): OtpState => {
    if (otpState === 'success') {
      return 'success';
    }
    if (otpState === 'error') {
      return 'error';
    }
    if (otpState === 'loading') {
      return 'loading';
    }
    if (isFocused) {
      if (value !== '') return 'selection';
    }
    return 'default';
  };

  const setOtpValueState = (isFocused: boolean) => {
    setOtp(prevOtp =>
      prevOtp.map(value => ({
        state: getOtpTextBoxState(value.value, isFocused),
        index: value.index,
        value: value.value,
      }))
    );
  };

  const stringToOTPValue = (string: string, prevOtp: OtpInputValue[]): OtpInputValue[] => {
    return prevOtp.map(value => {
      const newValue = string[value.index] ?? '';
      return {
        state: getOtpTextBoxState(newValue, isFocused),
        index: value.index,
        value: newValue,
      };
    });
  };

  const handleTextBoxOnPress = () => otpTextInputRef.current?.focus();

  const handleTextInputOnFocus = () => setIsFocused(true);

  const handleTextInputOnBlur = () => setIsFocused(false);

  const handleResetOTP = () => {
    reset();
  };

  useEffect(() => {
    const delayTimeout = setTimeout(() => otpTextInputRef.current?.focus(), 1000);
    return () => {
      clearTimeout(delayTimeout);
    };
  }, []);

  useEffect(() => setOtpValueState(isFocused), [otpState, isFocused]);

  useEffect(() => {
    setOtp(prevOtp => stringToOTPValue(otpValue, prevOtp));
    if (otpValue.length === 6) {
      onUpdateOTPState('loading');
      setTimeout(() => {
        Keyboard.dismiss();
        onVerifyOTP?.(otpValue);
      }, 300);
      return;
    }
    onUpdateOTPState('default');
  }, [otpValue]);

  return (
    <View testID="otp-container" accessible={false} style={styles.otpContainer}>
      <View
        testID="otp-field-container"
        accessibilityLabel="otp-field-container"
        accessible={false}
        style={styles.otpFieldContainer}
      >
        {otp.map(value => {
          return (
            <Pressable style={{ flex: 1 }} key={value.index} onPress={handleTextBoxOnPress}>
              <OtpInputTextFieldValue value={value} theme={theme} />
            </Pressable>
          );
        })}
      </View>
      <View accessible={false} style={styles.otpResendContainer}>
        {isFinished ? (
          <Typography variant="description" size="md" color={colors.text.clearest}>
            Didn't get the code?&nbsp;
            <Typography
              variant="interactions"
              size="md"
              color={colors.ui.primary}
              style={{ fontSize: 16 }}
              onPress={handleResetOTP}
            >
              Resend it
            </Typography>
            .
          </Typography>
        ) : (
          <Typography variant="description" size="md" color={colors.text.clearest}>
            Resend the code in&nbsp;
            <Typography
              variant="interactions"
              size="md"
              color={colors.ui.primary}
              style={{ fontSize: 16 }}
            >
              {formatTime(seconds)}
            </Typography>
            .
          </Typography>
        )}
      </View>
      <TextInput
        ref={otpTextInputRef}
        testID="otp-text-input"
        accessibilityLabel="otp-text-input"
        inputMode="numeric"
        keyboardType="number-pad"
        onChangeText={setOtpValue}
        maxLength={6}
        style={{
          position: 'absolute',
          top: -1000,
          left: -1000,
        }}
        caretHidden
        onFocus={handleTextInputOnFocus}
        onBlur={handleTextInputOnBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  otpFieldContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  otpResendContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
