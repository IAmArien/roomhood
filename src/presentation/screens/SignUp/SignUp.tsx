/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigator } from "@app/hooks";
import { CalendarOutlinedIcon, EmailOutlinedIcon, PersonOutlinedIcon, PhoneOutlinedIcon } from "@assets/icons";
import { Checkbox, Dropdown, DropdownOption, FormControl, FormProvider, Header, IFormControl, Option, TextField, Typography, useForm, useFormControl } from "@branding/components";
import { useTheme } from "@branding/provider";
import { isEmailAddressValid, isValidFormattedPHMobile, isValidMMDDYYYY, toBirthDateTextField, toPHMobileNumber } from "@utils";
import { BottomNavigationButton } from "presentation/components";
import { ReactElement, useRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

type FormType = string | DropdownOption | string[];

export default function SignUp(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();

  const { colors } = theme;

  const scrollViewRef = useRef<ScrollView | null>(null);

  const form = useForm<FormType, IFormControl<FormType>[]>();

  const emTextField = useFormControl<string>("email", {
    validations: {
      required: true,
      customValidation(controlValue) {
        return {
          valid: isEmailAddressValid(controlValue ?? ''),
          message: 'Invalid Email Address.'
        }
      }
    }
  });
  const fnTextField = useFormControl<string>("first-name", {
    validations: {
      required: true
    }
  });
  const lnTextField = useFormControl<string>("last-name", {
    validations: {
      required: true
    }
  });
  const noTextField = useFormControl<string>("mobile-number", {
    validations: {
      required: true,
      customValidation(controlValue) {
        return {
          valid: isValidFormattedPHMobile(controlValue ?? ''),
          message: 'Invalid Mobile Number.'
        }
      },
    },
    overrideChangeText(controlValue) {
      if (controlValue) {
        return toPHMobileNumber(controlValue ?? '');
      }
      return "";
    },
  });
  const bdTextField = useFormControl<string>("birth-date", {
    validations: {
      required: true,
      customValidation(controlValue) {
        return {
          valid: isValidMMDDYYYY(controlValue ?? ''),
          message: 'Invalid Birth Date.'
        };
      },
    },
    overrideChangeText(controlValue) {
      if (controlValue) {
        const numericInput = controlValue.replace(/\D/g, '');
        return toBirthDateTextField(numericInput);
      }
      return "";
    }
  });
  const genderSelection = useFormControl<DropdownOption>("gender", {
    validations: {
      required: true
    }
  });
  const termsSelection = useFormControl<string[]>("terms-updates", {
    validations: {
      required: true,
      customValidation(controlValue) {
        const hasAgreed = controlValue?.filter?.(value => value === 'agree-terms')
        return {
          valid: hasAgreed !== undefined && hasAgreed.length > 0,
          message: "Please select a Gender."
        };
      }
    }
  });

  const { extendedRef: fnRef } = fnTextField;
  const { extendedRef: lnRef } = lnTextField;
  const { extendedRef: noRef } = noTextField;
  const { extendedRef: bdRef } = bdTextField;

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const handleFormSubmit = () => {};

  const handleHeaderLeftIconPress = () => navigator.goBack();

  const handleTermsOfServicePress = () => {};

  const handlePrivacyPolicyPress = () => {};

  const handleContinuePress = () => {};

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
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
          style={{ flex: 1 }}
          behavior={keyboardBehavior}>
          <ScrollView
            ref={scrollViewRef}
            testID="signup-scroll-container"
            accessibilityLabel="signup-scroll-container"
            accessible={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}>
            <View style={styles.contentContainer}>
              <Typography
                variant="description"
                size="md"
                color={colors.text.clearer}>
                Find roommates and manage life together — from bills and chores to shared moments at home.
              </Typography>
              <TextField
                testID="email-textfield"
                accessibilityLabel="email-textfield"
                inputAccessoryViewID="email-textfield"
                label="Email Address"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                returnKeyType="next"
                trailingIcon={<EmailOutlinedIcon fillColor={colors.text.clear} />}
                autoCorrect={false}
                spellCheck={false}
                onSubmitEditing={() => fnRef?.current?.requestFocus(true)}
                {...emTextField}
              />
              <TextField
                testID="first-name-textfield"
                accessibilityLabel="first-name-textfield"
                inputAccessoryViewID="first-name-textfield"
                label="First Name"
                autoCapitalize="words"
                textContentType="givenName"
                keyboardType="name-phone-pad"
                returnKeyType="next"
                trailingIcon={<PersonOutlinedIcon fillColor={colors.text.clear} />}
                autoCorrect={false}
                spellCheck={false}
                onSubmitEditing={() => lnRef?.current?.requestFocus(true)}
                {...fnTextField}
              />
              <TextField
                testID="last-name-textfield"
                accessibilityLabel="last-name-textfield"
                inputAccessoryViewID="last-name-textfield"
                label="Last Name"
                autoCapitalize="words"
                textContentType="familyName"
                keyboardType="name-phone-pad"
                returnKeyType="next"
                trailingIcon={<PersonOutlinedIcon fillColor={colors.text.clear} />}
                autoCorrect={false}
                spellCheck={false}
                onSubmitEditing={() => noRef?.current?.requestFocus(true)}
                {...lnTextField}
              />
              <TextField
                testID="mobile-number-textfield"
                accessibilityLabel="mobile-number-textfield"
                inputAccessoryViewID="mobile-number-textfield"
                label="Mobile Number"
                placeholder="(+63) 927 389 4063"
                autoCapitalize="none"
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                returnKeyType="next"
                maxLength={18}
                trailingIcon={<PhoneOutlinedIcon fillColor={colors.text.clear} />}
                onSubmitEditing={() => bdRef?.current?.requestFocus(true)}
                {...noTextField}
              />
              <TextField
                testID="birth-date-textfield"
                accessibilityLabel="birth-date-textfield"
                inputAccessoryViewID="birth-date-textfield"
                label="Birth Date"
                staticPlaceholder="MM/DD/YYYY"
                textContentType="birthdate"
                keyboardType="number-pad"
                returnKeyType="done"
                maxLength={10}
                notes="Format: MM/DD/YYYY"
                notesVisibility="always"
                trailingIcon={<CalendarOutlinedIcon fillColor={colors.text.clear} />}
                onSubmitEditing={Keyboard.dismiss}
                {...bdTextField}
              />
              <FormControl {...genderSelection}>
                <Dropdown type="selection" label="Gender">
                  <Option title="Male" value="Male" />
                  <Option title="Female" value="Female" />
                  <Option title="Others" value="Others" />
                  <Option title="I prefer not to say" value="None" />
                </Dropdown>
              </FormControl>
              <FormControl {...termsSelection}>
                <View accessible={false} style={styles.checkboxContainer}>
                  <Checkbox
                    customLabel={
                      <Typography
                        variant="description"
                        size="sm"
                        color={colors.text.clearest}
                        style={{ flex: 1 }}>
                        I agree to Room8.ph&nbsp;
                        <Typography
                          variant="description"
                          size="sm"
                          color={colors.ui.primary}
                          onPress={handleTermsOfServicePress}
                          style={{
                            textDecorationLine: 'underline'
                          }}>
                          Terms of Service
                        </Typography>
                        &nbsp;and&nbsp;
                        <Typography
                          variant="description"
                          size="sm"
                          color={colors.ui.primary}
                          onPress={handlePrivacyPolicyPress}
                          style={{
                            textDecorationLine: 'underline'
                          }}>
                          Privacy Policy
                        </Typography>
                      </Typography>
                    }
                    value="agree-terms"
                  />
                  <Checkbox
                    label="I'd like to get useful tips, inspiration, and offers via email."
                    value="agree-updates"
                  />
                </View>
              </FormControl>
            </View>
          </ScrollView>
          <BottomNavigationButton
            testID="signup-bottom-button"
            title="Continue"
            enabled={form.formState.isValid}
            onPress={handleContinuePress}
            showDefaultButton={!form.formState.isFocused}
            nativeIDs={[
              "email-textfield",
              "first-name-textfield",
              "last-name-textfield",
              "mobile-number-textfield",
              "birth-date-textfield"
            ]}
          />
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
    paddingBottom: 36,
    paddingTop: 8
  },
  checkboxContainer: {
    marginTop: 24,
    gap: 8
  }
});
