/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useTheme } from '@branding/provider';
import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Home(): ReactElement {
  const theme = useTheme();

  const { colors } = theme;

  return (
    <View
      testID="home-container"
      accessibilityLabel="home-container"
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui['pure-white'],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
});
