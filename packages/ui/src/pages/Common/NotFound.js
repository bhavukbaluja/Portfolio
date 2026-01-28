import React, { useContext } from "react";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import NotFoundImg from "@assets/NotFoundImage2.png";
import "./Common.scss";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import SafeImage from "@utils/helper/SafeImage";

const NotFound = () =>{
    const NavigateTo = useNavigateTo();
    const { lang } = useContext(LanguageContext);
    return(
        <div className="notFound">
            <SafeImage src={NotFoundImg} style={{height: '60vh'}}/>
            {/* <h1>{Literal[lang].pageNotFound}</h1> */}
            <p>{Literal[lang].brokenLinkMsg1}</p>
            <p>{Literal[lang].brokenLinkMsg2}</p>
            <button 
                type="button" 
                className="form-button"
                onClick={()=>NavigateTo("/","",true)}
            >
                {Literal[lang].backToHome}
            </button>
        </div>
    );
}
export default NotFound;