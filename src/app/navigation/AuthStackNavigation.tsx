/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Dashboard, OtpScreen, Profile, Search } from '@presentation/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactElement } from 'react';

import { AuthStackNavigator } from './types';
import { rightToLeftInterpolator } from './utils/stackInterpolator';

const Stack = createNativeStackNavigator<AuthStackNavigator>();

export default function AuthStackNavigation(): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false, ...rightToLeftInterpolator }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
}
