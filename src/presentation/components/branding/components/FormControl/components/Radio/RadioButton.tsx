/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

// @ts-ignore
import React, { JSX, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import { useRadioGroupConfig } from './context/RadioGroupContext';
import { RadioButtonProps } from './types';
import { useTheme } from '../../../../provider/ThemeProvider';
import { Typography } from '../../../Typography/Typography';
import { useFormControl } from '../../context/FormControlContext';

/**
 * Functional component for Radio Button. Accepts the following component props:
 * `selected`, `disabled`, both boolean, `value`, and `label`.
 * Sample implementation:
 * ```
 * <RadioButton value="Salamin" label="Salamin" style={{ paddingVertical: 7 }} />
 * <RadioButton label="Salamin" onPress={(value: string | undefined) => {}} />
 * ```
 * @param props Type of RadioButtonProps
 * @see RadioButtonProps
 * @returns JSX Element of Radio Button UI
 */
export const RadioButton: React.FC<RadioButtonProps> = (props): JSX.Element => {
  const defaultTheme = useTheme();
  const { colors } = props.theme || defaultTheme;
  const { selectedValue, setSelectedValue, isRadioGroup } =
    useRadioGroupConfig();
  const {
    value,
    label,
    textProps,
    selected = false,
    disabled = false,
    onPress,
    style,
    testID,
    accessibilityLabel = 'radio-accessibility-label',
    accessibilityRole = 'radio',
    role = 'radio',
    ...restProps
  } = props;

  const { state } = useFormControl<string>() ?? {};

  const [localSelected, setLocalSelected] = useState(false);
  const [localDisabled, setLocalDisabled] = useState(false);

  const hasLabel = () => label !== undefined && label !== '';

  const handRadioButtonPress = () => {
    if (isRadioGroup && value) {
      setSelectedValue(value);
    }
    onPress?.(value);
  };

  useEffect(() => {
    setLocalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setLocalDisabled(state === 'disabled');
  }, [state]);

  useEffect(() => {
    if (isRadioGroup) {
      setLocalSelected(selectedValue === value);
    } else {
      setLocalSelected(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (isRadioGroup) {
      setLocalSelected(selectedValue === value);
    }
  }, [selectedValue]);

  const isSelected = (): boolean => localSelected;

  const isDisabled = (): boolean => localDisabled;

  const isNotDisabled = (): boolean => !isDisabled();

  const accessibilityState = {
    checked: localSelected,
    disabled: isDisabled()
  };

  return (
    <TouchableWithoutFeedback
      {...restProps}
      testID={testID}
      disabled={isDisabled()}
      onPress={handRadioButtonPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      role={role}>
      <View style={[styles.container, style]}>
        <View
          testID="radio-view-outer-circle"
          accessibilityLabel="radio-view-outer-circle-accessibility-label"
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
            <View
              testID="radio-view-inner-selected-circle"
              accessibilityLabel="radio-view-inner-selected-circle-accessibility-label"
              style={[
                styles.innerSelectedCircle,
                { backgroundColor: colors.ui.primary }
              ]}>
              <View
                testID="radio-view-inner-circle"
                accessibilityLabel="radio-view-inner-circle-accessibility-label"
                style={[
                  styles.innerCircle,
                  { backgroundColor: colors.ui['pure-white'] }
                ]}
              />
            </View>
          )}
        </View>
        {hasLabel() && (
          <Typography
            variant="description"
            size="sm"
            color={colors.text.clearest}
            {...textProps}>
            {label}
          </Typography>
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
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerSelectedCircle: {
    width: 22,
    height: 22,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 50
  }
});
