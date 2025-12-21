/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

import { Theme } from '../../../../../types/Theme';

/**
 * Type object for Checkbox component
 * @param value string value for the value of the radio button
 * @param label string value for radio button label
 * @param selected boolean prop type to tell if the checkbox is selected or not.
 * @param disabled boolean prop type to tell if the checkbox will be in
 * disabled state
 * @param type string prop type to tell if the checkbox is normal or indeterminate.
 * @param style StyleProp of ViewStyle for customizing the checkbox container
 */
export type CheckboxProps = {
  /**
   * @param value string value for the value of the radio button
   */
  value?: string;
  /**
   * @param label string value for radio button label
   */
  label?: string;
  /**
   * @param customLabel React.ReactNode for custom label instead of the string label
   */
  customLabel?: React.ReactNode;
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
  onPress?: () => void;
  /**
   * @param testID string value for custom name of testID
   */
  testID?: string;
  /**
   * @param selected boolean prop type to tell if the checkbox is selected or not.
   */
  selected?: boolean;
  /**
   * @param type string prop type to tell if the checkbox is normal or indeterminate.
   */
  type?: 'normal' | 'indeterminate';
  /**
   * @param style StyleProp of ViewStyle for customizing the checkbox container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & AccessibilityProps;
