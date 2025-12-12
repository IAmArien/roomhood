/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement, useMemo, useState } from "react";
import { AppContext, AppContextProviderProps, IAppContext } from "./types";

export default function AppContextProvider({
  children
}: AppContextProviderProps): ReactElement {
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

  const initialValue = useMemo((): IAppContext => ({
    showLoadingModal,
    setShowLoadingModal
  }), [showLoadingModal]);

  return (
    <AppContext.Provider value={initialValue}>
      {children}
    </AppContext.Provider>
  );
};
