/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { WarningIllustrationIcon } from "@assets/icons";
import { ModalDialog, ModalLoader } from "@branding/components";
import { ReactElement, useMemo, useState } from "react";

import { AppContext, AppContextProviderProps, ErrorModalContent, IAppContext } from "./types";

export default function AppContextProvider({
  children
}: AppContextProviderProps): ReactElement {
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<ErrorModalContent | null>(null);

  const initialValue = useMemo((): IAppContext => ({
    showLoadingModal,
    setShowLoadingModal,
    showErrorModal,
    setShowErrorModal
  }), [showLoadingModal, showErrorModal]);

  return (
    <AppContext.Provider value={initialValue}>
      {children}
      <ModalLoader isVisible={showLoadingModal} />
      <ModalDialog
        isVisible={showErrorModal !== null}
        title={showErrorModal?.title}
        description={showErrorModal?.description}
        onRequestClose={() => setShowErrorModal(null)}
        onOverlayClick={() => setShowErrorModal(null)}
        overlayType="blur"
        scrimOverlayProps={{ type: "dark" }}
        illustration={() => <WarningIllustrationIcon />}
        illustrationStyle={{
          alignItems: 'center',
          marginBottom: 0
        }}
        position="bottom"
        positiveButton={{
          title: showErrorModal?.positiveButtonTitle ?? 'Okay',
          onPress() {
            setShowErrorModal(null);
          }
        }}
        negativeButton={{
          title: showErrorModal?.negativeButtonTitle ?? "Cancel",
          onPress() {
            setShowErrorModal(null);
          }
        }}
      />
    </AppContext.Provider>
  );
}
