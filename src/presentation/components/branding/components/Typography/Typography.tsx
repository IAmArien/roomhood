/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-nocheck
import React from 'react';
import { StyleProp, Text, TextStyle, Animated } from 'react-native';

import {
  TypographyVariant,
  TypographyPropsWithVariant,
  AnimatedTypographyPropsWithVariant,
} from './types';
import { useTheme } from '../../provider/ThemeProvider';

/**
 * Functional component for Typography UI Element. Accepts the following props:
 * `variant`, `size`, `color`, `style`, `customStyle`.
 * @param props Type of TypographyPropsWithVariant extends TypographyVariant
 * @see TypographyPropsWithVariant
 * @see TypographyVariant
 * @returns JSX Element of the Typography UI Element
 */
export const Typography = <T extends TypographyVariant>(props: TypographyPropsWithVariant<T>) => {
  const {
    testID,
    children,
    variant,
    size,
    style,
    color = '#282D33',
    customStyle,
    textAlign,
    theme,
    accessible = true,
    accessibilityRole = 'text',
    fontWeight,
    ...restProps
  } = props;
  const themeProps = useTheme();

  const { typography } = theme || themeProps;

  const getFontFamilyWeight = () => {
    let styles = {
      fontFamily: typography?.[variant]?.[size]?.fontFamily,
      fontWeight: typography?.[variant]?.[size]?.fontWeight,
    };
    switch (fontWeight) {
      case '600':
        styles = {
          fontFamily: typography.headline.lg.fontFamily,
          fontWeight: typography.headline.lg.fontWeight,
        };
        break;
      case '700':
        styles = {
          fontFamily: typography.headline.sm.fontFamily,
          fontWeight: typography.headline.sm.fontWeight,
        };
        break;
      case '800':
        styles = {
          fontFamily: typography.numbers.xs.fontFamily,
          fontWeight: typography.numbers.xs.fontWeight,
        };
        break;
      default:
        break;
    }

    return styles;
  };

  const defaultStyle = {
    ...typography?.[variant]?.[size],
    ...getFontFamilyWeight(),
    color: color,
    textAlign: textAlign,
  } as StyleProp<TextStyle>;

  return (
    <Text
      {...restProps}
      testID={testID}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={customStyle ?? [defaultStyle, style]}
    >
      {children}
    </Text>
  );
};
