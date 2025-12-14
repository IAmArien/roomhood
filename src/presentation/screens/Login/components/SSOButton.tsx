/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from "react";
import { LoginSSOType } from "../types";
import { Pressable, PressableProps } from "react-native";

export type SSOButtonProps = {
  type: LoginSSOType;
  icon: ReactElement;
  onPress?: (type: LoginSSOType) => void;
} & Omit<PressableProps, 'onPress'>;

export const SSOButton: React.FC<SSOButtonProps> = ({
  type,
  icon,
  onPress,
  ...restProps
}): ReactElement => {
  return (
    <Pressable
      testID="sso-button"
      onPress={() => onPress?.(type)}
      {...restProps}>
      {icon}
    </Pressable>
  );
};
