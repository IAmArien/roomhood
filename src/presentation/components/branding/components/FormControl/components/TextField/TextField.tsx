/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX, useImperativeHandle } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  FocusEvent,
  BlurEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  GestureResponderEvent,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/spring';

import {
  StaticPlaceholderProps,
  TextFieldExtendedRef,
  TextFieldLabelStyle,
  TextFieldProps,
  TextFieldState,
} from './types';
import { CircleCheckIcon, WarningIcon } from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';
import { Typography } from '../../../Typography/Typography';
import { useFormProvider } from '../../context/FormControlContext';
import { IFormControl } from '../../hooks';
import { registerFormControl, unregisterFormControl } from '../../hooks/useForm';
import { useCreateFormControl, useDefaultFormControl } from '../../hooks/useFormControl';
import { useFormValidation } from '../../hooks/useFormValidation';

export const DEFAULT_TEXT_FIELD_LABEL_ANIM_DURATION = 500;
export const defaultLabelStyle: TextFieldLabelStyle = {
  lineHeight: 32,
  fontSize: 16,
  paddingHorizontal: 0,
};
export const topLabelStyle: TextFieldLabelStyle = {
  lineHeight: 28,
  fontSize: 14,
  paddingHorizontal: 2,
};
const defaultContainerPosition = 24.5;
const topContainerPosition = 2;

/**
 * Internal functional component for Static Placeholder.
 * @param props Type of StaticPlaceholderProps
 * @see StaticPlaceholderProps
 * @returns JSX Element of Static Placeholder UI Element
 */
const StaticPlaceholder: React.FC<StaticPlaceholderProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors } = theme;
  const { testID, value = '', placeholder, height, textProps } = props;

  const remainingPlaceholder: string = placeholder?.slice(value.length) ?? '';

  const hasPlaceholder = (): boolean => placeholder !== undefined && placeholder !== '';

  return (
    <>
      {hasPlaceholder() && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 14,
            bottom: 0,
            right: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            height,
          }}
        >
          <Typography
            testID={testID}
            variant="description"
            size="md"
            color={colors.text.ghost}
            {...textProps}
          >
            <Typography
              variant="description"
              size="md"
              style={{ color: 'transparent' }}
              {...textProps}
            >
              {value}
            </Typography>
            {remainingPlaceholder}
          </Typography>
        </View>
      )}
    </>
  );
};

/**
 * Functional component for TextField, accepts props of the following: `value`, `label`,
 * `onChangeText`, `state`, `placeholder`.
 * Sample implementation below:
 * ```
  const control = useFormControl<string>("name");

  <TextField
    {...control}
    label="Enter value"
    placeholder="Value placeholder ..."
  />
  ```
 * @param props Type of TextFieldProps
 * @see TextFieldProps
 * @returns JSX Element of TextField
 */
export const TextField: React.FC<TextFieldProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors, typography, properties } = theme;
  const {
    testID,
    name,
    textFieldRef,
    extendedRef,
    label,
    inputMode,
    defaultValue,
    value = defaultValue,
    onChangeText,
    state = 'default',
    trailingIcon,
    trailingIconStyle,
    customSuccessIcon,
    customSuccessIconStyle,
    customErrorIcon,
    customErrorIconStyle,
    notes,
    notesVisibility = 'onFocus',
    defaultErrorMessage,
    errorMessage = defaultErrorMessage,
    staticPlaceholderTestID,
    placeholder,
    staticPlaceholder,
    staticPlaceholderStyle,
    customStyle,
    containerStyle,
    backgroundColor = colors.surface['white-surface'],
    placeholderTextColor = colors.text.ghost,
    selectionColor = colors.ui.secondary,
    onFocus,
    onBlur,
    style,
    onLayout,
    editable,
    placeholderVisibility = 'onFocus',
    defaultLabelPosition = 'center',
    defaultCenterLabelPosition = defaultContainerPosition,
    defaultTopLabelPosition = topContainerPosition,
    defaultCenterLabelStyle = defaultLabelStyle,
    defaultTopLabelStyle = topLabelStyle,
    controlLabelPosition,
    fixedLabel = false,
    animationDuration = DEFAULT_TEXT_FIELD_LABEL_ANIM_DURATION,
    requestFocus,
    validations,
    accessible = true,
    accessibilityLabel = 'animated-text-input',
    inputAccessoryViewID,
    ...restProps
  } = props;

  const { setFormControls } = useFormProvider<IFormControl<any>[]>() ?? {};

  const [localErrorMessage, setLocalErrorMessage] = useState<string | undefined>(undefined);
  const [localState, setLocalState] = useState<TextFieldState>('default');
  const [localIsValid, setLocalIsValid] = useState<boolean | undefined>(undefined);

  const [isFocused, setIsFocused] = useState<boolean | undefined>(undefined);
  const [textFieldHeight, setTextFieldHeight] = useState(0);

  const defaultTextFieldRef = useRef<TextInput>(null);

  const containerPosition = useSharedValue(
    defaultLabelPosition === 'top' ? defaultTopLabelPosition : defaultCenterLabelPosition
  );
  const labelStyle = useSharedValue(
    defaultLabelPosition === 'top' ? defaultTopLabelStyle : defaultCenterLabelStyle
  );

  const defaultTextStyle: TextStyle = {
    fontFamily: typography.description.md.fontFamily,
    fontWeight: typography.description.md.fontWeight as TextStyle['fontWeight'],
    fontSize: typography.description.md.fontSize,
    opacity: localState === 'disabled' ? 0.5 : undefined,
  };

  const springConfig: SpringConfig = {
    duration: animationDuration,
    dampingRatio: 1,
  };

  const accessibilityState = { disabled: localState === 'disabled' };

  const { validate, isValid } = useFormValidation({
    defaultErrorMessage,
    inputMode,
    validations,
    callback(state, message) {
      setLocalErrorMessage(message);
      setLocalState(state);
    },
  });

  const defaultFormControl = useDefaultFormControl<string>();
  const formControlObj = useCreateFormControl<string>({
    ...defaultFormControl,
    name: name ?? '',
    defaultValue,
    controlValue: value,
    state,
    errorMessage: localErrorMessage,
    notes,
    value,
    isValid: localIsValid,
    isFocused: isFocused,
    validations,
  });

  const requestFocusInternal = (requestFocus: boolean) => {
    setIsFocused(requestFocus);
    if (defaultTextFieldRef.current) {
      if (editable !== false) {
        if (requestFocus) {
          defaultTextFieldRef.current?.focus();
        } else {
          defaultTextFieldRef.current?.blur();
        }
      }
    } else {
      if (editable !== false) {
        if (requestFocus) {
          textFieldRef?.current?.focus();
        } else {
          textFieldRef?.current?.blur();
        }
      }
    }
  };

  const requestLabelPositionInternal = (position: 'top' | 'center') => {
    if (value === undefined || value?.length === 0) {
      if (fixedLabel) {
        return;
      }
      switch (position) {
        case 'top': {
          containerPosition.value = withSpring(defaultTopLabelPosition, springConfig);
          labelStyle.value = defaultTopLabelStyle;
          break;
        }
        case 'center': {
          containerPosition.value = withSpring(defaultCenterLabelPosition, springConfig);
          labelStyle.value = defaultCenterLabelStyle;
          break;
        }
        default:
          break;
      }
    }
  };

  /**
   * This portion of useEffect code is being used for form controls, where it creates
   * a new form control object then register itself (the textfield) to the form provider
   * for data aggregation.
   */
  useEffect(() => {
    if (name && name.length > 0) {
      setFormControls?.(prevControls => [
        ...registerFormControl<string>(formControlObj, prevControls),
      ]);
    }
  }, [value, name, state, localErrorMessage, notes, localIsValid, isFocused]);

  /**
   * This portion of useEffect code is being used to unregister the textfield (if registered)
   * from the form provider if the textfield component unmounts.
   */
  useEffect(() => {
    return () => {
      if (name && name.length > 0) {
        setFormControls?.(prevControls => [
          ...unregisterFormControl<string>(formControlObj, prevControls),
        ]);
      }
    };
  }, []);

  useEffect(() => {
    setLocalIsValid(isValid());
  }, [isValid()]);

  /**
   * This portion of code utilizes `extendedRef` prop which being used as
   * useImperativeHandle to add implementations to `TextFieldExtendedRef` that
   * extends the default prop functionality of the following: `setState`,
   * `requestFocus`, and `requestLabelPosition`.
   * Sample code implementation below on how to use this code using `useRef`:
   * ```
    const extendedRef = useRef<TextFieldExtendedRef>(null);

    const someTrigger = () => {
      // use the exposed properties here from `TextFieldExtendedRef`
      extendedRef.current?.requestLabelPosition('top'); 
      extendedRef.current?.requestFocus(true); 
      extendedRef.current?.setState('default');
    };

    <TextField
      label="Enter amount"
      placeholder="(eg. P1000.00)"
      extendedRef={extendedRef} // pass it as prop
      {...control}
    />
   * ```
   * @see requestFocusInternal
   * @see requestLabelPosition
   */
  useImperativeHandle(extendedRef, () => {
    const reference: TextFieldExtendedRef = {
      requestLabelPosition: position => requestLabelPositionInternal(position),
      requestFocus: focus => requestFocusInternal(focus),
      setState: state => setLocalState(state),
    };
    return reference;
  });

  /**
   * This portion of code utilizes `requestFocus` prop which programmatically
   * requesting focus / blur effect for the textfield. Exposing this prop will
   * help the textfield to control internal logic w/o the need of useRef.current,
   * if the textfield is not editable, it cannot request focus using useRef,
   * and so this `requestFocus` prop can help.
   */
  useEffect(() => {
    if (requestFocus !== undefined) {
      requestFocusInternal(requestFocus);
    }
  }, [requestFocus]);

  /**
   * This portion of code utilizes `controlLabelPosition` prop which programmatically
   * controls the position of the label of the textfield.
   * The field will be controlled if there are no current `value` and `fixedLabel`
   * is set to false.
   */
  useEffect(() => {
    if (controlLabelPosition !== undefined) {
      requestLabelPositionInternal(controlLabelPosition);
    }
  }, [controlLabelPosition]);

  /**
   * This portion of code utilizes `fixedLabel` prop which programmatically controls
   * the label of the textfield to be at the top regardless if textfield has value
   * or at focus state nor blur state etc. Please also see its other implementations
   * in `handleOnBlur()` callback function
   * @see handleOnBlur
   * @see handleOnFocus
   */
  useEffect(() => {
    if (fixedLabel) {
      containerPosition.value = withSpring(defaultTopLabelPosition, springConfig);
      labelStyle.value = defaultTopLabelStyle;
      return;
    }
    if (value !== undefined) {
      if (value.length >= 1) {
        containerPosition.value = withSpring(defaultTopLabelPosition, springConfig);
        labelStyle.value = defaultTopLabelStyle;
      }
    } else {
      containerPosition.value = withSpring(defaultCenterLabelPosition, springConfig);
      labelStyle.value = defaultCenterLabelStyle;
    }
  }, [value]);

  useEffect(() => {
    validate(value, value, isFocused);
  }, [value]);

  useEffect(() => {
    setLocalErrorMessage(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    setLocalState(state);
  }, [state]);

  const onTextInputLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTextFieldHeight(height);
    onLayout?.(event);
  };

  const handleOnFocus = (e: FocusEvent) => {
    containerPosition.value = withSpring(defaultTopLabelPosition, springConfig);
    labelStyle.value = defaultTopLabelStyle;
    setIsFocused(true);
    validate(value, value, true);
    onFocus?.(e);
  };

  const handleOnBlur = (e: BlurEvent) => {
    if (fixedLabel) {
      containerPosition.value = withSpring(defaultTopLabelPosition, springConfig);
      labelStyle.value = defaultTopLabelStyle;
    } else if (value === undefined || value?.length === 0) {
      containerPosition.value = withSpring(defaultCenterLabelPosition, springConfig);
      labelStyle.value = defaultCenterLabelStyle;
    }
    setIsFocused(false);
    validate(value, value, false);
    onBlur?.(e);
  };

  const handleOnPressLabel = (e: GestureResponderEvent) => {
    e.preventDefault();
    if (defaultTextFieldRef.current) {
      defaultTextFieldRef.current.focus();
    } else {
      textFieldRef?.current?.focus();
    }
  };

  const hasLabel = (): boolean => label !== undefined && label !== '';

  const hasError = (): boolean => localState === 'error';

  const hasErrorMessage = (): boolean => (localErrorMessage?.length ?? 0) > 0;

  const hasNotes = (): boolean => (notes?.length ?? 0) > 0;

  const showNotes = (): boolean => {
    let showNote = false;
    if (notesVisibility === 'onFocus') {
      if (isFocused !== undefined) {
        showNote = isFocused;
      }
    } else showNote = true;
    return showNote;
  };

  const hasTrailingIcon = (): boolean => trailingIcon !== undefined;

  const hasTrailingStateIcon = (): boolean => {
    const hasCustomIcon = trailingIcon !== undefined;
    return hasError() || localState === 'success' || hasCustomIcon;
  };

  const hasStaticPlaceholder = (): boolean =>
    staticPlaceholder !== undefined && staticPlaceholder !== '';

  const getPlaceholder = (): string | undefined => {
    // if static placeholder is given, a separate component for adding placeholder
    // is called, so we are returning an `undefined` value here.
    if (hasStaticPlaceholder()) {
      return undefined;
    }
    if (placeholderVisibility === 'onFocus') {
      // if there's no label provided for the textfield, we have to display the
      // placeholder so the textfield is not naked until being focused, otherwise
      // we will show the placeholder `onFocus`.
      if (label === undefined) {
        return placeholder;
      }
      return isFocused ? placeholder : undefined;
    }
    return placeholder;
  };

  const getDefaultTextStyle = (): TextStyle => {
    return {
      ...defaultTextStyle,
      color: colors.text.clearest,
    };
  };

  const getStateTextStyle = (): TextStyle => {
    let defaultStyle = getDefaultTextStyle();
    if (hasError()) {
      defaultStyle = {
        ...defaultStyle,
        borderColor: colors.functional.negative,
        borderWidth: 1,
      };
    }
    if (isFocused) {
      if (hasError()) {
        defaultStyle = {
          ...defaultStyle,
          borderColor: colors.functional.negative,
          borderWidth: 1,
        };
      } else {
        defaultStyle = {
          ...defaultStyle,
          borderWidth: 2,
          borderColor: colors.ui.primary,
        };
      }
    }
    if (hasTrailingStateIcon()) {
      defaultStyle = {
        ...defaultStyle,
        paddingRight: 40,
      };
    }
    return defaultStyle;
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 12,
      top: containerPosition.value,
      flexDirection: 'row',
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      ...defaultTextStyle,
      opacity: 1,
      color: colors.text.clear,
      backgroundColor,
      lineHeight: labelStyle.value.lineHeight,
      fontSize: labelStyle.value.fontSize,
      paddingHorizontal: labelStyle.value.paddingHorizontal,
    };
  });

  const renderTrailingStateIcons = (): JSX.Element => {
    // renders trailing success icon, custom success icon will be displayed if the
    // icon was provided and can be styled using customSuccessIconStyle
    if (localState === 'success') {
      if (customSuccessIcon !== undefined) {
        return (
          <View style={[styles.trailingIcon, customSuccessIconStyle]}>
            <View testID={`input-success-icon-${testID}`}>{customSuccessIcon}</View>
          </View>
        );
      }
      return (
        <View style={[styles.trailingIcon, customSuccessIconStyle]}>
          <View testID={`input-success-icon-${testID}`}>
            <CircleCheckIcon />
          </View>
        </View>
      );
    }
    // renders trailing error icon, custom error icon will be displayed if the
    // icon was provided and can be styled using customErrorIconStyle
    if (localState === 'error') {
      if (customErrorIcon !== undefined) {
        return (
          <View style={[styles.trailingIcon, customErrorIconStyle]}>
            <View testID={`input-error-icon-${testID}`}>{customErrorIcon}</View>
          </View>
        );
      }
      return (
        <View style={[styles.trailingIcon, customSuccessIconStyle]}>
          <View testID={`input-error-icon-${testID}`}>
            <WarningIcon />
          </View>
        </View>
      );
    }
    // renders custom trailing icon, if textfield state is not `success` or `error`,
    // the icon will be automatically displayed if provided and can be styled using
    // trailingIconStyle
    if (hasTrailingIcon()) {
      return (
        <View
          testID={`input--trailing-icon-${testID}`}
          style={[styles.trailingIcon, trailingIconStyle]}
        >
          {trailingIcon}
        </View>
      );
    }
    return <></>;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View testID="textfield-inner-container-view">
        <TextInput
          ref={textFieldRef ?? defaultTextFieldRef}
          testID={testID}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={accessibilityState}
          inputAccessoryViewID={inputAccessoryViewID}
          onLayout={onTextInputLayout}
          inputMode={inputMode}
          value={value}
          placeholder={getPlaceholder()}
          onChangeText={onChangeText}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
          editable={localState !== 'disabled' && editable}
          style={[
            styles.textField,
            {
              backgroundColor,
              borderColor: colors.border.grey,
              borderRadius: properties.radius.round,
            },
            getStateTextStyle(),
            customStyle,
            style,
          ]}
          {...restProps}
        />
        {isFocused && hasStaticPlaceholder() && (
          <StaticPlaceholder
            testID={staticPlaceholderTestID}
            value={value}
            placeholder={staticPlaceholder}
            textProps={staticPlaceholderStyle}
            theme={theme}
            height={textFieldHeight}
          />
        )}
        {renderTrailingStateIcons()}
      </View>
      {hasLabel() && (
        <Animated.View style={animatedContainerStyle}>
          <Pressable
            testID={`input-pressable-field-name-${testID}`}
            accessible={false}
            disabled={localState === 'disabled' || editable === false}
            onPress={handleOnPressLabel}
          >
            <Animated.Text
              testID={`input-field-name-${testID}`}
              style={animatedLabelStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </Animated.Text>
          </Pressable>
        </Animated.View>
      )}
      {hasError() ? (
        <>
          {hasErrorMessage() && (
            <Typography
              testID={`input-error-message-${testID}`}
              variant="description"
              size="sm"
              color={colors.functional.negative}
              style={{
                marginTop: 3,
                marginHorizontal: 1,
              }}
            >
              {localErrorMessage}
            </Typography>
          )}
        </>
      ) : (
        <>
          {hasNotes() && showNotes() && (
            <Typography
              testID={`input-notes-${testID}`}
              variant="description"
              size="sm"
              color={colors.text.clearer}
              style={{
                marginTop: 3,
                marginHorizontal: 1,
              }}
            >
              {notes}
            </Typography>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
  },
  textField: {
    height: 48,
    borderWidth: 1,
    padding: 8,
  },
  trailingIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
