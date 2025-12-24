/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useAppContext } from '@app/context';
import { useNavigator } from '@app/hooks';
import { OtpScreenRouteProp } from '@app/navigation';
import { Header } from '@branding/components';
import { useTheme } from '@branding/provider';
import { useRoute } from '@react-navigation/native';
import { ReactElement, useMemo, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { OtpDescriptionHeader } from './components/OtpDescriptionHeader';
import { OtpInputTextField } from './components/OtpInputTextField';

export default function OtpScreen(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();

  const params = useRoute<OtpScreenRouteProp>().params;

  const { colors } = theme;
  const { title, timerInMillis = 300 } = params;

  const scrollViewRef = useRef<ScrollView | null>(null);
  const { setShowLoadingModal } = useAppContext();

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const emailAddress = useMemo((): string | undefined => {
    if (params.type === 'email') {
      return params.emailAddress;
    }
    return undefined;
  }, [params.type, params]);

  const mobileNumber = useMemo((): string | undefined => {
    if (params.type === 'mobile') {
      return params.mobileNumber;
    }
    return undefined;
  }, [params.type, params]);

  const handleHeaderLeftIconPress = () => {
    navigator.goBack();
  };

  const handleOnVerifyOTP = (_otp: string) => {
    setShowLoadingModal(true);
    setTimeout(() => {
      setShowLoadingModal(false);
    }, 2000);
  };

  return (
    <View
      testID="otp-screen-container"
      accessibilityLabel="otp-screen-container"
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui['pure-white'],
        },
      ]}
    >
      <Header
        testID="otp-screen-header"
        titleTestID="otp-screen-header-title"
        type="close"
        headerLeftIconTestID="otp-screen-header-left-icon"
        onHeaderLeftIconPress={handleHeaderLeftIconPress}
        style={styles.header}
        theme={theme}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
        <ScrollView
          ref={scrollViewRef}
          testID="otp-screen-scroll-container"
          accessibilityLabel="otp-screen-scroll-container"
          accessible={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        >
          <View style={styles.contentContainer}>
            <OtpDescriptionHeader
              title={title}
              emailAddress={emailAddress}
              mobileNumber={mobileNumber}
              theme={theme}
            />
            <OtpInputTextField
              onVerifyOTP={handleOnVerifyOTP}
              timerInMillis={timerInMillis}
              theme={theme}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 36,
    paddingTop: 36,
  },
});
