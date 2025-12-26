/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { DrawerNavigationIcon, HelpOutlinedIcon, NotificationsOutlinedIcon } from '@assets/icons';
import { Header } from '@branding/components';
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
    >
      <Header
        testID="home-header"
        type="close"
        icon={<DrawerNavigationIcon />}
        titleTestID="home-header-title"
        headerLeftIconTestID="home-header-left-icon"
        onHeaderLeftIconPress={() => {}}
        style={styles.header}
        headerActions={[
          {
            testID: 'header-notifications-icon',
            icon: <NotificationsOutlinedIcon />,
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});
