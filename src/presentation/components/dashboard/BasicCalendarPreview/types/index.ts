/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from "@branding/types";
import { AccessibilityProps, StyleProp, ViewStyle } from "react-native";

export type CalendarDayContentItem = {
  label: string;
  day: number;
  full: Date;
  isToday: boolean;
  hasEvents?: boolean;
};

export type BasicCalendarPreviewProps = {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;

export type CalendarDayItemProps = {
  testID?: string;
  content: CalendarDayContentItem;
  onPress?: (content: CalendarDayContentItem) => void;
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;
