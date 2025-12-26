/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import {
  AccountOutlinedIcon,
  ChatOutlinedIcon,
  HomeOutlinedIcon,
  ManageOutlinedIcon,
  SearchOutlinedIcon,
} from '@assets/icons';
import { useTheme } from '@branding/provider';
import { Home } from '@presentation/screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import { DashboardBottomNavigator } from './types';

const Tab = createMaterialBottomTabNavigator<DashboardBottomNavigator>();

export default function DashboardBottomNavigation(): ReactElement {
  const theme = useTheme();

  const { colors } = theme;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor={colors.text.clear}
      activeColor={colors.ui.primary}
      activeIndicatorStyle={{ backgroundColor: 'transparent' }}
      shifting={false}
      barStyle={[
        styles.tabBar,
        {
          backgroundColor: colors.ui['pure-white'],
          borderTopWidth: 1,
          borderTopColor: colors.border.grey,
        },
      ]}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <HomeOutlinedIcon fillColor={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <SearchOutlinedIcon fillColor={color} />,
        }}
      />
      <Tab.Screen
        name="Manage"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <ManageOutlinedIcon fillColor={color} />,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <ChatOutlinedIcon fillColor={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <AccountOutlinedIcon fillColor={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 75,
  },
});
