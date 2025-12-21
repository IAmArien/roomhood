/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export interface IUseContentAnimation {
  containerAnimatedStyle: { opacity: number };
  textFieldAnimatedStyle: { top: number };
  buttonAnimatedStyle: { top: number };
  ssoDividerAnimatedStyle: { width: number };
  fbButtonAnimatedStyle: { transform: { scale: number }[] };
  ggButtonAnimatedStyle: { transform: { scale: number }[] };
  apButtonAnimatedStyle: { transform: { scale: number }[] };
}

export const useContentAnimation = (): IUseContentAnimation => {
  const containerAlphaSharedValue = useSharedValue(0);
  const textFieldSharedValue = useSharedValue(0);
  const buttonSharedValue = useSharedValue(24);
  const ssoDividerSharedValue = useSharedValue(300);
  const fbButtonSharedValue = useSharedValue(0);
  const ggButtonSharedValue = useSharedValue(0);
  const apButtonSharedValue = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerAlphaSharedValue.value,
  }));

  const textFieldAnimatedStyle = useAnimatedStyle(() => ({
    top: textFieldSharedValue.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    top: buttonSharedValue.value,
  }));

  const ssoDividerAnimatedStyle = useAnimatedStyle(() => ({
    width: ssoDividerSharedValue.value,
  }));

  const fbButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fbButtonSharedValue.value }],
  }));

  const ggButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ggButtonSharedValue.value }],
  }));

  const apButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: apButtonSharedValue.value }],
  }));

  useEffect(() => {
    containerAlphaSharedValue.value = withTiming(1);
    textFieldSharedValue.value = withSpring(-24);
    buttonSharedValue.value = withSpring(0);
    ssoDividerSharedValue.value = withSpring(230);
    const fbTo = setTimeout(() => (fbButtonSharedValue.value = withSpring(1)), 0);
    const ggTo = setTimeout(() => (ggButtonSharedValue.value = withSpring(1)), 150);
    const apTo = setTimeout(() => (apButtonSharedValue.value = withSpring(1)), 300);
    return () => {
      clearTimeout(fbTo);
      clearTimeout(ggTo);
      clearTimeout(apTo);
    };
  }, []);

  return {
    containerAnimatedStyle,
    textFieldAnimatedStyle,
    buttonAnimatedStyle,
    ssoDividerAnimatedStyle,
    fbButtonAnimatedStyle,
    ggButtonAnimatedStyle,
    apButtonAnimatedStyle,
  };
};
