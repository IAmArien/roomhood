/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useTheme } from '@branding/provider';
import { ReactElement } from 'react';
import { View } from 'react-native';

import { DividerProps } from './types';

export const Divider: React.FC<DividerProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { testID, accessibilityLabel, accessible = false, style, ...restProps } = props;

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      style={[
        style,
        {
          height: 1,
          backgroundColor: colors.border.grey,
        },
      ]}
      {...restProps}
    />
  );
};
