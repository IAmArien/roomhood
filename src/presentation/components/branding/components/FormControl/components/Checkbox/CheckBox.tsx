/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

// @ts-ignore
import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { CheckboxProps } from './types';
import { CheckIcon } from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';
import { Typography } from '../../../Typography/Typography';
import { useFormControl } from '../../context/FormControlContext';
import { useFormValidation } from '../../hooks/useFormValidation';

/**
 * Functional component for Checkbox. Accepts the following props: `selected`, `disabled`,
 * `type` (if normal or indeterminate), `label`, `value`.
 * Sample implementation below:
 * ```
  // WITH DEFAULT VALUES
  const control = useFormControl<string[]>("checkboxes", {
    defaultValue: [
      "JHOANNA",
      "SHEENA"
    ]
  });
  <FormControl {...control}>
    <View style={{ gap: 12 }}>
      <ControlledCheckbox label="BINI SHEENA" value="SHEENA" />
      <ControlledCheckbox type='indeterminate' label="BINI JHOANNA" value="JHOANNA" />
    </View>
  </FormControl>

  // NO DEFAULT VALUES
  const control = useFormControl<string[]>("checkboxes");
  <FormControl {...control}>
    <View style={{ gap: 12 }}>
      <ControlledCheckbox label="BINI SHEENA" value="SHEENA" />
      <ControlledCheckbox type='indeterminate' label="BINI JHOANNA" value="JHOANNA" />
    </View>
  </FormControl>
 * ```
 * @param props Type of CheckboxProps
 * @see CheckboxProps
 * @returns JSX Element of Checkbox UI element
 */
export const Checkbox: React.FC<CheckboxProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const { colors } = props.theme || defaultTheme;
  const {
    label,
    customLabel,
    value,
    selected = false,
    disabled = false,
    type = 'normal',
    onPress,
    style,
    testID,
    accessibilityLabel = 'checkbox-accessibility-label',
    accessibilityRole = 'checkbox',
    role = 'checkbox',
    ...restProps
  } = props;

  if (type !== 'indeterminate' && type !== 'normal') {
    throw Error(`Invalid prop type for ${type}`);
  }

  const [localSelected, setLocalSelected] = useState(false);
  const [localDisabled, setLocalDisabled] = useState(false);

  const {
    setIsValid,
    defaultErrorMessage,
    state,
    setState,
    setErrorMessage,
    selectedValue,
    setSelectedValue,
    validations
  } = useFormControl<string[]>() ?? {};

  const { validateCheckboxes, isValid } = useFormValidation<string[]>({
    defaultErrorMessage,
    validations,
    callback(state, message) {
      setErrorMessage(message);
      setState(state);
    }
  });

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  useEffect(() => {
    setLocalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setLocalDisabled(state === 'disabled');
  }, [state]);

  useEffect(() => {
    setIsValid?.(isValid());
  }, [isValid()]);

  useEffect(() => {
    validateCheckboxes(selectedValue, selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (selectedValue) {
      const filteredValues = selectedValue.filter(v => v === value);
      setLocalSelected(filteredValues.length > 0);
    }
  }, [selectedValue]);

  const handleCheckboxPress = () => {
    if (value) {
      if (selectedValue) {
        const filteredValues = selectedValue.filter(v => v === value);
        if (filteredValues.length === 0) {
          setSelectedValue([...selectedValue, value]);
        } else {
          const newValues = selectedValue.filter(v => v !== value);
          setSelectedValue(newValues);
        }
      } else {
        setSelectedValue([value]);
      }
    }
    onPress?.();
  };

  const hasLabel = () => label !== undefined && label !== '';

  const hasCustomLabel = () => customLabel !== undefined;

  const isSelected = (): boolean => localSelected;

  const isDisabled = (): boolean => localDisabled;

  const isNotDisabled = (): boolean => !isDisabled();

  const accessibilityState = {
    checked: isSelected(),
    disabled: isDisabled()
  };

  return (
    <TouchableWithoutFeedback
      {...restProps}
      testID={testID}
      onPress={handleCheckboxPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      role={role}
      disabled={isDisabled()}>
      <View style={[styles.container, style]}>
        <View
          testID="checkbox-view-outer-checkbox"
          accessibilityLabel="checkbox-view-outer-checkbox-accessibility-label"
          style={[
            styles.default,
            isDisabled()
              ? {
                  borderColor: colors.border.grey,
                  backgroundColor: colors.surface['desaturated-blue-grey']
                }
              : isSelected()
              ? {
                  borderColor: colors.ui.quaternary
                }
              : {
                  borderColor: colors.border.grey
                }
          ]}>
          {isSelected() && isNotDisabled() && (
            <>
              {type === 'normal' && (
                <CheckIcon size={24} color={colors.ui.primary} />
              )}
              {type === 'indeterminate' && (
                <View
                  testID="checkbox-view-inner-indeterminate-background"
                  accessibilityLabel="
                    checkbox-view-inner-indeterminate-background-accessibility-label"
                  style={[
                    styles.indeterminateBackground,
                    { backgroundColor: colors.ui.primary }
                  ]}>
                  <View
                    testID="checkbox-view-inner-indeterminate"
                    accessibilityLabel="checkbox-view-inner-indeterminate-accessibility-label"
                    style={[
                      styles.indeterminate,
                      { backgroundColor: colors.ui['pure-white'] }
                    ]}
                  />
                </View>
              )}
            </>
          )}
        </View>
        {hasCustomLabel() ? (
          <>{customLabel}</>
        ) : (
          <>
            {hasLabel() && (
              <Typography
                variant="description"
                size="sm"
                color={colors.text.clearest}
                style={{ flex: 1 }}>
                {label}
              </Typography>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  default: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indeterminateBackground: {
    height: 22,
    width: 22,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indeterminate: {
    width: 10,
    height: 2
  }
});
