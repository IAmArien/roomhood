/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { PropsWithChildren } from 'react';
import { AccessibilityProps, StyleProp, View, ViewStyle } from 'react-native';
import {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export type RipplePosition = 'center' | 'on-tap';

export type RippleProps = {
  rippleRef?: React.RefObject<View | null>;
  testID?: string;
  disabled?: boolean;
  onPress?: (e: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  ripplePosition?: RipplePosition;
  rippleColor?: string;
} & AccessibilityProps &
  PropsWithChildren;
