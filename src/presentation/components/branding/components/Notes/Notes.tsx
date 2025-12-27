/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { NotesCustomStyle, NotesProps } from './types';
import { useTheme } from '../../provider/ThemeProvider';
import { Button } from '../FormControl/components/Button/Button';
import { Typography } from '../Typography/Typography';

/**
 * Functional component for Notes UI Element. Accepts props of the following: `title`,
 * `description`, `tooltip`, `customStyle`.
 * @param props Type of NotesProps
 * @see NotesProps
 * @returns JSX Element of Notes UI Element
 */
export const Notes: React.FC<NotesProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors, properties } = theme;
  const {
    testID,
    title,
    titleTestID,
    description,
    descriptionTestID,
    customDescription,
    icon,
    tooltip,
    state = 'default',
    action,
    customStyle,
    style,
    ...restProps
  } = props;
  const { tooltipIcon, onPress } = tooltip ?? {};
  const { actionTitle, wrapped = true } = action ?? {};
  const { titleStyle, descriptionStyle, backgroundColor, borderColor, borderWidth, borderRadius } =
    customStyle ?? {};
  const {
    accessible = true,
    accessibilityLabel = 'notes-accessibility-label',
    accessibilityRole = 'none',
    role = 'none',
  } = props;

  const hasCustomDescription = () => customDescription !== undefined;
  const hasDescription = () => description && description !== '';
  const hasTitle = () => title && title !== '';
  const hasIcon = () => icon !== undefined;
  const hasAction = () => action !== undefined;

  const getNotesComponentStyle = (): NotesCustomStyle => {
    switch (state) {
      case 'default':
        return {
          borderRadius: borderRadius ?? properties.radius['less-round'],
          borderWidth: borderWidth ?? 2,
          borderColor: borderColor ?? colors.ui.quaternary,
          backgroundColor: backgroundColor ?? colors.surface['desaturated-blue-grey'],
        };
      case 'warning':
        return {
          borderRadius: borderRadius ?? properties.radius['less-round'],
          borderWidth: borderWidth ?? 2,
          borderColor: borderColor ?? '#F8BF89',
          backgroundColor: backgroundColor ?? '#FFF6EB',
        };
      case 'error':
        return {
          borderRadius: borderRadius ?? properties.radius['less-round'],
          borderWidth: borderWidth ?? 2,
          borderColor: borderColor ?? '#F8A9BC',
          backgroundColor: backgroundColor ?? '#FFF3F7',
        };
      default:
        return {};
    }
  };

  return (
    <View
      {...restProps}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      style={[
        styles.container,
        {
          borderRadius: getNotesComponentStyle().borderRadius ?? properties.radius['less-round'],
          borderWidth: getNotesComponentStyle().borderWidth ?? 2,
          borderColor: getNotesComponentStyle().borderColor ?? colors.ui.quaternary,
          backgroundColor:
            getNotesComponentStyle().backgroundColor ?? colors.surface['desaturated-blue-grey'],
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {hasIcon() && <View>{icon}</View>}
        <View
          style={[styles.content, { justifyContent: hasDescription() ? 'flex-start' : 'center' }]}
        >
          {hasTitle() && (
            <Typography
              testID={titleTestID}
              variant="title"
              size="semi-bold-xs"
              color={colors.text.clearest}
              theme={theme}
              {...titleStyle}
            >
              {title}
            </Typography>
          )}
          {hasCustomDescription() ? (
            <>{customDescription?.()}</>
          ) : (
            <>
              {hasDescription() && (
                <Typography
                  testID={descriptionTestID}
                  variant="description"
                  size="sm"
                  color={colors.text.clearest}
                  theme={theme}
                  {...descriptionStyle}
                >
                  {description}
                </Typography>
              )}
            </>
          )}
          {hasAction() && (
            <View
              style={{
                flexDirection: wrapped ? 'row' : undefined,
                marginTop: 5,
              }}
            >
              <Pressable>
                <Button
                  testID={action?.testID}
                  title={actionTitle!}
                  type="pill"
                  variant="primary"
                  size="sm"
                  onPress={action?.onPress}
                  {...action?.buttonProps}
                  {...action}
                />
              </Pressable>
            </View>
          )}
        </View>
        {tooltipIcon && (
          <Pressable
            testID={tooltip?.testID}
            accessibilityLabel="notes-pressable-icon-accessibility-label"
            onPress={() => onPress?.()}
          >
            {tooltipIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  content: {
    flex: 1,
    gap: 8,
  },
});
