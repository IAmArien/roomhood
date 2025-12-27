/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';

import { TagsProps } from './types';
import { useTheme } from '../../provider/ThemeProvider';
import { Typography } from '../Typography/Typography';

/**
 * Functional component for Tags UI Element. Accepts props of the following: `testID`,
 * `size`, `label`, `labelStyle`, `wrapped`, and `style`.
 * ```
 * <Tags size="lg" label="TAG NAME" />
 * <Tags size="md" label="TAG NAME" wrapped={false} />
 * <Tags size="sm" label="TAG NAME" style={{ backgroundColor: 'red' }} />
 * ```
 * @param props Type of TagsProps
 * @see TagsProps
 * @returns JSX Element of Tags UI Element
 */
export const Tags: React.FC<TagsProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors, properties } = theme;
  const {
    testID,
    size = 'md',
    label,
    labelStyle,
    color,
    wrapped = true,
    style,
    accessible = true,
    accessibilityLabel = 'tags-view-accessibility-label',
    accessibilityRole = 'none',
    role = 'none',
    ...restProps
  } = props;

  const tagStyle = {
    lg: styles.large,
    md: styles.medium,
    sm: styles.small,
  };

  return (
    <View style={[wrapped && { flexDirection: 'row' }]}>
      <View
        {...restProps}
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        role={role}
        style={[
          tagStyle[size],
          {
            borderRadius: properties.radius['less-round'],
            backgroundColor: colors.ui['steel-grey'],
          },
          style,
        ]}
      >
        <Typography
          accessible
          variant="overline"
          size={size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'}
          color={color ?? colors.ui.tertiary}
          style={{ textTransform: 'uppercase' }}
          {...labelStyle}
        >
          {label}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  large: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
