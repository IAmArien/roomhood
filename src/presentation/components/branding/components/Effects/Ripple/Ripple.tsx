/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

import { RippleProps } from './types';

export const Ripple: React.FC<RippleProps> = (props): JSX.Element => {
  const {
    rippleRef,
    testID,
    disabled = false,
    onPress,
    containerStyle,
    style,
    ripplePosition,
    rippleColor = '#007EDA33',
    children,
    accessibilityLabel = 'ripple-effect',
    accessibilityState = {
      disabled: disabled,
    },
    ...restProps
  } = props;

  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const viewRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const isEnabled = (): boolean => !disabled;

  const tapGesture = Gesture.Tap()
    .enabled(isEnabled())
    .onStart(event => {
      'worklet';
      const layout = measure(viewRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;

        if (ripplePosition === 'center') {
          centerX.value = layout.width / 2;
          centerY.value = layout.height / 2;
        } else {
          centerX.value = event.x;
          centerY.value = event.y;
        }

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 700 });
      }
    })
    .onEnd(e => {
      'worklet';
      rippleOpacity.value = withTiming(0);
      if (onPress) {
        runOnJS(onPress)(e);
      }
    });

  const animatedRippleStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundColor: rippleColor,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      width: circleRadius * 2,
      height: circleRadius * 2,
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
    };
  });

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      ref={viewRef}
      style={containerStyle}
      {...restProps}
    >
      <GestureDetector gesture={tapGesture}>
        <Animated.View ref={rippleRef} style={[style, styles.container]}>
          {children}
          <Animated.View style={animatedRippleStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
