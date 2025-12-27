/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Typography } from '@branding/components';
import { useTheme } from '@branding/provider';
import { ReactElement, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import { TasksPreviewItem } from './components/TasksPreviewItem';
import { TasksPreviewItemContent, TasksPreviewProps } from './types';

export const TasksPreview: React.FC<TasksPreviewProps> = (props): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const {
    testID = 'tasks-preview-container',
    accessibilityLabel = 'tasks-preview-container',
    accessible = false,
    data,
    style,
    ...restProps
  } = props;

  const [tasksItems, setTasksItems] = useState<TasksPreviewItemContent[]>([]);

  const renderTasksItemPreview = (item: ListRenderItemInfo<TasksPreviewItemContent>) => {
    return <TasksPreviewItem content={item.item} theme={theme} />;
  };

  useEffect(() => {
    if (data) setTasksItems(data);
  }, [data]);

  const itemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  const listHeaderComponent = () => <View style={styles.headerSeparator} />;

  const listFooterComponent = () => <View style={styles.footerSeparator} />;

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      style={[
        styles.container,
        {
          backgroundColor: colors.ui['pure-white'],
        },
        style,
      ]}
      {...restProps}
    >
      <View style={styles.titleContainer}>
        <Typography
          variant="title"
          size="semi-bold-xs"
          color={colors.text.clearest}
          style={{ flex: 1 }}
        >
          Today's Tasks
        </Typography>
      </View>
      <FlatList
        testID="flatlist-tasks-preview"
        accessibilityLabel="flatlist-tasks-preview"
        accessible={false}
        data={tasksItems}
        renderItem={renderTasksItemPreview}
        keyExtractor={item => item.taskId.toString()}
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  scrollContainer: {
    marginTop: 0,
  },
  itemSeparator: {
    width: 12,
  },
  headerSeparator: {
    width: 16,
  },
  footerSeparator: {
    width: 16,
  },
});
