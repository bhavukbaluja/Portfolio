import React, { useContext } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import "./CustomAlertBox.scss";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const CustomConfirmBox = ({ Msg, children=[], title, open, setOpen, clickedYes }) => {

  const { lang } = useContext(LanguageContext);
    if(!Array.isArray(children)){
        children=[];
    }
  const ConfirmMsg = () => (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div dangerouslySetInnerHTML={{ __html: Msg }} />
    </div>
  );

  return (
    <BaseDialog
      title={title || Literal[lang].confirm}
      bodyComponent={<ConfirmMsg />}
      open={open}
      setOpen={setOpen}
      button={
      <div style={{ display: "flex", flexDirection: "row", gap: '20px' }}>      
          <button 
            className="form-button"  
            type="button" 
            onClick={()=>{
                setOpen(false);
                clickedYes();
            }}
          >
            {Literal[lang].yes}
          </button>
          <button 
            className="alert-box-button"  
            type="button" 
            onClick={()=>{
                setOpen(false);
            }}
          >
            {Literal[lang].no}
          </button>
      </div>
      }
      isAlert={true}
    />
  );
};

export default CustomConfirmBox;
