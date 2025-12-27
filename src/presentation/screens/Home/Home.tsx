/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { DrawerNavigationIcon, NotificationsOutlinedIcon } from '@assets/icons';
import { Header } from '@branding/components';
import { useTheme } from '@branding/provider';
import { MOCK_TASKS_PREVIEW_ITEMS } from '@data/mocks';
import { BillsReminderPreview, RoomMatesPreview, TasksPreview } from '@presentation/components';
import { ReactElement, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

/**
 * Home displays
 * - Reminder of Payments (either Split Bill) or Bills (for Water, Electricity, etc.)
 * - Current or upcoming Tasks / Chores
 * - Shared Calendar
 * - House Rules and Agreement (if haven't agreed yet)
 * @returns ReactElement
 */
export default function Home(): ReactElement {
  const theme = useTheme();

  const { colors } = theme;

  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <View
      testID="home-container"
      accessibilityLabel="home-container"
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface['cool-white'],
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
      <ScrollView
        ref={scrollViewRef}
        testID="home-scroll-container"
        accessibilityLabel="home-scroll-container"
        accessible={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <View style={{ gap: 8 }}>
          <RoomMatesPreview theme={theme} style={styles.roomMateProfileContainer} />
          <BillsReminderPreview theme={theme} />
          <TasksPreview data={MOCK_TASKS_PREVIEW_ITEMS} theme={theme} />
        </View>
      </ScrollView>
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
  roomMateProfileContainer: {
    marginTop: 8,
  },
});
