/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

import React, { JSX, useEffect, useMemo } from 'react';

import { RadioGroupContext } from './context/RadioGroupContext';
import { RadioGroupProps } from './types';
import { useFormControl } from '../../context/FormControlContext';
import { useFormValidation } from '../../hooks/useFormValidation';

/**
 * Functional component for Radio Group UI Element. Used to wrap radio buttons,
 * Accepts props of the following `children`.
 * Sample implementation:
 * ```
  const radioControl = useFormControl<string>({
    defaultValue: "MIKHA"
  });

  <FormControl {...radioControl}>
    <ControlledRadioGroup>
      <ControlledRadioButton label="BINI AIAH" value="AIAH" />
      <ControlledRadioButton label="BINI MIKHA" value="MIKHA" />
    </ControlledRadioGroup>
  </FormControl>
 * ```
 * @param props Type of RadioGroupProps
 * @see RadioGroupProps
 * @returns JSX Element of Radio Group UI Element
 */
export const RadioGroup: React.FC<RadioGroupProps> = (props): JSX.Element => {
  const { children } = props;

  const {
    setIsValid,
    defaultErrorMessage,
    setState,
    setErrorMessage,
    selectedValue,
    setSelectedValue,
    validations,
  } = useFormControl<string | undefined>();

  const { validateRadioGroup, isValid } = useFormValidation({
    defaultErrorMessage,
    validations,
    callback(state, message) {
      setErrorMessage(message);
      setState(state);
    },
  });

  const initialValue = useMemo(() => {
    return {
      isRadioGroup: true,
      selectedValue,
      setSelectedValue,
    };
  }, [selectedValue]);

  useEffect(() => {
    validateRadioGroup(selectedValue, selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    setIsValid(isValid());
  }, [isValid()]);

  return <RadioGroupContext.Provider value={initialValue}>{children}</RadioGroupContext.Provider>;
};
