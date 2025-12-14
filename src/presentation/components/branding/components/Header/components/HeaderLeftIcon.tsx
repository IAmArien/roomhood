/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ArrowLeftIcon } from "@assets/icons";
import { useTheme } from "@branding/provider";
import { JSX, useMemo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { HeaderLeftIconProps } from "../types";

export const HeaderLeftIcon: React.FC<HeaderLeftIconProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;

  const {
    testID,
    accessible = false,
    accessibilityLabel = "header-left-icon-accessibility-label",
    accessibilityRole = 'button',
    role = 'button',
    style,
    customIcon,
    customIconColor = colors.text.clearest,
    ...restProps
  } = props;

  const hasCustomIcon = useMemo((): boolean => {
    return customIcon !== undefined;
  }, [customIcon]);

  return (
    <Animated.View
      testID={testID}
      accessible={false}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}>
      <View
        accessible={false}
        style={style}
        {...restProps}>
        {hasCustomIcon ? <>{customIcon}</> : <ArrowLeftIcon fillColor={customIconColor} />}
      </View>
    </Animated.View>
  );
};
