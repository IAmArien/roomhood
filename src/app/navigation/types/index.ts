/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpScreenPropsWithType, OtpType } from 'presentation/screens/Otp/types';
import { SignUpProps } from 'presentation/screens/SignUp/types';

export type MainStackNavigator = {
  NoAuthStack: NavigatorScreenParams<NoAuthStackNavigator>;
  AuthStack: NavigatorScreenParams<AuthStackNavigator>;
};

export type NoAuthStackNavigator = {
  Login: undefined;
  SignUp: SignUpProps;
  ForgotPassword: undefined;
};

export type AuthStackNavigator = {
  Dashboard: NavigatorScreenParams<DashboardBottomNavigator>;
  Search: undefined;
  Profile: undefined;
  OtpScreen: OtpScreenPropsWithType<OtpType>;
};

export type DashboardBottomNavigator = {
  Home: undefined;
  Search: undefined;
  Manage: undefined;
  Chats: undefined;
  Profile: undefined;
};

export type AppNavigation = NativeStackScreenProps<MainStackNavigator>['navigation'];

export type SignUpRouteProp = RouteProp<NoAuthStackNavigator, 'SignUp'>;

export type OtpScreenRouteProp = RouteProp<AuthStackNavigator, 'OtpScreen'>;
