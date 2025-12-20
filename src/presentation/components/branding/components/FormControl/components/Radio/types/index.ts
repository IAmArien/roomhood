/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

import { PropsWithChildren } from 'react';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

import { Theme } from '../../../../../types/Theme';
import { TypographyProps } from '../../../../Typography/types';

/**
 * Type object for Radio Button component
 * @param testID string value for custom name of testID
 * @param value string value for the value of the radio button
 * @param label string value for radio button label
 * @param textProps TypographyProps for updating the default text props of radio
 * button label
 * @param selected boolean prop type to tell if the radio button is selected or not.
 * @param disabled boolean prop type to tell if the radio button will be in
 * disabled state
 *  @param onPress Callback function being called if onPress was triggered via Pressable
 * or custom call
 * @param style StyleProp of ViewStyle for customizing the radio button container
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 */
export type RadioButtonProps = {
  /**
   * @param value string value for the value of the radio button
   */
  value?: string;
  /**
   * @param label string value for radio button label
   */
  label?: string;
  /**
   * @param textProps TypographyProps for updating the default text props of radio
   * button label
   */
  textProps?: TypographyProps;
  /**
   * @param disabled boolean prop type to tell if the radio button will be in
   * disabled state
   */
  disabled?: boolean;
  /**
   * @param onPress Callback function being called if onPress was triggered via Pressable
   * or custom call
   * @returns void
   */
  onPress?: (value?: string) => void;
  /**
   * @param testID string value for custom name of testID
   */
  testID?: string;
  /**
   * @param selected boolean prop type to tell if the radio button is selected or not.
   */
  selected?: boolean;
  /**
   * @param style StyleProp of ViewStyle for customizing the radio button container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & AccessibilityProps;

/**
 * Type object for Radio Group Props
 */
export type RadioGroupProps = PropsWithChildren;
