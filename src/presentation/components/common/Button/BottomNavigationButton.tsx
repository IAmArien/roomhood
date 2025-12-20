/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Button, ButtonGroup } from "@branding/components";
import { useTheme } from "@branding/provider";
import React, { ReactElement, useCallback } from "react";
import { InputAccessoryView, Platform, StyleSheet, View } from "react-native";
import { BottomButtonsProps } from "./types";

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
    nativeIDs,
    ...restProps
  } = props;

  const renderComponent = useCallback((): ReactElement => {
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
  }, [
    properties,
    colors,
    style,
    testID,
    accessibilityLabel,
    accessible,
    title,
    onPress,
    restProps
  ]);

  return (
    <View accessible={false}>
      {Platform.OS === 'ios' && (
        <>
          {nativeIDs?.map((value, index) => (
            <InputAccessoryView nativeID={value} key={index}>
              {renderComponent()}
            </InputAccessoryView>
          ))}
        </>
      )}
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});
