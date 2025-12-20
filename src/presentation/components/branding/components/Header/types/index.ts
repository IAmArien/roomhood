/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from "presentation/components/branding/types/Theme";
import { ReactElement } from "react";
import { AccessibilityProps, StyleProp, ViewProps, ViewStyle } from "react-native";

export type HeaderIconType = 'back' | 'close';

export type HeaderProps = {
  testID?: string;
  type?: HeaderIconType;
  title?: string;
  titleTestID?: string;
  animationEnabled?: false;
  headerLeftIconTestID?: string;
  headerLeftIconStyle?: StyleProp<ViewStyle>;
  onHeaderLeftIconPress?: () => void;
  headerActions?: HeaderActionsProps[];
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;

export type HeaderIconProps = {
  testID?: string;
  icon?: ReactElement;
} & AccessibilityProps & Pick<ViewProps, 'onLayout'>;

export type HeaderActionsProps = {
  testID?: string;
  icon: ReactElement;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
} & AccessibilityProps;
