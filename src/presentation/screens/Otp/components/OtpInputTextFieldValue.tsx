/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { OtpInputTextFieldValueProps } from '../types';

export const OtpInputTextFieldValue: React.FC<OtpInputTextFieldValueProps> = (
  props
): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors, properties } = theme;
  const { value } = props;

  const animatedBorderColorValue = useSharedValue<string>(colors.border.grey);
  const animatedBorderWidthValue = useSharedValue<number>(1);

  const animatedTextBoxBorder = useAnimatedStyle(() => ({
    borderColor: animatedBorderColorValue.value,
    borderWidth: animatedBorderWidthValue.value,
  }));

  useEffect(() => {
    switch (value.state) {
      case 'default':
        animatedBorderColorValue.value = withTiming(colors.border.grey);
        animatedBorderWidthValue.value = withTiming(1);
        break;
      case 'selection':
        animatedBorderColorValue.value = withTiming(colors.ui.primary);
        animatedBorderWidthValue.value = withTiming(2);
        break;
      case 'success':
        animatedBorderColorValue.value = withTiming(colors.functional.positive);
        animatedBorderWidthValue.value = withTiming(2);
        break;
      case 'error':
        animatedBorderColorValue.value = withTiming(colors.functional.negative);
        animatedBorderWidthValue.value = withTiming(2);
        break;
      case 'loading':
        animatedBorderColorValue.value = withTiming(colors.ui.primary);
        animatedBorderWidthValue.value = withTiming(2);
        break;
      default:
        animatedBorderColorValue.value = withTiming(colors.border.grey);
        animatedBorderWidthValue.value = withTiming(1);
        break;
    }
  }, [value.state]);

  return (
    <View accessible={false} style={styles.container}>
      <Animated.View
        style={[
          animatedTextBoxBorder,
          styles.valueContainer,
          {
            backgroundColor: colors.ui['pure-white'],
            borderRadius: properties.radius['less-round'],
          },
        ]}
      >
        <Typography variant="numbers" size="md" color={colors.text.clearest}>
          {value.value}
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
    overflow: 'hidden',
  },
  valueContainer: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
