/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Tags, Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { WINDOW_WIDTH } from '@utils';
import { ReactElement, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { TasksPreviewItemContentDueStatus, TasksPreviewItemProps } from '../types';
import { TasksPreviewAssignees } from './TasksPreviewAssignees';

export const TasksPreviewItem: React.FC<TasksPreviewItemProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors, properties } = theme;
  const { testID, accessibilityLabel, accessible = false, content, style, ...restProps } = props;

  const cardWidth = useMemo((): number => WINDOW_WIDTH * 0.85 - 32, []);

  const taskStatus = useMemo((): string => content.status.toString(), [content.status]);

  const taskDue = useMemo((): TasksPreviewItemContentDueStatus => {
    if (content.dueDate.isToday) return 'due today';
    if (content.dueDate.isOverdue) return 'overdue';
    return 'upcoming';
  }, [content.dueDate]);

  const tagsLabelStyle = {
    status: {
      'not started': colors.ui.tertiary,
      ongoing: colors.ui['pure-white'],
      'on hold': colors.ui.tertiary,
      cancelled: colors.ui['pure-white'],
      completed: colors.ui['pure-white'],
    },
    'due date': {
      'due today': colors.ui['pure-white'],
      overdue: colors.ui['pure-white'],
      upcoming: colors.ui['pure-white'],
    },
  };

  const tagsBackgroundStyle = {
    status: {
      'not started': {
        backgroundColor: colors.functional.disabled,
      },
      ongoing: {
        backgroundColor: colors.ui.primary,
      },
      'on hold': {
        backgroundColor: colors.ui['steel-grey'],
      },
      cancelled: {
        backgroundColor: colors.functional.negative,
      },
      completed: {
        backgroundColor: colors.functional.positive,
      },
    },
    'due date': {
      'due today': {
        backgroundColor: colors.functional.warning,
      },
      overdue: {
        backgroundColor: colors.functional.negative,
      },
      upcoming: {
        backgroundColor: colors.ui.primary,
      },
    },
  };

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      style={[
        styles.container,
        properties.shadows.softest,
        {
          width: cardWidth,
          backgroundColor: colors.ui['pure-white'],
          borderRadius: properties.radius['less-round'],
        },
        style,
      ]}
      {...restProps}
    >
      <View style={styles.tagContainer}>
        <Tags
          color={tagsLabelStyle.status[content.status]}
          style={tagsBackgroundStyle.status[content.status]}
          size="sm"
          label={taskStatus}
        />
        <Tags
          color={tagsLabelStyle['due date'][taskDue]}
          style={tagsBackgroundStyle['due date'][taskDue]}
          size="sm"
          label={taskDue}
        />
      </View>
      <Divider style={{ marginTop: 12 }} />
      <View style={styles.taskContainer}>
        {content.taskTitle && (
          <Typography variant="title" size="semi-bold-xs" color={colors.text.clearest}>
            {content.taskTitle}
          </Typography>
        )}
        {content.taskDescription && (
          <Typography variant="description" size="sm" color={colors.text.clearer}>
            {content.taskDescription}
          </Typography>
        )}
      </View>
      <Divider style={{ marginTop: 12 }} />
      <View style={styles.assigneeContainer}>
        <TasksPreviewAssignees assignee={content.assignee} theme={theme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  taskContainer: {
    marginTop: 12,
    gap: 4,
  },
  assigneeContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 6,
  },
});
