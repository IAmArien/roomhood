/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useTheme } from '@branding/provider';
import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { RoomMatesPreviewProps } from './types';

export const RoomMatesPreview: React.FC<RoomMatesPreviewProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { style } = props;

  return (
    <View
      testID=""
      accessibilityLabel=""
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui['pure-white'],
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
