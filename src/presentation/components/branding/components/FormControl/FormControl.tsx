/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX, useEffect, useMemo } from 'react';
import { View } from 'react-native';

import {
  FormControlContext,
  useFormProvider
} from './context/FormControlContext';
import { IFormControl } from './hooks';
import { registerFormControl, unregisterFormControl } from './hooks/useForm';
import {
  useCreateFormControl,
  useDefaultFormControl
} from './hooks/useFormControl';
import { FormControlProps } from './types';

/**
 * Functional component for FormControl component. Accepts props of the following:
 * `defaultValue`, `controlValue`, `state`, `errorMessage`, `notes`, `selectedValue`,
 * `autoResetState`.
 * Sample implementation below:
 * ```
  // FORM CONTROL USING DROPDOWN
  const control = useFormControl<DropdownOption>("dropdown-name");
  <FormControl {...control} style={styles.control}>
    ...
    ...
  </FormControl>

   // FORM CONTROL USING TEXTFIELD
  const control = useFormControl<string>("textfield-name");
  <TextField {...control} />

  // FORM CONTROL USING RADIO BUTTON
  const control = useFormControl<string>("radio-group-name");
  <FormControl {...control} style={styles.control}>
    ...
    ...
  </FormControl>

  // FORM CONTROL USING CHECKBOXES
  const control = useFormControl<string[]>("checkboxes-name");
  <FormControl {...control} style={styles.control}>
    ...
    ...
  </FormControl>
 * ```
 * @param props Type of FormControlProps that extends any
 * @see FormControlProps
 * @returns JSX Element of FormControl component
 */
export const FormControl = <T extends any>(
  props: FormControlProps<T>
): JSX.Element => {
  const {
    name,
    defaultNotes,
    defaultErrorMessage,
    defaultValue,
    controlValue,
    setControlValue,
    state,
    setState,
    errorMessage,
    setErrorMessage,
    notes,
    setNotes,
    value,
    setValue,
    selectedValue,
    setSelectedValue,
    onChangeText,
    style,
    validations,
    isValid,
    setIsValid,
    children
  } = props;

  const { setFormControls } = useFormProvider<IFormControl<T>[]>() ?? {};

  const initialValue = useMemo(() => {
    return {
      name,
      defaultValue,
      defaultErrorMessage,
      controlValue,
      setControlValue,
      state,
      setState,
      errorMessage,
      setErrorMessage,
      notes,
      setNotes,
      value,
      setValue,
      selectedValue,
      setSelectedValue,
      validations,
      isValid,
      setIsValid
    };
  }, [
    name,
    controlValue,
    state,
    errorMessage,
    notes,
    value,
    selectedValue,
    isValid
  ]);

  const defaultFormControl = useDefaultFormControl<T>();
  const formControlObj = useCreateFormControl<T>({
    ...defaultFormControl,
    name,
    defaultNotes,
    defaultValue,
    controlValue,
    setControlValue,
    state,
    setState,
    errorMessage,
    setErrorMessage,
    notes,
    setNotes,
    value,
    setValue,
    selectedValue,
    setSelectedValue,
    onChangeText,
    isValid,
    validations
  });

  useEffect(() => {
    if (name && name.length > 0) {
      setFormControls?.(prevControls => [
        ...registerFormControl<T>(formControlObj, prevControls)
      ]);
    }
  }, [controlValue, name, state, errorMessage, notes, isValid]);

  useEffect(() => {
    return () => {
      if (name && name.length > 0) {
        setFormControls?.(prevControls => [
          ...unregisterFormControl<T>(formControlObj, prevControls)
        ]);
      }
    };
  }, []);

  return (
    <FormControlContext.Provider value={initialValue}>
      <View style={style}>{children}</View>
    </FormControlContext.Provider>
  );
};
