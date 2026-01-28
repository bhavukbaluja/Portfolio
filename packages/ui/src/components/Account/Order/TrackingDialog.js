// TrackingDialog.js
import React, { useContext, useEffect, useRef } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import TrackingComponent from "./TrackingComponent";

const TrackingDialog = ({ open, setOpen, setLoading, entity, entityId}) => {

  const { lang } = useContext(LanguageContext);
  const trackingComponentRef = useRef();

//   // This useEffect watches the `open` prop
//   useEffect(() => {
//       // When the dialog closes, reset the data in the child component
//       if (!open && trackingComponentRef.current) {
//           trackingComponentRef.current.resetData();
//       }
//   }, [open]);

  return (
    <BaseDialog
      bodyComponent={
        // The key change is to pass the `ref` to the TrackingComponent
        <TrackingComponent
          ref={trackingComponentRef}
          setLoading={setLoading}
          entity={entity}
          entityId={entityId}
          open={open}
        />
      }
      open={open}
      setOpen={setOpen}
      title={Literal[lang].trackingDetails}
    />
  );
};

export default TrackingDialog;