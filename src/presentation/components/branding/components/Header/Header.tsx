/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { JSX, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { HeaderProps } from "./types";
import { useTheme } from "@branding/provider";
import Animated from "react-native-reanimated";
import { HeaderLeftIcon } from "./components/HeaderLeftIcon";
import { Typography } from "../Typography/Typography";
import { Ripple } from "../Effects";

export const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;

  const {
    testID,
    accessible = false,
    accessibilityLabel = "header-accessibility-label",
    accessibilityRole = 'header',
    role = 'heading',
    title,
    titleTestID,
    iconType = 'default',
    animationEnabled = false,
    headerLeftIconTestID,
    headerLeftIconOptions,
    headerLeftIconStyle,
    onHeaderLeftIconPress,
    style,
    ...restProps
  } = props;

  const hasTitle = useMemo(() => title !== undefined && title !== '', [title]);

  const handleHeaderLeftIconPress = () => {
    onHeaderLeftIconPress?.();
  };

  return (
    <Animated.View
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      style={styles.container}>
      <View
        accessible={false}
        style={[styles.contentContainer, style]}
        {...restProps}>
        <Ripple
          testID={headerLeftIconTestID}
          rippleColor={colors.text.clear}
          ripplePosition="center"
          onPress={handleHeaderLeftIconPress}
          style={[
            styles.iconContainer,
            iconType === 'outlined' && styles.outlineIconContainer,
            iconType === 'outlined' && {
              borderColor: colors.text.clearest
            },
            headerLeftIconStyle
          ]}>
          <HeaderLeftIcon
            customIcon={headerLeftIconOptions.customIcon}
            customIconColor={headerLeftIconOptions.customIconColor}
            theme={theme}
          />
        </Ripple>
        {hasTitle ? (
          <View
            testID="header-title"
            accessibilityLabel="header-title"
            accessible={false}
            style={styles.titleContainer}>
            <Typography
              testID={titleTestID}
              variant="title"
              size="semi-bold-sm"
              color={colors.text.clearest}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Typography>
          </View>
        ) : <></>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 57
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12
  },
  iconContainer: {
    height: 37,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineIconContainer: {
    borderRadius: 99,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1
  }
});
