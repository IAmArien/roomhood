/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { ReactElement, useState } from "react";
import { CalendarDayItemProps } from "../types";
import { useTheme } from "@branding/provider";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import { Typography } from "@branding/components";

export const CalendarDayItem: React.FC<CalendarDayItemProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const {
    testID,
    content,
    accessibilityLabel,
    accessible = false,
    style,
    onPress,
    ...restProps
  } = props;

  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleOnLayout = (e: LayoutChangeEvent) => {
    setContentHeight(e.nativeEvent.layout.width);
  };

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      style={[
        styles.container,
        style
      ]}
      onPress={() => onPress?.(content)}
      {...restProps}>
      <View
        onLayout={handleOnLayout}
        style={[
          styles.contentContainer,
          !content.isToday && {
            borderWidth: 1,
            borderColor: colors.border.grey
          },
          {
            backgroundColor: content.isToday ? colors.ui.primary : 'transparent',
            height: contentHeight
          }
        ]}>
        <Typography
          variant="numbers"
          size="sm"
          color={content.isToday ? colors.ui["pure-white"] : colors.text.clearer}>
          {content.day}
        </Typography>
      </View>
      {content.hasEvents && (
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: colors.functional.negative
            }
          ]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 999
  }
});
