/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from '@branding/types';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

export type BillsReminderPreviewProps = {
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;
