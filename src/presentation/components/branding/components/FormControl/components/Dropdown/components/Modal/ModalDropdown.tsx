/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { CircleChevronDownIcon } from '../../../../../../assets';
import { useTheme } from '../../../../../../provider/ThemeProvider';
import { ModalDialog } from '../../../../../Modal/Dialog/ModalDialog';
import { useFormControl } from '../../../../context/FormControlContext';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { TextField } from '../../../TextField/TextField';
import { useDropdownSelection } from '../../context/DropdownContext';
import { ModalDropdownProps, Option } from '../../types';

/**
 * Functional component for Modal Dropdown component. Accepts props of the following:
 * `label`, `modalLabel`, `placeholder`, `testID`.
 * @param props Type of ModalDropdownProps
 * @see ModalDropdownProps
 * @returns JSX Element of ModalDropdown component
 */
export const ModalDropdown: React.FC<ModalDropdownProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const {
    testID,
    dropdownTestID,
    dropdownModalTestID,
    dropdownModalPositiveButtonTestID,
    dropdownModalPositiveButtonTitle = 'Choose',
    dropdownModalPositiveButtonProps,
    dropdownModalNegativeButtonTestID,
    dropdownModalNegativeButtonTitle = 'Cancel',
    dropdownModalNegativeButtonProps,
    dropdownOverlayTestID,
    textFieldTestID,
    label,
    modalLabel,
    modalLabelTestID,
    selectionColor,
    placeholder,
    placeholderTextColor,
    placeholderVisibility,
    notesVisibility,
    scrimOverlayProps = {
      type: 'dark',
    },
    overlayType = 'blur',
    fixedLabel = false,
    accessible = true,
    accessibilityLabel = 'dropdown-field-label',
    accessibilityRole = 'combobox',
    role = 'combobox',
    style,
    children,
  } = props;

  const {
    setIsValid,
    state,
    setState,
    defaultErrorMessage,
    errorMessage,
    setErrorMessage,
    setControlValue,
    notes,
    validations,
  } = useFormControl<Option | undefined>();

  const { validate, isValid } = useFormValidation({
    defaultErrorMessage,
    validations,
    callback(state, message) {
      setErrorMessage(message);
      setState(state);
    },
  });

  const {
    value: dropdownValue,
    selected,
    setSelected,
    toggleMenu,
    setToggleMenu,
  } = useDropdownSelection();

  const accessibilityState = {
    disabled: state === 'disabled',
    expanded: toggleMenu,
  };

  const [textFieldValue, setTextFieldValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [labelPosiiton, setLabelPosition] = useState<'top' | 'center' | undefined>(undefined);

  const textFieldRef = useRef<TextInput>(null);

  const rotateAnimation = useSharedValue('0deg');

  useEffect(() => {
    if (dropdownValue !== undefined) {
      setTextFieldValue(dropdownValue.title);
    } else {
      rotateAnimation.value = withTiming('0deg', { duration: 300 });
      setLabelPosition('center');
      setTextFieldValue('');
    }
  }, [dropdownValue]);

  /**
   * This portion of code utilizes `toggleMenu` from dropdown selection context
   * to animate or rotate the chevron icon to 180 and 0 degree. Nothing special.
   */
  useEffect(() => {
    if (toggleMenu) {
      rotateAnimation.value = withTiming('180deg', { duration: 300 });
    } else {
      rotateAnimation.value = withTiming('0deg', { duration: 300 });
    }
  }, [toggleMenu]);

  useEffect(() => {
    setIsValid(isValid());
  }, [isValid()]);

  const customContent = () => {
    const height = Dimensions.get('window').height;
    const getMaxHeight = (): number => {
      if (Platform.OS === 'android') {
        return (height - 65) * 0.72;
      }
      return height * 0.72;
    };
    const options =
      React.Children.map(children, (child, _) => {
        return child;
      }) ?? [];

    return (
      <ScrollView
        style={{ maxHeight: getMaxHeight() }}
        testID={dropdownTestID}
        bounces={false}
        showsVerticalScrollIndicator
        scrollEnabled
      >
        {options.map(child => child)}
      </ScrollView>
    );
  };

  const onTextFieldPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLabelPosition('top');
    setToggleMenu(true);
    setIsFocused(true);
  };

  const blurTextField = (delay: number = 200) => {
    setTimeout(() => {
      textFieldRef?.current?.blur();
      Keyboard.dismiss();
    }, delay);
  };

  const onCloseModal = () => {
    // if there's no selected item or value, we have to reset the label position
    // of the textfield to its default position `center`, otherwise we will retain
    // the current position `top`
    if (textFieldValue.length === 0) {
      setLabelPosition('center');
    } else {
      setLabelPosition('top');
    }
    setSelected(dropdownValue); // reset the currently selected option to the current value
    setToggleMenu(false);
    setIsFocused(false);
    blurTextField();
    validate(dropdownValue, textFieldValue, false);
  };

  const onChoose = () => {
    if (selected) {
      setErrorMessage(undefined);
      setControlValue(selected);
      setToggleMenu(false);
      setIsFocused(false);
      blurTextField();
    }
  };

  const animatedTrailingIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotateAnimation.value,
        },
      ],
    };
  });

  const animatedTrailingIcon = (): JSX.Element => {
    return (
      <Animated.View style={animatedTrailingIconStyle}>
        <CircleChevronDownIcon />
      </Animated.View>
    );
  };

  return (
    <>
      <Pressable
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        accessibilityRole={accessibilityRole}
        role={role}
        disabled={state === 'disabled'}
        onPress={onTextFieldPress}
        style={[
          state === 'disabled' && {
            opacity: 0.5,
          },
          style,
        ]}
      >
        <View pointerEvents="none">
          <TextField
            testID={textFieldTestID}
            textFieldRef={textFieldRef}
            value={textFieldValue}
            label={label}
            selectionColor={selectionColor}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            placeholderVisibility={placeholderVisibility}
            trailingIcon={animatedTrailingIcon()}
            editable={false}
            state={state}
            errorMessage={errorMessage}
            notes={notes}
            notesVisibility={notesVisibility}
            caretHidden
            defaultLabelPosition="center"
            controlLabelPosition={labelPosiiton}
            requestFocus={isFocused}
            fixedLabel={fixedLabel}
          />
        </View>
      </Pressable>
      {toggleMenu && (
        <ModalDialog
          testID={dropdownModalTestID}
          overlayTestID={dropdownOverlayTestID}
          isVisible={toggleMenu}
          title={modalLabel ?? ''}
          customContent={customContent}
          onOverlayClick={onCloseModal}
          onRequestClose={onCloseModal}
          titleStyle={{ paddingHorizontal: 16 }}
          titleTestID={modalLabelTestID}
          style={{ paddingHorizontal: 0 }}
          buttonGroupStyle={{ paddingHorizontal: 16 }}
          overlayType={overlayType}
          scrimOverlayProps={scrimOverlayProps}
          positiveButton={{
            disabled: selected === undefined,
            title: dropdownModalPositiveButtonTitle,
            testID: dropdownModalPositiveButtonTestID,
            onPress: onChoose,
            buttonProps: dropdownModalPositiveButtonProps ?? {
              disabled: selected === undefined,
              testID: dropdownModalPositiveButtonTestID,
              type: 'standard',
              variant: 'primary',
              size: 'lg',
              title: dropdownModalPositiveButtonTitle,
              onPress: onChoose,
            },
          }}
          negativeButton={{
            title: dropdownModalNegativeButtonTitle,
            testID: dropdownModalNegativeButtonTestID,
            onPress: onCloseModal,
            buttonProps: dropdownModalNegativeButtonProps ?? {
              testID: dropdownModalNegativeButtonTestID,
              type: 'standard',
              variant: 'whisper',
              size: 'lg',
              title: dropdownModalNegativeButtonTitle,
              onPress: onCloseModal,
            },
          }}
          theme={theme}
        />
      )}
    </>
  );
};
