import React, { useContext } from "react";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import NotAllowedImg from "@assets/403.png";
import "./Common.scss";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import SafeImage from "@utils/helper/SafeImage";
import { Typography } from "@mui/material";

const NotAllowed = () =>{
    const NavigateTo = useNavigateTo();
    const { lang } = useContext(LanguageContext);
    return(
        <div className="notFound" style={{height: '100vh', width: '100vw'}}>
            <SafeImage src={NotAllowedImg} style={{ maxHeight: '70%', maxWidth: '90%' }}/>
            {/* <h1>{Literal[lang].pageNotFound}</h1> */}
            {/* <div */}
            <Typography variant="h6">{Literal[lang].notAllowed1}</Typography>
            <Typography variant="subtitle1">{Literal[lang].notAllowed2}</Typography>
            <Typography variant="subtitle2">{Literal[lang].notAllowed3}</Typography>

            {/* <p>{Literal[lang].brokenLinkMsg2}</p> */}
            <button 
                type="button" 
                className="form-button"
                style={{width: "300px", marginTop: '20px'}}
                onClick={()=>NavigateTo("/logout","",true)}
            >
                {Literal[lang].logOutAndBackToHome}
            </button>
        </div>
    );
}
export default NotAllowed;