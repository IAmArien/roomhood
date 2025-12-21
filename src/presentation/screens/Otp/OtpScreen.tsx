/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigator } from "@app/hooks";
import { OtpScreenRouteProp } from "@app/navigation";
import { Header } from "@branding/components";
import { useTheme } from "@branding/provider";
import { useRoute } from "@react-navigation/native";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

export default function OtpScreen(): ReactElement {
  const navigator = useNavigator();
  const theme = useTheme();

  const params = useRoute<OtpScreenRouteProp>().params;

  const { colors } = theme;
  const {
    title,
    type = "email",
    emailAddress,
    mobileNumber,
    timerInMillis = 300
  } = params;

  const handleHeaderLeftIconPress = () => {
    navigator.goBack();
  };

  return (
    <View
      testID="otp-screen-container"
      accessibilityLabel="otp-screen-container"
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui["pure-white"]
        }
      ]}>
      <Header
        testID="otp-screen-header"
        title={title}
        titleTestID="otp-screen-header-title"
        type="close"
        headerLeftIconTestID="otp-screen-header-left-icon"
        onHeaderLeftIconPress={handleHeaderLeftIconPress}
        style={styles.header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingLeft: 8,
    paddingRight: 8
  }
});
