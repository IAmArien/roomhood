/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoAuthStackNavigator } from "./types";
import { ReactElement } from "react";
import { ForgotPassword, Login, SignUp } from "@presentation/screens";

const Stack = createNativeStackNavigator<NoAuthStackNavigator>();

export default function NoAuthStackNavigation(): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};
