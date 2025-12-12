/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useState } from 'react';
import {
  FormControlState,
  FormValidationOption,
  FormValidations
} from '../types';
import { InputModeOptions } from 'react-native/Libraries/Components/TextInput/TextInput';

export interface IFormValidation<T> {
  validate: (controlValue?: T, value?: string, isFocused?: boolean) => void;
  validateCheckboxes: (controlValue?: T, value?: string[]) => void;
  validateRadioGroup: (controlValue?: T, value?: string) => void;
  isValid: () => boolean | undefined;
}

export interface IFormValidationParams<T> {
  defaultErrorMessage?: string;
  inputMode?: InputModeOptions;
  validations?: FormValidations<T>;
  callback?: (state: FormControlState, message?: string) => void;
}

export type ValidMinOrMaxLengthState = {
  valid: boolean;
  message?: string;
  errType?: 'min' | 'max';
};

export type ValidMinOrMaxValueState = {
  valid: boolean;
  message?: string;
  errType?: 'min' | 'max';
};

export type ValidMinOrMaxLengthStateParams = {
  controlValue: string;
  minLength?: FormValidationOption<number>;
  maxLength?: FormValidationOption<number>;
  defaultErrorMessage?: string;
};

export type ValidMinOrMaxValueStateParams = {
  controlValue: number;
  minLength?: FormValidationOption<number>;
  maxLength?: FormValidationOption<number>;
  defaultErrorMessage?: string;
};

export const useFormValidation = <T extends any>({
  defaultErrorMessage,
  inputMode,
  validations,
  callback
}: IFormValidationParams<T>): IFormValidation<T> => {
  const [validationState, setValidationState] = useState<boolean | undefined>(
    undefined
  );

  const internalCallback = (state: FormControlState, message?: string) => {
    setValidationState(state !== 'error');
    callback?.(state, message);
  };

  const isValidMinOrMaxValue = (params: ValidMinOrMaxValueStateParams) => {
    const { controlValue, minLength, maxLength, defaultErrorMessage } = params;
    const validation: ValidMinOrMaxValueState = {
      errType: undefined,
      message: undefined,
      valid: true
    };
    let errMessage = '';
    if (minLength !== undefined) {
      if (controlValue < minLength.validation) {
        if (defaultErrorMessage) {
          errMessage = defaultErrorMessage;
        }
        if (minLength.message) {
          errMessage = minLength.message;
        }
        validation.message = errMessage;
        validation.valid = false;
        validation.errType = 'min';
        return validation;
      }
    }
    if (maxLength !== undefined) {
      if (controlValue > maxLength.validation) {
        if (defaultErrorMessage) {
          errMessage = defaultErrorMessage;
        }
        if (maxLength.message) {
          errMessage = maxLength.message;
        }
        validation.message = errMessage;
        validation.valid = false;
        validation.errType = 'max';
        return validation;
      }
    }
    return validation;
  };

  const isValidMinOrMaxLength = (params: ValidMinOrMaxLengthStateParams) => {
    const { controlValue, minLength, maxLength, defaultErrorMessage } = params;
    const validation: ValidMinOrMaxLengthState = {
      errType: undefined,
      message: undefined,
      valid: true
    };
    const controlValueLength = controlValue.length;
    let errMessage = '';
    if (minLength !== undefined) {
      const minimum = minLength.validation;
      const message = minLength.message;
      if (controlValueLength < minimum) {
        if (defaultErrorMessage) {
          errMessage = defaultErrorMessage;
        }
        if (message) {
          errMessage = message;
        }
        validation.message = errMessage;
        validation.valid = false;
        validation.errType = 'min';
        return validation;
      }
    }
    if (maxLength !== undefined) {
      const maximum = maxLength.validation;
      const message = maxLength.message;
      if (controlValueLength > maximum) {
        if (defaultErrorMessage) {
          errMessage = defaultErrorMessage;
        }
        if (message) {
          errMessage = message;
        }
        validation.message = errMessage;
        validation.valid = false;
        validation.errType = 'max';
        return validation;
      }
    }
    return validation;
  };

  const validateNumericInputMode = (
    value: string,
    formControlValue?: T,
    isFocused?: boolean
  ) => {
    const {
      required,
      validationTrigger,
      min: minimum,
      max: maximum,
      customValidation
    } = validations ?? {};
    if (value.length >= 1) {
      const controlValue = Number(value);
      const validation = isValidMinOrMaxValue({
        controlValue,
        minLength: minimum,
        maxLength: maximum,
        defaultErrorMessage
      });
      if (validation.valid) {
        if (customValidation !== undefined) {
          const custom = customValidation(formControlValue);
          const customErrMessage = custom.message ?? defaultErrorMessage;
          if (custom.valid) {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('default', undefined);
              }
            } else {
              internalCallback?.('default', undefined);
            }
          } else {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('error', customErrMessage);
              }
            } else {
              internalCallback?.('error', customErrMessage);
            }
          }
        } else {
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('default', undefined);
            }
          } else {
            internalCallback?.('default', undefined);
          }
        }
      } else {
        switch (validation.errType) {
          case 'max':
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('error', maximum?.message);
              }
            } else {
              internalCallback?.('error', maximum?.message);
            }
            break;
          case 'min':
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('error', minimum?.message);
              }
            } else {
              internalCallback?.('error', minimum?.message);
            }
            break;
          default:
            break;
        }
      }
    } else {
      if (required === true) {
        if (validationTrigger === 'onBlur') {
          if (isFocused === false) {
            internalCallback?.('error', defaultErrorMessage);
          }
        } else {
          internalCallback?.('error', defaultErrorMessage);
        }
      } else {
        if (customValidation !== undefined) {
          const custom = customValidation(formControlValue);
          const customErrMessage = custom.message ?? defaultErrorMessage;
          if (custom.valid) {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('default', undefined);
              }
            } else {
              internalCallback?.('default', undefined);
            }
          } else {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('error', customErrMessage);
              }
            } else {
              internalCallback?.('error', customErrMessage);
            }
          }
        } else {
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('default', undefined);
            }
          } else {
            internalCallback?.('default', undefined);
          }
        }
      }
    }
  };

  const validateOtherInputMode = (
    value: string,
    formControlValue?: T,
    isFocused?: boolean
  ) => {
    const {
      required,
      validationTrigger,
      minLength: minimumLength,
      maxLength: maximumLength,
      customValidation
    } = validations ?? {};
    const validation = isValidMinOrMaxLength({
      controlValue: value,
      minLength: minimumLength,
      maxLength: maximumLength,
      defaultErrorMessage
    });
    if (validation.valid) {
      if (required === true) {
        if (value.length === 0) {
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('error', defaultErrorMessage);
            }
          } else {
            internalCallback?.('error', defaultErrorMessage);
          }
        } else {
          if (customValidation !== undefined) {
            const custom = customValidation(formControlValue);
            const customErrMessage = custom.message ?? defaultErrorMessage;
            if (custom.valid) {
              if (validationTrigger === 'onBlur') {
                if (isFocused === false) {
                  internalCallback?.('default', undefined);
                }
              } else {
                internalCallback?.('default', undefined);
              }
            } else {
              if (validationTrigger === 'onBlur') {
                if (isFocused === false) {
                  internalCallback?.('error', customErrMessage);
                }
              } else {
                internalCallback?.('error', customErrMessage);
              }
            }
          } else {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('default', undefined);
              }
            } else {
              internalCallback?.('default', undefined);
            }
          }
        }
      } else {
        if (customValidation !== undefined) {
          const custom = customValidation(formControlValue);
          const customErrMessage = custom.message ?? defaultErrorMessage;
          if (custom.valid) {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('default', undefined);
              }
            } else {
              internalCallback?.('default', undefined);
            }
          } else {
            if (validationTrigger === 'onBlur') {
              if (isFocused === false) {
                internalCallback?.('error', customErrMessage);
              }
            } else {
              internalCallback?.('error', customErrMessage);
            }
          }
        } else {
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('default', undefined);
            }
          } else {
            internalCallback?.('default', undefined);
          }
        }
      }
    } else {
      switch (validation.errType) {
        case 'max':
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('error', maximumLength?.message);
            }
          } else {
            internalCallback?.('error', maximumLength?.message);
          }
          break;
        case 'min':
          if (validationTrigger === 'onBlur') {
            if (isFocused === false) {
              internalCallback?.('error', minimumLength?.message);
            }
          } else {
            internalCallback?.('error', minimumLength?.message);
          }
          break;
        default:
          break;
      }
    }
  };

  const validateCheckboxValues = (value: string[], controlValue?: T) => {
    const {
      required,
      min: minimum,
      max: maximum,
      customValidation
    } = validations ?? {};
    if (minimum !== undefined) {
      if (value.length < minimum.validation) {
        internalCallback?.('error', minimum?.message ?? defaultErrorMessage);
        return;
      }
    }
    if (maximum !== undefined) {
      if (value.length > maximum.validation) {
        internalCallback?.('error', maximum?.message ?? defaultErrorMessage);
        return;
      }
    }
    if (required === true) {
      if (value.length === 0) {
        internalCallback?.('error', defaultErrorMessage);
      } else {
        if (customValidation !== undefined) {
          const custom = customValidation(controlValue);
          const customErrMessage = custom.message ?? defaultErrorMessage;
          if (custom.valid) {
            internalCallback?.('default', undefined);
          } else {
            internalCallback?.('error', customErrMessage);
          }
        } else {
          internalCallback?.('default', undefined);
        }
      }
    } else {
      if (customValidation !== undefined) {
        const custom = customValidation(controlValue);
        const customErrMessage = custom.message ?? defaultErrorMessage;
        if (custom.valid) {
          internalCallback?.('default', undefined);
        } else {
          internalCallback?.('error', customErrMessage);
        }
      } else {
        internalCallback?.('default', undefined);
      }
    }
  };

  const validateRadioGroupValues = (value: string, controlValue?: T) => {
    const { customValidation } = validations ?? {};
    if (value.length > 0) {
      if (customValidation !== undefined) {
        const custom = customValidation(controlValue);
        const customErrMessage = custom.message ?? defaultErrorMessage;
        if (custom.valid) {
          internalCallback?.('default', undefined);
        } else {
          internalCallback?.('error', customErrMessage);
        }
      } else {
        internalCallback?.('default', undefined);
      }
    } else {
      if (customValidation !== undefined) {
        const custom = customValidation(controlValue);
        const customErrMessage = custom.message ?? defaultErrorMessage;
        if (custom.valid) {
          internalCallback?.('default', undefined);
        } else {
          internalCallback?.('error', customErrMessage);
        }
      } else {
        internalCallback?.('error', defaultErrorMessage);
      }
    }
  };

  const validate = (controlValue?: T, value?: string, isFocused?: boolean) => {
    if (validations !== undefined) {
      if (value !== undefined) {
        if (inputMode === 'numeric' || inputMode === 'decimal') {
          validateNumericInputMode(value, controlValue, isFocused);
        } else {
          validateOtherInputMode(value, controlValue, isFocused);
        }
      } else {
        internalCallback?.('default', undefined);
        // since in validations config it is not required, we can automatically
        // set the validation state to `TRUE`, otherwise reset it to `undefined`
        if (validations.required === true) {
          setValidationState(undefined);
        } else {
          setValidationState(true);
        }
      }
    }
  };

  const validateCheckboxes = (controlValue?: T, value?: string[]) => {
    if (validations !== undefined) {
      if (value !== undefined) {
        validateCheckboxValues(value, controlValue);
      } else {
        internalCallback?.('default', undefined);
        // since in validations config it is not required, we can automatically
        // set the validation state to `TRUE`, otherwise reset it to `undefined`
        if (validations.required === true) {
          setValidationState(undefined);
        } else {
          setValidationState(true);
        }
      }
    }
  };

  const validateRadioGroup = (controlValue?: T, value?: string) => {
    if (validations !== undefined) {
      if (value !== undefined) {
        validateRadioGroupValues(value, controlValue);
      } else {
        internalCallback?.('default', undefined);
        // since in validations config it is not required, we can automatically
        // set the validation state to `TRUE`, otherwise reset it to `undefined`
        if (validations.required === true) {
          setValidationState(undefined);
        } else {
          setValidationState(true);
        }
      }
    }
  };

  const isValid = (): boolean | undefined => validationState;

  return { validate, validateCheckboxes, validateRadioGroup, isValid };
};
