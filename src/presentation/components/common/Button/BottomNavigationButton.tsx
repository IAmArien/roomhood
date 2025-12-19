/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Button, ButtonGroup } from "@branding/components";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { BottomButtonsProps } from "./types";
import { useTheme } from "@branding/provider";

export function BottomNavigationButton(props: BottomButtonsProps): ReactElement {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors, properties } = theme;
  const {
    testID,
    accessibilityLabel,
    accessible = false,
    title,
    style,
    onPress,
    ...restProps
  } = props;

  return (
    <View
      testID="bottom-buttons-container"
      accessibilityLabel="bottom-buttons-container"
      accessible={false}
      style={[
        styles.container,
        properties.shadows.softer,
        {
          backgroundColor: colors.ui["pure-white"],
          borderTopLeftRadius: properties.radius["less-round"],
          borderTopRightRadius: properties.radius["less-round"]
        },
        style
      ]}>
      <ButtonGroup orientation="horizontal">
        <Button
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          accessible={accessible}
          type="standard"
          variant="primary"
          size="md"
          title={title}
          onPress={onPress}
          {...restProps}
        />
      </ButtonGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});
