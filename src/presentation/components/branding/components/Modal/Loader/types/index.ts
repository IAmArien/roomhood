/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';
import { ScrimOverlayProps } from '../../../Scrims/types';

export type ModalLoaderType = 'modal' | 'absoluteView';

/**
 * Type object for custom modal loader component
 * @param component functional component for custom loader component
 * @param testID string value for custom name of test ID for custom loader
 */
export type CustomModalLoderComponentProps = {
  /**
   * functional component for custom loader component
   * @returns React.ReactNode
   */
  component?: () => React.ReactNode;
  /**
   * @param testID string value for custom name of test ID for custom loader
   */
  testID?: string;
};

/**
 * Type object for modal loader UI element props
 * @param testID string value for custom name of test ID for modal loader
 * @param isVisible boolean value to tell if modal will be visible or not
 * @param loaderType ModalLoaderType of either `modal` or `absoluteView`, tells the loader
 * what type of view to display, by default is `modal`.
 * @param onRequestClose callback function to be called when modal detects back button
 * on press
 * @param customLoaderComponent CustomModalLoderComponentProps for providing custom
 * modal loader component
 * @param absoluteContainerStyle StyleProp of ViewStyle for container of
 * the view that holds `loaderContainerStyle`
 * @param contentContainerStyle StyleProp of ViewStyle for container of loading view style
 * @param scrimOverlayProps ScrimOverlayProps for customizing the scrim overlay background
 * of the modal loader
 * @see ScrimOverlayProps
 */
export type ModalLoaderProps = {
  /**
   * @param testID string value for custom name of test ID for modal loader
   */
  testID?: string;
  /**
   * @param isVisible boolean value to tell if modal will be visible or not
   */
  isVisible: boolean;
  /**
   * @param loaderType ModalLoaderType of either `modal` or `absoluteView`, tells the loader
   * what type of view to display, by default is `modal`.
   */
  loaderType?: ModalLoaderType;
  /**
   * @param onRequestClose callback function to be called when modal detects back button
   * on press
   * @returns void
   */
  onRequestClose?: () => void;
  /**
   * @param customLoaderComponent CustomModalLoderComponentProps for providing custom
   * modal loader component
   */
  customLoaderComponent?: CustomModalLoderComponentProps;
  /**
   * @param absoluteContainerStyle StyleProp of ViewStyle for container of
   * the view that holds `loaderContainerStyle`
   */
  absoluteContainerStyle?: StyleProp<ViewStyle>;
  /**
   * @param contentContainerStyle StyleProp of ViewStyle for container of loading view style
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * @param scrimOverlayProps ScrimOverlayProps for customizing the scrim overlay background
   * of the modal loader
   */
  scrimOverlayProps?: ScrimOverlayProps;
} & AccessibilityProps;
