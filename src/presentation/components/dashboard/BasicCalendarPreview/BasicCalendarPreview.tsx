/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { CalendarTodayOutlinedIcon } from "@assets/icons";
import { Typography } from "@branding/components";
import { useTheme } from "@branding/provider";
import { getCurrentWeekDays, getCurrentWeekRangeLabel } from "@utils";
import React, { ReactElement, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarDayItem } from "./components/CalendarDayItem";
import { BasicCalendarPreviewProps } from "./types";

export const BasicCalendarPreview: React.FC<BasicCalendarPreviewProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const {
    testID,
    accessibilityLabel,
    accessible = false,
    style,
    ...restProps
  } = props;

  const currentWeekRangeLabel = useMemo((): string => getCurrentWeekRangeLabel(),[]);

  const daysThisWeek = useMemo(() => getCurrentWeekDays(),[]);

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui["pure-white"]
        },
        style
      ]}
      {...restProps}>
      <View style={styles.titleContainer}>
        <Typography
          variant="title"
          size="semi-bold-xs"
          color={colors.text.clearest}>
          {currentWeekRangeLabel}
        </Typography>
        <CalendarTodayOutlinedIcon fillColor={colors.text.clearest} />
      </View>
      <View style={styles.daysOfWeekContainer}>
        {daysThisWeek.map((value, index) => (
          <CalendarDayItem key={index} content={value} theme={theme} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8
  }
});
