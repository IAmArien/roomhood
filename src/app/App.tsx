/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { MainNavigation } from '@app/navigation';
import { extendTheme, ThemeProvider } from '@branding/provider';
import { NavigationContainer } from '@react-navigation/native';
import { ReactElement } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppContextProvider } from './context';

export default function App(): ReactElement {
  const theme = extendTheme({
    colors: {
      ui: {
        primary: '#706bfa',
        secondary: '#9c99f7',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.gestureContainer}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <MainNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
