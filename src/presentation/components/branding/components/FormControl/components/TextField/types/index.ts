/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native';
import { TypographyProps } from '../../../../Typography/types';
import { Theme } from '../../../../../types/Theme';
import { FormControlState, FormValidations } from '../../../types';

export type TextFieldState = FormControlState;
export type TextFieldExtendedRef = {
  /**
   * @param requestLabelPosition function to tell the textfield where to place the label,
   * `top` or `center`, by default is `center`. Use this function to control the
   * label position using `useRef`.
   * @param position string value whether `top` or `center`
   * @returns void
   */
  requestLabelPosition: (position: 'top' | 'center') => void;
  /**
   * @param requestFocus function to tell the textfield to request a focus or not. Use
   * this function using `useRef`.
   * @param focus boolean value to tell the focus state of the textfield
   * @returns void
   */
  requestFocus: (focus: boolean) => void;
  /**
   * @param setState function to update the state of the textfield. Use this function
   * using `useRef`.
   * @param state TextFieldState for the state of the textfield
   * @returns void
   */
  setState: (state: TextFieldState) => void;
};

/**
 * Type object props for TextField.
 * @param name string value for the custom name of the form control component
 * @param textFieldRef React RefObject of TextInput to be used as ref
 * @param extendedRef React RefObject of TextInput to be used as ref
 * @param label string value for the label of the text field
 * @param staticPlaceholderTestID string value for custom name for static placeholder
 * testID
 * @param staticPlaceholder string value for the placeholder (static) of the text input,
 * this placeholder is not being cleared when value was changed
 * @param staticPlaceholderStyle TypographyProps type for customizing the static placeholder
 * @param notes string value for the notes of text input, this value is displayed
 * below the text input
 * @param notesVisibility string value of `always` or `onFocus` to tell the textfield
 * when to show notes, by default is onFocus
 * @param trailingIcon ReactNode for providing custom trailing icon
 * @param trailingIconStyle StyleProp of ViewStyle for custom style of trailing icon
 * @param customSuccessIcon ReactNode for providing custom success icon
 * @param customSuccessIconStyle StyleProp of ViewStyle for custom style of success icon
 * @param customErrorIcon ReactNode for providing custom error icon
 * @param customErrorIconStyle StyleProp of ViewStyle for custom style of error icon
 * @param state AnimatedTextInputState of `default`, `success`, and `error`
 * @param errorMessage string value for custom error message of text input
 * @param backgroundColor ColorValue for short-hand use of background color for
 * text input
 * @param customStyle StyleProp of TextStyle for customizing the default style of the
 * textfield
 * @param containerStyle StyleProp of ViewStyle for customizing the default style of the
 * textfield's container
 * @param defaultLabelPosition string value of `top` or `center` to tell the text field
 * the default position of the label, by default is `center`
 * @param defaultCenterLabelPosition number value for the default position of the label,
 * by default is 28.5
 * @param defaultTopLabelPosition number value for the default top position of the label,
 * by default is 2
 * @param defaultCenterLabelStyle TextFieldLabelStyle value for the default style of the
 * text field label if it is not animated
 * @param defaultTopLabelStyle TextFieldLabelStyle value for the default style of the
 * text field label if it is animated to the top
 * @param controlLabelPosition string value of `top` or `center` to tell the text field
 * where to place the label, by default is undefined. Use this prop to control the
 * label position using re-render state
 * @param fixedLabel boolean value to make the label of textfield to stay static or fixed
 * regardless of focus state
 * @param placeholderVisibility string value of `always` or `onFocus` to tell the textfield
 * when to show placeholder, by default is onFocus (if textfield has label)
 * @param animationDuration number value for the label animation duration, by default
 * is 500
 * @param requestFocus boolean to tell the textfield to request focus in any re-rendering
 * state wanted, by default is undefined
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 * @param validations FormValidations for validating fields with certain requirements
 * being validated
 */
export type TextFieldProps = TextInputProps & {
  /**
   * @param name string value for the custom name of the form control component
   */
  name?: string;
  /**
   * @param textFieldRef React RefObject of TextInput to be used as ref
   */
  textFieldRef?: React.RefObject<TextInput>;
  /**
   * @param extendedRef React RefObject of TextInput to be used as ref
   */
  extendedRef?: React.RefObject<TextFieldExtendedRef>;
  /**
   * @param label string value for the label of the text field
   */
  label?: string;
  /**
   * @param defaultValue string value for the default value of the textfield
   */
  defaultValue?: string;
  /**
   * @param staticPlaceholderTestID string value for custom name for static placeholder
   * testID
   */
  staticPlaceholderTestID?: string;
  /**
   * @param staticPlaceholder string value for the placeholder (static) of the text input,
   * this placeholder is not being cleared when value was changed
   */
  staticPlaceholder?: string;
  /**
   * @param staticPlaceholderStyle TypographyProps type for customizing the static placeholder
   */
  staticPlaceholderStyle?: TypographyProps;
  /**
   * @param notes string value for the notes of text input, this value is displayed
   * below the text input
   */
  notes?: string;
  /**
   * @param notesVisibility string value of `always` or `onFocus` to tell the textfield
   * when to show notes, by default is onFocus
   */
  notesVisibility?: 'always' | 'onFocus';
  /**
   * @param trailingIcon ReactNode for providing custom trailing icon
   */
  trailingIcon?: React.ReactNode;
  /**
   * @param trailingIconStyle StyleProp of ViewStyle for custom style of trailing icon
   */
  trailingIconStyle?: StyleProp<ViewStyle>;
  /**
   * @param customSuccessIcon ReactNode for providing custom success icon
   */
  customSuccessIcon?: React.ReactNode;
  /**
   * @param customSuccessIconStyle StyleProp of ViewStyle for custom style of success icon
   */
  customSuccessIconStyle?: StyleProp<ViewStyle>;
  /**
   * @param customErrorIcon ReactNode for providing custom error icon
   */
  customErrorIcon?: React.ReactNode;
  /**
   * @param customErrorIconStyle StyleProp of ViewStyle for custom style of error icon
   */
  customErrorIconStyle?: StyleProp<ViewStyle>;
  /**
   * @param state AnimatedTextInputState of `default`, `success`, and `error`
   */
  state?: TextFieldState;
  /**
   * @param defaultErrorMessage string value for the default error message
   * to be displayed, useful especially if the errorMessage will not be changed
   */
  defaultErrorMessage?: string;
  /**
   * @param errorMessage string value for custom error message of text input
   */
  errorMessage?: string;
  /**
   * @param backgroundColor ColorValue for short-hand use of background color for
   * text input
   */
  backgroundColor?: string;
  /**
   * @param customStyle StyleProp of TextStyle for customizing the default style of the
   * textfield
   */
  customStyle?: StyleProp<TextStyle>;
  /**
   * @param containerStyle StyleProp of ViewStyle for customizing the default style of the
   * textfield's container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @param defaultLabelPosition string value of `top` or `center` to tell the text field
   * the default position of the label, by default is `center`
   */
  defaultLabelPosition?: 'top' | 'center';
  /**
   * @param defaultCenterLabelPosition number value for the default center position of the label,
   * by default is 28.5
   */
  defaultCenterLabelPosition?: number;
  /**
   * @param defaultTopLabelPosition number value for the default top position of the label,
   * by default is 2
   */
  defaultTopLabelPosition?: number;
  /**
   * @param defaultCenterLabelStyle TextFieldLabelStyle value for the default style of the
   * text field label if it is not animated
   */
  defaultCenterLabelStyle?: TextFieldLabelStyle;
  /**
   * @param defaultTopLabelStyle TextFieldLabelStyle value for the default style of the
   * text field label if it is animated to the top
   */
  defaultTopLabelStyle?: TextFieldLabelStyle;
  /**
   * @param controlLabelPosition string value of `top` or `center` to tell the text field
   * where to place the label, by default is undefined. Use this prop to control the
   * label position using re-render state
   */
  controlLabelPosition?: 'top' | 'center';
  /**
   * @param fixedLabel boolean value to make the label of textfield to stay static or fixed
   * regardless of focus state
   */
  fixedLabel?: boolean;
  /**
   * @param placeholderVisibility string value of `always` or `onFocus` to tell the textfield
   * when to show placeholder, by default is onFocus (if textfield has label)
   */
  placeholderVisibility?: 'always' | 'onFocus';
  /**
   * @param animationDuration number value for the label animation duration, by default
   * is 500
   */
  animationDuration?: number;
  /**
   * @param requestFocus boolean to tell the textfield to request focus in any re-rendering
   * state wanted, by default is undefined
   */
  requestFocus?: boolean;
  /**
   * @param validations FormValidations for validating fields with certain requirements
   * being validated
   */
  validations?: FormValidations<string>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
};

/**
 * Type object for static placeholder props
 * @param testID string value for custom test ID for placeholder
 * @param value string value for the current value of the text input
 * @param placeholder string value for the static placeholder
 * @param height number value for custom height of the static placeholder,
 * usually the same height of the text input
 * @param textProps TypographyProps type for customizing the static placeholder
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 */
export type StaticPlaceholderProps = {
  /**
   * @param testID string value for custom test ID for placeholder
   */
  testID?: string;
  /**
   * @param value string value for the current value of the text input
   */
  value?: string;
  /**
   * @param placeholder string value for the static placeholder
   */
  placeholder?: string;
  /**
   * @param height number value for custom height of the static placeholder,
   * usually the same height of the text input
   */
  height?: number;
  /**
   * @param textProps TypographyProps type for customizing the static placeholder
   */
  textProps?: TypographyProps;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
};

export type TextFieldLabelStyle = {
  lineHeight: number;
  fontSize: number;
  paddingHorizontal: number;
};
