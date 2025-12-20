/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import {
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle
, AccessibilityProps } from 'react-native';

import { Theme } from '../../../../../types/Theme';
import { RippleProps } from '../../../../Effects/Ripple/types';
import { TypographyProps } from '../../../../Typography/types';

/**
 * Type string for the common variant of the buttons, colud be `primary` or `outlined`
 */
export type ButtonVariant = 'primary' | 'outlined';

/**
 * Type string for the types of buttons, could be `standard` or `pill` buttons
 */
export type ButtonType = 'standard' | 'pill';

/**
 * Type object for the default button properties
 * @param size string value for the size of the buttons, could be `sm` for small,
 * `md` for medium, `lg` for large
 * @param title string value for the title of the button
 * @param icon react element for custom icon of the button, recommended to be an Svg
 * @param iconPlacement string value to where the icon will be placed, could be on
 * `left` or `right` side of the title of the button
 * @param buttonStyle ButtonStyleProps object for customizing the button's exclusive
 * properties such as its padding, height, background, border etc
 * @param textProps TypographyProps object for customizing the properties of the Typography,
 * specifically the title of the button
 * @param textAlign string value for changing the alignment of the title of the button
 * @param textFlex number value for the flex space of the title of the button, can be used
 * only if the space of the title of the button exceeds its width
 * @see RippleEffectProps
 * @see PressableProps
 * @see AccessibilityProps
 */
export type DefaultButtonProps = {
  buttonRef?: React.RefObject<View | null>;
  disabled?: boolean;
  /**
   * @param size string value for the size of the buttons, could be `sm` for small,
   * `md` for medium, `lg` for large
   */
  size: 'sm' | 'md' | 'lg';
  /**
   * @param title string value for the title of the button
   */
  title: string;
  /**
   * @param icon react element for custom icon of the button, recommended to be an Svg
   */
  icon?: React.ReactNode;
  /**
   * @param iconPlacement string value to where the icon will be placed, could be on
   * `left` or `right` side of the title of the button
   */
  iconPlacement?: 'left' | 'right';
  /**
   * @param badgeNumber number value to render on the badge
   */
  badgeNumber?: number;
  /**
   * @param badgePlacement string value to where the badge will be placed, could be on
   * `left` or `right` side of the title of the button
   */
  badgePlacement?: 'left' | 'right';
  /**
   * @param buttonStyle ButtonStyleProps object for customizing the button's exclusive
   * properties such as its padding, height, background, border etc
   */
  style?: StyleProp<ViewStyle>;
  rippleContainerStyle?: StyleProp<ViewStyle>;
  /**
   * @param textProps TypographyProps object for customizing the properties of the Typography,
   * specifically the title of the button
   */
  textProps?: TypographyProps;
  /**
   * @param textAlign string value for changing the alignment of the title of the button
   */
  textAlign?: TextStyle['textAlign'];
  textStyle?: TextStyle;
  theme?: Theme;
} & Pick<RippleProps, 'ripplePosition' | 'rippleColor'> &
  Pick<PressableProps, 'testID'> &
  Pick<RippleProps, 'onPress'> &
  AccessibilityProps;

/**
 * Type object for button properties of both `standard` and `pill` buttons
 * @param type string value either `standard` or `pill`
 * @param variant string value for button's variant, could be the `CommonVariant`,
 * `secondary`, or `whisper`
 * @param DefaultButtonProps Type object value for overall props of the buttons
 * @see DefaultButtonProps
 */
export type StandardButtonProps =
  | ({
      /**
       * @param type string value either `standard` or `pill`
       */
      type: 'standard';
      /**
       * @param variant string value for button's variant, could be the `CommonVariant`,
       * `secondary`, or `whisper`
       * @see ButtonVariant
       */
      variant: ButtonVariant | 'secondary' | 'whisper';
    } & DefaultButtonProps)
  | ({
      /**
       * @param type string value either `standard` or `pill`
       */
      type: 'pill';
      /**
       * @param variant string value for button's variant, could be the `CommonVariant`,
       * `secondary`, or `whisper`
       * @see ButtonVariant
       */
      variant: ButtonVariant;
    } & DefaultButtonProps);

export type ButtonPropsWithType<T extends ButtonType> = Extract<
  StandardButtonProps,
  { type: T }
>;
