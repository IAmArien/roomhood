/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReactElement } from 'react';

import AuthStackNavigation from './AuthStackNavigation';
import NoAuthStackNavigation from './NoAuthStackNavigation';
import { MainStackNavigator } from './types';
import { rightToLeftInterpolator } from './utils/stackInterpolator';

const Stack = createNativeStackNavigator<MainStackNavigator>();

export default function MainNavigation(): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="NoAuthStack"
      screenOptions={{ headerShown: false, ...rightToLeftInterpolator }}
    >
      <Stack.Screen name="NoAuthStack" component={NoAuthStackNavigation} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigation} />
    </Stack.Navigator>
  );
}
