import React from "react";
import BaseDialog from "../fields/BaseDialog";
import "./CustomAlertBox.scss";

const CustomAlertBox = ({ Msg, children = [], title = "Alert", open, setOpen }) => {
  // Ensure children is always an array
  const safeChildren = Array.isArray(children) ? children : [];

  const ErrorMsg = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Msg && (
        <div dangerouslySetInnerHTML={{ __html: Msg }} />
      )}
      {safeChildren.length > 0 && (
        <ul>
          {safeChildren.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <BaseDialog
      title={title}
      bodyComponent={<ErrorMsg />}
      open={open}
      setOpen={setOpen}
      button={
        <button className="alert-box-button" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      }
      isAlert={true}
    />
  );
};

export default CustomAlertBox;
