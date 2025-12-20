/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { useEffect, useRef, useState } from 'react';
import { FormControlState, FormValidations } from '../types';
import { TextInput } from 'react-native';
import { TextFieldExtendedRef } from '../components/TextField/types';

export interface IFormControl<T> {
  /**
   * @param textFieldRef React RefObject of TextInput to be used as ref
   */
  textFieldRef?: React.RefObject<TextInput | null>;
  /**
   * @param extendedRef React RefObject of TextInput to be used as ref
   */
  extendedRef?: React.RefObject<TextFieldExtendedRef | null>;
  /**
   * @param name string value for the custom name of the form control component
   */
  name: string;
  /**
   * @param defaultNotes string value for default note label
   */
  defaultNotes?: string;
  /**
   * @param defaultValue generic type of T for default value
   */
  defaultValue: T | undefined;
  /**
   * @param defaultErrorMessage string value for the default error message
   * to be displayed, useful especially if the errorMessage will not be changed
   */
  defaultErrorMessage?: string;
  /**
   * @param controlValue generic type of T for control value, this value is always
   * updated regardless of type of component (Dropdown, TextField, Checkbox, Radio)
   */
  controlValue: T | undefined;
  /**
   * @param setControlValue state action for setting values to `controValue`
   */
  setControlValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  /**
   * @param state FormControlState that holds different types of states, `disabled`,
   * `default`, `error`, `success`
   */
  state: FormControlState;
  /**
   * @param setState state action for setting values to `state`
   */
  setState: React.Dispatch<React.SetStateAction<FormControlState>>;
  /**
   * @param errorMessage string value for custom error message
   */
  errorMessage?: string;
  /**
   * @param setErrorMessage state action for setting values to `errorMessage`
   */
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  /**
   * @param notes string value for component's notes
   */
  notes?: string;
  /**
   * @param setNotes state action for setting values to `notes`
   */
  setNotes: React.Dispatch<React.SetStateAction<string | undefined>>;
  /**
   * @param value generic type of T for textfield's value
   */
  value: T | undefined;
  /**
   * @param setValue state action for setting values for `value`
   */
  setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  /**
   * @param selectedValue generic type of T for the selected value of
   * checkboxes and radio buttons
   */
  selectedValue: T | undefined;
  /**
   * @param setSelectedValue state action for setting values to `selectedValue`
   */
  setSelectedValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  /**
   * @param onChangeText callback function that triggers whenever controlValue
   * changes
   */
  onChangeText?: (value: T | undefined) => void;
  /**
   * @param resetValue callback function to be used when form control value will
   * be reset
   * @returns void
   */
  resetValue: () => void;
  /**
   * @param validations FormValidations for validating fields with certain requirements
   * being validated
   */
  validations?: FormValidations<T>;
  /**
   * @param isValid boolean value that tells if the form control component is in the valid
   * state, means no error encountered
   */
  isValid?: boolean;
  /**
   * @param setIsValid state action that updates the value of the `isValid` prop
   */
  setIsValid: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  /**
   * @param isFocused boolean value that tells if the form control component is in focus state
   */
  isFocused?: boolean;
  /**
   * @param setIsFocused state action that updates the value of the `isFocused` prop
   */
  setIsFocused: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export interface IFormControlParams<T> {
  /**
   * @param defaultNotes string value for the default notes to be displayed,
   * useful especially if the notes will not be changed
   */
  defaultNotes?: string;
  /**
   * @param defaultErrorMessage string value for the default error message
   * to be displayed, useful especially if the errorMessage will not be changed
   */
  defaultErrorMessage?: string;
  /**
   * @param defaultValue generic type of `T` which holds the default value to be
   * displayed of whatever the type of form control is
   */
  defaultValue?: T;
  /**
   * @param onValueChange callback function being triggered whenever the controlValue
   * change
   * @param controlValue generic type of `T` from the controlValue of the form control
   * @returns void
   */
  onValueChange?: (controlValue?: T) => void;
  /**
   * @param overrideChangeText overrides the onChangeText function of TextField before
   * using the default prop of the TextInput `onChangeText`
   * @param controlValue generic type of `T` from the controlValue of the form control
   * @returns generic type of `T` of the form control
   */
  overrideChangeText?: (controlValue?: T) => T;
  /**
   * @param validations FormValidations for validating fields with certain requirements
   * being validated
   */
  validations?: FormValidations<T>;
}

/**
 * React hook function for handy use of <FormControl> component. Accepts params
 * of `name` and `params` of type IFormControlParams
 * Sample implementation below:
 * ```
  // BY USING DROPDOWN FORM CONTROL
  const control = useFormControl<DropdownOption>("name");
  const { controlValue, state, errorMessage } = control;

  // BY USING TEXTFIELD
  const control = useFormControl<string>("name");
  const { controlValue, state, errorMessage } = control;

  // BY USING RADIO BUTTON
  const control = useFormControl<string>("name");
  const { controlValue, state, errorMessage } = control;

  // BY PROVIDING DEFAULT VALUE FOR DROPDOWN FORM CONTROL
  const control = useFormControl<DropdownOption>("name", {
    defaultValue: {
      title: "BINI COLET",
      value: "COLET"
    }
  });

  // BY PROVIDING DEFAULT VALUE FOR TEXTFIELD
  const control = useFormControl<string>("name", {
    defaultValue: "This is default value..."
  });

  // BY SETTING STATES LIKE `error`, `disabled`, `success`
  const control = useFormControl<string>("name");
  const { state, setState } = control;

  setState('disabled');
  setState('error');
  setState('success');
 * ```
 * @param name string value for the custom name of the form control component
 * @param params Type of IFormControlParams
 * @see IFormControlParams
 * @returns Type of IFormControl that has series of state values and actions that
 * the FormControl is using.
 */
export const useFormControl = <T extends any>(
  name: string,
  params?: IFormControlParams<T>
): IFormControl<T> => {
  const {
    defaultNotes,
    defaultErrorMessage,
    defaultValue,
    onValueChange,
    overrideChangeText,
    validations
  } = params ?? {};

  const textFieldRef = useRef<TextInput | null>(null);
  const extendedRef = useRef<TextFieldExtendedRef | null>(null);

  const [controlValue, setControlValue] = useState<T | undefined>(defaultValue);
  const [formState, setFormState] = useState<FormControlState>('default');

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    defaultErrorMessage
  );
  const [notes, setNotes] = useState<string | undefined>(defaultNotes);

  const [value, setValue] = useState<T | undefined>(defaultValue);

  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    defaultValue
  );

  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const [isFocused, setIsFocused] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    onValueChange?.(controlValue);
  }, [controlValue]);

  useEffect(() => {
    setControlValue(value);
  }, [value]);

  useEffect(() => {
    setControlValue(selectedValue);
  }, [selectedValue]);

  const onChangeText = (value: T | undefined) => {
    if (overrideChangeText) {
      setValue(overrideChangeText(value));
    } else {
      setValue(value);
    }
  };

  const resetValue = () => {
    setControlValue(undefined);
    setValue(undefined);
    setSelectedValue(undefined);
  };

  const defaultValidations: FormValidations<T> = {
    required: validations?.required,
    validationTrigger: validations?.validationTrigger ?? 'onTextChange',
    min: validations?.min,
    max: validations?.max,
    minLength: validations?.minLength,
    maxLength: validations?.maxLength,
    customValidation: validations?.customValidation
  };

  const control: IFormControl<T> = {
    textFieldRef,
    extendedRef,
    name,
    defaultNotes,
    defaultErrorMessage,
    defaultValue,
    controlValue,
    setControlValue,
    state: formState,
    setState: setFormState,
    errorMessage,
    setErrorMessage,
    notes,
    setNotes,
    value,
    setValue,
    onChangeText,
    selectedValue,
    setSelectedValue,
    resetValue,
    validations: validations ? defaultValidations : undefined,
    isValid,
    setIsValid,
    isFocused,
    setIsFocused
  };

  return control;
};

/**
 * Creates a default IFormControl object with a corresponding default values and
 * default callback functions.
 * @see useCreateFormControl
 * @see IFormControl
 * @returns IFormControl of generic type of `T`
 */
export const useDefaultFormControl = <T extends any>(): IFormControl<T> => {
  return useCreateFormControl<T>({
    textFieldRef: undefined,
    extendedRef: undefined,
    name: '',
    defaultNotes: undefined,
    defaultValue: undefined,
    controlValue: undefined,
    setControlValue: _controValue => {},
    state: 'default',
    setState: _state => {},
    errorMessage: undefined,
    setErrorMessage: _errorMessage => {},
    notes: undefined,
    setNotes: _notes => {},
    value: undefined,
    setValue: () => {},
    selectedValue: undefined,
    setSelectedValue: _selectedValue => {},
    onChangeText: _value => {},
    resetValue: () => {},
    validations: {},
    isValid: false,
    setIsValid: () => {},
    isFocused: false,
    setIsFocused: () => {}
  });
};

/**
 * Create a new object for IFormControl aggregating corresponding values from its
 * params of type of IFormControl.
 * Sample implementation:
 * ```
    const newFormControl = useCreateFormControl<string>({
      ...
      ...
      ...
    });
 * ```
 * @see IFormControl
 * @param params IFormControl of generic type of `T`
 * @returns IFormControl of generic type of `T`
 */
export const useCreateFormControl = <T extends any>(
  params: IFormControl<T>
): IFormControl<T> => {
  const control: IFormControl<T> = {
    textFieldRef: params.textFieldRef,
    extendedRef: params.extendedRef,
    name: params.name,
    defaultNotes: params.defaultNotes,
    defaultValue: params.defaultValue,
    controlValue: params.controlValue,
    setControlValue: params.setControlValue,
    state: params.state,
    setState: params.setState,
    errorMessage: params.errorMessage,
    setErrorMessage: params.setErrorMessage,
    notes: params.notes,
    setNotes: params.setNotes,
    value: params.value,
    setValue: params.setValue,
    onChangeText: params.onChangeText,
    selectedValue: params.selectedValue,
    setSelectedValue: params.setSelectedValue,
    resetValue: params.resetValue,
    validations: params.validations,
    isValid: params.isValid,
    setIsValid: params.setIsValid,
    isFocused: params.isFocused,
    setIsFocused: params.setIsFocused
  };
  return control;
};
