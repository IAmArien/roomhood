/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ProfileIcon } from 'presentation/components/common';
import { ReactElement } from 'react';
import { useTheme } from 'react-native-paper';

import { TasksPreviewAssigneesProps, TasksPreviewItemContentAssignee } from '../types';

export const TasksPreviewAssignees: React.FC<TasksPreviewAssigneesProps> = (
  props
): ReactElement => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;

  const { colors } = theme;
  const { assignee } = props;

  if (assignee.length === 0) throw Error('Invalid assignee length.');

  if (assignee.length === 1) {
    return <ProfileIcon size={25} url={assignee[0].assigneeProfile} />;
  }

  return (
    <>
      {assignee.map(value => (
        <ProfileIcon key={value.assigneeId} size={25} url={value.assigneeProfile} />
      ))}
    </>
  );
};
