/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { JSX, useCallback, useMemo } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle, StyleProp } from 'react-native';

import { ButtonPropsWithType, ButtonType } from './types';
import { useTheme } from '../../../../provider/ThemeProvider';
import { Ripple } from '../../../Effects';
import { Typography } from '../../../Typography/Typography';

const defaultStyle = {
  paddingHorizontal: {
    standard: 16,
    pill: 20,
  },
  paddingVertical: {
    standard: {
      sm: 8,
      md: 14,
      lg: 22,
    },
    pill: {
      sm: 8,
      md: 14,
      lg: 20,
    },
  },
};

export const Button = <T extends ButtonType>(props: ButtonPropsWithType<T>): JSX.Element => {
  const {
    buttonRef,
    type,
    variant,
    size,
    title,
    icon,
    iconPlacement = 'right',
    badgeNumber = undefined,
    badgePlacement = 'right',
    testID,
    onPress,
    disabled = false,
    style,
    rippleContainerStyle,
    rippleColor,
    ripplePosition = 'center',
    textProps,
    textAlign = 'center',
    textStyle,
    theme,
    accessible = true,
    accessibilityLabel = 'button-accessibility-label',
    accessibilityRole = 'button',
    accessibilityState = { disabled },
    role = 'button',
    ...restProps
  } = props;

  const defaultTheme = useTheme();
  const { colors, properties } = theme ?? defaultTheme;

  const radius = useMemo(
    () => ({
      standard: {
        sm: properties.radius.round,
        md: properties.radius.round,
        lg: properties.radius.round,
      },
      pill: {
        sm: properties.radius.roundest,
        md: properties.radius.roundest,
        lg: 60,
      },
    }),
    []
  );

  const getTextStyle = useCallback((): TextStyle => {
    if (disabled) {
      return {
        color: colors.text.ghost,
      };
    }
    switch (variant) {
      case 'primary':
        return {
          color: colors.text.white,
        };
      case 'outlined':
        return {
          color: colors.ui.primary,
        };
      case 'secondary':
        return {
          color: colors.text.clearest,
        };
      case 'whisper':
        return {
          color: colors.ui.primary,
        };
      default:
        return {
          color: colors.text.white,
        };
    }
  }, [disabled, variant]);

  const getRippleColor = useCallback((): string | undefined => {
    if (disabled) {
      return colors.functional.disabled;
    }
    if (rippleColor) {
      return rippleColor;
    } else {
      switch (variant) {
        case 'primary':
          return '#F0F0F0CC';
        case 'outlined':
          return '#007EDA33';
        case 'secondary':
          return '#F0F0F0CC';
        case 'whisper':
          return '#007EDA33';
        default:
          return '#F0F0F0CC';
      }
    }
  }, [disabled, rippleColor, variant]);

  const getButtonStyle = useCallback((): ViewStyle => {
    if (disabled) {
      return {
        borderRadius: radius[type][size],
        backgroundColor: colors.functional.disabled,
        borderWidth: 0,
        borderColor: colors.functional.disabled,
        paddingHorizontal: defaultStyle.paddingHorizontal[type],
        paddingVertical: defaultStyle.paddingVertical[type][size],
      };
    }
    switch (variant) {
      case 'primary':
        return {
          borderRadius: radius[type][size],
          backgroundColor: colors.ui.primary,
          borderWidth: 0,
          borderColor: colors.ui.primary,
          paddingHorizontal: defaultStyle.paddingHorizontal[type],
          paddingVertical: defaultStyle.paddingVertical[type][size],
        };
      case 'outlined':
        return {
          borderRadius: radius[type][size],
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.ui.primary,
          paddingHorizontal: defaultStyle.paddingHorizontal[type],
          paddingVertical: defaultStyle.paddingVertical[type][size],
        };
      case 'secondary':
        return {
          borderRadius: radius[type][size],
          backgroundColor: colors.ui['steel-grey'],
          borderWidth: 0,
          borderColor: colors.ui['steel-grey'],
          paddingHorizontal: defaultStyle.paddingHorizontal[type],
          paddingVertical: defaultStyle.paddingVertical[type][size],
        };
      case 'whisper':
        return {
          borderRadius: radius[type][size],
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
          paddingHorizontal: defaultStyle.paddingHorizontal[type],
          paddingVertical: defaultStyle.paddingVertical[type][size],
        };
      default:
        return {
          borderRadius: radius[type][size],
          paddingHorizontal: defaultStyle.paddingHorizontal[type],
          paddingVertical: defaultStyle.paddingVertical[type][size],
        };
    }
  }, [disabled, variant, type, size]);

  const renderBadge = () => {
    const badgeStyle: StyleProp<ViewStyle> = [
      {
        backgroundColor: colors.ui.secondary,
        borderRadius: properties.radius.rounder,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        minWidth: 19,
        minHeight: 20,
      },
    ];
    return (
      <View style={badgeStyle}>
        <Typography variant="interactions" size="sm" style={{ fontSize: 9 }} color={'#FFFFFF'}>
          {badgeNumber}
        </Typography>
      </View>
    );
  };

  return (
    <Ripple
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      accessibilityRole={accessibilityRole}
      role={role}
      rippleRef={buttonRef}
      ripplePosition={ripplePosition}
      rippleColor={getRippleColor()}
      disabled={disabled}
      containerStyle={rippleContainerStyle}
      onPress={onPress}
      style={[getButtonStyle(), styles.button, style]}
      {...restProps}
    >
      {iconPlacement === 'left' && <>{icon}</>}
      {badgePlacement === 'left' && badgeNumber !== undefined && <>{renderBadge()}</>}
      <Typography
        testID={`${testID}-typography`}
        theme={theme}
        textAlign={textAlign}
        style={textStyle}
        numberOfLines={2}
        variant="interactions"
        size="lg"
        color={getTextStyle().color as string}
        {...textProps}
      >
        {title}
      </Typography>
      {iconPlacement === 'right' && <>{icon}</>}
      {badgePlacement === 'right' && badgeNumber !== undefined && <>{renderBadge()}</>}
    </Ripple>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
