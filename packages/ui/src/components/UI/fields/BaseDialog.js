import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import styles from "./Base.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useZIndexStack } from "@utils/helper/useZIndexStack";

export default function BaseDialog({
  title,
  bodyComponent,
  open,
  setOpen,
  button,
  isAlert,
  PopupClass,
  disableScrollLock = false,
}) {
  const zIndex = useZIndexStack(open);

  React.useEffect(() => {
    if (disableScrollLock && open) {
      document.body.style.overflow = "auto";
    }
    return () => {
      if (disableScrollLock) {
        document.body.style.overflow = "";
      }
    };
  }, [disableScrollLock, open]);

  // Always render dialog in the DOM, just control visibility
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal forceMount>
        <Dialog.Backdrop
          className={isAlert ? styles.AlertBackdrop : styles.Backdrop}
          onClick={(e) => e.stopPropagation()}
          style={{ zIndex: (zIndex ?? 1500) - 1 }}
        />

        <Dialog.Popup
          className={
            isAlert
              ? styles.AlertPopup
              : PopupClass
              ? styles.FullPopup
              : styles.Popup
          }
          style={{ zIndex: zIndex ?? 1500 }}
        >
          <Dialog.Close
            className={styles.closeButton}
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="large" />
          </Dialog.Close>

          <Dialog.Title className={styles.Title}>{title}</Dialog.Title>

          <div className={styles.dialogContent}>
            <div className={styles.dialogContent}>{bodyComponent}</div>
            <div
              className={
                isAlert
                  ? styles.AlertActions
                  : button
                  ? styles.Actions
                  : styles.ActionsHidden
              }
            >
              {button}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
