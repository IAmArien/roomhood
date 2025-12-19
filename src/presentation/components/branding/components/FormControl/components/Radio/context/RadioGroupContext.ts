/**
 * Property of the Metropolitan Bank & Trust Co.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering team/Digital Banking Division
 */

import React, { Dispatch, SetStateAction } from 'react';

interface IRadioGroupConfig {
  isRadioGroup: boolean;
  selectedValue: string | undefined;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const radioGroupConfig: IRadioGroupConfig = {
  isRadioGroup: false,
  selectedValue: '',
  setSelectedValue: {} as Dispatch<SetStateAction<string | undefined>>
};

export const RadioGroupContext = React.createContext(radioGroupConfig);

export const useRadioGroupConfig = () => React.useContext(RadioGroupContext);
