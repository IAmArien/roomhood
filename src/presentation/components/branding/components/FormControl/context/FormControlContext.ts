/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React from 'react';
import { FormControlState, FormValidations } from '../types';
import { FormState } from '../hooks/useForm';

interface IFormControl<T> {
  name: string;
  defaultValue: T;
  defaultErrorMessage?: string;
  controlValue: T;
  setControlValue: React.Dispatch<React.SetStateAction<T>>;
  state: FormControlState;
  setState: React.Dispatch<React.SetStateAction<FormControlState>>;
  errorMessage?: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  notes?: string;
  setNotes: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: T | undefined;
  setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  selectedValue?: T;
  setSelectedValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  validations?: FormValidations<T>;
  isValid?: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

interface IFormProvider<T> {
  formControls: T | undefined;
  setFormControls: React.Dispatch<React.SetStateAction<T | undefined>>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const FormControlContext = React.createContext<
  IFormControl<any> | undefined
>(undefined);

export const FormProviderContext = React.createContext<
  IFormProvider<any> | undefined
>(undefined);

export const useFormControl = <T>(): IFormControl<T> => {
  return React.useContext(FormControlContext) as IFormControl<T>;
};

export const useFormProvider = <T>(): IFormProvider<T> => {
  return React.useContext(FormProviderContext) as IFormProvider<T>;
};
