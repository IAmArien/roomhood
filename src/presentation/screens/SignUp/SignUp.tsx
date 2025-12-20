/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigator } from "@app/hooks";
import { CalendarOutlinedIcon, EmailOutlinedIcon, PersonOutlinedIcon, PhoneOutlinedIcon } from "@assets/icons";
import { Dropdown, DropdownOption, FormControl, FormProvider, Header, IFormControl, Option, TextField, Typography, useForm, useFormControl } from "@branding/components";
import { useTheme } from "@branding/provider";
import { toBirthDateTextField } from "@utils";
import { BottomNavigationButton } from "presentation/components";
import { ReactElement, useRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

type FormType = string | DropdownOption | string[];

export default function SignUp(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();

  const { colors } = theme;

  const scrollViewRef = useRef<ScrollView | null>(null);

  const form = useForm<FormType, IFormControl<FormType>[]>();

  const emTextField = useFormControl<string>("email");
  const fnTextField = useFormControl<string>("first-name");
  const lnTextField = useFormControl<string>("last-name");
  const noTextField = useFormControl<string>("mobile-number");
  const bdTextField = useFormControl<string>("birth-date", {
    overrideChangeText(controlValue) {
      if (controlValue) {
        const numericInput = controlValue.replace(/\D/g, '');
        return toBirthDateTextField(numericInput);
      }
      return "";
    },
  });
  const genderSelection = useFormControl<DropdownOption>("gender");

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const handleFormSubmit = () => {};

  const handleHeaderLeftIconPress = () => navigator.goBack();

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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  trailingIcon={<EmailOutlinedIcon fillColor={colors.text.clear} />}
                  {...emTextField}
                />
                <TextField
                  testID="first-name-textfield"
                  accessibilityLabel="first-name-textfield"
                  inputAccessoryViewID="first-name-textfield"
                  label="First Name"
                  autoCapitalize="words"
                  textContentType="givenName"
                  trailingIcon={<PersonOutlinedIcon fillColor={colors.text.clear} />}
                  {...fnTextField}
                />
                <TextField
                  testID="last-name-textfield"
                  accessibilityLabel="last-name-textfield"
                  inputAccessoryViewID="last-name-textfield"
                  label="Last Name"
                  autoCapitalize="words"
                  textContentType="familyName"
                  trailingIcon={<PersonOutlinedIcon fillColor={colors.text.clear} />}
                  {...lnTextField}
                />
                <TextField
                  testID="mobile-number-textfield"
                  accessibilityLabel="mobile-number-textfield"
                  inputAccessoryViewID="mobile-number-textfield"
                  label="Mobile Number"
                  placeholder="(+63) 927-389-4063"
                  autoCapitalize="none"
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  trailingIcon={<PhoneOutlinedIcon fillColor={colors.text.clear} />}
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
                  maxLength={10}
                  notes="Format: MM/DD/YYYY"
                  notesVisibility="always"
                  trailingIcon={<CalendarOutlinedIcon fillColor={colors.text.clear} />}
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
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <BottomNavigationButton
          testID="signup-bottom-button"
          title="Continue"
          style={styles.bottomButton}
          onPress={handleContinuePress}
          nativeIDs={[
            "email-textfield",
            "first-name-textfield",
            "last-name-textfield",
            "mobile-number-textfield",
            "birth-date-textfield"
          ]}
        />
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
    paddingBottom: 16,
    paddingTop: 8
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
