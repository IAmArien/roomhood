/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainStackNavigator = {
  NoAuthStack: NavigatorScreenParams<NoAuthStackNavigator>;
  AuthStack: NavigatorScreenParams<AuthStackNavigator>;
};

export type NoAuthStackNavigator = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthStackNavigator = {
  Dashboard: undefined;
  Search: undefined;
  Profile: undefined;
};

export type AppNavigation = NativeStackScreenProps<MainStackNavigator>['navigation'];
