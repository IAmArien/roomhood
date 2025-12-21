/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX, PropsWithChildren } from 'react';
import { Modal, StyleSheet, View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ModalDialogProps } from './types';
import { useTheme } from '../../../provider/ThemeProvider';
import { Button } from '../../FormControl/components/Button/Button';
import { ButtonGroup } from '../../FormControl/components/Button/ButtonGroup';
import { ScrimOverlay } from '../../Scrims/ScrimOverlay';
import { Typography } from '../../Typography/Typography';

/**
 * Internal component for identifying what type of overlay the modal dialog will use, it could
 * be `blur` or `dim`.
 * @param props Type of ModalDialogProps with PropsWithChildren
 * @see ModalDialogProps
 * @returns JSX Element of modal dialog overlay element
 */
const ModalDialogOverlay: React.FC<ModalDialogProps & PropsWithChildren> = (props): JSX.Element => {
  const { scrimOverlayProps, overlayType = 'dim', children } = props;

  if (overlayType === 'blur') {
    return (
      <ScrimOverlay type="light" scrimPlacement="behind" {...scrimOverlayProps}>
        {children}
      </ScrimOverlay>
    );
  }
  return <>{children}</>;
};

/**
 * Internal component for modal dialog's content
 * @param props Type of ModalDialogProps
 * @see ModalDialogProps
 * @returns JSX Element of Modal Dialog Content
 */
const ModalDialogContent: React.FC<ModalDialogProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors, properties } = theme;
  const {
    title,
    titleIcon,
    titleIconVisible = true,
    titleIconAlignment = 'middle',
    titleIconStyle,
    titleStyle,
    titleStyleProps,
    titleTestID,
    description,
    descriptionStyle,
    descriptionStyleProps,
    descriptionTestID,
    overlayType = 'dim',
    scrimOverlayProps,
    onOverlayClick,
    overlayTestID,
    vertical = false,
    position = 'bottom',
    positiveButton,
    negativeButton,
    style,
    illustration,
    illustrationStyle,
    customContent,
    buttonGroupStyle,
  } = props;

  const hasButtons = (): boolean => positiveButton !== undefined || negativeButton !== undefined;

  const hasCustomContent = (): boolean => customContent !== undefined;

  const hasTitle = (): boolean => title !== undefined && title !== '';

  const hasTitleIcon = (): boolean => titleIcon !== undefined && titleIconVisible;

  const hasDescription = (): boolean => description !== undefined && description !== '';

  const getShadowType = (): ViewStyle | undefined => {
    if (overlayType === 'blur') {
      return properties.shadows.soft;
    }
    return {};
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalDialogOverlay {...props}>
        <View
          accessible={false}
          testID={overlayTestID}
          accessibilityLabel="modal-dialog-overlay-accessibility-label"
          style={[styles.overlay, overlayType === 'blur' && { backgroundColor: undefined }]}
          onTouchEnd={() => onOverlayClick?.()}
        >
          <View
            accessible={false}
            onTouchEnd={e => {
              e.stopPropagation(); // Prevent the event from bubbling up to the blue background
            }}
            style={[
              styles.dialog,
              {
                backgroundColor: colors.surface['white-surface'],
                borderRadius: properties.radius.rounder,
                alignSelf:
                  position === 'top' ? 'flex-start' : position === 'center' ? 'center' : 'flex-end',
              },
              getShadowType(),
              style,
            ]}
          >
            <View accessible={false} style={styles.dialogContent}>
              {illustration && (
                <View accessible={false} style={[styles.illustration, illustrationStyle]}>
                  {illustration?.()}
                </View>
              )}
              {/**
               * MODAL DIALOG TITLE AND ITS ICON
               */}
              {(hasTitle() || hasTitleIcon()) && (
                <View
                  accessible={false}
                  style={[
                    styles.dialogContentTitle,
                    titleIconAlignment === 'top' && {
                      alignItems: 'flex-start',
                    },
                    titleIconAlignment === 'middle' && { alignItems: 'center' },
                    titleIconAlignment === 'bottom' && {
                      alignItems: 'flex-end',
                    },
                  ]}
                >
                  {titleIcon && titleIconVisible && (
                    <View
                      testID="modal-dialog-view-icon"
                      accessibilityLabel="modal-dialog-view-icon-accessibility-label"
                      style={[titleIconAlignment === 'top' && { paddingTop: 3 }, titleIconStyle]}
                    >
                      {titleIcon}
                    </View>
                  )}
                  {hasTitle() && (
                    <View accessible={false} style={{ flex: 1 }}>
                      <Typography
                        testID={titleTestID}
                        variant="title"
                        size="semi-bold-sm"
                        color={titleStyle?.color?.toString() ?? colors.text.clearest}
                        style={titleStyle}
                        textAlign={titleStyle?.textAlign}
                        theme={theme}
                        {...titleStyleProps}
                      >
                        {title}
                      </Typography>
                    </View>
                  )}
                </View>
              )}
              {/**
               * MODAL DIALOG CUSTOM CONTENT AND MODAL DIALOG DESCRIPTION
               */}
              {hasCustomContent() ? (
                <>{customContent?.()}</>
              ) : (
                <>
                  {hasDescription() && (
                    <Typography
                      testID={descriptionTestID}
                      variant="description"
                      size="md"
                      color={descriptionStyle?.color?.toString() ?? colors.text.clearest}
                      style={descriptionStyle}
                      textAlign={descriptionStyle?.textAlign}
                      theme={theme}
                      {...descriptionStyleProps}
                    >
                      {description}
                    </Typography>
                  )}
                </>
              )}
              {/**
               * MODAL DIALOG POSTIVE AND NEGATIVE BUTTONS
               */}
              {hasButtons() && (
                <ButtonGroup
                  accessible={false}
                  orientation={vertical ? 'vertical' : 'horizontal'}
                  style={[
                    { gap: vertical ? 10 : 15 },
                    vertical && { flexDirection: 'column-reverse' },
                    buttonGroupStyle,
                  ]}
                >
                  {negativeButton && (
                    <Button
                      disabled={negativeButton.disabled}
                      testID={negativeButton.testID}
                      type="standard"
                      variant="whisper"
                      size="md"
                      title={negativeButton.title}
                      onPress={() => negativeButton.onPress?.()}
                      theme={theme}
                      {...negativeButton.buttonProps}
                    />
                  )}
                  {positiveButton && (
                    <Button
                      disabled={positiveButton.disabled}
                      testID={positiveButton.testID}
                      type="standard"
                      variant="primary"
                      size="md"
                      title={positiveButton.title}
                      onPress={() => positiveButton.onPress?.()}
                      theme={theme}
                      {...positiveButton.buttonProps}
                    />
                  )}
                </ButtonGroup>
              )}
            </View>
          </View>
        </View>
      </ModalDialogOverlay>
    </GestureHandlerRootView>
  );
};

/**
 * Functional component for Modal Dialog UI Element. Accepts the following props:
 * `isVisible`, `title`, `titleIcon`, `titleIconVisible`, `description`, `titleStyle`,
 * `titleIconAlignment`, `descriptionStyle`, `onOverlayClick`, `onRequestClose`,
 * `illustration`, `vertical`, `positiveButton`, `negativeButton`.
 * Sample implementation:
 * ```
 * const [showModal, setShowModal] = useState(false);

  <ModalDialog
    isVisible={showModal}
    title="Something went wrong"
    description="Unable to proceed to the next action, tap on Next to continue."
    onRequestClose={() => setShowModal(false)}
    onOverlayClick={() => setShowModal(false)}
    position="center"
    overlayType="blur"
    positiveButton={{
      title: 'Next',
      onPress() {
        ......
        setShowModal(false);
      }
    }}
    negativeButton={{
      title: 'Cancel',
      onPress() {
        setShowModal(false);
      }
    }}
  />
 * ```
 * @param props Type of ModalDialogProps
 * @see ModalDialogProps
 * @returns JSX Element of Modal Dialog UI Element
 */
export const ModalDialog: React.FC<ModalDialogProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const {
    testID,
    isVisible,
    titleIconAlignment = 'middle',
    onRequestClose,
    accessible = true,
    accessibilityLabel = 'modal-dialog-accessibility-label',
    accessibilityRole = 'alert',
    role = 'alertdialog',
    ...restProps
  } = props;

  if (
    titleIconAlignment !== 'top' &&
    titleIconAlignment !== 'bottom' &&
    titleIconAlignment !== 'middle'
  ) {
    throw Error(`Invalid titleIconAlignment prop for ${titleIconAlignment}.`);
  }

  return (
    <Modal
      {...restProps}
      testID={testID}
      accessible={accessible}
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      role={role}
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <ModalDialogContent {...props} theme={theme} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)',
    flexDirection: 'row',
    flex: 1,
  },
  dialog: {
    flex: 1,
    height: 'auto',
    padding: 18,
    alignSelf: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  illustration: {
    marginBottom: 10,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  dialogContentTitle: {
    flexDirection: 'row',
    gap: 10,
  },
  dialogContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
