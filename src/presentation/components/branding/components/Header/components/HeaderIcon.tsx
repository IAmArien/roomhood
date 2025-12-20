/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { JSX } from "react";
import Animated from "react-native-reanimated";

import { HeaderIconProps } from "../types";

export const HeaderIcon: React.FC<HeaderIconProps> = (props): JSX.Element => {const {
    testID,
    accessible = false,
    accessibilityLabel = "header-icon-accessibility-label",
    accessibilityRole = 'button',
    role = 'button',
    icon,
    onLayout,
    ...restProps
  } = props;

  return (
    <Animated.View
      testID={testID}
      accessible={false}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      onLayout={onLayout}
      {...restProps}>
      {icon}
    </Animated.View>
  );
};
