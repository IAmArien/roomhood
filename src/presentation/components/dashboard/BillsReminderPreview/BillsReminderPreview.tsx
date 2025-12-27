/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { BillsPaymentReminderIcon } from '@assets/icons';
import { Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { BillsReminderPreviewProps } from './types';

export const BillsReminderPreview: React.FC<BillsReminderPreviewProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { style } = props;

  return (
    <View
      testID=""
      accessibilityLabel=""
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface['lightest-periwinkle'],
        },
        style,
      ]}
    >
      <BillsPaymentReminderIcon />
      <View style={styles.descriptionContainer}>
        <Typography variant="title" size="semi-bold-xs" color={colors.text.clearest}>
          Electric Bill Reminder
        </Typography>
        <Typography
          variant="description"
          size="sm"
          color={colors.text.clearest}
          style={{ flex: 1 }}
        >
          You have an upcoming bills to pay this&nbsp;
          <Typography
            variant="interactions"
            size="md"
            color={colors.ui.primary}
            style={{
              fontSize: 14,
              lineHeight: 19.6,
            }}
          >
            Tuesday
          </Typography>
          . Settle now to avoid extra charges.
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  descriptionContainer: {
    flex: 1,
    paddingStart: 8,
    paddingEnd: 16,
  },
});
