/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX, useEffect, useMemo, useState } from 'react';
import {
  DropdownContext,
  IDropdownSelection,
  useDropdownSelection
} from './context/DropdownContext';
import {
  Option as DropdownOption,
  OptionProps,
  DropdownPropsWithType,
  DropdownType
} from './types';
import { useTheme } from '../../../../provider/ThemeProvider';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { Typography } from '../../../Typography/Typography';
import { ModalDropdown } from './components/Modal/ModalDropdown';
import { SelectionDropdown } from './components/Selection/SelectionDropdown';
import { AutoCompleteDropdown } from './components/Autocomplete/AutocompleteDropdown';
import { useFormControl } from '../../context/FormControlContext';
import { useFormValidation } from '../../hooks/useFormValidation';

/**
 * Functional component for Dropdown Element. Accepts props of the following:
 * `label`, `placeholder`, `style`, `theme`. Corresponding props for each type of modal will
 * varies depending on the type.
 * Sample implementation below:
 * ```
  // SAMPLE MODAL DROPDOWN IMPLEMENTATION
  const control = useFormControl<DropdownOption>("dropdown-name");
  <FormControl {...control} style={styles.control}>
    <Dropdown
      type="modal"
      label="Choose your BIAS in BINI"
      modalLabel="Choose your BIAS in BINI">
      <Option title="BINI AIAH" value="AIAH" />
      <Option title="BINI COLET" value="COLET" />
      <Option title="BINI MALOI" value="MALOI" />
      <Option title="BINI GWEN" value="GWEN" />
      <Option title="BINI STACEY" value="STACEY" />
      <Option title="BINI MIKHA" value="MIKHA" />
      <Option title="BINI JHOANNA" value="JHOANNA" />
      <Option title="BINI SHEENA" value="SHEENA" />
    </Dropdown>
  </FormControl>

  // SAMPLE SELECTION DROPDOWN IMPLEMENTATION
  const control = useFormControl<DropdownOption>("dropdown-name");
  <FormControl {...control} style={styles.control}>
    <Dropdown type="selection" label="Choose your BIAS in BINI">
      <Option title="BINI AIAH" value="AIAH" />
      <Option title="BINI COLET" value="COLET" />
      <Option title="BINI MALOI" value="MALOI" />
      <Option title="BINI GWEN" value="GWEN" />
      <Option title="BINI STACEY" value="STACEY" />
      <Option title="BINI MIKHA" value="MIKHA" />
      <Option title="BINI JHOANNA" value="JHOANNA" />
      <Option title="BINI SHEENA" value="SHEENA" />
    </Dropdown>
  </FormControl>
 * ```
 * @param props Type of DropdownPropsWithType that extends type of DropdownType
 * @see DropdownPropsWithType
 * @see DropdownType
 * @returns JSX Element of Dropdown Component
 */
export const Dropdown = <T extends DropdownType>(
  props: DropdownPropsWithType<T>
): JSX.Element => {
  const { type = 'modal', children } = props;

  const {
    setIsValid,
    setState,
    setErrorMessage,
    defaultErrorMessage,
    defaultValue,
    controlValue,
    validations
  } = useFormControl<DropdownOption | undefined>();

  const [selectedOption, setSelectedOption] = useState<
    DropdownOption | undefined
  >(undefined);
  const [dropdownValue, setDropdownValue] = useState<
    DropdownOption | undefined
  >(undefined);

  const [toggleMenu, setToggleMenu] = useState(false);

  const { validate, isValid } = useFormValidation<DropdownOption>({
    defaultErrorMessage,
    validations,
    callback(state, message) {
      setErrorMessage(message);
      setState(state);
    }
  });

  const initialValue = useMemo(() => {
    const selection: IDropdownSelection = {
      type,
      value: dropdownValue,
      selected: selectedOption,
      setSelected: setSelectedOption,
      toggleMenu,
      setToggleMenu
    };
    return selection;
  }, [selectedOption, dropdownValue, toggleMenu]);

  useEffect(() => {
    setSelectedOption(controlValue);
    setDropdownValue(controlValue);
    validate(controlValue, controlValue?.title, false);
  }, [controlValue]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
      setDropdownValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    setIsValid(isValid());
  }, [isValid()]);

  return (
    <DropdownContext.Provider value={initialValue}>
      {type === 'autocomplete' && (
        <AutoCompleteDropdown {...props}>{children}</AutoCompleteDropdown>
      )}
      {type === 'modal' && <ModalDropdown {...props}>{children}</ModalDropdown>}
      {type === 'selection' && (
        <SelectionDropdown {...props}>{children}</SelectionDropdown>
      )}
    </DropdownContext.Provider>
  );
};

/**
 * Functional component for Dropdown Option component. Accepts props of the following:
 * `title`, `value`, `customTitle`, `optionKey`, `customReturnValue`, `style`.
 * Sample implementation below:
 * ```
  <Option title="BINI AIAH" value="AIAH" />
  <Option title="BINI COLET" value="COLET" />
  <Option title="BINI MALOI" value="MALOI" />
  <Option title="BINI GWEN" value="GWEN" />
  <Option title="BINI STACEY" value="STACEY" />
  <Option title="BINI MIKHA" value="MIKHA" />
  <Option title="BINI JHOANNA" value="JHOANNA" />
  <Option title="BINI SHEENA" value="SHEENA" />
 * ```
 * @param props Type of OptionProps that extends generic type of T for custom return value
 * @see OptionProps
 * @returns JSX Element for Dropdown Option component
 */
export const Option = <T extends any>(props: OptionProps<T>): JSX.Element => {
  const defaultTheme = useTheme();
  const theme = props.theme || defaultTheme;
  const { colors } = theme;
  const {
    testID,
    disabled = false,
    value,
    title,
    customTitle,
    customReturnValue: customValue,
    optionKey,
    textProps,
    style,
    accessible = true,
    accessibilityLabel = 'dropdown-option-label',
    accessibilityRole = 'button',
    role = 'button',
    ...restProps
  } = props;

  const { setControlValue } = useFormControl<DropdownOption | undefined>();

  const { type, selected, setSelected, setToggleMenu } = useDropdownSelection();

  const accessibilityState = {
    selected: selected?.value === value,
    disabled: disabled
  };

  const hasCustomTitle = (): boolean => customTitle !== undefined;

  const isSelected = (): boolean => {
    return selected?.value === value;
  };

  const onSelectItem = (e: GestureResponderEvent) => {
    const selected: DropdownOption = {
      value,
      title,
      optionKey,
      customValue
    };
    e.preventDefault();
    if (type === 'modal') {
      setSelected(selected);
    } else {
      setControlValue(selected);
      setToggleMenu(false);
    }
  };

  return (
    <TouchableOpacity
      {...restProps}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      role={role}
      onPress={onSelectItem}
      style={[
        styles.optionContainer,
        isSelected() && {
          backgroundColor: colors.surface['lightest-periwinkle']
        },
        disabled && {
          opacity: 0.5
        },
        style
      ]}>
      {hasCustomTitle() ? (
        <>{customTitle?.()}</>
      ) : (
        <Typography
          testID={`${testID}-option-title`}
          variant="description"
          size="lg"
          color={colors.text.clearest}
          {...textProps}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
