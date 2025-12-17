/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from 'react';
import {
  AccessibilityProps,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import { Theme } from '../../../../types/Theme';
import { ButtonPropsWithType } from '../../../FormControl/components/Button/types';
import { ScrimOverlayProps } from '../../../Scrims/types';
import { TypographyProps } from '../../../Typography/types';

/**
 * Type object for modal dialog overlay
 * @param overlayTestID string value for custom name of testID
 * @param onOverlayClick function callback when overlay of the modal dialog was clicked.
 * @param onRequestClose function callback being triggered if back button was called in
 * Android while modal is displayed
 */
export type ModalDialogOverlay = {
  /**
   * @param overlayTestID string value for custom name of testID
   */
  overlayTestID?: string;
  /**
   * @param onOverlayClick function callback when overlay of the modal dialog was clicked.
   * @returns void
   */
  onOverlayClick?: () => void;
  /**
   * @param onRequestClose function callback being triggered if back button was called in
   * Android while modal is displayed
   * @returns void
   */
  onRequestClose?: () => void;
};

/**
 * Type object for the illustration of the dialog
 * @param illustration function callback that returns a ReactElement
 */
export type ModalDialogIllustration = {
  /**
   * @param illustration function callback that returns a ReactElement
   * @returns ReactElement
   */
  illustration?: () => ReactElement;
};

/**
 * Type object for modal dialog buttons
 * @param disabled boolean value that tells if the buttons will be in disabled state
 * @param testID string value for custom name of testID
 * @param title string value for the title of the modal dialog
 * @param onPress callback function being called if the the modal button was pressed
 * @param buttonProps ButtonPropsWithType of standard or pill for customizing the
 * type of button
 */
export type ModalDialogButtons = {
  /**
   * @param disabled boolean value that tells if the buttons will be in disabled state
   */
  disabled?: boolean;
  /**
   * @param testID string value for custom name of testID
   */
  testID?: string;
  /**
   * @param title string value for the title of the modal dialog
   */
  title: string;
  /**
   * @param onPress callback function being called if the the modal button was pressed
   * @returns void
   */
  onPress?: () => void;
  /**
   * @param buttonProps ButtonPropsWithType of standard or pill for customizing the
   * type of button
   */
  buttonProps?: ButtonPropsWithType<'standard' | 'pill'>;
};

/**
 * Type object for Modal Dialog UI element props.
 * @param testID string value for custom name of testID
 * @param isVisible boolean value that tells if the dialog will be visible or not
 * @param vertical boolean value that tells if the alignment of buttons is vertical
 * or horizontal
 * @param overlayType string value if what type of overlay will be used for modal dialog
 * @param scrimOverlayProps ScrimOverlayModalProps for customizing the props of
 * scrim overlay
 * @param title string value for the title of the modal dialog
 * @param titleStyle object value for customizing the style of the title
 * @param titleStyleProps TypographyProps type for customizing the entire title typography
 * @param titleIcon react element value for displaying modal title icon
 * @param titleIconAlignment string value for aligning the title icon of the modal
 * @param titleIconStyle StyleProp of ViewStyle for customizing the icon container style
 * @param titleIconVisible boolean value that tells if the title icon will be visible
 * @param description string value for the description of the modal dialog
 * @param descriptionStyle object value for customizing the the style of the
 * description
 * @param descriptionStyleProps TypographyProps type for customizing the entire
 * description typography
 * @param positiveButton object element value for displaying the positive button of
 * the modal dialog
 * @param neutralButton object element value for displaying the neutral button of
 * the modal dialog
 * @param negativeButton object element value for displaying the positive button of
 * the modal dialog
 * @param buttonGroupStyle StyleProp of ViewStyle for customizing the button group of
 * modal dialog
 * @param position string value for customizing the default position of the dialog,
 * the default is `bottom`
 * @param style StyleProp of ViewStyle for customizing the dialog's style
 * @param theme Theme object used as a default fallback in case this component will
 * be used outside of ThemeProvider context
 * @param lottieIllustration Animated Lottie View component used for animated modals
 * @param illustrationStyle StyleProp of ViewStyle for customizing the dialog's
 * illustration style
 * @param customContent for applying custom component for modal dialog, adding this will
 * override the description of the modal
 */
export type ModalDialogProps = ModalDialogOverlay &
  ModalDialogIllustration & {
    /**
     * @param testID string value for custom name of testID
     */
    testID?: string;
    /**
     * @param isVisible boolean value that tells if the dialog will be visible or not
     */
    isVisible: boolean;
    /**
     * @param vertical boolean value that tells if the alignment of buttons is vertical
     * or horizontal
     */
    vertical?: boolean;
    /**
     * @param overlayType string value if what type of overlay will be used for modal dialog
     */
    overlayType?: 'blur' | 'dim';
    /**
     * @param scrimOverlayProps ScrimOverlayModalProps for customizing the props of
     * scrim overlay
     */
    scrimOverlayProps?: ScrimOverlayProps;
    /**
     * @param title string value for the title fo the modal dialog
     */
    title?: string;
    /**
     * @param titleTestID string value for custom name of testID
     */
    titleTestID?: string;
    /**
     * @param titleStyle object value for customizing the style of the title
     */
    titleStyle?: TextStyle;
    /**
     * @param titleStyleProps TypographyProps type for customizing the entire title typography
     */
    titleStyleProps?: TypographyProps;
    /**
     * @param titleIcon react element value for displaying modal title icon
     */
    titleIcon?: ReactElement;
    /**
     * @param titleIconAlignment string value for aligning the title icon of the modal
     */
    titleIconAlignment?: 'top' | 'middle' | 'bottom';
    /**
     * @param titleIconStyle StyleProp of ViewStyle for customizing the icon container style
     */
    titleIconStyle?: StyleProp<ViewStyle>;
    /**
     * @param titleIconVisible boolean value that tells if the title icon will be visible
     */
    titleIconVisible?: boolean;
    /**
     * @param description string value for the description of the modal dialog
     */
    description?: string;
    /**
     * @param descriptionTestID string value for custom name of testID
     */
    descriptionTestID?: string;
    /**
     * @param descriptionStyle object value for customizing the style of the
     * description
     */
    descriptionStyle?: TextStyle;
    /**
     * @param descriptionStyleProps TypographyProps type for customizing the entire
     * description typography
     */
    descriptionStyleProps?: TypographyProps;
    /**
     * @param positiveButton object element value for displaying the positive button of
     * the modal dialog
     */
    positiveButton?: ModalDialogButtons;
    /**
     * @param negativeButton object element value for displaying the positive button of
     * the modal dialog
     */
    negativeButton?: ModalDialogButtons;
    /**
     * @param buttonGroupStyle StyleProp of ViewStyle for customizing the button group of
     * modal dialog
     */
    buttonGroupStyle?: StyleProp<ViewStyle>;
    /**
     * @param position string value for customizing the default position of the dialog,
     * the default is `bottom`
     */
    position?: 'top' | 'center' | 'bottom';
    /**
     * @param style StyleProp of ViewStyle for customizing the dialog's style
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @param theme Theme object used as a default fallback in case this component will
     * be used outside of ThemeProvider context
     */
    theme?: Theme;
    /**
     * @param illustrationStyle StyleProp of ViewStyle for customizing the dialog's
     * illustration style
     */
    illustrationStyle?: StyleProp<ViewStyle>;
    /**
     * @param customContent for applying custom component for modal dialog, adding this will
     * override the description of the modal
     * @returns React.ReactNode
     */
    customContent?: () => React.ReactNode;
  } & AccessibilityProps;
