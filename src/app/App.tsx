/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { MainNavigation } from "@app/navigation";
import { ThemeProvider } from "@branding/provider";
import { NavigationContainer } from "@react-navigation/native";
import { ReactElement } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContextProvider } from "./context";

export default function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ThemeProvider>
      <AppContextProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </AppContextProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
