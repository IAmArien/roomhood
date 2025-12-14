/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigator } from "@app/hooks";
import { ForgotPasswordIcon, HelpOutlinedIcon } from "@assets/icons";
import { Button, FormProvider, Header, IFormControl, TextField, Typography, useForm, useFormControl } from "@branding/components";
import { useTheme } from "@branding/provider";
import { isEmailAddressValid } from "@utils";
import { ReactElement } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function ForgotPassword(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();
  const { colors } = theme;
  
  const form = useForm<string, IFormControl<string>[]>();

  const emailTextField = useFormControl<string>("email", {
    validations: {
      validationTrigger: 'onTextChange',
      required: true,
      customValidation(controlValue) {
        return {
          valid: isEmailAddressValid(controlValue ?? ''),
          message: 'Invalid Email Address.'
        }
      }
    }
  });

  const handleSendResetLink = () => form.formRef.current?.submit?.();

  const handleFormSubmit = () => {};

  const handleHeaderLeftIconPress = () => {
    navigator.goBack();
  };

  const handleHeaderActionIconPress = () => {};

  const keyboardBehavior = () => Platform.OS === 'ios' ? 'padding' : 'height';

  const disableSendResetLink = !form.formState.isValid;

  return (
    <FormProvider {...form} onSubmit={handleFormSubmit}>
      <View
        testID="forgot-password-container"
        accessibilityLabel="forgot-password-container"
        accessible={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.ui["pure-white"]
          }
        ]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior()}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <Header
                testID="forgot-password-header"
                type="close"
                title="Forgot Password"
                titleTestID="forgot-password-header-title"
                headerLeftIconTestID="forgot-password-header-left-icon"
                onHeaderLeftIconPress={handleHeaderLeftIconPress}
                style={styles.header}
                headerActions={[
                  {
                    testID: 'header-help-icon',
                    icon: <HelpOutlinedIcon />,
                    onPress: handleHeaderActionIconPress
                  }
                ]}
              />
              <View
                testID="forgot-password-content-container"
                accessibilityLabel="forgot-password-content-container"
                accessible={false}
                style={styles.contentContainer}>
                <View style={{ marginTop: 16 }}>
                  <View style={styles.lgContainer}>
                    <ForgotPasswordIcon />
                  </View>
                  <View style={{ marginTop: 24 }}>
                    <Typography
                      variant="description"
                      size="md"
                      color={colors.text.clearest}>
                      Please enter your email address to send the password reset link.
                    </Typography>
                    <TextField
                      testID="email-textfield"
                      accessibilityLabel="email-textfield"
                      label="Email Address"
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      {...emailTextField}
                    />
                    <Button
                      testID="btn-forgot-password"
                      type="standard"
                      variant="primary"
                      size="md"
                      title="Send Reset Link"
                      disabled={disableSendResetLink}
                      onPress={handleSendResetLink}
                      ripplePosition="on-tap"
                      style={{ marginTop: 30 }}
                    />
                  </View>
                </View>
              </View>
            </View>
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
  contentContainer: {
    paddingHorizontal: 16,
    gap: 8,
    flex: 1
  },
  lgContainer: {
    alignSelf: 'center',
    marginTop: 24
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8
  }
});
