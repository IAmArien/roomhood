/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FormState, IFormData } from '../hooks/useForm';
import { IFormControl } from '../hooks';

export type FormControlState = 'disabled' | 'default' | 'error' | 'success';
export type FormValidationOption<T> = {
  validation: T;
  message?: string;
};
export type CustomFormValidationReturn = {
  valid: boolean;
  message?: string;
};
export type FormValidations<T> = {
  validationTrigger?: 'onTextChange' | 'onBlur';
  required?: boolean;
  min?: FormValidationOption<number>;
  minLength?: FormValidationOption<number>;
  max?: FormValidationOption<number>;
  maxLength?: FormValidationOption<number>;
  customValidation?: (controlValue?: T) => CustomFormValidationReturn;
};

/**
 * @param name string value for the custom name of the form control component
 * @param defaultNotes string value for default note label
 * @param defaultValue generic type of T for default value
 * @param controlValue generic type of T for control value, this value is always
 * updated regardless of type of component (Dropdown, TextField, Checkbox, Radio)
 * @param setControlValue state action for setting values to `controValue`
 * @param state FormControlState that holds different types of states, `disabled`,
 * `default`, `error`, `success`
 * @param setState state action for setting values to `state`
 * @param errorMessage string value for custom error message
 * @param setErrorMessage state action for setting values to `errorMessage`
 * @param notes string value for component's notes
 * @param setNotes state action for setting values to `notes`
 * @param value generic type of T for textfield's value
 * @param setValue state action for setting values for `value`
 * @param selectedValue generic type of T for the selected value of
 * checkboxes and radio buttons
 * @param setSelectedValue state action for setting values to `selectedValue`
 * @param onChangeText callback function that triggers whenever controlValue
 * changes
 * @param style StyleProp of ViewStyle for customizing the style of the form control
 * container view
 * @param validations FormValidations for validating fields with certain requirements
 * being validated
 */
export type FormControlProps<T> = {
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
   * @param value generic type of T which contains the `controlValue`
   * @returns void
   */
  onChangeText?: (value: T | undefined) => void;
  /**
   * @param style StyleProp of ViewStyle for customizing the style of the form control
   * container view
   */
  style?: StyleProp<ViewStyle>;
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
} & PropsWithChildren;

/**
 * Type object for using reference react hooks to interact with form provider
 * component
 * @param submit callback function being triggered when the Form will be submitted
 */
export type FormProviderFields = {
  /**
   * @param submit callback function being triggered when the Form will be submitted
   * @returns void
   */
  submit: () => void;
};

/**
 * Type object for FormProvider component props
 * @param formRef React Ref with type of FormProviderFields for serving as reference
 * for the form provider
 * @param data IFormData of generic type of `T1` for aggregating all data from form
 * controls in array
 * @param formControls Generic type of `T2` or undefined that extends IFormControl of
 * generic `T1`, which holds all the data from the form controls
 * @param setFormControls State action for generic type of `T2` to regularly updates
 * the `formControls` about the given updates being triggered
 * @param formState FormState type to be used if the form is already in the valid state
 * @param setFormState State action for FormState
 * @param onSubmit callback function being triggered when the Form will be submitted
 */
export type FormProviderProps<T1, T2 extends IFormControl<T1>[]> = {
  /**
   * @param formRef React Ref with type of FormProviderFields for serving as reference
   * for the form provider
   */
  formRef: React.Ref<FormProviderFields>;
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
  /**
   * @param onSubmit callback function being triggered when the Form will be submitted
   * @param data IFormData of generic type of `T1` which contains the `data`
   * @returns void
   */
  onSubmit?: (data: IFormData<T1>[]) => void;
} & PropsWithChildren;
