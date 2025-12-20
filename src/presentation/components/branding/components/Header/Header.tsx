/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ArrowLeftIcon, CloseIcon } from "@assets/icons";
import { useTheme } from "@branding/provider";
import React, { JSX, ReactElement, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Ripple } from "../Effects";
import { HeaderIcon } from "./components/HeaderIcon";
import { HeaderProps } from "./types";
import { Typography } from "../Typography/Typography";

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
    type = 'back',
    title,
    titleTestID,
    animationEnabled = false,
    headerLeftIconTestID,
    headerLeftIconStyle,
    onHeaderLeftIconPress,
    headerActions,
    style,
    ...restProps
  } = props;

  const hasTitle = useMemo(() => title !== undefined && title !== '', [title]);

  const handleHeaderLeftIconPress = () => {
    onHeaderLeftIconPress?.();
  };

  const headerLeftIcon = useMemo((): ReactElement => {
    if (type === 'back') {
      return <ArrowLeftIcon fillColor={colors.text.clearest} />
    }
    return <CloseIcon fillColor={colors.text.clearest} />
  }, [colors.text.clearest, type]);

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
        {/** HEADER LEFT ICON */}
        <Ripple
          testID={headerLeftIconTestID}
          rippleColor={colors.text.clear}
          ripplePosition="center"
          onPress={handleHeaderLeftIconPress}
          style={[
            styles.iconContainer,
            headerLeftIconStyle
          ]}>
          <HeaderIcon icon={headerLeftIcon} />
        </Ripple>
        {/** HEADER LEFT ICON */}
        {/** HEADER TITLE */}
        <View
          testID="header-title"
          accessibilityLabel="header-title"
          accessible={false}
          style={styles.titleContainer}>
          {hasTitle && (
            <Typography
              testID={titleTestID}
              variant="title"
              size="semi-bold-sm"
              color={colors.text.clearest}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Typography>
          )}
        </View>
        {/** HEADER TITLE */}
        {/** HEADER ACTIONS */}
        <View accessible={false} style={styles.actionsContainer}>
          {headerActions?.map?.((value, index) => (
            <Ripple
              key={index}
              testID={value.testID}
              rippleColor={colors.text.clear}
              ripplePosition="center"
              onPress={value.onPress}
              style={[
                styles.iconContainer,
                value.style
              ]}>
              <HeaderIcon icon={value.icon} />
            </Ripple>
          ))}
        </View>
        {/** HEADER ACTIONS */}
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
  titleContainer: {
    flex: 1
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8
  }
});
