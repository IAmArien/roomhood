/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from "presentation/components/branding/types/Theme";
import { ReactElement } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

export type HeaderProps = {
  title?: string;
  titleTestID?: string;
  animationEnabled?: false;
  iconType?: 'default' | 'outlined';
  headerLeftIconTestID?: string;
  headerLeftIconOptions: Pick<HeaderLeftIconProps, 'customIcon' | 'customIconColor'>;
  onHeaderLeftIconPress?: () => void;
  headerLeftIconStyle?: StyleProp<ViewStyle>;
  theme?: Theme;
} & ViewProps;

export type HeaderLeftIconProps = {
  customIcon?: ReactElement;
  customIconColor?: string;
  theme?: Theme;
} & ViewProps;
