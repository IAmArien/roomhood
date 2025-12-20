/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

// @ts-ignore
import React from 'react';
import { Children, PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
  StyleProp
} from 'react-native';

/**
 * Type object for button group props
 * @param orientation string value if the button groups will be in column / row direction
 * @param style ViewStyle value for customizing the button group's style
 */
export type ButtonGroupProps = {
  /**
   * @param testID string value for custom name of test ID for button group
   */
  testID?: string;
  /**
   * @param orientation string value if the button groups will be in column / row direction
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * @param style ViewStyle value for customizing the button group's style
   */
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren &
  AccessibilityProps;

/**
 * Functional component for Button Groups. Accepts props of the following: `orientation`,
 * `style`.
 * @param props Type of ButtonGroupProps
 * @see ButtonGroupProps
 * @returns JSX Element of Button Group UI Element
 */
export const ButtonGroup = ({
  testID,
  style,
  orientation = 'horizontal',
  children,
  ...restProps
}: ButtonGroupProps) => {
  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel="button-group-accessibility-label"
      accessibilityRole="none"
      role="none"
      {...restProps}
      style={[orientation === 'vertical' ? styles.column : styles.row, style]}>
      {Children.map(children, (child, index) => {
        if (child) {
          return (
            <View
              key={index}
              style={[orientation === 'horizontal' && styles.container]}>
              {child}
            </View>
          );
        }
        return <></>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  container: {
    flex: 1
  }
});
