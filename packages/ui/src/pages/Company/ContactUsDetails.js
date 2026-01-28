import React, { useContext } from "react";
import ContactDetails from "./ContactDetails";
import SocialMediaLinks from "./SocialMediaLinks";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import { Typography } from "@mui/material";

const ContactUsDetails=({isMobile})=>{

    const { lang } = useContext(LanguageContext);
    return(
        <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile? 'column':'row',
                        justifyContent: isMobile? 'flex-start':'center',
                        alignItems: isMobile? 'center':'flex-start',
                        gap: '10px',
                        padding: '10px',
                        paddingTop: '30px',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div style={{
                        width: '100%', 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: !isMobile? 'flex-start':'center',
                        alignItems: !isMobile? 'center':'flex-start',
                    }}>
                        <Typography>{Literal[lang].contactUs}</Typography>
                        <ContactDetails isMobile={isMobile}/>
                    </div>
                    <div style={{
                        width: '100%', 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: !isMobile? 'flex-start':'center',
                        alignItems: !isMobile? 'center':'flex-start',
                    }}>
                        <Typography>{Literal[lang].followUs}</Typography>
                        <SocialMediaLinks isMobile={isMobile}/>
                    </div>
                </div>
    );
}
export default ContactUsDetails;