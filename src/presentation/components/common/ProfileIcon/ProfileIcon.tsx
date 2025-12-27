/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useTheme } from '@branding/provider';
import { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ProfileIconProps } from './types';

export const ProfileIcon: React.FC<ProfileIconProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const {
    testID,
    accessibilityLabel,
    accessible = false,
    style,
    url,
    size = 56,
    onPress,
    ...restProps
  } = props;

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      style={[
        styles.container,
        {
          borderColor: colors.ui.primary,
        },
        style,
      ]}
      onPress={onPress}
      {...restProps}
    >
      <FastImage
        style={{
          borderRadius: 999,
          width: size,
          height: size,
        }}
        source={{
          uri: url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 2,
  },
});
