/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { JSX, useImperativeHandle, useMemo } from 'react';

import { FormProviderContext } from './context/FormControlContext';
import { IFormControl } from './hooks';
import { FormProviderFields, FormProviderProps } from './types';

/**
 * Functional component for the FormProvider element. Accepts props of the following:
 * `formRef`, `data`, `formControls`, `formState`, `onSubmit`.
 * Sample implementation below:
 * ```
  type FieldTypes = DropdownOption | string | string[];

  const control = useFormControl<DropdownOption>("dropdown-name");
  const form = useForm<FieldTypes, IFormControl<FieldTypes>[]>();
  const providerRef = useRef<FormProviderFields | null>(null);

  const onSubmit = (data: IFormData<FieldTypes>[]) => {
    console.log('data: ', JSON.stringify(data));
  };

  const onButtonPress = () => {
    providerRef.current?.submit();
  };

  <FormProvider
    formRef={providerRef}
    onSubmit={onSubmit}
    {...form}>
    <FormControl {...control}>
      <Dropdown type="modal">
        <Option title="BINI AIAH" value="AIAH" />
        <Option title="BINI COLET" value="COLET" />
      </Dropdown>
    </FormControl>
  </FormProvider>
 * ```
 * @param props Type of FormProviderProps with generic type of `T1` and `T2`
 * @see FormProviderProps
 * @returns JSX Element of the FormProvider component
 */
export const FormProvider = <T1, T2 extends IFormControl<T1>[]>(
  props: FormProviderProps<T1, T2>
): JSX.Element => {
  const {
    formRef,
    data,
    formControls,
    setFormControls,
    formState,
    setFormState,
    onSubmit,
    children
  } = props;

  const initialValue = useMemo(() => {
    return {
      formControls,
      setFormControls,
      formState,
      setFormState
    };
  }, [formState, formControls]);

  useImperativeHandle(formRef, () => {
    const reference: FormProviderFields = {
      submit() {
        onSubmit?.(data);
      }
    };
    return reference;
  });

  return (
    <FormProviderContext.Provider value={initialValue}>
      {children}
    </FormProviderContext.Provider>
  );
};
