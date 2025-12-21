/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useRef, useState, useEffect } from 'react';

import { IFormControl } from './useFormControl';
import { FormControlState, FormProviderFields } from '../types';

export interface FormState {
  /**
   * @param isValid boolean value that tells if the form is in the state of being valid
   */
  isValid: boolean;
  /**
   * @param isFocused boolean value that tells if the form is in the state of change
   */
  isFocused: boolean;
}

export interface IFormData<T> {
  /**
   * @param name string value for the name of the form control field
   */
  name: string;
  /**
   * @param defaultValue generic type of `T` value for the defaultValue provided in
   * the `useFormControl` hook
   */
  defaultValue: T | undefined;
  /**
   * @param controlValue generic type of `T` value that holds the data in any form
   * controls (eg. dropdown, textfields, radio-buttons, checkboxes). This param
   * is always updated regardless of type of form control
   */
  controlValue: T | undefined;
  /**
   * @param state FormControlState that can be used to tell if the form is already
   * valid or not
   */
  state: FormControlState;
  /**
   * @param value generic type of `T` value that holds the value from the textfield
   */
  value: T | undefined;
  /**
   * @param selectedValue generic type of `T` value that holds the value from the radio
   * buttons and checkboxes
   */
  selectedValue: T | undefined;
  /**
   * @param isValid boolean value that tells if the form control component is in the valid
   * state, means no error encountered
   */
  isValid?: boolean;
}

export interface IForm<T1, T2> {
  /**
   * @param formRef React Ref with type of FormProviderFields for serving as reference
   * for the form provider
   */
  formRef: React.RefObject<FormProviderFields | null>;
  /**
   * @param data IFormData of generic type of `T1` for aggregating all data from form
   * controls in array
   */
  data: IFormData<T1>[];
  /**
   * @param formControls Generic type of `T2` or undefined that extends IFormControl of
   * generic `T1`, which holds all the data from the form controls
   */
  formControls: T2 | undefined;
  /**
   * @param setFormControls State action for generic type of `T2` to regularly updates
   * the `formControls` about the given updates being triggered
   */
  setFormControls: React.Dispatch<React.SetStateAction<T2 | undefined>>;
  /**
   * @param formState FormState type to be used if the form is already in the valid state
   */
  formState: FormState;
  /**
   * @param setFormState State action for FormState
   */
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

/**
 * React hook function for handy use of <FormProvider> component.
 * Sample implementation below:
 * ```
  // If Form content has `Dropdown`, a `TextField / Radio Buttons`, and `Checkboxes`.
  type FieldTypes = DropdownOption | string | string[];
  const form = useForm<FieldTypes, IFormControl<FieldTypes>[]>();

  // If Form content has `Dropdown` only.
  const form = useForm<DropdownOption, IFormControl<DropdownOption>[]>();

  // If Form content has `TextField / Radio Buttons` only.
  const form = useForm<string, IFormControl<string>[]>();

  // If Form content has `Checkboxes` only.
  const form = useForm<string[], IFormControl<string[]>[]>();
 * ```
 * @see IForm
 * @see IFormData
 * @see FormState
 * @returns Type of IForm with generic type of `T1` and `T2`
 */
export const useForm = <T1, T2 extends IFormControl<T1>[]>(): IForm<T1, T2> => {
  const [formControls, setFormControls] = useState<T2>();
  const [formState, setFormState] = useState<FormState>({
    isValid: true,
    isFocused: false,
  });

  const formRef = useRef<FormProviderFields | null>(null);

  useEffect(() => {
    if (formControls !== undefined) {
      const controls = formControls as IFormControl<T1>[];
      const hasSomeFocusableFields = controls.some(v => v.isFocused === true);
      const hasSomeErrors = controls.some(v => {
        /**
         * If the form control component has some `validations` config applied, we have
         * to check if the `isValid` property is also `undefined`, aside from if it's false,
         * otherwise we can only check if the `isValid` property is false.
         */
        if (v.validations) {
          // we check here if the form control is not valid, or undefined (meaning the
          // form control component is in its default state)
          return v.isValid === false || v.isValid === undefined;
        }
        return v.isValid === false;
      });
      setFormState({ isValid: !hasSomeErrors, isFocused: hasSomeFocusableFields });
    }
  }, [formControls]);

  const getData = (): IFormData<T1>[] => {
    return (
      formControls?.map?.(v => {
        return {
          name: v.name,
          defaultValue: v.defaultValue,
          controlValue: v.controlValue,
          state: v.state,
          value: v.value,
          selectedValue: v.selectedValue,
          isValid: v.isValid,
        };
      }) ?? []
    );
  };

  return {
    formRef,
    data: getData(),
    formControls,
    setFormControls,
    formState,
    setFormState,
  };
};

/**
 * Aggregates, filters, and updates the array of form controls from `FormProvider` to
 * synchronously streamline the data to the FormProvider context.
 * @param controlObj IFormControl of generic type of `T`
 * @param controls array of IFormControl of generic type of `T`
 * @returns Aggregated and updated values of IFormControl in an array
 */
export const registerFormControl = <T extends any>(
  controlObj: IFormControl<T>,
  controls?: IFormControl<T>[]
): IFormControl<T>[] => {
  if (controls) {
    const filteredControls = controls.filter(v => v.name === controlObj.name);
    if (filteredControls.length === 0) {
      return [...controls, controlObj];
    }
    const mappedControls = controls.map(v => {
      if (v.name === controlObj.name) {
        return controlObj;
      }
      return v;
    });
    return [...mappedControls];
  } else {
    return [controlObj];
  }
};

/**
 * Unregisters, filters, and updates the array of form controls from `FormProvider` to
 * synchronously streamline the data to the FormProvider context.
 * @param controlObj IFormControl of generic type of `T`
 * @param controls array of IFormControl of generic type of `T`
 * @returns Aggregated and updated values of IFormControl in an array
 */
export const unregisterFormControl = <T extends any>(
  controlObj: IFormControl<T>,
  controls?: IFormControl<T>[]
): IFormControl<T>[] => {
  if (controls) {
    const filteredControls = controls.filter(v => v.name !== controlObj.name);
    return [...filteredControls];
  } else {
    return [];
  }
};
