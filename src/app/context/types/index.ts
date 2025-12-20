/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, { createContext, PropsWithChildren, SetStateAction, useContext } from "react";

export type ErrorModalContent = {
  title?: string;
  description?: string;
  positiveButtonTitle?: string;
  negativeButtonTitle?: string;
};

export interface IAppContext {
  showLoadingModal: boolean;
  setShowLoadingModal: React.Dispatch<SetStateAction<boolean>>;
  showErrorModal: ErrorModalContent | null;
  setShowErrorModal: React.Dispatch<SetStateAction<ErrorModalContent | null>>;
}

const defaultAppContext: IAppContext = {
  showLoadingModal: {} as boolean,
  setShowLoadingModal: {} as React.Dispatch<SetStateAction<boolean>>,
  showErrorModal: {} as ErrorModalContent | null,
  setShowErrorModal: {} as React.Dispatch<SetStateAction<ErrorModalContent | null>>,
};

export const AppContext = createContext(defaultAppContext);
export const useAppContext = () => useContext(AppContext);

export type AppContextProviderProps = PropsWithChildren;
