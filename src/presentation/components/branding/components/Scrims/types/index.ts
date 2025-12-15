/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { PropsWithChildren } from 'react';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

/**
 * Type object for scrim overlay props
 * @param testID string value for custom name for test ID
 * @param scrimPlacement string value to where the scrim background will be placed, choices
 * could be `top` or `behind`. By default is `behind`.
 * @param type string value for type of scrim blur to apply, either `dark` or `light`.
 * @param style StyleProp of ViewStyle for customizing the scrim overlay
 * @param blurAmount number value for estimating the blur of scrim, default value is 10
 * @param transparencyFallbackColor string value for fallback color of type scrim
 * @param isVisible boolean value to determine whether scrim should be visible or not
 */
export type ScrimOverlayProps = PropsWithChildren & {
  /**
   * @param testID string value for custom name for test ID
   */
  testID?: string;
  /**
   * @param scrimPlacement string value to where the scrim background will be placed, choices
   * could be `top` or `behind`. By default is `behind`.
   */
  scrimPlacement?: 'top' | 'behind';
  /**
   * @param type string value for type of scrim blur to apply, either `dark` or `light`.
   */
  type: 'dark' | 'light';
  /**
   * @param style StyleProp of ViewStyle for customizing the scrim overlay
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @param blurAmount number value for estimating the blur of scrim, default value is 10
   */
  blurAmount?: number;
  /**
   * @param transparencyFallbackColor string value for fallback color of type scrim
   */
  transparencyFallbackColor?: string;
  /**
   * @param isVisible boolean value to determine whether scrim should be visible or not
   */
  isVisible?: boolean;
} & AccessibilityProps;

/**
 * Type object for scrim overlay modal props
 * @param isVisible boolean value to tell if the modal is present or not
 * @param onRequestClose callback function to be triggered when pressing back button in
 * Android while modal is displayed
 */
export type ScrimOverlayModalProps = ScrimOverlayProps & {
  /**
   * @param isVisible boolean value to tell if the modal is present or not
   */
  isVisible: boolean;
  /**
   * callback function to be triggered when pressing back button in
   * Android while modal is displayed
   * @returns void
   */
  onRequestClose?: () => void;
} & AccessibilityProps;
