/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigator } from "@app/hooks";
import { FormProvider, Header, IFormControl, useForm } from "@branding/components";
import { useTheme } from "@branding/provider";
import { ReactElement, useRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function SignUp(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();

  const { colors } = theme;

  const scrollViewRef = useRef<ScrollView | null>(null);

  const form = useForm<string, IFormControl<string>[]>();

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const handleFormSubmit = () => {};

  const handleHeaderLeftIconPress = () => navigator.goBack();

  return (
    <FormProvider {...form} onSubmit={handleFormSubmit}>
      <View
        testID="signup-container"
        accessibilityLabel="signup-container"
        accessible={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.ui["pure-white"]
          }
        ]}>
        <Header
          testID="signup-header"
          title="Create an account"
          titleTestID="signup-header-title"
          type="back"
          headerLeftIconTestID="signup-header-left-icon"
          onHeaderLeftIconPress={handleHeaderLeftIconPress}
          style={styles.header}
        />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              ref={scrollViewRef}
              testID="signup-scroll-container"
              accessibilityLabel="signup-scroll-container"
              accessible={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}>
              <View style={styles.contentContainer} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});
