/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { JSX, useEffect , useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { CircleChevronDownIcon } from '../../../../../../assets';
import { useTheme } from '../../../../../../provider/ThemeProvider';
import { useFormControl } from '../../../../context/FormControlContext';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { FormControlState } from '../../../../types';
import { TextField } from '../../../TextField/TextField';
import { useDropdownSelection } from '../../context/DropdownContext';
import { Option, SelectionDropdownProps } from '../../types';

const DEFAULT_DROPDOWN_HEIGHT = 210;

type TTextFieldPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  position: 'top' | 'bottom';
};

type TDropdownContentProps = SelectionDropdownProps & {
  fieldPosition: React.MutableRefObject<TTextFieldPosition | undefined>;
  textFieldRef: React.MutableRefObject<TextInput | null>;
  textFieldValue: string;
  state: FormControlState;
  errorMessage: string | undefined;
  notes: string | undefined;
  labelPosition?: 'top' | 'center';
  alphaAnimatedStyle: { opacity: number };
  animatedTrailingIconStyle: { transform: { rotate: string }[] };
};

/**
 * Functional component for internal use of Dropdown Content component. Accepts
 * props of the following: `label`, `placeholder`, `state`, `notes`.
 * @param props Type of TDropdownContentProps
 * @see TDropdownContentProps
 * @returns JSX Element of Dropdown Content
 */
const DropdownContent: React.FC<TDropdownContentProps> = (
  props
): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const {
    dropdownTestID,
    dropdownTextFieldTestID,
    label,
    selectionColor,
    placeholder,
    placeholderTextColor,
    placeholderVisibility,
    notesVisibility,
    fieldPosition,
    textFieldRef,
    textFieldValue,
    state,
    errorMessage,
    notes,
    labelPosition,
    alphaAnimatedStyle,
    animatedTrailingIconStyle,
    children
  } = props;

  const { properties } = theme;

  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    position
  } = fieldPosition.current ?? {};

  const getYPosition = (): number => {
    if (position === 'top') {
      return y - DEFAULT_DROPDOWN_HEIGHT + 11;
    }
    return y + height;
  };

  const customContent = (): JSX.Element => {
    const options =
      React.Children.map(children, (child, _) => {
        return child;
      }) ?? [];
    return (
      <ScrollView
        style={{ flex: 1 }}
        testID={dropdownTestID}
        bounces={false}
        showsVerticalScrollIndicator
        scrollEnabled>
        {options.map(child => child)}
      </ScrollView>
    );
  };

  const animatedTrailingIcon = (): JSX.Element => {
    return (
      <Animated.View style={animatedTrailingIconStyle}>
        <CircleChevronDownIcon />
      </Animated.View>
    );
  };

  return (
    <>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height
        }}>
        <TextField
          testID={dropdownTextFieldTestID}
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
          defaultLabelPosition={textFieldValue.length > 0 ? 'top' : 'center'}
          controlLabelPosition={labelPosition}
          caretHidden
          requestFocus
        />
      </View>
      <Animated.View
        style={[
          alphaAnimatedStyle,
          properties.shadows.soft,
          {
            maxHeight: DEFAULT_DROPDOWN_HEIGHT,
            backgroundColor: 'white',
            position: 'absolute',
            borderRadius: properties.radius['less-round'],
            top: getYPosition(),
            left: x,
            width
          },
          position === 'bottom' && {
            marginTop: 5
          }
        ]}>
        {customContent()}
      </Animated.View>
    </>
  );
};

/**
 * Functional component for Selection Dropdown component. Accepts props of the following:
 * `label`, `placeholder`, `testID`.
 * @param props Type of SelectionDropdownProps
 * @see SelectionDropdownProps
 * @returns JSX Element of Selection Dropdown
 */
export const SelectionDropdown: React.FC<SelectionDropdownProps> = (
  props
): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const {
    testID,
    dropdownModalTestID,
    dropdownOverlayTestID,
    textFieldTestID,
    label,
    selectionColor,
    placeholder,
    placeholderTextColor,
    placeholderVisibility,
    notesVisibility,
    accessible = true,
    accessibilityLabel = 'dropdown-field-label',
    accessibilityRole = 'combobox',
    role = 'combobox',
    style
  } = props;

  const {
    setIsValid,
    state,
    setState,
    defaultErrorMessage,
    errorMessage,
    setErrorMessage,
    notes,
    validations
  } = useFormControl<Option | undefined>();

  const { validate, isValid } = useFormValidation({
    defaultErrorMessage,
    validations,
    callback(state, message) {
      setErrorMessage(message);
      setState(state);
    }
  });

  const {
    value: dropdownValue,
    toggleMenu,
    setToggleMenu
  } = useDropdownSelection();

  const accessibilityState = {
    disabled: state === 'disabled',
    expanded: toggleMenu
  };

  const [textFieldValue, setTextFieldValue] = useState('');
  const [labelPosition, setLabelPosition] = useState<
    'top' | 'center' | undefined
  >(undefined);

  const textFieldRef = useRef<TextInput>(null);
  const fieldElement = useRef<View>(null);

  const fieldPosition = useRef<TTextFieldPosition>(undefined);

  const dropdownContentAlpha = useSharedValue(1);
  const rotateAnimation = useSharedValue('0deg');

  useEffect(() => {
    if (dropdownValue) {
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

  const onTextFieldPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    fieldElement.current?.measureInWindow((x, y, width, height) => {
      const screenHeight = Dimensions.get('screen').height;
      const position: TTextFieldPosition = {
        x,
        y,
        width,
        height,
        position: 'bottom'
      };
      const exactFieldPositionInY = position.y + height / 2;
      const halfOfScreen = screenHeight / 2;
      if (exactFieldPositionInY > halfOfScreen) {
        position.position = 'top';
      }
      fieldPosition.current = position;
      dropdownContentAlpha.value = withTiming(1, { duration: 1 });
      setLabelPosition('top');
      setToggleMenu(true);
    });
  };

  const onCloseModal = () => {
    // this condition checks if there's no selected value and label is provided
    // so we can programmatically delay the dismissing of modal to properly
    // animate textfield label and the dropdown content's exit.
    if (textFieldValue.length === 0) {
      validate(dropdownValue, textFieldValue, false);
      if (label && label.length > 0) {
        dropdownContentAlpha.value = withTiming(0, { duration: 300 });
        setLabelPosition('center');
        setTimeout(() => {
          setToggleMenu(false);
        }, 300);
        return;
      }
    }
    dropdownContentAlpha.value = withTiming(0, { duration: 1 });
    // if there's no selected item or value, we have to reset the label position
    // of the textfield to its default state `center`, otherwise we will retain
    // it to `top`
    if (textFieldValue.length === 0) {
      setLabelPosition('center');
    } else {
      setLabelPosition('top');
    }
    setToggleMenu(false);
    validate(dropdownValue, textFieldValue, false);
  };

  const alphaAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: dropdownContentAlpha.value
    };
  });

  const animatedTrailingIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotateAnimation.value
        }
      ]
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
    <View>
      <Pressable
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        accessibilityRole={accessibilityRole}
        role={role}
        disabled={state === 'disabled'}
        ref={fieldElement}
        onPress={onTextFieldPress}
        style={[
          state === 'disabled' && {
            opacity: 0.5
          },
          style
        ]}>
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
            controlLabelPosition={labelPosition}
          />
        </View>
      </Pressable>
      <Modal
        testID={dropdownModalTestID}
        animationType="fade"
        visible={toggleMenu}
        transparent
        onRequestClose={onCloseModal}>
        <Pressable
          testID={dropdownOverlayTestID}
          style={styles.overlay}
          onPress={onCloseModal}
        />
        <DropdownContent
          fieldPosition={fieldPosition}
          textFieldRef={textFieldRef}
          textFieldValue={textFieldValue}
          state={state}
          errorMessage={errorMessage}
          notes={notes}
          labelPosition={labelPosition}
          alphaAnimatedStyle={alphaAnimatedStyle}
          animatedTrailingIconStyle={animatedTrailingIconStyle}
          theme={theme}
          {...props}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1
  }
});
