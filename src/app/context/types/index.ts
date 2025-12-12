/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { createContext, PropsWithChildren, SetStateAction, useContext } from "react";

export interface IAppContext {
  showLoadingModal: boolean;
  setShowLoadingModal: React.Dispatch<SetStateAction<boolean>>;
}

const defaultAppContext: IAppContext = {
  showLoadingModal: {} as boolean,
  setShowLoadingModal: {} as React.Dispatch<SetStateAction<boolean>>,
};

export const AppContext = createContext(defaultAppContext);
export const useAppContext = () => useContext(AppContext);

export type AppContextProviderProps = PropsWithChildren;
