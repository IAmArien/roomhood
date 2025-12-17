/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { PropsWithChildren } from 'react';
import { Theme } from '../../../../../types/Theme';
import { TypographyProps } from '../../../../Typography/types';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';
import { TextFieldProps } from '../../TextField/types';
import { ModalDialogProps } from '../../../../Modal/Dialog/types';
import { ButtonPropsWithType } from '../../Button/types';

export type DropdownType = 'autocomplete' | 'modal' | 'selection';

/**
 * @param value string unique value for the option
 * @param title string value for the option's label / title
 * @param optionKey string optional value for unique key of the option
 * @param customValue generic type of T for providing custom return value upon selection
 * of the option
 */
export type Option<T = any> = {
  /**
   * @param value string unique value for the option
   */
  value: string;
  /**
   * @param title string value for the option's label / title
   */
  title: string;
  /**
   * @param optionKey string optional value for unique key of the option
   */
  optionKey?: string;
  /**
   * @param customValue generic type of T for providing custom return value upon selection
   * of the option
   */
  customValue?: T;
};

/**
 * @param label string value for the label of the dropdown textfield
 * @param placeholder string value for the placeholder of the dropdown textfield
 * @param style StyleProp of ViewStyle for customizing the style of the dropdown
 * textfield container
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 */
export type DropdownDefaultProps = {
  /**
   * @param label string value for the label of the dropdown textfield
   */
  label?: string;
  /**
   * @param placeholder string value for the placeholder of the dropdown textfield
   */
  placeholder?: string;
  /**
   * @param style StyleProp of ViewStyle for customizing the style of the dropdown
   * textfield container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & PropsWithChildren &
  AccessibilityProps;

export type DropdownProps =
  | ({
      /**
       * @param type string value for differentiating which type of modal to use
       */
      type: 'autocomplete';
    } & AutoCompleteDropdownProps)
  | ({
      /**
       * @param type string value for differentiating which type of modal to use
       */
      type: 'modal';
    } & ModalDropdownProps)
  | ({
      /**
       * @param type string value for differentiating which type of modal to use
       */
      type: 'selection';
    } & SelectionDropdownProps);

/**
 * @param disabled boolean value to tell if the specific option is disabled
 * @param testID string value for custom name for testID of the option
 * @param customTitle callback function that returns react node for customizing
 * a custom title for the option component
 * @param customReturnValue generic type of T for utilizing a custom return value
 * upon selection of the option
 * @param textProps TypographyProps for custom typography of the option
 * @param style StyleProp of ViewStyle for customizing the option's default style
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 */
export type OptionProps<T = any> = {
  /**
   * @param disabled boolean value to tell if the specific option is disabled
   */
  disabled?: boolean;
  /**
   * @param testID string value for custom name for testID of the option
   */
  testID?: string;
  /**
   * @param customTitle callback function that returns react node for customizing
   * a custom title for the option component
   * @returns React.ReactNode
   */
  customTitle?: () => React.ReactNode;
  /**
   * @param customReturnValue generic type of T for utilizing a custom return value
   * upon selection of the option
   */
  customReturnValue?: T;
  /**
   * @param textProps TypographyProps for custom typography of the option
   */
  textProps?: TypographyProps;
  /**
   * @param style StyleProp of ViewStyle for customizing the option's default style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & Pick<Option, 'title'> &
  Pick<Option, 'value'> &
  Pick<Option, 'optionKey'> &
  AccessibilityProps;

/**
 * @param modalLabel string value for the label (title) of the modal
 * @param modalLabelTestID string value for custom name of testID for modal label
 * @param testID string value for custom name of testID for dropdown textfield
 * @param dropdownTestID string value for custom name of testID for dropdown itself
 * @param dropdownModalTestID string value for custom name of testID for dropdown modal
 * @param dropdownModalPositiveButtonTestID string value for custom name of testID for
 * dropdown modal positive button
 * @param dropdownModalPositiveButtonTitle string value for custom title of the dropdown
 * positive button title
 * @param dropdownModalPositiveButtonProps ButtonPropsWithType for providing custom props
 * for positive button
 * @param dropdownModalNegativeButtonTestID string value for custom name of testID for
 * dropdown modal negative button
 * @param dropdownModalNegativeButtonTitle string value for custom title of the dropdown
 * negative button title
 * @param dropdownModalNegativeButtonProps ButtonPropsWithType for providing custom props
 * for negative button
 * @param dropdownOverlayTestID string value for custom name for testID of the dropdown
 * modal overlay
 * @param textFieldTestID string value for the dropdown textfield testID
 */
export type ModalDropdownProps = {
  /**
   * @param modalLabel string value for the label (title) of the modal
   */
  modalLabel?: string;
  /**
   * @param modalLabelTestID string value for custom name of testID for modal label
   */
  modalLabelTestID?: string;
  /**
   * @param testID string value for custom name of testID for dropdown textfield
   */
  testID?: string;
  /**
   * @param dropdownTestID string value for custom name of testID for dropdown itself
   */
  dropdownTestID?: string;
  /**
   * @param dropdownModalTestID string value for custom name of testID for dropdown modal
   */
  dropdownModalTestID?: string;
  /**
   * @param dropdownModalPositiveButtonTestID string value for custom name of testID for
   * dropdown modal positive button
   */
  dropdownModalPositiveButtonTestID?: string;
  /**
   * @param dropdownModalPositiveButtonTitle string value for custom title of the dropdown
   * positive button title
   */
  dropdownModalPositiveButtonTitle?: string;
  /**
   * @param dropdownModalPositiveButtonProps ButtonPropsWithType for providing custom props
   * for positive button
   */
  dropdownModalPositiveButtonProps?: ButtonPropsWithType<'standard' | 'pill'>;
  /**
   * @param dropdownModalNegativeButtonTestID string value for custom name of testID for
   * dropdown modal negative button
   */
  dropdownModalNegativeButtonTestID?: string;
  /**
   * @param dropdownModalNegativeButtonTitle string value for custom title of the dropdown
   * negative button title
   */
  dropdownModalNegativeButtonTitle?: string;
  /**
   * @param dropdownModalNegativeButtonProps ButtonPropsWithType for providing custom props
   * for negative button
   */
  dropdownModalNegativeButtonProps?: ButtonPropsWithType<'standard' | 'pill'>;
  /**
   * @param dropdownOverlayTestID string value for custom name for testID of the dropdown
   * modal overlay
   */
  dropdownOverlayTestID?: string;
  /**
   * @param textFieldTestID string value for the dropdown textfield testID
   */
  textFieldTestID?: string;
} & DropdownDefaultProps &
  Pick<ModalDialogProps, 'scrimOverlayProps'> &
  Pick<ModalDialogProps, 'overlayType'> &
  Pick<TextFieldProps, 'selectionColor'> &
  Pick<TextFieldProps, 'placeholderTextColor'> &
  Pick<TextFieldProps, 'placeholderVisibility'> &
  Pick<TextFieldProps, 'notesVisibility'> &
  Pick<TextFieldProps, 'fixedLabel'>;

export type AutoCompleteDropdownProps = DropdownDefaultProps;

/**
 * @param testID string value for custom name for selection dropdown testID
 * @param dropdownTestID string value for custom name for selection dropdown content
 * testID
 * @param dropdownModalTestID string value for custom name for selection dropdown
 * modal testID
 * @param dropdownTextFieldTestID string value for custom name for selection dropdown
 * modal textfield testID
 * @param dropdownOverlayTestID string value for custom name for selection dropdown
 * modal overlay testID
 * @param textFieldTestID string value for custom name for selection dropdown textfield
 * testID
 */
export type SelectionDropdownProps = {
  /**
   * @param testID string value for custom name for selection dropdown testID
   */
  testID?: string;
  /**
   * @param dropdownTestID string value for custom name for selection dropdown content
   * testID
   */
  dropdownTestID?: string;
  /**
   * @param dropdownModalTestID string value for custom name for selection dropdown
   * modal testID
   */
  dropdownModalTestID?: string;
  /**
   * @param dropdownTextFieldTestID string value for custom name for selection dropdown
   * modal textfield testID
   */
  dropdownTextFieldTestID?: string;
  /**
   * @param dropdownOverlayTestID string value for custom name for selection dropdown
   * modal overlay testID
   */
  dropdownOverlayTestID?: string;
  /**
   * @param textFieldTestID string value for custom name for selection dropdown textfield
   * testID
   */
  textFieldTestID?: string;
} & DropdownDefaultProps &
  Pick<TextFieldProps, 'selectionColor'> &
  Pick<TextFieldProps, 'placeholderTextColor'> &
  Pick<TextFieldProps, 'placeholderVisibility'> &
  Pick<TextFieldProps, 'notesVisibility'>;

export type DropdownPropsWithType<T extends DropdownType> = Extract<
  DropdownProps,
  { type: T }
>;
