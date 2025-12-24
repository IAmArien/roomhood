/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { maskEmail, maskPHPhoneNumber } from '@utils';
import { ReactElement, useMemo } from 'react';
import { View } from 'react-native';

import { OtpDescriptionHeaderProps } from '../types';

export const OtpDescriptionHeader: React.FC<OtpDescriptionHeaderProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { title, emailAddress, mobileNumber } = props;

  const maskedPlatform = useMemo((): string => {
    if (emailAddress) {
      return maskEmail(emailAddress ?? '');
    }
    return maskPHPhoneNumber(mobileNumber ?? '');
  }, [emailAddress, mobileNumber]);

  const secondSpeil = useMemo((): string => {
    if (emailAddress) {
      return 'Please check your email and enter the code below.';
    }
    return 'Please check your mobile number and enter the code below.';
  }, [emailAddress, mobileNumber]);

  return (
    <View accessible={false}>
      <Typography
        variant="title"
        size="semi-bold-md"
        color={colors.text.clearest}
        textAlign="center"
      >
        {title}
      </Typography>
      <Typography
        variant="description"
        size="md"
        color={colors.text.clearest}
        style={{
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        We have sent the 6-digit code to&nbsp;
        <Typography
          variant="interactions"
          size="md"
          color={colors.ui.primary}
          style={{ fontSize: 16, lineHeight: 25.6 }}
        >
          {maskedPlatform}.&nbsp;
        </Typography>
        {secondSpeil}
      </Typography>
    </View>
  );
};
