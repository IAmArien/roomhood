/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { AppleIcon, FacebookIcon, GoogleIcon, LoginHeaderLogo } from "@assets/icons";
import { Button, FormProvider, IFormControl, TextField, Typography, useForm, useFormControl } from "@branding/components";
import { useTheme } from "@branding/provider";
import { ReactElement, useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useContentAnimation } from "./hooks/useContentAnimation";
import { LoginSSOType } from "./types";
import { SSOButton } from "./components/SSOButton";
import { useNavigator } from "@app/hooks";
import { isEmailAddressValid } from "@utils";

export default function Login(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();
  const { colors } = theme;

  const scrollViewRef = useRef<ScrollView | null>(null);

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
      },
    }
  });
  const passwordTextField = useFormControl<string>("password", {
    validations: {
      validationTrigger: 'onTextChange',
      required: true
    }
  });

  const {
    containerAnimatedStyle,
    textFieldAnimatedStyle,
    buttonAnimatedStyle,
    ssoDividerAnimatedStyle,
    fbButtonAnimatedStyle,
    ggButtonAnimatedStyle,
    apButtonAnimatedStyle
  } = useContentAnimation();

  const handleLoginPress = () => form.formRef.current?.submit?.();

  const handleForgotPasswordPress = () => navigator.navigate('NoAuthStack', {
    screen: 'ForgotPassword'
  });

  const handleSSOLogin = (type: LoginSSOType) => {};

  const handleFormSubmit = () => {};

  const disableLoginButton = !form.formState.isValid;

  return (
    <FormProvider {...form} onSubmit={handleFormSubmit}>
      <ScrollView
        testID="login-scroll-container"
        accessibilityLabel="login-scroll-container"
        accessible={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={[
          styles.container,
          {
            backgroundColor: colors.ui["pure-white"]
          }
        ]}>
        <Animated.View
          testID="login-content-container"
          accessible={false}
          style={[containerAnimatedStyle, styles.contentContainer]}>
          {/** LOGIN ILLUSTRATION */}
          <View style={styles.lgContainer}>
            <LoginHeaderLogo width={300} height={300} />
          </View>
          {/** LOGIN ILLUSTRATION */}
          {/** TEXT FIELDS FOR EMAIL AND PASSWORD */}
          <Animated.View style={textFieldAnimatedStyle}>
            <TextField
              testID="email-textfield"
              accessibilityLabel="email-textfield"
              label="Email Address"
              autoCapitalize="none"
              textContentType="emailAddress"
              {...emailTextField}
            />
            <TextField
              testID="password-textfield"
              accessibilityLabel="password-textfield"
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              label="Password"
              {...passwordTextField}
            />
            <View style={styles.fpContainer}>
              <Pressable accessible={false} onPress={handleForgotPasswordPress}>
                <Typography
                  variant="interactions"
                  size="md"
                  color={colors.ui.primary}>
                  Forgot Password?
                </Typography>
              </Pressable>
            </View>
          </Animated.View>
          {/** TEXT FIELDS FOR EMAIL AND PASSWORD */}
          {/** LOGIN BUTTON */}
          <Animated.View style={buttonAnimatedStyle}>
            <Button
              testID="btn-login"
              type="standard"
              variant="primary"
              size="md"
              title="Login"
              onPress={handleLoginPress}
              ripplePosition="on-tap"
              disabled={disableLoginButton}
              style={{ marginTop: 30 }}
            />
          </Animated.View>
          {/** LOGIN BUTTON */}
          {/** LOGIN WITH OPTIONS */}
          <View style={styles.lwContainer}>
            <View style={styles.lwContentContainer}>
              <Animated.View
                style={[
                  ssoDividerAnimatedStyle,
                  styles.lwDivider,
                  {
                    backgroundColor: colors.border.grey
                  }
                ]}
              />
              <Typography
                variant="overline"
                size="sm"
                color={colors.border.grey}
                style={{
                  backgroundColor: colors.ui["pure-white"],
                  paddingHorizontal: 12
                }}>
                OR CONTINUE WITH
              </Typography>
            </View>
            {/** SSO LOGIN BUTTONS */}
            <View style={styles.ssoContainer}>
              <View style={styles.ssoContentContainer}>
                <Animated.View style={fbButtonAnimatedStyle}>
                  <SSOButton
                    type="FACEBOOK"
                    onPress={handleSSOLogin}
                    icon={<FacebookIcon />}
                  />
                </Animated.View>
                <Animated.View style={ggButtonAnimatedStyle}>
                  <SSOButton
                    type="GOOGLE"
                    onPress={handleSSOLogin}
                    icon={<GoogleIcon />}
                  />
                </Animated.View>
                <Animated.View style={apButtonAnimatedStyle}>
                  <SSOButton
                    type="APPLE"
                    onPress={handleSSOLogin}
                    icon={<AppleIcon />}
                  />
                </Animated.View>
              </View>
            </View>
            {/** SSO LOGIN BUTTONS */}
          </View>
          {/** LOGIN WITH OPTIONS */}
        </Animated.View>
      </ScrollView>
      {/** FOOTER CONTENT */}
      <View
        testID="login-footer-container"
        accessibilityLabel="login-footer-container"
        accessible={false}
        style={[
          styles.footerContainer,
          {
            backgroundColor: colors.ui["pure-white"]
          }
        ]}>
        <Typography
          variant="description"
          size="sm"
          color={colors.text.clear}
          style={{ fontSize: 12 }}>
          Powered By&nbsp;
          <Typography
            variant="interactions"
            size="md"
            color={colors.text.clear}
            style={{ fontSize: 12 }}>
            Room8.ph
          </Typography>
        </Typography>
      </View>
      {/** FOOTER CONTENT */}
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 8
  },
  lgContainer: {
    alignSelf: 'center'
  },
  fpContainer: {
    flexDirection: 'row',
    marginTop: 12
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 4,
    alignItems: 'center'
  },
  lwContainer: {
    marginTop: 24
  },
  lwContentContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  lwDivider: {
    position: 'absolute',
    height: 1
  },
  ssoContainer: {
    alignItems: 'center',
    marginTop: 16
  },
  ssoContentContainer: {
    flexDirection: 'row',
    gap: 12
  }
});
