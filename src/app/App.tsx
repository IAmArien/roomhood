/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Typography } from "@branding/components";
import { ThemeProvider } from "@branding/provider";
import { ReactElement } from "react";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ThemeProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <View>
          <Typography
            variant="title"
            size="bold-md">
            Hello World
          </Typography>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
