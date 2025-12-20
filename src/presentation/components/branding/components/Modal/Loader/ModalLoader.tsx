/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

// @ts-ignore
import AnimatedLottieView from 'lottie-react-native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { ModalLoaderProps } from './types';
import { GENERIC_LOADER } from '../../../assets';
import { ScrimOverlay } from '../../Scrims/ScrimOverlay';

/**
 * Functional component for Modal Loader UI Element. Accepts props of the following:
 * `isVisible`, `testID`, `onRequestClose`, `customLoaderComponent`, `scrimOverlayProps`.
 * @param props Type of ModalLoaderProps
 * @see ModalLoaderProps
 * @returns JSX Element of Modal Loader UI Element
 */
export const ModalLoader: React.FC<ModalLoaderProps> = (props): JSX.Element => {
  const {
    testID,
    isVisible,
    loaderType = 'modal',
    onRequestClose,
    customLoaderComponent,
    absoluteContainerStyle,
    contentContainerStyle,
    scrimOverlayProps,
    accessible = true,
    accessibilityLabel = 'modal-loader-accessibility-label',
    accessibilityRole = 'alert',
    role = 'alertdialog',
    ...restProps
  } = props;
  const { component } = customLoaderComponent ?? {};

  const [loaderVisible, setLoaderVisible] = useState(false);

  const animatedLottieRef = useRef<AnimatedLottieView>(null);
  let timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const animatedLoaderContainer = useSharedValue(0);
  const animatedLoaderContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedLoaderContainer.value
    };
  });

  useEffect(() => {
    if (loaderType === 'absoluteView') {
      if (isVisible) {
        setLoaderVisible(true);
        animatedLoaderContainer.value = withTiming(1, { duration: 350 });
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
          animatedLottieRef.current?.play(0);
        }, 350);
      } else {
        animatedLoaderContainer.value = withTiming(0, { duration: 350 });
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
          setLoaderVisible(false);
        }, 350);
      }
    }
  }, [isVisible]);

  if (loaderType === 'absoluteView') {
    if (loaderVisible) {
      return (
        <Animated.View
          style={[
            styles.absoluteContainerDefaultLoader,
            animatedLoaderContainerStyle,
            absoluteContainerStyle
          ]}>
          <ScrimOverlay
            testID={testID}
            type={scrimOverlayProps?.type ?? 'light'}
            scrimPlacement={scrimOverlayProps?.scrimPlacement ?? 'behind'}
            style={scrimOverlayProps?.style}
            blurAmount={scrimOverlayProps?.blurAmount ?? 10}
            transparencyFallbackColor={
              scrimOverlayProps?.transparencyFallbackColor ?? 'white'
            }>
            {component?.() ?? (
              <View
                accessible
                accessibilityLabel="modal-loader-animated-lottie-accessibility-label"
                accessibilityRole="none"
                role="none"
                style={[
                  styles.loaderContainer,
                  styles.absoluteDefaultLoader,
                  contentContainerStyle
                ]}>
                <AnimatedLottieView
                  ref={animatedLottieRef}
                  testID={customLoaderComponent?.testID}
                  renderMode="AUTOMATIC"
                  autoPlay={false}
                  loop
                  source={GENERIC_LOADER}
                  style={{
                    height: 180,
                    width: 180
                  }}
                />
              </View>
            )}
          </ScrimOverlay>
        </Animated.View>
      );
    }
    return <></>;
  }

  return (
    <Modal
      {...restProps}
      testID="modal-loader"
      accessible={accessible}
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <ScrimOverlay
        testID={testID}
        type={scrimOverlayProps?.type ?? 'light'}
        scrimPlacement={scrimOverlayProps?.scrimPlacement ?? 'behind'}
        style={scrimOverlayProps?.style}
        blurAmount={scrimOverlayProps?.blurAmount ?? 10}
        transparencyFallbackColor={
          scrimOverlayProps?.transparencyFallbackColor ?? 'white'
        }>
        {component?.() ?? (
          <View
            accessible
            accessibilityLabel="modal-loader-animated-lottie-accessibility-label"
            accessibilityRole="none"
            role="none"
            style={[styles.loaderContainer, contentContainerStyle]}>
            <AnimatedLottieView
              testID={customLoaderComponent?.testID}
              autoPlay
              loop
              source={GENERIC_LOADER}
              style={{
                height: 180,
                width: 180
              }}
            />
          </View>
        )}
      </ScrimOverlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  absoluteContainerDefaultLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  absoluteDefaultLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
