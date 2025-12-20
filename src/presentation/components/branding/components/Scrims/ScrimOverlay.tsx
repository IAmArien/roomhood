/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import { BlurView } from '@react-native-community/blur';
import React, { JSX, useCallback } from 'react';
import { Modal, StyleSheet , StyleProp , ViewStyle , Platform } from 'react-native';

import { ScrimOverlayModalProps, ScrimOverlayProps } from './types';


/**
 * Functional component for Scrim Overlay UI Element. Accepts props of the following:
 * `type`, `scrimPlacement`, `style`, `blurAmount`, `transparencyFallbackColor`.
 * @param props Type of ScrimOverlayProps
 * @see ScrimOverlayProps
 * @returns JSX Element for Scrim Overlay
 */
export const ScrimOverlay: React.FC<ScrimOverlayProps> = (
  props
): JSX.Element => {
  const {
    testID,
    type,
    isVisible = true,
    scrimPlacement = 'behind',
    style,
    blurAmount = 10,
    transparencyFallbackColor = '#0E2C4366',
    accessible = true,
    accessibilityLabel = 'scrim-overlay-accessibility-label',
    accessibilityRole = 'none',
    role = 'none',
    children,
    ...restProps
  } = props;

  const getBlurType = useCallback(() => {
    if (Platform.OS === 'ios') {
      if (type === 'dark') {
        return 'light';
      }
    }
    return type;
  }, [type]);

  const getStyle = useCallback((): StyleProp<ViewStyle> => {
    const iosBackgroundColor = () => {
      if (Platform.OS === 'ios') {
        if (type === 'dark') {
          return {
            backgroundColor: '#0E2C4366'
          };
        }
      }
      return undefined;
    };
    return [style, styles.default, iosBackgroundColor()];
  }, [style]);

  const getOverlayColor = useCallback(() => {
    if (Platform.OS === 'android') {
      if (type === 'dark') {
        return '#0E2C4366';
      }
    }
    return undefined;
  }, [type]);

  return (
    <>
      {scrimPlacement === 'top' && <>{children}</>}
      {isVisible && (
        <BlurView
          {...restProps}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          role={role}
          testID={testID}
          style={getStyle()}
          blurType={getBlurType()}
          blurAmount={blurAmount}
          overlayColor={getOverlayColor()}
          reducedTransparencyFallbackColor={transparencyFallbackColor}
        />
      )}
      {scrimPlacement === 'behind' && <>{children}</>}
    </>
  );
};

/**
 * Functional component for scrim overlay UI element but in modal approach. Accepts the
 * following props: `type`, `scrimPlacement`, `style`, `blurAmount`, `transparencyFallbackColor`,
 * `isVisible`, `onRequestClose`.
 * @param props Type of ScrimOverlayModalProps
 * @see ScrimOverlayModalProps
 * @returns JSX Element of scrim overlay but in modal
 */
export const ScrimOverlayModal: React.FC<ScrimOverlayModalProps> = (
  props
): JSX.Element => {
  const {
    isVisible,
    onRequestClose,
    testID,
    type,
    scrimPlacement = 'behind',
    style,
    blurAmount = 10,
    transparencyFallbackColor = 'white',
    accessible = true,
    accessibilityLabel = 'scrim-overlay-accessibility-label',
    accessibilityRole = 'none',
    role = 'none',
    children,
    ...restProps
  } = props;

  return (
    <Modal
      {...restProps}
      testID="scrim-overlay-modal"
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <ScrimOverlay
        {...restProps}
        testID={testID}
        type={type}
        scrimPlacement={scrimPlacement}
        style={style}
        blurAmount={blurAmount}
        transparencyFallbackColor={transparencyFallbackColor}>
        {children}
      </ScrimOverlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  default: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
