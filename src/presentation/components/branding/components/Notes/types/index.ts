/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

import { Theme } from '../../../types/Theme';
import { ButtonPropsWithType } from '../../FormControl/components/Button/types';
import { TypographyProps } from '../../Typography/types';

/**
 * Type object for notes' tooltip props
 * @param testID string value for custom name of testID for tooltip
 * @param tooltipIcon react element for the icon of the tooltip
 * @param onPress callback function being triggered if tooltip icon was pressed
 */
export type NotesTooltipProps = {
  /**
   * @param testID string value for custom name of testID for tooltip
   */
  testID?: string;
  /**
   * @param tooltipIcon react element for the icon of the tooltip
   */
  tooltipIcon: React.ReactNode;
  /**
   * @param onPress callback function being triggered if tooltip icon was pressed
   * @returns void
   */
  onPress?: () => void;
};

/**
 * Type object for notes' action button props
 * @param testID string value for custom name of testID for action button
 * @param actionTitle string value for action button title
 * @param wrapped boolean value to tell if the button will be in wrap content
 * @param buttonProps ButtonPropsWithType of type standard or pill button for action button
 * customization
 * @param onPress callback function being triggered when action button was pressed
 */
export type NotesActionProps = {
  /**
   * @param testID string value for custom name of testID for action button
   */
  testID?: string;
  /**
   * @param actionTitle string value for action button title
   */
  actionTitle: string;
  /**
   * @param wrapped boolean value to tell if the button will be in wrap content
   */
  wrapped?: boolean;
  /**
   * @param buttonProps ButtonPropsWithType of type standard or pill button for action button
   * customization
   */
  buttonProps?: ButtonPropsWithType<'standard' | 'pill'>;
  /**
   * onPress callback function being triggered when action button was pressed
   * @return void
   */
  onPress?: () => void;
} & AccessibilityProps;

/**
 * Type object for notes' custom styling
 * @param titleStyle TypographyProps for customizing title of the notes
 * @param descriptionStyle TypographyProps for customizing description of the notes
 * @param backgroundColor string value for custom background color of the notes
 * @param borderColor string value for custom border color of the notes
 * @param borderWidth number value for custom width of the border of the notes
 * @param borderRadius number value for custom border radius of the notes
 */
export type NotesCustomStyle = {
  /**
   * @param titleStyle TypographyProps for customizing title of the notes
   */
  titleStyle?: TypographyProps;
  /**
   * @param descriptionStyle TypographyProps for customizing description of the notes
   */
  descriptionStyle?: TypographyProps;
  /**
   * @param backgroundColor string value for custom background color of the notes
   */
  backgroundColor?: string;
  /**
   * @param borderColor string value for custom border color of the notes
   */
  borderColor?: string;
  /**
   * @param borderWidth number value for custom width of the border of the notes
   */
  borderWidth?: number;
  /**
   * @param borderRadius number value for custom border radius of the notes
   */
  borderRadius?: number;
};

/**
 * Type object for the notes' props
 * @param testID string value notes component custom name for test ID
 * @param title string value for the notes' title
 * @param titleTestID string value for custom name of title's test ID
 * @param description string value for the notes' description
 * @param descriptionTestID string value for custom name of description's test ID
 * @param customDescription custom react component for providing custom description
 * @param icon React Node for displaying custom icon for notes
 * @param tooltip custom object for note's tooltip properties
 * @param state string value for notes state if it's default, warning, or error
 * @param action NotesActionProps for providing custom action button for notes
 * @param customStyle custom object for customizing notes' component
 * @param style StyleProp of ViewStyle for styling the notes component
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 */
export type NotesProps = {
  /**
   * @param testID string value notes component custom name for test ID
   */
  testID?: string;
  /**
   * @param title string value for the notes' title
   */
  title?: string;
  /**
   * @param titleTestID string value for custom name of title's test ID
   */
  titleTestID?: string;
  /**
   * @param description string value for the notes' description
   */
  description?: string;
  /**
   * @param descriptionTestID string value for custom name of description's test ID
   */
  descriptionTestID?: string;
  /**
   * @param customDescription custom react component for providing custom description
   * @returns React.ReactNode
   */
  customDescription?: () => React.ReactNode;
  /**
   * @param icon React Node for displaying custom icon for notes
   */
  icon?: React.ReactNode;
  /**
   * @param tooltip custom object for note's tooltip properties
   */
  tooltip?: NotesTooltipProps;
  /**
   * @param state string value for notes state if it's default, warning, or error
   */
  state?: 'default' | 'warning' | 'error';
  /**
   * @param action NotesActionProps for providing custom action button for notes
   */
  action?: NotesActionProps;
  /**
   * @param customStyle custom object for customizing notes' component
   */
  customStyle?: NotesCustomStyle;
  /**
   * @param style StyleProp of ViewStyle for styling the notes component
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & AccessibilityProps;

/**
 * Type object for Tags UI element props.
 * @param testID string value notes component custom name for test ID
 * @param size string value for identifying size of tags, sizes available are:
 * `lg`, `md`, and `sm`
 * @param label string value for displaying label of tags
 * @param labelStyle TypographyProps for customizing the style of tags' label
 * @param color string value for custom color of tag label
 * @param wrapped boolean value to tell if the width of the tags will be wrapped
 * in flex row
 * @param style StyleProp of ViewStyle for styling the tags component
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 * @see AccessibilityProps
 */
export type TagsProps = {
  /**
   * @param testID string value notes component custom name for test ID
   */
  testID?: string;
  /**
   * @param size string value for identifying size of tags, sizes available are:
   * `lg`, `md`, and `sm`
   */
  size?: 'lg' | 'md' | 'sm';
  /**
   * @param label string value for displaying label of tags
   */
  label: string;
  /**
   * @param labelStyle TypographyProps for customizing the style of tags' label
   */
  labelStyle?: TypographyProps;
  /**
   * @param color string value for custom color of tag label
   */
  color?: string;
  /**
   * @param wrapped boolean value to tell if the width of the tags will be wrapped
   * in flex row
   */
  wrapped?: boolean;
  /**
   * @param style StyleProp of ViewStyle for styling the tags component
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param theme Theme object used as a default fallback in case this component will
   * be used outside of ThemeProvider context
   */
  theme?: Theme;
} & AccessibilityProps;
