/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React from 'react';
import { Option } from '../types';

export interface IDropdownSelection {
  type: 'autocomplete' | 'modal' | 'selection';
  value: Option | undefined;
  selected: Option | undefined;
  setSelected: React.Dispatch<React.SetStateAction<Option | undefined>>;
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownSelectionConfig: IDropdownSelection = {
  type: 'modal',
  value: undefined,
  selected: undefined,
  setSelected: {} as React.Dispatch<React.SetStateAction<Option | undefined>>,
  toggleMenu: false,
  setToggleMenu: {} as React.Dispatch<React.SetStateAction<boolean>>
};

export const DropdownContext = React.createContext(DropdownSelectionConfig);

export const useDropdownSelection = () => React.useContext(DropdownContext);
