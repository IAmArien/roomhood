/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from '@branding/types';
import { AccessibilityProps, PressableProps, StyleProp, ViewStyle } from 'react-native';

export type ProfileIconProps = {
  testID?: string;
  url: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps &
  Pick<PressableProps, 'onPress'>;
