/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Theme } from '@branding/types';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';

export type TasksPreviewItemContentStatus =
  | 'not started'
  | 'ongoing'
  | 'on hold'
  | 'cancelled'
  | 'completed';
export type TasksPreviewItemContentDueStatus = 'due today' | 'overdue' | 'upcoming';

export type TasksPreviewProps = {
  testID?: string;
  data?: TasksPreviewItemContent[];
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;

export type TasksPreviewItemProps = {
  testID?: string;
  content: TasksPreviewItemContent;
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
} & AccessibilityProps;

export type TasksPreviewAssigneesProps = {
  assignee: TasksPreviewItemContentAssignee[];
  style?: StyleProp<ViewStyle>;
  theme?: Theme;
};

export type TasksPreviewItemContentAssignee = {
  assigneeFirstName: string;
  assigneeLastName: string;
  assigneeId: number;
  assigneeProfile: string;
};

export type TasksPreviewItemContentDueDate = {
  date: string;
  isToday: boolean;
  isOverdue: boolean;
};

export type TasksPreviewItemContent = {
  status: TasksPreviewItemContentStatus;
  dueDate: TasksPreviewItemContentDueDate;
  assignee: TasksPreviewItemContentAssignee[];
  taskId: number;
  taskTitle?: string;
  taskDescription: string;
};
