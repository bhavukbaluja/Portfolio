import React, { useContext } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import ContactUsDetails from "./ContactUsDetails";

const ContactUsDialog = ({open, setOpen, isMobile})=>{
    const { lang } = useContext(LanguageContext);
        
    return(
        <BaseDialog 
            open={open} 
            setOpen={setOpen}
            PopupClass={true}
            title={Literal[lang].ourContactDetails}
            bodyComponent={
                <ContactUsDetails isMobile={isMobile}/>
            } 
        />
    )
}
export default ContactUsDialog;